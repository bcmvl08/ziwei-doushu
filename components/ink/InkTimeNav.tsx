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
      <div className="seg ink-seg" role="tablist" aria-label="時間軸">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'mingpan'}
          className={view === 'mingpan' ? 'active' : undefined}
          onClick={() => onViewChange('mingpan')}
        >
          本命
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'daxian'}
          className={view === 'daxian' ? 'active' : undefined}
          onClick={() => onViewChange('daxian')}
        >
          {currentDx ? `大限 ${currentDx.startAge}–${currentDx.endAge}` : '大限'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'liunian'}
          className={view === 'liunian' ? 'active' : undefined}
          onClick={() => onViewChange('liunian')}
        >
          流年
        </button>
      </div>
      {view === 'liunian' && (
        <div className="toolbar ink-liunian-toolbar">
          <button
            type="button"
            className="back"
            onClick={() => onYearChange(liunianYear - 1)}
            aria-label="上一年"
          >
            ◀
          </button>
          <span className="ink-liunian-label">
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
        <div className="empty empty-overlay-hint">
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
