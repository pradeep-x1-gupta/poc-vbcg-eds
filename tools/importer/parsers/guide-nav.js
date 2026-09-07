/* eslint-disable */
/* global WebImporter */

/**
 * Guide nav parser — converts the source ".guide-jump-nav" anchor list into a
 * `Guide Nav` block: a single cell containing the jump links.
 */
export default function parse(element, { document }) {
  const links = [...element.querySelectorAll('a')];

  const container = document.createElement('div');
  links.forEach((a) => {
    const p = document.createElement('p');
    p.append(a);
    container.append(p);
  });

  const cells = [
    ['Guide Nav'],
    [container],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
