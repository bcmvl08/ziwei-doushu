---
name: 紫微斗數 · 水墨印璽
description: 印璽＋滿壁水墨書房 — seal restraint over full-bleed ink; UI on translucent rice paper
colors:
  paper: "#f3eee3"
  paper-deep: "#e8e0d0"
  ink: "#161410"
  ink-soft: "#2e2a24"
  ink-mute: "#5c564c"
  cinnabar: "#b53a2e"
  cinnabar-deep: "#9e2f24"
  cinnabar-soft: "rgba(181, 58, 46, 0.14)"
  seal: "#9e2f24"
  line: "#2a2620"
  wash: "rgba(40, 36, 30, 0.06)"
  frame-edge: "#2c2822"
  glass: "rgba(243, 238, 227, 0.54)"
  glass-soft: "rgba(243, 238, 227, 0.46)"
  glass-strong: "rgba(243, 238, 227, 0.64)"
  glass-text: "rgba(255, 252, 246, 0.55)"
  cta-text: "#f7f2ea"
typography:
  title:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.14em"
  title-desktop:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.16em"
  headline:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.2em"
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.04em"
  body-soft:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.1em"
  label-micro:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.08em"
  palace-name:
    fontFamily: "system-ui, -apple-system, Segoe UI, PingFang TC, Noto Sans TC, Microsoft JhengHei, Songti TC, serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  none: "0"
  handle: "2px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "20px"
  s-6: "24px"
  s-7: "32px"
components:
  button-primary:
    backgroundColor: "{colors.cinnabar}"
    textColor: "{colors.cta-text}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "46px"
  chip:
    backgroundColor: "rgba(255, 255, 255, 0.28)"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  chip-on:
    backgroundColor: "{colors.cinnabar-soft}"
    textColor: "{colors.cinnabar}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  card:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 14px 16px"
  input-box:
    backgroundColor: "rgba(255, 255, 255, 0.32)"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "40px"
  palace:
    backgroundColor: "{colors.glass-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "9px 9px 10px"
  palace-sel:
    backgroundColor: "rgba(181, 58, 46, 0.13)"
    textColor: "{colors.cinnabar-deep}"
    rounded: "{rounded.none}"
    padding: "9px 9px 10px"
---

# Design System: 紫微斗數 · 水墨印璽

## Overview

**Creative North Star: 「印璽＋滿壁水墨書房」 (north-seal-study)**

This is a personal Operate tool for casting and reading a Ziwei natal chart — not a SaaS landing page. The room is a study whose entire wall is ink wash; the UI is translucent rice paper laid over that art, never the other way around. Cinnabar appears only as a seal impression: sparse CTAs and selection marks. Everywhere else, ink and paper do the work.

Personality is restrained, dense where the chart needs density, and quiet at the chrome. Anti-references: no light Material card shadows as the primary depth language, no rounded consumer-app chrome, no login / share / pay affordances, no web-font CDN personality. Future polish may lift undersized 9–10px micro labels; that is backlog, not a redesign.

**Key Characteristics:**
- Full-bleed ink art (`.art-bleed`) owns the viewport; UI floats on 宣紙半透 glass
- 朱砂印泥 only for CTA and seal-like selection — rarity is the brand
- Depth by 叠紙 (stacked paper / glass opacity), not heavy drop shadows
- Sharp corners; system CJK/UI stack only; `prefers-reduced-motion: reduce` kills motion
- Operate mode: form → twelve palaces → sheet/panel detail; mobile-first frames at 390 / 1280

## Colors

Warm mineral paper and pine-soot ink, with a single seal-red accent used sparingly.

### Primary
- **朱砂印泥 / Cinnabar Seal** (`#b53a2e` / `--cinnabar`): sole accent. Primary CTA fill, selected chip border/text, active segment underline, selected palace border + seal square. Deep companion `--cinnabar-deep` (`#9e2f24`, also `--seal`) for CTA border and selected palace titles. Soft wash `--cinnabar-soft` (`rgba(181, 58, 46, 0.14)`) for chip-on and badge fills.

### Neutral
- **宣紙 / Paper** (`#f3eee3` / `--paper`): page wash ground and glass base RGB.
- **宣紙深 / Paper Deep** (`#e8e0d0` / `--paper-deep`): outer mat ring around device shells; footer tint base.
- **松煙墨 / Pine-Soot Ink** (`#161410` / `--ink`): primary text and palace names.
- **墨軟 / Ink Soft** (`#2e2a24` / `--ink-soft`): secondary body, chip idle text, star lines.
- **墨啞 / Ink Mute** (`#5c564c` / `--ink-mute`): labels, meta, footer, placeholders.
- **線 / Line** (`#2a2620` / `--line`): underline fields, sheet top edge, panel divider.
- **框緣 / Frame Edge** (`#2c2822` / `--frame-edge`): shell/frame outer stroke.
- **渲 / Wash** (`rgba(40, 36, 30, 0.06)` / `--wash`): subtle atmosphere.
- **宣紙半透 / Glass** (`rgba(243, 238, 227, 0.54)` / `--glass`): default cards and form column. Soft `0.46`, strong `0.64` (sheet/panel), text strip `rgba(255, 252, 246, 0.55)` behind dense rows.
- **印上紙白 / CTA Text** (`#f7f2ea`): text on cinnabar CTA only.

