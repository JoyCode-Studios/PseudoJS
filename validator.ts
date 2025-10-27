import { PseudoFile, PseudoBlock } from './types';

/**
 * Validates a parsed PseudoJS file for required metadata and block integrity.
 * @param file Parsed PseudoFile object
 * @returns Array of validation error messages
 */
export function validatePseudoJS(file: PseudoFile): string[] {
  const errors: string[] = [];

  // Check required metadata
  if (!file.metadata.title || file.metadata.title.trim() === '') {
    errors.push('Missing or empty @title metadata.');
  }

  // Optional: enforce @version format
  if (file.metadata.version && !/^\d+\.\d+/.test(file.metadata.version)) {
    errors.push('Invalid @version format. Use major.minor (e.g. 1.0).');
  }

  // Check for presence of blocks
  if (file.blocks.length === 0) {
    errors.push('No code blocks found.');
  }

  // Validate each block
  file.blocks.forEach((block, index) => {
    if (!block.content || block.content.trim() === '') {
      errors.push(`Block #${index + 1} (${block.type}) has empty content.`);
    }

    if (!isValidKeyword(block.type)) {
      errors.push(`Block #${index + 1} has unknown type: ${block.type}`);
    }
  });

  return errors;
}

/**
 * Checks if a block type is a valid PseudoJS keyword.
 */
function isValidKeyword(type: string): boolean {
  return ['FUNCTION', 'IF', 'THEN', 'ELSE', 'LOOP', 'RETURN', 'COMMENT'].includes(type);
}
