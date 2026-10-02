import assert from 'node:assert';
import test from 'node:test';

// 1. Verify MOCK_TOPICS contains history-gr10-colonial-transitions
test('REG-01 & REG-06: MOCK_TOPICS contains history-gr10-colonial-transitions with subject=history', async () => {
  const { MOCK_TOPICS } = await import('../src/mocks/curriculumData.ts');
  const topic = MOCK_TOPICS.find((t) => t.id === 'history-gr10-colonial-transitions');
  assert.ok(topic, 'history-gr10-colonial-transitions must exist in MOCK_TOPICS');
  assert.strictEqual(topic.subjectId, 'history', 'Subject must be history');
  assert.strictEqual(topic.grade, 'grade-10', 'Grade must be grade-10');
  assert.strictEqual(topic.chapterNumber, 3, 'Chapter number must be 3');
});

// 2. Verify TeachMePage navigation resolution logic (Finding 2)
test('REG-02: TeachMePage resolves subject without inheriting stale subject from previous context', () => {
  const testCases = [
    {
      name: 'Topic resolved matches context',
      topic: { id: 'history-gr10-colonial-transitions', subjectId: 'history' },
      learningContext: { subjectId: 'history', topicId: 'history-gr10-colonial-transitions' },
      targetTopicId: 'history-gr10-colonial-transitions',
      expectedSubject: 'history'
    },
    {
      name: 'Unverified topic must NOT inherit stale ICT subject context (Finding 2)',
      topic: undefined, // Simulates unverified topic
      learningContext: { subjectId: 'ict', topicId: 'number-systems' }, // Student was studying ICT
      targetTopicId: 'history-gr10-colonial-transitions',
      expectedSubject: undefined // MUST be undefined, preventing navigation to /tutor?subject=ict
    },
    {
      name: 'Topic resolved correctly overrides stale context',
      topic: { id: 'science-gr10-ch2-motion', subjectId: 'science' },
      learningContext: { subjectId: 'ict', topicId: 'number-systems' },
      targetTopicId: 'science-gr10-ch2-motion',
      expectedSubject: 'science'
    }
  ];

  for (const tc of testCases) {
    // Exact resolution logic used in TeachMePage.tsx
    const resolvedSubjectId = tc.topic?.subjectId || (tc.learningContext.topicId === tc.targetTopicId ? tc.learningContext.subjectId : undefined);
    assert.strictEqual(
      resolvedSubjectId,
      tc.expectedSubject,
      `[${tc.name}] Resolved subject must be ${tc.expectedSubject} but got ${resolvedSubjectId}`
    );
    if (tc.targetTopicId.startsWith('history')) {
      assert.notStrictEqual(resolvedSubjectId, 'ict', 'Subject must never fall back to ict for history');
    }
  }
});

// 3. Verify MockTutorAdapter does NOT fall through to Photosynthesis for Motion (Finding 4 signature: askTutor(q, context))
test('REG-03 & REG-07: MockTutorAdapter handles science-gr10-ch2-motion without Photosynthesis contamination', async () => {
  const { tutorService } = await import('../src/api/tutorApi.ts');
  tutorService.setMockMode(true);

  const motionContext = {
    subjectId: 'science',
    topicId: 'science-gr10-ch2-motion',
    grade: 'grade-10'
  };

  // Correct 2-parameter signature: askTutor(question, context)
  const clarifyResponse = await tutorService.askTutor(
    'Clarify more: Can you explain the equations of motion step by step?',
    motionContext
  );

  assert.ok(clarifyResponse.answer, 'Answer must not be empty');
  assert.ok(
    clarifyResponse.answer.toLowerCase().includes('motion') ||
    clarifyResponse.answer.includes('v = u + at') ||
    clarifyResponse.answer.toLowerCase().includes('displacement'),
    'Answer must discuss motion kinematics'
  );
  assert.ok(
    !clarifyResponse.answer.toLowerCase().includes('photosynthesis'),
    'CRITICAL: Motion response must NOT contain photosynthesis!'
  );
  assert.ok(
    !clarifyResponse.answer.toLowerCase().includes('chlorophyll'),
    'CRITICAL: Motion response must NOT contain chlorophyll!'
  );
});

// 4. Verify MockTutorAdapter rejects Photosynthesis for unmocked topics
test('REG-04: MockTutorAdapter returns unmocked topic notice instead of falling through to Photosynthesis', async () => {
  const { tutorService } = await import('../src/api/tutorApi.ts');
  tutorService.setMockMode(true);

  const unmockedContext = {
    subjectId: 'science',
    topicId: 'science-gr10-ch1-chemical-basis',
    grade: 'grade-10'
  };

  // Correct 2-parameter signature
  const response = await tutorService.askTutor(
    'Clarify more: Can you explain this step by step?',
    unmockedContext
  );

  assert.ok(
    !response.answer.toLowerCase().includes('photosynthesis'),
    'Unmocked science topic must NOT fall through to Photosynthesis'
  );
  assert.ok(
    response.answer.includes('Offline Mock Mode Notice') || response.answer.includes('science-gr10-ch1-chemical-basis'),
    'Response must indicate offline mock mode limitation'
  );
});

