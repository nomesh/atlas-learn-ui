import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CellExplorer, ORGANELLES } from '../components/interactive/CellExplorer';
import { SubjectConceptVisualizer, hasSimulation } from '../components/interactive/SubjectConceptVisualizer';
import { getScienceVisualizerKey } from '../components/interactive/ScienceConceptVisualizer';
import { MathsConceptVisualizer } from '../components/interactive/MathsConceptVisualizer';
import { HistoryConceptVisualizer } from '../components/interactive/HistoryConceptVisualizer';

afterEach(() => cleanup());

const CELL_TOPIC = 'science-gr10-ch6-cell-structure';
const CELL_TOPIC_ALT = 'science-gr10-ch6-cells';
const allOrganelleIds = () => Array.from(document.querySelectorAll('[data-testid^="organelle-"]'))
  .map((e) => e.getAttribute('data-testid')!)
  .filter((id) => id !== 'organelle-list' && id !== 'organelle-inspector');

describe('CellExplorer', () => {
  it('renders the explorer, organelle selector and inspector', () => {
    render(<CellExplorer />);
    expect(screen.getByTestId('cell-explorer')).toBeTruthy();
    expect(screen.getByText('Select Organelle')).toBeTruthy();
    expect(screen.getByTestId('organelle-inspector')).toBeTruthy();
    expect(screen.getByText('Plant Architecture')).toBeTruthy();
  });

  it('exposes at least five organelles for plant cells', () => {
    render(<CellExplorer />);
    const ids = allOrganelleIds();
    expect(ids.length).toBeGreaterThanOrEqual(5);
    for (const k of ['nucleus', 'mitochondria', 'chloroplast', 'cellWall', 'vacuole']) {
      expect(ids).toContain(`organelle-${k}`);
    }
  });

  it('Plant/Animal toggle works and plant-only organelles are hidden for animal cells', () => {
    render(<CellExplorer />);
    fireEvent.click(screen.getByText(/Animal Cell/));
    expect(screen.getByText('Animal Architecture')).toBeTruthy();
    const ids = allOrganelleIds();
    expect(ids).toEqual(['organelle-nucleus', 'organelle-mitochondria']);
    expect(ids.length).toBe(Object.values(ORGANELLES).filter((o) => !o.plantOnly).length);
    fireEvent.click(screen.getByText(/Plant Cell/));
    expect(screen.getByText('Plant Architecture')).toBeTruthy();
    expect(allOrganelleIds().length).toBe(5);
  });

  it('a selected plant-only organelle falls back to nucleus on an animal cell', () => {
    render(<CellExplorer />);
    fireEvent.click(screen.getByTestId('organelle-chloroplast'));
    expect(screen.getByTestId('organelle-inspector').textContent).toContain('Chloroplast');
    fireEvent.click(screen.getByText(/Animal Cell/));
    expect(screen.getByTestId('organelle-inspector').textContent).toContain('Nucleus');
    expect(screen.getByTestId('organelle-inspector').textContent).not.toContain('Chloroplast');
  });

  it('shows organelle details and updates on selection', () => {
    render(<CellExplorer />);
    fireEvent.click(screen.getByTestId('organelle-mitochondria'));
    expect(screen.getByTestId('organelle-inspector').textContent).toContain('ATP');
  });

  it('renders O/L Exam Focus for both cell types', () => {
    render(<CellExplorer />);
    expect(screen.getByTestId('ol-exam-focus').textContent).toContain('O/L Exam Focus');
    expect(screen.getByTestId('ol-exam-focus').textContent).toContain('cellulose cell wall');
    fireEvent.click(screen.getByText(/Animal Cell/));
    expect(screen.getByTestId('ol-exam-focus').textContent).toContain('lack cell walls');
  });

  it('is trilingual (si and ta content differs from en)', () => {
    const { rerender } = render(<CellExplorer language="en" />);
    const en = screen.getByTestId('organelle-inspector').textContent;
    rerender(<CellExplorer language="si" />);
    const si = screen.getByTestId('organelle-inspector').textContent;
    rerender(<CellExplorer language="ta" />);
    const ta = screen.getByTestId('organelle-inspector').textContent;
    expect(new Set([en, si, ta]).size).toBe(3);
  });
});

