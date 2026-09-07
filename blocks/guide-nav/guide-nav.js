/**
 * Guide nav block — the in-page anchor navigation shown on care guide pages.
 * Renders the authored list of links as a sticky vertical jump-link menu.
 * The first link ("Back to Care Guide Index") is treated as a lead link.
 */
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
    nav.append(a);
  });

  block.textContent = '';
  block.append(nav);
}
