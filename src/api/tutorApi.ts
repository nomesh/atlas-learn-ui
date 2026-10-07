import { apiClient } from './client';
import type { LearningContext, RAGResponse, SourceCitation } from '../types';
import { resolveTutorMode } from './tutorMode';
import type { TutorModeInfo, TutorModeSource, TutorRuntimeInfo } from './tutorMode';
import { MockTutorAdapter } from './mockTutorAdapter';

export interface TutorClearOptions {
  grade?: string;
  subject?: string;
  topicId?: string;
}

/**
 * Interface contract for Tutor backend adapters.
 * UI components interact strictly through this boundary.
 */
export interface TutorAdapter {
  ask(question: string, context: LearningContext): Promise<RAGResponse>;
  clearConversation(conversationId: string, options?: TutorClearOptions): Promise<void>;
}

/** Shown instead of any answer that arrives without approved textbook evidence (LIVE fail-closed). */
export const NO_EVIDENCE_REFUSAL: Record<'en' | 'si' | 'ta', string> = {
  en: 'I could not find approved textbook evidence for this question, so I cannot answer it from your textbook.',
  si: 'මෙම ප්‍රශ්නයට අනුමත පෙළපොත් සාක්ෂි හමු නොවූ බැවින්, ඔබේ පෙළපොතෙන් පිළිතුරු දිය නොහැක.',
  ta: 'இந்தக் கேள்விக்கு அங்கீகரிக்கப்பட்ட பாடநூல் ஆதாரம் கிடைக்கவில்லை, எனவே உங்கள் பாடநூலிலிருந்து பதிலளிக்க முடியாது.',
};

/**
 * AtlasLiveTutorAdapter
 * Directly targets the ATLAS Learn backend AI Tutor endpoint.
 * Live Contract: POST /api/learn/tutor
 */
export class AtlasLiveTutorAdapter implements TutorAdapter {
  async ask(question: string, context: LearningContext): Promise<RAGResponse> {
    const { data } = await apiClient.post<RAGResponse & { suggestedFollowUps?: string[] }>('/api/learn/tutor', {
      conversationId: context.conversationId,
      message: question,
      productType: context.productType || 'LEARN_CURRICULUM',
      grade: context.grade,
      subject: context.subjectId,
      language: context.language,
      topicId: context.topicId,
      lessonId: context.topicId,       // alias; backend auto-syncs if one is null
      chapterId: context.chapterId,
      action: context.action,
      imageUrl: context.imageUrl,
    }, {
      timeout: 180000,
    });

    const meta = (data as { metadata?: Record<string, unknown> }).metadata;
    const evidenceCount = typeof meta?.evidenceCount === 'number' ? meta.evidenceCount : undefined;
    const safeFailure = meta?.safeFailure === true;
    const provider = typeof meta?.llmProvider === 'string' ? meta.llmProvider : undefined;
    const model = typeof meta?.llmModel === 'string' ? meta.llmModel : undefined;
    const sources = data.sources || [];

    // Fail closed: an answer without retrieved textbook sources is never shown. The backend refuses itself
    // (safeFailure, no LLM call); should any other answer arrive without sources, it is withheld here.
    if (safeFailure || sources.length === 0) {
      const lang = context.language === 'si' || context.language === 'ta' ? context.language : 'en';
      return {
        answer: safeFailure && typeof data.answer === 'string' && data.answer.trim() ? data.answer : NO_EVIDENCE_REFUSAL[lang],
        sources: [],
        suggestedFollowUps: [],
        visuals: [],
        grounding: { evidenceCount: 0, safeFailure: true, withheld: !safeFailure },
      };
    }

    return {
      answer: data.answer,
      sources,
      suggestedFollowUps: data.suggestedFollowUps || [],
      // Server-resolved textbook visuals, passed through unchanged (URLs are never rebuilt in the UI).
      visuals: Array.isArray(data.visuals)
        ? data.visuals.filter((visual) => visual && typeof visual.previewUrl === 'string' && visual.previewUrl.length > 0)
        : [],
      ...(provider || model ? { runtime: { provider, model } } : {}),
      grounding: { evidenceCount, safeFailure },
    };
  }

  async clearConversation(conversationId: string, options?: TutorClearOptions): Promise<void> {
    try {
      const params = new URLSearchParams();
      if (options?.grade) params.set('grade', options.grade);
      if (options?.subject) params.set('subject', options.subject);
      if (options?.topicId) params.set('topicId', options.topicId);
      const query = params.toString() ? `?${params.toString()}` : '';
      await apiClient.delete(`/api/learn/conversations/${conversationId}${query}`);
    } catch (err) {
      console.warn('[AtlasLiveTutorAdapter] Failed to clear remote conversation:', err);
    }
  }
}

