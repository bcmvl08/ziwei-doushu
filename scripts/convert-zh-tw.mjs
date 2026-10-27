/**
 * Convert Simplified Chinese UI copy → Traditional Chinese (Taiwan).
 * Skips algorithm/engine paths that must stay aligned with iztro zh-CN.
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

let changed = 0;
const files = [
  ...TARGET_DIRS.flatMap((d) => walk(path.join(ROOT, d))),
  ...EXTRA_FILES.map((f) => path.join(ROOT, f)).filter((f) => fs.existsSync(f)),
];

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after = convert(before);

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
