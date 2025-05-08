/**
 * Removes MathJax spans and other formatting elements before extracting text
 * @param {HTMLElement} root
 */
export function cleanDOM(root) {
  // Remove MathJax-rendered spans/scripts
  root.querySelectorAll('.MathJax, script[type="math/tex"]').forEach(el => el.remove());

  // You could also remove <sup>, <sub>, etc. if they're noise
  root.querySelectorAll('sup, sub').forEach(el => el.remove());
}


/**
 * Cleans competitive programming text for input extraction
 * - Removes MathJax formulas
 * - Removes all text inside brackets ((), [], {})
 * - Removes non-breaking spaces, smart quotes, dashes, etc.
 * @param {string[]} lines
 * @returns {string[]} cleaned lines
 */
export function cleanLines(lines) {
  return lines.map(line => {
    return line
      // Remove MathJax (usually shown as LaTeX-style parentheses with math)
      .replace(/[\(\[\{][^)\]\}]{0,100}[\)\]\}]/g, '') // brackets with content
      .replace(/\\le|\\ge|\\lt|\\gt|\\times|\\cdot/g, '') // leftover latex operators
      .replace(/≤|≥|≠|≈|∈|∉|⋅|→|←|↔/g, '') // special unicode math symbols
      .replace(/–|—/g, '-') // dashes to hyphen
      .replace(/\u00A0/g, ' ') // non-breaking space
      .replace(/[“”]/g, '"') // smart quotes
      .replace(/[‘’]/g, "'") // smart apostrophes
      .replace(/\.{2,}/g, '.') // ellipsis to single period
      .replace(/\s+/g, ' ') // collapse spaces
      .trim();
  }).filter(Boolean);
}

export function normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim().toLowerCase();
  }
  
  export function extractNumbers(text) {
    return text.match(/\d+/g)?.map(Number) || [];
  }
  