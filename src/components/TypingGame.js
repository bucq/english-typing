import React, { useState, useEffect, useRef } from 'react';
import { getRandomWords } from '../data/words';
import Stats from './Stats';
import WordDisplay from './WordDisplay';
import Progress from './Progress';
import Results from './Results';

const TypingGame = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [totalTypedWords, setTotalTypedWords] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [timer, setTimer] = useState('0:00');
  const [inputClass, setInputClass] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [finalStats, setFinalStats] = useState({});
  
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();

  function calculateWPM() {
    if (!startTime || correctWords === 0) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    return elapsedMinutes > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
  }

  function calculateAccuracy() {
    return totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
  }

  function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    if (isGameActive && startTime) {
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTimer(formatTime(elapsed));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameActive, startTime]);

  const startGame = () => {
    const newWords = getRandomWords(15);
    setWords(newWords);
    setCurrentWordIndex(0);
    setInputValue('');
    setStartTime(Date.now());
    setIsGameActive(true);
    setTotalTypedWords(0);
    setCorrectWords(0);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTimer('0:00');
    setInputClass('');
    setShowResults(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    if (!isGameActive) return;

    const value = e.target.value;
    setInputValue(value);
    setTotalKeystrokes(prev => prev + 1);

    const currentWord = words[currentWordIndex]?.word || '';
    
    if (currentWord.startsWith(value)) {
      setInputClass('correct');
      setCorrectKeystrokes(prev => prev + 1);
    } else {
      setInputClass('incorrect');
    }

    if (value === currentWord) {
      handleCorrectWord();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isGameActive) {
      checkCurrentWord();
    }
  };

  const handleCorrectWord = () => {
    setCorrectWords(prev => prev + 1);
    setTotalTypedWords(prev => prev + 1);
    nextWord();
  };

  const checkCurrentWord = () => {
    const currentWord = words[currentWordIndex]?.word || '';
    
    if (inputValue.trim() === currentWord) {
      handleCorrectWord();
    } else {
      setInputClass('incorrect');
      setTimeout(() => {
        setInputValue('');
        setInputClass('');
      }, 500);
    }
    
    setTotalTypedWords(prev => prev + 1);
  };

  const nextWord = () => {
    const nextIndex = currentWordIndex + 1;
    
    if (nextIndex >= words.length) {
      endGame();
    } else {
      setCurrentWordIndex(nextIndex);
      setInputValue('');
      setInputClass('');
    }
  };

  const endGame = () => {
    setIsGameActive(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const finalTime = Date.now() - startTime;
    const elapsedMinutes = finalTime / 60000;
    const finalWpm = elapsedMinutes > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
    const finalAccuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

    setFinalStats({
      totalWords: words.length,
      correctWords,
      finalWpm,
      finalAccuracy,
      finalTime: formatTime(finalTime)
    });

    setShowResults(true);
  };

  const resetGame = () => {
    setIsGameActive(false);
    setWords([]);
    setCurrentWordIndex(0);
    setInputValue('');
    setStartTime(null);
    setTotalTypedWords(0);
    setCorrectWords(0);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTimer('0:00');
    setInputClass('');
    setShowResults(false);
    setFinalStats({});
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>英語タイピング学習</h1>
      </header>
      
      <Stats wpm={wpm} accuracy={accuracy} timer={timer} />
      
      <WordDisplay 
        currentWord={words[currentWordIndex]} 
        isGameActive={isGameActive} 
      />

      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={inputClass}
          placeholder="ここに入力してください..."
          disabled={!isGameActive}
        />
      </div>

      <div className="controls">
        <button onClick={startGame} disabled={isGameActive}>
          スタート
        </button>
        <button onClick={nextWord} disabled={!isGameActive}>
          次の単語
        </button>
        <button onClick={resetGame}>
          リセット
        </button>
      </div>

      <Progress 
        currentProgress={currentWordIndex} 
        totalWords={words.length} 
      />

      <Results 
        isVisible={showResults}
        totalWords={finalStats.totalWords}
        correctWords={finalStats.correctWords}
        finalWpm={finalStats.finalWpm}
        finalAccuracy={finalStats.finalAccuracy}
        finalTime={finalStats.finalTime}
      />
    </div>
  );
};

export default TypingGame;