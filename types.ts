export type PseudoKeyword =
  | 'FUNCTION'
  | 'IF'
  | 'THEN'
  | 'ELSE'
  | 'LOOP'
  | 'RETURN'
  | 'COMMENT';

export interface PseudoBlock {
  type: PseudoKeyword;
  content: string;
  children?: PseudoBlock[];
}

export interface PseudoFile {
  metadata: Record<string, string>;
  blocks: PseudoBlock[];
}
