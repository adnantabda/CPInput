import { cleanDOM } from "./utils.js";
import { cleanLines } from "./utils.js";
import parseStatementsToCode from "./inputParser.js";

/**
 * Generate Python input code from natural language input description
 * @param {string[]} lines - Cleaned lines from the problem statement
 * @returns {string} Python input boilerplate
 */


export function tokenizeProblemStatement(rawInput) {
  // cleanDOM(rawInput)
  const paragraphs = [...rawInput.querySelectorAll('p')]; 
  const rawLines = paragraphs.map(p => p.textContent.trim()).filter(Boolean);
  const cleanedLines = cleanLines(rawLines);
  console.log(cleanedLines)
  return parseStatementsToCode(cleanedLines)
}