
import React from 'react';
import { Baby, Microscope, ShieldCheck, Thermometer, Wind, Tv, Info, Activity, ClipboardList, Utensils, Heart } from 'lucide-react';

const PostPregnancy: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Central Knowledge Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Baby is Born - Initial Care */}
        <section className="surface-card p-8 rounded-[2.5rem]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-100 rounded-[1.5rem] flex items-center justify-center text-indigo-500 shadow-sm">
              <Baby className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Baby Care Essentials</h2>
              <p className="text-slate-500 text-sm font-medium">Science-backed postnatal guidance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/50 border border-white rounded-[2rem] space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-rose-400" />
                Nutrition & Hygiene
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span><b>Breastfeeding Hygiene:</b> Cleanliness of latch and pump parts is critical. Indian milk reports suggest checking local sources for contaminants.</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span><b>Formula Safety:</b> USA/EU standards (FDA/EFSA) are currently stricter than FSSAI. Choose certified organic imports if local purity is in doubt.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white/50 border border-white rounded-[2rem] space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-blue-400" />
                Product Comparisons
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Diaper Quality</p>
                  <p className="text-xs text-slate-600">Indian market diapers are catching up, but Western regulations (TBT/SPS) often ensure lower chemical toxicity in materials.</p>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Skincare Alert</p>
                  <p className="text-xs text-slate-600">Avoid talc-based powders; use pH-neutral, paraben-free lotions. India has loose ends in FSSAI cosmetic monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Environmental Hazards & Hygiene */}
        <section className="surface-card p-8 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500">
              <Wind className="w-6 h-6" />
             </div>
             Environmental Safety
          </h2>
          
          <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden mb-6">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">AQI Awareness for Infants</h3>
              <p className="text-emerald-100 text-sm leading-relaxed mb-4">
                In many Indian cities, carrying infants in high AQI (&gt;150) without coverups is dangerously normalized. Babies breathe 3x faster than adults.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-emerald-800/50 border border-emerald-400/30 rounded-xl text-xs font-bold">Avoid TV/Screens &lt; 2yr</div>
                <div className="px-4 py-2 bg-emerald-800/50 border border-emerald-400/30 rounded-xl text-xs font-bold">Use Baby Coverups</div>
              </div>
            </div>
            <Wind className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 bg-white/50 rounded-3xl border border-white">
              <Tv className="w-10 h-10 text-slate-400" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Media Consumption</p>
                <p className="text-xs text-slate-500">Watching TV too much is normalized but stunts early neural speech pathways. Focus on tactile play.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white/50 rounded-3xl border border-white">
              <ShieldCheck className="w-10 h-10 text-emerald-500" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Full House Hygiene</p>
                <p className="text-xs text-slate-500">Baby-safe furniture with rounded edges and non-toxic paint is essential for the first 5 years.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Milestones & Medical */}
      <div className="space-y-8">
        <section className="surface-card p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-rose-500" />
            Medical Roadmap
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-rose-50/50 rounded-3xl border border-white">
              <p className="text-[10px] font-black text-rose-600 uppercase mb-2 tracking-widest">Vaccination Tracker</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">BCG / Hepatitis B</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-bold uppercase text-[8px]">Done</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">OPV 1 / DTP 1</span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md font-bold uppercase text-[8px]">Next Week</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-3xl border border-white">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Genetic Monitoring</p>
              <p className="text-xs text-slate-600">
                Entered birth data is analyzed for genetic markers. Follow up on infant metabolic screening results.
              </p>
            </div>
          </div>
        </section>

        <section className="surface-card p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Baby Milestones</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Crawling</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Expected: Month 7-10</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-rose-500 rounded-full" />
              </div>
            </div>
            <div className="space-y-2 opacity-50">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Walking</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Expected: Month 11-15</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full" />
            </div>
            <div className="space-y-2 opacity-50">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Speech</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Expected: Month 12-18</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full" />
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
             <Info className="w-5 h-5 text-amber-500 shrink-0" />
             <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
               Regular checkups for toddler (up to 5 years) are vital in India where early developmental lags are often ignored.
             </p>
          </div>
        </section>

        <section className="surface-card p-6 rounded-[2rem] bg-gradient-to-br from-white to-rose-50">
          <h4 className="font-bold text-slate-800 mb-4 text-sm">Mother's Recovery</h4>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
               <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Postpartum Wellness</p>
              <p className="text-[10px] text-slate-500 font-medium">Focus on core restoration and iron levels.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostPregnancy;
