# L EZ — Learn Easy

**A Tinder-inspired mobile learning app that helps career-switchers pass PM interviews — and prove it to recruiters with a public, data-backed profile.**

## The problem

Breaking into Product Management is expensive and opaque. Bootcamps cost thousands. Interview prep is scattered across blog posts and outdated frameworks. And even candidates who *do* understand the concepts often can't prove it to a recruiter skimming a resume in 30 seconds.

L EZ's target user is someone 25–35, already employed in a non-PM role, carrying student debt, studying in 5–15 minute windows between meetings — high competence, high imposter syndrome, no budget for a $10K course.

## The approach

Instead of reading articles, users **swipe**. Each PM concept (Product Vision, OKRs, Ownership Spectrum, and 9 more) is taught in four escalating layers — plain-English hook, real company case study, interview scenario, expert-level analogy — then tested against realistic, multi-question scenarios modeled on how Google, Amazon, and Uber actually interview. Get it wrong twice and the app doesn't just show the answer — an LLM generates personalized feedback grounded in *your specific* wrong answers, not a generic explanation.

Progress compiles into a shareable, public profile a recruiter can open with no login: mastery %, topics completed, strongest and weakest areas. No email, no phone number — just the proof of competence a resume can't convey on its own.

## What's actually built

This isn't a mockup. Every flow below runs end-to-end against a live LLM, with real user-tested content:

- **Auth** — email/password + Google OAuth via Supabase, with a first-class anonymous path (skip signup, progress saved locally, migrates on signup later)
- **Teaching flow** — 4-layer swipeable cards (`react-tinder-card` + Framer Motion) with keyword tooltips, a progress bar, and a "stuck" support overlay that generates a *fresh* AI analogy rather than repeating the same explanation
- **Scenario testing** — 2-attempt question flow with a no-penalty nudge on the first miss, answer reveal on the second, and pass/fail tracking per scenario
- **AI-personalized failure feedback** — when a user fails all 3 scenarios, an LLM call analyzes their actual wrong answers and explains the specific gap in their thinking (not a canned message)
- **Progress + public portfolio** — per-topic mastery tracking, and a public `/profile/:name` route built against a real Postgres schema with Row Level Security
- **6 of 12 curriculum topics fully authored** (Module 1 complete: Product Vision, Three Horizons, SMART Objectives, Ownership Spectrum, Strategy-to-Execution Bridge, OKRs) — each with 4 teaching layers and 3 scored scenarios

## Engineering decisions worth noting

A few choices that reflect real product/security tradeoffs, not just "make it work":

- **The LLM API key never reaches the browser.** Groq calls go through a server-side proxy (`api/groq.js` as a Vercel function, mirrored by a Vite dev-middleware so local dev behaves identically) — client code never holds a credential that could be extracted from devtools and used to run up someone else's bill.
- **Row Level Security on every table**, not just the ones that seemed obviously sensitive. The public-portfolio feature needs *some* rows readable by strangers — the RLS policies scope that exception to exactly the rows a user has explicitly marked public, nothing more.
- **Every AI call has a defined fallback.** If Groq is unreachable or returns malformed JSON, the app falls back to seed content instead of breaking the learning flow — matching the PRD's explicit error-state requirements rather than treating them as edge cases.
- **Built spec-first.** Every screen, interaction, and error state traces back to a detailed PRD (personas, acceptance criteria, AI guardrails, Supabase schema) — the kind of artifact a PM would write, translated directly into working software.

## Tech stack

React 18 · Vite · Tailwind CSS v4 · React Router · Framer Motion · react-tinder-card · Supabase (Postgres + Auth + RLS) · Groq (Llama 3) · Vercel

## Running it locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Groq credentials — see below
npm run dev
```

The app runs without any credentials configured — Supabase falls back to local-only progress, Groq falls back to static seed content. This makes the whole teaching and scenario-testing flow explorable with zero setup.

| Variable | Where it's used | Exposed to browser? |
|---|---|---|
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Auth, progress sync, public profiles | Yes — by design, protected by RLS |
| `GROQ_API_KEY` | Fresh-analogy generation, failure feedback | No — server-only |

Database schema (with RLS policies) lives in [`supabase/schema.sql`](./supabase/schema.sql), ready to run in the Supabase SQL editor.

## Status

MVP in active development. Module 1's curriculum is complete and fully tested; Module 2 (Roadmapping topics) is scaffolded but not yet authored. Deployment config (`vercel.json`) is in place and verified against a production build.