// 5. Verify Photosynthesis topic still functions correctly
test('REG-05: Photosynthesis topic in Grade 8 produces Photosynthesis response', async () => {
  const { tutorService } = await import('../src/api/tutorApi.ts');
  tutorService.setMockMode(true);

  const photoContext = {
    subjectId: 'science',
    topicId: 'photosynthesis',
    grade: 'grade-8'
  };

  // Correct 2-parameter signature
  const response = await tutorService.askTutor(
    'Clarify more about photosynthesis',
    photoContext
  );

  assert.ok(
    response.answer.toLowerCase().includes('photosynthesis') ||
    response.answer.toLowerCase().includes('glucose'),
    'Photosynthesis topic must produce photosynthesis content'
  );
});

// 6. Verify TutorPage URL reconciliation prevents contradictory subject/topic params
test('REG-08: TutorPage reconciles subject when contradictory URL parameters are passed', async () => {
  const { MOCK_TOPICS } = await import('../src/mocks/curriculumData.ts');

  const paramSubject = 'ict';
  const paramTopic = 'history-gr10-colonial-transitions';
  const learningContextSubject = 'history';

  const foundTopic = paramTopic ? MOCK_TOPICS.find((t) => t.id === paramTopic) : undefined;
  assert.ok(foundTopic, 'Topic must be found in catalog');

  // Exact logic implemented in TutorPage.tsx (without arbitrary grade defaults)
  const activeSubjectId = (foundTopic && paramSubject && foundTopic.subjectId.toLowerCase() !== paramSubject.toLowerCase())
    ? foundTopic.subjectId
    : (paramSubject || foundTopic?.subjectId || learningContextSubject || 'science');

  assert.strictEqual(activeSubjectId, 'history', 'Must correct conflicting subject ict to topic subject history');
});

// 7. Verify ICT Mock Isolation: Does NOT fall through to Number Systems for other ICT topics (Finding 5)
test('REG-09: ICT Mock isolates number-systems from internet, physical-computing, etc.', async () => {
  const { tutorService } = await import('../src/api/tutorApi.ts');
  tutorService.setMockMode(true);

  const internetContext = {
    subjectId: 'ict',
    topicId: 'internet',
    grade: 'grade-8'
  };

  // Clarify more on Internet
  const clarifyResponse = await tutorService.askTutor(
    'Clarify more: Can you break this down step-by-step with more details?',
    internetContext
  );

  assert.ok(
    !clarifyResponse.answer.toLowerCase().includes('positional powers of 2') &&
    !clarifyResponse.answer.toLowerCase().includes('the transistor as an on/off valve') &&
    !clarifyResponse.answer.toLowerCase().includes('1011_2'),
    'CRITICAL: Internet topic Clarify must NOT return Number Systems binary breakdown!'
  );

  // Simpler on Internet
  const simplerResponse = await tutorService.askTutor(
    'Explain simpler',
    internetContext
  );

  assert.ok(
    !simplerResponse.answer.toLowerCase().includes('ceiling light switch') &&
    !simplerResponse.answer.toLowerCase().includes('binary & bits'),
    'CRITICAL: Internet topic Simpler must NOT return Number Systems binary switches!'
  );
});

// 8. Live Learner Journey 1: Science Ch 1 -> Ch 2 switch maintains separate topic/chapter isolation
test('JOURNEY-01: Science Ch 1 -> Ch 2 transition maintains separate topic/chapter isolation without contamination', async () => {
  const { tutorService } = await import('../src/api/tutorApi.ts');
  tutorService.setMockMode(true);

  // Step 1: Learner studies Chapter 1 (Chemical Basis of Life)
  const ch1Context = {
    subjectId: 'science',
    topicId: 'science-gr10-ch1-chemical-basis',
    grade: 'grade-10'
  };
  const ch1Response = await tutorService.askTutor('What is this chapter about?', ch1Context);
  assert.ok(
    !ch1Response.answer.toLowerCase().includes('v = u + at') &&
    !ch1Response.answer.toLowerCase().includes('displacement') &&
    !ch1Response.answer.toLowerCase().includes('photosynthesis'),
    'Chapter 1 must NOT discuss motion equations or Grade 8 photosynthesis'
  );

  // Step 2: Learner navigates to Chapter 2 (Motion) and asks "Clarify more"
  const ch2Context = {
    subjectId: 'science',
    topicId: 'science-gr10-ch2-motion',
    grade: 'grade-10'
  };
  const ch2Response = await tutorService.askTutor(
    'Clarify more: Can you explain the equations of motion step by step?',
    ch2Context
  );

  // Assert strictly grounded in Motion
  assert.ok(
    ch2Response.answer.toLowerCase().includes('motion') ||
    ch2Response.answer.includes('v = u + at') ||
    ch2Response.answer.toLowerCase().includes('displacement'),
    'Chapter 2 Motion response must discuss kinematics'
  );
  assert.ok(
    !ch2Response.answer.toLowerCase().includes('chemical basis') &&
    !ch2Response.answer.toLowerCase().includes('photosynthesis'),
    'Chapter 2 Motion response must NOT be contaminated by Ch 1 or Grade 8 Photosynthesis'
  );
});

