import React, { useState } from 'react';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  Circle,
  FileText,
  Download,
  Shield,
  Layers,
  HelpCircle,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { PolicyPipelineStage } from '../../types';
import { MOCK_POLICY_PIPELINE } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const PolicyPipeline: React.FC = () => {
  const [stages, setStages] = useState<PolicyPipelineStage[]>(MOCK_POLICY_PIPELINE);
  const [activeStageId, setActiveStageId] = useState<number>(7); // Stage 7: Policy Options Formulation

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  const handleExportBrief = () => {
    const brief = `NATIONAL EVIDENCE-TO-POLICY PIPELINE (SIH 2026)
Topic: Urban Expansion & Prime Farmland Conversion Mitigation
Pillar: Land Governance Analytical Synthesis

========================================
CURRENT STATUS: STAGE 7 - POLICY OPTIONS FORMULATION
========================================

SUMMARY OF RESEARCH FINDINGS:
14.8% of multi-crop prime irrigated land in peri-urban corridors was converted between 2021 and 2026.
42% of designated brownfield industrial plots within 15 km remained vacant.

POLICY OPTIONS (NEUTRAL ANALYTICAL TRADE-OFF MATRIX):

1. OPTION A: Mandatory Prime Soil Conversion Moratorium
- Benefits: 100% preservation of top-tier multi-crop alluvial food sheds.
- Risks: Potential inflation of industrial land acquisition costs.
- Fiscal Impact: -₹120 Cr annual stamp duty impact.

2. OPTION B: Brownfield-First Development Incentive & Conversion Cess
- Benefits: Steers 60% of new factories to vacant industrial parks; levies 5% ecological cess.
- Risks: Demands rapid brownfield road/power upgrades.
- Fiscal Impact: Net positive ₹380 Cr green soil fund.

3. OPTION C: Tradable Development Rights (TDR) for Peri-Urban Farmers
- Benefits: Compensates farming families with tradable density rights while retaining green belt.
- Risks: Demands transparent secondary TDR exchange.
- Fiscal Impact: Budget neutral.

Notice: This analytical report presents evidence trade-offs for inter-ministerial review and does not endorse political outcomes.
`;

    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Evidence_To_Policy_Brief_Stage${activeStageId}_SIH2026.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Evidence-to-Policy Analytical Pipeline
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Structured 9-stage scientific lifecycle translating empirical GIS observations and cadastral data into rigorous, non-partisan policy options.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytical Brief</span>
          </button>
          <DataTrustBadge score={98} source="NITI Aayog & MoRD Pipeline" />
        </div>
      </div>

      {/* 9-Stage Visual Stepper Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {stages.map((st, idx) => {
            const isSelected = st.id === activeStageId;
            const isCompleted = st.status === 'completed';
            const isActive = st.status === 'active';

            return (
              <React.Fragment key={st.id}>
                <button
                  onClick={() => setActiveStageId(st.id)}
                  className={`flex flex-col items-center gap-1.5 group transition ${
                    isSelected ? 'scale-105' : ''
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition shadow ${
                      isSelected
                        ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/20'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isActive
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : st.id}
                  </div>
                  <span
                    className={`text-[10px] font-mono whitespace-nowrap max-w-[80px] text-center truncate ${
                      isSelected ? 'text-indigo-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {st.title.split(' ')[0]} {st.title.split(' ')[1] || ''}
                  </span>
                </button>

                {idx < stages.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 min-w-[16px] transition ${
                      isCompleted ? 'bg-emerald-500/60' : 'bg-slate-800'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-800 pb-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-indigo-400 font-bold">STAGE {currentStage.id} OF 9</span>
            <span
              className={`px-2.5 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${
                currentStage.status === 'completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : currentStage.status === 'active'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {currentStage.status}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">{currentStage.title}</h2>
          <p className="text-xs text-slate-400">{currentStage.subtitle}</p>
        </div>

        {/* Stage Summary */}
        <div className="space-y-1.5 text-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
            Analytical Stage Narrative
          </span>
          <p className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 leading-relaxed text-sm">
            {currentStage.summary}
          </p>
        </div>

        {/* Artifacts Created */}
        <div className="space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono block">
            Validated Evidence Artifacts
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentStage.artifacts.map((art, i) => (
              <div
                key={i}
                className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2 text-slate-300 font-mono text-xs"
              >
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{art}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-Off Matrix if Stage 7 */}
        {currentStage.tradeoffs && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Policy Options & Multi-Criteria Trade-Off Comparison
              </span>
              <span className="text-[11px] text-slate-500 italic">
                Non-Partisan Analytical Assessment
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStage.tradeoffs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-100 text-sm leading-snug">
                      {item.option}
                    </h3>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                        Expected Benefits:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.benefits}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-rose-400 font-bold block">
                        Structural Risks:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.risks}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500 block">Fiscal / Revenue Impact:</span>
                    <span className="text-amber-300 font-semibold">{item.fiscalImpact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer on Neutrality */}
        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Strict Research Policy: This platform structures empirical trade-offs and does not formulate political directives.
          </span>
        </div>
      </div>
    </div>
  );
};
