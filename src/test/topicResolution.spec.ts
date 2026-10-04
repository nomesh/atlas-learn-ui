import { describe, expect, it } from 'vitest';
import { MOCK_TOPICS, findTopicResilient, canonicalTopicId, getLessonStepsForTopic } from '../mocks/curriculumData';

const CELLS = 'science-gr10-ch6-cells';
const CELL_STRUCTURE = 'science-gr10-ch6-cell-structure';

describe('findTopicResilient: grade/subject integrity', () => {
  it('Grade 8 human-respiration shares chapter number 6 with the Grade 10 cell topic (fixture sanity)', () => {
    const resp = MOCK_TOPICS.find((t) => t.id === 'human-respiration');
    const cells = MOCK_TOPICS.find((t) => t.id === CELLS);
    expect(resp?.grade).toBe('grade-8');
    expect(cells?.grade).toBe('grade-10');
    expect(resp?.chapterNumber).toBe(cells?.chapterNumber);
  });

  it.each([
    ['no context', undefined, undefined],
    ['subject only', 'science', undefined],
    ['subject and grade', 'science', 'grade-10'],
  ])('Grade 10 cell structure never resolves to Grade 8 respiration (%s)', (_n, subject, grade) => {
    const t = findTopicResilient(MOCK_TOPICS, CELL_STRUCTURE, subject, grade);
    expect(t?.id).not.toBe('human-respiration');
    expect(t?.id).toBe(CELLS);
    expect(t?.grade).toBe('grade-10');
    expect(t?.subjectId).toBe('science');
  });

  it('both cell topic aliases resolve identically', () => {
    for (const ctx of [[undefined, undefined], ['science', undefined], ['science', 'grade-10']] as const) {
      const a = findTopicResilient(MOCK_TOPICS, CELLS, ctx[0], ctx[1]);
      const b = findTopicResilient(MOCK_TOPICS, CELL_STRUCTURE, ctx[0], ctx[1]);
      expect(a).toBeDefined();
      expect(b).toBe(a);
    }
    expect(canonicalTopicId(CELL_STRUCTURE)).toBe(CELLS);
    expect(getLessonStepsForTopic(CELL_STRUCTURE)).toBe(getLessonStepsForTopic(CELLS));
  });

  it('an unknown topic id with a matching chapter number never crosses grade or subject', () => {
    // "ch6" matches chapterNumber 6 in several grades/subjects.
    expect(findTopicResilient(MOCK_TOPICS, 'science-gr10-ch6-does-not-exist')?.grade ?? 'grade-10').toBe('grade-10');
    expect(findTopicResilient(MOCK_TOPICS, 'ch6')).toBeUndefined();
    expect(findTopicResilient(MOCK_TOPICS, 'chapter-6', 'science')).toBeUndefined();
    const scoped = findTopicResilient(MOCK_TOPICS, 'chapter-6', 'science', 'grade-8');
    if (scoped) {
      expect(scoped.grade).toBe('grade-8');
      expect(scoped.subjectId).toBe('science');
    }
  });

  it('explicit grade/subject always wins: result never violates requested scope', () => {
    for (const id of MOCK_TOPICS.map((t) => t.id)) {
      for (const [subject, grade] of [['science', 'grade-10'], ['science', 'grade-8'], ['maths', 'grade-10'], ['history', 'grade-10']] as const) {
        const t = findTopicResilient(MOCK_TOPICS, id, subject, grade);
        if (t) {
          expect(t.subjectId).toBe(subject);
          expect(t.grade).toBe(grade);
        }
      }
    }
  });

  it('a grade encoded in the id is not overridden by chapter fallback', () => {
    const t = findTopicResilient(MOCK_TOPICS, 'maths-gr10-ch6-nonexistent');
    expect(t === undefined || (t.grade === 'grade-10' && t.subjectId === 'maths')).toBe(true);
  });

  it('exact ids still resolve with and without context', () => {
    expect(findTopicResilient(MOCK_TOPICS, 'human-respiration')?.grade).toBe('grade-8');
    expect(findTopicResilient(MOCK_TOPICS, 'human-respiration', 'science', 'grade-8')?.id).toBe('human-respiration');
    expect(findTopicResilient(MOCK_TOPICS, 'history-gr10-colonial-transitions')?.subjectId).toBe('history');
  });
});