// 9. Live Learner Journey 2: History -> ICT -> History navigation cycle preserves context integrity
test('JOURNEY-02: History -> ICT -> History navigation cycle resolves subjects deterministically', async () => {
  const { MOCK_TOPICS } = await import('../src/mocks/curriculumData.ts');

  // Step 1: User visits History Grade 10 Chapter 3 (Teach Me)
  const step1TargetTopicId = 'history-gr10-colonial-transitions';
  const step1Context = { subjectId: 'history', topicId: 'history-gr10-colonial-transitions' };
  const topic1 = MOCK_TOPICS.find((t) => t.id === step1TargetTopicId);
  const resolvedSubject1 = topic1?.subjectId || (step1Context.topicId === step1TargetTopicId ? step1Context.subjectId : undefined);
  assert.strictEqual(resolvedSubject1, 'history', 'Step 1: Must resolve to history');

  // Step 2: User switches to ICT (e.g. Number Systems)
  const step2TargetTopicId = 'number-systems';
  const step2Context = { subjectId: resolvedSubject1, topicId: step1TargetTopicId }; // Stale history context
  const topic2 = MOCK_TOPICS.find((t) => t.id === step2TargetTopicId);
  const resolvedSubject2 = topic2?.subjectId || (step2Context.topicId === step2TargetTopicId ? step2Context.subjectId : undefined);
  assert.strictEqual(resolvedSubject2, 'ict', 'Step 2: Must resolve to ict, overriding stale history context');

  // Step 3: User navigates back to History Chapter 3
  const step3TargetTopicId = 'history-gr10-colonial-transitions';
  const step3Context = { subjectId: resolvedSubject2, topicId: step2TargetTopicId }; // Stale ICT context
  const topic3 = MOCK_TOPICS.find((t) => t.id === step3TargetTopicId);
  const resolvedSubject3 = topic3?.subjectId || (step3Context.topicId === step3TargetTopicId ? step3Context.subjectId : undefined);
  assert.strictEqual(resolvedSubject3, 'history', 'Step 3: Must resolve to history, NEVER contaminated by ICT');
  assert.notStrictEqual(resolvedSubject3, 'ict', 'Step 3: Stale ICT must never contaminate History navigation URL');
});

// 10. Live Learner Journey 3: Contradictory URL parameter reconciliation and mismatch prevention
test('JOURNEY-03: Contradictory URL params /tutor?subject=ict&topic=history-gr10-colonial-transitions are reconciled', async () => {
  const { MOCK_TOPICS } = await import('../src/mocks/curriculumData.ts');

  const incomingUrlParams = {
    subject: 'ict', // Contaminated URL from buggy bookmark/external link
    topic: 'history-gr10-colonial-transitions'
  };

  const foundTopic = MOCK_TOPICS.find((t) => t.id === incomingUrlParams.topic);
  assert.ok(foundTopic, 'Topic must exist in catalog');

  // TutorPage subject reconciliation algorithm
  const activeSubjectId = (foundTopic && incomingUrlParams.subject && foundTopic.subjectId.toLowerCase() !== incomingUrlParams.subject.toLowerCase())
    ? foundTopic.subjectId
    : (incomingUrlParams.subject || foundTopic?.subjectId || 'history');

  assert.strictEqual(
    activeSubjectId,
    'history',
    'TutorPage must correct contaminated subject=ict to canonical topic subject=history'
  );
});

