import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Database, FileText, Compass, Briefcase, Lightbulb, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ActiveModule } from '../../types';
import { MOCK_PARCELS, MOCK_DATASETS, MOCK_DOCUMENTS, MOCK_CASE_STUDIES, MOCK_CHALLENGES } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: ActiveModule, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingParcels = MOCK_PARCELS.filter(
    (p) =>
      p.surveyNumber.toLowerCase().includes(q) ||
      p.village.toLowerCase().includes(q) ||
      p.taluk.toLowerCase().includes(q) ||
      p.landUse.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingDatasets = MOCK_DATASETS.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingDocs = MOCK_DOCUMENTS.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
  ).slice(0, 3);

  const matchingCases = MOCK_CASE_STUDIES.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingChallenges = MOCK_CHALLENGES.filter(
    (ch) =>
      ch.title.toLowerCase().includes(q) ||
      ch.domain.toLowerCase().includes(q)
  ).slice(0, 2);

  const hasResults =
    matchingParcels.length > 0 ||
    matchingDatasets.length > 0 ||
    matchingDocs.length > 0 ||
    matchingCases.length > 0 ||
    matchingChallenges.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parcels, survey numbers, datasets, acts, case studies... (Esc to exit)"
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-200 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">ESC</kbd>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-3 space-y-4 flex-1 divide-y divide-slate-800/60">
          {!query && (
            <div className="p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Search across national cadastral databases, spatial datasets, and policy documents</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['SY-104/1A', 'Cadastral Geodatabase', 'Dharani Next', 'Peri-Urban Expansion', 'Lake Buffer'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No national records or datasets found matching &quot;{query}&quot;.
              <div className="mt-2 text-xs text-slate-500">Try searching &quot;SY-104&quot;, &quot;Cadastral&quot;, &quot;ISRO&quot;, or &quot;Urban&quot;</div>
            </div>
          )}

          {matchingParcels.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 tracking-wider uppercase px-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Cadastral Parcels ({matchingParcels.length})
              </div>
              <div className="space-y-1">
                {matchingParcels.map((parcel) => (
                  <button
                    key={parcel.id}
                    onClick={() => {
                      onNavigate('gis', parcel.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 flex items-center gap-2">
                        <span>{parcel.surveyNumber}</span>
                        <span className="text-xs text-slate-500 font-normal">· {parcel.village}, {parcel.district}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {parcel.landUse} · {parcel.areaAcres} Acres · Quality {parcel.qualityScore}% · Status: {parcel.disputeStatus}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingDatasets.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 tracking-wider uppercase px-2 mb-1.5">
                <Database className="w-3.5 h-3.5" />
                Data Catalog ({matchingDatasets.length})
              </div>
              <div className="space-y-1">
                {matchingDatasets.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => {
                      onNavigate('catalog', ds.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400">
                        {ds.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {ds.code} · {ds.provider} · {ds.format} · {ds.recordsCount}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingDocs.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 tracking-wider uppercase px-2 mb-1.5">
                <FileText className="w-3.5 h-3.5" />
                Research Documents & Acts ({matchingDocs.length})
              </div>
              <div className="space-y-1">
                {matchingDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onNavigate('knowledge', doc.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400">
                        {doc.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {doc.category} · {doc.organization} ({doc.year})
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingCases.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 tracking-wider uppercase px-2 mb-1.5">
                <Compass className="w-3.5 h-3.5" />
                Case Studies ({matchingCases.length})
              </div>
              <div className="space-y-1">
                {matchingCases.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => {
                      onNavigate('case_studies', cs.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-amber-400">
                        {cs.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {cs.location} · {cs.category}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingChallenges.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 tracking-wider uppercase px-2 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Innovation Challenges ({matchingChallenges.length})
              </div>
              <div className="space-y-1">
                {matchingChallenges.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onNavigate('challenges', ch.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400">
                        {ch.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {ch.domain} · Prize: {ch.prizePool}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1 bg-slate-800 rounded">↵</kbd> select</span>
            <span className="flex items-center gap-1"><kbd className="px-1 bg-slate-800 rounded">esc</kbd> close</span>
          </div>
          <span>SIH 2026 National Cadastre Command Search</span>
        </div>
      </div>
    </div>
  );
};
