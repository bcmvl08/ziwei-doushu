'use client';

import type { ZiweiChart } from '@/lib/ziwei/types';
import { STEMS } from '@/lib/ziwei/constants';
import { labelSiHua, labelStar } from '@/lib/ziwei/display-zh-tw';
import {
  buildSiHuaOverlay,
  getYearStemIndex,
  type TimeView,
} from '@/components/TimeNav';

interface InkTimeNavProps {
  chart: ZiweiChart;
  view: TimeView;
  liunianYear: number;
  onViewChange: (view: TimeView) => void;
  onYearChange: (year: number) => void;
}

export default function InkTimeNav({
  chart,
  view,
  liunianYear,
  onViewChange,
  onYearChange,
}: InkTimeNavProps) {
  const currentDx = chart.daXians[chart.currentDaXianIndex];

  return (
    <>
      <div className="seg" role="tablist" aria-label="時間軸">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'mingpan'}
          className={view === 'mingpan' ? 'active' : undefined}
          onClick={() => onViewChange('mingpan')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
        >
          本命
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'daxian'}
          className={view === 'daxian' ? 'active' : undefined}
          onClick={() => onViewChange('daxian')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
        >
          {currentDx ? `大限 ${currentDx.startAge}–${currentDx.endAge}` : '大限'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'liunian'}
          className={view === 'liunian' ? 'active' : undefined}
          onClick={() => onViewChange('liunian')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
        >
          流年
        </button>
      </div>
      {view === 'liunian' && (
        <div className="toolbar" style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="back"
            onClick={() => onYearChange(liunianYear - 1)}
            aria-label="上一年"
          >
            ◀
          </button>
          <span style={{ fontSize: 13, letterSpacing: '0.12em', color: 'var(--ink-soft)' }}>
            {liunianYear} 年 · {STEMS[getYearStemIndex(liunianYear)]}干
          </span>
          <button
            type="button"
            className="back"
            onClick={() => onYearChange(liunianYear + 1)}
            aria-label="下一年"
          >
            ▶
          </button>
        </div>
      )}
      {view !== 'mingpan' && (
        <div className="empty" style={{ marginTop: 0 }}>
          {view === 'daxian' && currentDx
            ? `大限四化依 ${STEMS[chart.palaces.find(p => p.branch === currentDx.palaceBranch)?.stem ?? 0]} 干`
            : view === 'liunian'
              ? `流年四化：${Object.entries(buildSiHuaOverlay(getYearStemIndex(liunianYear)))
                .map(([star, sh]) => `${labelStar(star)}${labelSiHua(sh)}`)
                .join(' · ') || '—'}`
              : null}
        </div>
      )}
    </>
  );
}
