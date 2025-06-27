import React from 'react';

const WordDisplay = ({ currentWord, isGameActive }) => {
  return (
    <div className="word-display">
      <div className="current-word">
        {isGameActive ? currentWord?.word : 'スタートボタンを押してください'}
      </div>
      {isGameActive && currentWord && (
        <div className="word-meaning">
          {currentWord.meaning}
        </div>
      )}
    </div>
  );
};

export default WordDisplay;