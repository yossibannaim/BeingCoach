
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppData, ActionArea } from '../types';
import { NeuCard } from './NeuCard';
import { NeuButton } from './NeuButton';
import { NeuInput } from './NeuInput';
import { CheckCircle, AlertTriangle, Target, Zap, Activity, Award, Edit3, Trash2, Plus, Search, Battery, LayoutDashboard, TrendingUp, Calendar, List } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface DesktopAdminProps {
  data: AppData;
  onUpdate: (newData: AppData) => void;
}

type TabId = 'dashboard' | 'achievement' | 'daily' | 'keytask' | 'beings' | 'challenges' | 'recovery' | 'summary';

const TABS: { id: TabId; label: string; icon?: React.ElementType }[] = [
  { id: 'dashboard', label: 'לוח בקרה', icon: LayoutDashboard },
  { id: 'achievement', label: 'הישג מפתח' },
  { id: 'daily', label: 'משימות' },
  { id: 'keytask', label: 'משימת מפתח' },
  { id: 'beings', label: 'הוויות' },
  { id: 'challenges', label: 'אתגרים' },
  { id: 'recovery', label: 'התאוששות' },
  { id: 'summary', label: 'סיכום' },
];

export const DesktopAdmin: React.FC<DesktopAdminProps> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [newIdentity, setNewIdentity] = useState("");
  const [newChallenge, setNewChallenge] = useState("");
  const [newRecovery, setNewRecovery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateKeyAchievement = (field: string, value: string) => {
    onUpdate({
      ...data,
      keyAchievement: { ...data.keyAchievement, [field]: value }
    });
  };

  const handleUpdateKeyTask = (value: string) => {
    onUpdate({
      ...data,
      keyTask: { ...data.keyTask, title: value }
    });
  };

  // --- Beings Logic ---
  const toggleIdentity = (identity: string) => {
      let updated = [...data.identities];
      if (updated.includes(identity)) {
          updated = updated.filter(i => i !== identity);
      } else {
          updated.push(identity);
      }
      onUpdate({ ...data, identities: updated });
  };

  const addCustomIdentity = () => {
    if (newIdentity.trim() && !data.identities.includes(newIdentity.trim())) {
      onUpdate({ ...data, identities: [...data.identities, newIdentity.trim()] });
      setNewIdentity("");
    }
  };
  
  // --- Challenges Logic ---
  const addChallenge = (text: string) => {
    if (text.trim()) {
      onUpdate({ ...data, challenges: [...data.challenges, { id: Date.now().toString(), text: text }] });
      setNewChallenge("");
    }
  };

  const removeChallenge = (id: string) => {
     onUpdate({ ...data, challenges: data.challenges.filter(c => c.id !== id) });
  };

  // --- Recovery Logic ---
  const addRecovery = (text: string) => {
    if (text.trim()) {
      onUpdate({ ...data, recoveryStrategies: [...data.recoveryStrategies, { id: Date.now().toString(), text: text }] });
      setNewRecovery("");
    }
  };

  const removeRecovery = (id: string) => {
     onUpdate({ ...data, recoveryStrategies: data.recoveryStrategies.filter(c => c.id !== id) });
  };

  // --- Render Sections ---

  const renderNav = () => (
    <div className="flex flex-wrap w-full gap-2 pb-2 pt-2 px-4" dir="rtl">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.95 }}
            className={`
              relative px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 outline-none flex items-center gap-2
              ${isActive 
                ? 'bg-neu-base text-neu-accent shadow-neu-pressed' 
                : 'bg-neu-base text-neu-textLight shadow-neu-flat hover:text-neu-text hover:-translate-y-0.5'}
            `}
          >
            {Icon && <Icon size={16} />}
            {tab.label}
          </motion.button>
        );
      })}
    </div>
  );

  // --- Dashboard Logic ---
  const renderDashboard = () => (
      <div className="space-y-6">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NeuCard className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-neu-textLight text-xs font-bold uppercase tracking-wider mb-1">מדד נוכחות ממוצע</p>
                      <h3 className="text-3xl font-bold text-neu-text">88%</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neu-base shadow-neu-flat flex items-center justify-center text-green-500">
                      <TrendingUp size={24} />
                  </div>
              </NeuCard>
              <NeuCard className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-neu-textLight text-xs font-bold uppercase tracking-wider mb-1">רצף תרגול</p>
                      <h3 className="text-3xl font-bold text-neu-text">14 ימים</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neu-base shadow-neu-flat flex items-center justify-center text-neu-accent">
                      <Calendar size={24} />
                  </div>
              </NeuCard>
              <NeuCard className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-neu-textLight text-xs font-bold uppercase tracking-wider mb-1">פעולות שבוצעו</p>
                      <h3 className="text-3xl font-bold text-neu-text">156</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neu-base shadow-neu-flat flex items-center justify-center text-blue-500">
                      <CheckCircle size={24} />
                  </div>
              </NeuCard>
          </div>

          {/* Main Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Graph */}
              <NeuCard className="p-6 lg:col-span-2 min-h-[350px]">
                  <h3 className="text-lg font-bold text-neu-text mb-6">מדדי נוכחות לתקופה</h3>
                  <div className="h-[280px] w-full" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={data.dashboardStats.dailyHistory}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E0" vertical={false} />
                              <XAxis dataKey="date" stroke="#A0AEC0" tick={{fontSize: 12}} />
                              <YAxis stroke="#A0AEC0" tick={{fontSize: 12}} domain={[0, 100]} />
                              <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '9px 9px 16px rgb(163,177,198,0.6)' }}
                                itemStyle={{ color: '#4A5568', fontWeight: 'bold' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="score" 
                                stroke="#D4AF37" 
                                strokeWidth={3} 
                                dot={{ r: 4, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 7 }} 
                              />
                          </LineChart>
                      </ResponsiveContainer>
                  </div>
              </NeuCard>

              {/* Pie Chart */}
              <NeuCard className="p-6 min-h-[350px]">
                  <h3 className="text-lg font-bold text-neu-text mb-2">התפלגות הוויות</h3>
                  <div className="h-[250px] w-full relative" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                              <Pie
                                  data={data.dashboardStats.identityUsage}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="count"
                              >
                                  {data.dashboardStats.identityUsage.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                              </Pie>
                              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '5px 5px 10px rgba(0,0,0,0.1)' }} />
                          </PieChart>
                      </ResponsiveContainer>
                      {/* Legend */}
                      <div className="flex flex-wrap justify-center gap-2 mt-4" dir="rtl">
                          {data.dashboardStats.identityUsage.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                  <span className="text-xs text-neu-text">{item.name}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </NeuCard>
          </div>

          {/* Bar Chart & Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <NeuCard className="p-6">
                  <h3 className="text-lg font-bold text-neu-text mb-6">ביצוע לפי קטגוריה</h3>
                  <div className="h-[250px] w-full" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.dashboardStats.categoryPerformance} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#CBD5E0" />
                              <XAxis type="number" domain={[0, 100]} stroke="#A0AEC0" />
                              <YAxis dataKey="name" type="category" width={80} stroke="#4A5568" tick={{fontSize: 12, fontWeight: 500}} />
                              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px' }} />
                              <Bar dataKey="value" fill="#A3B1C6" radius={[0, 4, 4, 0]} barSize={20}>
                                {data.dashboardStats.categoryPerformance.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#D4AF37' : '#A3B1C6'} />
                                ))}
                              </Bar>
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
               </NeuCard>

               <NeuCard className="p-6 overflow-hidden">
                   <h3 className="text-lg font-bold text-neu-text mb-4">פעילות אחרונה</h3>
                   <div className="overflow-x-auto">
                       <table className="w-full text-sm text-neu-text">
                           <thead>
                               <tr className="border-b border-neu-textLight/20 text-neu-textLight">
                                   <th className="pb-2 text-right font-medium">תאריך</th>
                                   <th className="pb-2 text-right font-medium">פעילות</th>
                                   <th className="pb-2 text-right font-medium">קטגוריה</th>
                                   <th className="pb-2 text-left font-medium">ציון</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-neu-textLight/10">
                               {data.dashboardStats.recentLogs.map((log) => (
                                   <tr key={log.id} className="hover:bg-black/5 transition-colors">
                                       <td className="py-3 pl-2">
                                           <div className="font-bold">{log.time}</div>
                                           <div className="text-xs text-neu-textLight">{log.date}</div>
                                       </td>
                                       <td className="py-3">{log.action}</td>
                                       <td className="py-3">
                                           <span className="px-2 py-1 rounded-full text-xs bg-neu-base shadow-neu-flat text-neu-textLight">
                                               {log.category}
                                           </span>
                                       </td>
                                       <td className="py-3 text-left font-bold text-neu-accent">{log.score}</td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
               </NeuCard>
          </div>
      </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-neu-base rounded-3xl shadow-neu-flat overflow-hidden border-4 border-neu-base/50">
      {/* Top Header Bar */}
      <div className="bg-neu-base p-6 pb-4 z-20 relative shadow-sm">
         <div className="flex justify-between items-start mb-6">
             <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-neu-text flex items-center gap-3">
                  <Activity className="text-neu-accent" />
                  סטודיו לניהול תהליך
                </h1>
                <span className="text-lg text-neu-textLight mr-9">Being Coach</span>
             </div>
             <div className="px-3 py-1 rounded-full bg-neu-base shadow-neu-pressed">
                <span className="text-[10px] text-neu-accent font-mono uppercase tracking-widest font-bold">ADMIN MODE</span>
             </div>
         </div>
         {renderNav()}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-neu-base custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto pb-10"
          >
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && renderDashboard()}

            {/* 1. Key Achievement */}
            {activeTab === 'achievement' && (
              <NeuCard className="p-8">
                <div className="flex items-center gap-4 mb-6 text-neu-accent">
                   <Award size={32} />
                   <h2 className="text-2xl font-bold text-neu-text">הגדרת הישג מפתח לתקופה</h2>
                </div>
                <div className="space-y-6">
                   <div>
                       <label className="block text-neu-text font-bold mb-2">שם ההישג</label>
                       <NeuInput 
                          value={data.keyAchievement.title} 
                          onChange={(e) => handleUpdateKeyAchievement('title', e.target.value)}
                       />
                   </div>
                   <div>
                       <label className="block text-neu-text font-bold mb-2">תאריך יעד</label>
                       <NeuInput 
                          type="date"
                          value={data.keyAchievement.targetDate} 
                          onChange={(e) => handleUpdateKeyAchievement('targetDate', e.target.value)}
                       />
                   </div>
                   <div>
                       <label className="block text-neu-text font-bold mb-2">תיאור ופרטים נוספים</label>
                       <textarea 
                          className="w-full p-4 rounded-xl bg-neu-base shadow-neu-pressed border-none outline-none text-neu-text min-h-[150px] focus:shadow-neu-pressed transition-shadow"
                          value={data.keyAchievement.description}
                          onChange={(e) => handleUpdateKeyAchievement('description', e.target.value)}
                       />
                   </div>
                </div>
              </NeuCard>
            )}

            {/* 2. Daily Tasks (Action Areas) */}
            {activeTab === 'daily' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {data.actionAreas.map((area) => (
                    <NeuCard key={area.objectId} className="p-5 flex flex-col justify-between min-h-[200px] relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                       <div className={`absolute top-0 left-0 w-2 h-full ${area.isTarget ? 'bg-neu-accent' : 'bg-gray-300'}`}></div>
                       <div className="pl-4">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-neu-text">{area.name}</h3>
                              {area.isTarget && <Target className="text-neu-accent" size={18}/>}
                           </div>
                           <p className="text-sm text-neu-textLight mt-2 mb-4 line-clamp-2">{area.questions[0]}</p>
                           
                           {area.itemsEx && (
                               <div className="flex flex-wrap gap-2 mb-4">
                                   {area.itemsEx.slice(0, 3).map((item, i) => (
                                       <span key={i} className="text-[10px] px-2 py-1 bg-neu-base shadow-neu-flat rounded-md text-neu-textLight">{item.name}</span>
                                   ))}
                                   {area.itemsEx.length > 3 && <span className="text-[10px] px-2 py-1 text-neu-textLight">+{area.itemsEx.length - 3}</span>}
                               </div>
                           )}

                           <div className="flex gap-2">
                              <span className="text-xs bg-neu-base shadow-neu-flat px-2 py-1 rounded text-neu-textLight">Min: {area.sliderMin}</span>
                              <span className="text-xs bg-neu-base shadow-neu-flat px-2 py-1 rounded text-neu-textLight">Max: {area.sliderMax}</span>
                           </div>
                       </div>
                       <NeuButton className="mt-4 text-sm self-end !py-2 !px-4">
                          <Edit3 size={16} className="ml-2" /> ערוך
                       </NeuButton>
                    </NeuCard>
                 ))}
              </div>
            )}

            {/* 3. Key Task */}
            {activeTab === 'keytask' && (
               <NeuCard className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-24 h-24 rounded-full bg-neu-base shadow-neu-flat flex items-center justify-center mb-8 text-neu-accent">
                    <Zap size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-neu-text mb-4">משימת מפתח יומית</h2>
                  <p className="text-neu-textLight mb-12 max-w-md">מהי המשימה האחת שאם תבצע אותה היום, היום שלך ייחשב להצלחה?</p>
                  <div className="w-full max-w-lg">
                    <NeuInput 
                        className="text-center text-xl font-bold !py-4"
                        value={data.keyTask.title}
                        onChange={(e) => handleUpdateKeyTask(e.target.value)}
                        placeholder="הכנס את המשימה כאן..."
                    />
                  </div>
               </NeuCard>
            )}

            {/* 4. Beings Selection */}
            {activeTab === 'beings' && (
              <div className="space-y-8">
                 <NeuCard className="p-6">
                     <h3 className="text-lg font-bold text-neu-text mb-4">הוויות נבחרות</h3>
                     <div className="flex flex-wrap gap-3">
                        {data.identities.map((id, idx) => (
                           <motion.div 
                              layout
                              key={idx} 
                              className="flex items-center gap-2 px-4 py-2 bg-neu-base shadow-neu-pressed rounded-xl border border-neu-accent/20"
                           >
                              <span className="font-bold text-neu-text">{id}</span>
                              <button onClick={() => toggleIdentity(id)} className="text-neu-textLight hover:text-red-500 transition-colors">
                                 <Trash2 size={16} />
                              </button>
                           </motion.div>
                        ))}
                     </div>
                 </NeuCard>

                 <NeuCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-neu-text flex items-center gap-2">
                            <Award size={20} className="text-neu-accent"/>
                            מאגר הוויות
                        </h3>
                        <div className="w-48">
                            <NeuInput 
                                placeholder="חפש הוויה..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                icon={<Search size={16} />}
                                className="!py-2"
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto p-2">
                       {data.poolIdentities.filter(i => i.includes(searchQuery)).map(word => (
                          <motion.button
                             key={word}
                             whileTap={{ scale: 0.95 }}
                             onClick={() => toggleIdentity(word)}
                             className={`px-3 py-2 rounded-xl text-sm font-medium transition-all text-center ${
                                data.identities.includes(word) 
                                ? 'bg-neu-accent text-white shadow-neu-pressed opacity-50'
                                : 'bg-neu-base text-neu-text shadow-neu-flat hover:text-neu-accent'
                             }`}
                          >
                             {word}
                          </motion.button>
                       ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200/10 flex gap-2">
                        <NeuInput 
                            value={newIdentity}
                            onChange={(e) => setNewIdentity(e.target.value)}
                            placeholder="הוסף הוויה מותאמת אישית..."
                            className="flex-1"
                        />
                        <NeuButton onClick={addCustomIdentity} variant="accent">
                            <Plus />
                        </NeuButton>
                    </div>
                 </NeuCard>
              </div>
            )}

            {/* 5. Challenges */}
            {activeTab === 'challenges' && (
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6 p-4 bg-red-50/50 rounded-2xl border border-red-100/50">
                     <AlertTriangle className="text-red-500" />
                     <h2 className="text-xl font-bold text-neu-text">ניהול אתגרים ומחסומים</h2>
                  </div>
                  
                  {/* Selected Challenges */}
                  <div className="grid gap-4">
                    {data.challenges.map(c => (
                        <NeuCard key={c.id} className="p-4 flex justify-between items-center border-r-4 border-red-400">
                            <span className="text-neu-text font-medium">{c.text}</span>
                            <button onClick={() => removeChallenge(c.id)} className="text-neu-textLight hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                            </button>
                        </NeuCard>
                    ))}
                  </div>

                  {/* Add New Challenge (Pool + Custom) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <NeuCard className="p-6 bg-neu-base">
                        <h4 className="text-sm font-bold text-neu-textLight mb-3">בחר מתוך המאגר</h4>
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                            {data.poolChallenges.map((c, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => addChallenge(c)}
                                    className="w-full text-right p-2 text-sm text-neu-text hover:bg-black/5 rounded-lg transition-colors"
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                      </NeuCard>

                      <NeuCard className="p-6 bg-neu-base h-fit">
                        <h4 className="text-sm font-bold text-neu-textLight mb-3">הוסף אתגר מותאם אישית</h4>
                        <div className="flex gap-3">
                            <NeuInput 
                            value={newChallenge}
                            onChange={(e) => setNewChallenge(e.target.value)}
                            placeholder="מה חוסם אותך?..."
                            />
                            <NeuButton onClick={() => addChallenge(newChallenge)} variant="accent">
                            הוסף
                            </NeuButton>
                        </div>
                      </NeuCard>
                  </div>
               </div>
            )}

            {/* 6. Recovery */}
            {activeTab === 'recovery' && (
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6 p-4 bg-green-50/50 rounded-2xl border border-green-100/50">
                     <BatteryIcon />
                     <h2 className="text-xl font-bold text-neu-text">התאוששות מהירה (Energy Boosters)</h2>
                  </div>
                  
                  {/* Selected Strategies */}
                  <div className="grid gap-4">
                    {data.recoveryStrategies.map(c => (
                        <NeuCard key={c.id} className="p-4 flex justify-between items-center border-r-4 border-green-400">
                            <span className="text-neu-text font-medium">{c.text}</span>
                            <button onClick={() => removeRecovery(c.id)} className="text-neu-textLight hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                            </button>
                        </NeuCard>
                    ))}
                  </div>

                  {/* Add New Recovery (Pool + Custom) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <NeuCard className="p-6 bg-neu-base">
                        <h4 className="text-sm font-bold text-neu-textLight mb-3">בחר מתוך המאגר</h4>
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                            {data.poolRecoveryStrategies.map((c, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => addRecovery(c)}
                                    className="w-full text-right p-2 text-sm text-neu-text hover:bg-black/5 rounded-lg transition-colors"
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                      </NeuCard>

                      <NeuCard className="p-6 bg-neu-base h-fit">
                        <h4 className="text-sm font-bold text-neu-textLight mb-3">הוסף בוסטר אנרגיה</h4>
                        <div className="flex gap-3">
                            <NeuInput 
                            value={newRecovery}
                            onChange={(e) => setNewRecovery(e.target.value)}
                            placeholder="פעולה שמעלה אנרגיה..."
                            />
                            <NeuButton onClick={() => addRecovery(newRecovery)} variant="accent">
                            הוסף
                            </NeuButton>
                        </div>
                      </NeuCard>
                  </div>
               </div>
            )}

            {/* 7. Summary */}
            {activeTab === 'summary' && (
               <NeuCard className="p-8 h-full min-h-[500px] flex flex-col">
                  <h2 className="text-xl font-bold text-neu-text mb-4">סיכום תהליך אישי</h2>
                  <p className="text-sm text-neu-textLight mb-6">כתוב כאן את התובנות המרכזיות שלך מתהליך האימון עד כה.</p>
                  <textarea 
                     className="w-full flex-1 p-6 rounded-2xl bg-neu-base shadow-neu-pressed border-none outline-none text-neu-text resize-none text-lg leading-relaxed focus:ring-1 ring-neu-accent/20 transition-all"
                     placeholder="התחל לכתוב..."
                     value={data.processSummary}
                     onChange={(e) => onUpdate({ ...data, processSummary: e.target.value })}
                  />
                  <div className="mt-6 flex justify-end">
                     <NeuButton variant="accent">
                        <CheckCircle className="ml-2" size={18} /> שמור סיכום
                     </NeuButton>
                  </div>
               </NeuCard>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const BatteryIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><line x1="6" y1="10" x2="6" y2="14"></line><line x1="10" y1="10" x2="10" y2="14"></line></svg>
);
