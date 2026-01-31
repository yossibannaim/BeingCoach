import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Fingerprint, ArrowLeft } from 'lucide-react'; // Changed ArrowRight to ArrowLeft for RTL
import { NeuInput } from './NeuInput';
import { NeuButton } from './NeuButton';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate biometric/network delay
    setTimeout(() => {
      onLogin();
    }, 500); // Reduced delay for faster testing
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 bg-neu-light opacity-40 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-neu-dark opacity-20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Animated Brand/Logo Area */}
        <div className="mb-12 relative">
          <div className="w-28 h-28 rounded-full bg-neu-base shadow-neu-flat flex items-center justify-center relative z-10">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Fingerprint size={48} className="text-neu-accent" />
            </motion.div>
          </div>
          {/* Ripples */}
          <motion.div 
            className="absolute top-0 left-0 w-28 h-28 rounded-full border border-neu-accent/30 z-0"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
           <motion.div 
            className="absolute top-0 left-0 w-28 h-28 rounded-full border border-neu-accent/10 z-0"
            animate={{ scale: [1, 1.8], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-neu-text mb-1 tracking-tight"
          >
            ברוך שובך
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neu-textLight text-sm font-medium uppercase tracking-widest"
          >
            התחבר ל-Flow שלך
          </motion.p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NeuInput 
              type="text" 
              placeholder="אימייל (דמו)" 
              icon={<Mail size={18} />}
            />
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
          >
            <NeuInput 
              type="password" 
              placeholder="קוד גישה (דמו)" 
              icon={<Lock size={18} />}
            />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="pt-4"
          >
            <NeuButton 
              type="submit" 
              variant="accent" 
              className="w-full flex items-center justify-center gap-3 py-4 text-lg shadow-neu-glow"
              disabled={loading}
            >
              {loading ? (
                <motion.div 
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
              ) : (
                <>
                  <span>כניסה למערכת</span>
                  <ArrowLeft size={20} className="mr-1" />
                </>
              )}
            </NeuButton>
          </motion.div>
        </form>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-neu-textLight"
        >
          מאובטח על ידי מערכת Azaria
        </motion.p>
      </motion.div>
    </div>
  );
};