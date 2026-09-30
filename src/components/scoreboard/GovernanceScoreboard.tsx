import React, { useState, useMemo } from 'react';
import {
  Layers,
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  ShieldAlert,
  CheckCircle,
  Calendar,
  X,
  ChevronRight,
  Filter,
  BarChart2
} from 'lucide-react';
import { ScoreboardIndicator } from '../../types';
import { MOCK_INDICATORS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const GovernanceScoreboard: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState<'All' | 'National' | 'State' | 'District'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedIndicatorForWhy, setSelectedIndicatorForWhy] = useState<ScoreboardIndicator | null>(null);

  const filteredIndicators = useMemo(() => {
    return MOCK_INDICATORS.filter((ind) => {
      const matchLevel = levelFilter === 'All' || ind.level === levelFilter;
      const matchCat = categoryFilter === 'All' || ind.category === categoryFilter;
      return matchLevel && matchCat;
    });
  }, [levelFilter, categoryFilter]);

  const avgCompositeScore = useMemo(() => {
    if (filteredIndicators.length === 0) return 0;
    const sum = filteredIndicators.reduce((acc, i) => acc + i.score, 0);
    return (sum / filteredIndicators.length).toFixed(1);
  }, [filteredIndicators]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner with Strict Disclaimer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-slate-100">
                Land Governance Analytical Scoreboard
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Evaluating cadastral completeness, geodetic precision, dispute resolution velocity, and mutation transparency.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              Composite Benchmark: <span className="font-bold text-sm text-slate-100">{avgCompositeScore}/100</span>
            </div>
            <DataTrustBadge score={93} />
          </div>
        </div>

        {/* Mandatory Transparency Box */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-200/90">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-semibold">Prototype Analytical Indicator:</strong>{' '}
            These performance metrics are analytical prototypes compiled for the Smart India Hackathon 2026. They do not constitute an official statutory ranking or gazetted appraisal by the Government of India.
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Jurisdiction Level:
          </span>
          {(['All', 'National', 'State', 'District'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                levelFilter === lvl
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Pillar:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Analytical Pillars</option>
            <option value="Digitization">Digitization Coverage</option>
            <option value="Accuracy">Spatial Accuracy</option>
            <option value="Transparency">Transparency & Velocity</option>
            <option value="Dispute Resolution">Dispute Resolution</option>
            <option value="Provenance">Data Provenance</option>
          </select>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIndicators.map((ind) => {
          return (
            <div
              key={ind.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono font-semibold text-slate-400">
                    {ind.level} · {ind.region}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">
                    {ind.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {ind.title}
                </h3>

                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-3xl font-extrabold text-slate-100">{ind.score}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    {ind.trend === 'improving' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : ind.trend === 'declining' ? (
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{ind.trendValue}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${ind.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {ind.supportingEvidence}
                </p>
              </div>

              {/* Bottom Meta & Explanation Trigger */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Confidence: {ind.confidence}%</span>
                  <span>{ind.lastUpdated}</span>
                </div>

                <button
                  onClick={() => setSelectedIndicatorForWhy(ind)}
                  className="w-full py-1.5 px-3 bg-slate-800/80 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 rounded text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Why is this indicator changing?</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Modal: "Why is this indicator changing?" */}
      {selectedIndicatorForWhy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative">
            <button
              onClick={() => setSelectedIndicatorForWhy(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  Indicator Analytical Drivers
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  {selectedIndicatorForWhy.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs mt-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono block mb-1">
                  Observed Structural Driver
                </span>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {selectedIndicatorForWhy.reasonForChange}
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono block mb-1">
                  Underlying Data Sources & APIs
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {selectedIndicatorForWhy.dataSources.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span>Model Confidence: {selectedIndicatorForWhy.confidence}%</span>
                <span>Audit Period: Q1 2026</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedIndicatorForWhy(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