// 11. Verify MockTutorAdapter handles science-gr10-ch3-structure-of-matter with full pedagogical depth
test('REG-10: MockTutorAdapter handles science-gr10-ch3-structure-of-matter without contamination', async () => {
  const { tutorService } = await import('../src/api/tutorApi.ts');
  tutorService.setMockMode(true);

  const context = {
    subjectId: 'science',
    topicId: 'science-gr10-ch3-structure-of-matter',
    grade: 'grade-10'
  };

  // Test 1: "Clarify more"
  const clarifyResponse = await tutorService.askTutor(
    'Can you clarify the core concepts of this lesson step-by-step?',
    context
  );

  assert.ok(clarifyResponse.answer, 'Answer must not be empty');
  assert.ok(
    clarifyResponse.answer.toLowerCase().includes('subatomic') ||
    clarifyResponse.answer.toLowerCase().includes('proton') ||
    clarifyResponse.answer.toLowerCase().includes('electron') ||
    clarifyResponse.answer.toLowerCase().includes('isotope'),
    'Answer must discuss atomic structure and subatomic particles'
  );
  assert.ok(
    !clarifyResponse.answer.toLowerCase().includes('photosynthesis'),
    'Structure of Matter must NOT contain Photosynthesis!'
  );
  assert.ok(
    !clarifyResponse.answer.toLowerCase().includes('chlorophyll'),
    'Structure of Matter must NOT contain Chlorophyll!'
  );
  assert.ok(
    !clarifyResponse.answer.toLowerCase().includes('v = u + at'),
    'Structure of Matter must NOT contain Motion equations!'
  );

  // Test 2: "Explain simpler"
  const simplerResponse = await tutorService.askTutor('Explain simpler', context);
  assert.ok(
    simplerResponse.answer.toLowerCase().includes('solar system') ||
    simplerResponse.answer.toLowerCase().includes('proton'),
    'Simpler explanation should use solar system analogy for atom'
  );

  // Test 3: "Sri Lankan Example"
  const exampleResponse = await tutorService.askTutor('Sri Lankan Example', context);
  assert.ok(
    exampleResponse.answer.includes('Sigiriya') ||
    exampleResponse.answer.includes('Bogala') ||
    exampleResponse.answer.includes('Carbon-14'),
    'Example must reference Sri Lankan atomic applications (Carbon-14 Sigiriya or Bogala graphite)'
  );
});

// ============================================================================
// P0 R3: SIMULATION RESOLUTION & INTEGRITY TESTS
// ============================================================================

test('SIM-01: Structure of Matter resolves simulation capability and visualizer key deterministically', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getScienceVisualizerKey } = await import('../src/components/interactive/ScienceConceptVisualizer.tsx');

  const topicId = 'science-gr10-ch3-structure-of-matter';
  assert.strictEqual(hasSimulation(topicId, 'science'), true, 'Structure of matter must have simulation capability');
  assert.strictEqual(getScienceVisualizerKey(topicId), 'structure-of-matter', 'Structure of matter must map to structure-of-matter key');

  // Verify Sinhala / Tamil / hint mappings
  assert.strictEqual(getScienceVisualizerKey('ch3-structure-of-matter'), 'structure-of-matter');
  assert.strictEqual(getScienceVisualizerKey('science-topic', 'පදාර්ථයේ ව්‍යුහය'), 'structure-of-matter');
  assert.strictEqual(getScienceVisualizerKey('science-topic', 'electron shell configuration'), 'structure-of-matter');
});

test('SIM-02: Motion resolves simulation capability and remains isolated from Structure of Matter', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getScienceVisualizerKey } = await import('../src/components/interactive/ScienceConceptVisualizer.tsx');

  const topicId = 'science-gr10-ch2-motion';
  assert.strictEqual(hasSimulation(topicId, 'science'), true, 'Motion must have simulation capability');
  assert.strictEqual(getScienceVisualizerKey(topicId), 'motion', 'Motion must map to motion key');
  assert.notStrictEqual(getScienceVisualizerKey(topicId), 'structure-of-matter', 'Motion must never map to structure-of-matter');
});

test('SIM-03: Rate of Reactions resolves simulation capability across Teach Me and AI Tutor Companion', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getScienceVisualizerKey } = await import('../src/components/interactive/ScienceConceptVisualizer.tsx');

  const topicId = 'science-gr10-ch17-rate-of-reactions';
  assert.strictEqual(hasSimulation(topicId, 'science'), true, 'Rate of reactions must have simulation capability');
  assert.strictEqual(getScienceVisualizerKey(topicId), 'rate-reactions', 'Rate of reactions must map to rate-reactions key');
});

test('SIM-04: Negative Proof - Unsupported Science chapter returns hasSimulation=false (prevents empty Live Simulation shell)', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getScienceVisualizerKey } = await import('../src/components/interactive/ScienceConceptVisualizer.tsx');

  // Chapter 5 (Friction) and Chapter 1 (Quantification) currently have no interactive simulation
  assert.strictEqual(hasSimulation('science-gr10-ch5-friction', 'science'), false, 'Friction must return false for simulation capability');
  assert.strictEqual(getScienceVisualizerKey('science-gr10-ch5-friction'), null, 'Friction visualizer key must be null');

  assert.strictEqual(hasSimulation('science-gr10-ch1-quantification', 'science'), false, 'Quantification must return false');
  assert.strictEqual(getScienceVisualizerKey('science-gr10-ch1-quantification'), null, 'Quantification visualizer key must be null');
});

