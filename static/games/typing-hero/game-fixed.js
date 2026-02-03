// 修復版本的遊戲檔案
// 包含圖片載入修復和開始遊戲按鈕修復

console.log('載入修復版本的遊戲檔案...');

// 圖片路徑配置
const IMAGE_CONFIG = {
    basePath: './images/',
    images: {
        player: 'player.png',
        playerErr1: 'player_err1.png',
        playerErr2: 'player_err2.png',
        enemy1: 'enemy1.png',
        enemy2: 'enemy2.png',
        enemy3: 'enemy3.png',
        enemy4: 'enemy4.png',
        bomb1: 'bomb1.png',
        bomb2: 'bomb2.png',
        bomb3: 'bomb3.png',
        bomb4: 'bomb4.png',
        tail0: 'tail0.png',
        tail1: 'tail1.png',
        tail2: 'tail2.png',
        bullet: 'bullet.png',
        pause: 'pause.png',
        start: 'start.png',
        restart: 'restart.png',
        help: 'help.png',
        github: 'github.png',
        share: 'share.png'
    }
};

function getImagePath(imageName) {
    return IMAGE_CONFIG.basePath + IMAGE_CONFIG.images[imageName];
}

// 遊戲狀態管理
const Game = {
    canvas: null,
    ctx: null,
    player: null,
    enemys: [],
    bullets: [],
    addEnemyTime: 4000,
    isStop: true, // 初始狀態為停止
    isPause: false,
    bgMoveAni: null,
    loopIndex: 0
};

const Size = {
    gameWidth: 0,
    gameHeight: 0
};

// 圖片資源管理
let player_img, player_err_img, enemy_img, bullet_img, die_img, fire_img;

function getPlayerImg() {
    return player_img;
}

function getPlayerErrImg() {
    return player_err_img;
}

function getEnemyImg() {
    return enemy_img;
}

function getBulletImg() {
    return bullet_img;
}

function getDieImg() {
    return die_img;
}

function getFireImg() {
    return fire_img;
}

