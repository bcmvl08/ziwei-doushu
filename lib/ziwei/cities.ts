export interface CityInfo {
  name: string;
  longitude: number; // degrees East
}

export interface ProvinceInfo {
  name: string;
  cities: CityInfo[];
}

// ★ 2026-10-07 用戶反饋「出生地點還不夠全」→ 補全全國區縣（直轄市以外 2724 個，掛在各地級市下）。
//   區縣不放進本表：本表經 BirthForm → LocationPicker 在 /chart、/heming 首屏靜態依賴圖上，
//   區縣表與拼音表在 lib/ziwei/counties.generated.ts、lib/i18n/county-pinyin.generated.ts，
//   打開地點選擇框時才動態加載（lib/ziwei/county-data.ts）。區縣選中後城市字段存成「地級市·區縣」，
//   見 lib/ziwei/county-label.ts。省直轄縣級單位（仙桃、海南各市縣、新疆兵團各市）仍是本表的市一級。
export const PROVINCES: ProvinceInfo[] = [
  // ─── 直轄市 ───────────────────────────────────────────
  {
    name: '北京市',
    cities: [
      // ★ 2026-08-23 用戶反饋「直轄市內部也有分區，希望加上更準一些」→ 補全 16 區。
      //   保留「北京」市級條目在首位：老用戶歷史命盤存的是它，刪掉會對不上。
      //   全市經度跨度 115.98–117.12（延慶↔平谷），約 1.14°，真太陽時最大差約 4.6 分鐘——
      //   出生時刻落在時辰交界 ±5 分鐘內時，選市中心與選邊緣區會得到不同時辰，整盤皆變。
      { name: '北京', longitude: 116.4 },
      { name: '東城', longitude: 116.42 },
      { name: '西城', longitude: 116.37 },
      { name: '朝陽', longitude: 116.49 },
      { name: '豐臺', longitude: 116.29 },
      { name: '石景山', longitude: 116.22 },
      { name: '海淀', longitude: 116.30 },
      { name: '門頭溝', longitude: 116.10 },
      { name: '房山', longitude: 116.14 },
      { name: '通州', longitude: 116.66 },
      { name: '順義', longitude: 116.65 },
      { name: '昌平', longitude: 116.24 },
      { name: '大興', longitude: 116.34 },
      { name: '懷柔', longitude: 116.64 },
      { name: '平谷', longitude: 117.12 },
      { name: '密雲', longitude: 116.84 },
      { name: '延慶', longitude: 115.98 },
    ],
  },
