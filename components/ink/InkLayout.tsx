'use client';

import type { ReactNode } from 'react';
import InkArtBleed from './InkArtBleed';
import InkFooter from './InkFooter';

interface InkLayoutProps {
  title: string;
  /** Chart view uses wider desktop topbar per hi-fi mock */
  chrome?: 'header' | 'topbar';
  demoBadge?: boolean;
  statusLine?: string;
  children: ReactNode;
  topBarExtra?: ReactNode;
  headerNote?: ReactNode;
}

export default function InkLayout({
  title,
  chrome = 'header',
  demoBadge = true,
  statusLine = 'Layout A · 水墨印璽 · 無登入／無分享／無付費',
  children,
  topBarExtra,
  headerNote,
}: InkLayoutProps) {
  const headerClass = chrome === 'topbar' ? 'topbar' : 'header';
  return (
    <div className="ink-app ink-app--viewport">
      <InkArtBleed />
      <div className="ink-inner-frame">
        <div className="status">{statusLine}</div>
        <header className={headerClass}>
          <h1>{title}</h1>
          <div className="ink-header-actions">
            {headerNote}
            {topBarExtra}
            {demoBadge ? <span className="badge-demo">示範</span> : null}
          </div>
        </header>
        {children}
        <InkFooter />
      </div>
    </div>
  );
}
