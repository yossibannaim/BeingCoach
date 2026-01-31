import React from 'react';
import { motion } from 'framer-motion';

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const NeuInput: React.FC<NeuInputProps> = ({ className = '', icon, ...props }) => {
  return (
    <div className="relative w-full">
      <motion.div 
        className={`flex items-center w-full bg-neu-base rounded-xl shadow-neu-pressed p-1 ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon && (
          <div className="pl-4 text-neu-textLight">
            {icon}
          </div>
        )}
        <input 
          className="w-full bg-transparent border-none outline-none px-4 py-3 text-neu-text placeholder-neu-textLight/70 font-medium"
          {...props}
        />
      </motion.div>
    </div>
  );
};
