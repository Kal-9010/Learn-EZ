// Seed content for Module 1 / Sub-topic 3 (PRD section 2).
export const SMART_OBJECTIVES = {
  id: 'smart-objectives',
  topic: 'SMART Objectives',
  layers: [
    {
      emoji: '🎯',
      headline: "A goal you can't measure isn't a goal.",
      explanation:
        "SMART turns fuzzy ambitions into something a team can actually aim at: Specific, Measurable, Achievable, Relevant, and Time-bound. Without all five, a goal just becomes a feeling everyone interprets differently.",
      keywords: [
        { word: 'Specific', def: 'Clear enough that two different people would build the same thing from it, not open to interpretation.' },
        { word: 'Measurable', def: 'Tied to a number that can be checked objectively, not a feeling of progress.' },
        { word: 'Time-bound', def: 'Attached to a real deadline, so "eventually" is never an acceptable answer.' },
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
        body: "Google's goal-setting practice, formalized company-wide since 1999, forces every objective to pair with a measurable result — 'improve search' isn't allowed to stand alone; it must ship with a number and a date attached.",
      },
      storyBad: {
        company: 'Uber',
        emoji: '❌',
        body: "In its hyper-growth years, Uber's internal goals were often framed as 'win the city' with no specific metric or deadline attached — former employees described this as fueling an aggressive, anything-goes culture that later required a public reset of company values.",
      },
      keywords: [
        { word: 'OKR', def: 'Objective and Key Result — a goal-setting format that pairs an ambition with the measurable proof it happened.' },
        { word: 'Key result', def: 'The specific, numeric proof that an objective was actually achieved.' },
      ],
      mayaMessage: 'See the difference? One decision changes everything.',
      swipeLeft: 'Still unsure',
      swipeRight: 'Makes sense',
    },
    {
      sectionLabel: 'Real PM scenario',
      situation: {
        emoji: '🏢',
        text: "Airbnb's leadership sets a company goal to 'be the best travel platform in the world' and asks a PM's team to align their quarter around it.",
      },
      goodPM: {
        text: "Translates it into a SMART objective for the team: 'Increase booking completion rate for first-time guests from 61% to 68% by end of Q3' — something the team can actually plan sprints around.",
      },
      badPM: {
        text: "Keeps the goal as-is and tells the team to 'just focus on being the best,' leaving each engineer guessing what to prioritize.",
      },
      interviewerNote: 'This tests whether you can translate an inspiring but vague company goal into something a team can execute against.',
      keywords: [
        { word: 'Booking completion rate', def: 'The share of started bookings that actually finish — a concrete, trackable metric.' },
        { word: 'Sprint planning', def: 'Deciding what a team will build in the next short work cycle, which requires a specific enough goal to plan against.' },
      ],
      mayaMessage: "This is exactly what interviewers test. You're getting it!",
      swipeLeft: 'Need more',
      swipeRight: 'Ready to test',
    },
    {
      sectionLabel: 'The expert move',
      analogyTitle: 'The GPS Destination',
      levels: [
        "A SMART objective is like typing a full address into a GPS instead of just saying 'somewhere downtown' — one gets you an exact route, the other gets you driving in circles.",
        "Without this, a PM sets a goal like 'improve onboarding' — and three different teams build three different things, all technically 'improving onboarding,' none of them coordinated.",
        "A PM using the GPS mindset writes: 'Reduce time-to-first-action for new users from 4 minutes to 90 seconds by end of quarter' — specific enough that everyone builds toward the same destination.",
        "The nuance senior PMs add: the Achievable and Relevant letters matter as much as the numbers — a measurable goal disconnected from strategy, or wildly unrealistic, wastes a team's trust just as fast as a vague one.",
      ],
      followupQ: "How would you push back on a goal that's specific and measurable but not actually achievable this quarter?",
      keywords: [
        { word: 'Time-to-first-action', def: 'How long a new user takes to do the thing that proves they understood the product — a common, concrete onboarding metric.' },
        { word: 'Achievable', def: 'Realistic given current resources and timeline — a goal can be specific and still be set up to fail.' },
      ],
      mayaMessage: "You've gone deep on this! Ready to prove it?",
      swipeLeft: 'Still unsure',
      swipeRight: 'Test me',
    },
  ],
  scenarios: [
    {
      company: 'Spotify',
      emoji: '🎧',
      situation: "Spotify's podcast team sets a goal to 'grow podcast engagement' for the year, with no metric or deadline specified.",
      questions: [
        {
          q: "What's missing to make this a SMART objective?",
          options: [
            "Nothing, it's clear enough for a podcast team",
            'A specific metric (e.g. weekly listening hours) and a deadline',
            'A bigger marketing budget',
          ],
          correct: 1,
          explanation:
            "Without a number and a date, 'grow engagement' can mean almost anything — SMART requires both a measurable target and a timeframe.",
        },
        {
          q: "The team proposes: 'Increase weekly podcast listening hours per user by 15% by end of Q2.' Is this SMART?",
          options: [
            "No, it's too specific",
            "Yes — it's specific, measurable, time-bound, and tied to a real business driver",
            "No, because it doesn't mention revenue",
          ],
          correct: 1,
          explanation:
            'This version has a clear metric, a number, and a deadline, and it connects directly to what actually matters for podcast growth.',
        },
      ],
    },
    {
      company: 'Amazon',
      emoji: '📦',
      situation: "An Amazon PM's manager sets a goal: 'Delight customers this quarter,' and asks the PM to build a plan around it.",
      questions: [
        {
          q: "What should the PM's first move be?",
          options: [
            'Start building features that seem delightful',
            'Work with the manager to define a specific, measurable version of the goal before planning',
            "Ignore the goal since it's too vague to matter",
          ],
          correct: 1,
          explanation:
            'Turning a vague inspirational goal into a SMART one is a core part of the PM\'s job — building against an unmeasurable goal wastes the quarter.',
        },
        {
          q: 'Which reframing is the strongest SMART version?',
          options: [
            "'Delight customers by shipping more features'",
            "'Increase customer satisfaction score from 82 to 88 by end of Q4'",
            "'Make customers happier than competitors'",
          ],
          correct: 1,
          explanation: 'This version has a specific metric, a clear number, and a deadline — everything the original goal was missing.',
        },
      ],
    },
    {
      company: 'Uber',
      emoji: '🚗',
      situation:
        "Uber's safety team wants to set a goal around reducing rider complaints but leadership is pushing for something they can announce publicly this month.",
      questions: [
        {
          q: 'How should the PM balance urgency with setting a good SMART goal?',
          options: [
            "Skip the Achievable check to hit the announcement date",
            'Still validate the goal is realistic before committing publicly, even under time pressure',
            'Announce a vague goal and define specifics later',
          ],
          correct: 1,
          explanation:
            "Public pressure doesn't excuse skipping the achievability check — an unrealistic public commitment damages trust more than a short delay would.",
        },
        {
          q: 'Which goal is most appropriately SMART for a public announcement?',
          options: [
            "'Make rides safer than ever'",
            "'Reduce safety-related rider complaints per 1M trips by 20% within 6 months'",
            "'Improve safety as fast as possible'",
          ],
          correct: 1,
          explanation:
            'This version gives a real, verifiable number and timeframe the team can be held accountable to — exactly what makes a goal SMART instead of a slogan.',
        },
      ],
    },
  ],
};
