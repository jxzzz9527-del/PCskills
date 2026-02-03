// 測試版本的遊戲檔案，包含圖片載入修復
// 這是一個簡化版本，用於測試圖片載入問題的修復

console.log('載入測試版本的遊戲檔案');

// 模擬修復後的資源載入邏輯
function initResourcesWithCallback(callback) {
    console.log('開始載入圖片資源...');
    
    // 模擬圖片載入過程
    let loadedImages = 0;
    const totalImages = 15; // 總圖片數量
    
    function onImageLoad() {
        loadedImages++;
        console.log(`已載入 ${loadedImages}/${totalImages} 張圖片`);
        if (loadedImages === totalImages && callback) {
            console.log('所有圖片載入完成！');
            callback();
        }
    }
    
    // 模擬異步載入過程
    setTimeout(() => {
        for (let i = 0; i < totalImages; i++) {
            setTimeout(onImageLoad, Math.random() * 1000); // 隨機載入時間
        }
    }, 100);
}

// 顯示載入指示器
function showLoadingIndicator() {
    const gameWrapper = document.getElementById('gameWrapper');
    if (gameWrapper) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loadingIndicator';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 18px;
            font-family: MicrosoftYahei, sans-serif;
            text-align: center;
            z-index: 1000;
            background: rgba(0,0,0,0.7);
            padding: 20px;
            border-radius: 10px;
        `;
        loadingDiv.innerHTML = '載入中...';
        gameWrapper.appendChild(loadingDiv);
    }
}

// 隱藏載入指示器
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

// 模擬遊戲初始化
function initGame() {
    console.log('遊戲初始化完成！');
    hideLoadingIndicator();
    
    // 初始化畫面狀態
    initScreens();
    
    // 設定開始遊戲按鈕事件
    const startGameBtn = document.getElementById('startGameBtn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            console.log('開始遊戲按鈕被點擊！');
            startGame();
        });
        console.log('開始遊戲按鈕事件已設定');
    } else {
        console.error('找不到開始遊戲按鈕');
    }
    
    // 設定重新開始按鈕事件
    const restartGameBtn = document.getElementById('restartGameBtn');
    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', function() {
            console.log('重新開始按鈕被點擊！');
            restartGame();
        });
    }
    
    // 設定回到主選單按鈕事件
    const backToMenuBtn = document.getElementById('backToMenuBtn');
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', function() {
            console.log('回到主選單按鈕被點擊！');
            backToMenu();
        });
    }
    
    console.log('✅ 圖片載入修復和按鈕事件設定完成！');
}

// 遊戲狀態管理
const GameState = {
    isStop: false,
    isPause: false,
    player: null,
    enemys: [],
    bullets: [],
    loopIndex: 0
};

// 開始遊戲函數
function startGame() {
    console.log('開始遊戲...');
    const startScreen = document.getElementById('startScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    
    if (startScreen && gameWrapper) {
        startScreen.style.display = 'none';
        gameWrapper.style.display = 'block';
        
        // 重置遊戲狀態
        GameState.isStop = false;
        GameState.isPause = false;
        
        // 初始化遊戲物件
        initGameObjects();
        
        // 開始遊戲迴圈
        startGameLoop();
        
        console.log('遊戲已開始，狀態：', GameState);
        
        // 顯示成功訊息
        showGameMessage('🎮 遊戲已開始！<br/>開始遊戲按鈕修復成功！<br/>現在應該可以看到玩家和敵機了！');
    } else {
        console.error('找不到開始畫面或遊戲畫面元素');
    }
}

// 初始化遊戲物件
function initGameObjects() {
    console.log('初始化遊戲物件...');
    
    // 創建簡單的玩家物件
    GameState.player = {
        x: 400,
        y: 500,
        w: 50,
        h: 50,
        draw: function() {
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#4f4';
            ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('玩家', this.x, this.y + 4);
        }
    };
    
    // 創建敵機
    GameState.enemys = [];
    for (let i = 0; i < 3; i++) {
        GameState.enemys.push({
            x: 100 + i * 150,
            y: 100,
            w: 40,
            h: 40,
            speed: 1,
            draw: function() {
                const canvas = document.getElementById('gameCanvas');
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#f44';
                ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
                ctx.fillStyle = '#fff';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('敵機', this.x, this.y + 3);
            },
            act: function() {
                this.y += this.speed;
                if (this.y > 600) {
                    this.y = -40;
                }
            }
        });
    }
    
    console.log('遊戲物件初始化完成');
}

// 開始遊戲迴圈
function startGameLoop() {
    console.log('開始遊戲迴圈...');
    
    // 設定 Canvas 尺寸
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        canvas.width = 800;
        canvas.height = 600;
        console.log('Canvas 尺寸已設定：', canvas.width, 'x', canvas.height);
    }
    
    function gameFrame() {
        if (!GameState.isStop && !GameState.isPause) {
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');
            
            // 清除畫面
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 繪製背景（黑色背景）
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 繪製玩家
            if (GameState.player) {
                GameState.player.draw();
            }
            
            // 繪製敵機
            GameState.enemys.forEach(enemy => {
                enemy.act();
                enemy.draw();
            });
            
            // 繪製遊戲資訊
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('遊戲迴圈：' + GameState.loopIndex, 10, 30);
            ctx.fillText('敵機數量：' + GameState.enemys.length, 10, 50);
            
            GameState.loopIndex++;
        }
        
        requestAnimationFrame(gameFrame);
    }
    
    gameFrame();
    console.log('遊戲迴圈已啟動');
}

// 顯示遊戲訊息
function showGameMessage(message) {
    const gameWrapper = document.getElementById('gameWrapper');
    if (gameWrapper) {
        // 移除舊的訊息
        const oldMessage = gameWrapper.querySelector('.game-message');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // 創建新訊息
        const messageDiv = document.createElement('div');
        messageDiv.className = 'game-message';
        messageDiv.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #4f4;
            font-size: 14px;
            font-family: MicrosoftYahei, sans-serif;
            text-align: center;
            background: rgba(0,0,0,0.8);
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        messageDiv.innerHTML = message;
        gameWrapper.appendChild(messageDiv);
        
        // 3秒後自動移除訊息
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// 重新開始遊戲函數
function restartGame() {
    const endScreen = document.getElementById('endScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    
    if (endScreen && gameWrapper) {
        endScreen.style.display = 'none';
        gameWrapper.style.display = 'block';
        console.log('遊戲重新開始');
    }
}

// 回到主選單函數
function backToMenu() {
    const endScreen = document.getElementById('endScreen');
    const startScreen = document.getElementById('startScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    
    if (endScreen && startScreen && gameWrapper) {
        endScreen.style.display = 'none';
        gameWrapper.style.display = 'none';
        startScreen.style.display = 'flex';
        console.log('回到主選單');
    }
}

// 初始化畫面狀態
function initScreens() {
    console.log('初始化畫面狀態...');
    
    const startScreen = document.getElementById('startScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    const endScreen = document.getElementById('endScreen');
    
    if (startScreen && gameWrapper && endScreen) {
        startScreen.style.display = 'flex';
        gameWrapper.style.display = 'none';
        endScreen.style.display = 'none';
        console.log('畫面初始化完成');
    }
}

// 頁面載入完成後開始
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成');
    
    // 顯示載入指示器
    showLoadingIndicator();
    
    // 開始載入資源
    initResourcesWithCallback(function() {
        initGame();
    });
});