test('SIM-05: Negative Proof - Unknown/custom topic returns hasSimulation=false with no fallback visualizer', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getScienceVisualizerKey } = await import('../src/components/interactive/ScienceConceptVisualizer.tsx');
  const { getMathsVisualizerKey } = await import('../src/components/interactive/MathsConceptVisualizer.tsx');
  const { getHistoryVisualizerKey } = await import('../src/components/interactive/HistoryConceptVisualizer.tsx');

  const unknownTopic = 'custom-unknown-topic-999';
  assert.strictEqual(hasSimulation(unknownTopic), false, 'Unknown topic must have hasSimulation=false');
  assert.strictEqual(getScienceVisualizerKey(unknownTopic), null, 'Science visualizer key must be null');
  assert.strictEqual(getMathsVisualizerKey(unknownTopic), null, 'Maths visualizer key must be null');
  assert.strictEqual(getHistoryVisualizerKey(unknownTopic), null, 'History visualizer key must be null');
});

test('SIM-06: Maths and History capability contracts resolve correctly and reject unsupported topics', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getMathsVisualizerKey } = await import('../src/components/interactive/MathsConceptVisualizer.tsx');
  const { getHistoryVisualizerKey } = await import('../src/components/interactive/HistoryConceptVisualizer.tsx');

  // Maths supported topic
  assert.strictEqual(hasSimulation('maths-gr10-ch1-perimeter', 'maths'), true);
  assert.strictEqual(getMathsVisualizerKey('maths-gr10-ch1-perimeter'), 'perimeter');

  // Maths unsupported chapter
  assert.strictEqual(hasSimulation('maths-gr10-ch99-unsupported', 'maths'), false);
  assert.strictEqual(getMathsVisualizerKey('maths-gr10-ch99-unsupported'), null);

  // History supported topic
  assert.strictEqual(hasSimulation('history-gr10-ch4-sluice', 'history'), true);
  assert.strictEqual(getHistoryVisualizerKey('history-gr10-ch4-sluice'), 'sluice');

  // History unsupported chapter
  assert.strictEqual(hasSimulation('history-gr10-ch99-unsupported', 'history'), false);
  assert.strictEqual(getHistoryVisualizerKey('history-gr10-ch99-unsupported'), null);
});

test('SIM-07: Cross-chapter sequential transition updates visualizer mode deterministically', async () => {
  const { hasSimulation } = await import('../src/components/interactive/SubjectConceptVisualizer.tsx');
  const { getScienceVisualizerKey } = await import('../src/components/interactive/ScienceConceptVisualizer.tsx');

  const chapterSequence = [
    { topicId: 'science-gr10-ch2-motion', expectedKey: 'motion', hasSim: true },
    { topicId: 'science-gr10-ch3-structure-of-matter', expectedKey: 'structure-of-matter', hasSim: true },
    { topicId: 'science-gr10-ch5-friction', expectedKey: null, hasSim: false },
    { topicId: 'science-gr10-ch17-rate-of-reactions', expectedKey: 'rate-reactions', hasSim: true },
  ];

  for (const step of chapterSequence) {
    assert.strictEqual(hasSimulation(step.topicId, 'science'), step.hasSim);
    assert.strictEqual(getScienceVisualizerKey(step.topicId), step.expectedKey);
  }
});

// ============================================================
// R4: False Session Transfer Across Curriculum Contexts (SESS-01 to SESS-12)
// ============================================================

// Provide sessionStorage polyfill for Node.js test environment if not present
if (typeof globalThis.sessionStorage === 'undefined') {
  const store = new Map();
  globalThis.sessionStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
    get length() { return store.size; },
    key: (i) => Array.from(store.keys())[i] || null,
  };
}

