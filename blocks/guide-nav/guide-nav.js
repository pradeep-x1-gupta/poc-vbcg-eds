/**
 * Guide nav block — the in-page anchor navigation shown on care guide pages.
 * Renders the authored list of links as a sticky vertical jump-link menu.
 * The first link ("Back to Care Guide Index") is treated as a lead link.
 *
 * Scroll handling: CSS `scroll-behavior: smooth` animates over the full page
 * height, and on a live page lazy images/fonts finalize their sizes DURING that
 * long animation — the target card moves mid-flight and the scroll lands on the
 * wrong section. So JS owns the jump instead: scroll to the target's offset,
 * then re-measure and correct once scrolling has settled (immune to any layout
 * shift, whatever its cause). Same logic resolves a hash present on page load.
 */

// keep in sync with .care-guide scroll-margin-top (var(--nav-height) + 20)
function headerOffset() {
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
    10,
  ) || 64;
  return navHeight + 20;
}

/**
 * Scroll the target element to just below the sticky header, correcting for
 * layout shifts that happen while scrolling. Re-checks a few times and nudges
 * to the right position until it stops moving.
 * @param {Element} target element to scroll into view
 */
function scrollToTarget(target) {
  if (!target) return;

  const settle = (attempt) => {
    const current = target.getBoundingClientRect().top;
    const delta = current - headerOffset();
    // Close enough — nothing more to correct.
    if (Math.abs(delta) < 2 || attempt > 12) return;
    window.scrollBy({ top: delta, left: 0, behavior: attempt === 0 ? 'smooth' : 'auto' });
    // Re-check after the (smooth) scroll has had time to run and any lazy
    // content above the target has settled.
    setTimeout(() => settle(attempt + 1), attempt === 0 ? 420 : 90);
  };

  settle(0);
}

export default function decorate(block) {
  // Opt the containing section into the two-column guide layout (sticky nav +
  // stacked cards). Done here rather than via section-metadata because the
  // vendored aem.js does not process the Section Metadata block.
  const section = block.closest('.section');
  if (section) section.classList.add('guide-layout');

  const links = [...block.querySelectorAll('a')];

  const nav = document.createElement('nav');
  nav.className = 'guide-nav-list';
  nav.setAttribute('aria-label', 'Care guide sections');

  links.forEach((a, i) => {
    a.classList.remove('button');
    const container = a.closest('.button-container');
    if (container) container.className = '';
    if (i === 0) a.classList.add('guide-nav-lead');

    // Intercept in-page jump links so JS controls the scroll (see file header).
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') && href.length > 1) {
      a.addEventListener('click', (e) => {
        const id = decodeURIComponent(href.slice(1));
        const target = document.getElementById(id);
        if (!target) return; // let the browser handle unknown anchors
        e.preventDefault();
        // Update the URL hash without triggering the browser's own jump.
        window.history.pushState(null, '', href);
        scrollToTarget(target);
      });
    }

    nav.append(a);
  });

  block.textContent = '';
  block.append(nav);

  // Resolve a hash present on initial load — the block decorates after the
  // browser's first (failed, id not yet set) jump attempt, so redo it here.
  if (window.location.hash.length > 1) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(id);
    if (target) {
      // wait a tick so sibling care-guide blocks have set their ids/sizes
      setTimeout(() => scrollToTarget(target), 100);
    }
  }
}
