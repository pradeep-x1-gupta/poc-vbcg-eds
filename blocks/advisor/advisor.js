/**
 * Advisor search block — static (non-functional) reproduction of the
 * "Search with our Value-based Care Advisor" widget.
 * Content model: one cell containing the heading text; an optional second row
 * with placeholder text for the input.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const headingText = rows[0]?.textContent.trim() || 'Search with our Value-based Care Advisor';
  const placeholder = rows[1]?.textContent.trim() || 'Ask a question';

  block.textContent = '';

  const heading = document.createElement('div');
  heading.className = 'advisor-heading';
  heading.innerHTML = `<span class="advisor-sparkle" aria-hidden="true"></span>
    <span class="advisor-title">${headingText}</span>
    <span class="advisor-info" aria-hidden="true">i</span>`;

  const form = document.createElement('div');
  form.className = 'advisor-form';
  form.innerHTML = `<input class="advisor-input" type="text" placeholder="${placeholder}" aria-label="${placeholder}">
    <button class="advisor-submit" type="button" aria-label="Submit question">
      <span aria-hidden="true">&#10148;</span>
    </button>`;

  block.append(heading, form);
}
