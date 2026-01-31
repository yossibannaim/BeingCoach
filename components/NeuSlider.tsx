import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NeuSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  label?: string;
}

export const NeuSlider: React.FC<NeuSliderProps> = ({ min, max, step, value, onChange, label }) => {
  const [internalValue, setInternalValue] = useState(value);

  // Calculate percentage for fill
  const percentage = ((internalValue - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternalValue(val);
    onChange(val);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-3 p-2">
      <div className="flex justify-between items-center text-neu-text font-semibold text-sm">
        <span>{label || 'Duration'}</span>
        <span className="text-neu-accent">{internalValue} min</span>
      </div>
      
      <div className="relative h-4 w-full rounded-full shadow-neu-pressed bg-neu-base">
        {/* Progress Fill */}
        <motion.div 
          className="absolute top-0 left-0 h-full rounded-full bg-neu-accent opacity-80 pointer-events-none"
          style={{ width: `${percentage}%` }}
          layout
        />
        
        {/* Native Range Input (Hidden opacity but functional) */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={internalValue} 
          onChange={handleChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Thumb Visual */}
        <motion.div 
          className="absolute top-1/2 h-6 w-6 rounded-full bg-neu-base shadow-neu-flat border-2 border-neu-base -mt-3 pointer-events-none z-20"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
    </div>
  );
};