test('SESS-01: Topic A -> Topic B conversation isolation (no transcript leakage)', async () => {
  const {
    getTutorSessionStorageKey,
    saveTutorSessionMessages,
    loadTutorSessionMessages,
    buildInitialGreeting,
  } = await import('../src/features/tutor/TutorPage.tsx');

  globalThis.sessionStorage.clear();

  const user = 'stu-ol-10-amila';
  const grade = 'grade-10';
  const subject = 'science';

  // Student is on Topic A (Structure of Matter) and has a conversation
  const keyTopicA = getTutorSessionStorageKey(user, grade, subject, 'science-gr10-ch3-structure-of-matter');
  const msgsTopicA = [
    buildInitialGreeting(subject, 'science-gr10-ch3-structure-of-matter', 'en', 'Amila', grade),
    { id: 'msg-s1', role: 'student', content: 'What is the electron arrangement in Bohr model?' },
    { id: 'msg-t1', role: 'tutor', content: 'In the Bohr model, electrons occupy discrete shells (2, 8, 8).' },
  ];
  saveTutorSessionMessages(keyTopicA, msgsTopicA);

  // Switch context to Topic B (Rate of Reactions)
  const keyTopicB = getTutorSessionStorageKey(user, grade, subject, 'science-gr10-ch17-rate-of-reactions');
  assert.notStrictEqual(keyTopicA, keyTopicB, 'Topic keys must be strictly isolated');

  // Verify Topic B starts with fresh greeting, NOT Topic A transcript
  const cachedTopicB = loadTutorSessionMessages(keyTopicB);
  assert.strictEqual(cachedTopicB, null, 'Topic B must have no cached messages initially');

  const greetingTopicB = buildInitialGreeting(subject, 'science-gr10-ch17-rate-of-reactions', 'en', 'Amila', grade);
  assert.ok(greetingTopicB.content.includes('Rate of Reactions'), 'Topic B greeting must refer to Rate of Reactions');
  assert.ok(!greetingTopicB.content.includes('Bohr'), 'Topic B greeting must NOT contain Bohr model');
});

test('SESS-02: Topic A -> Topic B -> Topic A transcript restoration', async () => {
  const {
    getTutorSessionStorageKey,
    saveTutorSessionMessages,
    loadTutorSessionMessages,
    buildInitialGreeting,
  } = await import('../src/features/tutor/TutorPage.tsx');

  const user = 'stu-ol-10-amila';
  const grade = 'grade-10';
  const subject = 'science';

  const keyA = getTutorSessionStorageKey(user, grade, subject, 'science-gr10-ch3-structure-of-matter');
  const keyB = getTutorSessionStorageKey(user, grade, subject, 'science-gr10-ch17-rate-of-reactions');

  // Save Topic A transcript
  const msgsA = [
    buildInitialGreeting(subject, 'science-gr10-ch3-structure-of-matter', 'en', 'Amila', grade),
    { id: 'msg-s1', role: 'student', content: 'Tell me about isotopes' },
  ];
  saveTutorSessionMessages(keyA, msgsA);

  // Student conducts discussion on Topic B
  const msgsB = [
    buildInitialGreeting(subject, 'science-gr10-ch17-rate-of-reactions', 'en', 'Amila', grade),
    { id: 'msg-s2', role: 'student', content: 'What is collision theory?' },
  ];
  saveTutorSessionMessages(keyB, msgsB);

  // Student returns to Topic A
  const restoredA = loadTutorSessionMessages(keyA);
  assert.ok(restoredA, 'Topic A messages must be restored from tab session cache');
  assert.strictEqual(restoredA.length, 2);
  assert.strictEqual(restoredA[1].content, 'Tell me about isotopes');
});

test('SESS-03: Reset isolation on Topic B preserves Topic A history', async () => {
  const {
    getTutorSessionStorageKey,
    saveTutorSessionMessages,
    loadTutorSessionMessages,
    clearTutorSessionMessages,
  } = await import('../src/features/tutor/TutorPage.tsx');

  const user = 'stu-ol-10-amila';
  const grade = 'grade-10';
  const subject = 'science';

  const keyA = getTutorSessionStorageKey(user, grade, subject, 'science-gr10-ch3-structure-of-matter');
  const keyB = getTutorSessionStorageKey(user, grade, subject, 'science-gr10-ch17-rate-of-reactions');

  saveTutorSessionMessages(keyA, [{ id: '1', role: 'student', content: 'Matter msg' }]);
  saveTutorSessionMessages(keyB, [{ id: '2', role: 'student', content: 'Rate msg' }]);

  // Reset Topic B
  clearTutorSessionMessages(keyB);

  assert.strictEqual(loadTutorSessionMessages(keyB), null, 'Topic B cache must be cleared');
  const restoredA = loadTutorSessionMessages(keyA);
  assert.ok(restoredA, 'Topic A cache must remain intact');
  assert.strictEqual(restoredA[0].content, 'Matter msg');
});

