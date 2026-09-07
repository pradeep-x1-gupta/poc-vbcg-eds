I'll help migrate these two pages to AEM. Before I build out the plan, I need to clarify one thing that significantly changes the approach.# Value-based Care Guides Migration Plan

Migrating two pages to AEM Edge Delivery Services **from screenshots only** (no live source URLs). Because there's no scrapable source, structure, text, and links will be reconstructed from the screenshots, and I'll confirm ambiguous details with you before importing.

## Source Material

- **Screenshot 1 — Index page** (`Value-based Care Guides Index`): dark header with Risant Health logo, page title + intro, an "Ask a question" AI advisor search box, a two-column A–Z list of ~40 specialty links, an "About" section with two paragraphs, and a dark footer (logo, "Send feedback to Clinical Library", disclaimer, copyright).
- **Screenshot 2 — Allergy Care Guide page**: same header/footer chrome, a left-hand in-page anchor nav (jump links), a title + intro, a "Send feedback and questions" link, then a long stack of repeating **guide cards**. Each card = a blue section heading (e.g. "Allergy Testing, Requested by Patient", "Asthma", "Drug Allergy"…) with a two-column body: **Quick Guide** (Background / Evaluation / Management) on the left and **Referral Guidelines** on the right, plus a **Patient Communication** row. A floating "Value-based Care Advisor" button sits bottom-right.

## Key Decisions & Assumptions (to confirm)

- **Advisor search box & floating button** are interactive app widgets. From screenshots I can only reproduce them as static UI (styled input + button) unless you have the underlying integration. Flagging for confirmation.
- **Fine text inside the Allergy cards** is very small in the screenshot (2000px tall). I'll transcribe as accurately as possible; some clinical detail and inline links may be approximate and will need your review.
- **Specialty links** on the index and jump-links on the guide page point to targets not visible in screenshots; I'll use placeholder/relative paths and list them for you to correct.

## Checklist

- [ ] Confirm project type (doc / da / xwalk) and the block library endpoint via the project-expert step
- [ ] Confirm handling of the AI advisor search box and floating "Value-based Care Advisor" button (static UI vs. real integration vs. omit)
- [ ] Establish target page paths (e.g. `/value-based-care-guides` index and `/value-based-care-guides/allergy`)
- [ ] Analyze **Index page** screenshot: identify sections, content sequences, and required block variants (header, hero/intro, search, two-column specialty link list, about, footer)
- [ ] Analyze **Allergy Care Guide** screenshot: identify sections and the repeating "guide card" pattern (jump nav, intro, guide cards with Quick Guide / Referral Guidelines / Patient Communication, floating button)
- [ ] Survey available blocks in the project + Block Collection; map each section to an existing block or flag a new variant
- [ ] Transcribe all visible text content from both screenshots (titles, intro copy, specialty list, card contents, footer/disclaimer) for review
- [ ] Confirm/correct link targets for specialty links and in-page jump links
- [ ] Design any new block variants needed (e.g. specialty link grid, guide card, anchored side-nav) with CSS matching the Risant Health look (dark navy header/footer, blue links, light-blue card headers)
- [ ] Generate import infrastructure (parsers + transformers) and page templates for both pages
- [ ] Produce import HTML via the bundled import script (never hand-authored) and run the bulk import
- [ ] Preview both pages locally and compare against screenshots
- [ ] Visually critique and iterate on styling until it matches the source
- [ ] Review header/footer/nav consistency across both pages
- [ ] Summarize results and list all items needing your verification (approximate text, link targets, advisor widgets)

## Notes

Execution requires **Execute mode** — this plan is read-only. Once you approve and switch modes, I'll start with project setup and the index page analysis, pausing at the confirmation items above.

Want me to adjust scope (e.g. index page only first), or proceed with this plan?
