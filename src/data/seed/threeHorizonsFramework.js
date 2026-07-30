// Seed content for Module 1 / Sub-topic 2 (PRD section 2).
export const THREE_HORIZONS_FRAMEWORK = {
  id: 'three-horizons-framework',
  topic: 'Three Horizons Framework',
  layers: [
    {
      emoji: '🌅',
      headline: "Not every bet should look like your core business.",
      explanation:
        "The Three Horizons framework splits your roadmap into three types of work: today's core business, tomorrow's emerging bets, and future moonshots. Confusing the three is how good ideas get killed too early — or funded forever.",
      keywords: [
        { word: 'Horizon 1', def: "The core business generating most of today's revenue — deserves efficiency and optimization, not big risky bets." },
        { word: 'Horizon 2', def: 'Emerging opportunities with real but unproven traction — need room to grow before being judged like Horizon 1.' },
        { word: 'Horizon 3', def: "Early, speculative bets on the future — judged by learning, not revenue, since most won't work out." },
      ],
      mayaMessage: "Start simple — you've got this!",
      swipeLeft: 'Not sure yet',
      swipeRight: 'Got it',
    },
    {
      sectionLabel: 'Why this matters',
      storyGood: {
        company: 'Amazon',
        emoji: '✅',
        body: "AWS started in 2006 as a Horizon 3 bet inside a retail company — nobody expected it to matter. Amazon gave it years to prove itself on its own terms, not retail's. Today AWS generates more operating profit than Amazon's entire retail business.",
      },
      storyBad: {
        company: 'Uber',
        emoji: '❌',
        body: "Uber poured billions into self-driving cars and flying taxis as Horizon 3 bets, but funded them with Horizon 1 urgency — expecting near-term payoff. When cash-burn scrutiny hit in 2020, Uber sold its self-driving unit at a steep loss, having judged a moonshot by the wrong clock.",
      },
      keywords: [
        { word: 'Cash-burn', def: 'Spending money faster than it comes in — a normal state for early bets, but a red flag if applied to core business logic.' },
        { word: 'Moonshot', def: 'A bet with a low chance of success but a huge payoff if it works — meant to be judged differently than a sure thing.' },
      ],
      mayaMessage: 'See the difference? One decision changes everything.',
      swipeLeft: 'Still unsure',
      swipeRight: 'Makes sense',
    },
    {
      sectionLabel: 'Real PM scenario',
      situation: {
        emoji: '🏢',
        text: "Spotify's leadership wants next quarter's roadmap to justify every project by this quarter's revenue impact, including a new AI DJ feature that's still early and unproven.",
      },
      goodPM: {
        text: 'Separates the roadmap by horizon — commits to a revenue target for the core streaming product, and asks for a learning target, not a revenue target, for the early AI DJ bet.',
      },
      badPM: {
        text: 'Forces a revenue projection onto the AI DJ feature to satisfy the ask, setting an unrealistic bar that gets the feature cancelled after one quarter of unmet expectations.',
      },
      interviewerNote: 'This tests whether you can defend early-stage work with the right kind of metric, not just whichever metric is being demanded.',
      keywords: [
        { word: 'Learning target', def: 'A goal focused on validating an assumption or reducing uncertainty, used for early-horizon bets instead of a revenue number.' },
        { word: 'Revenue target', def: "A goal measured in dollars — appropriate for a mature, Horizon 1 product, premature for an unproven one." },
      ],
      mayaMessage: "This is exactly what interviewers test. You're getting it!",
      swipeLeft: 'Need more',
      swipeRight: 'Ready to test',
    },
    {
      sectionLabel: 'The expert move',
      analogyTitle: "The Farmer's Three Fields",
      levels: [
        'The Three Horizons framework is like a farmer with three fields: one being harvested now, one growing for next season, and one just being tested with new seeds.',
        "Without this mindset, a PM judges the test field by this season's harvest — and rips out promising seeds before they've had a chance to grow, or farms the harvest field like an experiment and risks the income that pays the bills.",
        'A PM using the three-fields mindset sets different expectations for each: maximize yield on the harvest field, nurture growth on the second field, and just learn what grows at all in the test field.',
        "The nuance senior PMs add: fields move between horizons over time — today's test field becomes tomorrow's growing field. The skill is recognizing when a bet has earned its promotion, not leaving it stuck in tests forever.",
      ],
      followupQ: 'How would you decide when a Horizon 3 bet has earned a bigger investment?',
      keywords: [
        { word: 'Field promotion', def: 'Informal shorthand for moving a bet to a higher horizon as it proves itself with real evidence.' },
        { word: 'Test field', def: "The Horizon 3 space where new ideas are tried cheaply, expecting most of them not to work out." },
      ],
      mayaMessage: "You've gone deep on this! Ready to prove it?",
      swipeLeft: 'Still unsure',
      swipeRight: 'Test me',
    },
  ],
  scenarios: [
    {
      company: 'Amazon',
      emoji: '📦',
      situation:
        "Amazon's device team wants to greenlight a speculative home-robotics project with no clear revenue path for 3+ years, while the core Echo speaker business needs more investment to fend off competitors.",
      questions: [
        {
          q: 'How should these two initiatives be evaluated?',
          options: [
            'By the same revenue and growth metrics, since both are Amazon products',
            'Using different metrics per horizon — Echo judged on revenue/market share, the robotics bet judged on learning and technical validation',
            'The robotics project should be cancelled immediately since it has no revenue path',
          ],
          correct: 1,
          explanation:
            'Applying Horizon 1 metrics to a Horizon 3 bet either kills it too early or forces fake projections — the framework exists to protect early bets from this exact mismatch.',
        },
        {
          q: 'Leadership asks "why are we funding something with no revenue plan?" What\'s the strongest response?',
          options: [
            'Promise a revenue plan will exist within 2 quarters',
            'Explain that Horizon 3 bets are funded to reduce uncertainty, not generate revenue yet, and define what success looks like at this stage',
            'Agree the project should be defunded',
          ],
          correct: 1,
          explanation:
            'Naming the actual purpose of a Horizon 3 investment — learning, not revenue — is what protects it from being judged by the wrong yardstick.',
        },
      ],
    },
    {
      company: 'Uber',
      emoji: '🚗',
      situation:
        "Uber's leadership pulls funding from a small grocery-delivery pilot after one disappointing quarter, redirecting the budget to the core rides business.",
      questions: [
        {
          q: "What's the risk in this decision?",
          options: [
            'There is no risk, the core business should always come first',
            'Horizon 2 bets need room to prove themselves over a longer window than one quarter before being judged a failure',
            'Grocery delivery should never have been tested at all',
          ],
          correct: 1,
          explanation:
            'Horizon 2 opportunities are inherently less mature than the core business — pulling funding after one soft quarter risks killing something that just needed more runway.',
        },
        {
          q: 'What would a stronger horizon-based decision look like?',
          options: [
            'Set a clear, realistic evaluation window and specific milestones for the bet before deciding to cut it',
            'Never review Horizon 2 bets at all once funded',
            'Immediately promote every Horizon 2 bet to full Horizon 1 investment',
          ],
          correct: 0,
          explanation:
            'Horizon 2 bets deserve a defined runway and clear milestones — that lets a team make a confident call instead of an emotional one.',
        },
      ],
    },
    {
      company: 'Google',
      emoji: '🔎',
      situation:
        "A Google PM is asked to include a brand-new, unproven AI research prototype in the same quarterly roadmap review as Search's core ranking improvements.",
      questions: [
        {
          q: 'How should the PM frame the AI prototype in that review?',
          options: [
            "As a Horizon 3 bet, reviewed on what was learned and validated, separate from Search's revenue-driven review",
            'As equally important and measured identically to Search improvements',
            "It shouldn't be mentioned in the review at all",
          ],
          correct: 0,
          explanation:
            'Keeping the horizons visually and conceptually separate in a review protects the early bet from being compared unfairly to a mature, revenue-generating product.',
        },
        {
          q: 'Six months later, the prototype shows strong validated learning. What\'s the right next step?',
          options: [
            'Keep it exactly where it is indefinitely',
            'Consider promoting it to Horizon 2 with a bigger investment and more concrete milestones',
            'Immediately treat it like a core Search feature',
          ],
          correct: 1,
          explanation:
            "Promoting a bet across horizons as it proves itself is the mechanism that lets today's experiment become tomorrow's growth driver.",
        },
      ],
    },
  ],
};
