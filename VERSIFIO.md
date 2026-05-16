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
