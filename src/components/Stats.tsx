import React from 'react';
import { StatsProps } from '../types';

const Stats: React.FC<StatsProps> = ({ wpm, accuracy, timer }) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">WPM:</span>
        <span>{wpm}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">精度:</span>
        <span>{accuracy}%</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">時間:</span>
        <span>{timer}</span>
      </div>
    </div>
  );
};

export default Stats;