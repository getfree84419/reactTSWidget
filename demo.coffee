# Widget 完整演示 - CoffeeScript 版本
# 這個文件展示如何使用 CoffeeScript 管理所有 widget

require ['jquery'], ($) ->
  $ ->
    # 日誌函數
    addLog = (message, type = 'info') ->
      time = new Date().toLocaleTimeString('zh-TW')
      logArea = $('#log-area')
      logEntry = $('<div class="log-entry"></div>')
      logEntry.append("<span class=\"log-time\">[#{time}]</span>")
      logEntry.append("<span>#{message}</span>")
      
      if type is 'success'
        logEntry.css('border-left-color', '#10b981')
      else if type is 'error'
        logEntry.css('border-left-color', '#ef4444')
      else if type is 'warning'
        logEntry.css('border-left-color', '#f59e0b')
      
      logArea.append(logEntry)
      logArea.scrollTop(logArea[0].scrollHeight)
    
    # 檢查 Widget 是否載入
    if not window.WidgetManager
      addLog('錯誤: WidgetManager 未載入！', 'error')
      return
    
    addLog('WidgetManager 已載入，開始初始化...', 'success')
    
    # 初始化首頁註冊表單
    window.WidgetManager.initRegistrationWidget 'home', 'home-registration-widget',
      onSubmit: (data) ->
        addLog("首頁表單提交: #{data.username} (#{data.email})", 'info')
      onSuccess: (data) ->
        addLog("✓ 首頁註冊成功: #{data.username} (#{data.email})", 'success')
        
        # 更新顯示 widget
        displayData = {
          username: data.username
          email: data.email
          phone: data.phone
          registeredAt: new Date().toISOString()
        }
        window.WidgetManager.updateDisplayWidget 'display', displayData
    
    addLog('首頁註冊表單 widget 已初始化', 'success')
    
    # 初始化側邊欄註冊表單
    window.WidgetManager.initRegistrationWidget 'sidebar', 'sidebar-registration-widget',
      onSubmit: (data) ->
        addLog("側邊欄表單提交: #{data.username} (#{data.email})", 'info')
      onSuccess: (data) ->
        addLog("✓ 側邊欄註冊成功: #{data.username} (#{data.email})", 'success')
        
        # 更新顯示 widget
        displayData = {
          username: data.username
          email: data.email
          phone: data.phone
          registeredAt: new Date().toISOString()
        }
        window.WidgetManager.updateDisplayWidget 'display', displayData
    
    addLog('側邊欄註冊表單 widget 已初始化', 'success')
    
    # 初始化顯示 widget
    window.WidgetManager.initDisplayWidget 'display', 'registration-display-widget',
      emptyMessage: '暫無註冊記錄，請填寫上方表單進行註冊'
      onRefresh: ->
        addLog('顯示 widget 重新載入數據', 'info')
        # 這裡可以從後端載入數據
        mockData = [
          {
            username: '示例用戶1'
            email: 'user1@example.com'
            phone: '0912345678'
            registeredAt: new Date(Date.now() - 86400000).toISOString()
          }
          {
            username: '示例用戶2'
            email: 'user2@example.com'
            phone: '0987654321'
            registeredAt: new Date(Date.now() - 172800000).toISOString()
          }
        ]
        window.WidgetManager.updateDisplayWidget 'display', mockData
        addLog("已載入 #{mockData.length} 條示例數據", 'success')
    
    addLog('顯示 widget 已初始化', 'success')
    
    # 控制按鈕事件
    $('#show-home-widget').on 'click', ->
      window.WidgetManager.show('home', 'registration')
      addLog('顯示首頁註冊表單', 'info')
    
    $('#hide-home-widget').on 'click', ->
      window.WidgetManager.hide('home', 'registration')
      addLog('隱藏首頁註冊表單', 'info')
    
    $('#show-sidebar-widget').on 'click', ->
      window.WidgetManager.show('sidebar', 'registration')
      addLog('顯示側邊欄註冊表單', 'info')
    
    $('#hide-sidebar-widget').on 'click', ->
      window.WidgetManager.hide('sidebar', 'registration')
      addLog('隱藏側邊欄註冊表單', 'info')
    
    $('#show-display-widget').on 'click', ->
      window.WidgetManager.show('display', 'display')
      addLog('顯示註冊記錄', 'info')
    
    $('#hide-display-widget').on 'click', ->
      window.WidgetManager.hide('display', 'display')
      addLog('隱藏註冊記錄', 'info')
    
    $('#refresh-display').on 'click', ->
      # 觸發顯示 widget 的重新載入
      if window.RegistrationDisplayWidget
        # 模擬載入數據
        mockData = [
          {
            username: '示例用戶1'
            email: 'user1@example.com'
            phone: '0912345678'
            registeredAt: new Date(Date.now() - 86400000).toISOString()
          }
          {
            username: '示例用戶2'
            email: 'user2@example.com'
            phone: '0987654321'
            registeredAt: new Date(Date.now() - 172800000).toISOString()
          }
        ]
        window.WidgetManager.updateDisplayWidget 'display', mockData
        addLog("已載入 #{mockData.length} 條示例數據", 'success')
    
    $('#clear-log').on 'click', ->
      $('#log-area').empty()
      addLog('日誌已清除', 'warning')
    
    # 顯示所有 widget ID
    setTimeout ->
      allIds = window.WidgetManager.getWidgetIds()
      addLog("所有已註冊的 Widget ID: #{allIds.join(', ')}", 'info')
    , 500
    
    addLog('所有 widget 初始化完成！', 'success')