### Named Rules
**The Cinnabar Rarity Rule（朱砂稀用）.** 朱砂 appears only as sparse CTA fill and selection/seal marks. Never flood backgrounds, never decorate idle chrome, never tint the full-bleed art.

**The Full-Bleed Art Rule（滿壁水墨）.** `.art-bleed` is `position: absolute; inset: 0` under all chrome. Do not thin, crop to a hero strip, or replace with solid/ornament-only backgrounds.

## Typography

**Display / Body / Label Font:** one stack — `system-ui, -apple-system, "Segoe UI", "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", "Songti TC", serif` (`--font`).

**Character:** Quiet study typography — generous letter-spacing on titles and palace names, never display webfont drama. Traditional Chinese UI reads on system CJK faces; Latin UI falls back through system-ui.

### Hierarchy
- **Title** (600, 15px mobile / 17px desktop, lh 1.45, tracking 0.14–0.16em): header / topbar product title; uses `--shadow-text` for ink-on-art readability.
- **Headline** (700, 16px, tracking 0.2em): sheet / panel palace title.
- **Palace name** (700, 12px, tracking 0.18em): cell titles on the board.
- **Body** (400–500, 13–14px, lh 1.45–1.6): field values, side copy, star rows.
- **Label** (500, 11px, tracking 0.1em): field labels; segment 13px tracking 0.14em.
- **Label micro** (400, 9–10px): status, badges, footer, palace meta, tags — known undersize; polish backlog to lift toward ≥11px where contrast allows.

### Named Rules
**The System Font Rule（系統字體）.** No Google Fonts, no CDN type, no custom `@font-face` for brand. The `--font` stack is normative.

## Layout

Operate density: mobile frame **390×844** min, desktop shell **1280** wide (max `calc(100% - 32px)`), min-height ~800. Spacing scale `--s-1`…`--s-7` = 4 / 8 / 12 / 16 / 20 / 24 / 32px.

- Birth mobile: stacked translucent cards in `.body` (14px 16px).
- Birth desktop: `.content` flex gap 28px; form column 440px + side column.
- Chart: 2-col palace grid on mobile (gap 8px); 4-col on desktop (gap 10px, min-height 480px).
- Palace detail: mobile bottom sheet (~54% height) over scrim; desktop 340px right panel.
- Segment control under header; toolbar on desktop. Footer strip always present with attribution / personal-use copy.
- Z-order: art (0) → inner frame line (1) → chrome/body (2) → scrim (3) → sheet/panel (4).

## Elevation & Depth

**Philosophy: 叠紙 (layered paper).** Primary depth comes from stacking translucent rice-paper surfaces (`--glass` / `--glass-soft` / `--glass-strong` / `--glass-text`) over full-bleed ink — opacity and border, not Material elevation. Text on art uses `--shadow-text: 0 1px 0 rgba(255, 252, 246, 0.55)` as a hairline paper edge, not a drop shadow.

Incumbent **shell-only** shadows exist on `.frame` / `.shell` (paper-deep mat ring + soft ambient `0 12px 40px` / `0 16px 48px` at ~10–12% ink) and a light lift on `.sheet` / `.cta`. These are secondary presentation chrome for the mock device frame — **not** the in-product depth language. Do not spread card drop shadows into content surfaces.

### Shadow Vocabulary
- **Text edge** (`text-shadow: 0 1px 0 rgba(255, 252, 246, 0.55)`): titles and dense rows on art.
- **Shell mat** (`0 0 0 6–8px var(--paper-deep)` + soft ambient): mock frame only.
- **CTA foot** (`0 2px 0 rgba(110, 30, 22, 0.35)`): seal stamp weight under primary button.
- **Sheet lift** (`0 -10px 36px rgba(28,26,23,0.12)`): bottom sheet only.
- **Palace seal inset** (selected): inset cinnabar ring + quiet outer glow — selection, not elevation.

### Named Rules
**The Layered Paper Rule（叠紙）.** Convey depth with glass stacks and borders. Heavy drop shadows on cards/palaces are out of brand; shell shadows stay shell-only.