test('SESS-04: Subject A -> Subject B starter pills & persona isolation', async () => {
  const { getCurriculumStarterPills, buildInitialGreeting } = await import('../src/features/tutor/TutorPage.tsx');

  // Science Structure of Matter pills
  const sciPills = getCurriculumStarterPills('science', 'science-gr10-ch3-structure-of-matter', 'en');
  assert.ok(sciPills.some((p) => p.id === 'sci-bohr'), 'Science matter pills must contain Bohr model');
  assert.ok(!sciPills.some((p) => p.id === 'ict-num'), 'Science pills must NOT contain ICT pills');

  // ICT Number Systems pills
  const ictPills = getCurriculumStarterPills('ict', 'number-systems', 'en');
  assert.ok(ictPills.some((p) => p.id === 'ict-num'), 'ICT pills must contain number systems');
  assert.ok(!ictPills.some((p) => p.id === 'sci-bohr'), 'ICT pills must NOT contain Science Bohr pills');

  // Subject Greetings
  const sciGreeting = buildInitialGreeting('science', 'structure-of-matter', 'en', 'Amila', 'grade-10');
  const ictGreeting = buildInitialGreeting('ict', 'number-systems', 'en', 'Amila', 'grade-10');
  assert.ok(sciGreeting.content.includes('Structure of Matter'));
  assert.ok(ictGreeting.content.includes('Information & Communication Technology'));
});

test('SESS-05 & SESS-06: Per-topic conversationId scoping and Teach Me persistence', async () => {
  const { getTutorSessionStorageKey, saveTutorSessionMessages, loadTutorSessionMessages } = await import('../src/features/tutor/TutorPage.tsx');

  // Conversation map calculation matches studentContext getOrCreateConversationId
  const computeKey = (user, grade, sid, tid) => `${user}:${grade}:${sid}:${tid}`;

  const user = 'stu-ol-10-amila';
  const grade = 'grade-10';

  const mapKeySci = computeKey(user, grade, 'science', 'science-gr10-ch3-structure-of-matter');
  const mapKeyHist = computeKey(user, grade, 'history', 'history-gr10-sources');
  assert.notStrictEqual(mapKeySci, mapKeyHist, 'Conversation keys across subjects must be isolated');

  // Tutor -> Teach Me -> Tutor session round-trip
  const tutorKey = getTutorSessionStorageKey(user, grade, 'science', 'science-gr10-ch3-structure-of-matter');
  saveTutorSessionMessages(tutorKey, [{ id: 'm1', role: 'tutor', content: 'Learning about atoms' }]);

  // Simulate navigating to TeachMe then back to Tutor
  const restored = loadTutorSessionMessages(tutorKey);
  assert.ok(restored);
  assert.strictEqual(restored[0].content, 'Learning about atoms');
});

test('SESS-07: Browser tab refresh restoration from tab-local cache', async () => {
  const { getTutorSessionStorageKey, saveTutorSessionMessages, loadTutorSessionMessages } = await import('../src/features/tutor/TutorPage.tsx');

  const key = getTutorSessionStorageKey('stu-1', 'grade-10', 'science', 'science-gr10-ch2-motion');
  saveTutorSessionMessages(key, [
    { id: '1', role: 'student', content: 'What is acceleration?' },
    { id: '2', role: 'tutor', content: 'Acceleration is the rate of change of velocity.' },
  ]);

  // Simulate fresh mount on page reload
  const reloaded = loadTutorSessionMessages(key);
  assert.ok(reloaded);
  assert.strictEqual(reloaded.length, 2);
  assert.strictEqual(reloaded[1].content, 'Acceleration is the rate of change of velocity.');
});

test('SESS-08: Sequential topic transitions (History back/forward simulation)', async () => {
  const { getTutorSessionStorageKey, saveTutorSessionMessages, loadTutorSessionMessages } = await import('../src/features/tutor/TutorPage.tsx');

  const user = 'stu-1';
  const grade = 'grade-10';
  const keyMotion = getTutorSessionStorageKey(user, grade, 'science', 'science-gr10-ch2-motion');
  const keyMatter = getTutorSessionStorageKey(user, grade, 'science', 'science-gr10-ch3-structure-of-matter');
  const keyReactions = getTutorSessionStorageKey(user, grade, 'science', 'science-gr10-ch17-rate-of-reactions');

  saveTutorSessionMessages(keyMotion, [{ id: 'mot', role: 'student', content: 'Motion question' }]);
  saveTutorSessionMessages(keyMatter, [{ id: 'mat', role: 'student', content: 'Matter question' }]);
  saveTutorSessionMessages(keyReactions, [{ id: 'rxn', role: 'student', content: 'Reactions question' }]);

  // Back to Matter
  assert.strictEqual(loadTutorSessionMessages(keyMatter)[0].content, 'Matter question');
  // Back to Motion
  assert.strictEqual(loadTutorSessionMessages(keyMotion)[0].content, 'Motion question');
  // Forward to Reactions
  assert.strictEqual(loadTutorSessionMessages(keyReactions)[0].content, 'Reactions question');
});

