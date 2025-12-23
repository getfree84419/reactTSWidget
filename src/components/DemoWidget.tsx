import { useState } from 'react'
import './DemoWidget.css'

interface DemoWidgetProps {
  title?: string
  message?: string
  onButtonClick?: () => void
}

const DemoWidget = ({ 
  title = 'Demo Widget', 
  message = '這是一個簡單的 Demo Widget',
  onButtonClick 
}: DemoWidgetProps) => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <div className="demo-widget">
      <div className="demo-widget-header">
        <h2>{title}</h2>
      </div>
      <div className="demo-widget-content">
        <p>{message}</p>
        <div className="demo-widget-counter">
          <p>點擊次數: <strong>{count}</strong></p>
        </div>
        <button className="demo-widget-button" onClick={handleClick}>
          點擊我
        </button>
      </div>
    </div>
  )
}

export default DemoWidget

