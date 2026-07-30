// PRD section 2 — full content structure across both MVP modules.
// hasContent flags which sub-topics have real seed data wired into /learn
// today (Phase 6 fills in the rest); the Progress page must still list all
// 12 so users can see what's locked ahead.
export const TOPICS_LIST = [
  { id: 'product-vision-statement', title: 'Product Vision Statement', module: 1, hasContent: true },
  { id: 'three-horizons-framework', title: 'Three Horizons Framework', module: 1, hasContent: true },
  { id: 'smart-objectives', title: 'SMART Objectives', module: 1, hasContent: true },
  { id: 'ownership-spectrum', title: 'Ownership Spectrum', module: 1, hasContent: true },
  { id: 'strategy-to-execution-bridge', title: 'Strategy to Execution Bridge', module: 1, hasContent: true },
  { id: 'okrs', title: 'OKRs', module: 1, hasContent: true },
  { id: 'roadmap-fundamentals', title: 'Roadmap Fundamentals', module: 2, hasContent: false },
  { id: 'requirements-as-blueprints', title: 'Requirements as Blueprints', module: 2, hasContent: false },
  { id: 'rolling-wave-planning', title: 'Rolling Wave Planning', module: 2, hasContent: false },
  { id: 'roadmap-formats', title: 'Roadmap Formats', module: 2, hasContent: false },
  { id: 'swimlanes-milestones-dependencies', title: 'Swimlanes, Milestones & Dependencies', module: 2, hasContent: false },
  { id: 'balancing-innovation-vs-maintenance', title: 'Balancing Innovation vs Maintenance', module: 2, hasContent: false },
];
