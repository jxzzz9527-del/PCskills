// 繁體中文題庫 + 注音鍵盤映射
window.BopomofoGame = {
  // 注音鍵盤映射
  keyboard: {
    keyMap: {
      // 數字鍵
      '1': 'ㄅ', '2': 'ㄉ', '3': 'ˇ', '4': 'ˋ', '5': 'ㄓ',
      '6': 'ˊ', '7': '˙', '8': 'ㄚ', '9': 'ㄞ', '0': 'ㄢ',
      
      // QWERTY 第一排
      'q': 'ㄆ', 'w': 'ㄊ', 'e': 'ㄍ', 'r': 'ㄐ', 't': 'ㄔ',
      'y': 'ㄗ', 'u': 'ㄧ', 'i': 'ㄛ', 'o': 'ㄟ', 'p': 'ㄣ',
      
      // QWERTY 第二排
      'a': 'ㄇ', 's': 'ㄋ', 'd': 'ㄎ', 'f': 'ㄑ', 'g': 'ㄕ',
      'h': 'ㄘ', 'j': 'ㄨ', 'k': 'ㄜ', 'l': 'ㄠ', ';': 'ㄤ',
      
      // QWERTY 第三排
      'z': 'ㄈ', 'x': 'ㄌ', 'c': 'ㄏ', 'v': 'ㄒ', 'b': 'ㄖ',
      'n': 'ㄙ', 'm': 'ㄩ', ',': 'ㄝ', '.': 'ㄡ', '/': 'ㄥ',
      
      // 其他
      "'": 'ㄦ'
    },
    
    keyToBopomofo: function(key) {
      return this.keyMap[key.toLowerCase()] || null;
    },
    
    isValidKey: function(key) {
      return this.keyMap.hasOwnProperty(key.toLowerCase());
    }
  },

  // 繁體中文題庫
  questionBank: {
    level1: {
      title: "單字",
      questions: [
        { word: "戶", bopomofo: "ㄏㄨˋ" },
        { word: "漫", bopomofo: "ㄇㄢˋ" },
        { word: "季", bopomofo: "ㄐㄧˋ" },
        { word: "素", bopomofo: "ㄙㄨˋ" },
        { word: "嫩", bopomofo: "ㄋㄣˋ" },
        { word: "繁", bopomofo: "ㄈㄢˊ" },
        { word: "墨", bopomofo: "ㄇㄛˋ" },
        { word: "姿", bopomofo: "ㄗ" },
        { word: "簇", bopomofo: "ㄘㄨˋ" },
        { word: "週", bopomofo: "ㄓㄡ" },
        { word: "淡", bopomofo: "ㄉㄢˋ" },
        { word: "穫", bopomofo: "ㄏㄨㄛˋ" },
        { word: "迎", bopomofo: "ㄧㄥˊ" },
        { word: "幅", bopomofo: "ㄈㄨˊ" },
        { word: "伴", bopomofo: "ㄅㄢˋ" },
        { word: "汽", bopomofo: "ㄑㄧˋ" },
        { word: "煮", bopomofo: "ㄓㄨˇ" },
        { word: "骨", bopomofo: "ㄍㄨˇ" },
        { word: "粥", bopomofo: "ㄓㄡ" },
        { word: "燙", bopomofo: "ㄊㄤˋ" }
      ]
    },
    level2: {
      title: "詞語",
      questions: [
        { word: "一般", bopomofo: "ㄧˊ ㄅㄢ" },
        { word: "電腦", bopomofo: "ㄉㄧㄢˋ ㄋㄠˇ" },
        { word: "果汁", bopomofo: "ㄍㄨㄛˇ ㄓ" },
        { word: "優美", bopomofo: "ㄧㄡ ㄇㄟˇ" },
        { word: "快樂", bopomofo: "ㄎㄨㄞˋ ㄌㄜˋ" },
        { word: "美麗", bopomofo: "ㄇㄟˇ ㄌㄧˋ" },
        { word: "聰明", bopomofo: "ㄘㄨㄥ ㄇㄧㄥˊ" },
        { word: "勇敢", bopomofo: "ㄩㄥˇ ㄍㄢˇ" },
        { word: "善良", bopomofo: "ㄕㄢˋ ㄌㄧㄤˊ" },
        { word: "誠實", bopomofo: "ㄔㄥˊ ㄕˊ" },
        { word: "勤奮", bopomofo: "ㄑㄧㄣˊ ㄈㄣˋ" },
        { word: "認真", bopomofo: "ㄖㄣˋ ㄓㄣ" },
        { word: "努力", bopomofo: "ㄋㄨˇ ㄌㄧˋ" },
        { word: "堅持", bopomofo: "ㄐㄧㄢ ㄔˊ" },
        { word: "夢想", bopomofo: "ㄇㄥˋ ㄒㄧㄤˇ" }
      ]
    },
    level3: {
      title: "短語",
      questions: [
        { word: "一瞬間", bopomofo: "ㄧˊ ㄕㄨㄣˋ ㄐㄧㄢ" },
        { word: "背道而馳", bopomofo: "ㄅㄟˋ ㄉㄠˋ ㄦˊ ㄔˊ" },
        { word: "五顏六色", bopomofo: "ㄨˇ ㄧㄢˊ ㄌㄧㄡˋ ㄙㄜˋ" },
        { word: "拾金不昧", bopomofo: "ㄕˊ ㄐㄧㄣ ㄅㄨˊ ㄇㄟˋ" },
        { word: "一石二鳥", bopomofo: "ㄧˊ ㄕˊ ㄦˋ ㄋㄧㄠˇ" },
        { word: "三心二意", bopomofo: "ㄙㄢ ㄒㄧㄣ ㄦˋ ㄧˋ" },
        { word: "四面八方", bopomofo: "ㄙˋ ㄇㄧㄢˋ ㄅㄚ ㄈㄤ" },
        { word: "五光十色", bopomofo: "ㄨˇ ㄍㄨㄤ ㄕˊ ㄙㄜˋ" },
        { word: "六神無主", bopomofo: "ㄌㄧㄡˋ ㄕㄣˊ ㄨˊ ㄓㄨˇ" },
        { word: "七上八下", bopomofo: "ㄑㄧ ㄕㄤˋ ㄅㄚ ㄒㄧㄚˋ" }
      ]
    },
    level4: {
      title: "成語",
      questions: [
        { word: "一鳴驚人", bopomofo: "ㄧˊ ㄇㄧㄥˊ ㄐㄧㄥ ㄖㄣˊ" },
        { word: "二話不說", bopomofo: "ㄦˋ ㄏㄨㄚˋ ㄅㄨˊ ㄕㄨㄛ" },
        { word: "三思而行", bopomofo: "ㄙㄢ ㄙ ㄦˊ ㄒㄧㄥˊ" },
        { word: "四通八達", bopomofo: "ㄙˋ ㄊㄨㄥ ㄅㄚ ㄉㄚˊ" },
        { word: "五湖四海", bopomofo: "ㄨˇ ㄏㄨˊ ㄙˋ ㄏㄞˇ" },
        { word: "六親不認", bopomofo: "ㄌㄧㄡˋ ㄑㄧㄣ ㄅㄨˊ ㄖㄣˋ" },
        { word: "七嘴八舌", bopomofo: "ㄑㄧ ㄗㄨㄟˇ ㄅㄚ ㄕㄜˊ" },
        { word: "八仙過海", bopomofo: "ㄅㄚ ㄒㄧㄢ ㄍㄨㄛˋ ㄏㄞˇ" },
        { word: "九牛一毛", bopomofo: "ㄐㄧㄡˇ ㄋㄧㄡˊ ㄧˊ ㄇㄠˊ" },
        { word: "十全十美", bopomofo: "ㄕˊ ㄑㄩㄢˊ ㄕˊ ㄇㄟˇ" }
      ]
    }
  },

  // 題庫管理器
  questionManager: {
    getRandomQuestion: function(enemyType) {
      const levelKey = 'level' + (enemyType + 1);
      const level = this.questionBank[levelKey];
      if (!level || !level.questions || level.questions.length === 0) {
        return { word: "測試", bopomofo: "ㄘㄜˋ ㄕˋ" };
      }
      const questions = level.questions;
      return questions[Math.floor(Math.random() * questions.length)];
    }
  }
};

// 初始化題庫管理器
window.BopomofoGame.questionManager.questionBank = window.BopomofoGame.questionBank;

