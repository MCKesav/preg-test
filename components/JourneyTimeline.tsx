
import React from 'react';
import { Sparkles, HeartPulse, ShieldCheck, Baby } from 'lucide-react';
import { PREGNANCY_JOURNEY_DATA } from '../constants';

const JourneyCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[380px] snap-center bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_12px_40px_-15px_rgba(225,29,72,0.1)] border border-white/40 overflow-hidden group transition-all hover:shadow-2xl hover:-translate-y-2">
      {/* Media Area - Displays Month 1 image if available, else a beautiful baby pink gradient */}
      <div className="h-64 relative overflow-hidden bg-gradient-to-br from-rose-100 via-rose-50 to-rose-200/50 flex items-center justify-center border-b border-white">
        {item.staticImage ? (
          <img 
            src={item.staticImage} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* Subtle Decorative Icon for empty states */
          <div className="relative">
            <div className="absolute inset-0 bg-rose-300/20 blur-2xl rounded-full scale-150 animate-pulse" />
            <Baby className="w-16 h-16 text-rose-300 relative z-10 opacity-60 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
          </div>
        )}
        
        {/* Soft overlay gradient for image legibility if needed, though mostly stylistic here */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
        
        {/* Month Badge */}
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[11px] font-black text-rose-600 shadow-sm uppercase tracking-[0.1em] border border-white z-20">
          Month {item.month}
        </div>
      </div>
      
      <div className="p-8 space-y-5">
        <div>
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{item.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-2">
            {item.highlights}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-rose-50/40 p-4 rounded-[1.75rem] border border-white">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-black text-rose-800 uppercase tracking-widest">Feelings</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight font-medium">{item.symptoms}</p>
          </div>
          <div className="bg-emerald-50/40 p-4 rounded-[1.75rem] border border-white">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Nurture</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight font-medium">{item.tips}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const JourneyTimeline: React.FC = () => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-rose-100 rounded-2xl">
            <Sparkles className="text-rose-500 w-6 h-6" />
          </div>
          Fetal Growth Timeline
        </h2>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Swipe to Explore</span>
           <div className="w-2 h-2 bg-rose-200 rounded-full animate-ping" />
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-8 gap-8 snap-x snap-mandatory no-scrollbar scroll-smooth px-2">
        {PREGNANCY_JOURNEY_DATA.map((item) => (
          <JourneyCard key={item.month} item={item} />
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;
