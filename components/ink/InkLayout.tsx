'use client';

import type { ReactNode } from 'react';
import InkArtBleed from './InkArtBleed';
import InkFooter from './InkFooter';

interface InkLayoutProps {
  title: string;
  demoBadge?: boolean;
  statusLine?: string;
  children: ReactNode;
  topBarExtra?: ReactNode;
}

export default function InkLayout({
  title,
  demoBadge = true,
  statusLine = 'Layout A · 水墨印璽 · 無登入／無分享／無付費',
  children,
  topBarExtra,
}: InkLayoutProps) {
  return (
    <div className="ink-app ink-app--viewport">
      <InkArtBleed />
      <div className="ink-inner-frame">
        <div className="status">{statusLine}</div>
        <header className="header">
          <h1>{title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
