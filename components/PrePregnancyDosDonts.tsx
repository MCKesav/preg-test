
import React from 'react';
// Fix: Added missing Sparkles import from lucide-react
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle, Apple, Pill, Cigarette, Coffee, Stethoscope, Moon, Sparkles } from 'lucide-react';

const PrePregnancyDosDonts: React.FC = () => {
  const dos = [
    { icon: <Pill className="w-4 h-4" />, title: "Start Folic Acid", desc: "Take 400mcg daily to prevent neural tube defects." },
    { icon: <Stethoscope className="w-4 h-4" />, title: "Pre-conception Checkup", desc: "Screen for underlying conditions and update vaccines." },
    { icon: <Apple className="w-4 h-4" />, title: "Balanced Nutrition", desc: "Focus on leafy greens, lean protein, and whole grains." },
    { icon: <Moon className="w-4 h-4" />, title: "Regular Sleep", desc: "Regulate hormones with 7-9 hours of consistent rest." }
  ];

  const donts = [
    { icon: <Cigarette className="w-4 h-4" />, title: "Alcohol & Smoking", desc: "Both significantly reduce fertility and harm early development." },
    { icon: <Coffee className="w-4 h-4" />, title: "Excessive Caffeine", desc: "Limit intake to under 200mg (about 1-2 cups of coffee) per day." },
    { icon: <AlertTriangle className="w-4 h-4" />, title: "Self-Medication", desc: "Avoid over-the-counter drugs without consulting your OB-GYN." },
    { icon: <XCircle className="w-4 h-4" />, title: "High-Mercury Fish", desc: "Avoid shark, swordfish, and king mackerel during this phase." }
  ];

  return (
    <div className="surface-card p-8 rounded-[2.5rem] border border-white/40 overflow-hidden relative group transition-all animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-indigo-100 rounded-2xl">
              <ShieldCheck className="text-indigo-600 w-6 h-6" />
            </div>
            Pre-Conception Guide
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Foundational Health & Preparation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DOs Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100 w-fit">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Essential Do's</span>
          </div>
          <div className="space-y-4">
            {dos.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/40 rounded-3xl border border-white hover:bg-emerald-50/30 transition-all group/item">
                <div className="w-10 h-10 shrink-0 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 transition-transform group-hover/item:scale-110">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DONTs Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-2xl border border-rose-100 w-fit">
            <XCircle className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-black text-rose-700 uppercase tracking-widest">Crucial Don'ts</span>
          </div>
          <div className="space-y-4">
            {donts.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/40 rounded-3xl border border-white hover:bg-rose-50/30 transition-all group/item">
                <div className="w-10 h-10 shrink-0 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500 transition-transform group-hover/item:scale-110">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center gap-3">
        <div className="p-2 bg-white rounded-xl">
          <Sparkles className="w-4 h-4 text-indigo-500" />
        </div>
        <p className="text-[11px] text-indigo-800 font-bold">
          Healthy habits established now can positively impact your baby's health for a lifetime. Start today!
        </p>
      </div>
    </div>
  );
};

export default PrePregnancyDosDonts;
