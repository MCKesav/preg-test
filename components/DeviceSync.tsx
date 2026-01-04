
import React, { useState, useEffect } from 'react';
import { Watch, RefreshCw, CheckCircle2, AlertCircle, Link2, ExternalLink, Keyboard, Cpu, Smartphone, Cloud, ArrowRight, Activity, Brain } from 'lucide-react';
import { fetchGoogleFitData, SyncData } from '../services/health';

interface DeviceSyncProps {
  onSyncComplete: (data: SyncData) => void;
  onStatusChange?: (connected: boolean) => void;
}

const DeviceSync: React.FC<DeviceSyncProps> = ({ onSyncComplete, onStatusChange }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [lastSync, setLastSync] = useState("Not Synced");
  const [syncSource, setSyncSource] = useState("Searching...");
  const [mode, setMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  
  // Manual Input States
  const [manualHR, setManualHR] = useState('72');
  const [manualSpO2, setManualSpO2] = useState('98');
  const [manualStress, setManualStress] = useState('40');

  useEffect(() => {
    onStatusChange?.(isAuthorized);
  }, [isAuthorized]);

  const handleGoogleConnect = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsAuthorized(true);
      setIsSyncing(false);
      handleAutoSync();
    }, 1500);
  };

  const handleAutoSync = async () => {
    setIsSyncing(true);
    try {
      const data = await fetchGoogleFitData("SIMULATED_TOKEN");
      setLastSync(data.lastSynced);
      setSyncSource("Nothing X → Fit");
      onSyncComplete(data);
    } catch (err) {
      console.error("Sync failed", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const data: SyncData = {
        heartRate: parseInt(manualHR),
        spO2: parseInt(manualSpO2),
        stress: parseInt(manualStress),
        steps: 8500,
        lastSynced: "Just now",
        source: "Direct Manual Entry"
      };
      setLastSync(data.lastSynced);
      setSyncSource("CMF → Manual → App");
      onSyncComplete(data);
      setIsSyncing(false);
      setIsAuthorized(true);
    }, 800);
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-rose-50/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-100/30 blur-3xl rounded-full" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg relative">
            <Watch className="w-6 h-6" />
            {isAuthorized && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">CMF Watch Pro 2</h3>
            <div className="flex gap-2 mt-1">
              <button 
                onClick={() => setMode('AUTO')}
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all border ${mode === 'AUTO' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
              >
                AUTO BRIDGE
              </button>
              <button 
                onClick={() => setMode('MANUAL')}
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all border ${mode === 'MANUAL' ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
              >
                MANUAL ENTRY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* THE BRIDGE VISUALIZATION */}
      <div className="mb-6 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 relative">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col items-center gap-1 group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isAuthorized ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-400'}`}>
              <Watch className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase">Wrist</span>
          </div>

          <div className="flex-1 flex items-center justify-center px-1">
            <div className={`h-[2px] flex-1 border-t-2 border-dashed transition-colors ${isAuthorized ? 'border-emerald-300' : 'border-slate-200'}`} />
            <ArrowRight className={`w-3 h-3 mx-1 ${isAuthorized ? 'text-emerald-500' : 'text-slate-200'}`} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${mode === 'AUTO' && isAuthorized ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase">Nothing X</span>
          </div>

          <div className="flex-1 flex items-center justify-center px-1">
            <div className={`h-[2px] flex-1 border-t-2 border-dashed transition-colors ${mode === 'AUTO' && isAuthorized ? 'border-indigo-300' : 'border-slate-200'}`} />
            <ArrowRight className={`w-3 h-3 mx-1 ${mode === 'AUTO' && isAuthorized ? 'text-indigo-500' : 'text-slate-200'}`} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${mode === 'AUTO' && isAuthorized ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
              <Cloud className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase">Google Fit</span>
          </div>

          <div className="flex-1 flex items-center justify-center px-1">
            <div className={`h-[2px] flex-1 border-t-2 border-dashed transition-colors ${isAuthorized ? 'border-rose-300' : 'border-slate-200'}`} />
            <ArrowRight className={`w-3 h-3 mx-1 ${isAuthorized ? 'text-rose-500' : 'text-slate-200'}`} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isAuthorized ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase">NurtureNet</span>
          </div>
        </div>
        
        {/* Animated Glow Line for Active Flow */}
        {isAuthorized && !isSyncing && (
          <div className="absolute top-[26px] left-8 right-8 h-[2px] bg-gradient-to-r from-emerald-500 via-indigo-500 to-rose-500 animate-pulse opacity-20" />
        )}
      </div>

      {mode === 'AUTO' ? (
        <div className="space-y-4">
          {!isAuthorized ? (
            <>
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  Connect your Google Fit account to pull the Nothing X synced data from your watch.
                </p>
              </div>
              <button 
                onClick={handleGoogleConnect}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:bg-slate-800 transition-all"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png" className="w-5 h-5" alt="Google Fit" />
                Authorize Cloud Bridge
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Sync</p>
                  <p className="text-sm font-bold text-slate-700">{lastSync}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Path</p>
                  <p className="text-[10px] font-bold text-emerald-600 truncate uppercase">{syncSource}</p>
                </div>
              </div>
              <button 
                onClick={handleAutoSync}
                className="w-full py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:border-rose-300 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Polling Cloud Data...' : 'Refresh From Google Fit'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
            <p className="text-[10px] text-rose-800 font-medium">
              <Keyboard className="w-3 h-3 inline mr-1" />
              Direct Entry: Bypass cloud sync by entering watch values manually.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[8px] font-bold text-slate-400 uppercase mb-1 block">HR (BPM)</label>
              <input 
                type="number" 
                value={manualHR}
                onChange={(e) => setManualHR(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold focus:ring-rose-500 focus:border-rose-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[8px] font-bold text-slate-400 uppercase mb-1 block">SpO2 (%)</label>
              <input 
                type="number" 
                value={manualSpO2}
                onChange={(e) => setManualSpO2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold focus:ring-rose-500 focus:border-rose-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[8px] font-bold text-slate-400 uppercase mb-1 block">Stress</label>
              <input 
                type="number" 
                value={manualStress}
                onChange={(e) => setManualStress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold focus:ring-rose-500 focus:border-rose-500 outline-none"
              />
            </div>
          </div>

          <button 
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-full py-3 bg-rose-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            Inject Local Data
          </button>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
          <Link2 className="w-3 h-3" /> Data Pipeline Active
        </span>
        <div className="flex gap-1">
          <div className={`w-1 h-1 rounded-full ${isAuthorized ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />
          <div className={`w-1 h-1 rounded-full ${isAuthorized ? 'bg-indigo-500 animate-pulse' : 'bg-slate-200'}`} />
          <div className={`w-1 h-1 rounded-full ${isAuthorized ? 'bg-rose-500 animate-pulse' : 'bg-slate-200'}`} />
        </div>
      </div>
    </section>
  );
};

export default DeviceSync;
