# React TypeScript Widget

一個使用 React + TypeScript + Vite 構建的 Widget 組件庫，可以輕鬆嵌入到任何網站中。

## 功能

- 📝 **註冊表單 Widget** - 完整的用戶註冊表單，包含驗證功能
- 📊 **顯示 Widget** - 顯示註冊記錄的組件
- 🎯 **Widget 管理器** - 統一管理多個 widget 實例

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 構建 Widget

```bash
npm run build
```

構建完成後會在 `dist/widget/` 目錄生成：
- `all-widgets.umd.js` - Widget 的 JavaScript 文件
- `all-widgets.css` - Widget 的樣式文件

### 3. 在 HTML 中使用

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Widget 樣式 -->
    <link rel="stylesheet" href="./dist/widget/all-widgets.css" />

    <!-- React 和 ReactDOM（必需） -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- Widget -->
    <script src="./dist/widget/all-widgets.umd.js"></script>
  </head>
  <body>
    <!-- 註冊表單容器 -->
    <div id="registration-widget"></div>

    <!-- 顯示容器 -->
    <div id="registration-display"></div>

    <script>
      // 初始化註冊表單
      window.RegistrationWidget.init({
        containerId: 'registration-widget',
        onSuccess: function(data) {
          console.log('註冊成功:', data);
          // 更新顯示 widget
          window.RegistrationDisplayWidget.update(data, 'registration-display');
        }
      });

      // 初始化顯示 widget
      window.RegistrationDisplayWidget.init({
        containerId: 'registration-display',
        emptyMessage: '暫無註冊記錄'
      });
    </script>
  </body>
</html>
```

## API 文檔

### RegistrationWidget

註冊表單 Widget API。

#### 方法

- `init(config)` - 初始化註冊表單
  - `containerId` (string, 可選) - 容器元素 ID，默認為 `'registration-widget-container'`
  - `onSuccess` (function, 可選) - 註冊成功回調
  - `onSubmit` (function, 可選) - 表單提交回調

- `destroy(containerId)` - 銷毀 widget 實例

#### 示例

```javascript
window.RegistrationWidget.init({
  containerId: 'my-registration-form',
  onSuccess: function(data) {
    console.log('註冊成功:', data);
  },
  onSubmit: function(data) {
    console.log('表單提交:', data);
  }
});
```

### RegistrationDisplayWidget

顯示 Widget API。

#### 方法

- `init(config)` - 初始化顯示 widget
  - `containerId` (string, 可選) - 容器元素 ID
  - `data` (object|array, 可選) - 要顯示的數據
  - `emptyMessage` (string, 可選) - 空數據時的提示信息
  - `onRefresh` (function, 可選) - 刷新按鈕點擊回調

- `update(data, containerId)` - 更新顯示的數據

- `destroy(containerId)` - 銷毀 widget 實例

#### 示例

```javascript
// 初始化
window.RegistrationDisplayWidget.init({
  containerId: 'my-display',
  emptyMessage: '暫無記錄'
});

// 更新數據
window.RegistrationDisplayWidget.update({
  username: 'John',
  email: 'john@example.com',
  phone: '0912345678',
  registeredAt: new Date().toISOString()
}, 'my-display');
```

### WidgetManager

Widget 管理器，用於統一管理多個 widget 實例。

#### 方法

- `initRegistrationWidget(id, containerId, config)` - 初始化註冊表單並註冊到管理器
- `initDisplayWidget(id, containerId, config)` - 初始化顯示 widget 並註冊到管理器
- `updateDisplayWidget(id, data)` - 更新指定 ID 的顯示 widget
- `show(id, type)` - 顯示 widget
- `hide(id, type)` - 隱藏 widget
- `destroy(id, type)` - 銷毀 widget
- `getWidgetIds(type)` - 獲取所有 widget ID

#### 示例

```javascript
// 使用 WidgetManager
window.WidgetManager.initRegistrationWidget('home', 'home-registration', {
  onSuccess: function(data) {
    window.WidgetManager.updateDisplayWidget('display', data);
  }
});

window.WidgetManager.initDisplayWidget('display', 'registration-display', {
  emptyMessage: '暫無記錄'
});
```

## 開發

### 開發模式

```bash
npm run dev
```

### 構建

```bash
npm run build
```

### 預覽

```bash
npm run preview
```

## 文件結構

```
reactTSWidget/
├── src/
│   ├── components/          # React 組件
│   │   ├── RegistrationForm.tsx
│   │   ├── RegistrationDisplay.tsx
│   │   └── *.css
│   ├── all-widgets.tsx      # Widget 入口文件
│   └── widget.css           # 全局樣式
├── dist/
│   └── widget/              # 構建輸出
│       ├── all-widgets.umd.js
│       └── all-widgets.css
├── demo.html                # 演示頁面
└── package.json
```

## 注意事項

1. **載入順序很重要**：
   - React 和 ReactDOM 必須先載入
   - Widget 腳本在 React 之後載入

2. **容器必須存在**：
   - 在初始化 widget 之前，確保容器元素已存在於 DOM 中

3. **數據格式**：
   - 顯示 widget 的數據必須符合指定的格式
   - `registeredAt` 是可選的，如果提供應該是 ISO 8601 格式

## 許可證

MIT
