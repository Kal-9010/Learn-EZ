// Seed content for Module 1 / Sub-topic 5 (PRD section 2).
export const STRATEGY_TO_EXECUTION_BRIDGE = {
  id: 'strategy-to-execution-bridge',
  topic: 'Strategy to Execution Bridge',
  layers: [
    {
      emoji: '🌉',
      headline: "A strategy nobody executes isn't a strategy.",
      explanation:
        'The bridge between strategy and execution is translation work — turning a big strategic idea into specific roadmap items a team can actually build this quarter. Skip the bridge, and strategy stays a slide deck.',
      keywords: [
        { word: 'Strategy', def: 'The high-level direction and set of choices about where to compete and how to win.' },
        { word: 'Execution', def: 'The concrete, buildable work that actually moves the strategy forward.' },
        { word: 'Translation', def: 'The PM work of turning a strategic statement into specific, scoped roadmap items.' },
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
        body: "Amazon's 'working backwards' process forces every strategic idea through a press release and FAQ before a single line of code is written, translating high-level strategy directly into a concrete, buildable plan the team can execute against.",
      },
      storyBad: {
        company: 'Kodak',
        emoji: '❌',
        body: "Kodak's own engineers invented the digital camera in 1975, and leadership even recognized digital photography as the future — but the strategy never got bridged into execution, since the film business dominated internal priorities. Kodak filed for bankruptcy in 2012.",
      },
      keywords: [
        { word: 'Working backwards', def: "Amazon's practice of writing the future press release for an idea before building it, forcing early clarity on what execution needs to deliver." },
        { word: 'Press release / FAQ', def: 'A document describing a finished product as if it already shipped — used to pressure-test whether a strategy is real enough to execute.' },
      ],
      mayaMessage: 'See the difference? One decision changes everything.',
      swipeLeft: 'Still unsure',
      swipeRight: 'Makes sense',
    },
    {
      sectionLabel: 'Real PM scenario',
      situation: {
        emoji: '🏢',
        text: "Uber's leadership announces a strategic pillar around 'becoming the operating system for local commerce,' and a PM's team needs to figure out what that means for their next roadmap.",
      },
      goodPM: {
        text: 'Breaks the strategic pillar into 2-3 concrete, buildable initiatives for the next two quarters, each with clear success metrics tied back to the pillar.',
      },
      badPM: {
        text: "Adds the phrase 'supports local commerce strategy' to existing roadmap items without actually changing any priorities, so nothing really shifts.",
      },
      interviewerNote: 'This tests whether you can turn a strategic statement into real prioritization decisions, not just a label.',
      keywords: [
        { word: 'Strategic pillar', def: 'A named priority area meant to guide company-wide decisions, still too abstract to build against directly.' },
        { word: 'Roadmap translation', def: 'Converting an abstract priority into specific, scoped items with owners and timelines.' },
      ],
      mayaMessage: "This is exactly what interviewers test. You're getting it!",
      swipeLeft: 'Need more',
      swipeRight: 'Ready to test',
    },
    {
      sectionLabel: 'The expert move',
      analogyTitle: 'The Architect and the Construction Crew',
      levels: [
        "Strategy-to-execution is like an architect's blueprint meeting a construction crew — the blueprint means nothing until someone translates it into a materials list, a schedule, and daily tasks.",
        'Without this bridge, a PM hands a team a strategy slide and expects execution to follow automatically — and the team, lacking translation, either freezes or just keeps doing what it was already doing.',
        'A PM using the architect mindset breaks the blueprint into phases: foundation first, framing next, specifying exactly what gets built each week and why it serves the overall design.',
        "The nuance senior PMs add: the blueprint itself needs updating as construction reveals new information — the bridge runs both ways, with execution realities feeding back into strategy, not just strategy dictating down to execution.",
      ],
      followupQ: "How would you handle discovering, mid-execution, that the strategy doesn't quite fit reality?",
      keywords: [
        { word: 'Blueprint translation', def: 'Turning a high-level design into the specific, sequenced steps needed to actually build it.' },
        { word: 'Feedback loop', def: 'Execution learnings flowing back up to inform and adjust the original strategy.' },
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
      situation: "Google's leadership sets a strategic priority around 'AI-first products' company-wide, and a PM on a mature, non-AI product team needs to respond.",
      questions: [
        {
          q: "What's the strongest way to bridge this strategy into the team's execution?",
          options: [
            'Add an AI chatbot to the product regardless of user need, to visibly align with the strategy',
            'Identify a real user problem in the product that AI could meaningfully solve, and scope a concrete initiative around it',
            "Ignore the strategic priority since the product isn't AI-related",
          ],
          correct: 1,
          explanation:
            'Bridging strategy to execution means finding real, grounded ways the strategy applies — not performative alignment, and not ignoring it either.',
        },
        {
          q: 'Leadership asks for a timeline. What should the PM provide?',
          options: [
            "A vague promise to 'explore AI soon'",
            'A specific initiative with a scope, timeline, and success metric tied to the strategic priority',
            'No timeline, since strategy shouldn\'t be rushed',
          ],
          correct: 1,
          explanation:
            'A real bridge to execution always ends in something concrete and measurable — without that, the strategic priority stays just an idea.',
        },
      ],
    },
    {
      company: 'Airbnb',
      emoji: '🏠',
      situation: "Airbnb sets a strategic focus on 'experiences beyond just homes,' and a PM's team owns the core home-booking flow, seemingly unrelated.",
      questions: [
        {
          q: 'How should the PM connect their roadmap to this strategy?',
          options: [
            "Assume the strategy doesn't apply to their team",
            'Look for a concrete way the booking flow could support cross-selling into experiences, and propose a specific, scoped initiative',
            'Rebuild the entire booking flow around experiences immediately',
          ],
          correct: 1,
          explanation:
            "Even a team that isn't the obvious owner of a new strategic direction can usually find one concrete, well-scoped way to contribute — that's the translation work of the bridge.",
        },
        {
          q: "The proposed initiative doesn't show results in the first month. What's the right response?",
          options: [
            'Cancel the initiative immediately',
            'Check in against the original success metric and timeline before judging it, since strategy shifts take time to show up',
            'Expand the initiative significantly to force faster results',
          ],
          correct: 1,
          explanation:
            'Judging execution against a pre-agreed timeline, not a knee-jerk reaction, is what keeps the strategy-to-execution bridge credible rather than reactive.',
        },
      ],
    },
    {
      company: 'Spotify',
      emoji: '🎧',
      situation: 'Spotify announces a strategic bet on becoming the top platform for audiobooks, and a PM on the music recommendation team is unsure how this affects their roadmap.',
      questions: [
        {
          q: "What's the best first step for the PM?",
          options: [
            'Wait for explicit instructions from leadership',
            'Proactively explore whether recommendation technology could support audiobook discovery, and propose a scoped initiative if there\'s a real fit',
            'Assume it has nothing to do with their team and continue as before',
          ],
          correct: 1,
          explanation:
            'Bridging strategy to execution often starts with a PM proactively asking where a strategy connects to their team\'s work, rather than waiting to be told.',
        },
        {
          q: 'Which initiative best reflects a real strategy-to-execution bridge, versus surface-level alignment?',
          options: [
            "Renaming an existing feature to mention 'audiobooks' without functional changes",
            'Building a specific audiobook recommendation module with a defined success metric tied to the audiobook strategy',
            'Adding an audiobook banner ad to the app',
          ],
          correct: 1,
          explanation:
            'A real bridge produces a concrete, measurable piece of execution tied to the strategy — not a cosmetic reference to it.',
        },
      ],
    },
  ],
};
