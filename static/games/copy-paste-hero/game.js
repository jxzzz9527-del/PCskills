// 複製貼上英雄遊戲邏輯
class CopyPasteHero {
    constructor() {
        this.currentStage = 0;
        this.stageScores = [0, 0.5, 0.5, 0];
        this.timers = [];
        this.gameData = {
            stage1: {
                texts: [
                    // 水果類
                    "紅蘋果", "黃香蕉", "綠橘子", "紫葡萄", "大西瓜", "甜草莓", "香鳳梨", "熟芒果",
                    "水蜜桃", "奇異果", "火龍果", "百香果", "櫻桃", "藍莓", "覆盆子", "無花果",
                    // 動物類
                    "小貓咪", "大狗狗", "花蝴蝶", "綠青蛙", "紅金魚", "白鴿子", "黑烏鴉", "灰松鼠",
                    "棕熊貓", "粉兔子", "藍鯨魚", "黃蜜蜂", "紫章魚", "橙老虎", "綠蜥蜴", "紅鸚鵡",
                    // 顏色類
                    "深紅色", "淺藍色", "亮黃色", "暗綠色", "淡紫色", "濃橙色", "柔粉色", "純白色",
                    "墨黑色", "銀灰色", "金黃色", "銅棕色", "青綠色", "紫羅蘭", "珊瑚色", "薄荷綠",
                    // 英文單字
                    "Hello", "World", "Happy", "Smile", "Dream", "Peace", "Love", "Hope",
                    "Music", "Dance", "Magic", "Light", "Star", "Moon", "Sun", "Sky",
                    // 數字類
                    "一二三", "四五六", "七八九", "十百千", "萬億兆", "零點五", "三分之二", "百分之百",
                    // 食物類
                    "白米飯", "紅燒肉", "清蒸魚", "炒青菜", "湯麵條", "炸雞塊", "烤麵包", "煮雞蛋",
                    "巧克力", "冰淇淋", "蛋糕", "餅乾", "糖果", "果汁", "牛奶", "咖啡"
                ]
            },
            stage2: {
                colors: [
                    { text: "紅色", color: "red" },
                    { text: "藍色", color: "blue" },
                    { text: "綠色", color: "green" },
                    { text: "黃色", color: "yellow" },
                    { text: "紫色", color: "purple" },
                    { text: "橙色", color: "orange" },
                    { text: "粉色", color: "pink" },
                    { text: "黑色", color: "black" },
                    { text: "白色", color: "white" },
                    { text: "灰色", color: "gray" },
                    { text: "棕色", color: "brown" },
                    { text: "青色", color: "cyan" }
                ]
            },
            stage3: {
                correct: [
                    "2×3=6", "4×5=20", "6×7=42", "8×9=72", "3×4=12",
                    "5×6=30", "7×8=56", "9×2=18", "1×9=9", "4×7=28"
                ],
                incorrect: [
                    "2×3=7", "4×5=19", "6×7=43", "8×9=71", "3×4=13",
                    "5×6=31", "7×8=57", "9×2=17", "1×9=8", "4×7=29"
                ]
            },
            stage4: {
                short: [
                    "複製貼上",
                    "Hello World",
                    "快速打字",
                    "電腦操作",
                    "快捷鍵",
                    "練習遊戲",
                    "學習技能",
                    "提高效率"
                ],
                medium: [
                    "複製貼上快捷鍵練習",
                    "快速使用 Ctrl+C 和 Ctrl+V",
                    "提高電腦操作效率",
                    "練習反白選取和貼上",
                    "學習基本電腦技能",
                    "掌握複製貼上技巧",
                    "提升工作效率的方法",
                    "電腦操作基礎練習"
                ],
                long: [
                    "複製貼上快捷鍵練習遊戲，提高工作效率",
                    "學習使用 Ctrl+C 複製和 Ctrl+V 貼上的基本技能",
                    "通過遊戲方式練習反白選取文本並快速貼上",
                    "掌握電腦操作的基本技巧，提升日常工作效率",
                    "練習複製貼上技能，讓電腦操作更加熟練和快速",
                    "學習基本的電腦操作技能，包括文本選取和複製貼上",
                    "通過有趣的遊戲練習，掌握複製貼上的快捷鍵操作",
                    "提高電腦操作效率，學習使用複製貼上的基本技能"
                ]
            }
        };
        
        // ESC鍵快速結束遊戲
        this.setupEscKeyListener();
        
        // 記錄遊戲開始時間
        this.gameStartTime = Date.now();
    }