## Shapes

Form language is **square / sharp** — seal geometry, not consumer soft-UI. Almost all surfaces use `border-radius: 0`. The sole intentional radius is the sheet **handle** at **2px** (`--` / `rounded.handle`).

Borders are 1px ink-line at low opacity (`rgba(42, 38, 32, 0.12–0.55)`) or solid `--line` / `--cinnabar` when active. Selected palace gains a filled 11×11 cinnabar seal square in the corner (克制印璽). Checkbox and corner marks stay rectilinear.

## Components

Component feel: **克制印璽 (restrained seal)** — quiet paper at rest; cinnabar only when the user commits or selects.

### Buttons
- **Shape:** sharp (0 radius); height 46px; letter-spacing 0.32em.
- **Primary CTA:** `--cinnabar` fill, `--cinnabar-deep` border, `#f7f2ea` text, foot shadow `0 2px 0 rgba(110, 30, 22, 0.35)`. Optional `.narrow` width 180px.
- **Back / ghost:** transparent fill, 1px `--cinnabar` border, cinnabar text (sheet dismiss).
- **Hover / Focus:** mock is static; when interactive, keep fill cinnabar — do not invent blue focus rings or large elevation.

### Chips
- **Idle:** 12px, padding 7px 12px, border `rgba(42,38,32,0.28)`, bg `rgba(255,255,255,0.28)`, text `--ink-soft`.
- **On:** border/text `--cinnabar`, bg `--cinnabar-soft`, weight 600. Used for calendar / gender.

### Cards / Containers
- **Corner:** sharp.
- **Background:** `--glass` (card, form-col); `--glass-soft` (side-col, idle palace).
- **Border:** `1px solid rgba(42, 38, 32, 0.16)` (cards); stronger on palaces `0.55`.
- **Shadow:** none on content cards (Layered Paper Rule).
- **Padding:** ~14px.

### Inputs / Fields
- **Style:** underline field — no full box border; `border-bottom: 1.5px solid var(--line)`; bg `rgba(255,255,255,0.32)`; height 40px.
- **Label:** 11px mute, tracking 0.1em above.
- **Filled:** text `--ink`, weight 500.
- **Focus:** mock static; prefer deepening the underline toward `--ink` / `--cinnabar`, not a glow ring.

### Navigation / Segment
- Segment row: mute 13px tabs; `.active` → `--cinnabar` text + 2px cinnabar bottom border.
- Header / topbar: glass wash `rgba(243, 238, 227, 0.40)` over art; title + optional demo badge.

### Palace Board (signature)
- Grid cells: `--glass-soft`, ink border, quiet empty corner mark.
- **Selected / tap:** bg `rgba(181, 58, 46, 0.13)`, cinnabar border + inset ring, filled seal square `::after`, name → `--cinnabar-deep`.

### Sheet / Panel
- Mobile `.sheet`: `--glass-strong`, top `--line`, handle 40×4 @ 2px radius.
- Desktop `.panel`: 340px, left `--line`, same glass-strong body.
- Star rows on `--glass-text`; `.tag` idle paper; `.tag.sihua` cinnabar-soft.

### Badges / Tags / Footer
- `.badge-demo`: 10px cinnabar outline + soft fill.
- `.tag` / `.tag.sihua`: micro chips on star rows.
- `.footer-strip` / `.footer-mini`: paper-deep tint, mute 9–11px attribution — always present; never add login/share/pay chrome beside it.

## Do's and Don'ts

### Do:
- **Do** keep `.art-bleed` full-bleed under every screen (Full-Bleed Art Rule).
- **Do** put 朱砂 only on CTA and selection seals (Cinnabar Rarity Rule).
- **Do** stack `--glass*` opacities for depth (Layered Paper Rule / 叠紙).
- **Do** use the system `--font` stack exclusively (System Font Rule).
- **Do** keep corners sharp; reserve 2px radius for the sheet handle only.
- **Do** respect `prefers-reduced-motion: reduce` (no animation/transition).
- **Do** ship footer attribution / personal-use / non-commercial lines as part of the visual system.

### Don't:
- **Don't** add login, share, or pay chrome — visual identity is a private Operate tool, not a funnel.
- **Don't** replace full-bleed ink with solid fills, thin hero strips, or ornament-only corners.
- **Don't** paint large surfaces in cinnabar or use red as a general brand wash.
- **Don't** apply Material-style card drop shadows as the default elevation language.
- **Don't** load webfonts or icon-font CDNs.
- **Don't** round chips, cards, palaces, or CTAs into soft-UI pills.
- **Don't** treat 9–10px micro labels as intentional forever — note as polish backlog (lift toward readable ≥11px) without rewriting tokens in this pass.
