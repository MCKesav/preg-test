
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Droplets, Sparkles, Thermometer, Brain, Heart, Info, CheckCircle2, Watch, RefreshCw } from 'lucide-react';

const MenstrualTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(14); // Mock today
  const [isLogged, setIsLogged] = useState(false);
  const [isWatchConnected, setIsWatchConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Mock Cycle Logic
  // Assuming a 28-day cycle starting on day 2
  const periodStart = 2;
  const periodEnd = 6;
  const fertileStart = 11;
  const ovulationDay = 15;
  const fertileEnd = 16;

  const getDayStatus = (day: number) => {
    if (day >= periodStart && day <= periodEnd) return 'PERIOD';
    if (day === ovulationDay) return 'OVULATION';
    if (day >= fertileStart && day <= fertileEnd) return 'FERTILE';
    return 'REGULAR';
  };

  const handleWatchSync = () => {
    setIsSyncing(true);
    // Simulate Google Fit Bridge Delay
    setTimeout(() => {
      setIsWatchConnected(true);
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <section className="surface-card p-8 rounded-[2.5rem] relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-rose-100 rounded-2xl">
                <Droplets className="text-rose-500 w-6 h-6" />
              </div>
              Menstrual Cycle Tracker
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Conception Planning & Cycle Awareness</p>
          </div>

          {/* CMF Watch Sync Pill */}
          <button 
            onClick={handleWatchSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all active:scale-95 group ${
              isWatchConnected 
              ? 'bg-slate-900 border-slate-800 text-white shadow-lg' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200'
            }`}
          >
            <div className="relative">
              <Watch className={`w-3.5 h-3.5 ${isSyncing ? 'animate-bounce' : ''}`} />
              <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full border border-white ${isWatchConnected ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">
              {isSyncing ? 'Syncing...' : isWatchConnected ? 'CMF Watch Pro 2' : 'Link CMF Watch'}
            </span>
            <RefreshCw className={`w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity ${isSyncing ? 'animate-spin' : ''}`} />
            
            {/* Tiny Google Fit Icon inside the pill for context */}
            {isWatchConnected && (
              <img src="https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png" className="w-3 h-3 ml-1" alt="Fit" />
            )}
          </button>
        </div>

        <div className="flex gap-3">
           <button 
             onClick={() => setIsLogged(!isLogged)}
             className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-tight flex items-center gap-2 transition-all ${isLogged ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-500 text-white shadow-lg shadow-rose-100 hover:scale-105 active:scale-95'}`}
           >
             {isLogged ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
             {isLogged ? 'Period Logged' : 'Log Period Start'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Cycle Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-rose-50/50 border border-white rounded-[2rem] relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-2">Current Phase</p>
              <h3 className="text-2xl font-serif font-bold text-rose-900">Follicular Phase</h3>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-2 flex-1 bg-rose-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-rose-500 rounded-full" />
                </div>
                <span className="text-[10px] font-black text-rose-500">Day 14/28</span>
              </div>
            </div>
            <Sparkles className="absolute -bottom-6 -right-6 w-24 h-24 text-rose-100 rotate-12" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/40 border border-white rounded-[1.75rem] text-center">
              <Thermometer className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Basal Temp</p>
              <p className="text-lg font-black text-slate-800">36.5°C</p>
            </div>
            <div className="p-4 bg-white/40 border border-white rounded-[1.75rem] text-center">
              <Heart className="w-5 h-5 text-rose-400 mx-auto mb-2" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fertility</p>
              <p className="text-lg font-black text-rose-600">High</p>
            </div>
          </div>

          <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[2rem]">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tracking Tools</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:bg-rose-50 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-600">Symptoms & Mood</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:bg-rose-50 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-slate-600">Cervical Mucus</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive Calendar */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="font-bold text-slate-800">{monthName} {currentDate.getFullYear()}</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-4 mr-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Period</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Fertile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Ovulation</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-rose-50 rounded-xl transition-colors"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                <button className="p-2 hover:bg-rose-50 rounded-xl transition-colors"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-slate-400 p-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} className="aspect-square" />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const status = getDayStatus(day);
              const isSelected = day === selectedDay;

              return (
                <div 
                  key={day} 
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square relative flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group rounded-[1.25rem] border ${
                    isSelected 
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xl scale-110 z-10' 
                    : 'border-white/40 bg-white/40 text-slate-700'
                  }`}
                >
                  <span className={`text-[11px] font-black ${isSelected ? 'text-white' : 'text-slate-600'}`}>{day}</span>
                  
                  {/* Status Indicators */}
                  {status === 'PERIOD' && !isSelected && (
                    <div className="absolute inset-0 bg-rose-400/20 rounded-[1.25rem] border border-rose-300" />
                  )}
                  {status === 'FERTILE' && !isSelected && (
                    <div className="absolute inset-x-1 bottom-1 h-1 bg-emerald-400 rounded-full" />
                  )}
                  {status === 'OVULATION' && !isSelected && (
                    <div className="absolute inset-x-1 bottom-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  )}
                  
                  {/* Special indicator for the predicted ovulation day within its box */}
                  {status === 'OVULATION' && (
                    <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-500'}`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex gap-3">
             <Info className="w-5 h-5 text-indigo-500 shrink-0" />
             <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
               Your <b>estimated ovulation</b> is in 1 day. This is your most fertile window. Consistent basal body temperature (BBT) tracking can help pinpoint exact timing.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenstrualTracker;
