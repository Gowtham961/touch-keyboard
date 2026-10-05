// Curated lesson plans, n-gram combinations, and dynamic drill generator

export const LESSONS = [
  {
    id: 'benchmark-5min',
    title: '5-Minute Mastery Benchmark',
    category: 'Assessment',
    isTimed: true,
    durationSeconds: 300, // 5 minutes
    tag: 'Official 5-Min Test',
    description: 'The complete 5-minute home row assessment measuring total keys pressed and accuracy across all 8 keys (A S D F J K L ;).',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    sampleText: 'asdf jkl; fdsa ;lkj fjdk sla; ask dad fall flask salad glad all sad alas lad adds ask dad fall glad flask asdf jkl; fjdk sla; all sad flask salad glad ask dad fall alas lad asdf jkl; fdsa ;lkj fjdk sla; fall glad flask salad ask dad all sad alas lad adds asdf jkl; fjdk sla; salad glad flask fall ask dad all sad alas lad asdf jkl;',
  },
  {
    id: 'lesson-1-anchors',
    title: '1. Index Anchors (F & J)',
    category: 'Guided Learning',
    isTimed: false,
    durationSeconds: 180,
    tag: 'Beginner',
    description: 'Master the two anchor keys equipped with physical homing bumps to orient your hands without looking.',
    keys: ['f', 'j'],
    sampleText: 'ff jj ff jj f j f j fj jf fj jf ffjj jjff ffff jjjj fjfj jfjf ff jj fj jf ffjj jf j f j ff jj fj jf',
  },
  {
    id: 'lesson-2-middle',
    title: '2. Middle Fingers (D & K)',
    category: 'Guided Learning',
    isTimed: false,
    durationSeconds: 180,
    tag: 'Beginner',
    description: 'Add the middle fingers on D (left hand) and K (right hand) alongside your index anchors.',
    keys: ['d', 'f', 'j', 'k'],
    sampleText: 'dd kk dd kk d k d k dk kd dk kd df jk fd kj ff dd jj kk dfjk kjfd d k f j dk fj kf jd dk kd df jk',
  },
  {
    id: 'lesson-3-ring',
    title: '3. Ring Fingers (S & L)',
    category: 'Guided Learning',
    isTimed: false,
    durationSeconds: 180,
    tag: 'Intermediate',
    description: 'Engage the ring fingers on S (left hand) and L (right hand) to expand your home row span.',
    keys: ['s', 'd', 'f', 'j', 'k', 'l'],
    sampleText: 'ss ll ss ll s l s l sl ls sl ls sk dl ks ld fs jl sf lj sdf jkl lks fsd sl ls sk ld fs jl sdf jkl',
  },
  {
    id: 'lesson-4-pinky',
    title: '4. Pinky Mastery (A & ;)',
    category: 'Guided Learning',
    isTimed: false,
    durationSeconds: 180,
    tag: 'Intermediate',
    description: 'Train the outer edges of the home row: Pinky on A (left) and Semicolon ; (right).',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    sampleText: 'aa ;; aa ;; a ; a ; a; ;a as l; sa ;l ad k; da ;k af j; fa ;j asdf jkl; ;lkj fdsa a; ;a asdf jkl;',
  },
  {
    id: 'lesson-5-ngrams',
    title: '5. N-Gram Rhythm & Flow',
    category: 'Muscle Memory',
    isTimed: false,
    durationSeconds: 180,
    tag: 'N-Grams',
    description: 'Practice high-frequency home row bigrams and trigrams inspired by ngram-type to build instinctive muscle memory.',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    sampleText: 'as df jk l; fa jd ks la ;l sa fd kj ;l asdf jkl; fjdk sla; fdsa ;lkj dfjk as;l fads jlk; asdf jkl;',
  },
  {
    id: 'lesson-6-words',
    title: '6. Real Home Row Words',
    category: 'Application',
    isTimed: false,
    durationSeconds: 180,
    tag: 'Vocabulary',
    description: 'Type meaningful English words composed strictly from the 8 home row keys.',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    sampleText: 'ask dad fall flask salad glad all sad alas lad adds dads salads flasks fall glad ask all sad dad alas',
  },
  {
    id: 'lesson-7-alternating',
    title: '7. Alternating Hand Drill',
    category: 'Coordination',
    isTimed: false,
    durationSeconds: 180,
    tag: 'Coordination',
    description: 'Alternate left and right hands rhythmically to maintain balanced posture and eliminate dominant-hand bias.',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    sampleText: 'fj dk sl a; fj dk sl a; fk dj sk al f; ja jd kf ls ;a fj dk sl a; fk dj sk al f; ja jd kf ls ;a',
  },
];

// Home row word bank for procedural stream generation
export const HOME_ROW_WORDS = [
  'ask', 'dad', 'fall', 'flask', 'salad', 'glad', 'all', 'sad', 
  'alas', 'lad', 'adds', 'dads', 'salads', 'flasks', 'alfalfa', 
  'fa', 'la', 'kafka', 'kaka', 'dallas', 'lass', 'fall', 'ask'
];

export const HOME_ROW_NGRAMS = [
  'asdf', 'jkl;', 'fdsa', ';lkj', 'fjdk', 'sla;', 'as', 'df', 
  'jk', 'l;', 'fa', 'jd', 'ks', 'la', 'all', 'sad', 'glad', 'fall'
];

// Dynamic stream generator for 5-minute continuous benchmark
export function generateDynamicBenchmarkText(wordCount = 120, targetWeakKeys = []) {
  const chunks = [];
  const words = [...HOME_ROW_WORDS];
  const ngrams = [...HOME_ROW_NGRAMS];

  for (let i = 0; i < wordCount; i++) {
    // If weak keys provided, prioritize them
    if (targetWeakKeys.length > 0 && Math.random() < 0.4) {
      const weakKey = targetWeakKeys[Math.floor(Math.random() * targetWeakKeys.length)];
      // Generate pattern with weak key
      const drill = `${weakKey}${weakKey} ${weakKey}f ${weakKey}j`;
      chunks.push(drill);
    } else if (i % 3 === 0) {
      chunks.push(words[Math.floor(Math.random() * words.length)]);
    } else {
      chunks.push(ngrams[Math.floor(Math.random() * ngrams.length)]);
    }
  }

  return chunks.join(' ');
}
