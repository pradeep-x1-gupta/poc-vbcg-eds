Let me review the current implementation before finalizing the plan.# Allergy Care Guide — Floating Left Nav & Anchor Scroll Fix

## Problem

On `https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.live/allergy-care-guide`:
1. **Nav position** — the care-guide index links render stacked at the **top** of the page instead of as a **floating column on the left**.
2. **Anchor scrolling** — clicking a nav link does **not** scroll to the matching guide section.

## Root Cause (from reviewing the code)

- The two-column layout CSS in `styles/styles.css` targets the **wrong DOM level**. Edge Delivery's `decorateSections` wraps each block/content run in its own `*-wrapper` div that is a **direct child** of the section. The current rules apply the grid to `main > .section.guide-layout > div` (i.e. to *each wrapper individually*) and target the nav as `> div > .guide-nav-wrapper` (a grandchild that never matches). Net effect: no real two-column grid forms, so the nav wrapper just sits at the top and everything stacks. This is a **CSS-only** bug — `guide-nav.js` already adds the `guide-layout` class to the section correctly.
- **Anchors:** `care-guide.js` sets each card's `id` from its title slug (e.g. `allergy-testing-requested-by-patient`), which matches the nav `href`s. With the layout broken the jump targets are mispositioned; once the grid is corrected the anchors resolve. A small `scroll-margin-top` will be added so a jumped-to card isn't tucked under the header.

## Approach (confirmed with you)

- **Sticky left column** — nav sits in a fixed-width left column and stays pinned within the content area while the cards scroll (matches the source page).
- **Local changes only** — CSS edits verified in local preview; **no git push**. You handle deployment.
- **No content re-import needed** — the fix is purely in block/global CSS; the card `id`s are generated at runtime, so `content/` files are untouched.

## Planned Changes

1. **`styles/styles.css`** — rewrite the `guide-layout` rules so the **section itself** is the grid container:
   - `main > .section.guide-layout` → `display: grid; grid-template-columns: 240px 1fr; column-gap: 40px; max-width: 1280px; margin: 40px auto; padding: 0 32px` (desktop, ≥900px).
   - Reset the default inner-wrapper centering (`main > .section.guide-layout > div { max-width: none; margin: 0; padding: 0 }`) so columns control width.
   - Place the nav: `main > .section.guide-layout > .guide-nav-wrapper { grid-column: 1; grid-row: 1 / span 9999; }` (span all rows so the sticky nav has scroll travel).
   - Force remaining wrappers into the content column: `main > .section.guide-layout > *:not(.guide-nav-wrapper) { grid-column: 2; min-width: 0; }`.
2. **`blocks/guide-nav/guide-nav.css`** — keep the nav `position: sticky` with `align-self: start` and a sensible `top` offset so it floats as the cards scroll.
3. **`blocks/care-guide/care-guide.css`** — add `scroll-margin-top` to `.care-guide` so anchor jumps clear the header; optionally enable smooth scrolling.
4. **No change** expected to `guide-nav.js` / `care-guide.js` (class-add and id-generation already work) — will only touch them if preview reveals an id/label slug mismatch.

## Verification

- Preview the allergy page in the local dev server at desktop width (≥900px) and confirm the nav floats in a left column while cards occupy the right column.
- Scroll and confirm the nav stays pinned (sticky) within the content area.
- Click several nav links (e.g. Asthma, Drug Allergy, Rhinitis) and confirm each scrolls to its matching card, correctly offset below the header.
- Check narrow width (<900px) still stacks cleanly (nav on top, single column).
- Run lint on changed CSS.

## Checklist

- [ ] Re-read current `guide-layout` rules in `styles/styles.css` and the two wrapper-class names produced by `decorateSections`
- [ ] Fix `styles/styles.css`: move the grid to the section, reset inner wrappers, place nav in column 1 (row-spanning), force other content to column 2
- [ ] Update `blocks/guide-nav/guide-nav.css` sticky rule (`position: sticky`, `align-self: start`, `top` offset)
- [ ] Add `scroll-margin-top` (and smooth scroll) to `.care-guide` in `blocks/care-guide/care-guide.css`
- [ ] Preview allergy page at ≥900px — verify nav floats in left column, cards on right
- [ ] Verify nav stays sticky/pinned while scrolling the cards
- [ ] Click nav links and confirm each scrolls to the correct card with proper header offset
- [ ] Verify each card `id` matches its nav `href` slug; fix slug/label mismatch only if found
- [ ] Check <900px stacked layout still looks correct
- [ ] Lint changed CSS (stylelint) and confirm clean
- [ ] Report results and note that deployment to `.aem.live` is left to you (local changes only)

> **Note:** This plan is read-only. Applying these changes requires **Execute mode**.
