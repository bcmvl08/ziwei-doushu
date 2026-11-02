'use client';

import clsx from 'clsx';
import type { Palace, Star, ZiweiChart } from '@/lib/ziwei/types';
import { BRANCHES, STEMS } from '@/lib/ziwei/constants';
import { labelPalace, labelSiHua, labelStar } from '@/lib/ziwei/display-zh-tw';
import type { TimeView } from '@/components/TimeNav';
import { buildSiHuaOverlay, getYearStemIndex } from '@/components/TimeNav';

function palacesClockwiseFromMing(chart: ZiweiChart): Palace[] {
  const byBranch = new Map(chart.palaces.map(p => [p.branch, p]));
  const start = chart.mingGongBranch;
  return Array.from({ length: 12 }, (_, i) => byBranch.get((start + i) % 12)!);
}

interface InkChartGridProps {
  chart: ZiweiChart;
  view: TimeView;
  liunianYear: number;
  selectedBranch: number | null;
  onSelectBranch: (branch: number | null) => void;
}

function starLine(palace: Palace): string {
  const major = palace.stars.filter(s => s.type === 'major');
  if (major.length === 0) return '空宮';
  return major.map(s => labelStar(s.name)).join(' · ');
}

export function InkChartMeta({ chart }: { chart: ZiweiChart }) {
  const { lunarInfo, birthInfo, wuxingJuName } = chart;
  const namePart = birthInfo.name ? `${birthInfo.name} · ` : '';
  return (
    <div className="chart-meta">
      <span>
        <strong>{namePart}本命盤</strong>
      </span>
      <span>
        農曆 {lunarInfo.lunarYear}
        {lunarInfo.isLeapMonth ? ' · 閏' : ' · '}
        {lunarInfo.lunarMonth} · {lunarInfo.lunarDay}
      </span>
      <span>{wuxingJuName}</span>
      <span>命宮 {BRANCHES[chart.mingGongBranch]} · 身宮 {BRANCHES[chart.shenGongBranch]}</span>
    </div>
  );
}

export default function InkChartGrid({
  chart,
  view,
  liunianYear,
  selectedBranch,
  onSelectBranch,
}: InkChartGridProps) {
  const palaces = palacesClockwiseFromMing(chart);
  const currentDx = chart.daXians[chart.currentDaXianIndex];
  const overlayData: Record<string, string> = (() => {
    if (view === 'daxian' && currentDx) {
      const dxPalace = chart.palaces.find(p => p.branch === currentDx.palaceBranch);
      if (dxPalace) return buildSiHuaOverlay(dxPalace.stem);
    }
    if (view === 'liunian') return buildSiHuaOverlay(getYearStemIndex(liunianYear));
    return {};
  })();

  return (
    <div
      className={clsx('board', 'cols4', selectedBranch !== null && 'dim')}
      style={{ marginTop: 6 }}
    >
      {palaces.map(palace => {
        const selected = selectedBranch === palace.branch;
        const ganzhi = `${STEMS[palace.stem]}${BRANCHES[palace.branch]}`;
        const natalSihua = palace.stars.filter(s => s.siHua).slice(0, 2);
        return (
          <button
            type="button"
            key={palace.branch}
            className={clsx('palace', selected && 'sel')}
            onClick={() => onSelectBranch(selected ? null : palace.branch)}
            aria-pressed={selected}
          >
            <div className="name">{labelPalace(palace.name)}</div>
            <div className="meta-line">
              {ganzhi}
              {palace.isMingGong ? ' · 命' : ''}
              {palace.isShenGong ? ' · 身' : ''}
              {palace.daXianAge ? ` · ${palace.daXianAge[0]}–${palace.daXianAge[1]}歲` : ''}
            </div>
            <div className="stars">{starLine(palace)}</div>
            {(natalSihua.length > 0 || Object.keys(overlayData).length > 0) && (
              <div className="tags palace-tags">
                {natalSihua.map(s => (
                  <span key={s.name} className="tag sihua">
                    {labelStar(s.name)}{labelSiHua(s.siHua!)}
                  </span>
                ))}
                {palace.stars
                  .filter(s => overlayData[s.name])
                  .slice(0, 3)
                  .map(s => (
                    <span key={`ov-${s.name}`} className="tag">
                      {view === 'daxian' ? '限' : '年'}
                      {labelStar(s.name)}{labelSiHua(overlayData[s.name])}
                    </span>
                  ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function findPalace(chart: ZiweiChart, branch: number | null): Palace | null {
  if (branch === null) return null;
  return chart.palaces.find(p => p.branch === branch) ?? null;
}

export function palaceStarsForDetail(palace: Palace): { star: Star; kind: string }[] {
  const rows: { star: Star; kind: string }[] = [];
  for (const s of palace.stars) {
    let kind = '輔星';
    if (s.type === 'major') kind = '主星';
    else if (s.type === 'lucky') kind = '吉星';
    else if (s.type === 'sha') kind = '煞星';
    rows.push({ star: s, kind });
  }
  return rows;
}
