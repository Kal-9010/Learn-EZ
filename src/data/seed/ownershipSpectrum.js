// Seed content for Module 1 / Sub-topic 4 (PRD section 2).
export const OWNERSHIP_SPECTRUM = {
  id: 'ownership-spectrum',
  topic: 'Ownership Spectrum',
  layers: [
    {
      emoji: '🎚️',
      headline: "PMs don't own everything — and that's the point.",
      explanation:
        'The ownership spectrum ranges from full ownership to pure influence-only. Great PMs know exactly where a decision sits on that spectrum, instead of either micromanaging or disappearing.',
      keywords: [
        { word: 'Full ownership', def: 'Decisions the PM makes directly and is accountable for, like prioritization and success metrics.' },
        { word: 'Influence-only', def: "Decisions the PM can weigh in on but doesn't control, like another team's technical implementation." },
        { word: 'Shared ownership', def: 'Decisions made jointly with another function, like design or engineering, with no single owner.' },
      ],
      mayaMessage: "Start simple — you've got this!",
      swipeLeft: 'Not sure yet',
      swipeRight: 'Got it',
    },
    {
      sectionLabel: 'Why this matters',
      storyGood: {
        company: 'Netflix',
        emoji: '✅',
        body: "Netflix's well-known 'Freedom and Responsibility' culture pushes real decision ownership down to individual teams — a PM sets the outcome, and engineers and designers own how to get there, with far less top-down sign-off than most companies.",
      },
      storyBad: {
        company: 'Blockbuster',
        emoji: '❌',
        body: "Blockbuster's rigid corporate hierarchy required store-level decisions to route through layers of central approval, meaning even simple local pricing or format experiments moved too slowly to respond to a fast-changing market.",
      },
      keywords: [
        { word: 'Freedom and Responsibility', def: "Netflix's term for trusting employees with real decision ownership, paired with real accountability for outcomes." },
        { word: 'Decision latency', def: 'How long it takes an organization to actually make and act on a decision — often slowed by unclear ownership.' },
      ],
      mayaMessage: 'See the difference? One decision changes everything.',
      swipeLeft: 'Still unsure',
      swipeRight: 'Makes sense',
    },
    {
      sectionLabel: 'Real PM scenario',
      situation: {
        emoji: '🏢',
        text: "A Google PM disagrees with the design team's proposed layout for a new feature, but the design team has stronger domain expertise here.",
      },
      goodPM: {
        text: "Shares their concern clearly, asks clarifying questions, then defers to the designer's call since layout sits in design's ownership zone — while staying firmly in charge of the feature's goals and success metrics.",
      },
      badPM: {
        text: "Overrides the design team's decision because they're uncomfortable not having the final say, damaging trust and slowing the team down.",
      },
      interviewerNote: 'This tests whether you know which decisions are actually yours to make versus someone else\'s to own.',
      keywords: [
        { word: 'Domain expertise', def: "Specialized skill that makes one function's judgment more reliable on a specific type of decision." },
        { word: 'Decision rights', def: 'An explicit or implicit understanding of who actually gets to make a given call.' },
      ],
      mayaMessage: "This is exactly what interviewers test. You're getting it!",
      swipeLeft: 'Need more',
      swipeRight: 'Ready to test',
    },
    {
      sectionLabel: 'The expert move',
      analogyTitle: 'The Restaurant Kitchen',
      levels: [
        "The ownership spectrum is like a head chef who sets the menu and the standard for every dish, but doesn't personally plate every plate that leaves the kitchen.",
        'Without this mindset, a PM either tries to plate every dish themselves — becoming a bottleneck — or walks away from the kitchen entirely, leaving no one accountable for whether the food is any good.',
        'A PM using the head-chef mindset sets very clear standards — the menu, the plating philosophy, the taste profile — and trusts line cooks to own execution within that, stepping in only when something falls outside the standard.',
        'The nuance senior PMs add: the spectrum moves dish by dish — a brand-new, high-stakes dish might need the head chef directly involved, while a well-established one runs fine on trust alone. Reading which is which is the actual skill.',
      ],
      followupQ: "How do you decide how involved to be in a decision you don't fully own?",
      keywords: [
        { word: 'Menu standard', def: "The clear bar a leader sets so others can make good decisions without needing constant sign-off." },
        { word: 'Line cook autonomy', def: 'The trust given to execute within a set standard without needing approval on every step.' },
      ],
      mayaMessage: "You've gone deep on this! Ready to prove it?",
      swipeLeft: 'Still unsure',
      swipeRight: 'Test me',
    },
  ],
  scenarios: [
    {
      company: 'Airbnb',
      emoji: '🏠',
      situation:
        "An Airbnb PM's engineering lead wants to make a technical architecture decision that will affect the feature's future flexibility, but the PM has a strong opinion about which approach is safer long-term.",
      questions: [
        {
          q: "What's the PM's strongest move?",
          options: [
            'Mandate the architecture they personally prefer',
            'Share their concerns about long-term flexibility as input, then let engineering own the technical decision',
            "Stay silent since it's not their area at all",
          ],
          correct: 1,
          explanation:
            "Voicing real concerns while still respecting who owns the decision is the balance the ownership spectrum is designed to strike — input isn't the same as control.",
        },
        {
          q: 'The engineering lead ultimately picks an approach the PM disagreed with. What should the PM do next?',
          options: [
            'Escalate to overrule the decision',
            'Support the decision and stay focused on the outcomes that are within their ownership',
            'Quietly try to get the decision reversed later',
          ],
          correct: 1,
          explanation:
            "Once a decision is made within someone else's ownership zone, undermining it afterward breaks the trust the whole model depends on.",
        },
      ],
    },
    {
      company: 'Spotify',
      emoji: '🎧',
      situation: "A Spotify PM is asked by a VP to weigh in on a purely technical infrastructure choice between two backend databases.",
      questions: [
        {
          q: "What's the appropriate level of involvement here?",
          options: [
            'Make the final call personally since they were asked',
            'Offer business-context input (cost, timeline impact) but let engineering own the technical decision',
            'Refuse to discuss it at all',
          ],
          correct: 1,
          explanation:
            "Being asked for input doesn't mean the decision moves into the PM's ownership — the job is to add relevant context, not override domain expertise.",
        },
        {
          q: 'How should the PM communicate this boundary to the VP?',
          options: [
            "Explain they'll share relevant context but the technical call belongs to engineering",
            "Tell the VP it's not their problem",
            'Make the decision anyway since a VP asked',
          ],
          correct: 0,
          explanation:
            'Clearly naming who owns a decision — while still being helpful — is exactly the kind of ownership clarity that keeps teams moving fast without stepping on each other.',
        },
      ],
    },
    {
      company: 'Amazon',
      emoji: '📦',
      situation: "An Amazon PM notices a marketing campaign (owned by another team) uses messaging that slightly contradicts the product's positioning.",
      questions: [
        {
          q: "What's the strongest response?",
          options: [
            'Change the campaign directly since the PM knows the product best',
            'Raise the concern with the marketing owner and explain the positioning risk, then let them decide',
            "Ignore it since it's not the PM's team",
          ],
          correct: 1,
          explanation:
            "Even outside their direct ownership, a PM can and should flag risks — the key is doing it as input to the actual owner, not by taking over the decision.",
        },
        {
          q: 'The marketing team disagrees and keeps their original messaging. What\'s next?',
          options: [
            'Escalate immediately to a VP to force a change',
            'Accept it was their call to make, having raised the concern clearly',
            'Quietly undermine the campaign',
          ],
          correct: 1,
          explanation:
            "Respecting another team's ownership after voicing a genuine concern is what keeps cross-team trust intact, even when you disagree with the outcome.",
        },
      ],
    },
  ],
};
