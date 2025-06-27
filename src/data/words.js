export const englishWords = [
    { word: "hello", meaning: "こんにちは", difficulty: "easy" },
    { word: "world", meaning: "世界", difficulty: "easy" },
    { word: "computer", meaning: "コンピューター", difficulty: "easy" },
    { word: "keyboard", meaning: "キーボード", difficulty: "easy" },
    { word: "mouse", meaning: "マウス", difficulty: "easy" },
    { word: "screen", meaning: "画面", difficulty: "easy" },
    { word: "program", meaning: "プログラム", difficulty: "easy" },
    { word: "internet", meaning: "インターネット", difficulty: "easy" },
    { word: "website", meaning: "ウェブサイト", difficulty: "easy" },
    { word: "email", meaning: "メール", difficulty: "easy" },
    
    { word: "beautiful", meaning: "美しい", difficulty: "medium" },
    { word: "important", meaning: "重要な", difficulty: "medium" },
    { word: "different", meaning: "異なる", difficulty: "medium" },
    { word: "possible", meaning: "可能な", difficulty: "medium" },
    { word: "necessary", meaning: "必要な", difficulty: "medium" },
    { word: "available", meaning: "利用可能な", difficulty: "medium" },
    { word: "interesting", meaning: "興味深い", difficulty: "medium" },
    { word: "information", meaning: "情報", difficulty: "medium" },
    { word: "education", meaning: "教育", difficulty: "medium" },
    { word: "experience", meaning: "経験", difficulty: "medium" },
    
    { word: "extraordinary", meaning: "並外れた", difficulty: "hard" },
    { word: "sophisticated", meaning: "洗練された", difficulty: "hard" },
    { word: "unprecedented", meaning: "前例のない", difficulty: "hard" },
    { word: "responsibility", meaning: "責任", difficulty: "hard" },
    { word: "understanding", meaning: "理解", difficulty: "hard" },
    { word: "communication", meaning: "コミュニケーション", difficulty: "hard" },
    { word: "representative", meaning: "代表者", difficulty: "hard" },
    { word: "accommodation", meaning: "宿泊施設", difficulty: "hard" },
    { word: "pronunciation", meaning: "発音", difficulty: "hard" },
    { word: "characteristics", meaning: "特徴", difficulty: "hard" },
    
    { word: "apple", meaning: "りんご", difficulty: "easy" },
    { word: "orange", meaning: "オレンジ", difficulty: "easy" },
    { word: "banana", meaning: "バナナ", difficulty: "easy" },
    { word: "student", meaning: "学生", difficulty: "easy" },
    { word: "teacher", meaning: "先生", difficulty: "easy" },
    { word: "school", meaning: "学校", difficulty: "easy" },
    { word: "library", meaning: "図書館", difficulty: "easy" },
    { word: "hospital", meaning: "病院", difficulty: "easy" },
    { word: "restaurant", meaning: "レストラン", difficulty: "easy" },
    { word: "airport", meaning: "空港", difficulty: "easy" },
    
    { word: "environment", meaning: "環境", difficulty: "medium" },
    { word: "technology", meaning: "技術", difficulty: "medium" },
    { word: "government", meaning: "政府", difficulty: "medium" },
    { word: "community", meaning: "コミュニティ", difficulty: "medium" },
    { word: "opportunity", meaning: "機会", difficulty: "medium" },
    { word: "development", meaning: "開発", difficulty: "medium" },
    { word: "organization", meaning: "組織", difficulty: "medium" },
    { word: "performance", meaning: "パフォーマンス", difficulty: "medium" },
    { word: "management", meaning: "管理", difficulty: "medium" },
    { word: "relationship", meaning: "関係", difficulty: "medium" }
];

export function getRandomWords(count = 10, difficulty = null) {
    let filteredWords = englishWords;
    
    if (difficulty) {
        filteredWords = englishWords.filter(item => item.difficulty === difficulty);
    }
    
    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllWords() {
    return englishWords;
}