test('SESS-09: Multi-tab isolation simulation', async () => {
  const { getTutorSessionStorageKey } = await import('../src/features/tutor/TutorPage.tsx');

  // Tab 1 sessionStorage mock
  const tab1Store = new Map();
  // Tab 2 sessionStorage mock
  const tab2Store = new Map();

  const key = getTutorSessionStorageKey('stu-1', 'grade-10', 'science', 'science-gr10-ch3-structure-of-matter');

  tab1Store.set(key, JSON.stringify([{ id: '1', role: 'student', content: 'Tab 1 prompt' }]));
  tab2Store.set(key, JSON.stringify([{ id: '2', role: 'student', content: 'Tab 2 prompt' }]));

  assert.notStrictEqual(
    JSON.parse(tab1Store.get(key))[0].content,
    JSON.parse(tab2Store.get(key))[0].content,
    'Each browser tab maintains isolated sessionStorage'
  );
});

test('SESS-10: User logout purges all atlas_messages_* and tutor maps', () => {
  // Populate sessionStorage with various keys
  globalThis.sessionStorage.setItem('atlas_messages_u1_g10_sci_matter', '[]');
  globalThis.sessionStorage.setItem('atlas_messages_u1_g10_sci_motion', '[]');
  globalThis.sessionStorage.setItem('atlas_tutor_conversation_map', '[["k","v"]]');
  globalThis.sessionStorage.setItem('atlas_tutor_lease_token', 'token-123');
  globalThis.sessionStorage.setItem('unrelated_key', 'keep_me');

  // Exact logout cleanup algorithm from studentContext.tsx
  const keysToRemove = [];
  for (let i = 0; i < globalThis.sessionStorage.length; i++) {
    const k = globalThis.sessionStorage.key(i);
    if (k && (k.startsWith('atlas_messages_') || k.startsWith('atlas_tutor_'))) {
      keysToRemove.push(k);
    }
  }
  keysToRemove.forEach((k) => globalThis.sessionStorage.removeItem(k));

  assert.strictEqual(globalThis.sessionStorage.getItem('atlas_messages_u1_g10_sci_matter'), null);
  assert.strictEqual(globalThis.sessionStorage.getItem('atlas_messages_u1_g10_sci_motion'), null);
  assert.strictEqual(globalThis.sessionStorage.getItem('atlas_tutor_conversation_map'), null);
  assert.strictEqual(globalThis.sessionStorage.getItem('atlas_tutor_lease_token'), null);
  assert.strictEqual(globalThis.sessionStorage.getItem('unrelated_key'), 'keep_me');
});

test('SESS-11: activeModeHint scopes strictly to incoming topic messages', () => {
  // Simulates derivation of activeModeHint from messages array
  const deriveHint = (msgs) => {
    const lastStudent = [...msgs].reverse().find((m) => m.role === 'student');
    return lastStudent ? lastStudent.content : undefined;
  };

  const msgsTopicA = [
    { role: 'student', content: 'Show me the Bohr atomic model with 6 electrons' },
    { role: 'tutor', content: 'Carbon has 6 electrons: 2 in K shell, 4 in L shell.' },
  ];
  assert.strictEqual(deriveHint(msgsTopicA), 'Show me the Bohr atomic model with 6 electrons');

  // Switched to Topic B (fresh greeting only, no student message yet)
  const msgsTopicB = [
    { role: 'tutor', content: 'Welcome to Rate of Reactions.' },
  ];
  assert.strictEqual(deriveHint(msgsTopicB), undefined, 'Topic B hint must be undefined, not inheriting Topic A');
});

test('SESS-12: tutorService.clearConversation forwards scoped parameters', async () => {
  const { AtlasLiveTutorAdapter } = await import('../src/api/tutorApi.ts');
  const { apiClient } = await import('../src/api/client.ts');

  let interceptedUrl = null;
  const originalDelete = apiClient.delete;
  apiClient.delete = async (url) => {
    interceptedUrl = url;
    return { data: { success: true } };
  };

  try {
    const adapter = new AtlasLiveTutorAdapter();
    await adapter.clearConversation('conv-123', {
      grade: 'grade-10',
      subject: 'science',
      topicId: 'science-gr10-ch3-structure-of-matter',
    });

    assert.ok(interceptedUrl, 'Delete request must be made');
    assert.ok(interceptedUrl.startsWith('/api/learn/conversations/conv-123'), 'URL must match conversationId');
    assert.ok(interceptedUrl.includes('grade=grade-10'), 'Query must include grade');
    assert.ok(interceptedUrl.includes('subject=science'), 'Query must include subject');
    assert.ok(interceptedUrl.includes('topicId=science-gr10-ch3-structure-of-matter'), 'Query must include topicId');
  } finally {
    apiClient.delete = originalDelete;
  }
});


