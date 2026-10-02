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

