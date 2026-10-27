/**
 * Convert Simplified Chinese UI copy → Traditional Chinese (Taiwan).
 * Skips algorithm/engine paths that must stay aligned with iztro zh-CN.
 *
 * Requires: npm i -D opencc-js   (dev-only; not a runtime dependency)
 *
 * Idempotence: protect tokens that OpenCC would re-mangle on a second pass
 * (丑 earthly branch, 斗數 compound, known pattern names). Prefer running
 * against upstream zh-CN sources rather than re-converting already-TW trees.
 */
import fs from 'node:fs';
import path from 'node:path';
import { Converter } from 'opencc-js';

const convert = Converter({ from: 'cn', to: 'tw' });

const ROOT = path.resolve(import.meta.dirname, '..');

/** Only convert user-facing surfaces; keep engine/docs untouched. */
const TARGET_DIRS = ['app', 'components'];
const EXTRA_FILES = [
  'README.md',
  '.env.example',
];
const SKIP_NAME = new Set(['globals.css', 'robots.ts', 'sitemap.ts']);

/**
 * Phrases that must survive conversion unchanged (placeholders ↔ restore).
 * Order matters: longer phrases first.
 */
const PROTECT = [
  '紫微斗數',
  '紫微斗数',
  '斗數',
  '斗数',
  '七杀朝斗',
  '七殺朝斗',
  '七杀朝鬥',
  '雙禄朝垣',
  '双禄朝垣',
  '双祿朝垣',
  '雙祿朝垣',
];

/** Final forced forms after OpenCC (TW display orthography we want). */
const FORCE_AFTER = [
  // Keep earthly-branch 丑 (OpenCC s2tw maps 丑→醜). Only restore standalone
  // branch uses via the protect/restore of 丑 in branch tables is imperfect;
  // replace 醜 back only when it appears as the earthly branch glyph in
  // known hour/branch contexts — never a blanket file-wide replace that
  // would also break legitimate 醜 (ugly) if added later.
  [/醜時/g, '丑時'],
  [/醜时/g, '丑时'],
  [/'醜'/g, "'丑'"],
  [/"醜"/g, '"丑"'],
  [/（醜）/g, '（丑）'],
  [/\[醜\]/g, '[丑]'],
  [/地支.*醜/g, (m) => m.replace(/醜/g, '丑')],
  // Keep 斗數 / 斗数 orthography (not 鬥數) for the art name
  [/鬥數/g, '斗數'],
  [/鬥数/g, '斗数'],
  [/七殺朝鬥/g, '七殺朝斗'],
  [/七杀朝鬥/g, '七杀朝斗'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|md)$/.test(entry.name) && !SKIP_NAME.has(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function protect(text) {
  const slots = [];
  let i = 0;
  let out = text;
  for (const phrase of PROTECT) {
    if (!out.includes(phrase)) continue;
    const token = `\uE000${i++}\uE001`;
    slots.push({ token, phrase });
    out = out.split(phrase).join(token);
  }
  // Protect bare earthly-branch 丑 so OpenCC cannot turn it into 醜
  {
    const token = `\uE000${i++}\uE001`;
    slots.push({ token, phrase: '丑' });
    out = out.split('丑').join(token);
  }
  return { text: out, slots };
}

function restore(text, slots) {
  let out = text;
  // Restore in reverse so nested tokens stay stable
  for (let i = slots.length - 1; i >= 0; i--) {
    const { token, phrase } = slots[i];
    out = out.split(token).join(phrase);
  }
  return out;
}

let changed = 0;
const files = [
  ...TARGET_DIRS.flatMap((d) => walk(path.join(ROOT, d))),
  ...EXTRA_FILES.map((f) => path.join(ROOT, f)).filter((f) => fs.existsSync(f)),
];

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const { text: protectedText, slots } = protect(before);
  let after = convert(protectedText);
  after = restore(after, slots);

  for (const [re, rep] of FORCE_AFTER) {
    after = after.replace(re, rep);
  }

  // Force locale markers to zh-TW / zh_TW where we set them for the site shell.
  if (file.endsWith(`${path.sep}layout.tsx`)) {
    after = after
      .replace(/lang="zh-CN"/g, 'lang="zh-TW"')
      .replace(/locale:\s*'zh_CN'/g, "locale: 'zh_TW'")
      .replace(/locale:\s*"zh_CN"/g, 'locale: "zh_TW"');
  }

  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log('converted', path.relative(ROOT, file));
  }
}

console.log(`Done. Updated ${changed} files.`);
