export function tokenizeProblemStatement(html) {
  const paragraphs = [...html.querySelectorAll('p')];
  const lines = paragraphs.map(p => p.textContent.trim()).filter(Boolean);

  return lines

}
  