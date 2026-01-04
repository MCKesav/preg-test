
import React, { useState } from 'react';
import { 
  HeartPulse, Calendar, ShieldCheck, Thermometer, Brain, 
  AlertCircle, ChevronRight, Activity, Clock, Droplets, 
  Moon, CheckCircle2, Info, Sparkles 
} from 'lucide-react';

const PostPartumDashboard: React.FC = () => {
  const [checklist, setChecklist] = useState({
    bleeding: false,
    fever: false,
    mood: false,
    pelvic: false
  });

  const recoveryMonth = 2; // Simulated: 2 months postpartum

  const stages = [
    { 
      label: 'Acute Recovery', 
      range: '0–6 Weeks', 
      desc: 'Physical healing & establishing feeding.',
      status: 'COMPLETED',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700'
    },
    { 
      label: 'Mental Health Window', 
      range: '6 Weeks–6 Months', 
      desc: 'High PPD risk window. Monitoring mental resilience.',
      status: 'ACTIVE',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-700'
    },
    { 
      label: 'Long-term Wellness', 
      range: '6–12 Months', 
      desc: 'Hormonal balancing & core restoration.',
      status: 'UPCOMING',
      color: 'bg-slate-300',
      textColor: 'text-slate-500'
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-1000">
      {/* 12-Month Persistence Header */}
      <section className="surface-card p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-50/50 to-white overflow-hidden relative border-indigo-100">
        <div className="absolute top-0 right-0 p-8">
          <Sparkles className="w-12 h-12 text-indigo-200 opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recovery Month {recoveryMonth}</h2>
            </div>
            <p className="text-slate-500 font-medium">Monitoring active until Month 12 • Care Continuity Phase</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all">
              <Calendar className="w-4 h-4" />
              Schedule 6m Checkup
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recovery Timeline Stages */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 px-4">FR-PP-A2: Structured Recovery Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stages.map((stage, idx) => (
              <div key={idx} className={`p-6 rounded-[2rem] border transition-all ${stage.status === 'ACTIVE' ? 'bg-white border-indigo-200 shadow-xl scale-105 z-10' : 'bg-white/40 border-white/60 opacity-60'}`}>
                <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${stage.textColor}`}>
                  {stage.range}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{stage.label}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{stage.desc}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color} ${stage.status === 'ACTIVE' ? 'animate-pulse' : ''}`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase">{stage.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Health Checklist FR-PP-A3 */}
          <section className="surface-card p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-xl">
                  <Activity className="text-rose-500 w-5 h-5" />
                </div>
                Daily Health Log
              </h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandatory Monitoring</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'bleeding', label: 'Normal Bleeding Patterns', icon: <Droplets className="w-5 h-5 text-rose-400" />, desc: 'No sudden increase or large clots.' },
                { id: 'fever', label: 'No Signs of Infection', icon: <Thermometer className="w-5 h-5 text-orange-400" />, desc: 'Temperature under 100.4°F.' },
                { id: 'mood', label: 'Mental Resilience', icon: <Brain className="w-5 h-5 text-purple-400" />, desc: 'Feeling capable & connected.' },
                { id: 'pelvic', label: 'Pelvic Recovery', icon: <HeartPulse className="w-5 h-5 text-indigo-400" />, desc: 'Pain levels decreasing steadily.' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                  className={`p-5 rounded-[1.75rem] border text-left transition-all flex gap-4 ${checklist[item.id as keyof typeof checklist] ? 'bg-emerald-50 border-emerald-100' : 'bg-white/40 border-white hover:bg-white'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${checklist[item.id as keyof typeof checklist] ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {checklist[item.id as keyof typeof checklist] ? <CheckCircle2 className="w-5 h-5" /> : item.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${checklist[item.id as keyof typeof checklist] ? 'text-emerald-900' : 'text-slate-800'}`}>{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Persistence & Sidebar Insights */}
        <div className="space-y-6">
          <div className="surface-card p-6 rounded-[2rem] bg-indigo-900 text-white border-none shadow-xl">
            <h4 className="font-bold flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-300" />
              Care Persistence
            </h4>
            <p className="text-xs text-indigo-100 leading-relaxed mb-6">
              FR-PP-A4: System monitoring continues for 12 months to address chronic issues often missed after the 6-week obstetrician discharge.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase">Status</span>
                <span className="text-[10px] font-black text-emerald-300 uppercase">Always Active</span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase">Next PPD Screen</span>
                <span className="text-[10px] font-black text-indigo-200 uppercase">In 2 Weeks</span>
              </div>
            </div>
          </div>

          <div className="surface-card p-6 rounded-[2rem]">
            <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-500" />
              Postpartum Insight
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Sleep deprivation mimics symptoms of PPD. Ensure you're getting at least one 4-hour block of uninterrupted sleep to help your brain regulate hormones."
            </p>
          </div>

          <section className="surface-card p-6 rounded-[2rem]">
            <h4 className="text-sm font-bold text-slate-800 mb-4">Partner Support Tasks</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                  <Moon className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-slate-700">Handle 2AM Feeding shift</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                  <Droplets className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-slate-700">Prep hydration & iron-rich snacks</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostPartumDashboard;
