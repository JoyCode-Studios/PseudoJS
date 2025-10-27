/**
 * Trims and normalizes a line of PseudoJS code.
 */
export function normalizeLine(line: string): string {
  return line.trim().replace(/\s+/g, ' ');
}

/**
 * Checks if a line is a metadata declaration (e.g. @title: Login Flow)
 */
export function isMetadataLine(line: string): boolean {
  return /^@\w+?:/.test(line.trim());
}

/**
 * Extracts the keyword from a logic line (e.g. FUNCTION login → FUNCTION)
 */
export function extractKeyword(line: string): string | null {
  const keywords = ['FUNCTION', 'IF', 'THEN', 'ELSE', 'LOOP', 'RETURN', 'COMMENT'];
  const trimmed = line.trim();
  return keywords.find(k => trimmed.startsWith(k)) || null;
}