// 初始化圖片資源
function initResources(callback) {
    console.log('開始載入圖片資源...');
    
    let loadedImages = 0;
    const totalImages = 1 + 2 + 4 + 4 + 3 + 1; // player + player_err + enemy + die + fire + bullet
    
    function onImageLoad() {
        loadedImages++;
        console.log(`已載入 ${loadedImages}/${totalImages} 張圖片`);
        if (loadedImages === totalImages && callback) {
            console.log('所有圖片載入完成！');
            callback();
        }
    }
    
    function onImageError() {
        console.warn('圖片載入失敗，但繼續遊戲');
        onImageLoad(); // 即使載入失敗也計入載入完成
    }
    
    player_img = new Image();
    player_img.onload = onImageLoad;
    player_img.onerror = onImageError;
    player_img.src = getImagePath('player');
    
    player_err_img = new Array();
    for (let i = 0; i < 2; i++) {
        player_err_img[i] = new Image();
        player_err_img[i].onload = onImageLoad;
        player_err_img[i].onerror = onImageError;
        player_err_img[i].src = getImagePath(`playerErr${i + 1}`);
    }
    player_err_img[2] = player_err_img[1];
    player_err_img[3] = player_err_img[1];
    player_err_img[4] = player_err_img[1];
    player_err_img[5] = player_err_img[0];
    
    enemy_img = new Array();
    for (let i = 0; i < 4; i++) {
        enemy_img[i] = new Image();
        enemy_img[i].onload = onImageLoad;
        enemy_img[i].onerror = onImageError;
        enemy_img[i].src = getImagePath(`enemy${i + 1}`);
    }
    
    die_img = new Array();
    for (let i = 0; i < 4; i++) {
        die_img[i] = new Image();
        die_img[i].onload = onImageLoad;
        die_img[i].onerror = onImageError;
        die_img[i].src = getImagePath(`bomb${i + 1}`);
    }
    
    fire_img = new Array();
    for (let i = 0; i < 3; i++) {
        fire_img[i] = new Image();
        fire_img[i].onload = onImageLoad;
        fire_img[i].onerror = onImageError;
        fire_img[i].src = getImagePath(`tail${i}`);
    }
    fire_img[3] = fire_img[1];
    fire_img[4] = fire_img[0];
    
    bullet_img = new Image();
    bullet_img.onload = onImageLoad;
    bullet_img.onerror = onImageError;
    bullet_img.src = getImagePath('bullet');
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
            background: rgba(0,0,0,0.8);
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

// 初始化 Canvas
function initCanvas() {
    Game.canvas = document.getElementById('gameCanvas');
    setPos();
    Game.ctx = Game.canvas.getContext('2d');
    Game.ctx.fillStyle = '#fff';
    Game.ctx.textBaseline = 'middle';
    Game.ctx.textAlign = 'center';
}

function setPos() {
    const gameWrapper = document.getElementById('gameWrapper');
    Size.gameWidth = gameWrapper.offsetWidth;
    Size.gameHeight = window.innerHeight;
    
    const keyboard = document.getElementById('keyboard');
    if (keyboard && keyboard.style.display !== 'none') {
        Size.gameHeight -= keyboard.offsetHeight;
    }
    
    Game.canvas.width = Size.gameWidth;
    Game.canvas.height = Size.gameHeight;
}

// 簡化的玩家類別
class Player {
    constructor() {
        this.w = 51;
        this.h = 51;
        this.x = Size.gameWidth / 2;
        this.y = Size.gameHeight - this.h / 2 - 50;
        this.img = getPlayerImg();
        this.err_img = getPlayerErrImg();
        this.err_i = -1;
        this.isClear = false;
        this.clearIndex = 0;
        this.deg = 0;
    }
    
    draw() {
        if (this.isClear) {
            Game.ctx.fillStyle = '#fff';
            Game.ctx.fillRect(0, this.y - this.h / 2 - this.clearIndex, Size.gameWidth, 2);
        }
        
        Game.ctx.save();
        Game.ctx.translate(this.x, this.y);
        Game.ctx.rotate(this.deg);
        Game.ctx.translate(-this.x, -this.y);
        
        if (this.err_i > -1) {
            Game.ctx.drawImage(this.err_img[this.err_i], this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        } else {
            Game.ctx.drawImage(this.img, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        }
        
        Game.ctx.restore();
    }
    
    act() {
        if (this.err_i > -1) {
            this.err_i++;
            if (this.err_i >= this.err_img.length) {
                this.err_i = -1;
            }
        }
    }
    
    setErr() {
        this.err_i = 0;
    }
    
    clear() {
        this.isClear = true;
        this.clearIndex = 0;
        setTimeout(() => {
            this.isClear = false;
        }, 1000);
    }
    
    restart() {
        this.x = Size.gameWidth / 2;
        this.y = Size.gameHeight - this.h / 2 - 50;
        this.err_i = -1;
        this.isClear = false;
    }
}

// 簡化的敵機類別
class Enemy {
    constructor(x, y) {
        this.w = 33;
        this.h = 50;
        this.x = x || Math.random() * (Size.gameWidth - this.w);
        this.y = y || -this.h;
        this.speed = 1;
        this.img = getEnemyImg()[0];
        this.deg = 0;
        this.words = '測試';
        this.bopomofo = 'ㄘㄜˋ';
        this.hp = 2;
        this.isDie = false;
    }
    
    draw() {
        Game.ctx.save();
        Game.ctx.translate(this.x, this.y);
        Game.ctx.rotate(this.deg);
        Game.ctx.translate(-this.x, -this.y);
        
        Game.ctx.drawImage(this.img, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        
        Game.ctx.fillStyle = '#fff';
        Game.ctx.font = '12px MicrosoftYahei';
        Game.ctx.fillText(this.words, this.x, this.y - this.h / 2 - 8);
        
        Game.ctx.restore();
    }
    
    act() {
        this.y += this.speed;
        if (this.y > Size.gameHeight) {
            this.y = -this.h;
            this.x = Math.random() * (Size.gameWidth - this.w);
        }
    }
}

// 遊戲迴圈
function gameFrame() {
    if (!Game.isStop && !Game.isPause) {
        Game.ctx.clearRect(0, 0, Size.gameWidth, Size.gameHeight);
        
        // 繪製背景
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect(0, 0, Size.gameWidth, Size.gameHeight);
        
        // 更新和繪製玩家
        if (Game.player) {
            Game.player.act();
            Game.player.draw();
        }
        
        // 更新和繪製敵機
        Game.enemys.forEach(enemy => {
            enemy.act();
            enemy.draw();
        });
        
        // 更新和繪製子彈
        Game.bullets.forEach(bullet => {
            bullet.act();
            bullet.draw();
        });
    }
    
    Game.loopIndex++;
}

// 開始遊戲迴圈
const startGameLoop = window.requestAnimationFrame ? () => {
    gameFrame();
    requestAnimationFrame(startGameLoop);
} : () => {
    setInterval(gameFrame, 16);
};

// 生成敵機
function geneEnemy() {
    if (Game.enemys.length === 0) {
        Game.enemys.push(new Enemy());
    }
    
    setInterval(() => {
        if (!Game.isStop && !Game.isPause && Game.enemys.length < 5) {
            Game.enemys.push(new Enemy());
        }
    }, Game.addEnemyTime);
}

// 重新開始遊戲
function restart() {
    Game.isStop = false;
    Game.isPause = false;
    Game.loopIndex = 0;
    Game.enemys = [];
    Game.bullets = [];
    
    if (Game.player) {
        Game.player.restart();
    }
}

// 開始遊戲函數
function startGame() {
    console.log('開始遊戲...');
    const startScreen = document.getElementById('startScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    
    if (startScreen && gameWrapper) {
        startScreen.style.display = 'none';
        gameWrapper.style.display = 'block';
        
        restart();
        
        console.log('遊戲已開始');
    }
}

// 重新開始遊戲函數
function restartGame() {
    const endScreen = document.getElementById('endScreen');
    const gameWrapper = document.getElementById('gameWrapper');
    
    if (endScreen && gameWrapper) {
        endScreen.style.display = 'none';
        gameWrapper.style.display = 'block';
        restart();
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
        Game.isStop = true;
    }
}

// 初始化遊戲
function initGame() {
    console.log('初始化遊戲...');
    
    initCanvas();
    initScreens();
    
    // 顯示載入指示器
    showLoadingIndicator();
    
    // 初始化資源並等待載入完成
    initResources(function() {
        hideLoadingIndicator();
        
        // 初始化遊戲物件
        Game.player = new Player();
        Game.enemys = [];
        Game.bullets = [];
        
        // 設定按鈕事件
        const startGameBtn = document.getElementById('startGameBtn');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', startGame);
        }
        
        const restartGameBtn = document.getElementById('restartGameBtn');
        if (restartGameBtn) {
            restartGameBtn.addEventListener('click', restartGame);
        }
        
        const backToMenuBtn = document.getElementById('backToMenuBtn');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', backToMenu);
        }
        
        // 開始遊戲迴圈
        startGameLoop();
        
        // 開始生成敵機
        geneEnemy();
        
        console.log('遊戲初始化完成！');
    });
}

// 頁面載入完成後初始化遊戲
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始初始化遊戲...');
    initGame();
});
