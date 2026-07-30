// Seed content for Module 1 / Sub-topic 6 (PRD section 2).
export const OKRS = {
  id: 'okrs',
  topic: 'OKRs',
  layers: [
    {
      emoji: '🧮',
      headline: 'Objectives inspire. Key results prove it.',
      explanation:
        'OKRs pair an ambitious, qualitative Objective with 2-4 measurable Key Results that prove whether you actually got there. The Objective is the destination; the Key Results are how you know you arrived.',
      keywords: [
        { word: 'Objective', def: 'An ambitious, qualitative statement of what you want to achieve.' },
        { word: 'Key Result', def: 'A specific, measurable outcome that proves the objective was reached.' },
        { word: 'OKR', def: 'The paired format of Objective and Key Results used together as one goal.' },
      ],
      mayaMessage: "Start simple — you've got this!",
      swipeLeft: 'Not sure yet',
      swipeRight: 'Got it',
    },
    {
      sectionLabel: 'Why this matters',
      storyGood: {
        company: 'Google',
        emoji: '✅',
        body: "Google adopted OKRs from investor John Doerr in 1999, when the company had under 40 employees, and has used them at massive scale ever since — famously grading key results on a 0.0-1.0 scale and treating 0.7 as a healthy, ambitious outcome rather than a failure.",
      },
      storyBad: {
        company: 'Uber',
        emoji: '❌',
        body: "Uber's goals in its early hyper-growth years were widely described by former employees as pure growth-at-all-costs, without key results balancing safety or compliance — contributing to a string of scandals that forced a full leadership and culture overhaul in 2017.",
      },
      keywords: [
        { word: '0.7 scoring', def: "Google's convention of treating a 70% key-result score as a healthy sign of an ambitious goal, not a shortfall." },
        { word: 'Sandbagging', def: 'Deliberately setting easy goals to guarantee hitting 100% — the opposite of the ambition OKRs are meant to encourage.' },
      ],
      mayaMessage: 'See the difference? One decision changes everything.',
      swipeLeft: 'Still unsure',
      swipeRight: 'Makes sense',
    },
    {
      sectionLabel: 'Real PM scenario',
      situation: {
        emoji: '🏢',
        text: "An Amazon PM's team sets an Objective to 'delight customers with faster delivery,' but the proposed key results are all internal process metrics with no customer-facing measurement.",
      },
      goodPM: {
        text: 'Pushes the team to rewrite key results around customer-visible outcomes, like reducing average delivery time or increasing on-time delivery rate, so success is measured by real customer impact.',
      },
      badPM: {
        text: "Accepts the internal-only key results because they're easier to hit, even though they don't actually prove the objective was achieved.",
      },
      interviewerNote: "This tests whether you can tell the difference between key results that are easy to hit and key results that actually prove the objective.",
      keywords: [
        { word: 'Customer-visible metric', def: "A measurement of something the customer actually experiences, not just internal process health." },
        { word: 'Vanity metric', def: 'A number that looks good and is easy to hit but doesn\'t prove real progress on the underlying goal.' },
      ],
      mayaMessage: "This is exactly what interviewers test. You're getting it!",
      swipeLeft: 'Need more',
      swipeRight: 'Ready to test',
    },
    {
      sectionLabel: 'The expert move',
      analogyTitle: 'The Marathon Finish Line',
      levels: [
        "An OKR is like training for a marathon: the Objective is 'finish the marathon strong,' and the Key Results are the specific checkpoints — mile splits, long-run distances — that prove you're actually on pace.",
        "Without this mindset, a PM sets an Objective like 'run a great marathon' with no key results at all, and has no way of knowing until race day whether months of training actually worked.",
        'A PM using the marathon mindset picks key results that are hard but achievable checkpoints — not so easy they prove nothing, not so unrealistic they get abandoned by week three.',
        'The nuance senior PMs add: a 100% score on every key result every quarter is a red flag, not a win — it usually means the goals were sandbagged. Healthy OKRs get missed sometimes, because they were actually ambitious.',
      ],
      followupQ: 'How would you respond to a team that hits 100% of their key results every single quarter?',
      keywords: [
        { word: 'Stretch goal', def: 'A target set deliberately hard enough that hitting it fully would be a real achievement, not a guarantee.' },
        { word: 'Checkpoint', def: 'An intermediate measurable milestone used to verify progress before the final outcome is known.' },
      ],
      mayaMessage: "You've gone deep on this! Ready to prove it?",
      swipeLeft: 'Still unsure',
      swipeRight: 'Test me',
    },
  ],
  scenarios: [
    {
      company: 'Google',
      emoji: '🔎',
      situation: "A Google PM's team sets an Objective 'Make Search faster' with a Key Result 'ship 3 performance improvements,' regardless of actual speed impact.",
      questions: [
        {
          q: "What's the issue with this key result?",
          options: [
            "Nothing, it's specific and measurable",
            'It measures activity (shipping things) instead of outcome (actual speed improvement)',
            "It's too ambitious",
          ],
          correct: 1,
          explanation:
            'A key result should measure the outcome the objective cares about — shipping things is an activity, not proof that search actually got faster.',
        },
        {
          q: "What's a stronger version of this key result?",
          options: [
            "'Ship 5 performance improvements instead of 3'",
            "'Reduce median search response time from 400ms to 250ms'",
            "'Have the team work overtime on performance'",
          ],
          correct: 1,
          explanation:
            'This version directly measures the outcome (actual speed), which is what makes it a real key result instead of an activity count.',
        },
      ],
    },
    {
      company: 'Airbnb',
      emoji: '🏠',
      situation: "An Airbnb team scores 100% on all four key results for the third quarter in a row, and leadership is trying to decide how to interpret this.",
      questions: [
        {
          q: 'What should leadership consider?',
          options: [
            'Celebrate that the team is executing flawlessly every quarter',
            'Investigate whether the key results were set conservatively enough to always be hit, rather than genuinely ambitious',
            "Immediately reduce the team's headcount since the work seems too easy",
          ],
          correct: 1,
          explanation:
            'Consistently perfect scores are a classic sign of sandbagged goals — a healthy OKR culture treats occasional misses as evidence the team is stretching.',
        },
        {
          q: 'What\'s the best way to recalibrate for next quarter?',
          options: [
            'Set noticeably more ambitious key results and treat 70% as a good outcome',
            'Keep the same goals since they\'re clearly working',
            'Remove OKRs entirely since the team doesn\'t need them',
          ],
          correct: 0,
          explanation:
            'Recalibrating toward more ambitious targets — and normalizing partial scores — is how a team gets OKRs actually measuring stretch, not just comfort.',
        },
      ],
    },
    {
      company: 'Spotify',
      emoji: '🎧',
      situation: "A Spotify PM sets an Objective 'Grow podcast listenership' with a single key result: 'Increase total podcast streams by 10%.'",
      questions: [
        {
          q: "What's a risk with using only one key result here?",
          options: [
            'One key result is always enough for any objective',
            "A single metric can be gamed (e.g. driving streams from low-quality content) without truly achieving the objective's intent",
            'There is no risk at all',
          ],
          correct: 1,
          explanation:
            'A single key result is easy to game in ways that miss the real intent — most objectives need 2-4 key results to triangulate real progress.',
        },
        {
          q: "What's a stronger set of key results for this objective?",
          options: [
            'Just track total streams more precisely',
            'Combine total streams growth with a listener retention metric and a content-quality signal like completion rate',
            'Remove key results and just track streams weekly instead of monthly',
          ],
          correct: 1,
          explanation:
            'Multiple, complementary key results make it much harder to win on paper while missing the real goal of sustainable podcast growth.',
        },
      ],
    },
  ],
};
