/* eslint-disable */
/* global WebImporter */

/**
 * Cleanup transformer — removes global chrome and non-content elements so only
 * the page's main content is imported. Header, footer, and nav are provided by
 * the project's own fragments, not the page body.
 */
export default function transform(hookName, element, payload) {
  if (hookName !== 'beforeTransform') return;

  const { document } = payload;

  // Remove site chrome and non-content nodes.
  WebImporter.DOMUtils.remove(element, [
    'header',
    'footer',
    'script',
    'style',
    'noscript',
  ]);
}
