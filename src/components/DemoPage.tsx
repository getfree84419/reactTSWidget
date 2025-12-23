import { useState, useEffect } from 'react'
import DemoWidget from './DemoWidget'
import './DemoPage.css'

interface DemoPageProps {
  onWidgetClick?: (widgetId: string) => void
}

const DemoPage = ({ onWidgetClick }: DemoPageProps = {}) => {
  const [activeTab, setActiveTab] = useState<'widgets' | 'info'>('widgets')
  const [logMessages, setLogMessages] = useState<Array<{
    time: string
    message: string
    type: 'info' | 'success' | 'error' | 'warning'
  }>>([])

  useEffect(() => {
    addLog('Demo 頁面已載入', 'success')
  }, [])

  const addLog = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const time = new Date().toLocaleTimeString('zh-TW')
    setLogMessages(prev => [...prev, { time, message, type }])
  }

  const handleWidgetClick = (widgetId: string) => {
    addLog(`Widget ${widgetId} 被點擊`, 'info')
    if (onWidgetClick) {
      onWidgetClick(widgetId)
    }
  }

  const clearLog = () => {
    setLogMessages([])
    addLog('日誌已清除', 'warning')
  }

  return (
    <div className="demo-page">
      <div className="demo-header">
        <h1>🎯 Widget 完整演示</h1>
        <p>使用 React TypeScript 構建的 Demo 頁面</p>
      </div>

      <div className="demo-tabs">
        <button
          className={`tab-button ${activeTab === 'widgets' ? 'active' : ''}`}
          onClick={() => setActiveTab('widgets')}
        >
          🎨 Widgets
        </button>
        <button
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          ℹ️ 資訊
        </button>
      </div>

      <div className="demo-content">
        {activeTab === 'widgets' && (
          <div className="demo-section">
            <h2>Widget 展示</h2>
            <div className="widgets-grid">
              <div className="widget-item">
                <DemoWidget
                  title="Widget 1"
                  message="這是第一個 Demo Widget"
                  onButtonClick={() => handleWidgetClick('widget-1')}
                />
              </div>
              <div className="widget-item">
                <DemoWidget
                  title="Widget 2"
                  message="這是第二個 Demo Widget"
                  onButtonClick={() => handleWidgetClick('widget-2')}
                />
              </div>
              <div className="widget-item">
                <DemoWidget
                  title="Widget 3"
                  message="這是第三個 Demo Widget"
                  onButtonClick={() => handleWidgetClick('widget-3')}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="demo-section">
            <h2>關於 Demo Page</h2>
            <div className="info-content">
              <p>這是一個完整的 Demo 頁面，展示了如何使用 React TypeScript 構建 Widget 系統。</p>
              <h3>功能特點：</h3>
              <ul>
                <li>✅ 標籤頁切換</li>
                <li>✅ 多個 Widget 實例</li>
                <li>✅ 操作日誌記錄</li>
                <li>✅ 響應式設計</li>
                <li>✅ TypeScript 類型安全</li>
              </ul>
              <h3>使用方式：</h3>
              <pre>
{`window.DemoPage.init({
  containerId: 'demo-page',
  onWidgetClick: function(widgetId) {
    console.log('Widget clicked:', widgetId);
  }
});`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="demo-log-section">
        <div className="demo-log-header">
          <h3>📜 操作日誌</h3>
          <button className="clear-log-btn" onClick={clearLog}>
            清除日誌
          </button>
        </div>
        <div className="demo-log-area">
          {logMessages.length === 0 ? (
            <div className="log-empty">暫無日誌記錄</div>
          ) : (
            logMessages.map((log, index) => (
              <div key={index} className={`log-entry log-${log.type}`}>
                <span className="log-time">[{log.time}]</span>
                <span className="log-message">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DemoPage

