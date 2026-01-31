
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, Heart, Briefcase, ChevronDown, CheckCircle, Settings } from 'lucide-react';
import { NeuCard } from './NeuCard';
import { NeuButton } from './NeuButton';
import { NeuSlider } from './NeuSlider';
import { getActionAreas } from '../services/mockService';
import { ActionArea } from '../types';

interface DashboardProps {
  onOpenSettings: () => void;
  onManageBeings: () => void; // Added prop
  identities: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenSettings, onManageBeings, identities }) => {
  const [areas, setAreas] = useState<ActionArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [identity, setIdentity] = useState(identities[0] || "");
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getActionAreas().then(data => {
      setAreas(data);
      setLoading(false);
    });
  }, []);

  // Sync identity if props change or current identity is deleted
  useEffect(() => {
    if ((!identities.includes(identity) && identities.length > 0) || !identity) {
        setIdentity(identities[0] || "");
    }
  }, [identities, identity]);

  const handleSliderChange = (id: string, val: number) => {
    setSliderValues(prev => ({ ...prev, [id]: val }));
  };

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="px-6 pb-24 pt-4 min-h-full">
      
      {/* Header / Identity Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-neu-textLight font-medium text-sm uppercase tracking-widest">ההוויה שלי</h2>
            <button onClick={onOpenSettings} className="p-2 text-neu-textLight hover:text-neu-accent transition-colors">
                <Settings size={18} />
            </button>
        </div>
        
        {/* Adjusted padding and margins to prevent shadow clipping */}
        <div className="-mx-6 px-6 flex overflow-x-auto gap-3 py-4 no-scrollbar snap-x">
          {identities.map((id) => (
            <NeuButton 
              key={id} 
              onClick={() => setIdentity(id)}
              active={identity === id}
              className="whitespace-nowrap snap-center text-sm px-5 py-2"
            >
              {id}
            </NeuButton>
          ))}
          {/* Add Identity Button - now correctly using onManageBeings from props */}
          <NeuButton onClick={onManageBeings} className="text-xs snap-center whitespace-nowrap px-4 py-2">
            + הוסף הוויה
          </NeuButton>
        </div>
      </motion.div>

      {/* "The Floating Device" visual center - The Identity Circle */}
      <div className="flex justify-center mb-10">
        <NeuCard className="w-48 h-48 rounded-full flex items-center justify-center relative !shadow-neu-flat">
          <div className="absolute inset-2 rounded-full shadow-neu-pressed flex items-center justify-center">
            <motion.div 
              key={identity}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xs text-neu-textLight mb-1">אני</p>
              <h1 className="text-2xl font-bold text-neu-accent">{identity || "?"}</h1>
            </motion.div>
          </div>
          {/* Decorative Ring */}
          <div className="absolute -inset-2 rounded-full border border-neu-accent/10 animate-spin-slow"></div>
        </NeuCard>
      </div>

      {/* Action Areas */}
      <h3 className="text-neu-text text-lg font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-neu-accent" />
        תכנון יומי
      </h3>

      {loading ? (
        <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-20 bg-neu-base rounded-2xl shadow-neu-pressed animate-pulse"></div>)}
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-5"
        >
          {areas.map((area) => (
            <NeuCard 
              key={area.objectId} 
              className="p-5 cursor-pointer overflow-hidden relative"
              onClick={() => setExpandedId(expandedId === area.objectId ? null : area.objectId)}
              layout
            >
              <motion.div layout className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full transition-colors duration-300 ${expandedId === area.objectId ? 'bg-neu-accent text-white shadow-neu-pressed' : 'text-neu-text shadow-neu-flat'}`}>
                     {(area.name.includes("מדיטציה") || area.name.includes("זוגיות")) && <Heart size={20} />}
                     {area.name.includes("ניהול") && <Briefcase size={20} />}
                     {area.name.includes("בריא") && <User size={20} />}
                     {(!area.name.includes("מדיטציה") && !area.name.includes("זוגיות") && !area.name.includes("ניהול") && !area.name.includes("בריא")) && <Activity size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-neu-text text-lg">{area.name}</h4>
                    {expandedId !== area.objectId && (
                        <p className="text-xs text-neu-textLight mt-1">
                            {sliderValues[area.objectId] ? `${sliderValues[area.objectId]} דקות` : 'הקש לעריכה'}
                        </p>
                    )}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === area.objectId ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-neu-textLight" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {expandedId === area.objectId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 border-t border-gray-200/20 pt-4"
                  >
                    {/* Questions / Context */}
                    <div className="mb-6 space-y-2">
                        {area.questions.map((q, idx) => (
                            <p key={idx} className="text-sm text-neu-textLight italic">{q}</p>
                        ))}
                    </div>

                    {/* Slider */}
                    <div className="mb-6">
                        <NeuSlider 
                            min={area.sliderMin}
                            max={area.sliderMax}
                            step={area.sliderStep}
                            value={sliderValues[area.objectId] || 0}
                            onChange={(val) => handleSliderChange(area.objectId, val)}
                            label="משך זמן (דקות)"
                        />
                    </div>

                    {/* Checklist Items */}
                    {area.itemsEx && area.itemsEx.length > 0 && (
                        <div className="grid grid-cols-1 gap-3">
                            {area.itemsEx.map((item, idx) => {
                                const key = `${area.objectId}-${idx}`;
                                return (
                                    <div 
                                        key={key} 
                                        className="flex items-center gap-3 p-3 rounded-xl bg-neu-base shadow-neu-pressed cursor-pointer hover:bg-black/5 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleItem(key);
                                        }}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${checkedItems[key] ? 'bg-neu-accent text-white shadow-neu-flat' : 'bg-transparent border-2 border-neu-textLight/30'}`}>
                                            {checkedItems[key] && <CheckCircle size={14} />}
                                        </div>
                                        <span className={`text-sm ${checkedItems[key] ? 'text-neu-textLight line-through' : 'text-neu-text'}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </NeuCard>
          ))}
        </motion.div>
      )}
    </div>
  );
};
