
import React, { useState } from 'react';
import { Utensils, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { getNutritionAdvice } from '../services/gemini';

const NutritionIntelligence: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any[]>([]);
  const [condition, setCondition] = useState("None");

  const generatePlan = async () => {
    setLoading(true);
    const data = await getNutritionAdvice(2, condition);
    setPlan(data);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
      <div className="bg-emerald-600 p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-emerald-200" />
          <h2 className="text-2xl font-bold">AI Nutrition Engine</h2>
        </div>
        <p className="text-emerald-50 mb-6">Personalized meal planning based on trimester, dietary needs, and medical history.</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 outline-none backdrop-blur-md text-white placeholder-emerald-200"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option className="text-slate-800" value="None">No Conditions</option>
            <option className="text-slate-800" value="Gestational Diabetes">Gestational Diabetes</option>
            <option className="text-slate-800" value="Iron Deficiency">Anemic/Iron Deficiency</option>
            <option className="text-slate-800" value="Vegetarian">Pure Vegetarian</option>
          </select>
          <button 
            onClick={generatePlan}
            disabled={loading}
            className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Zap className="w-5 h-5 animate-spin" /> : <Utensils className="w-5 h-5" />}
            {loading ? "Analyzing..." : "Generate Meal Plan"}
          </button>
        </div>
      </div>

      <div className="p-8">
        {plan.length > 0 ? (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2">Recommended Daily Menu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.map((item, idx) => (
                <div key={idx} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800 uppercase text-xs tracking-wider">{item.meal}</h4>
                    <p className="text-slate-800 font-medium my-1">{item.dish}</p>
                    <p className="text-xs text-slate-500 italic">{item.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-emerald-600 bg-emerald-50 p-4 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
              <p className="text-sm font-medium">This plan includes +25g extra protein for your baby's muscle development.</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <Utensils className="w-16 h-16 mx-auto mb-4 opacity-10" />
            <p>Enter your details and click "Generate" to see your AI-curated nutrition plan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionIntelligence;
