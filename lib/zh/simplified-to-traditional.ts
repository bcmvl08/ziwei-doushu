/**
 * Simplified → Traditional for user-visible labels (places, stars, UI copy).
 * Engine / join keys stay zh-CN; call only at render time.
 */
import { TW_TO_CN_ENTRIES } from './traditional-to-simplified';

const CN_TO_TW: Record<string, string> = {};
for (const [tw, cn] of TW_TO_CN_ENTRIES) {
  if (!(cn in CN_TO_TW)) {
    CN_TO_TW[cn] = tw;
  }
}

/** Convert Simplified Chinese text to Traditional for display. */
export function simplifiedToTraditional(input: string): string {
  if (!input) return input;
  let out = '';
  for (const ch of input) {
    out += CN_TO_TW[ch] ?? ch;
  }
  return out;
}
