import React from 'react';
import { motion } from 'framer-motion';

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export const NeuButton: React.FC<NeuButtonProps> = ({ 
  active = false, 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  
  const baseClasses = "relative rounded-xl px-6 py-3 font-semibold transition-all duration-300 outline-none select-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: active 
      ? "text-neu-accent shadow-neu-pressed" 
      : "text-neu-text shadow-neu-flat hover:text-neu-accent",
    accent: active
      ? "bg-neu-accent text-white shadow-neu-pressed"
      : "bg-neu-accent text-white shadow-neu-flat hover:brightness-110",
    secondary: active
      ? "shadow-neu-pressed text-neu-textLight"
      : "shadow-neu-flat text-neu-text"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
