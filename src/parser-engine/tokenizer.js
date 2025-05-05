function processLines(lines) {
  const processed = [];

  for (let line of lines) {
    // Clean up Unicode characters
    line = line
      .replace(/\u00A0/g, ' ') 
      .replace(/[“”]/g, '"') 
      .replace(/[‘’]/g, "'")
      .replace(/–/g, '-')
      .replace(/—/g, '-')
      .replace(/\s+/g, ' ')
      .trim();

    if (!line) continue;

    processed.push(line);
  }

  return processed;

}

export function tokenizeProblemStatement(rawInput) {
  const paragraphs = [...rawInput.querySelectorAll('p')]; // capture bullets too
  const lines = paragraphs.map(p => p.textContent.trim()).filter(Boolean);
  return processLines(lines);
}