/**
 * TutorService: Factory / Coordinator
 * Switches transparently between MockTutorAdapter and AtlasLiveTutorAdapter based on VITE_USE_MOCK_API.
 */
class TutorService {
  private adapter: TutorAdapter;
  private mockMode: boolean;
  private source: TutorModeSource;
  private runtime: TutorRuntimeInfo | undefined;
  private readonly listeners = new Set<() => void>();
  private snapshot: TutorModeInfo;

  constructor() {
    const hasViteEnv = typeof import.meta !== 'undefined' && !!import.meta.env;
    const isProd = hasViteEnv && !!import.meta.env.PROD;
    let storedOverride: string | null = null;
    try {
      storedOverride = !isProd && typeof localStorage !== 'undefined' ? localStorage.getItem('atlas_force_mock') : null;
    } catch {
      storedOverride = null;
    }
    const resolved = resolveTutorMode({
      isProd,
      hasViteEnv,
      storedOverride,
      envFlag: hasViteEnv ? import.meta.env.VITE_USE_MOCK_API : undefined,
      deploymentTarget: hasViteEnv ? import.meta.env.VITE_DEPLOYMENT_TARGET : undefined,
    });
    this.mockMode = resolved.mode === 'mock';
    this.source = resolved.source;
    this.adapter = this.mockMode ? new MockTutorAdapter() : new AtlasLiveTutorAdapter();
    this.snapshot = this.buildSnapshot();
    console.info(
      `[TutorService] Initialized with ${this.mockMode ? 'MockTutorAdapter' : 'AtlasLiveTutorAdapter'} (source: ${this.source})`
    );
    if (resolved.source === 'env:invalid-defaults-to-live') {
      console.error(
        `[TutorService] VITE_USE_MOCK_API has an invalid value; expected 'true' or 'false'. Using LIVE.`
      );
    }
  }

  private hasStoredOverride(): boolean {
    try {
      if (typeof localStorage === 'undefined') return false;
      const v = localStorage.getItem('atlas_force_mock');
      return v === 'true' || v === 'false';
    } catch {
      return false;
    }
  }

  private buildSnapshot(): TutorModeInfo {
    return {
      mode: this.mockMode ? 'mock' : 'live',
      source: this.source,
      runtime: this.mockMode ? undefined : this.runtime,
      hasStoredOverride: this.hasStoredOverride(),
    };
  }

  private publish(): void {
    this.snapshot = this.buildSnapshot();
    this.listeners.forEach((l) => l());
  }

  /** useSyncExternalStore-compatible subscription for the dev badge. */
  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /** Stable snapshot (identity changes only when something changed). */
  public getModeInfo = (): TutorModeInfo => this.snapshot;

  /** In a production build the mode is fixed by the build target (real app: LIVE, Pages demo: MOCK). */
  public isMockMode(): boolean {
    return this.mockMode;
  }

  public setMockMode(useMock: boolean): void {
    if (typeof import.meta !== 'undefined' && import.meta.env?.PROD) {
      // Production builds never change mode at runtime: the real application stays LIVE and the
      // GitHub Pages demo stays MOCK, whatever the browser asks for.
      console.warn(`[TutorService] Tutor mode is fixed in production builds (${this.mockMode ? 'MOCK demo' : 'LIVE'}); request ignored.`);
      this.publish();
      return;
    }
    this.mockMode = useMock;
    this.source = 'localStorage-override';
    this.runtime = undefined;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('atlas_force_mock', String(useMock));
      }
    } catch {
      /* storage unavailable: keep in-memory mode only */
    }
    this.adapter = useMock ? new MockTutorAdapter() : new AtlasLiveTutorAdapter();
    console.info(`[TutorService] Switched to ${useMock ? 'MockTutorAdapter' : 'AtlasLiveTutorAdapter'}`);
    this.publish();
  }

  /**
   * Remove the persisted dev override and fall back to .env resolution. Takes effect after reload,
   * because the env value is baked in when the dev server starts.
   */
  public clearModeOverride(): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.removeItem('atlas_force_mock');
    } catch {
      /* ignore */
    }
    this.publish();
  }

  public async askTutor(question: string, context: LearningContext): Promise<RAGResponse> {
    const response = await this.adapter.ask(question, context);
    if (!this.mockMode && response.runtime && (response.runtime.provider || response.runtime.model)) {
      this.runtime = response.runtime;
      this.publish();
    }
    return response;
  }

  public async clearConversation(conversationId: string, options?: TutorClearOptions): Promise<void> {
    await this.adapter.clearConversation(conversationId, options);
  }
}

export const tutorService = new TutorService();
