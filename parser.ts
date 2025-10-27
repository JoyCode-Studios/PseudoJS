import { PseudoFile, PseudoBlock } from './types';

/**
 * Parses a PseudoJS (.jps) file into structured metadata and code blocks.
 * @param content Raw string content of the .jps file
 * @returns Parsed PseudoFile object
 */
export function parsePseudoJS(content: string): PseudoFile {
  const lines = content.split('\n');
  const metadata: Record<string, string> = {};
  const blocks: PseudoBlock[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') continue;

    // Parse metadata lines (e.g. @title: Login Flow)
    if (trimmed.startsWith('@')) {
      const [key, ...rest] = trimmed.slice(1).split(':');
      metadata[key.trim()] = rest.join(':').trim();
      continue;
    }

    // Parse comment lines
    if (trimmed.startsWith('COMMENT:')) {
      blocks.push({
        type: 'COMMENT',
        content: trimmed.slice('COMMENT:'.length).trim()
      });
      continue;
    }

    // Parse logic blocks
    const keyword = ['FUNCTION', 'IF', 'THEN', 'ELSE', 'LOOP', 'RETURN'].find(k =>
      trimmed.startsWith(k)
    );

    if (keyword) {
      blocks.push({
        type: keyword as PseudoBlock['type'],
        content: trimmed.slice(keyword.length).trim()
      });
      continue;
    }

    // Unknown line type — optionally handle or ignore
    blocks.push({
      type: 'COMMENT',
      content: `Unrecognized line: ${trimmed}`
    });
  }

  return { metadata, blocks };
}
