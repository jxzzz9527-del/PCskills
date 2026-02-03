// 修復 Canvas 尺寸問題的補丁檔案
// 在開始遊戲時重新設定 Canvas 尺寸

console.log('載入 Canvas 尺寸修復補丁...');

// 等待原始遊戲檔案載入完成
function waitForGameLoaded() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            // 檢查遊戲物件是否已載入
            if (window.c && window.c.canvas && window.V) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}

// 修復遊戲自動啟動問題
function patchGameAutoStart() {
    console.log('修復遊戲自動啟動問題...');
    
    // 等待遊戲初始化完成後自動啟動遊戲
    function waitForGameInit() {
        const checkInterval = setInterval(() => {
            if (window.c && window.D && window.geneEnemy) {
                clearInterval(checkInterval);
                console.log('遊戲初始化完成，自動啟動遊戲...');
                
                // 自動啟動遊戲迴圈
                if (!window.gameLoopStarted) {
                    window.D();
                    window.gameLoopStarted = true;
                    console.log('遊戲迴圈已啟動');
                }
                
                // 自動開始生成敵機
                if (!window.enemyGenerationStarted) {
                    window.geneEnemy();
                    window.enemyGenerationStarted = true;
                    console.log('敵機生成已啟動');
                }
            }
        }, 100);
    }
    
    // 修復 startGame 函數
    const originalStartGame = window.startGame;
    window.startGame = function() {
        console.log('開始遊戲按鈕被點擊...');
        
        const startScreen = document.getElementById('startScreen');
        const gameWrapper = document.getElementById('gameWrapper');
        
        if (startScreen && gameWrapper) {
            startScreen.style.display = 'none';
            gameWrapper.style.display = 'block';
            
            // 確保遊戲狀態正確設定
            if (window.c) {
                window.c.isStop = false;
                window.c.isPause = false;
                console.log('遊戲狀態已設定');
            }
            
            // 調用原始函數的其餘邏輯
            if (originalStartGame) {
                originalStartGame();
            }
        }
    };
    
    // 開始等待遊戲初始化
    waitForGameInit();
    
    console.log('遊戲自動啟動修復完成');
}

// 頁面載入完成後執行修復
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，等待遊戲檔案載入...');
    
    waitForGameLoaded().then(() => {
        console.log('遊戲檔案載入完成，應用修復...');
        patchGameAutoStart();
    });
});
