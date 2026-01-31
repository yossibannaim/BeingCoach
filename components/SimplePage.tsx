
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { NeuButton } from './NeuButton';
import { NeuInput } from './NeuInput';
import { NeuCard } from './NeuCard';

interface SimplePageProps {
  title: string;
  type: 'textarea' | 'text' | 'time';
  value: string;
  placeholder?: string;
  onSave: (val: string) => void;
  onBack: () => void;
}

export const SimplePage: React.FC<SimplePageProps> = ({ 
  title, 
  type, 
  value, 
  placeholder,
  onSave, 
  onBack 
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave(currentValue);
  };

  return (
    <div className="h-full flex flex-col relative bg-neu-base">
      
      {/* Header */}
      <div className="flex items-center p-6 pb-2">
        <NeuButton onClick={onBack} className="p-3 mr-2 !rounded-full">
          <ArrowRight size={20} />
        </NeuButton>
        <h2 className="text-xl font-bold text-neu-text mr-4">{title}</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <NeuCard className="flex-1 p-6 flex flex-col overflow-hidden">
            {type === 'textarea' && (
                <textarea 
                    className="w-full h-full bg-transparent border-none outline-none text-neu-text text-lg leading-relaxed resize-none placeholder-neu-textLight/50"
                    placeholder={placeholder}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                />
            )}

            {type === 'text' && (
                <div className="my-auto">
                    <NeuInput 
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        placeholder={placeholder}
                        className="text-center text-xl !py-4"
                    />
                </div>
            )}

            {type === 'time' && (
                <div className="my-auto flex flex-col items-center gap-6">
                    <p className="text-neu-textLight">בחר את השעה הרצויה</p>
                    <input 
                        type="time" 
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="text-4xl font-bold bg-neu-base shadow-neu-pressed px-8 py-4 rounded-2xl text-neu-accent outline-none border-none text-center"
                    />
                </div>
            )}
        </NeuCard>

        <div className="mt-6">
            <NeuButton onClick={handleSave} variant="accent" className="w-full py-4 text-lg">
                <CheckCircle className="ml-2" /> שמור
            </NeuButton>
        </div>
      </div>
    </div>
  );
};
