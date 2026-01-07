
import React, { useState, useEffect } from 'react';
import {
  Activity, Droplets, Scale, Heart, Wind, Brain, ShieldCheck,
  Moon, Volume2, Stethoscope, ClipboardList, CheckCircle2
} from 'lucide-react';
import VitalsChart from './VitalsChart';
import JourneyTimeline from './JourneyTimeline';
import DeviceSync from './DeviceSync';
import FluidTracker from './FluidTracker';
import PregnancyCalendar from './PregnancyCalendar';
import PostPregnancy from './PostPregnancy';
import PostPartumDashboard from './PostPartumDashboard';
import MenstrualTracker from './MenstrualTracker';
import PrePregnancyDosDonts from './PrePregnancyDosDonts';
import { BABY_DATA } from '../constants';
import { getBabyInsight } from '../services/gemini';
import { SyncData } from '../services/health';
import { PregnancyPhase } from '../types';

interface MotherDashboardProps {
  phase: PregnancyPhase;
}

type VitalType = 'SUGAR' | 'HEART_RATE' | 'SPO2' | 'STRESS' | 'WEIGHT' | 'SLEEP' | 'SNORING';

const MotherDashboard: React.FC<MotherDashboardProps> = ({ phase }) => {
  const currentWeek = 24;
  const [activeVital, setActiveVital] = useState<VitalType>('STRESS');
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  // Real-time data states
  const [vitals, setVitals] = useState({
    hr: 73,
    spO2: 98,
    sugar: 105,
    weight: 64.2,
    stress: 35,
    sleep: 7.5,
    snoring: 15
  });

  const handleSyncComplete = (data: SyncData) => {
    setVitals(prev => ({
      ...prev,
      hr: data.heartRate,
      spO2: data.spO2,
      stress: data.stress || 35
    }));
    setIsDeviceConnected(true);
  };

  const statItems = [
    { id: 'SUGAR', label: 'Sugar', val: vitals.sugar, unit: 'mg/dL', icon: <Droplets className="w-5 h-5 text-red-500" />, bg: 'bg-red-50/50', activeBorder: 'border-red-300' },
    { id: 'HEART_RATE', label: 'Heart Rate', val: vitals.hr, unit: 'bpm', icon: <Heart className={`w-5 h-5 text-red-500 ${vitals.hr > 80 ? 'animate-bounce' : 'animate-pulse'}`} />, bg: 'bg-red-50/50', activeBorder: 'border-red-400' },
    { id: 'SPO2', label: 'SpO2', val: vitals.spO2, unit: '%', icon: <Wind className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50/50', activeBorder: 'border-emerald-300' },
    { id: 'STRESS', label: 'Stress', val: vitals.stress, unit: '/100', icon: <Brain className={`w-5 h-5 text-purple-500 ${vitals.stress > 60 ? 'animate-pulse' : ''}`} />, bg: 'bg-purple-50/50', activeBorder: 'border-purple-300' },
    { id: 'SLEEP', label: 'Sleep', val: vitals.sleep, unit: 'hrs', icon: <Moon className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-50/50', activeBorder: 'border-indigo-300' },
    { id: 'SNORING', label: 'Snoring', val: vitals.snoring, unit: 'min', icon: <Volume2 className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50/50', activeBorder: 'border-amber-300' },
    { id: 'WEIGHT', label: 'Weight', val: vitals.weight, unit: 'kg', icon: <Scale className="w-5 h-5 text-slate-500" />, bg: 'bg-slate-50/50', activeBorder: 'border-slate-300' },
  ];

  const renderPhaseContent = () => {
    switch (phase) {
      case PregnancyPhase.PRE:
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <JourneyTimeline />
            <MenstrualTracker />
            <PrePregnancyDosDonts />
          </div>
        );
      case PregnancyPhase.POSTPARTUM:
        return <PostPartumDashboard />;
      case PregnancyPhase.POST:
        return <PostPregnancy />;
      case PregnancyPhase.IN:
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-700">
            {/* Left Column: Vitals & Tracking */}
            <div className="lg:col-span-2 space-y-8">
              {/* Doctor's Report Section */}
              <section className="surface-card p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-indigo-50/30 border-indigo-100 shadow-xl shadow-indigo-100/10">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                      <Stethoscope className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Doctor's Clinical Summary</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Last Update: Oct 12 by Dr. Aditi Sharma</p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Clinical Record
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-5 bg-white/60 rounded-3xl border border-indigo-50 shadow-sm">
                      <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-2">Diagnosis & Status</h4>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">
                        G1P0 gestation at 24 weeks. Overall clinical status is <span className="text-emerald-600 font-black">STABLE</span>. Fetal growth matches gestational age perfectly.
                      </p>
                    </div>
                    <div className="p-5 bg-white/60 rounded-3xl border border-indigo-50 shadow-sm">
                      <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-2">Clinical Observations</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        Fetal Heart Rate baseline at 145 bpm with moderate variability. Patient reports mild lumbar strain and improved sleep since last session. Blood pressure is within normal ranges.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 px-2">
                      <ClipboardList className="w-4 h-4 text-rose-500" />
                      Prescribed Instructions
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Sleep strictly on the left lateral position to optimize placental flow.",
                        "Schedule Glucose Challenge Test (GCT) for early next week.",
                        "Maintain 3.5L daily hydration goal persistently.",
                        "Continue prenatal yoga but avoid deep pelvic stretches."
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-sm transition-all hover:bg-rose-50 group">
                          <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-700 leading-tight">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Live Vitals Section */}
              <section className="surface-card p-8 rounded-[2.5rem]">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                    <div className="w-10 h-10 bg-rose-100 rounded-2xl flex items-center justify-center">
                      <Activity className="text-rose-500 w-6 h-6" />
                    </div>
                    Live Vitals
                  </h2>

                  {isDeviceConnected ? (
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 transition-all">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] font-black text-emerald-700 uppercase tracking-tighter">Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-red-50 rounded-full border border-red-100 transition-all">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                      <span className="text-[11px] font-black text-red-700 uppercase tracking-tighter">Not Connected</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-10">
                  {statItems.map((stat) => (
                    <button
                      key={stat.id}
                      onClick={() => setActiveVital(stat.id as VitalType)}
                      className={`${stat.bg} p-3 rounded-[1.5rem] text-center border transition-all hover:scale-105 active:scale-95 ${activeVital === stat.id ? `${stat.activeBorder} shadow-lg ring-2 ring-white/50` : 'border-white/40 shadow-sm'}`}
                    >
                      <div className="mx-auto mb-2 w-7 h-7 flex items-center justify-center">{stat.icon}</div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-sm font-black text-slate-900">{stat.val}<span className="text-[9px] font-medium ml-0.5 text-slate-500">{stat.unit}</span></p>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-white/40 rounded-[2rem] border border-white/60">
                  <VitalsChart type={activeVital as any} />
                </div>
              </section>

              <PregnancyCalendar />
            </div>

            {/* Right Column: Actions & Device Sync */}
            <div className="space-y-8">
              <DeviceSync
                onSyncComplete={handleSyncComplete}
                onStatusChange={(connected) => setIsDeviceConnected(connected)}
              />

              <FluidTracker />

              <section className="surface-card p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Appointments</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-rose-50/50 rounded-3xl border border-white">
                    <div className="bg-rose-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-rose-100">
                      <span className="text-[10px] leading-tight opacity-80 uppercase">Oct</span>
                      <span className="text-xl leading-tight">14</span>
                    </div>
                    <div className="flex-1 justify-center flex flex-col">
                      <p className="font-bold text-slate-900 text-sm">Obstetrician</p>
                      <p className="text-xs font-semibold text-slate-500">10:00 AM • Routine</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-blue-50/50 rounded-3xl border border-white">
                    <div className="bg-blue-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-blue-100">
                      <span className="text-[10px] leading-tight opacity-80 uppercase">Oct</span>
                      <span className="text-xl leading-tight">17</span>
                    </div>
                    <div className="flex-1 justify-center flex flex-col">
                      <p className="font-bold text-slate-900 text-sm">Dietitian</p>
                      <p className="text-xs font-semibold text-slate-500">03:30 PM • Macros</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="surface-card p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Mood Logs</h3>
                <div className="flex justify-between p-4 bg-white/40 rounded-[2rem] border border-white/60 mb-6">
                  {['😊', '😐', '😔', '😰', '😴'].map((emoji) => (
                    <button key={emoji} className="w-12 h-12 rounded-2xl hover:bg-white hover:shadow-md text-2xl transition-all active:scale-90">
                      {emoji}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Notes for today..."
                  className="w-full p-5 bg-white/40 border-2 border-transparent focus:border-rose-200 rounded-[2rem] text-sm font-medium h-28 focus:ring-0 outline-none transition-all placeholder:text-slate-400"
                ></textarea>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-12">
      {renderPhaseContent()}

      {/* Persistent Planning Card - Visible in all 4 tabs */}
      <section className="relative z-0 bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] text-center border-2 border-dashed border-rose-200 shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Planning Your Journey</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Explore the timeline above to understand the 9-month transformation. Pre-pregnancy awareness involves folate intake, health screening, and understanding your biological cycle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-100 hover:scale-105 transition-transform active:scale-95">
              Schedule Pre-conception Visit
            </button>
            <button className="px-6 py-3 bg-white border border-rose-100 text-rose-600 rounded-2xl font-bold hover:bg-rose-50 transition-colors">
              Download Planning Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MotherDashboard;
