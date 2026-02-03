// 簡單開始畫面管理
document.addEventListener('DOMContentLoaded', function() {
    
    const startScreen = document.getElementById('startScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    
    if (startScreen && gameWrapper) {
        // 確保開始畫面顯示
        startScreen.style.display = 'flex';
        gameWrapper.style.display = 'none';
        
        // 設定開始遊戲按鈕事件
        const startGameBtn = document.getElementById('startGameBtn');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', function() {
                
                // 隱藏開始畫面，顯示遊戲畫面
                if (startScreen && gameWrapper) {
                    startScreen.style.display = 'none';
                    gameWrapper.style.display = 'block';
                    
                    // 等待 DOM 更新後修復遊戲
                    setTimeout(() => {
                        const canvas = document.getElementById('gameCanvas');
                        if (canvas) {
                            // 獲取正確的容器尺寸
                            const gameWrapperWidth = gameWrapper.offsetWidth;
                            const gameWrapperHeight = 911; // 固定高度
                            
                            // 重新設定 Canvas 尺寸
                            canvas.width = gameWrapperWidth;
                            canvas.height = gameWrapperHeight;
                            
                            // 設定遊戲尺寸
                            if (typeof g !== 'undefined') {
                                g.gameWidth = gameWrapperWidth;
                                g.gameHeight = gameWrapperHeight;
                            } else {
                                window.g = window.g || {};
                                window.g.gameWidth = gameWrapperWidth;
                                window.g.gameHeight = gameWrapperHeight;
                            }
                            
                            // 觸發遊戲重新初始化
                            
                            // 調用 window.V() 重新計算 Canvas 尺寸
                            if (typeof window.V === 'function') {
                                window.V();
                            }
                            
                            // 觸發 resize 事件來重新定位玩家和敵機
                            setTimeout(() => {
                                window.dispatchEvent(new Event('resize'));
                                console.log('已觸發 resize 事件');
                            }, 100);
                        }
                    }, 10);
                }
            });
            console.log('開始遊戲按鈕事件已設定');
        }
        
        // 設定重新開始按鈕事件
        const restartGameBtn = document.getElementById('restartGameBtn');
        if (restartGameBtn) {
            restartGameBtn.addEventListener('click', function() {
                console.log('重新開始按鈕被點擊 - 刷新頁面');
                // 直接刷新頁面，最簡單直接的方法！
                window.location.reload();
            });
            console.log('重新開始按鈕事件已設定');
        }
        
        // 設定查看排行榜按鈕事件
        const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
        if (viewLeaderboardBtn) {
            viewLeaderboardBtn.addEventListener('click', function() {
                console.log('查看排行榜按鈕被點擊');
                
                // 檢查是否在iframe中
                if (window.parent && window.parent !== window) {
                    // 在iframe中，發送訊息給父視窗
                    window.parent.postMessage('viewLeaderboard', '*');
                } else {
                    // 不在iframe中，直接跳轉到排行榜
                    window.location.href = '/new-leaderboard?game_type=typing_hero&scope=class';
                }
            });
            console.log('查看排行榜按鈕事件已設定');
        }
        
        // 設定返回教室按鈕事件
        const backToMenuBtn = document.getElementById('backToMenuBtn');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', function() {
                console.log('返回教室按鈕被點擊');
                
                // 發送訊息給父視窗，要求返回教室
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage('goBack', '*');
                } else {
                    // 如果不在iframe中，直接返回上一頁
                    window.history.back();
                }
            });
            console.log('返回教室按鈕事件已設定');
        }
        
        console.log('簡單開始畫面設定完成');
    }
    
    // 提交分數到排行榜的函數
    function submitScoreToLeaderboard(score, playTime) {
        console.log('準備提交分數:', { score, playTime });
        
        // 驗證分數數據
        if (!score || score <= 0) {
            console.log('❌ 分數無效，跳過提交:', score);
            return;
        }
        
        if (!playTime || playTime <= 0) {
            console.log('❌ 遊戲時間無效，跳過提交:', playTime);
            return;
        }
        
        // 創建表單數據
        const formData = new FormData();
        formData.append('game_type', 'typing_hero');
        formData.append('score', score);
        formData.append('play_time', playTime);
        
        console.log('提交表單數據:', {
            game_type: 'typing_hero',
            score: score,
            play_time: playTime
        });
        
        // 提交到後端API
        fetch('/api/games/submit-score', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('API響應狀態:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('分數提交結果:', data);
            if (data.status === 'success') {
                console.log('✅ 分數提交成功');
                showScoreSubmitMessage('分數已成功提交到排行榜！', 'success');
            } else {
                console.log('❌ 分數提交失敗:', data.message);
                showScoreSubmitMessage('分數提交失敗: ' + data.message, 'error');
            }
        })
        .catch(error => {
            console.error('❌ 分數提交錯誤:', error);
            showScoreSubmitMessage('網路錯誤，分數提交失敗: ' + error.message, 'error');
        });
    }
    
    // 顯示分數提交訊息
    function showScoreSubmitMessage(message, type) {
        // 創建提示元素
        const messageEl = document.createElement('div');
        messageEl.className = `score-submit-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
        `;
        
        // 根據類型設定背景色
        if (type === 'success') {
            messageEl.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        } else {
            messageEl.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
        }
        
        // 添加動畫樣式
        if (!document.getElementById('scoreSubmitMessageStyle')) {
            const style = document.createElement('style');
            style.id = 'scoreSubmitMessageStyle';
            style.textContent = `
                @keyframes slideInRight {
                    from { 
                        transform: translateX(100%); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 添加到頁面
        document.body.appendChild(messageEl);
        
        // 3秒後自動移除
        setTimeout(() => {
            messageEl.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
    
    // 監聽遊戲結束事件
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'gameEnd') {
            console.log('收到遊戲結束事件:', event.data);
            const { score, playTime } = event.data;
            if (score !== undefined && playTime !== undefined) {
                submitScoreToLeaderboard(score, playTime);
            }
        }
    });
    
    // 修復 onresize 事件，確保調整視窗大小時也能正確設定遊戲尺寸
    const originalOnResize = window.onresize;
    window.onresize = function(event) {
        console.log('視窗大小調整事件觸發');

        // 調用原始的 onresize 函數
        if (originalOnResize) {
            originalOnResize(event);
        }

        // 確保遊戲尺寸正確設定
        setTimeout(() => {
            const gameWrapper = document.getElementById('gameWrapper');
            const canvas = document.getElementById('gameCanvas');

            if (gameWrapper && canvas && gameWrapper.style.display !== 'none') {
                const gameWrapperWidth = gameWrapper.offsetWidth;
                const gameWrapperHeight = 911; // 固定高度

                console.log('onresize 修復遊戲尺寸:', gameWrapperWidth, 'x', gameWrapperHeight);

                // 更新 Canvas 尺寸
                canvas.width = gameWrapperWidth;
                canvas.height = gameWrapperHeight;

                // 更新遊戲尺寸變數
                if (typeof g !== 'undefined') {
                    g.gameWidth = gameWrapperWidth;
                    g.gameHeight = gameWrapperHeight;
                } else if (window.g) {
                    window.g.gameWidth = gameWrapperWidth;
                    window.g.gameHeight = gameWrapperHeight;
                }
            }
        }, 10);
    };
    
    console.log('onresize 事件修復完成');
});