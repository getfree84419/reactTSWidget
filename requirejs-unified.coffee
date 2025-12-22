# 統一 Widget 使用示例 - CoffeeScript
# 只需要引入一個文件，就可以使用所有 widget

require ['jquery'], ($) ->
  $ ->
    # 方式 1: 使用 WidgetManager（推薦，最簡單）
    if window.WidgetManager
      # 初始化多個註冊表單
      window.WidgetManager.initRegistrationWidget 'home', 'home-registration-widget',
        onSuccess: (data) ->
          console.log '首頁註冊成功:', data
          # 更新顯示 widget
          window.WidgetManager.updateDisplayWidget 'display', data
          
          # 發送到後端
          $.ajax
            url: '/api/register'
            method: 'POST'
            contentType: 'application/json'
            data: JSON.stringify(data)
      
      window.WidgetManager.initRegistrationWidget 'sidebar', 'sidebar-registration-widget',
        onSuccess: (data) ->
          console.log '側邊欄註冊成功:', data
          window.WidgetManager.updateDisplayWidget 'display', data
      
      # 初始化顯示 widget
      window.WidgetManager.initDisplayWidget 'display', 'registration-display-widget',
        emptyMessage: '暫無註冊記錄'
        onRefresh: ->
          # 從後端載入數據
          $.ajax
            url: '/api/registrations'
            method: 'GET'
            success: (data) ->
              window.WidgetManager.updateDisplayWidget 'display', data
      
      # 控制 widget
      $('#show-home').on 'click', ->
        window.WidgetManager.show('home', 'registration')
      
      $('#hide-home').on 'click', ->
        window.WidgetManager.hide('home', 'registration')
    
    # 方式 2: 直接使用全局 API
    # if window.RegistrationWidget
    #   window.RegistrationWidget.init
    #     containerId: 'home-registration-widget'
    #     onSuccess: (data) ->
    #       console.log '註冊成功:', data
    #       
    #       # 更新顯示 widget
    #       if window.RegistrationDisplayWidget
    #         window.RegistrationDisplayWidget.update data, 'registration-display-widget'
    # 
    # if window.RegistrationDisplayWidget
    #   window.RegistrationDisplayWidget.init
    #     containerId: 'registration-display-widget'
    #     emptyMessage: '暫無註冊記錄'

