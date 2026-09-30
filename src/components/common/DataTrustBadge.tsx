import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface DataTrustBadgeProps {
  score?: number;
  label?: string;
  source?: string;
  className?: string;
  showDetails?: boolean;
}

export const DataTrustBadge: React.FC<DataTrustBadgeProps> = ({
  score = 94,
  label = 'Prototype Data Trust',
  source = 'Simulated Cadastre (SIH 2026)',
  className = '',
  showDetails = false
}) => {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded bg-slate-900/80 border border-emerald-500/30 text-emerald-400 ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      <span className="font-semibold">{label}: {score}%</span>
      <span className="text-slate-500">·</span>
      <span className="text-slate-400 truncate max-w-[200px]">{source}</span>
      {showDetails && (
        <span className="text-slate-500 hover:text-slate-300 cursor-help" title="Cryptographically anchored W3C PROV-O provenance verification score for simulated hackathon dataset.">
          <Info className="w-3 h-3" />
        </span>
      )}
    </div>
  );
};
