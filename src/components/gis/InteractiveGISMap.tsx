import React, { useState, useMemo } from 'react';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Navigation,
  Compass,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  X,
  RefreshCw,
  Search,
  Eye,
  Info
} from 'lucide-react';
import { LandParcel, AIAnalysisResult } from '../../types';
import { MOCK_PARCELS } from '../../data/mockData';
import { parcelService } from '../../services/apiServices';
import { DataTrustBadge } from '../common/DataTrustBadge';

interface InteractiveGISMapProps {
  initialParcelId?: string;
}

export const InteractiveGISMap: React.FC<InteractiveGISMapProps> = ({ initialParcelId }) => {
  const [selectedParcelId, setSelectedParcelId] = useState<string>(
    initialParcelId || MOCK_PARCELS[0].id
  );
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [baseMapStyle, setBaseMapStyle] = useState<'satellite' | 'dark' | 'topo' | 'ndvi'>('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

  // Layer toggles
  const [layers, setLayers] = useState({
    parcels: true,
    landUse: true,
    disputes: true,
    anomalies: true,
    infrastructure: true,
    waterBodies: true,
    environmentalRisk: true,
    developmentPressure: false
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const selectedParcel = useMemo(
    () => MOCK_PARCELS.find((p) => p.id === selectedParcelId) || MOCK_PARCELS[0],
    [selectedParcelId]
  );

  const filteredParcels = useMemo(() => {
    if (!searchQuery) return MOCK_PARCELS;
    const q = searchQuery.toLowerCase();
    return MOCK_PARCELS.filter(
      (p) =>
        p.surveyNumber.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.landUse.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleAnalyzeParcel = async (parcel: LandParcel) => {
    setIsAnalyzing(true);
    setAnalysisModalOpen(true);
    try {
      const result = await parcelService.analyzeParcelWithAI(parcel);
      setAiAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Convert GPS coordinates to viewport SVG points for visualization
  // Base origin centered near Hyderabad / Ranga Reddy (17.40, 78.36)
  const getSvgPolygonPoints = (parcel: LandParcel) => {
    const centerLat = 17.41;
    const centerLng = 78.36;
    const scale = 2200 * (zoomLevel / 14);

    return parcel.polygon
      .map(([lat, lng]) => {
        const x = 320 + (lng - centerLng) * scale * 1.5;
        const y = 240 - (lat - centerLat) * scale;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const getParcelFillColor = (parcel: LandParcel) => {
    if (layers.anomalies && parcel.anomalyFlag) return 'rgba(239, 68, 68, 0.45)';
    if (layers.disputes && parcel.disputeStatus !== 'Clear') return 'rgba(245, 158, 11, 0.45)';
    if (layers.waterBodies && parcel.landUse === 'Water Body') return 'rgba(6, 182, 212, 0.5)';
    if (parcel.landUse === 'Agricultural') return 'rgba(16, 185, 129, 0.35)';
    if (parcel.landUse === 'Residential') return 'rgba(59, 130, 246, 0.35)';
    if (parcel.landUse === 'Commercial') return 'rgba(99, 102, 241, 0.4)';
    if (parcel.landUse === 'Industrial') return 'rgba(139, 92, 246, 0.4)';
    return 'rgba(148, 163, 184, 0.3)';
  };

  const getParcelStrokeColor = (parcel: LandParcel) => {
    if (parcel.id === selectedParcelId) return '#38bdf8'; // sky blue glowing ring
    if (layers.anomalies && parcel.anomalyFlag) return '#ef4444';
    if (layers.disputes && parcel.disputeStatus !== 'Clear') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-slate-100">National Cadastral GIS & Multi-Spectral Satellite Canvas</h2>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-xs text-slate-400 hidden sm:inline">Survey of India CORS Datum EPSG:4326 (WGS84)</span>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={97} label="GIS Accuracy" source="CORS RTK Sub-Decimeter" />
        </div>
      </div>

      {/* Main Map + Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map Viewport Area (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl flex flex-col min-h-[580px]">
          {/* Top GIS Toolbar Controls */}
          <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur border border-slate-700/80 p-1.5 rounded-lg shadow-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">Basemap:</span>
            {(['satellite', 'dark', 'topo', 'ndvi'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setBaseMapStyle(mode)}
                className={`px-2 py-1 text-xs font-medium rounded transition uppercase ${
                  baseMapStyle === mode
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Top Right Zoom Controls */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-slate-900/90 backdrop-blur border border-slate-700/80 p-1 rounded-lg shadow-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
              title="Zoom In"
              className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="text-[10px] font-mono text-center text-slate-400 py-0.5">{zoomLevel}x</div>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 1, 10))}
              title="Zoom Out"
              className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(14)}
              title="Recenter Map"
              className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded border-t border-slate-800"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive SVG Canvas */}
          <div
            className={`w-full flex-1 relative flex items-center justify-center select-none overflow-hidden ${
              baseMapStyle === 'satellite'
                ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:16px_16px] bg-slate-950'
                : baseMapStyle === 'ndvi'
                ? 'bg-emerald-950/40'
                : baseMapStyle === 'topo'
                ? 'bg-amber-950/20'
                : 'bg-slate-950'
            }`}
          >
            {/* Visual Grid Lines and Satellite Imagery Simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Satellite / Topo Texture Overlay */}
            {baseMapStyle === 'satellite' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-emerald-950/20 to-slate-900 pointer-events-none" />
            )}

            {/* Water Body Simulation Stream */}
            {layers.waterBodies && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 50 180 Q 220 220 380 290 T 700 360"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeOpacity="0.45"
                />
                <text x="320" y="270" fill="#06b6d4" fontSize="10" fontFamily="monospace" opacity="0.8">
                  Gandipet Inflow Hydrological Corridor
                </text>
              </svg>
            )}

            {/* Infrastructure Corridor Layer */}
            {layers.infrastructure && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 120 40 L 480 520"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="5"
                  strokeDasharray="8 4"
                  strokeOpacity="0.6"
                />
                <text x="340" y="340" fill="#fbbf24" fontSize="10" fontFamily="monospace" opacity="0.9">
                  NH-44 Outer Ring Road Access Vector
                </text>
              </svg>
            )}

            {/* Cadastral Parcels SVG Layer */}
            {layers.parcels && (
              <svg
                viewBox="0 0 640 480"
                className="w-full h-full max-h-[560px] relative z-10 transition-transform duration-300"
              >
                {filteredParcels.map((parcel) => {
                  const points = getSvgPolygonPoints(parcel);
                  const isSelected = parcel.id === selectedParcelId;
                  const [firstLat, firstLng] = parcel.coordinates;
                  const centerX = 320 + (firstLng - 78.36) * 2200 * (zoomLevel / 14) * 1.5;
                  const centerY = 240 - (firstLat - 17.41) * 2200 * (zoomLevel / 14);

                  return (
                    <g key={parcel.id} className="cursor-pointer transition">
                      {/* Polygon */}
                      <polygon
                        points={points}
                        fill={getParcelFillColor(parcel)}
                        stroke={getParcelStrokeColor(parcel)}
                        strokeWidth={isSelected ? 3.5 : 1.5}
                        onClick={() => setSelectedParcelId(parcel.id)}
                        className="transition-all hover:fill-opacity-80"
                      />

                      {/* Survey label */}
                      <text
                        x={centerX}
                        y={centerY}
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                        fontSize={isSelected ? '12' : '10'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fontFamily="monospace"
                        className="pointer-events-none drop-shadow"
                      >
                        {parcel.surveyNumber}
                      </text>

                      {/* Anomaly Badge Marker */}
                      {layers.anomalies && parcel.anomalyFlag && (
                        <circle
                          cx={centerX + 18}
                          cy={centerY - 10}
                          r="5"
                          fill="#ef4444"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Bottom HUD Bar on Map */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LAT: {selectedParcel.coordinates[0].toFixed(4)}°N
                </span>
                <span>LNG: {selectedParcel.coordinates[1].toFixed(4)}°E</span>
                <span className="hidden sm:inline">EPSG:4326</span>
              </div>
              <div className="flex items-center gap-3">
                <span>SCALE 1:5000</span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-400 font-semibold">{selectedParcel.surveyNumber}</span>
              </div>
            </div>
          </div>

          {/* Layer Selector Collapsible Bar */}
          <div className="border-t border-slate-800 bg-slate-900/95 p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Map Layers:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.parcels}
                  onChange={() => toggleLayer('parcels')}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Parcels</span>
              </label>

              <label className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.disputes}
                  onChange={() => toggleLayer('disputes')}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Disputed</span>
              </label>

              <label className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.anomalies}
                  onChange={() => toggleLayer('anomalies')}
                  className="rounded border-slate-700 text-rose-500 focus:ring-0"
                />
                <span>AI Anomalies</span>
              </label>

              <label className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.waterBodies}
                  onChange={() => toggleLayer('waterBodies')}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Hydrology</span>
              </label>

              <label className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.infrastructure}
                  onChange={() => toggleLayer('infrastructure')}
                  className="rounded border-slate-700 text-yellow-500 focus:ring-0"
                />
                <span>Roads & Infra</span>
              </label>
            </div>
          </div>
        </div>

        {/* Selected Parcel Inspector Side Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Quick search inside parcels */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by Sy No. or Village..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Header info */}
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {selectedParcel.id}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  selectedParcel.disputeStatus === 'Clear'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold'
                }`}>
                  {selectedParcel.disputeStatus}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-100 font-mono mt-1">
                Survey #{selectedParcel.surveyNumber}
              </h3>
              <p className="text-xs text-slate-400">
                Village {selectedParcel.village}, Taluk {selectedParcel.taluk}, {selectedParcel.district}, {selectedParcel.state}
              </p>
            </div>

            {/* Spec Sheet Table */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Area</span>
                <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">
                  {selectedParcel.areaAcres} Acres
                </div>
              </div>
              <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Land Use</span>
                <div className="text-sm font-bold text-slate-100 mt-0.5">
                  {selectedParcel.landUse}
                </div>
              </div>
              <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Ownership</span>
                <div className="text-sm font-bold text-slate-100 mt-0.5">
                  {selectedParcel.ownershipType}
                </div>
              </div>
              <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Valuation</span>
                <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">
                  {selectedParcel.valuationINR}
                </div>
              </div>
            </div>

            {/* Trust and Risk Scores */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Data Quality Score</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedParcel.qualityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${selectedParcel.qualityScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Litigation Risk Index</span>
                <span className={`font-mono font-bold ${
                  selectedParcel.riskScore > 50 ? 'text-rose-400' : 'text-slate-300'
                }`}>
                  {selectedParcel.riskScore}/100
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    selectedParcel.riskScore > 50 ? 'bg-rose-500' : 'bg-slate-500'
                  }`}
                  style={{ width: `${selectedParcel.riskScore}%` }}
                />
              </div>
            </div>

            {/* Anomaly Detection Callout */}
            {selectedParcel.anomalyFlag && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>AI Anomaly Flagged</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedParcel.anomalyDescription}
                </p>
              </div>
            )}

            {/* Data Source & Provenance Meta */}
            <div className="p-2.5 bg-slate-950/60 rounded text-[11px] text-slate-400 space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Source:</span>
                <span className="text-slate-300 text-right truncate max-w-[190px]">{selectedParcel.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Synced:</span>
                <span className="text-slate-300">{selectedParcel.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* AI Analyze Action Button */}
          <div className="pt-2">
            <button
              onClick={() => handleAnalyzeParcel(selectedParcel)}
              disabled={isAnalyzing}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Running Neural Analysis...' : 'AI Analyze Parcel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Parcel Analysis Modal */}
      {analysisModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setAnalysisModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Explainable AI Parcel Analysis: {selectedParcel.surveyNumber}
                </h3>
                <p className="text-xs text-slate-400">
                  Multi-spectral satellite segmentation · Geodetic survey validation
                </p>
              </div>
            </div>

            {isAnalyzing ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs font-mono text-slate-400">
                  Processing Sentinel-2 spectral raster & CORS baseline vectors...
                </p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-4 text-xs">
                {/* Summary */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    Analytical Summary
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{aiAnalysis.summary}</p>
                </div>

                {/* Evidence */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Empirical Evidence & GIS Tracing
                  </div>
                  <p className="text-slate-300 leading-relaxed">{aiAnalysis.evidence}</p>
                </div>

                {/* Data Sources & Confidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                      Data Sources & Calibration
                    </div>
                    <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                      {aiAnalysis.dataSources.map((ds, i) => (
                        <li key={i}>{ds}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                      Confidence & Limitations
                    </div>
                    <div className="flex items-center justify-between text-slate-300 font-mono">
                      <span>Analytical Confidence:</span>
                      <span className="text-emerald-400 font-bold">{aiAnalysis.confidence}%</span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic leading-snug">
                      {aiAnalysis.limitations}
                    </p>
                  </div>
                </div>

                {/* Suggested Next Steps */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    Recommended Verification Actions
                  </div>
                  <div className="space-y-1">
                    {aiAnalysis.suggestedNextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Timestamp: {new Date(aiAnalysis.timestamp).toLocaleString()}</span>
                  <button
                    onClick={() => setAnalysisModalOpen(false)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-sans"
                  >
                    Close Analysis
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
