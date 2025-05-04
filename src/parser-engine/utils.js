export function normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim().toLowerCase();
  }
  
  export function extractNumbers(text) {
    return text.match(/\d+/g)?.map(Number) || [];
  }
  