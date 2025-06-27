import React, { useState, useEffect, useRef } from 'react';
import { getRandomWords } from '../data/words';
import { WordData, FinalStats, InputClassName } from '../types';
import Stats from './Stats';
import WordDisplay from './WordDisplay';
import Progress from './Progress';
import Results from './Results';

const TypingGame: React.FC = () => {
  const [words, setWords] = useState<WordData[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [totalTypedWords, setTotalTypedWords] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [timer, setTimer] = useState<string>('0:00');
  const [inputClass, setInputClass] = useState<InputClassName>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [finalStats, setFinalStats] = useState<Partial<FinalStats>>({});
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();

  function calculateWPM(): number {
    if (!startTime || correctWords === 0) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    return elapsedMinutes > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
  }

  function calculateAccuracy(): number {
    return totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
  }

  function formatTime(milliseconds: number): string {
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

  const startGame = (): void => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && isGameActive) {
      checkCurrentWord();
    }
  };

  const handleCorrectWord = (): void => {
    setCorrectWords(prev => prev + 1);
    setTotalTypedWords(prev => prev + 1);
    nextWord();
  };

  const checkCurrentWord = (): void => {
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

  const nextWord = (): void => {
    const nextIndex = currentWordIndex + 1;
    
    if (nextIndex >= words.length) {
      endGame();
    } else {
      setCurrentWordIndex(nextIndex);
      setInputValue('');
      setInputClass('');
    }
  };

  const endGame = (): void => {
    setIsGameActive(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const finalTime = Date.now() - (startTime || 0);
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

  const resetGame = (): void => {
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
          onKeyDown={handleKeyPress}
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
        totalWords={finalStats.totalWords || 0}
        correctWords={finalStats.correctWords || 0}
        finalWpm={finalStats.finalWpm || 0}
        finalAccuracy={finalStats.finalAccuracy || 0}
        finalTime={finalStats.finalTime || '0:00'}
      />
    </div>
  );
};

export default TypingGame;