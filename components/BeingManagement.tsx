
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Trash2, Star } from 'lucide-react';
import { NeuButton } from './NeuButton';
import { NeuInput } from './NeuInput';
import { NeuCard } from './NeuCard';

interface BeingManagementProps {
  currentIdentities: string[];
  onUpdateIdentities: (newIdentities: string[]) => void;
  onBack: () => void;
}

export const BeingManagement: React.FC<BeingManagementProps> = ({ 
  currentIdentities, 
  onUpdateIdentities,
  onBack 
}) => {
  const [newIdentity, setNewIdentity] = useState('');

  const handleAdd = () => {
    if (newIdentity.trim()) {
      onUpdateIdentities([...currentIdentities, newIdentity.trim()]);
      setNewIdentity('');
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...currentIdentities];
    updated.splice(index, 1);
    onUpdateIdentities(updated);
  };

  return (
    <div className="h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center p-6 pb-2">
        <NeuButton onClick={onBack} className="p-3 mr-2 !rounded-full">
          <ArrowRight size={20} />
        </NeuButton>
        <h2 className="text-xl font-bold text-neu-text mr-4">ניהול הוויות</h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-20">
        
        {/* Add New Section */}
        <NeuCard className="p-5 mb-8 overflow-visible">
          <h3 className="text-sm font-bold text-neu-textLight mb-4 uppercase tracking-wider">הוסף הוויה חדשה</h3>
          <div className="flex gap-3 items-center">
            <NeuInput 
              value={newIdentity}
              onChange={(e) => setNewIdentity(e.target.value)}
              placeholder="אני..."
              className="flex-1 min-w-0" 
            />
            <NeuButton 
                onClick={handleAdd} 
                variant="accent"
                className="!px-4 flex-shrink-0"
                disabled={!newIdentity.trim()}
            >
              <Plus />
            </NeuButton>
          </div>
        </NeuCard>

        {/* List */}
        <div className="space-y-4 px-1">
            <h3 className="text-sm font-bold text-neu-textLight mb-2 uppercase tracking-wider px-2">הוויות קיימות</h3>
            <AnimatePresence>
            {currentIdentities.map((identity, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    className="py-1"
                >
                    <NeuCard className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Star className="text-neu-accent w-5 h-5" />
                            <span className="text-neu-text font-bold text-lg">{identity}</span>
                        </div>
                        <button 
                            onClick={() => handleDelete(index)}
                            className="text-neu-textLight hover:text-red-500 transition-colors p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </NeuCard>
                </motion.div>
            ))}
            </AnimatePresence>
            {currentIdentities.length === 0 && (
                <p className="text-center text-neu-textLight mt-10 italic">לא הוגדרו הוויות עדיין</p>
            )}
        </div>
      </div>
    </div>
  );
};
