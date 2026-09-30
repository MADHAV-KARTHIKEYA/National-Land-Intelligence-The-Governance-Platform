import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Tag,
  Download,
  ExternalLink,
  Filter,
  FileText,
  Calendar,
  Building,
  Check,
  X
} from 'lucide-react';
import { ResearchDocument } from '../../types';
import { MOCK_DOCUMENTS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

interface KnowledgeRepositoryProps {
  initialDocumentId?: string;
}

export const KnowledgeRepository: React.FC<KnowledgeRepositoryProps> = ({ initialDocumentId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedDocIds, setSavedDocIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<ResearchDocument | null>(
    initialDocumentId ? MOCK_DOCUMENTS.find(d => d.id === initialDocumentId) || null : null
  );

  const toggleSaveDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedDocIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = ['All', 'Policy & Act', 'Research Paper', 'Technical Report', 'Cadastral Standard', 'Case Study'];

  const filteredDocs = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchTab = activeTab === 'all' || savedDocIds.has(doc.id);
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !searchQuery ||
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.organization.toLowerCase().includes(q) ||
        doc.tags.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchTab && matchQuery;
    });
  }, [searchQuery, selectedCategory, activeTab, savedDocIds]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Land Knowledge & Policy Repository
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Central repository of cadastral standards, peer-reviewed spatial publications, gazetted frameworks, and land governance empirical studies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={98} source="Academic & Gazette Index" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research papers, DILRMP acts, CORS standards, authors..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded transition font-medium ${
                activeTab === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-1 rounded transition font-medium flex items-center gap-1 ${
                activeTab === 'saved'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>Saved ({savedDocIds.size})</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-xl">
            No research documents matching your criteria. Try clearing search filters.
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isSaved = savedDocIds.has(doc.id);
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocForPreview(doc)}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-sm transition cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {doc.category} · {doc.documentType}
                    </span>
                    <button
                      onClick={(e) => toggleSaveDoc(doc.id, e)}
                      title={isSaved ? 'Remove from saved' : 'Save resource'}
                      className="p-1 text-slate-400 hover:text-emerald-400 transition"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {doc.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate max-w-[200px]">{doc.organization}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{doc.year}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-emerald-400">{doc.citationsCount} Citations</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Document Detail / Executive Preview Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative max-h-[85vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setSelectedDocForPreview(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {selectedDocForPreview.category} · {selectedDocForPreview.documentType} ({selectedDocForPreview.year})
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                  {selectedDocForPreview.title}
                </h3>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex flex-wrap gap-4 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500 block">Lead Author:</span>
                <span className="text-slate-200 font-semibold">{selectedDocForPreview.author}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Organization:</span>
                <span className="text-slate-200 font-semibold">{selectedDocForPreview.organization}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Source Archive:</span>
                <span className="text-slate-200 font-semibold">{selectedDocForPreview.source}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Executive Abstract & Synthesis
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded border border-slate-800/80">
                {selectedDocForPreview.description}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Provenance & Validation
              </h4>
              <p className="text-xs text-slate-400 italic">
                {selectedDocForPreview.provenance}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Related Research Domains
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDocForPreview.relatedTopics.map((topic) => (
                  <span key={topic} className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs flex items-center justify-between text-emerald-300 font-mono">
              <span>Prototype Document (SIH 2026 Sandbox)</span>
              <span>Indexed with DOI & Provenance Ledger</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={(e) => toggleSaveDoc(selectedDocForPreview.id, e)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium"
              >
                {savedDocIds.has(selectedDocForPreview.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    <span>Saved to Workspace</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save to Workspace</span>
                  </>
                )}
              </button>

              <button
                onClick={() => alert(`Simulated Download: ${selectedDocForPreview.title}.pdf (SIH 2026 Archive)`)}
                className="flex items-center gap-1.5 text-xs px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive Brief</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
