# Widget 使用指南

統一 Widget 文件方案 - 只需要一個 JS 文件和一個 CSS 文件即可使用所有 widget。

## 快速開始

### 步驟 1: 構建 Widget

```bash
npm run build
```

或

```bash
npm run build:widget
```

構建完成後會在 `dist/widget/` 目錄生成：

- `all-widgets.umd.js` - 所有 widget 的統一文件
- `all-widgets.css` - 所有樣式的統一文件

### 步驟 2: 在 HTML 中引入文件

只需要引入一個 JS 文件和一個 CSS 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- RequireJS -->
    <script src="require.js"></script>

    <!-- 統一的 Widget 樣式（只需要一個 CSS 文件） -->
    <link rel="stylesheet" href="./dist/widget/all-widgets.css" />

    <!-- React 和 ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- 統一的 Widget 文件（只需要一個 JS 文件） -->
    <script src="./dist/widget/all-widgets.umd.js"></script>
  </head>
  <body>
    <!-- 註冊表單容器 -->
    <div id="registration-widget"></div>

    <!-- 顯示容器 -->
    <div id="registration-display"></div>
  </body>
</html>
```

### 步驟 3: 在 CoffeeScript 中使用

**推薦使用 WidgetManager（最簡單）：**

```coffeescript
require ['jquery'], ($) ->
  $ ->
    # 使用 WidgetManager 統一管理所有 widget
    if window.WidgetManager
      # 初始化註冊表單
      window.WidgetManager.initRegistrationWidget 'home', 'registration-widget',
        onSuccess: (data) ->
          console.log '註冊成功:', data
          # 更新顯示 widget
          window.WidgetManager.updateDisplayWidget 'display', data

          # 發送到後端
          $.ajax
            url: '/api/register'
            method: 'POST'
            contentType: 'application/json'
            data: JSON.stringify(data)

      # 初始化顯示 widget
      window.WidgetManager.initDisplayWidget 'display', 'registration-display',
        emptyMessage: '暫無註冊記錄'
```

**或者直接使用全局 API：**

```coffeescript
require ['jquery'], ($) ->
  $ ->
    # 初始化註冊表單
    if window.RegistrationWidget
      window.RegistrationWidget.init
        containerId: 'registration-widget'
        onSuccess: (data) ->
          console.log '註冊成功:', data

          # 更新顯示 widget
          if window.RegistrationDisplayWidget
            window.RegistrationDisplayWidget.update data, 'registration-display'

    # 初始化顯示 widget
    if window.RegistrationDisplayWidget
      window.RegistrationDisplayWidget.init
        containerId: 'registration-display'
        emptyMessage: '暫無註冊記錄'
```

## 使用多個 Widget

在同一個 HTML 中使用多個 widget 非常簡單：

```coffeescript
require ['jquery'], ($) ->
  $ ->
    if window.WidgetManager
      # 初始化多個註冊表單
      window.WidgetManager.initRegistrationWidget 'home', 'home-registration-widget',
        onSuccess: (data) ->
          console.log '首頁註冊成功:', data
          window.WidgetManager.updateDisplayWidget 'display', data

      window.WidgetManager.initRegistrationWidget 'sidebar', 'sidebar-registration-widget',
        onSuccess: (data) ->
          console.log '側邊欄註冊成功:', data
          window.WidgetManager.updateDisplayWidget 'display', data

      # 初始化顯示 widget
      window.WidgetManager.initDisplayWidget 'display', 'registration-display-widget',
        emptyMessage: '暫無註冊記錄'

      # 控制 widget
      window.WidgetManager.show('home', 'registration')
      window.WidgetManager.hide('sidebar', 'registration')
```

## WidgetManager API

統一文件自動包含 `WidgetManager`，提供以下方法：

### 初始化 Widget

```coffeescript
# 初始化註冊表單 widget
WidgetManager.initRegistrationWidget(id, containerId, config)

# 初始化顯示 widget
WidgetManager.initDisplayWidget(id, containerId, config)
```

### 更新顯示 Widget 數據

```coffeescript
WidgetManager.updateDisplayWidget(id, data)
```

### 控制 Widget

```coffeescript
# 顯示 widget
WidgetManager.show(id, type)  # type: 'registration' 或 'display'

# 隱藏 widget
WidgetManager.hide(id, type)

# 銷毀 widget
WidgetManager.destroy(id, type)
```

### 獲取所有 Widget ID

```coffeescript
WidgetManager.getWidgetIds(type)  # type 可選
```

## 顯示 Widget 數據格式

顯示 widget 接受以下格式的數據：

### 單個對象

```coffeescript
data = {
  username: '使用者名稱'
  email: 'user@example.com'
  phone: '0912345678'
  registeredAt: '2024-01-01T00:00:00Z'  # 可選
}
```

### 數組（多個記錄）

```coffeescript
data = [
  {
    username: '使用者1'
    email: 'user1@example.com'
    phone: '0912345678'
    registeredAt: '2024-01-01T00:00:00Z'
  }
  {
    username: '使用者2'
    email: 'user2@example.com'
    phone: '0987654321'
    registeredAt: '2024-01-02T00:00:00Z'
  }
]
```

## 完整示例

查看以下文件獲取完整示例：

- `example-unified.html` - 統一文件的 HTML 示例
- `requirejs-unified.coffee` - 統一文件的 CoffeeScript 示例

## 注意事項

1. **載入順序很重要**：

   - React 和 ReactDOM 必須先載入
   - Widget 腳本必須在 RequireJS 配置之前載入
   - 確保所有依賴都已載入

2. **容器必須存在**：

   - 在初始化 widget 之前，確保容器元素已存在於 DOM 中

3. **數據格式**：

   - 顯示 widget 的數據必須符合指定的格式
   - `registeredAt` 是可選的，如果提供應該是 ISO 8601 格式

4. **多個 Widget**：
   - 每個 widget 必須有唯一的 ID 和容器 ID
   - 使用管理器可以更方便地管理多個 widget

## 常見問題

### Q: Widget 無法顯示？

A: 檢查：

- React 和 ReactDOM 是否已載入
- Widget 腳本是否在 RequireJS 之前載入
- 容器元素是否存在
- 瀏覽器控制台是否有錯誤

### Q: 如何更新顯示 widget 的數據？

A: 使用 `updateDisplayWidget` 方法：

```coffeescript
WidgetManager.updateDisplayWidget('widget-id', newData)
```

### Q: 可以在同一個頁面使用多個 widget 嗎？

A: 可以，每個 widget 使用不同的 ID 和容器 ID：

```coffeescript
WidgetManager.initRegistrationWidget('home', 'home-widget', {...})
WidgetManager.initRegistrationWidget('sidebar', 'sidebar-widget', {...})
WidgetManager.initDisplayWidget('list', 'list-widget', {...})
```
