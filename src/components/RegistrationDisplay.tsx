import { useEffect, useState } from 'react'
import './RegistrationDisplay.css'

interface RegistrationData {
  username: string
  email: string
  phone: string
  registeredAt?: string
}

interface RegistrationDisplayProps {
  data?: RegistrationData | RegistrationData[]
  onRefresh?: () => void
  emptyMessage?: string
}

const RegistrationDisplay = ({ 
  data, 
  onRefresh,
  emptyMessage = '暫無註冊記錄'
}: RegistrationDisplayProps) => {
  const [displayData, setDisplayData] = useState<RegistrationData[]>([])

  useEffect(() => {
    if (data) {
      const dataArray = Array.isArray(data) ? data : [data]
      setDisplayData(dataArray)
    } else {
      setDisplayData([])
    }
  }, [data])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '未知'
    try {
      const date = new Date(dateString)
      return date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  if (displayData.length === 0) {
    return (
      <div className="registration-display-container">
        <div className="registration-display-empty">
          <p>{emptyMessage}</p>
          {onRefresh && (
            <button onClick={onRefresh} className="refresh-button">
              重新載入
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="registration-display-container">
      <div className="registration-display-header">
        <h2>註冊記錄</h2>
        {onRefresh && (
          <button onClick={onRefresh} className="refresh-button">
            重新載入
          </button>
        )}
      </div>
      <div className="registration-display-list">
        {displayData.map((item, index) => (
          <div key={index} className="registration-display-item">
            <div className="registration-item-header">
              <span className="registration-username">{item.username}</span>
              {item.registeredAt && (
                <span className="registration-date">
                  {formatDate(item.registeredAt)}
                </span>
              )}
            </div>
            <div className="registration-item-details">
              <div className="registration-detail">
                <span className="detail-label">電子郵件:</span>
                <span className="detail-value">{item.email}</span>
              </div>
              {item.phone && (
                <div className="registration-detail">
                  <span className="detail-label">手機號碼:</span>
                  <span className="detail-value">{item.phone}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegistrationDisplay

