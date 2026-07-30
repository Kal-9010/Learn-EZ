// Seed content for Module 1 / Sub-topic 1 (PRD section 2).
// Shape mirrors the Supabase sub_topics table (layer_1..4 jsonb, keywords jsonb)
// so this can be migrated in directly once Phase 6's schema exists.

export const PRODUCT_VISION_STATEMENT = {
  id: 'product-vision-statement',
  topic: 'Product Vision Statement',
  layers: [
    {
      emoji: '🧭',
      headline: "A vision statement is your product's north star.",
      explanation:
        "It's one sentence describing the future you're building toward. Not a roadmap, not a feature list — just the destination everyone on the team can point to when priorities get confusing.",
      keywords: [
        {
          word: 'Vision statement',
          def: 'A single, memorable sentence describing the long-term future your product works toward — not a plan for how to get there.',
        },
        {
          word: 'North star',
          def: 'A shared reference point teams use to judge whether a decision moves the product closer to its long-term purpose.',
        },
        {
          word: 'Roadmap',
          def: "A plan showing what you'll build and roughly when — distinct from a vision, which describes why you're building at all.",
        },
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
        body: "Amazon's vision — \"to be Earth's most customer-centric company\" — has barely changed since 1997. Every major bet, from free shipping to AWS, gets defended by asking whether it serves that one sentence, keeping thousands of teams aligned without constant re-explaining.",
      },
      storyBad: {
        company: 'Yahoo',
        emoji: '❌',
        body: "Yahoo cycled through six CEOs between 2001 and 2016, and its vision shifted with each one — media company, tech company, mobile-first company. Employees and investors never had a stable answer to \"what are we building toward,\" and the company was ultimately sold off in pieces.",
      },
      keywords: [
        {
          word: 'Customer-centric',
          def: "A vision anchored on the customer's outcome rather than a specific product, technology, or business model.",
        },
        {
          word: 'Alignment',
          def: 'When every team can independently judge whether their work serves the same long-term goal, without needing constant top-down direction.',
        },
      ],
      mayaMessage: 'See the difference? One decision changes everything.',
      swipeLeft: 'Still unsure',
      swipeRight: 'Makes sense',
    },
    {
      sectionLabel: 'Real PM scenario',
      situation: {
        emoji: '🏢',
        text: "Airbnb's leadership asks a PM to justify a new feature that doesn't obviously grow bookings this quarter.",
      },
      goodPM: {
        text: 'Ties the feature back to the vision of "belonging anywhere" — showing how it deepens trust between hosts and guests, even if the bookings lift shows up later. Leadership approves it as a long-term bet.',
      },
      badPM: {
        text: "Defends the feature purely on a short-term metric bump, with no link to the company's larger purpose. When the metric doesn't move immediately, the feature gets cut before it can prove out.",
      },
      interviewerNote: "This tests whether you can defend a decision using the product's vision, not just this quarter's dashboard.",
      keywords: [
        {
          word: 'Belonging anywhere',
          def: "Airbnb's actual vision statement — used here to show how a vision helps justify decisions beyond short-term metrics.",
        },
        {
          word: 'Long-term bet',
          def: "A decision justified by future value tied to the vision, even when near-term metrics don't move yet.",
        },
      ],
      mayaMessage: "This is exactly what interviewers test. You're getting it!",
      swipeLeft: 'Need more',
      swipeRight: 'Ready to test',
    },
    {
      sectionLabel: 'The expert move',
      analogyTitle: 'The Lighthouse',
      levels: [
        "A vision statement is like a lighthouse — it doesn't tell a ship exactly which route to sail, it just gives every ship on the water the same fixed point to steer toward.",
        "Without it, a PM ends up chasing whichever request is loudest that week — a big customer's feature ask, a competitor's launch, an exec's pet idea — because there's no fixed point to check decisions against.",
        'A PM using the lighthouse mindset asks, before committing to any request: does this move us toward the light, or just react to today\'s weather? That single question cuts through most roadmap debates.',
        "The nuance senior PMs add: the lighthouse itself should almost never move. If the vision shifts every time strategy changes, it stops being a lighthouse and becomes just another opinion — teams stop trusting it as a real anchor.",
      ],
      followupQ: "How would you explain to an exec why a feature they want doesn't fit the product vision?",
      keywords: [
        {
          word: 'Fixed point',
          def: 'The part of a vision that should stay stable across quarters, even as strategy and tactics change beneath it.',
        },
        {
          word: 'Reactive roadmap',
          def: 'A roadmap built from whoever asks loudest, rather than from a shared long-term destination.',
        },
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
      situation:
        "Spotify's leadership wants to launch an audiobook feature. A PM pushes back, saying it doesn't fit the current vision, but engineering has already built a prototype.",
      questions: [
        {
          q: "What should the PM's first move be?",
          options: [
            "Block the feature since it doesn't fit the vision, regardless of the prototype",
            'Check whether the vision itself needs to evolve, or whether this feature should evolve to fit it',
            'Approve it anyway since engineering already invested the time',
          ],
          correct: 1,
          explanation:
            "A vision should rarely change for one feature, but it's worth checking honestly first — otherwise you're enforcing a vision instead of using it as a compass.",
        },
        {
          q: 'The team asks "so is our vision wrong?" What\'s the strongest answer?',
          options: [
            'Yes, we should scrap it and start over',
            'No, but this is a useful moment to confirm the vision is still the right one before rejecting the feature',
            'Visions never need to be reconsidered',
          ],
          correct: 1,
          explanation:
            'Treating the vision as a live question, not dogma, is what separates senior PMs from ones who just cite it as a rule.',
        },
      ],
    },
    {
      company: 'Google',
      emoji: '🔎',
      situation:
        "Google Maps leadership asks a PM to greenlight a feature that boosts engagement but has nothing to do with the team's stated vision of organizing the world's transportation information.",
      questions: [
        {
          q: "What's the strongest way to evaluate this request?",
          options: [
            'Approve it because engagement metrics always come first',
            "Ask whether it serves the vision, and if not, question why it's being prioritized over things that do",
            'Reject it immediately without discussion',
          ],
          correct: 1,
          explanation:
            "A vision exists precisely to filter these decisions — using it to ask \"why\" protects the team's focus without being reflexively negative.",
        },
        {
          q: 'A stakeholder says "the vision is just words, results matter." How should the PM respond?',
          options: [
            'Agree and drop vision-based reasoning entirely',
            'Explain that the vision is what keeps results meaningful over time — chasing every good number eventually spreads the team too thin',
            "Argue that results don't matter at all",
          ],
          correct: 1,
          explanation:
            "This tests whether a PM can defend the vision's practical value, not just repeat it as a slogan.",
        },
      ],
    },
    {
      company: 'Uber',
      emoji: '🚗',
      situation:
        "Uber's exec team keeps changing priorities every quarter, and a PM's team feels whiplash. The PM is asked to write a vision statement for their sub-product.",
      questions: [
        {
          q: 'What should the vision statement optimize for?',
          options: [
            'Matching whatever the execs asked for last quarter',
            'A stable destination that can absorb quarterly priority changes without needing to be rewritten',
            'Being as detailed and specific as possible so nothing is left ambiguous',
          ],
          correct: 1,
          explanation:
            "A vision that changes with every reprioritization isn't doing its job — it should be stable enough to absorb tactical shifts underneath it.",
        },
        {
          q: 'How should the PM roll out the new vision statement to the team?',
          options: [
            'Present it once in a meeting and assume it sticks',
            'Repeat and apply it consistently across roadmap reviews so it becomes the shared reference point, not a one-time announcement',
            'Add it to a wiki page and move on',
          ],
          correct: 1,
          explanation: "A vision only works if it's actively used to justify decisions — otherwise it's just a poster on the wall.",
        },
      ],
    },
  ],
};
