import { tokenizeProblemStatement } from './tokenizer.js';

/**
 * @param {string} html - Raw HTML from Codeforces
 * @param {string} language - Output language (default cpp)
 * @returns {string} - Boilerplate input code
 */
export function parseProblem(html, language = 'python') {
        return tokenizeProblemStatement(html)
}
