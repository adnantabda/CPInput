import { tokenizeProblemStatement } from './tokenizer.js';
// import { parseInputVariables } from './inputParser.js';
// import { generateInputCode } from './codeGenerator.js';

/**
 * @param {string} html - Raw HTML from Codeforces
 * @param {string} language - Output language (default cpp)
 * @returns {string} - Boilerplate input code
 */
export function parseProblem(html, language = 'python') {
            console.log(tokenizeProblemStatement(html))
            return tokenizeProblemStatement(html)
    
//   const lines = tokenizeProblemStatement(html);
//   const variables = parseInputVariables(lines);
//   return generateInputCode(variables, language);
}
