// Widget 點擊統計 Demo - 純 JavaScript 版本
// 統計每個 widget 的點擊次數

(function () {
  // 點擊統計對象
  var clickStats = {};

  // 初始化統計
  function initStats() {
    clickStats = {};
    console.log("點擊統計已初始化");
  }

  // 記錄點擊
  function recordClick(widgetId) {
    clickStats[widgetId] = (clickStats[widgetId] || 0) + 1;
    console.log(
      "Widget " + widgetId + " 被點擊，總計: " + clickStats[widgetId] + " 次"
    );
    updateStatsDisplay();
  }

  // 獲取統計數據
  function getStats() {
    return clickStats;
  }

  // 獲取特定 widget 的點擊次數
  function getWidgetClicks(widgetId) {
    return clickStats[widgetId] || 0;
  }

  // 重置統計
  function resetStats() {
    clickStats = {};
    console.log("統計已重置");
    updateStatsDisplay();
  }

  // 更新統計顯示
  function updateStatsDisplay() {
    var statsElement = document.getElementById("click-stats");
    if (!statsElement) {
      return;
    }

    if (Object.keys(clickStats).length === 0) {
      statsElement.innerHTML = "<p>暫無點擊記錄</p>";
      return;
    }

    var html = "<ul>";
    for (var widgetId in clickStats) {
      if (clickStats.hasOwnProperty(widgetId)) {
        var count = clickStats[widgetId];
        html +=
          "<li>Widget " +
          widgetId +
          ": <strong>" +
          count +
          "</strong> 次</li>";
      }
    }
    html += "</ul>";

    var totalClicks = Object.values(clickStats).reduce(function (a, b) {
      return a + b;
    }, 0);
    html +=
      '<p class="total">總點擊次數: <strong>' + totalClicks + "</strong></p>";

    statsElement.innerHTML = html;
  }

  // 等待 DOM 載入完成
  function init() {
    // 檢查 Widget 是否載入
    if (!window.DemoPage) {
      console.error("錯誤: DemoPage 未載入！");
      return;
    }

    console.log("DemoPage 已載入，開始初始化...");

    // 初始化統計
    initStats();

    // 初始化 Demo Page
    window.DemoPage.init({
      containerId: "demo-page",
      onWidgetClick: function (widgetId) {
        recordClick(widgetId);
      },
    });

    // 添加重置按鈕事件
    setTimeout(function () {
      var resetBtn = document.getElementById("reset-stats-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          resetStats();
          console.log("統計已重置");
        });
      }
    }, 500);

    console.log("Demo Page 初始化完成");
  }

  // DOM 載入完成後初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

