'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from './TimeNav';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  hidden?: boolean;
}

interface SelectedSiHua {
  starName: string;
  siHua: string;
  view: TimeView;
}

interface InsightPanelProps {
  chart: ZiweiChart;
  selectedPalace?: Palace | null;
  selectedSiHua?: SelectedSiHua | null;
}

const TOPICS = [
  { key: 'overview',     label: '命格' },
  { key: 'love',        label: '感情' },
  { key: 'career',      label: '事業' },
  { key: 'wealth',      label: '財運' },
  { key: 'health',      label: '健康' },
  { key: 'personality', label: '性格' },
] as const;

export default function InsightPanel({ chart, selectedPalace, selectedSiHua }: InsightPanelProps) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden card-glass p-4">
      <div className="text-[9px] tracking-widest mb-2" style={{ color: 'var(--t-faint)' }}>命理解讀</div>
      <p className="text-[11px]" style={{ color: 'var(--t-text2)' }}>
        開源版解讀面板（完整版正從本機同步還原中）。排盤本身不需要 API Key。
      </p>
    </div>
  );
}
