# Demo 文件說明

本專案包含兩個 demo 文件，展示不同的技術棧組合：

## 1. demo-react.html（純 ReactTS + JavaScript）

**文件：**
- `demo-react.html` - HTML 文件
- `demo-react.js` - 純 JavaScript 實現

**特點：**
- ✅ 只使用 React TypeScript Widget
- ✅ 使用純 JavaScript 實現點擊統計功能
- ✅ 不需要 jQuery
- ✅ 不需要 CoffeeScript
- ✅ 更輕量，依賴更少

**使用方式：**
直接在瀏覽器中打開 `demo-react.html` 即可。

**代碼示例：**
```javascript
// demo-react.js
(function () {
  var clickStats = {};
  
  function recordClick(widgetId) {
    clickStats[widgetId] = (clickStats[widgetId] || 0) + 1;
    updateStatsDisplay();
  }
  
  // ... 其他代碼
})();
```

## 2. demo.html（ReactTS + CoffeeScript）

**文件：**
- `demo.html` - HTML 文件
- `demo.js` - CoffeeScript 編譯後的 JavaScript
- `demo.coffee` - CoffeeScript 源文件（可選）

**特點：**
- ✅ 使用 React TypeScript Widget
- ✅ 使用 CoffeeScript 編譯後的 JavaScript
- ✅ 需要 jQuery（CoffeeScript 代碼使用 `$`）
- ✅ 展示如何在舊專案中整合 Widget

**使用方式：**
1. 如果使用 CoffeeScript 源文件：
   ```bash
   coffee -c demo.coffee  # 編譯為 demo.js
   ```
2. 直接在瀏覽器中打開 `demo.html` 即可。

**代碼示例：**
```coffeescript
# demo.coffee
clickStats = {}

recordClick = (widgetId) ->
  clickStats[widgetId] = (clickStats[widgetId] || 0) + 1
  updateStatsDisplay()

$ ->
  window.DemoPage.init
    containerId: 'demo-page'
    onWidgetClick: (widgetId) ->
      recordClick widgetId
```

## 功能對比

兩個 demo 都實現了相同的功能：
- 📊 Widget 點擊統計
- 🔄 實時更新統計顯示
- 🔢 顯示每個 Widget 的點擊次數
- 📈 顯示總點擊次數
- 🔁 重置統計功能

## 選擇建議

- **新專案**：建議使用 `demo-react.html`（純 JavaScript，更簡單）
- **舊專案（已有 CoffeeScript）**：使用 `demo.html`（與現有技術棧一致）
- **學習目的**：兩個都可以參考，了解不同的實現方式

