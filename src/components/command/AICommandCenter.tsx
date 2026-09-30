import React from 'react';
import {
  Gauge,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Bot,
  AlertTriangle,
  Database,
  Compass,
  ArrowRight,
  Sparkles,
  Trophy,
  GitBranch,
  Layers,
  History,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { ActiveModule, UserRole } from '../../types';
import { NATIONAL_STATS, MOCK_PARCELS, MOCK_CHALLENGES, MOCK_QUALITY_ALERTS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

interface CommandCenterProps {
  onNavigate: (module: ActiveModule) => void;
  userRole: UserRole;
}

export const AICommandCenter: React.FC<CommandCenterProps> = ({ onNavigate, userRole }) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Hero Executive HUD Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry: All-India Cadastre v4.2
              </span>
              <span className="text-slate-500 text-xs font-mono">SIH 2026 Sandbox</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              National Land Intelligence Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unified digital nervous system integrating Survey of India drone cadastres, ISRO multi-spectral satellite sensors, revenue court litigations, and non-partisan evidence pipelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('gis')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Launch Interactive GIS</span>
            </button>
            <button
              onClick={() => onNavigate('ai_assistant')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-100 font-semibold rounded-lg border border-slate-700 text-xs transition flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Query Land AI Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Pulse Metrics (4 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-[10px]">Cadastral Mapped Parcels</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {NATIONAL_STATS.totalParcels}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>94.6% Digitization Coverage</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div
          onClick={() => onNavigate('provenance')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-[10px]">Data Trust Index</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">94.6%</div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CORS RTK Decimeter Verified</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-[10px]">Active Dispute Velocity</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">11.4 Days</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>-90% turnaround since 2020</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div
          onClick={() => onNavigate('policy_pipeline')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-[10px]">Active Policy Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="text-2xl font-black text-indigo-400 font-mono">Stage 7 of 9</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            <span>Options Formulation</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Live GIS Alert Feed + AI Insights Ticker + Quick Hub Launchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Anomaly & Discrepancy Stream (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-slate-100">Live Cadastral Anomaly Telemetry</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Streaming
              </span>
            </div>

            <div className="space-y-2">
              {MOCK_QUALITY_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onNavigate('provenance')}
                  className="p-3 bg-slate-950/80 hover:bg-slate-950 rounded-lg border border-slate-800 cursor-pointer transition text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{alert.title}</span>
                    <span className="text-[10px] font-mono text-rose-400">{alert.severity}</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400">{alert.region}</div>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('gis')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold transition mt-2 flex items-center justify-center gap-1.5"
          >
            <span>Review Overlapping Vectors in GIS</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Right Column: AI Analytical Synthesis & Quick Navigator (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  National Land Intelligence Briefing (AI Inferred)
                </h3>
              </div>
              <DataTrustBadge score={96} />
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300 leading-relaxed">
              <p>
                <strong>Deccan Corridor Assessment:</strong> Satellite NDVI vegetative analysis indicates that <strong className="text-emerald-400">14.8% of multi-crop agricultural parcels</strong> surrounding the Outer Ring Road growth corridors experienced conversion pressure over the past 24 months.
              </p>
              <p className="text-slate-400">
                Ground-truth CORS RTK station baselines have reduced boundary registration objections by <strong>64%</strong> in districts implementing real-time API locks between Registry deeds and Record of Rights (RoR).
              </p>
            </div>

            {/* Role Shortcuts Grid */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
                Quick Access for Role: <span className="text-emerald-400">{userRole.toUpperCase()}</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onNavigate('scoreboard')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded-lg border border-slate-800 text-left transition"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                  <div className="text-xs font-semibold text-slate-200">Scoreboard</div>
                  <div className="text-[10px] text-slate-500">State Indicators</div>
                </button>

                <button
                  onClick={() => onNavigate('catalog')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded-lg border border-slate-800 text-left transition"
                >
                  <Database className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <div className="text-xs font-semibold text-slate-200">Data Catalog</div>
                  <div className="text-[10px] text-slate-500">184M GeoJSONs</div>
                </button>

                <button
                  onClick={() => onNavigate('observatory')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded-lg border border-slate-800 text-left transition"
                >
                  <History className="w-3.5 h-3.5 text-indigo-400 mb-1" />
                  <div className="text-xs font-semibold text-slate-200">Observatory</div>
                  <div className="text-[10px] text-slate-500">2018–2026 Time Slider</div>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Server-side CORS Latency: 38ms</span>
            <button
              onClick={() => onNavigate('challenges')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 Portal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
