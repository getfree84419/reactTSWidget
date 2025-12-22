// 統一的 Widget 入口文件
// 一次性載入所有 widget，簡化使用

import React from 'react'
import ReactDOM from 'react-dom/client'
import RegistrationForm from './components/RegistrationForm'
import RegistrationDisplay from './components/RegistrationDisplay'
import './components/RegistrationForm.css'
import './components/RegistrationDisplay.css'
import './widget.css'

// 注意：UMD 格式會自動處理模組導出，不需要手動聲明 define

// ========== 註冊表單 Widget ==========
interface WidgetConfig {
  containerId?: string
  onSuccess?: (data: {
    username: string
    email: string
    phone: string
  }) => void
  onSubmit?: (data: {
    username: string
    email: string
    phone: string
  }) => void
}

const registrationWidgetInstances: Map<string, ReactDOM.Root> = new Map()

const initRegistrationWidget = (config: WidgetConfig = {}) => {
  const containerId = config.containerId || 'registration-widget-container'

  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    document.body.appendChild(container)
  }

  const existingRoot = registrationWidgetInstances.get(containerId)
  if (existingRoot) {
    existingRoot.unmount()
  }

  const root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <RegistrationForm
        onSuccess={config.onSuccess}
        onSubmit={config.onSubmit}
      />
    </React.StrictMode>
  )

  registrationWidgetInstances.set(containerId, root)
}

const destroyRegistrationWidget = (containerId?: string) => {
  const id = containerId || 'registration-widget-container'
  const root = registrationWidgetInstances.get(id)

  if (root) {
    root.unmount()
    registrationWidgetInstances.delete(id)
  }

  const container = document.getElementById(id)
  if (container) {
    container.remove()
  }
}

// ========== 顯示 Widget ==========
interface DisplayWidgetConfig {
  containerId?: string
  data?: {
    username: string
    email: string
    phone: string
    registeredAt?: string
  } | Array<{
    username: string
    email: string
    phone: string
    registeredAt?: string
  }>
  onRefresh?: () => void
  emptyMessage?: string
}

const displayWidgetInstances: Map<string, ReactDOM.Root> = new Map()

const initDisplayWidget = (config: DisplayWidgetConfig = {}) => {
  const containerId = config.containerId || 'registration-display-container'

  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    document.body.appendChild(container)
  }

  const existingRoot = displayWidgetInstances.get(containerId)
  if (existingRoot) {
    existingRoot.unmount()
  }

  const root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <RegistrationDisplay
        data={config.data}
        onRefresh={config.onRefresh}
        emptyMessage={config.emptyMessage}
      />
    </React.StrictMode>
  )

  displayWidgetInstances.set(containerId, root)
}

const updateDisplayWidget = (data: DisplayWidgetConfig['data'], containerId?: string) => {
  const id = containerId || 'registration-display-container'
  const root = displayWidgetInstances.get(id)

  if (root) {
    const container = document.getElementById(id)
    if (container) {
      root.render(
        <React.StrictMode>
          <RegistrationDisplay data={data} />
        </React.StrictMode>
      )
    }
  } else {
    console.warn(`Display widget with containerId "${id}" not found. Initializing new widget.`)
    initDisplayWidget({ containerId: id, data })
  }
}

const destroyDisplayWidget = (containerId?: string) => {
  const id = containerId || 'registration-display-container'
  const root = displayWidgetInstances.get(id)

  if (root) {
    root.unmount()
    displayWidgetInstances.delete(id)
  }

  const container = document.getElementById(id)
  if (container) {
    container.remove()
  }
}

// ========== Widget 管理器 ==========
class WidgetManager {
  private registrationWidgets: Map<string, { containerId: string; config: WidgetConfig }> = new Map()
  private displayWidgets: Map<string, { containerId: string; config: DisplayWidgetConfig }> = new Map()

  initRegistrationWidget(id: string, containerId: string, config: WidgetConfig = {}) {
    const widgetConfig = { ...config, containerId }
    initRegistrationWidget(widgetConfig)
    this.registrationWidgets.set(id, { containerId, config: widgetConfig })
    return true
  }

  initDisplayWidget(id: string, containerId: string, config: DisplayWidgetConfig = {}) {
    const widgetConfig = { ...config, containerId }
    initDisplayWidget(widgetConfig)
    this.displayWidgets.set(id, { containerId, config: widgetConfig })
    return true
  }

  updateDisplayWidget(id: string, data: DisplayWidgetConfig['data']) {
    const widget = this.displayWidgets.get(id)
    if (widget) {
      updateDisplayWidget(data, widget.containerId)
      return true
    }
    return false
  }

  show(id: string, type: 'registration' | 'display' = 'registration') {
    const widgets = type === 'registration' ? this.registrationWidgets : this.displayWidgets
    const widget = widgets.get(id)
    if (widget) {
      const element = document.getElementById(widget.containerId)
      if (element) {
        element.style.display = 'block'
        return true
      }
    }
    return false
  }

  hide(id: string, type: 'registration' | 'display' = 'registration') {
    const widgets = type === 'registration' ? this.registrationWidgets : this.displayWidgets
    const widget = widgets.get(id)
    if (widget) {
      const element = document.getElementById(widget.containerId)
      if (element) {
        element.style.display = 'none'
        return true
      }
    }
    return false
  }

  destroy(id: string, type: 'registration' | 'display' = 'registration') {
    const widgets = type === 'registration' ? this.registrationWidgets : this.displayWidgets
    const widget = widgets.get(id)

    if (widget) {
      if (type === 'registration') {
        destroyRegistrationWidget(widget.containerId)
      } else {
        destroyDisplayWidget(widget.containerId)
      }
      widgets.delete(id)
      return true
    }
    return false
  }

  getWidgetIds(type?: 'registration' | 'display'): string[] {
    if (type === 'registration') {
      return Array.from(this.registrationWidgets.keys())
    } else if (type === 'display') {
      return Array.from(this.displayWidgets.keys())
    }
    return [
      ...Array.from(this.registrationWidgets.keys()),
      ...Array.from(this.displayWidgets.keys())
    ]
  }
}

// ========== 導出全局 API ==========
declare global {
  interface Window {
    RegistrationWidget: {
      init: (config?: WidgetConfig) => void
      destroy: (containerId?: string) => void
    }
    RegistrationDisplayWidget: {
      init: (config?: DisplayWidgetConfig) => void
      update: (data: DisplayWidgetConfig['data'], containerId?: string) => void
      destroy: (containerId?: string) => void
    }
    WidgetManager: WidgetManager
    AllWidgets: {
      RegistrationWidget: typeof window.RegistrationWidget
      RegistrationDisplayWidget: typeof window.RegistrationDisplayWidget
      WidgetManager: WidgetManager
    }
  }
}

// 導出註冊表單 Widget API
window.RegistrationWidget = {
  init: initRegistrationWidget,
  destroy: destroyRegistrationWidget,
}

// 導出顯示 Widget API
window.RegistrationDisplayWidget = {
  init: initDisplayWidget,
  update: updateDisplayWidget,
  destroy: destroyDisplayWidget,
}

// 創建管理器實例
const widgetManager = new WidgetManager()
window.WidgetManager = widgetManager

// 統一導出所有 API
window.AllWidgets = {
  RegistrationWidget: window.RegistrationWidget,
  RegistrationDisplayWidget: window.RegistrationDisplayWidget,
  WidgetManager: widgetManager,
}

// 注意：UMD 格式會自動處理 RequireJS/AMD 和 CommonJS 導出
// 不需要手動調用 define()，否則會與 RequireJS 衝突

export default window.AllWidgets

