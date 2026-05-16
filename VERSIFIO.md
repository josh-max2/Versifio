# Versifio — site spec

The destination page for traffic from the 4 short-form video brands
(@ander__all, @crash_magnet, @GridIronCourt, @ander__uplift). Hosted
on GitHub Pages at **https://josh-max2.github.io/Versifio/**. Repo:
`josh-max2/Versifio`. Local clone: `C:\Users\joshs\Desktop\Versifio-deploy`.

(`versif.io` is the aspirational brand domain but has not been
purchased. Adding it later = buy the domain, drop a `CNAME` file
back into the repo root, configure DNS, re-tick HTTPS in repo Pages
settings.)

This file is the design + content spec. Internal — not deployed.

---

## Purpose

One destination for all 4 brands' bio links. Captures email signups
that turn algorithmic short-form views into a list we own. The
short-form videos are top-of-funnel; this site is mid-funnel; the
newsletter (TBD) is bottom-of-funnel monetization.

**Not** a magazine. **Not** a content hub. **Not** a paid product
yet. It is a single high-trust landing page that earns a free signup.

## Brand identity

| Token | Value | Where |
|---|---|---|
| Display font | **Pinyon Script** (Google Fonts) | brand wordmark only |
| Body font | Cormorant Garamond | headlines + body |
| Mono accent | system-ui | metadata, dates, sources |
| Background | `#FAF7F2` | warm cream — primary surface |
| Surface | `#F0E9DE` | cards, dividers, subtle elevation |
| Border | `#E0D5C4` | hairlines, input borders |
| Text primary | `#1A1410` | headlines, body |
| Text secondary | `#5C4B3A` | metadata, sub-copy |
| Text muted | `#8A7866` | timestamps, captions |
| Accent | `#C9A961` | calls-to-action, link underlines |

Aesthetic: **editorial minimalism**. Closer to a literary quarterly
than a SaaS landing page. Heavy whitespace, generous line-height,
restrained accents. No gradients, no shadows, no animation except
fade-in on scroll.

## Page structure (`index.html`)

```
┌─ Hero
│   "Versifio" wordmark (Pinyon Script, ~120pt)
│   One-line value prop (Cormorant Garamond italic, ~28pt)
│   Subtle horizontal rule
│
├─ Promise
│   2-3 sentences. Who it's for, what they get, cadence.
│
├─ What you get  ─── eyebrow + 4 em-dash bullets
│   Concrete: how many stories, how often, sources, free
│
├─ Recent issues  ─── eyebrow + 3 stacked rows
│   Per row: date + issue # (mono caps, justified),
│            title (1.55rem serif), one-line summary.
│   Hairline divider between rows. Currently HARDCODED
│   placeholder content — swap for real once newsletter exists.
│
├─ Pull quote
│   One italic passage between top/bottom hairlines.
│   Cite line below. Acts as "voice sample."
│
├─ Signup
│   Email input + button. No Beehiiv yet — endpoint TBD.
│   Moved DOWN after the proof on purpose — converts better
│   once a visitor has sampled the content.
│
├─ About (single paragraph)
│   Who runs this. Honest. No "AI-powered" buzz.
│
└─ Footer
    One-line copyright. No nav clutter.
```

Shared `.section-title` class drives the eyebrow look on every
section (muted, uppercase, 0.22em tracking, centered). Don't add
per-section h2 styles — extend `.section-title` if needed.

## What it ISN'T (anti-scope)

- No multi-page nav. One scrolled page.
- No blog index. Each video already has its TT/YT permalink.
- No paid tier copy. Free signup only at this scale.
- No social-proof testimonials we don't have.
- No counters (subscriber count, view count) until they're impressive.
- No JS framework. Vanilla HTML/CSS + ~30 lines of JS max.

## Deployment

