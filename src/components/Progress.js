import React from 'react';

const Progress = ({ currentProgress, totalWords }) => {
  const progressPercentage = totalWords > 0 ? (currentProgress / totalWords) * 100 : 0;

  return (
    <div className="progress">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-text">
        <span>{currentProgress}</span> / <span>{totalWords}</span> 単語
      </div>
    </div>
  );
};

export default Progress;