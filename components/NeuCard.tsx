import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface NeuCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  inset?: boolean;
}

export const NeuCard: React.FC<NeuCardProps> = ({ 
  children, 
  className = '', 
  inset = false,
  ...props 
}) => {
  const shadowClass = inset ? 'shadow-neu-pressed' : 'shadow-neu-flat';
  
  return (
    <motion.div 
      className={`bg-neu-base rounded-2xl ${shadowClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
