import React, { useState, useEffect } from 'react';
import {
  History,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  Clock,
  Layers,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { MOCK_OBSERVATORY_DATA } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const DataObservatory: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentYear((prev) => {
          const nextIndex = years.indexOf(prev) + 1;
          if (nextIndex >= years.length) {
            setIsPlaying(false);
            return prev;
          }
          return years[nextIndex];
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const yearData = MOCK_OBSERVATORY_DATA[currentYear];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Land Governance Data Observatory (2018–2026)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Decadal retrospective and live telemetry capturing farmland transition, urban expansion rates, drone cadastre scaling, and mutation latency drops.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={96} source="ISRO Decadal & DILRMP" />
        </div>
      </div>

      {/* Interactive Time Slider HUD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20"
              title={isPlaying ? 'Pause Playback' : 'Play Timeline'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentYear(2018);
              }}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Reset to 2018"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono block">
                Observatory Temporal Epoch
              </span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                {currentYear}
              </div>
            </div>
          </div>

          <div className="p-2 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
            Status: <span className="text-emerald-400 font-semibold">{currentYear === 2026 ? 'Live Hackathon Sync' : 'Simulated Historical Archive'}</span>
          </div>
        </div>

        {/* Slider Track */}
        <div className="space-y-2 pt-2">
          <input
            type="range"
            min={2018}
            max={2026}
            step={1}
            value={currentYear}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentYear(parseInt(e.target.value));
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentYear(y);
                }}
                className={`transition ${
                  y === currentYear ? 'text-emerald-400 font-bold scale-110' : 'hover:text-slate-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Epoch Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
            Agricultural Land Share
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
            {yearData.agriculturalPct}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Down from 58.4% (2018 baseline)
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
            Urban & Built-Up Surface
          </span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
            {yearData.urbanBuiltPct}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Up from 5.6% (+60% relative expansion)
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
            Dispute Resolution Velocity
          </span>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono mt-1">
            {yearData.disputeResolutionSpeedDays} Days
          </div>
          <div className="text-xs text-emerald-400 mt-1">
            -92% reduction since paper-era 2018
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
            Digitized Cadastral Parcels
          </span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
            {yearData.digitizedParcelsMillion}M
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Across 580,000+ surveyed villages
          </div>
        </div>
      </div>

      {/* Epoch Executive Summary & Structural Narrative */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-100">
            Historical Epoch Overview ({currentYear})
          </h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          {yearData.summary}
        </p>

        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-xs text-amber-300/90 font-mono">
          <span>AI Anomaly Alerts Flagged in {currentYear}: {yearData.anomaliesDetected.toLocaleString()}</span>
          <span>Verified against ISRO Bhuvan Raster</span>
        </div>
      </div>
    </div>
  );
};
