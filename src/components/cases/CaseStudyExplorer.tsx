import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  MapPin,
  CheckCircle,
  Lightbulb,
  Database,
  Layers,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import { CaseStudy } from '../../types';
import { MOCK_CASE_STUDIES } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

interface CaseStudyExplorerProps {
  initialCaseId?: string;
}

export const CaseStudyExplorer: React.FC<CaseStudyExplorerProps> = ({ initialCaseId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(
    initialCaseId ? MOCK_CASE_STUDIES.find((c) => c.id === initialCaseId) || MOCK_CASE_STUDIES[0] : MOCK_CASE_STUDIES[0]
  );

  const categories = [
    'All',
    'Cadastral Modernization',
    'Rural Land Rights',
    'AI Anomaly Detection',
    'Dispute Resolution',
    'Urban Planning'
  ];

  const filteredCases = useMemo(() => {
    return MOCK_CASE_STUDIES.filter((cs) => {
      const matchCat = selectedCategory === 'All' || cs.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        cs.title.toLowerCase().includes(q) ||
        cs.location.toLowerCase().includes(q) ||
        cs.state.toLowerCase().includes(q) ||
        cs.problem.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Land Governance Case Study Explorer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Empirical evaluations of drone-cadastre rollouts, auto-mutation systems, AI satellite anti-encroachment interventions, and rural property rights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={98} source="Peer-Reviewed Case Registry" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by state, title, intervention or problem..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-amber-400 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Split View: Case Studies List (4 cols) & Detail Deep Dive (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-4 space-y-3">
          {filteredCases.map((cs) => {
            const isSelected = selectedCase?.id === cs.id;
            return (
              <div
                key={cs.id}
                onClick={() => setSelectedCase(cs)}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500/50 shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">
                    {cs.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{cs.year}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {cs.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{cs.location}, {cs.state}</span>
                </div>

                {/* Metrics preview */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-center">
                  {cs.impactMetrics.map((m, i) => (
                    <div key={i} className="bg-slate-950 p-1 rounded">
                      <div className="text-slate-500 truncate">{m.label}</div>
                      <div className="text-emerald-400 font-bold">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Case Deep Dive */}
        {selectedCase && (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
            {/* Header */}
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-400 font-bold">{selectedCase.id}</span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedCase.location} · {selectedCase.year}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-100">{selectedCase.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Authority / Source:</span>
                <span className="text-slate-200">{selectedCase.source}</span>
              </div>
            </div>

            {/* Impact Metric Hero Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedCase.impactMetrics.map((metric, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block">{metric.label}</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono mt-1 block">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem & Intervention Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 font-mono block">
                  The Governance Challenge
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedCase.problem}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono block">
                  Intervention & Technology
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedCase.intervention}</p>
              </div>
            </div>

            {/* Method & Data Used */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono block">
                Datasets & Technical Method
              </span>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedCase.dataUsed.map((d, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px]">
                      {d}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 leading-relaxed pt-1">{selectedCase.method}</p>
              </div>
            </div>

            {/* Outcome & Lessons Learned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono block">
                  Outcome & Citizen Impact
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedCase.outcome}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono block">
                  Key Policy Lessons
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedCase.lessonsLearned}</p>
              </div>
            </div>

            {/* Evidence Verification Footer */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Empirical Evidence Verified</span>
              </div>
              <span>{selectedCase.evidence}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
