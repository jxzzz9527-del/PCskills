# 電腦基本功

信元老師電腦教學網 — 透過趣味遊戲學習電腦基礎操作。

## 簡介

本專案提供 10 款互動式遊戲，協助初學者練習：

- **滑鼠**：移動、拖曳、點擊、滾輪
- **鍵盤**：注音打字、英打
- **複製貼上**：快捷鍵與操作技巧

遊戲可獨立運行，亦可嵌入既有網頁應用，適合課堂教學與自主練習。

## 遊戲一覽

| 遊戲 | 檔案 | 練習項目 |
|------|------|----------|
| 接水果 | `mouse_move.html` | 滑鼠移動 |
| 搬米 | `mouse_drag.html` | 拖曳操作 |
| 打殭屍 | `mouse_click.html` | 點擊操作 |
| 躲避球 | `mouse_wheel.html` | 滾輪操作 |
| 注音打字 - 左區 | `bopomofo_typing_left.html` | 左區注音 |
| 注音打字 - 中區 | `bopomofo_typing_middle.html` | 中區注音 |
| 注音打字 - 右區 | `bopomofo_typing_right.html` | 右區注音 |
| 注音打字練習 | `bopomofo_typing.html` | 完整注音 |
| 打字英雄 | `typing_hero.html` | 打字速度與準確度 |
| 複製&貼上 | `copy_paste_hero.html` | 複製貼上技巧 |

## 專案結構

```
PCskills/
├── index.html           # 主頁
├── setup_static.py      # 靜態資源複製腳本
├── games/               # 遊戲頁面
│   ├── mouse_move.html
│   ├── mouse_drag.html
│   ├── mouse_click.html
│   ├── mouse_wheel.html
│   ├── bopomofo_typing_left.html
│   ├── bopomofo_typing_middle.html
│   ├── bopomofo_typing_right.html
│   ├── bopomofo_typing.html
│   ├── typing_hero.html
│   └── copy_paste_hero.html
└── static/              # 靜態資源（執行 setup_static.py 後產生）
    ├── mouse-click/
    ├── mouse-drag/
    ├── mouse-wheel/
    └── games/
        ├── copy-paste-hero/
        └── typing-hero/
```

## 快速開始

### 1. 複製靜態資源

在專案目錄下執行：

```bash
python setup_static.py
```

腳本會從 `web/static/` 複製所需資源到 `static/`。

### 2. 啟動網站

**方式 A：本機 HTTP 伺服器**

```bash
python -m http.server 8000
```

開啟瀏覽器訪問 `http://localhost:8000/index.html`。

**方式 B：FastAPI 整合**

將本專案置於 `web/templates/share/` 下，並設定 FastAPI 模板路徑，透過 `/share` 等路徑存取。

## 技術說明

- **前端**：HTML5、CSS3、JavaScript
- **字體**：Noto Sans TC
- **路徑**：使用相對路徑，支援獨立部署

## 開發者

信元老師 · jxzzz9527@chc.edu.tw · [GitHub](https://github.com/jxzzz9527-del/PCskills)

## 授權

本專案僅供教學使用。
