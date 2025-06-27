import React from 'react';

const Results = ({ 
  isVisible, 
  totalWords, 
  correctWords, 
  finalWpm, 
  finalAccuracy, 
  finalTime 
}) => {
  if (!isVisible) return null;

  return (
    <div className="results">
      <h2>結果</h2>
      <div className="result-stats">
        <p>総単語数: <span>{totalWords}</span></p>
        <p>正解数: <span>{correctWords}</span></p>
        <p>平均WPM: <span>{finalWpm}</span></p>
        <p>最終精度: <span>{finalAccuracy}%</span></p>
        <p>所要時間: <span>{finalTime}</span></p>
      </div>
    </div>
  );
};

export default Results;