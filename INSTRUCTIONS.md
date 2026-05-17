# Versifio — sequential build instructions

How to ship this without losing your place. Read in order; do not skip
ahead. Each phase has a clear gate: don't move to the next phase until
the previous one's gate is met.

For the design + content spec see **`VERSIFIO.md`**. This file is the
build order — what to do, in what order, and why.

---

## Status (as of 2026-05-16)

```
Phase 1 ─ Static site complete                  ⏳ 1 of 5 tasks done
   ✅ 1.2  Issue archive page template (issue-12.html)
   ⬜ 1.1  Topic checkboxes on signup form
   ⬜ 1.3  Archive index page (issues.html)
   ⬜ 1.4  Open Graph + Twitter card metadata
   ⬜ 1.5  Favicon

Phase 2 ─ Pipeline auto-export                  ⬜ not started
Phase 3 ─ Newsletter composition                ⬜ not started
Phase 4 ─ Beehiiv wired up                      ⬜ DEFERRED
Phase 5 ─ Topic-filter delivery                 ⬜ DEFERRED
Phase 6 ─ Podcast RSS feed                      ⬜ OPTIONAL
Phase 7 ─ Sponsorship                           ⬜ wait for 1K subs
Phase 8 ─ Paid tier                             ⬜ wait for 2K subs
```

**Manual user actions also pending** (not in the phase plan but blocking):