GitHub Pages, default subdomain — no custom domain yet.
- URL: **https://josh-max2.github.io/Versifio/**
- Enable in repo Settings → Pages → Source: `main` branch / `(root)`
- HTTPS auto-issued by GitHub (Let's Encrypt) for the github.io URL

**To add `versif.io` later** (when/if domain is purchased):
1. Create a file named `CNAME` at repo root containing `versif.io`
2. At the registrar, A-record `@` → 185.199.108.153 / .109.153 /
   .110.153 / .111.153 (GitHub Pages IPs); CNAME `www` →
   `josh-max2.github.io`
3. Repo Settings → Pages → wait for "DNS check successful" → tick
   "Enforce HTTPS"

## Content TODOs (gates the launch)

1. **The promise.** One sentence answering "what do you get every
   {day|week}". Until this is decided, the site is half-built.
   Candidates from the strategy convo:
   - "Daily 60-second breakdowns of today's biggest story per vertical"
   - "3 stories you'd otherwise miss, every weekday"
   - "The data behind today's headlines"
2. **Cadence.** Daily / weekday / weekly. Drives the signup form copy
   and the proof-of-cadence sample.
3. **Email endpoint.** Beehiiv, Buttondown, ConvertKit, or roll-your-own.
   Currently a no-op form — replace `action` once chosen.
4. **About paragraph.** Honest description of who/what/why. Avoid
   "AI" language unless the angle is "honest about being AI-assisted."

## Source-of-truth

- This file: design + content spec
- `index.html`: actual page
- `assets/css/main.css`: visual system
- `assets/js/main.js`: signup form + minimal scroll-fade interactions
- `README.md`: public-facing one-liner shown on GitHub repo
- `CNAME`: custom-domain pointer for GitHub Pages

Cross-link from datamaker: when video renders include a bio-link CTA,
the URL should be `https://josh-max2.github.io/Versifio/?utm_source=<channel>&utm_medium=<tt|yt>&utm_campaign=bio`
(swap to `https://versif.io/...` if/when the custom domain is wired
up) so each channel's funnel is measurable in dashboard analytics.

## Issue page anatomy

```
Hero          ─ wordmark + tagline + date stamp
Headline      ─ issue title + italic lede
Listen button ─ links to /audio/issue-N.mp3

Today's brief ─ TLDR / ELI5 (NEW — added 2026-05-16)
   3 numbered entries, each:
     · vertical eyebrow (Markets / Business / etc.)
     · headline (matches the full story below)
     · ELI5 one-sentence description
     · entire entry is a link → smooth-scrolls to #story-N anchor

[3 full stories below, each with the three-beat structure]

Kicker        ─ closing question
Signup CTA    ─ subscribe form
Footer        ─ copyright
```

The TLDR section is load-bearing for two reasons: (1) it gives skim-
reading subscribers the full takeaway in 15 seconds without forcing
them to read the long-form below; (2) it works as a within-issue nav
via anchor links — readers can jump straight to the vertical they care
about most. Smooth-scroll behavior on `<html>` makes this feel native.

ELI5 descriptions should be **one sentence, ~15-25 words, plain
language**. The goal: capture the "so what" in language that
doesn't require any prior context. Examples from issue 12:

```
Bonds are climbing because the math behind US debt isn't politically
fixable right now. The rate cuts you priced in aren't fully coming.

Companies are pulling back from politics. The premium you've been
paying for "brands with values" is about to drop across the
consumer landscape.

Policy choices in 2025 quietly defunded America's R&D pipeline by
20%. The economy notices in 2036.
```

The TLDR is the part most subscribers will read. The long-form below
is for the readers who decide one story matters enough to read fully.
Design the editorial accordingly.

## Editorial structure — the three-beat story

Every story on an issue page (and in every newsletter issue) follows
this three-paragraph rhythm. This is the editorial contract that
separates Versifio from wire-service rehashing.

```
Paragraph 1 — WHAT HAPPENED
  The news. Facts, numbers, who/when/where. Wire-service prose.
  ~80-100 words. No analysis here; just the event.

Paragraph 2 — WHY THIS MATTERS  (the curation layer)
  Lead with bold "Why this matters."
  Two beats inside this paragraph:
    1. Mechanism — what this event is part of structurally
       (e.g., "the 30-yr is the benchmark for every mortgage")
    2. Drivers — name the political / policy / structural causes
       that produced this event. NOT "markets moved" — explain
       the system that moved them.
       Examples: reconciliation bills, executive orders, activist
       investors, CEO mandates, AG pressure, regulatory shifts.
  ~120-140 words. This is where the editorial value lives.

Paragraph 3 — WHAT THIS MEANS FOR YOU
  Lead with bold "What this means for you."
  Predictive but conditional — never date-or-price-specific.
  Speak directly to a 25-44 professional making decisions.
  Anchor to concrete domains:
    - your mortgage / your savings / your retirement
    - your career / your kids' education
    - your industry / your employer
    - your investments / your debt
  ~80-100 words.
  Good: "If you're locking a mortgage this summer..."
  Bad:  "Mortgage rates will hit 8% by Q3."
```

The middle paragraph is the load-bearing one. It's the difference
between "we summarize the news" (every newsletter) and "we explain
the system that produced the news" (Versifio's wedge). Lean into
naming political/policy drivers explicitly &mdash; reconciliation
bills, activist investors, regulatory shifts, executive policy.

## Vertical scope

Versifio covers four verticals, all aligned to a 25-44 professional
reader trying to understand the next decade:

- **Economics** &mdash; macro, markets, monetary policy
- **Political Economy** &mdash; fiscal/trade/tariff/energy/regulation
- **Technology** &mdash; AI, semis, valuations, infrastructure
- **Science** &mdash; research, funding, breakthroughs

Sports is intentionally OUT of scope. The @GridIronCourt brand
remains a separate publication if it ever gets a newsletter
counterpart &mdash; sports has its own voice, cadence, sponsor
economics, and reader cohort that doesn't fit the 25-44 professional
brief tone.

## Audience

Predominantly 25-44 professionals (per @ander__all, @crash_magnet,
@gridironcourt TT + YT Creator Studio analytics, roughly 80% of
viewers in this range). Median household income estimated $80-120K.
Decision-makers in their highest-earning years: first house, kids'
education, career pivot, portfolio's next decade.

**Use this in:** sponsor decks, press kit, about page (subtle line).
**Do NOT use this in:** landing-page hero copy (reads as marketed).
Let the writing target the demo &mdash; if the prose is written for
this reader, the reader recognizes themselves without being told.

## Decisions log

- **2026-05-16** — repo created, scaffold + spec shipped. Beige
  minimalist palette + Pinyon Script wordmark chosen. No Beehiiv
  integration yet (form is visual placeholder).
- **2026-05-16 (later)** — `versif.io` is not yet purchased; site
  launches on github.io subdomain. `CNAME` file removed. Mailto link
  in footer removed (email address doesn't exist). All-internal
  references updated to the github.io URL.
- **2026-05-16 (later still)** — three new sections shipped: "What
  you get" (em-dash bullets), "Recent issues" (3 hardcoded
  placeholder rows with date/issue#/title/summary, hairline dividers),
  and a centered pull quote between top/bottom hairlines. Signup
  moved below the proof. Refactored eyebrow styling to a shared
  `.section-title` class. Placeholder issue copy uses real
  brand-vertical topics (wheat/Boeing/Fed) so the voice calibration
  is correct when real issues replace it.
- **2026-05-16 (still later)** — `issue-12.html` shipped as the
  prototype issue-archive page. Wider container (720px), per-story
  chart/photo affordance, three-beat editorial structure (news →
  why-this-matters-with-causes → what-this-means-for-you). SVG charts
  hand-built for stories 1 and 3 (Treasury yield line, MIT enrollment
  bars); story 2 has a photo placeholder. Vertical scope clarified:
  Econ / Poli-Econ / Tech / Science &mdash; Sports out of scope for
  Versifio. Audience demographic (25-44 professional) documented for
  sponsor-deck use; explicitly NOT for landing-page copy.
- **2026-05-16 (latest)** — TLDR / "Today's brief" section added to
  issue page above the long-form stories. Three entries with
  vertical eyebrow + headline + ELI5 one-sentence description; each
  entry is a smooth-scroll anchor link to its full story below
  (`#story-1`, `#story-2`, `#story-3`). Smooth-scroll behavior set
  on `<html>` with reduced-motion fallback. `INSTRUCTIONS.md`
  created as the sequential build plan (8 phases, phases 1-3 are
  static-only and can ship now; phases 4+ defer until ESP is wired).
  Topic-filter on signup, vertical scope, paid-tier sequencing, and
  every operational gate documented.
