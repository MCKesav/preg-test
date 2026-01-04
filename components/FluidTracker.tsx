
import React, { useState } from 'react';
import { Droplet, Zap, Plus, Minus } from 'lucide-react';

const FluidTracker: React.FC = () => {
  const [water, setWater] = useState(1.8); // Liters
  const [electrolytes, setElectrolytes] = useState(1); // Servings
  
  const waterGoal = 4.0;
  const electroGoal = 4;

  const waterPercent = Math.min((water / waterGoal) * 100, 100);
  const electroPercent = Math.min((electrolytes / electroGoal) * 100, 100);

  const MeterTrack = ({ percent, goal, colorClass, bgColorClass, icon: Icon, label, value, unit, onAdd, onSub }: any) => {
    // Generate labels based on goal (integer steps)
    const labels = [];
    for (let i = 1; i <= Math.floor(goal); i++) {
      labels.push(i);
    }

    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-[120px]">
        <div className="relative h-56 w-20 flex items-end justify-center">
          {/* Measurement Labels Container */}
          <div className="absolute left-0 bottom-6 h-48 w-6 flex flex-col-reverse justify-between py-1 pointer-events-none">
            {labels.map((num) => (
              <div 
                key={num} 
                className="text-[9px] font-black text-slate-400 text-right pr-1"
                style={{ position: 'absolute', bottom: `${(num / goal) * 100}%`, transform: 'translateY(50%)', width: '100%' }}
              >
                {num}{unit.trim()}
              </div>
            ))}
          </div>

          {/* The Stem */}
          <div className={`relative bottom-6 w-5 h-48 ${bgColorClass} rounded-t-full border-x border-t border-black/5 overflow-hidden shadow-inner ml-6`}>
            {/* Stem Fill */}
            <div 
              className={`absolute bottom-0 left-0 w-full ${colorClass} transition-all duration-1000 ease-out`}
              style={{ height: `${percent}%` }}
            >
              <div className="w-full h-full opacity-20 animate-pulse bg-white/40" />
            </div>
            {/* Ticks */}
            <div className="absolute inset-0 flex flex-col-reverse justify-between py-1 pointer-events-none opacity-10">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-[1px] w-full bg-slate-900" style={{ marginBottom: `${(1/8)*100}%` }} />
              ))}
            </div>
          </div>

          {/* The Bulb (Circle ball at bottom) */}
          <div className={`absolute bottom-0 z-10 w-12 h-12 rounded-full border border-black/5 shadow-md flex items-center justify-center ${bgColorClass} overflow-hidden ml-6`}>
             <div className={`absolute inset-0 ${colorClass} transition-opacity duration-500 ${percent > 0 ? 'opacity-100' : 'opacity-20'}`}>
                <div className="w-full h-full opacity-10 animate-pulse bg-white/40" />
             </div>
             <Icon className={`relative z-20 w-5 h-5 ${percent > 0 ? 'text-white' : 'text-slate-300'} transition-colors`} />
          </div>
        </div>

        <div className="text-center ml-6">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</span>
          <p className="text-sm font-black text-slate-800">{value}{unit}</p>
          <div className="flex gap-2 mt-3 justify-center">
            <button 
              onClick={onSub} 
              className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all active:scale-90"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={onAdd} 
              className={`p-1.5 rounded-xl text-white shadow-lg transition-all active:scale-90 ${colorClass}`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="surface-card p-8 rounded-[2.5rem] relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Fluid Hit</h3>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
        </div>
      </div>

      <div className="flex justify-around items-end gap-2 pr-4">
        <MeterTrack 
          percent={waterPercent}
          goal={waterGoal}
          colorClass="bg-gradient-to-t from-sky-600 to-sky-400"
          bgColorClass="bg-sky-50"
          icon={Droplet}
          label="Water"
          value={water.toFixed(1)}
          unit="L"
          onAdd={() => setWater(water + 0.2)}
          onSub={() => setWater(Math.max(0, water - 0.2))}
        />

        <MeterTrack 
          percent={electroPercent}
          goal={electroGoal}
          colorClass="bg-gradient-to-t from-amber-600 to-amber-400"
          bgColorClass="bg-amber-50"
          icon={Zap}
          label="Hydrate+"
          value={electrolytes}
          unit=" Sv"
          onAdd={() => setElectrolytes(electrolytes + 1)}
          onSub={() => setElectrolytes(Math.max(0, electrolytes - 1))}
        />
      </div>

      <div className="mt-8 p-5 bg-slate-50/50 rounded-[2rem] border border-slate-100/50">
        <p className="text-[10px] text-slate-500 font-bold leading-relaxed flex gap-2">
          <span className="text-rose-500 font-black shrink-0">TIP:</span> 
          <span>Proper electrolyte balance prevents muscle cramps and swelling in Trimester 2. Target 3.5L total fluid.</span>
        </p>
      </div>
    </section>
  );
};

export default FluidTracker;
