// 修復圖片載入時機問題的版本
// 基於原始的 game.min.js，只修復圖片載入等待機制

console.log('載入修復圖片載入時機的遊戲檔案...');

// 複製原始的 game.min.js 內容，但修復圖片載入部分
// 由於原始檔案太大，我將創建一個補丁檔案來修復載入問題

// 圖片載入管理器
const ImageLoader = {
    images: {},
    loadedCount: 0,
    totalCount: 0,
    onAllLoaded: null,
    
    loadImage(name, src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                this.loadedCount++;
                console.log(`圖片載入完成: ${name} (${this.loadedCount}/${this.totalCount})`);
                
                if (this.loadedCount === this.totalCount && this.onAllLoaded) {
                    this.onAllLoaded();
                }
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`圖片載入失敗: ${name}`);
                this.loadedCount++;
                if (this.loadedCount === this.totalCount && this.onAllLoaded) {
                    this.onAllLoaded();
                }
                reject(new Error(`Failed to load image: ${name}`));
            };
            img.src = src;
        });
    },
    
    async loadAllImages() {
        console.log('開始載入所有圖片...');
        
        const imageList = [
            { name: 'player', src: './images/player.png' },
            { name: 'player_err1', src: './images/player_err1.png' },
            { name: 'player_err2', src: './images/player_err2.png' },
            { name: 'enemy1', src: './images/enemy1.png' },
            { name: 'enemy2', src: './images/enemy2.png' },
            { name: 'enemy3', src: './images/enemy3.png' },
            { name: 'enemy4', src: './images/enemy4.png' },
            { name: 'bomb1', src: './images/bomb1.png' },
            { name: 'bomb2', src: './images/bomb2.png' },
            { name: 'bomb3', src: './images/bomb3.png' },
            { name: 'bomb4', src: './images/bomb4.png' },
            { name: 'tail0', src: './images/tail0.png' },
            { name: 'tail1', src: './images/tail1.png' },
            { name: 'tail2', src: './images/tail2.png' },
            { name: 'bullet', src: './images/bullet.png' }
        ];
        
        this.totalCount = imageList.length;
        
        try {
            await Promise.all(imageList.map(img => this.loadImage(img.name, img.src)));
            console.log('所有圖片載入完成！');
        } catch (error) {
            console.warn('部分圖片載入失敗，但繼續遊戲:', error);
        }
    }
};

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
            background: rgba(0,0,0,0.8);
            padding: 20px;
            border-radius: 10px;
        `;
        loadingDiv.innerHTML = '載入圖片中...';
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

// 修復後的初始化函數
function initGameWithFixedLoading() {
    console.log('使用修復的載入機制初始化遊戲...');
    
    // 顯示載入指示器
    showLoadingIndicator();
    
    // 載入所有圖片
    ImageLoader.onAllLoaded = function() {
        console.log('圖片載入完成，開始初始化遊戲...');
        hideLoadingIndicator();
        
        // 現在載入原始的遊戲檔案
        loadOriginalGame();
    };
    
    ImageLoader.loadAllImages();
}

// 載入原始遊戲檔案
function loadOriginalGame() {
    // 創建 script 標籤載入原始遊戲檔案
    const script = document.createElement('script');
    script.src = './game.min.js';
    script.onload = function() {
        console.log('原始遊戲檔案載入完成');
    };
    script.onerror = function() {
        console.error('原始遊戲檔案載入失敗');
    };
    document.head.appendChild(script);
}

// 頁面載入完成後開始初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始修復的初始化流程...');
    
    // 延遲一下確保所有元素都已載入
    setTimeout(() => {
        initGameWithFixedLoading();
    }, 100);
});