- ⬜ Enable GitHub Pages in repo settings
  (https://github.com/josh-max2/Versifio/settings/pages → Source: main / root)
- ⬜ Update bio links on all 7 channel handles with UTM-tagged URLs
  - TT: `@ander__all`, `@crash_magnet`, `@GridIronCourt`, `@ander__uplift`
  - YT: `@ander_alls`, `@c-magnet`, `@gridironcourt`
  - URL format: `https://josh-max2.github.io/Versifio/?utm_source=<handle>&utm_medium=<tt|yt>&utm_campaign=bio`
- ⬜ Save TT Creator Studio + YT Studio demographic screenshots to
  `Versifio-deploy/sponsor-pack/` (the 80% / 25-44 evidence; decays as data ages)
- ⬜ Decide: buy `versif.io` domain or stay on github.io subdomain

### When you come back — start here

1. **Confirm the manual actions above are done first.** No engineering work
   matters if there's no traffic source pointed at the site.
2. **Then resume at Phase 1.4** (Open Graph metadata) — it's the highest-leverage
   remaining static-site task. Every shared bio link gets a clean unfurled preview.
3. **Phase 1.1, 1.3, 1.5** can ship in any order after that. None block Phase 2.
4. **Don't start Phase 2 (`versifio_export.py`) until Phase 1 is done** — it
   depends on having a complete site to write into.

---

## The phases at a glance

```
PHASE 1  ─ Static site complete, no ESP                  ← ship now
PHASE 2  ─ Pipeline auto-exports to Versifio              ← ship now
PHASE 3  ─ Newsletter composition layer (still no ESP)    ← ship now
PHASE 4  ─ Beehiiv wired up + first manual send           ← deferred
PHASE 5  ─ Topic-filter delivery via Beehiiv tags         ← deferred
PHASE 6  ─ Podcast RSS feed + Apple/Spotify submission    ← optional
PHASE 7  ─ Sponsorship at ~1K subs                        ← later
PHASE 8  ─ Paid tier at ~2K subs                          ← much later
```

Phases 1-3 can be built today and do NOT depend on Beehiiv. Phases 4+
gate on user readiness to commit to an ESP.

---

## PHASE 1 — Static site complete

**Goal:** Versifio looks complete, indexes well, and would convert
a visitor if traffic showed up. No backend yet.

### 1.1 Topic checkboxes on the signup form
- Update `index.html` signup section: 4 checkboxes above the email field
  - Economics
  - Political Economy
  - Technology
  - Science
- Form is still a no-op (visual only). The submit handler stores the
  selected topics in a temporary client-side variable so the UX flow
  is testable end-to-end.
- Same checkboxes on the issue-page signup CTA.

### 1.2 Issue archive page template
- `issue-12.html` is the canonical template &mdash; do not break its
  structure. Future issues are `issue-13.html`, `issue-14.html`, etc.
- Editorial structure is locked: three beats per story
  (news / why-this-matters-with-causes / what-this-means-for-you).
- Today&rsquo;s Brief (TLDR) section at the top with anchor links
  to `#story-1`, `#story-2`, `#story-3`.
- Optional chart or photo per story. SVG inline preferred. Photo
  placeholder pattern for narrative stories.

### 1.3 Archive index page
- New file: `issues.html` (or `archive.html`) &mdash; lists every
  published issue in reverse chronological order.
- Same hairline-divider treatment as the landing&rsquo;s Recent Issues.
- Link from the landing page footer: &ldquo;Past issues &rarr;&rdquo;.

### 1.4 Open Graph + Twitter card metadata
- Add to every page&rsquo;s `<head>`:
  - `<meta property="og:title">`
  - `<meta property="og:description">`
  - `<meta property="og:image">` &mdash; 1200&times;630 PNG of the
    wordmark on beige background. Save as `assets/og-image.png`.
  - `<meta name="twitter:card" content="summary_large_image">`
- Test by pasting a Versifio URL into Slack / Discord / iMessage.

### 1.5 Favicon
- Add a simple favicon &mdash; one letter &ldquo;V&rdquo; in Pinyon
  Script on beige, or just a small flourish.
- Save as `favicon.ico` at repo root.
- Wire in `<head>`: `<link rel="icon" href="/favicon.ico">`.

**Gate for Phase 1:** Open `index.html`, click a TLDR item on an issue
page, see it scroll to the right story. Paste the URL into Slack and
get a nice unfurled preview. Looks like a real publication.

---

## PHASE 2 — Pipeline auto-export

**Goal:** Every video the datamaker pipeline renders also writes a
Versifio story page + audio file, then git-pushes the Versifio repo.

### 2.1 `versifio_export.py` module (in datamaker)
- Read `meta.json` from the just-completed render.
- Extract: hook, script, sources, hashtags, vertical (from builder
  config), date, slug.
- Run one Haiku call to reformat the narration script into reading
  prose. Prompt: split into the three-beat structure
  (news / why+causes / what-it-means-for-you). Output as structured
  JSON with the three paragraphs explicitly tagged.
- Cost: ~$0.005 per render. Failure non-fatal &mdash; if Haiku errors,
  ship the verbatim script with paragraph-break heuristics.

### 2.2 Story page generator
- Render the three paragraphs into the issue-page HTML template using
  Python string substitution (no template engine needed at this scale).
- Output to `Versifio-deploy/stories/<slug>.html`.
- Same template as `issue-12.html`.

### 2.3 Manifest update
- Append entry to `Versifio-deploy/stories/manifest.json`:
  ```json
  {
    "slug": "30yr_treasury_510_20260516",
    "title": "The 30-year Treasury just cracked 5.1%",
    "vertical": "markets",
    "date": "2026-05-16",
    "issue_number": 13,
    "summary": "Bonds are climbing because ...",
    "audio_url": "/audio/30yr_treasury_510_20260516.mp3"
  }
  ```
- Landing page reads this manifest via JS to populate &ldquo;Recent
  issues&rdquo; with the latest 3 stories.

### 2.4 Audio render
- New step in `versifio_export.py`: shell out to `chatterbox_cli.py`
  with the formatted text + a fixed newsletter voice (Leonardo).
- Output to `Versifio-deploy/audio/<slug>.mp3`.
- ~30s GPU time per render.

### 2.5 Git push the Versifio repo
- After all files written, `git add . && git commit -m "Issue N: ..."
  && git push` against the Versifio repo from the datamaker pipeline.
- Wrap in try/except &mdash; if the push fails (network, conflict),
  render still ships. Log the failure for manual retry.

### 2.6 Wire into `pipeline.py`
- Call `versifio_export.export_story(meta_json_path)` between
  `burn_subtitles` and `enqueue_for_publishing`.
- Like analytics export and dashboard export, treat failures as
  non-fatal warnings.

**Gate for Phase 2:** Run a single datamaker render manually. After
it completes, see a new HTML file at
`https://josh-max2.github.io/Versifio/stories/<slug>.html` and a
new MP3 at `/audio/<slug>.mp3`. Manifest.json updated. Landing
page&rsquo;s Recent Issues shows the new entry.

---

## PHASE 3 — Newsletter composition

**Goal:** Daily at 7:30am MST, a script composes that day's newsletter
issue HTML page (still no ESP send &mdash; just composition + archive).

### 3.1 `newsletter_compose.py` script (in datamaker)
- Read all stories from `Versifio-deploy/stories/manifest.json`
  posted in the last 24 hours.
- Filter to the 4 verticals: markets, poli_econ, tech, science.
- One Sonnet call to:
  - Write the issue lede (one italic sentence)
  - Write the closing kicker (one question)
  - Write the TLDR (one ELI5 sentence per story)
- Compose the issue-N.html using the existing template, with each
  story&rsquo;s three-paragraph body inlined.

### 3.2 Output the issue page
- File: `Versifio-deploy/issue-<N>.html`.
- Issue number auto-increments from the manifest.
- Add entry to `issues.json` (separate from stories manifest):
  ```json
  {
    "issue_number": 13,
    "date": "2026-05-16",
    "lede": "...",
    "stories": ["slug1", "slug2", "slug3"],
    "audio_url": "/audio/issue-13.mp3"
  }
  ```

### 3.3 Issue audio version
- Concatenate the per-story MP3s into one issue MP3.
- Or: render fresh audio from the composed issue text (preferred
  &mdash; consistent voice + intro / kicker).
- Output to `Versifio-deploy/audio/issue-<N>.mp3`.

### 3.4 Update archive index
- `issues.html` reads `issues.json` and renders the list.
- Latest issue at top, hairline dividers, links to each issue&rsquo;s
  archive page.

### 3.5 Schedule
- Windows Task Scheduler XML in `schedule_setup/`:
  `datamaker-newsletter-compose-7_30am.xml` &mdash; runs daily at 7:30am
  MST (after all overnight renders complete at the latest 17:00 MST
  sports slot ~7-9hr earlier).

**Gate for Phase 3:** At 7:30am, a new `issue-N.html` is auto-generated
from yesterday&rsquo;s renders, live at
`https://josh-max2.github.io/Versifio/issue-<N>.html`. No ESP send
yet &mdash; just the static archive page. Verify the editorial output
quality across 3-5 consecutive issues before moving on.

---

## PHASE 4 — Beehiiv wired up (deferred)

**Goal:** First real newsletter send. Manual composition in Beehiiv
UI initially; automation later.

**Prerequisite:** Phase 3 has been running cleanly for at least 2
weeks. Editorial quality is consistent. You&rsquo;ve read 10+
auto-generated issues and trust the pipeline output.

### 4.1 Beehiiv account
- Sign up at beehiiv.com. Free tier &mdash; 2.5K subs / unlimited sends.
- Custom sender domain: configure SPF/DKIM/DMARC against
  `versifio.com` (or whichever domain you settle on).
- Brand: upload Pinyon Script wordmark PNG, set the brand color
  `#C9A961`, paste the about copy.

### 4.2 Tag schema
- Create 4 subscriber tags in Beehiiv:
  `markets`, `poli_econ`, `tech`, `science`.
- Each maps to a topic checkbox on the signup form.

### 4.3 Landing form integration
- Replace the current no-op form submit with a Beehiiv API call.
- POST `https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions`
  with `email` + `subscription_tags`.
- Show success state inline (current placeholder &ldquo;Thank
  you&rdquo; copy is correct; just wire the actual API).

### 4.4 Newsletter email template
- Email-safe HTML version of the issue page.
- Pinyon Script wordmark becomes a PNG image (Gmail strips Google
  Fonts).
- Body fonts fall back to Georgia / Palatino (declared in font-family
  stacks already).
- Table-based layout, inline styles, 600px max width.
- Reference: `previews/newsletter-2026-05-16.html` is the template.

### 4.5 First send: manual
- Compose Issue 1 in Beehiiv UI using the previous day&rsquo;s
  auto-generated `issue-N.html` as source material.
- Send to yourself + 2-3 friends to verify the loop.
- After 2-3 manual issues, move to automation in 4.6.

### 4.6 Automated send
- New script `newsletter_send.py`: take the composed issue HTML,
  push to Beehiiv via POST API as a draft, schedule for 8am MST.
- Schedule via Windows Task at 7:45am (compose at 7:30, send at 8:00).

**Gate for Phase 4:** First real newsletter lands in your inbox at
8am with the right content. Open rate / click rate visible in Beehiiv
analytics.

---

## PHASE 5 — Topic-filter delivery

**Goal:** Subscribers receive only the stories matching their tag
preferences.

**Prerequisite:** Phase 4 running cleanly for 2 weeks. You have at
least 100 free subscribers to validate segment-send actually works.

### 5.1 Conditional content blocks in Beehiiv
- Tag each story&rsquo;s `<article>` with `data-vertical="markets"`
  (etc.) in the source HTML.
- In Beehiiv&rsquo;s email template, wrap each story in a
  conditional-content block keyed on the matching subscriber tag.
- Beehiiv renders only the blocks matching each subscriber&rsquo;s
  tags at send time.

### 5.2 No-story-match handling
- If a subscriber&rsquo;s tag selection produces 0 stories that day:
  skip the send. They get tomorrow&rsquo;s instead.
- After 7 days with no matching send, send a weekly digest of the
  past week&rsquo;s top stories regardless of tags &mdash; keeps the
  brand presence alive even for narrow-interest subscribers.

### 5.3 Preferences page
- New static page: `preferences.html` at the Versifio root.
- Lets subscribers re-select their tags via a Beehiiv-generated
  preference center URL embedded in every email footer.

**Gate for Phase 5:** A subscriber with only `science` selected
receives only the MIT story from yesterday&rsquo;s issue. A subscriber
with all four tags receives the full issue.

---

## PHASE 6 — Podcast distribution (optional)

**Goal:** Same daily audio that lives on the site becomes a free
distribution surface via Apple Podcasts + Spotify.

### 6.1 RSS feed generator
- New file: `Versifio-deploy/podcast.xml` &mdash; auto-regenerated by
  `versifio_export.py` after each issue.
- RSS 2.0 spec with iTunes namespace extensions.

### 6.2 Submit to podcast directories
- Apple Podcasts: podcasters.apple.com &rarr; submit feed URL.
  Approval ~5 days.
- Spotify for Podcasters: same flow.
- Pocket Casts, Overcast, etc. auto-discover from Apple submission.

**Gate for Phase 6:** Search &ldquo;Versifio&rdquo; in Apple Podcasts
and find the show. New issues auto-appear within ~30 min of audio
publish.

---

## PHASE 7 — Sponsorship at ~1K subs

**Goal:** First sponsor slot in the daily newsletter. ~$50-200/mo
target initially.

**Prerequisite:** 1,000+ active free subscribers, consistent 30%+
open rate.

- Build a one-page sponsor sheet (audience size, demographics, CPM
  benchmarks). Use the 25-44 / 80% demographic claim here.
- One sponsor slot per issue at the bottom: 1 sentence + 1 link.
- Editorial guardrail: sponsor slot is clearly labeled
  &ldquo;SPONSORED.&rdquo; No native ads dressed as editorial.
- Target initial CPM: $20-40 (small-newsletter benchmark for
  professional audience).

---

## PHASE 8 — Paid tier at ~2K subs

**Goal:** Paid subscription tier launched. Target $5-7/mo or $50-70/yr.

**Prerequisite:** 2,000+ active free subscribers, you&rsquo;ve been
shipping the audio version for at least 6 months as a free perk
(grandfathering protection), and the Sunday weekly digest format
has been a free perk for at least 3 months.

The paid tier offers:
- Daily 3-story brief (same as free)
- + Full audio version (previously free; transitions to paid)
- + Full archive search (previously free; transitions to paid)
- + Sunday Deep-Dive long-form piece per vertical (previously free)
- + No sponsor slots

Free tier keeps the daily 3-story brief but loses audio + archive
+ Sunday deep-dive. Existing free subscribers are grandfathered for
90 days, then prompted to convert.

---

## Cross-cutting concerns

### Versioning
Tag each `issue-N.html` and `stories/<slug>.html` with a `data-spec-version`
attribute so we know which editorial-structure version produced
each issue. When the structure evolves (e.g., adding paragraph 4),
old issues stay readable in their original form.

### Audio file hosting
GitHub Pages comfortably handles ~100MB total. At 3MB/issue + 6
months of daily issues = 540MB &mdash; past the comfort zone.
Migrate audio hosting to Cloudflare R2 (10GB free tier) around
month 4-5 of daily issues. Update the `audio_url` field in
`manifest.json` to point at the CDN.

### Issue-number sequence
Issues number sequentially from 1. Don&rsquo;t restart per year. The
manifest tracks the next available number. Treat the number as
permanent &mdash; if you delete an issue, its number is retired,
not reused.

### Editorial review
Before Phase 4 (real sends), commit to reading every auto-generated
issue for at least 14 days. If the three-beat structure produces
weak &ldquo;What this means for you&rdquo; paragraphs, the prompt
needs tuning &mdash; this is the highest-value editorial work in
the whole stack.

### Cost ceiling
Total run-rate at every realistic scale:
- 0-2.5K subs: ~$55/mo (pipeline + Anthropic + free ESP)
- 2.5K-5K subs: ~$94/mo (Beehiiv Grow tier)
- 5K-10K subs: ~$154/mo
- 10K+ subs: still under $200/mo until 25K

Revenue should outpace costs by 5-10&times; at every stage past 1K
subs. If it doesn&rsquo;t, the bottleneck is upstream (audience
acquisition, content quality, ESP open rates &mdash; not infra).
