
import React from 'react';
import { motion } from 'framer-motion';
import { X, Edit3, Award, FileText, Compass, Clock, LogOut } from 'lucide-react';
import { NeuButton } from './NeuButton';

interface SettingsMenuProps {
  onClose: () => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose, onNavigate, onLogout }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        staggerChildren: 0.05
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const menuItems = [
    { id: 'writing', label: 'כתיבה יומית', icon: FileText, action: () => onNavigate('daily_writing') },
    { id: 'achievement', label: 'ההישג היומי שלי', icon: Award, action: () => onNavigate('daily_achievement') },
    { id: 'request', label: 'עריכת בקשה', icon: Edit3, action: () => onNavigate('edit_request') },
    { id: 'direction', label: 'עריכת כיוון', icon: Compass, action: () => onNavigate('being_management') },
    { id: 'timer', label: 'הגדרת זמן תרגול קרוב', icon: Clock, action: () => onNavigate('next_practice') },
    { id: 'logout', label: 'יציאה', icon: LogOut, action: onLogout, variant: 'secondary' as const },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-50 bg-neu-base/95 backdrop-blur-md flex flex-col justify-center items-center p-8"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full text-neu-textLight hover:text-neu-accent hover:bg-white/50 transition-all"
      >
        <X size={28} />
      </button>

      {/* Title */}
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold text-neu-text mb-10 text-center uppercase tracking-widest border-b-2 border-neu-accent/20 pb-2"
      >
        תפריט אישי
      </motion.h2>

      {/* Menu Options */}
      <div className="w-full max-w-xs space-y-4">
        {menuItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants} className="w-full">
            <NeuButton 
              onClick={item.action}
              className={`w-full !py-4 font-bold text-lg shadow-neu-flat ${item.id === 'logout' ? '!text-neu-textLight' : ''}`}
              // Use accent for all main items to match the "Gold Ribbon" look of the legacy app
              variant={item.id === 'logout' ? 'secondary' : 'accent'}
            >
              {/* Center content */}
              <div className="flex items-center justify-center w-full gap-3">
                 {/* Only show icon if needed, or keep it for modern feel. Legacy didn't show icons but Neumorphism benefits from them. */}
                 <item.icon size={20} className={item.id === 'logout' ? 'text-neu-textLight' : 'text-white'} />
                 <span>{item.label}</span>
              </div>
            </NeuButton>
          </motion.div>
        ))}
      </div>
      
      {/* Footer Decoration */}
      <motion.div variants={itemVariants} className="mt-12 opacity-30">
        <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-neu-accent"></div>
            <div className="w-2 h-2 rounded-full bg-neu-accent"></div>
            <div className="w-2 h-2 rounded-full bg-neu-accent"></div>
        </div>
      </motion.div>

    </motion.div>
  );
};
