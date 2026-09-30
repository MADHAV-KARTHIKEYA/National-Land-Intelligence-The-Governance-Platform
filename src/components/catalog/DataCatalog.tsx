import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  Key,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  ExternalLink,
  X,
  FileCode,
  ArrowUpDown,
  Lock
} from 'lucide-react';
import { DatasetItem } from '../../types';
import { MOCK_DATASETS } from '../../data/mockData';
import { datasetService } from '../../services/apiServices';
import { DataTrustBadge } from '../common/DataTrustBadge';

interface DataCatalogProps {
  initialDatasetId?: string;
}

export const DataCatalog: React.FC<DataCatalogProps> = ({ initialDatasetId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'quality' | 'updated' | 'records'>('quality');
  const [activeDataset, setActiveDataset] = useState<DatasetItem | null>(
    initialDatasetId ? MOCK_DATASETS.find((d) => d.id === initialDatasetId) || null : null
  );

  // Request Access Workflow state
  const [accessModalDataset, setAccessModalDataset] = useState<DatasetItem | null>(null);
  const [userOrg, setUserOrg] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmittingAccess, setIsSubmittingAccess] = useState(false);
  const [accessResult, setAccessResult] = useState<{
    requestId: string;
    accessKey: string;
    status: string;
  } | null>(null);

  const categories = [
    'All',
    'Cadastral',
    'Administrative Boundaries',
    'Land Use',
    'Agriculture',
    'Infrastructure',
    'Environment',
    'Urban Development',
    'Water Resources'
  ];

  const formats = ['All', 'GeoJSON', 'Shapefile', 'Cloud GeoTIFF', 'REST API'];

  const filteredDatasets = useMemo(() => {
    return MOCK_DATASETS.filter((ds) => {
      const matchCat = selectedCategory === 'All' || ds.category === selectedCategory;
      const matchFmt = selectedFormat === 'All' || ds.format === selectedFormat;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        ds.name.toLowerCase().includes(q) ||
        ds.code.toLowerCase().includes(q) ||
        ds.provider.toLowerCase().includes(q) ||
        ds.description.toLowerCase().includes(q);

      return matchCat && matchFmt && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'quality') return b.qualityScore - a.qualityScore;
      if (sortBy === 'updated') return b.lastUpdated.localeCompare(a.lastUpdated);
      return b.recordsCount.localeCompare(a.recordsCount);
    });
  }, [searchQuery, selectedCategory, selectedFormat, sortBy]);

  const handleRequestAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessModalDataset) return;
    setIsSubmittingAccess(true);
    try {
      const res = await datasetService.requestDatasetAccess(
        accessModalDataset.id,
        userOrg || 'Academic Research Lab',
        purpose || 'Spatial Cadastral Evaluation'
      );
      setAccessResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingAccess(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">National Land Data Catalog & Open APIs</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Interoperable cadastral vectors, ISRO remote sensing rasters, court litigation indexes, and hydrological boundaries with W3C PROV-O metadata.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={95} source="Survey of India & NRSC ISRO" />
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search datasets by name, provider, code or tag..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          {/* Format */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            {formats.map((f) => (
              <option key={f} value={f}>
                Format: {f}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="quality">Sort: Data Quality</option>
            <option value="updated">Sort: Recently Updated</option>
            <option value="records">Sort: Records Count</option>
          </select>
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-bold text-[11px]">{ds.code}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  {ds.format}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100 leading-snug">
                {ds.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {ds.description}
              </p>

              <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800/80 text-[11px] font-mono space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">Provider:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{ds.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Records:</span>
                  <span className="text-slate-200">{ds.recordsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Coverage:</span>
                  <span className="text-slate-200">{ds.geographicLevel}</span>
                </div>
              </div>
            </div>

            {/* Quality Mini Bar & Action */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Quality Score:</span>
                <span className="font-mono text-emerald-400 font-bold">{ds.qualityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${ds.qualityScore}%` }}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setActiveDataset(ds)}
                  className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold transition"
                >
                  Metadata View
                </button>
                <button
                  onClick={() => {
                    setAccessModalDataset(ds);
                    setAccessResult(null);
                  }}
                  className="py-1.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs transition flex items-center gap-1 shadow"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Access</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dataset Metadata Modal */}
      {activeDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative max-h-[85vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setActiveDataset(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Dataset Metadata & Data Trust Card
                </span>
                <h3 className="text-lg font-bold text-slate-100">{activeDataset.name}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
              {activeDataset.description}
            </p>

            {/* DATA TRUST CARD (Required in prompt) */}
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DATA TRUST CARD</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  W3C PROV-O Cryptographic Verification
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Quality</span>
                  <span className="text-base font-bold text-emerald-400">{activeDataset.qualityScore}%</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Completeness</span>
                  <span className="text-base font-bold text-cyan-400">{activeDataset.completeness}%</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Consistency</span>
                  <span className="text-base font-bold text-indigo-400">{activeDataset.consistency}%</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Provenance</span>
                  <span className="text-base font-bold text-emerald-400">{activeDataset.provenanceCoverage}%</span>
                </div>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Data Provider:</span>
                <span className="text-slate-200">{activeDataset.provider}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Geographic Scope:</span>
                <span className="text-slate-200">{activeDataset.coverage}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Temporal Horizon:</span>
                <span className="text-slate-200">{activeDataset.temporalCoverage}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Update Frequency:</span>
                <span className="text-slate-200">{activeDataset.updateFrequency}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">License Framework:</span>
                <span className="text-slate-200">{activeDataset.license}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">API Endpoint Status:</span>
                <span className="text-emerald-400 font-bold">{activeDataset.apiStatus}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Prototype Metadata (SIH 2026 Sandbox)
              </span>
              <button
                onClick={() => {
                  setAccessModalDataset(activeDataset);
                  setActiveDataset(null);
                }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 shadow"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Request API Access / Sandbox Key</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Access Workflow Modal */}
      {accessModalDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setAccessModalDataset(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Key className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-slate-100">
                Request Research Sandbox API Key
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Dataset: <strong className="text-slate-200">{accessModalDataset.name}</strong> ({accessModalDataset.code})
            </p>

            {accessResult ? (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Access Granted: Research Sandbox</span>
                  </div>
                  <p className="text-slate-300">
                    Your simulated API credential has been provisioned under the Government Open Data Framework (SIH 2026).
                  </p>
                  <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-cyan-300 select-all border border-slate-800">
                    Bearer Token: {accessResult.accessKey}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Request ID: {accessResult.requestId} · Valid through Dec 2026
                  </div>
                </div>

                <button
                  onClick={() => setAccessModalDataset(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestAccessSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Organization / Institution
                  </label>
                  <input
                    type="text"
                    required
                    value={userOrg}
                    onChange={(e) => setUserOrg(e.target.value)}
                    placeholder="e.g. Indian Institute of Technology / Smart India Team"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Research / Analytical Purpose
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Briefly state how you will evaluate cadastral parcels or spatial changes..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="p-2.5 bg-slate-950 rounded text-[11px] text-slate-500 font-mono">
                  Instant token issuance for verified educational & hackathon prototypes.
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAccessModalDataset(null)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAccess}
                    className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs transition disabled:opacity-50"
                  >
                    {isSubmittingAccess ? 'Provisioning...' : 'Generate API Key'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
