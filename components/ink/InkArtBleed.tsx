'use client';

import { useId } from 'react';

/** Full-bleed ink wash background (滿壁水墨). Matches hi-fi mock SVG. */
export default function InkArtBleed() {
  const uid = useId().replace(/:/g, '');
  const sky = `ibmsky-${uid}`;
  const w1 = `ibmw1-${uid}`;
  const w2 = `ibmw2-${uid}`;
  const w3 = `ibmw3-${uid}`;
  const w4 = `ibmw4-${uid}`;
  const w5 = `ibmw5-${uid}`;
  const grain = `ibmgrain-${uid}`;

  return (
    <div className="art-bleed" aria-hidden="true">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4dcc8" />
            <stop offset="28%" stopColor="#efe8d8" />
            <stop offset="60%" stopColor="#ddd4c4" />
            <stop offset="100%" stopColor="#c8bcaa" />
          </linearGradient>
          <radialGradient id={w1} cx="12%" cy="16%" r="48%">
            <stop offset="0%" stopColor="rgba(18,16,14,0.34)" />
            <stop offset="100%" stopColor="rgba(18,16,14,0)" />
          </radialGradient>
          <radialGradient id={w2} cx="88%" cy="12%" r="44%">
            <stop offset="0%" stopColor="rgba(35,48,68,0.28)" />
            <stop offset="100%" stopColor="rgba(35,48,68,0)" />
          </radialGradient>
          <radialGradient id={w3} cx="48%" cy="38%" r="42%">
            <stop offset="0%" stopColor="rgba(18,16,14,0.16)" />
            <stop offset="100%" stopColor="rgba(18,16,14,0)" />
          </radialGradient>
          <radialGradient id={w4} cx="70%" cy="55%" r="36%">
            <stop offset="0%" stopColor="rgba(18,16,14,0.14)" />
            <stop offset="100%" stopColor="rgba(18,16,14,0)" />
          </radialGradient>
          <radialGradient id={w5} cx="22%" cy="62%" r="32%">
            <stop offset="0%" stopColor="rgba(30,45,60,0.12)" />
            <stop offset="100%" stopColor="rgba(30,45,60,0)" />
          </radialGradient>
          <filter id={grain} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves={4} stitchTiles="stitch" result="n" />
            <feColorMatrix type="saturate" values="0" in="n" result="g" />
            <feComponentTransfer in="g" result="a">
              <feFuncA type="linear" slope="0.42" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="a" mode="multiply" />
          </filter>
        </defs>
        <rect width="390" height="844" fill={`url(#${sky})`} />
        <ellipse cx="45" cy="110" rx="155" ry="170" fill={`url(#${w1})`} />
        <ellipse cx="350" cy="90" rx="140" ry="145" fill={`url(#${w2})`} />
        <ellipse cx="195" cy="290" rx="175" ry="120" fill={`url(#${w3})`} />
        <ellipse cx="280" cy="420" rx="130" ry="110" fill={`url(#${w4})`} />
        <ellipse cx="70" cy="480" rx="120" ry="100" fill={`url(#${w5})`} />
        <path d="M0 240 C31 200 54 150 85 168 C124 190 156 120 202 140 C249 160 288 210 343 190 C366 180 378 220 390 235 L390 844 L0 844 Z" fill="rgba(18,16,14,0.08)" />
        <path d="M0 300 C39 250 70 180 109 200 C156 220 187 150 234 175 C280 205 319 255 390 275 L390 844 L0 844 Z" fill="rgba(18,16,14,0.13)" />
        <path d="M0 360 C46 300 85 240 136 260 C187 280 214 210 265 245 C312 280 351 330 390 350 L390 844 L0 844 Z" fill="rgba(18,16,14,0.20)" />
        <path d="M0 440 C58 375 109 310 163 330 C214 350 253 290 304 320 C343 345 366 390 390 420 L390 844 L0 844 Z" fill="rgba(18,16,14,0.28)" />
        <path d="M0 530 C70 470 136 430 195 450 C253 470 312 510 390 545 L390 844 L0 844 Z" fill="rgba(18,16,14,0.38)" />
        <path d="M0 610 C97 575 175 555 253 575 C312 588 351 620 390 640 L390 844 L0 844 Z" fill="rgba(18,16,14,0.48)" />
        <path d="M0 700 C80 675 170 660 250 680 C310 695 355 720 390 735 L390 844 L0 844 Z" fill="rgba(18,16,14,0.58)" />
        <ellipse cx="40" cy="70" rx="48" ry="42" fill="rgba(18,16,14,0.28)" transform="rotate(-18 40 70)" />
        <ellipse cx="72" cy="55" rx="22" ry="20" fill="rgba(18,16,14,0.18)" />
        <circle cx="350" cy="48" r="22" fill="rgba(18,16,14,0.22)" />
        <circle cx="368" cy="78" r="11" fill="rgba(18,16,14,0.16)" />
        <ellipse cx="175" cy="50" rx="55" ry="24" fill="rgba(18,16,14,0.14)" transform="rotate(-5 175 50)" />
        <ellipse cx="280" cy="210" rx="40" ry="32" fill="rgba(18,16,14,0.14)" transform="rotate(8 280 210)" />
        <ellipse cx="95" cy="250" rx="38" ry="28" fill="rgba(18,16,14,0.12)" transform="rotate(-12 95 250)" />
        <ellipse cx="210" cy="180" rx="50" ry="22" fill="rgba(18,16,14,0.10)" />
        <circle cx="320" cy="300" r="18" fill="rgba(18,16,14,0.12)" />
        <ellipse cx="50" cy="340" rx="30" ry="24" fill="rgba(18,16,14,0.11)" />
        <ellipse cx="340" cy="400" rx="36" ry="26" fill="rgba(18,16,14,0.13)" />
        <ellipse cx="160" cy="380" rx="42" ry="20" fill="rgba(18,16,14,0.09)" />
        <circle cx="240" cy="120" r="10" fill="rgba(18,16,14,0.15)" />
        <ellipse cx="30" cy="200" rx="28" ry="36" fill="rgba(18,16,14,0.16)" />
        <ellipse cx="370" cy="240" rx="24" ry="30" fill="rgba(18,16,14,0.14)" />
        <path d="M70 160 C140 120 210 200 290 145" fill="none" stroke="rgba(18,16,14,0.30)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M90 195 C155 165 220 225 270 185" fill="none" stroke="rgba(181,58,46,0.32)" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M40 280 C110 250 180 310 250 270" fill="none" stroke="rgba(18,16,14,0.18)" strokeWidth="1.0" strokeLinecap="round" />
        <circle cx="310" cy="380" r="4" fill="rgba(181,58,46,0.28)" />
        <circle cx="55" cy="420" r="3" fill="rgba(181,58,46,0.20)" />
        <rect width="390" height="844" filter={`url(#${grain})`} opacity="0.52" style={{ mixBlendMode: 'multiply' }} />
      </svg>
    </div>
  );
}