    // 開始遊戲
    startGame() {
        this.currentStage = 1;
        this.stageScores = [0, 0.5, 0.5, 0];
        
        // 設置第一階段轉換信息
        this.setTransitionInfo(1);
        
        // 開始布幕閉合效果
        this.closeCurtains(() => {
            // 布幕閉合後，開始倒數計時
            this.startCountdownOverlay(() => {
                // 倒數結束後，打開布幕並開始第一階段
                this.openCurtains(() => {
                    this.showStage(1);
                    this.setupStage1();
                });
            });
        });
    }
    
    // 設置ESC鍵監聽器
    setupEscKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentStage > 0) {
                console.log('ESC鍵被按下，快速結束遊戲');
                this.quickEndGame();
            }
        });
    }
    
    // 快速結束遊戲
    quickEndGame() {
        // 清除所有計時器
        this.timers.forEach(timer => clearInterval(timer));
        this.timers = [];
        
        // 設置當前階段為結束
        this.currentStage = 5;
        
        // 顯示最終分數
        this.showFinalScore();
    }

    // 顯示指定階段
    showStage(stage) {
        // 隱藏所有階段
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('stage1').classList.add('hidden');
        document.getElementById('stage2').classList.add('hidden');
        document.getElementById('stage3').classList.add('hidden');
        document.getElementById('stage4').classList.add('hidden');
        document.getElementById('stageTransition').classList.add('hidden');
        document.getElementById('finalScore').classList.add('hidden');

        // 顯示指定階段
        if (stage === 'start') {
            document.getElementById('startScreen').classList.remove('hidden');
        } else if (stage === 'transition') {
            document.getElementById('stageTransition').classList.remove('hidden');
        } else if (stage === 'final') {
            document.getElementById('finalScore').classList.remove('hidden');
        } else if (typeof stage === 'number' && stage >= 1 && stage <= 4) {
            document.getElementById(`stage${stage}`).classList.remove('hidden');
        } else {
            console.error('無效的階段參數:', stage);
        }
    }

    // 設置第一階段
    setupStage1() {
        const allTexts = this.gameData.stage1.texts;
        const textDisplay = document.getElementById('stage1Text');
        const inputArea = document.getElementById('stage1Inputs');

        // 隨機選擇8個文本
        const shuffledTexts = [...allTexts].sort(() => Math.random() - 0.5).slice(0, 8);

        // 生成文本顯示 - 使用新的樣式
        textDisplay.innerHTML = shuffledTexts.map(text => 
            `<div class="text-item">${text}</div>`
        ).join('');

        // 生成輸入框 - 使用新的樣式
        inputArea.innerHTML = '';
        shuffledTexts.forEach((text, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'input-box';
            input.placeholder = '';
            input.dataset.expected = text;
            // 預設為紅色狀態
            input.classList.add('incorrect');
            inputArea.appendChild(input);
        });

        // 設置輸入框事件監聽
        this.setupInputListeners('stage1');
        
        // 開始計時
        this.startTimer(1, 12);
    }

    // 設置第二階段（顏色檢測）
    setupStage2() {
        const colors = this.gameData.stage2.colors;
        const textDisplay = document.getElementById('stage2Text');
        const inputArea = document.getElementById('stage2Inputs');

        // 隨機選擇8個正確顏色
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 8);
        
        // 隨機選擇一個錯誤顏色（文字與顏色不匹配）
        const wrongColorIndex = Math.floor(Math.random() * shuffledColors.length);
        const wrongColorText = shuffledColors[wrongColorIndex].text;
        
        // 確保錯誤顏色與文字不匹配
        let wrongColorColor;
        do {
            wrongColorColor = colors[Math.floor(Math.random() * colors.length)].color;
        } while (wrongColorColor === shuffledColors[wrongColorIndex].color);
        
        // 創建9個顏色項目，其中一個是錯誤的
        const allColors = shuffledColors.map((color, index) => {
            if (index === wrongColorIndex) {
                // 這個是錯誤的：文字與顏色不匹配
                return {
                    text: color.text,
                    color: wrongColorColor,
                    isWrong: true
                };
            } else {
                // 這個是正確的：文字與顏色匹配
                return {
                    text: color.text,
                    color: color.color,
                    isWrong: false
                };
            }
        });
        
        // 添加第9個正確的顏色
        const additionalColor = colors[Math.floor(Math.random() * colors.length)];
        allColors.push({
            text: additionalColor.text,
            color: additionalColor.color,
            isWrong: false
        });
        
        // 打亂順序
        allColors.sort(() => Math.random() - 0.5);
        
        // 生成文本顯示 - 使用新的樣式，字體顏色設定為該顏色
        textDisplay.innerHTML = allColors.map(color => 
            `<div class="text-item" style="color: ${color.color};">${color.text}</div>`
        ).join('');

        // 調試信息
        console.log('第二階段錯誤顏色:', wrongColorText, '應該貼上的文字');
        console.log('錯誤項目的文字:', shuffledColors[wrongColorIndex].text, '原本顏色:', shuffledColors[wrongColorIndex].color, '錯誤顏色:', wrongColorColor);
        console.log('所有顏色項目:', allColors);

        // 生成輸入框 - 使用新的樣式
        inputArea.innerHTML = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-box';
        input.placeholder = '貼上錯誤的顏色';
        input.dataset.expected = wrongColorText;
        inputArea.appendChild(input);

        // 設置輸入框事件監聽
        this.setupInputListeners('stage2');
        
        // 開始計時
        this.startTimer(2, 7);
    }

    // 設置第三階段（九九乘法錯誤檢測）
    setupStage3() {
        const correct = this.gameData.stage3.correct;
        const incorrect = this.gameData.stage3.incorrect;
        const textDisplay = document.getElementById('stage3Text');
        const inputArea = document.getElementById('stage3Inputs');

        // 隨機選擇8個正確算式和1個錯誤算式
        const shuffledCorrect = [...correct].sort(() => Math.random() - 0.5).slice(0, 8);
        const randomIncorrect = incorrect[Math.floor(Math.random() * incorrect.length)];
        
        // 混合9個算式
        const allEquations = [...shuffledCorrect, randomIncorrect].sort(() => Math.random() - 0.5);
        
        // 生成文本顯示 - 使用新的樣式
        textDisplay.innerHTML = allEquations.map(eq => 
            `<div class="text-item">${eq}</div>`
        ).join('');

        // 生成輸入框 - 使用新的樣式
        inputArea.innerHTML = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-box incorrect';
        input.placeholder = '貼上錯誤的算式';
        input.dataset.expected = randomIncorrect;
        inputArea.appendChild(input);

        // 設置輸入框事件監聽
        this.setupInputListeners('stage3');
        
        // 開始計時
        this.startTimer(3, 7);
    }

    // 設置第四階段（文本重複貼上）
    setupStage4() {
        const texts = this.gameData.stage4;
        const textDisplay = document.getElementById('stage4Text');
        const inputArea = document.getElementById('stage4Inputs');

        // 隨機選擇文本長度
        const textTypes = ['short', 'medium', 'long'];
        const selectedType = textTypes[Math.floor(Math.random() * textTypes.length)];
        
        // 從選定的類型中隨機選擇一個文本
        const textArray = texts[selectedType];
        const selectedText = textArray[Math.floor(Math.random() * textArray.length)];

        // 生成文本顯示 - 使用新的樣式
        textDisplay.innerHTML = `
            <div class="text-item">
                ${selectedText}
            </div>
        `;

        // 生成單個輸入框 - 使用新的樣式
        inputArea.innerHTML = '';
        const input = document.createElement('textarea');
        input.className = 'input-box';
        input.placeholder = '在這裡重複貼上文本...';
        input.dataset.expected = selectedText;
        input.id = 'stage4Input';
        inputArea.appendChild(input);

        // 設置輸入框事件監聽
        this.setupInputListeners('stage4');
        
        // 額外為第四階段的textarea設置事件監聽
        input.addEventListener('input', (e) => {
            this.checkInput(e.target, 'stage4');
        });
        
        // 開始計時
        this.startTimer(4, 8);
    }

    // 設置輸入框事件監聽
    setupInputListeners(stage) {
        const inputs = document.querySelectorAll(`#${stage}Inputs .input-box`);
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.checkInput(e.target, stage);
            });
        });
    }
    
    // 檢查輸入
    checkInput(input, stage) {
        const expected = input.dataset.expected;
        const actual = input.value.trim();

        if (stage === 'stage4') {
            // 第四階段：計算文本出現次數
            // 轉義特殊字符，避免正則表達式錯誤
            const escapedExpected = expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const count = (actual.match(new RegExp(escapedExpected, 'g')) || []).length;
            
            // 更新分數
            this.stageScores[3] = count;
            document.getElementById('score4').textContent = this.stageScores[3];
            
            // 調試信息
            console.log('第四階段得分:', count, '預期文本:', expected, '實際輸入:', actual);
            
            // 視覺反饋
            if (count > 0) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else if (actual !== '') {
                input.classList.remove('correct');
                input.classList.add('incorrect');
            } else {
                input.classList.remove('correct');
                input.classList.remove('incorrect');
            }
        } else if (stage === 'stage3') {
            // 第三階段：檢查是否為錯誤算式，設置得分係數
            if (actual === expected) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
                // 答對設置為1
                this.stageScores[2] = 1;
            } else if (actual !== '') {
                input.classList.remove('correct');
                input.classList.add('incorrect');
                // 答錯設置為0.5
                this.stageScores[2] = 0.5;
            } else {
                input.classList.remove('correct');
                input.classList.remove('incorrect');
                // 未答題設置為0.5
                this.stageScores[2] = 0.5;
            }
        } else if (stage === 'stage1') {
            // 第一階段：檢查完全匹配
            if (actual === expected) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
                input.disabled = true;
                this.stageScores[0]++;
                document.getElementById('score1').textContent = this.stageScores[0];
            } else if (actual !== '') {
                input.classList.remove('correct');
                input.classList.add('incorrect');
            } else {
                input.classList.remove('correct');
                input.classList.remove('incorrect');
            }
        } else if (stage === 'stage2') {
            // 第二階段：檢查是否為錯誤顏色，設置得分係數
            if (actual === expected) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
                // 答對設置為1
                this.stageScores[1] = 1;
            } else if (actual !== '') {
                input.classList.remove('correct');
                input.classList.add('incorrect');
                // 答錯設置為0.5
                this.stageScores[1] = 0.5;
            } else {
                input.classList.remove('correct');
                input.classList.remove('incorrect');
                // 未答題設置為0.5
                this.stageScores[1] = 0.5;
            }
        }
    }

    // 開始計時器
    startTimer(stage, seconds) {
        const timerElement = document.getElementById(`timer${stage}`);
        let timeLeft = seconds;

        const timer = setInterval(() => {
            timerElement.textContent = timeLeft;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timer);
                this.endStage(stage);
            }
        }, 1000);

        this.timers.push(timer);
    }

    // 結束階段
    endStage(stage) {
        // 清除所有計時器
        this.timers.forEach(timer => clearInterval(timer));
        this.timers = [];

        if (stage < 4) {
            // 顯示階段轉換
            this.showStage('transition');
            this.startTransitionCountdown(stage + 1);
        } else {
            // 遊戲結束
            this.showFinalScore();
        }
    }

    // 開始轉換倒計時
    startTransitionCountdown(nextStage) {
        // 設置轉換標題和說明
        this.setTransitionInfo(nextStage);
        
        // 開始布幕閉合效果
        this.closeCurtains(() => {
            // 布幕閉合後，開始倒數計時
            this.startCountdownOverlay(() => {
                // 倒數結束後，打開布幕並開始下一階段
                this.openCurtains(() => {
                    this.currentStage = nextStage;
                    this.showStage(nextStage);
                    
                    if (nextStage === 2) {
                        this.setupStage2();
                    } else if (nextStage === 3) {
                        this.setupStage3();
                    } else if (nextStage === 4) {
                        this.setupStage4();
                    }
                });
            });
        });
    }

    // 設置轉換信息
    setTransitionInfo(nextStage) {
        const titleElement = document.getElementById('transitionTitle');
        const infoElement = document.getElementById('transitionInfo');
        
        if (nextStage === 1) {
            titleElement.textContent = '準備第一階段';
            infoElement.textContent = '對稱文本複製 - 將上方文本複製到對應輸入框';
        } else if (nextStage === 2) {
            titleElement.textContent = '準備第二階段';
            infoElement.textContent = '顏色錯誤檢測 - 找出錯誤的顏色';
        } else if (nextStage === 3) {
            titleElement.textContent = '準備第三階段';
            infoElement.textContent = '九九乘法錯誤檢測 - 找出錯誤的算式';
        } else if (nextStage === 4) {
            titleElement.textContent = '準備第四階段';
            infoElement.textContent = '文本重複貼上 - 看你能貼幾次';
        }
    }

    // 布幕閉合效果
    closeCurtains(callback) {
        const leftCurtain = document.getElementById('curtainLeft');
        const rightCurtain = document.getElementById('curtainRight');
        
        leftCurtain.classList.remove('opening');
        rightCurtain.classList.remove('opening');
        leftCurtain.classList.add('closing');
        rightCurtain.classList.add('closing');
        
        setTimeout(callback, 800); // 等待布幕閉合動畫完成
    }

    // 布幕打開效果
    openCurtains(callback) {
        const leftCurtain = document.getElementById('curtainLeft');
        const rightCurtain = document.getElementById('curtainRight');
        
        leftCurtain.classList.remove('closing');
        rightCurtain.classList.remove('closing');
        leftCurtain.classList.add('opening');
        rightCurtain.classList.add('opening');
        
        // 布幕開始拉開就執行回調，不用等待完全拉開
        setTimeout(callback, 200);
    }

    // 倒數計時覆蓋層
    startCountdownOverlay(callback) {
        const overlay = document.getElementById('countdownOverlay');
        const numberElement = document.getElementById('countdownNumber');
        
        overlay.classList.add('show');
        let timeLeft = 3;
        
        // 立即顯示第一個數字並觸發動畫
        this.showCountdownNumber(numberElement, timeLeft);
        
        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                this.showCountdownNumber(numberElement, timeLeft);
            } else {
                clearInterval(countdown);
                overlay.classList.remove('show');
                callback();
            }
        }, 1000);
    }

    // 顯示倒數數字並觸發動畫
    showCountdownNumber(element, number) {
        element.textContent = number;
        // 移除動畫類別
        element.style.animation = 'none';
        // 強制重排
        element.offsetHeight;
        // 重新添加動畫
        element.style.animation = 'countdownPulse 1s ease-in-out';
    }

    // 顯示最終分數
    showFinalScore() {
        // 新的總分計算機制：
        // 第一階段：0~2題0.5，之後每多一題加0.25，8題全對2
        // 第二階段：沒填、填錯都是0.5，答對是1
        // 第三階段：沒填、填錯都是0.5，答對是1
        // 第四階段：直接使用得分
        // 總分 = 第一階段係數 × 第二階段係數 × 第三階段係數 × 第四階段得分
        
        const stage1CorrectCount = this.stageScores[0]; // 第一階段正確題數
        let stage1Coefficient;
        if (stage1CorrectCount <= 2) {
            stage1Coefficient = 0.5;
        } else {
            stage1Coefficient = 0.5 + (stage1CorrectCount - 2) * 0.25;
        }
        
        const stage2Coefficient = this.stageScores[1]; // 第二階段係數(1或0.5)
        const stage3Coefficient = this.stageScores[2]; // 第三階段係數(1或0.5)
        const stage4Score = this.stageScores[3]; // 第四階段得分
        
        const totalScore = Math.round(Math.max(1, stage4Score) * stage1Coefficient * stage2Coefficient * stage3Coefficient);
        document.getElementById('totalScore').textContent = totalScore;
        
        // 調試信息
        console.log('各階段分數:', this.stageScores);
        console.log('第一階段正確題數:', stage1CorrectCount, '係數:', stage1Coefficient);
        console.log('第二階段係數:', stage2Coefficient);
        console.log('第三階段係數:', stage3Coefficient);
        console.log('第四階段得分:', stage4Score);
        console.log('總分計算:', Math.max(1, stage4Score), '×', stage1Coefficient, '×', stage2Coefficient, '×', stage3Coefficient, '=', totalScore);
        
        // 設置按鈕事件監聽器
        this.setupFinalScoreButtons();
        
        // 獲取並顯示個人最高分
        this.fetchAndDisplayPersonalBest(totalScore);
        
        // 提交分數到排行榜
        this.submitScoreToLeaderboard(totalScore);
        
        this.showStage('final');
    }

    // 獲取並顯示個人最高分
    async fetchAndDisplayPersonalBest(currentScore) {
        try {
            // 獲取個人最高分
            const response = await fetch('/api/games/personal-best?game_type=copy_paste_hero');
            const data = await response.json();
            
            let personalBest = 0;
            if (data.status === 'success' && data.personal_best) {
                personalBest = data.personal_best;
            }
            
            // 更新個人最高分顯示
            this.updatePersonalBestDisplay(currentScore, personalBest);
            
        } catch (error) {
            console.log('獲取個人最高分失敗:', error);
            // 如果獲取失敗，只顯示當前分數
            this.updatePersonalBestDisplay(currentScore, 0);
        }
    }
    
    // 更新個人最高分顯示
    updatePersonalBestDisplay(currentScore, personalBest) {
        const personalBestElement = document.getElementById('personalBest');
        if (personalBestElement) {
            if (currentScore > personalBest) {
                // 新紀錄！
                personalBestElement.innerHTML = `
                    <div style="color: #ffd700; font-weight: bold; font-size: 1.2em;">
                        🎉 新紀錄！個人最高分: ${currentScore}
                    </div>
                `;
            } else {
                // 顯示個人最高分
                personalBestElement.innerHTML = `
                    <div style="color: #4CAF50; font-weight: bold;">
                        個人最高分: ${personalBest}
                    </div>
                `;
            }
        }
    }

    // 設置最終分數畫面的按鈕事件監聽器
    setupFinalScoreButtons() {
        // 查看排行榜按鈕
        const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
        if (viewLeaderboardBtn) {
            viewLeaderboardBtn.addEventListener('click', () => {
                console.log('查看排行榜按鈕被點擊');
                
                // 檢查是否在iframe中
                if (window.parent && window.parent !== window) {
                    // 在iframe中，發送訊息給父視窗
                    window.parent.postMessage('viewLeaderboard', '*');
                } else {
                    // 不在iframe中，直接跳轉到排行榜
                    window.location.href = '/new-leaderboard?game_type=copy_paste_hero&scope=class';
                }
            });
        }
        
        // 返回教室按鈕
        const backToClassroomBtn = document.getElementById('backToClassroomBtn');
        if (backToClassroomBtn) {
            backToClassroomBtn.addEventListener('click', () => {
                console.log('返回教室按鈕被點擊');
                
                // 檢查是否在iframe中
                if (window.parent && window.parent !== window) {
                    // 在iframe中，發送訊息給父視窗
                    window.parent.postMessage('goBack', '*');
                } else {
                    // 不在iframe中，直接返回上一頁
                    window.history.back();
                }
            });
        }
    }
    
    // 提交分數到排行榜
    submitScoreToLeaderboard(score) {
        console.log('準備提交分數:', score);
        
        // 驗證分數數據
        if (!score || score <= 0) {
            console.log('❌ 分數無效，跳過提交:', score);
            return;
        }
        
        // 計算遊戲時間（從開始到結束）
        const playTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
        
        if (!playTime || playTime <= 0) {
            console.log('❌ 遊戲時間無效，跳過提交:', playTime);
            return;
        }
        
        // 檢查是否在iframe中
        if (window.parent && window.parent !== window) {
            // 在iframe中，發送訊息給父視窗
            window.parent.postMessage({
                type: 'gameEnd',
                score: score,
                playTime: playTime
            }, '*');
        } else {
            // 不在iframe中，直接提交分數
            this.directSubmitScore(score, playTime);
        }
    }
    
    // 直接提交分數（非iframe環境）
    directSubmitScore(score, playTime) {
        // 創建表單數據
        const formData = new FormData();
        formData.append('game_type', 'copy_paste_hero');
        formData.append('score', score);
        formData.append('play_time', playTime);
        
        console.log('提交表單數據:', {
            game_type: 'copy_paste_hero',
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
            } else {
                console.log('❌ 分數提交失敗:', data.message);
            }
        })
        .catch(error => {
            console.log('❌ 分數提交錯誤:', error.message);
        });
    }

    // 重新開始遊戲
    restartGame() {
        console.log('重新開始遊戲');
        this.currentStage = 0;
        this.stageScores = [0, 0.5, 0.5, 0];
        this.timers.forEach(timer => clearInterval(timer));
        this.timers = [];
        
        // 重置所有輸入框
        document.querySelectorAll('.input-box').forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'incorrect');
            input.disabled = false;
        });
        
        // 重置布幕狀態
        const leftCurtain = document.getElementById('curtainLeft');
        const rightCurtain = document.getElementById('curtainRight');
        leftCurtain.classList.remove('closing', 'opening');
        rightCurtain.classList.remove('closing', 'opening');
        
        // 重置分數顯示
        document.getElementById('score1').textContent = '0';
        document.getElementById('score2').textContent = '0';
        document.getElementById('score3').textContent = '0';
        document.getElementById('score4').textContent = '0';
        
        // 隱藏倒數計時覆蓋層
        document.getElementById('countdownOverlay').classList.remove('show');
        
        console.log('顯示開始畫面');
        this.showStage('start');
    }
}

// 全局函數
// 初始化遊戲
const game = new CopyPasteHero();

function startGame() {
    game.startGame();
}

function restartGame() {
    console.log('全局restartGame函數被調用');
    game.restartGame();
}

// 添加CSS動畫
const style = document.createElement('style');
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
