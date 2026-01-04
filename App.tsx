
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import MotherDashboard from './components/MotherDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import FamilyDashboard from './components/FamilyDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import NutritionIntelligence from './components/NutritionIntelligence';
import { UserRole, PregnancyPhase } from './types';
import { Apple, Calendar, Activity, Baby, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.MOTHER);
  const [activePhase, setActivePhase] = useState<PregnancyPhase>(PregnancyPhase.IN);
  const [showNutrition, setShowNutrition] = useState(false);

  // Background color transition logic using modern CSS variables
  useEffect(() => {
    let targetColor = '#FF6163'; // Signature Vibrant Coral (In Pregnancy)

    // Switch color based on phase
    if (!showNutrition && activeRole === UserRole.MOTHER) {
      if (activePhase === PregnancyPhase.PRE) {
        targetColor = '#FEBAAD'; // Gentle Light Pink
      } else if (activePhase === PregnancyPhase.POSTPARTUM) {
        targetColor = '#A5B4FC'; // Soft Indigo/Lavender for Healing
      } else if (activePhase === PregnancyPhase.POST) {
        targetColor = '#FDE68A'; // Warm Sun for Baby Care
      }
    } else if (activeRole === UserRole.DOCTOR) {
      targetColor = '#E0F2FE'; // Subtle light blue for medical
    }

    // Trigger the CSS transition by updating the variable on the root
    document.documentElement.style.setProperty('--bg-color-stop', targetColor);
  }, [activePhase, activeRole, showNutrition]);

  const renderDashboard = () => {
    if (showNutrition) return <NutritionIntelligence />;
    
    switch (activeRole) {
      case UserRole.MOTHER:
        return <MotherDashboard phase={activePhase} />;
      case UserRole.PARTNER:
        return <PartnerDashboard />;
      case UserRole.FAMILY:
        return <FamilyDashboard />;
      case UserRole.DOCTOR:
        return <DoctorDashboard />;
      default:
        return <MotherDashboard phase={activePhase} />;
    }
  };

  const getPhaseIcon = (phase: PregnancyPhase) => {
    switch(phase) {
      case PregnancyPhase.PRE: return <Calendar className="w-4 h-4" />;
      case PregnancyPhase.IN: return <Activity className="w-4 h-4" />;
      case PregnancyPhase.POSTPARTUM: return <HeartPulse className="w-4 h-4" />;
      case PregnancyPhase.POST: return <Baby className="w-4 h-4" />;
    }
  };

  return (
    <Layout activeRole={activeRole} setActiveRole={setActiveRole}>
      <div className="mb-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-1">
              Mode: {activeRole.toLowerCase().replace('_', ' ')} perspective
            </p>
            <h1 className="text-3xl font-serif font-bold text-slate-800">
              {showNutrition ? "Nutrition Intelligence" : "Your Pregnancy Journey"}
            </h1>
          </div>
          
          <button 
            onClick={() => setShowNutrition(!showNutrition)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              showNutrition 
              ? 'bg-rose-500 text-white shadow-lg' 
              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            }`}
          >
            <Apple className="w-5 h-5" />
            {showNutrition ? "Back to Dashboard" : "Nutrition"}
          </button>
        </div>

        {/* Phase Navigation Tabs - Only visible for Mother role when not in Nutrition mode */}
        {!showNutrition && activeRole === UserRole.MOTHER && (
          <div className="flex bg-white/30 backdrop-blur-md p-1.5 rounded-[2rem] border border-white/40 w-fit overflow-x-auto no-scrollbar">
            {[
              { id: PregnancyPhase.PRE, label: 'Pre Pregnancy' },
              { id: PregnancyPhase.IN, label: 'In Pregnancy' },
              { id: PregnancyPhase.POSTPARTUM, label: 'Post Partum' },
              { id: PregnancyPhase.POST, label: 'Baby Care' }
            ].map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.75rem] text-sm font-bold transition-all whitespace-nowrap ${
                  activePhase === phase.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-500 hover:text-rose-400'
                }`}
              >
                {getPhaseIcon(phase.id)}
                {phase.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="animate-in fade-in duration-700">
        {renderDashboard()}
      </div>
    </Layout>
  );
};

export default App;