describe('SubjectConceptVisualizer wiring', () => {
  it('both cell topic ids have a simulation via the deterministic key architecture', () => {
    expect(getScienceVisualizerKey(CELL_TOPIC)).toBe('cells');
    expect(getScienceVisualizerKey(CELL_TOPIC_ALT)).toBe('cells');
    expect(hasSimulation(CELL_TOPIC, 'science', undefined, 'grade-10')).toBe(true);
    expect(hasSimulation(CELL_TOPIC_ALT, 'science', undefined, 'grade-10')).toBe(true);
  });

  it('Grade 10 cell topic renders the Cell Explorer, not Grade 8 respiration content', () => {
    render(<SubjectConceptVisualizer topicId={CELL_TOPIC} subjectId="science" grade="grade-10" />);
    expect(screen.getByTestId('cell-explorer')).toBeTruthy();
    expect(screen.getByText('Plant and animal cells')).toBeTruthy();
    expect(screen.queryByText('Human Respiratory System')).toBeNull();
  });

  it('header resolves identically for both cell topic aliases without grade context', () => {
    const { unmount } = render(<SubjectConceptVisualizer topicId={CELL_TOPIC} subjectId="science" />);
    const a = screen.getByRole('heading', { level: 3 }).textContent;
    unmount();
    render(<SubjectConceptVisualizer topicId={CELL_TOPIC_ALT} subjectId="science" />);
    const b = screen.getByRole('heading', { level: 3 }).textContent;
    expect(a).toBe(b);
    expect(a).not.toContain('Respiratory');
  });

  it('switching between topics with and without simulations never triggers hook-order errors', () => {
    const errors: unknown[][] = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...args) => { errors.push(args); });
    const { rerender, container } = render(<SubjectConceptVisualizer topicId={CELL_TOPIC} subjectId="science" grade="grade-10" />);
    expect(container.querySelector('[data-testid="cell-explorer"]')).not.toBeNull();
    // No-simulation topic (early return), then back, repeatedly.
    for (let i = 0; i < 3; i++) {
      rerender(<SubjectConceptVisualizer topicId="not-a-real-topic" subjectId="english" />);
      rerender(<SubjectConceptVisualizer topicId="science-gr10-ch2-motion" subjectId="science" grade="grade-10" />);
      rerender(<SubjectConceptVisualizer topicId="" subjectId="" />);
      rerender(<SubjectConceptVisualizer topicId={CELL_TOPIC_ALT} subjectId="science" grade="grade-10" />);
    }
    expect(container.querySelector('[data-testid="cell-explorer"]')).not.toBeNull();
    spy.mockRestore();
    const hookErrors = errors.filter((a) => /hook|rendered (more|fewer)/i.test(String(a[0])));
    expect(hookErrors).toEqual([]);
  });

  it('Maths and History visualizers survive switching from a no-simulation topic to a simulation topic', () => {
    const errors: unknown[][] = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...args) => { errors.push(args); });
    const m = render(<MathsConceptVisualizer topicId="unknown-topic" />);
    expect(() => m.rerender(<MathsConceptVisualizer topicId="maths-gr10-ch1-perimeter" />)).not.toThrow();
    m.unmount();
    const h = render(<HistoryConceptVisualizer topicId="unknown-topic" />);
    expect(() => h.rerender(<HistoryConceptVisualizer topicId="history-gr10-settlements" />)).not.toThrow();
    spy.mockRestore();
    expect(errors.filter((a) => /hook|rendered (more|fewer)/i.test(String(a[0])))).toEqual([]);
  });
});
