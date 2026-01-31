
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { BeingManagement } from './components/BeingManagement';
import { DesktopAdmin } from './components/DesktopAdmin';
import { SettingsMenu } from './components/SettingsMenu';
import { SimplePage } from './components/SimplePage';
import { getAppData } from './services/mockService';
import { AppData } from './types';
import { Settings, X } from 'lucide-react';
import { NeuButton } from './components/NeuButton';

// Extended view types for navigation
type AppView = 
  | 'dashboard' 
  | 'settings_menu' 
  | 'being_management' 
  | 'daily_writing' 
  | 'daily_achievement' 
  | 'edit_request' 
  | 'next_practice';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [appData, setAppData] = useState<AppData | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    getAppData().then(data => {
      setAppData(data);
    });
  }, []);

  const handleIdentityUpdate = (newIdentities: string[]) => {
    if(appData) setAppData({ ...appData, identities: newIdentities });
  };

  const handleAdminUpdate = (newData: AppData) => {
    setAppData(newData);
  };

  const handleSettingsNavigate = (view: string) => {
    // Cast string to AppView safe check if needed, for now assuming valid string from SettingsMenu
    setCurrentView(view as AppView);
  };

  // Generic updater for simple pages
  const handleDataUpdate = (field: keyof AppData | 'keyTaskTitle', value: string) => {
    if (!appData) return;
    
    if (field === 'keyTaskTitle') {
        setAppData({ ...appData, keyTask: { ...appData.keyTask, title: value } });
    } else {
        setAppData({ ...appData, [field]: value });
    }
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E0E5EC] to-[#C1C8D5] overflow-hidden relative">
      
      {/* Desktop Ambient Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-20 blur-[100px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-neu-accent opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Admin Toggle Button (Desktop Only) */}
      <div className="hidden md:block absolute top-6 left-6 z-50">
         <NeuButton onClick={() => setShowAdmin(!showAdmin)} className="!rounded-full w-12 h-12 !p-0 flex items-center justify-center">
            {showAdmin ? <X /> : <Settings />}
         </NeuButton>
      </div>

      <div className="flex w-full h-screen p-8 gap-8 items-center justify-center">
          
          {/* DESKTOP ADMIN PANEL (Left Side) */}
          <AnimatePresence>
            {showAdmin && appData && (
                <motion.div 
                    initial={{ opacity: 0, x: -50, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: '60%' }}
                    exit={{ opacity: 0, x: -50, width: 0 }}
                    className="hidden md:block h-[90vh]"
                >
                    <DesktopAdmin data={appData} onUpdate={handleAdminUpdate} />
                </motion.div>
            )}
          </AnimatePresence>

          {/* PHONE EMULATOR (Right/Center) */}
          <motion.div 
             layout
             className={`relative w-full h-full md:h-[850px] md:max-h-[90vh] bg-neu-base md:rounded-[3rem] shadow-neu-floating overflow-hidden border-8 border-neu-base/50 flex flex-col transition-all duration-500 ${showAdmin ? 'md:w-[400px]' : 'md:w-[420px]'}`}
          >
            
            {/* Phone Notch/Status Bar Simulation */}
            <div className="hidden md:flex justify-between items-center px-8 py-4 opacity-50 z-50 pointer-events-none">
            <span className="text-xs font-bold text-neu-text">9:41</span>
            <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-neu-dark opacity-20"></div>
                <div className="w-4 h-4 rounded-full bg-neu-dark opacity-20"></div>
            </div>
            </div>

            {/* Dynamic Notch */}
            <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-neu-dark/10 rounded-b-2xl backdrop-blur-sm z-50 pointer-events-none"></div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
            <AnimatePresence mode='wait'>
                {!isAuthenticated ? (
                <motion.div 
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                >
                    <Login onLogin={() => setIsAuthenticated(true)} />
                </motion.div>
                ) : appData ? (
                    // Authenticated & Loaded Views
                    <>
                        {currentView === 'dashboard' && (
                            <motion.div key="dashboard" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full">
                                <Dashboard 
                                    identities={appData.identities}
                                    onOpenSettings={() => setCurrentView('settings_menu')}
                                    onManageBeings={() => setCurrentView('being_management')}
                                />
                            </motion.div>
                        )}
                        
                        {currentView === 'settings_menu' && (
                            <SettingsMenu 
                                onClose={() => setCurrentView('dashboard')}
                                onNavigate={handleSettingsNavigate}
                                onLogout={() => setIsAuthenticated(false)}
                            />
                        )}

                        {currentView === 'being_management' && (
                            <motion.div key="being" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:20, opacity:0}} className="h-full">
                                <BeingManagement 
                                    currentIdentities={appData.identities}
                                    onUpdateIdentities={handleIdentityUpdate}
                                    onBack={() => setCurrentView('dashboard')}
                                />
                            </motion.div>
                        )}

                        {/* New Settings Sub-Screens */}
                        {currentView === 'daily_writing' && (
                            <motion.div key="writing" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:20, opacity:0}} className="h-full">
                                <SimplePage 
                                    title="כתיבה יומית"
                                    type="textarea"
                                    value={appData.dailyWriting}
                                    placeholder="מה עולה בך היום?..."
                                    onSave={(val) => handleDataUpdate('dailyWriting', val)}
                                    onBack={() => setCurrentView('settings_menu')}
                                />
                            </motion.div>
                        )}

                        {currentView === 'daily_achievement' && (
                            <motion.div key="achievement" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:20, opacity:0}} className="h-full">
                                <SimplePage 
                                    title="ההישג היומי שלי"
                                    type="text"
                                    value={appData.keyTask.title}
                                    placeholder="הגדר הישג..."
                                    onSave={(val) => handleDataUpdate('keyTaskTitle', val)}
                                    onBack={() => setCurrentView('settings_menu')}
                                />
                            </motion.div>
                        )}

                        {currentView === 'edit_request' && (
                            <motion.div key="request" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:20, opacity:0}} className="h-full">
                                <SimplePage 
                                    title="עריכת בקשה"
                                    type="textarea"
                                    value={appData.personalRequest}
                                    placeholder="הכנס את הבקשה/כוונה שלך..."
                                    onSave={(val) => handleDataUpdate('personalRequest', val)}
                                    onBack={() => setCurrentView('settings_menu')}
                                />
                            </motion.div>
                        )}

                         {currentView === 'next_practice' && (
                            <motion.div key="next" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:20, opacity:0}} className="h-full">
                                <SimplePage 
                                    title="זמן תרגול קרוב"
                                    type="time"
                                    value={appData.nextPracticeTime}
                                    onSave={(val) => handleDataUpdate('nextPracticeTime', val)}
                                    onBack={() => setCurrentView('settings_menu')}
                                />
                            </motion.div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                )}
            </AnimatePresence>
            </div>

            {/* Bottom Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-neu-text/20 rounded-full z-50 mb-4 pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
