'use client';

import { useState } from 'react';
import Link from 'next/link';
import BirthForm from '@/components/BirthForm';
import InkLayout from '@/components/ink/InkLayout';
import InkTimeNav from '@/components/ink/InkTimeNav';
import InkChartGrid, { InkChartMeta, findPalace } from '@/components/ink/InkChartGrid';
import InkPalaceDetail from '@/components/ink/InkPalaceDetail';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from '@/components/TimeNav';

/**
 * 命盤頁 · Layout A 水墨印璽
 * 視覺對齊 ziwei-hifi-ink mock；排盤仍走 lib/ziwei generateChart。
 */
export default function ChartPage() {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [view, setView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState(() => new Date().getFullYear());

  const selectedPalace: Palace | null = chart ? findPalace(chart, selectedBranch) : null;

  const resetChart = () => {
    setChart(null);
    setSelectedBranch(null);
    setView('mingpan');
  };

  if (!chart) {
    return (
      <InkLayout title="紫微斗數 · 起盤">
        <main className="body birth-desktop">
          <div className="card form-col">
            <BirthForm variant="ink" onSubmit={(info: BirthInfo) => setChart(generateChart(info))} />
          </div>
          <aside className="side-col" aria-label="說明">
            <div className="side-title">個人 Operate 工具</div>
            <p>
              輸入陽曆生辰與地點，引擎即時排出本命十二宮。同一組合法輸入應得到一致結果；本頁為開源排盤 Demo，不含 AI 解讀。
            </p>
            <div className="flow-box">入參 → 十二宮 → 點宮詳情</div>
            <p style={{ marginTop: 16, fontSize: 12 }}>
              上游引擎 MIT ·{' '}
              <Link href="https://github.com/Renhuai123/ziwei-doushu" style={{ color: 'var(--cinnabar-deep)' }}>
                Renhuai123/ziwei-doushu
              </Link>
            </p>
          </aside>
        </main>
      </InkLayout>
    );
  }

  return (
    <InkLayout
      title="本命盤"
      topBarExtra={
        <button type="button" className="back" onClick={resetChart}>
          重起
        </button>
      }
    >
      <InkTimeNav
        chart={chart}
        view={view}
        liunianYear={liunianYear}
        onViewChange={setView}
        onYearChange={setLiunianYear}
      />

      <div className="chart-layout">
        <div className={`board-wrap${selectedBranch !== null ? ' main' : ''}`} style={{ padding: '0 14px 16px', flex: 1 }}>
          <main className="body" style={{ paddingTop: 8, paddingBottom: 8 }}>
            <div className="constraint inline">引擎 Demo · 無 AI 斷語</div>
            <InkChartMeta chart={chart} />
            <div className="empty">有盤 · 點宮看星曜列（無斷語文案）</div>
            <InkChartGrid
              chart={chart}
              view={view}
              liunianYear={liunianYear}
              selectedBranch={selectedBranch}
              onSelectBranch={setSelectedBranch}
            />
          </main>
        </div>

        <div className="ink-palace-desktop-only">
          {selectedPalace ? (
            <InkPalaceDetail
              palace={selectedPalace}
              onClose={() => setSelectedBranch(null)}
              mode="panel"
            />
          ) : (
            <aside className="panel" aria-label="宮位詳情">
              <div className="panel-head">
                <h2>宮位詳情</h2>
              </div>
              <div className="panel-body">
                <div className="sheet-note">點選十二宮之一以查看星曜列</div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <div className="ink-palace-mobile-only">
        {selectedPalace && (
          <InkPalaceDetail
            palace={selectedPalace}
            onClose={() => setSelectedBranch(null)}
            mode="sheet"
          />
        )}
      </div>
    </InkLayout>
  );
}
