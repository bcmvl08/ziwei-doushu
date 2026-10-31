'use client';

import type { Palace } from '@/lib/ziwei/types';
import { BRANCHES, STEMS } from '@/lib/ziwei/constants';
import { labelPalace, labelSiHua, labelStar } from '@/lib/ziwei/display-zh-tw';
import { palaceStarsForDetail } from './InkChartGrid';

interface InkPalaceDetailProps {
  palace: Palace | null;
  onClose: () => void;
  /** Mobile bottom sheet vs desktop side panel (CSS handles layout) */
  mode: 'sheet' | 'panel';
}

export default function InkPalaceDetail({ palace, onClose, mode }: InkPalaceDetailProps) {
  if (!palace) return null;

  const ganzhi = `${STEMS[palace.stem]}${BRANCHES[palace.branch]}`;
  const stars = palaceStarsForDetail(palace);

  const head = (
    <div className={mode === 'sheet' ? 'sheet-head' : 'panel-head'}>
      <div>
        <h2>{labelPalace(palace.name)}</h2>
        <div className="palace-meta">
          {ganzhi}
          {palace.isMingGong ? ' · 命宮' : ''}
          {palace.isShenGong ? ' · 身宮' : ''}
        </div>
      </div>
      <button type="button" className="back" onClick={onClose}>
        收起
      </button>
    </div>
  );

  const body = (
    <div className={mode === 'sheet' ? 'sheet-body' : 'panel-body'}>
      <div className="section-label">星曜</div>
      {stars.length === 0 ? (
        <div className="sheet-note">空宮 · 借對宮星曜論（引擎資料）</div>
      ) : (
        stars.map(({ star, kind }) => (
          <div key={star.name} className="star-row">
            <strong>{labelStar(star.name)}</strong>
            <span className="kind">{kind}</span>
            {star.brightness && (
              <span className="sub">
                廟旺：
                {star.brightness === 'bright' ? '廟旺' : star.brightness === 'dim' ? '落陷' : '平'}
              </span>
            )}
            {star.siHua && (
              <div className="tags">
                <span className="tag sihua">本命{labelSiHua(star.siHua)}</span>
              </div>
            )}
          </div>
        ))
      )}
      <div className="sheet-note">開源排盤 · 無 AI 斷語 · 僅列星曜與四化</div>
    </div>
  );

  if (mode === 'panel') {
    return (
      <aside className="panel" aria-label="宮位詳情">
        {head}
        {body}
        <div className="footer-mini">資料來自 iztro / lunar-javascript 排盤路徑</div>
      </aside>
    );
  }

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="sheet" role="dialog" aria-label="宮位詳情">
        <div className="handle" aria-hidden="true" />
        {head}
        {body}
        <div className="footer-mini">資料來自 iztro / lunar-javascript 排盤路徑</div>
      </div>
    </>
  );
}
