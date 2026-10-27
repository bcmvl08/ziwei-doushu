/**
 * Display-layer Traditional Chinese labels for iztro / engine zh-CN tokens.
 *
 * Join keys, comparisons, and chart data stay in engine vocabulary (zh-CN).
 * Only call these helpers when rendering user-visible text.
 */

import type { SiHua } from './types';

/** 四化：engine key → zh-TW label */
export const SIHUA_LABEL: Record<SiHua, string> = {
  禄: '祿',
  权: '權',
  科: '科',
  忌: '忌',
};

/** 十四主星 + common auxiliaries the UI looks up by name */
const STAR_LABEL: Record<string, string> = {
  紫微: '紫微',
  天机: '天機',
  太阳: '太陽',
  武曲: '武曲',
  天同: '天同',
  廉贞: '廉貞',
  天府: '天府',
  太阴: '太陰',
  贪狼: '貪狼',
  巨门: '巨門',
  天相: '天相',
  天梁: '天梁',
  七杀: '七殺',
  破军: '破軍',
  左辅: '左輔',
  右弼: '右弼',
  文昌: '文昌',
  文曲: '文曲',
  天魁: '天魁',
  天钺: '天鉞',
  禄存: '祿存',
  天马: '天馬',
  火星: '火星',
  铃星: '鈴星',
  擎羊: '擎羊',
  陀罗: '陀羅',
  地空: '地空',
  地劫: '地劫',
  天刑: '天刑',
  天姚: '天姚',
  红鸾: '紅鸞',
  天喜: '天喜',
};

/**
 * iztro palace names (no trailing 宫 except 命宫 which keeps it).
 * Also accept forms with 宫 suffix from PALACE_NAMES_ORDER.
 */
const PALACE_LABEL: Record<string, string> = {
  命宫: '命宮',
  兄弟: '兄弟',
  兄弟宫: '兄弟宮',
  夫妻: '夫妻',
  夫妻宫: '夫妻宮',
  子女: '子女',
  子女宫: '子女宮',
  财帛: '財帛',
  财帛宫: '財帛宮',
  疾厄: '疾厄',
  疾厄宫: '疾厄宮',
  迁移: '遷移',
  迁移宫: '遷移宮',
  仆役: '交友',
  交友: '交友',
  交友宫: '交友宮',
  官禄: '官祿',
  官禄宫: '官祿宮',
  田宅: '田宅',
  田宅宫: '田宅宮',
  福德: '福德',
  福德宫: '福德宮',
  父母: '父母',
  父母宫: '父母宮',
};

export function labelSiHua(siHua: string | undefined | null): string {
  if (!siHua) return '';
  return SIHUA_LABEL[siHua as SiHua] ?? siHua;
}

export function labelStar(name: string): string {
  return STAR_LABEL[name] ?? name;
}

export function labelPalace(name: string): string {
  return PALACE_LABEL[name] ?? name;
}

/** Engine siHua keys in natal order */
export const SIHUA_KEYS: readonly SiHua[] = ['禄', '权', '科', '忌'];
