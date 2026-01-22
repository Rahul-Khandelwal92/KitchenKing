import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface TimerProps {
  durationSeconds: number;
}

export const Timer: React.FC<TimerProps> = ({ durationSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(durationSeconds);
    setIsActive(false);
  }, [durationSeconds]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durationSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mx-4 mb-6 p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary font-bold animate-pulse">timer</span>
          <span className="font-semibold text-white/80 uppercase tracking-widest text-xs">Prep Timer</span>
        </div>
        <button onClick={resetTimer} className="text-primary text-sm font-bold flex items-center gap-1">
          <RotateCcw size={14} /> RESET
        </button>
      </div>
      
      <div className="flex gap-4 cursor-pointer" onClick={toggleTimer}>
        <div className="flex grow basis-0 flex-col items-center gap-2">
          <div className={`flex h-20 w-full items-center justify-center rounded-xl border transition-colors ${isActive ? 'bg-primary/20 border-primary' : 'bg-primary/10 border-primary/20'}`}>
            <p className="text-primary text-4xl font-bold tracking-tighter">{minutes.toString().padStart(2, '0')}</p>
          </div>
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Minutes</p>
        </div>
        <div className="flex grow basis-0 flex-col items-center gap-2">
          <div className={`flex h-20 w-full items-center justify-center rounded-xl border transition-colors ${isActive ? 'bg-primary/20 border-primary' : 'bg-primary/10 border-primary/20'}`}>
            <p className="text-primary text-4xl font-bold tracking-tighter">{seconds.toString().padStart(2, '0')}</p>
          </div>
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Seconds</p>
        </div>
      </div>
      
      <button 
        onClick={() => setTimeLeft(prev => prev + 60)}
        className="w-full mt-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-lg transition-colors border border-primary/30"
      >
        +1:00 MIN
      </button>
    </div>
  );
};