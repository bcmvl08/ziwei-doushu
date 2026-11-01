# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS（系統字體、無外部 CDN／腳本／字型）。部署形態：本地，或日後私人／受控 Pages；本階段未開 production repo。

## Users

主要使用者為 Benny（個人）。情境：想用可驗證、可重現嘅規則為自己（或少數親友示範）排紫微斗數本命盤，喺手機同桌面睇盤，唔需要註冊或對外服務。

## Product Purpose

個人研究工具：輸入生辰 → 排出本命十二宮（及基本大限／流年切換），規則口徑可標明、結果可重現。成功＝同一合法輸入兩次結果一致；手機可完成入參→看盤主路徑；頁面清楚標示資料來源、個人用／非商業、唔夾帶 SaaS／收費／AI 斷語。

## Positioning

本地／私人部署嘅開源排盤＋自有 UI，唔係命理 SaaS、唔係商業斷語庫、亦唔係 RAG／大資料集產品。差異喺「可驗證規則＋個人用邊界」而唔係大眾解讀內容。

## Operating Context

主路徑：起盤表單（曆法／性別／閏月等）→ 本命十二宮格 → 點宮看詳情（手機 bottom sheet／桌面側欄）；可切本命／大限／流年。現階段交付為高保真靜態 mock（`/workspace/ziwei-hifi-ink/`），視覺方向已定為滿版水墨；正式工程碼／repo 須 Benny 另行批准先開。背景探索，唔阻塞 P0（泊車、skyglobe、prediction-insight、交易工具）。

## Capabilities and Constraints

**會做（MVP 草）**

- 開源排盤引擎（ziwei-doushu `lib/ziwei`）：生辰入參 → 本命盤＋基本大限／流年
- 自有輕量前端；Layout A（手機優先看盤）
- 標明派別／閏月／晚子時等可配置規則；結果可重現
- 頁腳／About：資料集 attribution、個人用／非商業、MIT 保留
- 可選：小量 JSONL 樣本本地對照（唔強制大資料集；倪師引文唔入產品語料）

**明確不做**

- SaaS／公開註冊／會員／支付／廣告
- 抄商業斷語庫、AI 解讀／prompt、後端解讀 API
- 倪師《天紀》原話／未過濾引文做收費或公開整包託管
- 對外宣稱古籍已證實公版
- 本階段未批准前唔開 production repo／唔寫應用碼

**授權（Audit 有條件 PASS，2026-10-25）**

- 代碼 MIT（保留聲明）
- 資料集 CC BY 4.0（署名；倪師引文除外）
- 倪師原話 CC BY-NC-SA（個人／本地可；唔做收費產品語料）
- 古籍公版：未證實 — UI 唔好聲稱版權已清
- 日後若改商業化／公開站須重審 Audit

**未決（刻意留空）**

- 正式 repo 名、私人 Pages 域名／Access 細節（開碼時再定）
- 時區／經度入參是否進 MVP 第一刀（AC 草有提，未鎖定）

## Brand Commitments

- 產品名暫用「紫微斗數」起盤／看盤表述；繁體中文 UI
- 綁定視覺約束（使用者已確認）：滿版／全畫面插畫底（水墨留白風景），UI 以半透明宣紙卡疊上；唔用幼飾帶或淨色底角飾代替滿版畫
- 朱砂／印泥紅僅作 CTA／選中強調（來自已准 hi-fi；細節由 DESIGN／document 管，此處只記約束）
- 無登入、無分享、無付費入口嘅產品身份

## Evidence on Hand

- 上游：https://github.com/Renhuai123/ziwei-doushu ；介紹 https://youtu.be/D_ENS0FJ1XA
- PRD canvas：紫微 side project 探索 PRD（A-personal）
- Audit 報告：`/workspace/reports/2026-10-25-ziwei-doushu-license-tos.md`（非法律意見）
- 已准 hi-fi mock：`/workspace/ziwei-hifi-ink/`（含 `shots/`）
- 早期 wire：`/workspace/ziwei-wires-a/`；外觀樣本：`/workspace/ziwei-appear-a/`
- 禁止捏造：真實命盤斷語、用戶證詞、定價、商業客戶、古籍公版已清證明

## Product Principles

1. 個人用邊界先於功能野心：任何會變成 SaaS、收費或公開註冊嘅方向都要停低重審。
2. 可驗證優於「有感覺」：規則口徑同重現性優先於華麗解讀文案。
3. 授權誠實：attribution、非商業／個人聲明、倪師 NC 隔離同「唔宣稱古籍已清」寫進產品表面，唔係事後補。
4. 手機主路徑完整：入參→看盤→宮詳喺窄屏可完成，先於桌面裝飾。
5. 靜態／輕量基線：無外部 script／字型 CDN，方便私人部署同安全閘。

## Accessibility & Inclusion

目標對齊常見 WCAG 實務（對比、可讀字級、觸控目標）；`prefers-reduced-motion` 要尊重。未另定正式合規級別；開碼前可用 impeccable audit／polish 收斂 hi-fi 已偵測嘅對比同字級問題。
