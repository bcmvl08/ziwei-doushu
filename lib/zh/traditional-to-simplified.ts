/**
 * Lightweight Traditional → Simplified map for astrology / classics search.
 * Prefer this over runtime OpenCC so production stays free of opencc-js.
 *
 * Only characters that commonly differ in ziwei / classics corpus queries.
 * Characters identical in CN/TW (紫、微、天、同、…) are omitted.
 */

const TW_TO_CN: Record<string, string> = {
  // stars / sihua / palaces / patterns
  機: '机',
  陽: '阳',
  陰: '阴',
  貞: '贞',
  貪: '贪',
  門: '门',
  殺: '杀',
  軍: '军',
  祿: '禄',
  權: '权',
  財: '财',
  遷: '迁',
  宮: '宫',
  馬: '马',
  鉞: '钺',
  輔: '辅',
  鈴: '铃',
  羅: '罗',
  紅: '红',
  鸞: '鸾',
  鬥: '斗',
  雙: '双',
  華: '华',
  術: '术',
  數: '数',
  書: '书',
  論: '论',
  賦: '赋',
  訣: '诀',
  會: '会',
  與: '与',
  為: '为',
  無: '无',
  開: '开',
  關: '关',
  應: '应',
  當: '当',
  時: '时',
  歲: '岁',
  運: '运',
  貴: '贵',
  氣: '气',
  體: '体',
  對: '对',
  夾: '夹',
  醜: '丑', // OpenCC often maps 丑→醜; reverse for branch / search
  東: '东',
  區: '区',
  縣: '县',
  鄉: '乡',
  鎮: '镇',
  廣: '广',
  寧: '宁',
  達: '达',
  進: '进',
  過: '过',
  邊: '边',
  裡: '里',
  裏: '里',
  餘: '余',
  係: '系',
  眾: '众',
  點: '点',
  發: '发',
  變: '变',
  壞: '坏',
  優: '优',
  勢: '势',
  態: '态',
  憑: '凭',
  據: '据',
  擇: '择',
  損: '损',
  傷: '伤',
  壽: '寿',
  災: '灾',
  難: '难',
  險: '险',
  惡: '恶',
  兇: '凶',
  豐: '丰',
  顯: '显',
  榮: '荣',
  譽: '誉',
  護: '护',
  衛: '卫',
  範: '范',
  圍: '围',
  圖: '图',
  處: '处',
  備: '备',
  複: '复',
  復: '复',
  際: '际',
  學: '学',
  業: '业',
  職: '职',
  國: '国',
  則: '则',
  從: '从',
  來: '来',
  後: '后',
  個: '个',
  這: '这',
  還: '还',
  麼: '么',
  說: '说',
  語: '语',
  義: '义',
  見: '见',
  觀: '观',
  讀: '读',
  釋: '释',
  傳: '传',
  經: '经',
  緯: '纬',
  導: '导',
  畫: '画',
};

/** Convert Traditional Chinese query text to Simplified for corpus match. */
export function traditionalToSimplified(input: string): string {
  if (!input) return input;
  let out = '';
  for (const ch of input) {
    out += TW_TO_CN[ch] ?? ch;
  }
  return out;
}

/**
 * Queries to try against a zh-CN corpus: original + TW→CN (deduped).
 */
export function searchQueryVariants(query: string): string[] {
  const q = query.trim();
  if (!q) return [];
  const simplified = traditionalToSimplified(q);
  return simplified === q ? [q] : [q, simplified];
}
