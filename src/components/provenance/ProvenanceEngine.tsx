import React, { useState } from 'react';
import {
  ShieldCheck,
  GitCommit,
  AlertTriangle,
  CheckCircle,
  Database,
  ArrowRight,
  Shield,
  FileCheck,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { MOCK_QUALITY_ALERTS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const ProvenanceEngine: React.FC = () => {
  const [alerts, setAlerts] = useState(MOCK_QUALITY_ALERTS);
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(3);

  const pipelineStages = [
    {
      step: 1,
      title: 'Primary Source Ingestion',
      system: 'Survey of India CORS & Drone Orthomosaic',
      description: 'Raw GNSS observation RINEX files and 5cm GSD drone flight orthotiles streamed via RTK baselines.',
      hash: '0x8f2d...c34b',
      status: 'Verified'
    },
    {
      step: 2,
      title: 'Geodetic Baseline Calibration',
      system: 'SOI CORS RTK WGS84 Datum',
      description: 'Epoch alignment and coordinate transformation from Everest 1830 local grid to WGS84 UTM Zone 44N.',
      hash: '0x3a19...91ef',
      status: 'Verified'
    },
    {
      step: 3,
      title: 'Cadastral Polygon Vectorization',
      system: 'NIC GeoSpatial Cadastre Pipeline',
      description: 'Automated topology cleaning, boundary stone node closure, and road easement buffer clipping.',
      hash: '0x5b77...82da',
      status: 'Verified'
    },
    {
      step: 4,
      title: 'Revenue & Registry Validation',
      system: 'NGDRS & Dharani Cross-Sync',
      description: 'Checking RoR title deeds against court litigation injunctions, stay orders, and inheritance mutations.',
      hash: '0x992b...1702',
      status: 'Verified'
    },
    {
      step: 5,
      title: 'AI Anomaly & Encroachment Audit',
      system: 'ISRO Multi-Spectral Sentinel-2 Classifier',
      description: 'Running neural change detection to flag unauthorized construction in water bodies and green belts.',
      hash: '0x7e44...5f89',
      status: 'Active Audit'
    },
    {
      step: 6,
      title: 'Cryptographic Publication & Open API',
      system: 'National Land Open Data Gateway',
      description: 'Generating tamper-evident Merkle tree root hash and distributing signed GeoJSON slices to catalog.',
      hash: '0x12c9...ee01',
      status: 'Published'
    }
  ];

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    alert('Quality alert forwarded to field revenue inspector for boundary re-survey.');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Cadastral Data Quality & W3C Provenance Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            End-to-end cryptographic lineage tracking from drone GPS sensor to public title deed, providing an unalterable audit trail for national land records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={98} source="W3C PROV-O Ledger" />
        </div>
      </div>

      {/* Hero: DATA TRUST CARD (Required in prompt) */}
      <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-extrabold text-slate-100 font-mono tracking-wider">
              NATIONAL DATA TRUST CERTIFICATE
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            Audit Standard: ISO 19157 (Geographic Information — Data Quality)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Overall Quality</span>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-0.5 block">94.6%</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Completeness</span>
            <span className="text-2xl font-black text-cyan-400 font-mono mt-0.5 block">96.2%</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Consistency</span>
            <span className="text-2xl font-black text-indigo-400 font-mono mt-0.5 block">91.8%</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Freshness</span>
            <span className="text-2xl font-black text-amber-400 font-mono mt-0.5 block">93.4%</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Provenance</span>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-0.5 block">100%</span>
          </div>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-lg text-xs text-slate-400 font-mono flex items-center justify-between">
          <span>Merkle State Hash: 0x9f48a17c8491bb02d5...</span>
          <span className="text-emerald-400">Tamper-Proof Ledger Anchored</span>
        </div>
      </div>

      {/* Six-Stage Provenance Lineage Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
          Six-Stage Cadastral Provenance Lineage (Source → Citizen)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pipelineStages.map((st) => {
            const isSelected = selectedPipelineStep === st.step;
            return (
              <div
                key={st.step}
                onClick={() => setSelectedPipelineStep(st.step)}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/60 shadow'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold font-mono flex items-center justify-center text-[11px]">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">{st.status}</span>
                </div>

                <div className="font-bold text-slate-100 text-sm leading-snug">{st.title}</div>
                <div className="text-[11px] font-mono text-cyan-400">{st.system}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{st.description}</p>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>Audit Hash:</span>
                  <span className="text-slate-400 select-all">{st.hash}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Data-Quality Alerts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Active Data-Quality & Spatial Discrepancy Alerts ({alerts.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Autonomous Sentinel Audit</span>
        </div>

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-950 rounded-xl border border-slate-800">
              All cadastral datasets passed rigorous topology and CORS ground-truth checks.
            </div>
          ) : (
            alerts.map((alt) => (
              <div
                key={alt.id}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        alt.severity === 'High'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : alt.severity === 'Medium'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {alt.severity} Priority
                    </span>
                    <span className="font-bold text-slate-100">{alt.title}</span>
                    <span className="text-slate-500 font-mono">· {alt.date}</span>
                  </div>
                  <div className="text-cyan-400 font-mono">{alt.region}</div>
                  <p className="text-slate-400">{alt.description}</p>
                  <p className="text-emerald-400/90 font-mono text-[11px] pt-1">
                    Action: {alt.actionRequired}
                  </p>
                </div>

                <button
                  onClick={() => handleResolveAlert(alt.id)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded text-xs shrink-0 self-start md:self-center"
                >
                  Forward to Field Surveyor
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
