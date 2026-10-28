/**
 * Regression: engine tokens stay zh-CN; display maps cover them; search
 * accepts Traditional queries against the Simplified classics corpus.
 */
import assert from 'node:assert/strict';
import { generateChart } from '../../lib/ziwei/algorithm';
import {
  SIHUA_KEYS,
  labelPalace,
  labelSiHua,
  labelStar,
  SIHUA_LABEL,
} from '../../lib/ziwei/display-zh-tw';
import { searchClassics } from '../../lib/classics';
import { traditionalToSimplified } from '../../lib/zh/traditional-to-simplified';
import { buildSiHuaOverlay } from '../../components/TimeNav';

const chart = generateChart({
  year: 1990,
  month: 5,
  day: 15,
  hour: 2,
  gender: 'male',
});

// --- siHua keys ---
const siHuas = chart.palaces.flatMap((p) =>
  p.stars.filter((s) => s.siHua).map((s) => s.siHua as string),
);
assert.ok(siHuas.length >= 4, 'expected natal siHua entries');
for (const sh of siHuas) {
  assert.ok((SIHUA_KEYS as readonly string[]).includes(sh), `unexpected siHua key: ${sh}`);
  assert.equal(labelSiHua(sh), SIHUA_LABEL[sh as keyof typeof SIHUA_LABEL]);
}
assert.deepEqual([...SIHUA_KEYS], ['禄', '权', '科', '忌']);

// --- palace names ---
const palaceNames = chart.palaces.map((p) => p.name);
assert.ok(palaceNames.includes('命宫'), 'engine palace must be 命宫 (zh-CN)');
assert.ok(!palaceNames.includes('命宮'), 'engine must not emit TW 命宮');
for (const name of palaceNames) {
  const labeled = labelPalace(name);
  assert.ok(labeled.length > 0, `labelPalace empty for ${name}`);
  // TW display for 命宫 / 财帛 / 迁移 / 官禄 / 仆役
  if (name === '命宫') assert.equal(labeled, '命宮');
  if (name === '财帛') assert.equal(labeled, '財帛');
  if (name === '迁移') assert.equal(labeled, '遷移');
  if (name === '官禄') assert.equal(labeled, '官祿');
  if (name === '仆役') assert.equal(labeled, '交友');
}

// --- major star names ---
const majors = chart.palaces.flatMap((p) =>
  p.stars.filter((s) => s.type === 'major').map((s) => s.name),
);
assert.ok(majors.includes('天机') || majors.includes('七杀') || majors.length > 0);
for (const name of majors) {
  const labeled = labelStar(name);
  assert.ok(labeled.length > 0);
  if (name === '天机') assert.equal(labeled, '天機');
  if (name === '七杀') assert.equal(labeled, '七殺');
  if (name === '廉贞') assert.equal(labeled, '廉貞');
  if (name === '破军') assert.equal(labeled, '破軍');
  if (name === '太阳') assert.equal(labeled, '太陽');
  if (name === '太阴') assert.equal(labeled, '太陰');
  if (name === '贪狼') assert.equal(labeled, '貪狼');
  if (name === '巨门') assert.equal(labeled, '巨門');
}

// --- overlay uses engine keys (must match PalaceCell SIHUA_STYLES) ---
const overlay = buildSiHuaOverlay(0); // 甲
const overlayValues = Object.values(overlay);
assert.deepEqual(overlayValues.sort(), ['忌', '权', '科', '禄'].sort());

// --- TW → CN search ---
assert.equal(traditionalToSimplified('七殺朝鬥'), '七杀朝斗');
assert.equal(traditionalToSimplified('命宮'), '命宫');
assert.equal(traditionalToSimplified('雙祿朝垣'), '双禄朝垣');

const twHits = searchClassics('七殺朝鬥', 10);
const cnHits = searchClassics('七杀朝斗', 10);
assert.ok(twHits.length > 0, 'TW query 七殺朝鬥 must hit zh-CN corpus');
assert.ok(cnHits.length > 0, 'CN query 七杀朝斗 must hit');
assert.equal(twHits.length, cnHits.length);

const mingHits = searchClassics('命宮', 5);
assert.ok(mingHits.length > 0, 'TW 命宮 must find 命宫 in corpus');

// Auxiliary blurbs in StarDetailPanel must key on engine names (zh-CN)
assert.equal(labelStar('左辅'), '左輔');
assert.equal(labelStar('铃星'), '鈴星');
assert.equal(labelStar('陀罗'), '陀羅');

console.log('display-zh-tw-keys.test.ts OK', {
  siHuas,
  palaceCount: palaceNames.length,
  majorCount: majors.length,
  twHits: twHits.length,
});
