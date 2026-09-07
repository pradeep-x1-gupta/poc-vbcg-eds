Let me review the current anchor-related code to ground the diagnosis before finalizing the plan.# Allergy Care Guide — Anchor Scroll Lands on Wrong Section

## Problem

On `https://main--poc-vbcg-eds--pradeep-x1-gupta.aem.live/allergy-care-guide`, the floating left nav is now working (previous fix deployed), but **clicking a jump link scrolls to the wrong place** — it moves, but doesn't land on the matching guide card.

## What I Already Know (from the code)

- `care-guide.js` assigns each card an `id` by slugifying its title (`toLowerCase → non‑alphanumeric runs to "-" → trim dashes`), e.g. "Chronic Cough, Pediatric" → `chronic-cough-pediatric`.
- The nav hrefs (from `guide-nav`) are `#allergy-testing-requested-by-patient`, `#chronic-cough-pediatric`, `#bee-sting-allergy-other-insect-allergy`, … — these appear to match the generated slugs.
- `.care-guide.block` has `scroll-margin-top: calc(var(--nav-height) + 20px)` and `html { scroll-behavior: smooth }` is set globally.
- In the earlier local session a single anchor ("Drug Allergy") landed correctly at the header offset — so the mechanism works in principle, which points to a **live-only / timing / layout-shift** cause rather than a plain selector typo.

## Likely Root Causes (to confirm by reproduction, most probable first)

1. **Layout shift during smooth scroll (most likely).** With `scroll-behavior: smooth`, the browser computes the target's position at click time and animates there. On live, lazy-loaded blocks/images and real web fonts above the target finalize their sizes *during* the animation, so the card's real position moves and the scroll ends at a now-stale offset — landing on the wrong section. (My earlier local check measured *after* settling and only mid‑page, so it didn't catch this.)
2. **`id` set on the inner block, decorated lazily.** The `id` is applied by `care-guide.js` during block decoration. If a click/hash resolves before that block is decorated, the target isn't found or is mispositioned. A hash on initial load is especially prone to this.
3. **Offset/anchor mismatch.** A slug that doesn't match its href (e.g. punctuation like `/`, `&`, `,` producing a different slug than the hardcoded href), or the `scroll-margin-top` not matching the actual sticky header height on live.

## Approach (confirmed with you)

- **Local changes only** — reproduce and verify in local preview; **no git push**. You deploy.
- **Diagnose before fixing** — reproduce each of the 13 anchors in the local dev server, measure where each lands vs. the card's true top, and pin down which of the causes above is real (checking during and after any smooth-scroll animation, and after images/fonts load).
- **Fix defensively** — likely a small, self-contained JS anchor handler in the `guide-nav` block that resolves the target by id and scrolls to it reliably (accounting for the sticky-header offset) *after* layout is stable, plus revisiting the global `scroll-behavior: smooth` if it proves to be the culprit. Keep the id generation robust and matched to the nav hrefs.

## Planned Changes (finalized after diagnosis)

1. **`blocks/guide-nav/guide-nav.js`** — add a click handler on nav links that: prevents the default jump, looks up the target card by its `href` id, and scrolls to it with the correct header offset (e.g. compute `getBoundingClientRect().top + scrollY − headerOffset` and `window.scrollTo`), so the landing point is correct even if native smooth-jump would mis-measure. Update the URL hash without triggering a second jump.
2. **`blocks/care-guide/care-guide.js`** — if diagnosis shows a slug↔href mismatch, align the slug logic (or emit an id that exactly matches the nav hrefs); no change if they already match.
3. **`styles/styles.css` / `blocks/care-guide/care-guide.css`** — adjust `scroll-behavior` and/or `scroll-margin-top` only if the measurement shows the offset or smooth-scroll is the cause.
4. **No content re-import** — ids are generated at runtime; `content/` is untouched.

## Verification

- In local preview at desktop width, click **every** nav link and confirm each lands with its card's title bar just below the sticky header (measure `card.getBoundingClientRect().top ≈ header offset` after the scroll settles).
- Test the worst cases for layout shift: links to cards far down the page (Rash, Rhinitis) and the first/last links.
- Test a **deep link on load** (`/content/allergy-care-guide#rhinitis`) to confirm the on-load hash resolves to the right card.
- Confirm no regression to the floating/sticky nav and the two-column layout.
- Check narrow width (<900px) still stacks and anchors still work.
- Run stylelint / eslint on changed files.

## Checklist

- [ ] Reproduce in local preview: click each of the 13 nav links and record where each lands vs. the target card's true top
- [ ] Determine the real cause: layout-shift-during-smooth-scroll vs. lazy id assignment vs. slug/href mismatch vs. offset
- [ ] Verify every card `id` exactly equals its nav link `href` (flag any punctuation-driven mismatch)
- [ ] Implement the fix in `blocks/guide-nav/guide-nav.js` (robust click-to-scroll with correct sticky-header offset; update hash without double-jump)
- [ ] Adjust `care-guide.js` slug/id only if a mismatch was found
- [ ] Adjust `scroll-behavior` / `scroll-margin-top` only if measurement shows offset/smooth-scroll is the cause
- [ ] Re-test all anchors at desktop width — each lands on the correct card below the header
- [ ] Test deep link on load (`#rhinitis`) resolves to the correct card
- [ ] Verify sticky floating nav and two-column layout still intact; check <900px stacked behavior
- [ ] Lint changed JS/CSS (eslint + stylelint) and confirm clean
- [ ] Report findings and fix; note deployment to `.aem.live` is left to you (local changes only)

> **Note:** This plan is read-only (plan mode). Applying these changes requires **Execute mode**.
