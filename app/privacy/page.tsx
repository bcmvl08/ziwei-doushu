export const metadata = { title: '隱私政策 · 紫微命盤', description: '紫微命盤隱私政策' };

export default function PrivacyPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>返回首頁</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em' }}>紫微命盤</span>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>隱私政策</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>最後更新：2026年4月</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. 我們收集的信息</h2>
      <p>為提供紫微命盤排盤與解讀服務，我們可能收集以下信息：</p>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>命盤必要信息</strong>：姓名（選填）、出生公曆年月日、出生時辰、性別、出生地經度</li>
        <li><strong>賬號信息（註冊後）</strong>：手機號（用於短信驗證與會員服務）</li>
        <li><strong>交互信息</strong>：你在站內的點擊、瀏覽、命盤歷史記錄</li>
        <li><strong>反饋信息</strong>：你對解讀內容的"準 / 不準"打分與文字反饋</li>
        <li><strong>支付信息</strong>：購買會員或單項服務時通過第三方支付（支付寶 / 微信支付）處理，本平臺不存儲完整卡號或密碼</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. 我們如何使用信息</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li>命盤信息僅用於本次解讀與你賬號下的歷史命盤記錄</li>
        <li>手機號用於註冊、登錄、訂單通知</li>
        <li>反饋信息用於持續改進命理內容質量（脫敏後聚合分析）</li>
        <li>聚合數據可能用於行業研究與平臺優化</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. 信息共享與第三方</h2>
      <p>除以下情形外，我們不會向第三方共享你的個人信息：</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>支付服務商（支付寶 / 微信支付）：處理訂單結算</li>
        <li>短信服務商（如阿里雲短信）：發送驗證碼</li>
        <li>雲服務商（如 Vercel / Cloudflare / 阿里雲）：技術承載</li>
        <li>AI 解讀服務（如 Anthropic Claude）：處理你的"自由追問"對話（已做匿名化）</li>
        <li>司法機關或政府部門基於法律法規的合法要求</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. 信息安全</h2>
      <p>我們採取業界常見的技術與管理手段保護你的信息（HTTPS 傳輸加密、數據庫加密存儲、訪問權限控制等）。但請注意，互聯網傳輸無法保證 100% 安全。</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. 你的權利</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>查詢</strong>：可通過賬號中心查看你的所有歷史命盤與訂單</li>
        <li><strong>刪除</strong>：聯繫客服刪除賬號下指定命盤 / 註銷賬號</li>
        <li><strong>導出</strong>：可申請導出你的全部個人數據</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>6. Cookie 與本地存儲</h2>
      <p>本站使用 cookie / localStorage 用於：保存你的暗黑/亮色主題偏好、最近的命盤歷史、會員登錄狀態。你可在瀏覽器設置中關閉，但部分功能可能受影響。</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>7. 未成年人</h2>
      <p>本平臺命理內容面向 18 歲以上成年用戶。未成年人請在監護人同意下使用，並不得將解讀用於重大人生決策。</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>8. 政策變更</h2>
      <p>本政策可能不定期更新。重大變更將以顯著方式通知。繼續使用即表示同意更新後的版本。</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}>服務條款</a> · <a href="/" style={{ color: 'var(--ac)' }}>返回首頁</a>
        </p>
      </main>
    </>
  );
}
