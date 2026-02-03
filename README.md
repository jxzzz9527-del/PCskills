# 電腦基本功 - 遊戲教學網站

這是一個包含 10 個互動式電腦操作練習遊戲的教學網站。

## 📁 專案結構

```
share/
├── index.html              # 主頁面
├── games/                  # 遊戲文件
│   ├── mouse_move.html     # 接水果遊戲
│   ├── mouse_drag.html     # 搬米遊戲
│   ├── mouse_click.html    # 打殭屍遊戲
│   ├── mouse_wheel.html    # 躲避球遊戲
│   ├── bopomofo_typing_left.html    # 注音打字 - 左區
│   ├── bopomofo_typing_middle.html  # 注音打字 - 中區
│   ├── bopomofo_typing_right.html   # 注音打字 - 右區
│   ├── bopomofo_typing.html         # 注音打字練習
│   ├── typing_hero.html    # 打字英雄
│   └── copy_paste_hero.html # 複製&貼上
└── static/                 # 靜態資源（需要執行 setup_static.py 生成）
    ├── 接水果背景.png
    ├── 接水果推車.png
    ├── mouse-click/        # 打殭屍遊戲資源
    ├── mouse-drag/         # 搬米遊戲資源
    ├── mouse-wheel/         # 躲避球遊戲資源
    └── games/              # 完整遊戲
        ├── copy-paste-hero/
        └── typing-hero/
```

## 🎮 遊戲列表

### 滑鼠操作遊戲
1. **接水果遊戲** - 練習滑鼠移動
2. **搬米遊戲** - 練習拖曳操作
3. **打殭屍遊戲** - 練習點擊操作
4. **躲避球遊戲** - 練習滾輪操作

### 鍵盤打字遊戲
5. **注音打字 - 左區** - 練習左區注音符號
6. **注音打字 - 中區** - 練習中區注音符號
7. **注音打字 - 右區** - 練習右區注音符號
8. **注音打字練習** - 完整注音符號練習
9. **打字英雄** - 挑戰打字速度與準確度
10. **複製&貼上** - 練習複製貼上操作

## 🚀 使用方式

### 🌐 快速部署到 Render Cloud

**想要快速上線？** 查看 [DEPLOY_RENDER.md](./DEPLOY_RENDER.md) 獲取完整的 Render 部署教學！

### 步驟 1：複製靜態資源

**重要**：在部署前，需要先將靜態資源複製到 `share/static/` 目錄。

執行以下命令（在 `share` 目錄下）：
```bash
python setup_static.py
```

這個腳本會自動：
- 從 `web/static/` 複製所有需要的資源
- 創建 `share/static/` 目錄結構
- 複製所有圖片、遊戲文件等

### 方式一：FastAPI 部署

這些文件是 FastAPI 的 Jinja2 模板，需要配合後端伺服器使用：

1. 執行 `setup_static.py` 複製靜態資源
2. 將 `share` 資料夾放在 `web/templates/` 目錄下
3. 確保 FastAPI 應用已配置模板引擎
4. 訪問 `/share` 路徑即可使用

### 方式二：靜態部署（獨立運行）

所有路徑已改為相對路徑，可以獨立運行：

1. 執行 `setup_static.py` 複製靜態資源
2. 使用簡單的 HTTP 伺服器運行：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # 或使用 Node.js 的 http-server
   npx http-server -p 8000
   ```
3. 訪問 `http://localhost:8000/index.html` 即可使用

## 📋 依賴的靜態資源

這些遊戲需要以下靜態資源（已包含在 `static/` 目錄中，執行 `setup_static.py` 後會自動複製）：

- `static/接水果背景.png`
- `static/接水果推車.png`
- `static/mouse-click/background.jpg` 和 `zombie_*.png` 系列（15個文件）
- `static/mouse-wheel/` 目錄下的所有動畫圖片（12個文件）
- `static/mouse-drag/background.jpg` 和 `rice_bag.png`
- `static/games/copy-paste-hero/` 完整遊戲目錄
- `static/games/typing-hero/` 完整遊戲目錄（包含所有 CSS、JS、圖片等）

**注意**：所有 HTML 文件中的路徑已改為相對路徑（`../static/`），可以直接獨立運行。

## 👨‍💻 開發者資訊

- **開發者**：信元老師
- **聯絡方式**：jxzzz9527@chc.edu.tw

## 📝 授權

此專案僅供教學使用。

## 🔧 技術規格

- **前端**：HTML5, CSS3, JavaScript
- **後端框架**：FastAPI (Jinja2 Templates)
- **字體**：Noto Sans TC

## 📌 注意事項

1. 這些是 Share 版本，已移除排行榜和 ClassID 相關功能
2. 所有遊戲的「返回」按鈕都會回到 `/share` 主頁面
3. 部分遊戲使用 iframe 載入，需要確保同源策略允許
