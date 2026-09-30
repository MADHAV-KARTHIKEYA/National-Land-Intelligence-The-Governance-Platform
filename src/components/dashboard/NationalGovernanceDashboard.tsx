import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  MapPin,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  RefreshCw,
  PieChart as PieIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { NATIONAL_STATS, HIERARCHY_TREE, MOCK_PARCELS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';
import { ActiveModule } from '../../types';

interface DashboardProps {
  onNavigateToParcel?: (parcelId: string) => void;
  onNavigateModule?: (mod: ActiveModule) => void;
}

export const NationalGovernanceDashboard: React.FC<DashboardProps> = ({
  onNavigateToParcel,
  onNavigateModule
}) => {
  // Drill-down filter state
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedTaluk, setSelectedTaluk] = useState<string>('all');
  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [selectedLandUse, setSelectedLandUse] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('2026');
  const [activeChartTab, setActiveChartTab] = useState<'trends' | 'mutations' | 'disputes'>('trends');

  // Hierarchy lookups
  const currentStateObj = useMemo(
    () => HIERARCHY_TREE.find((s) => s.id === selectedState),
    [selectedState]
  );

  const availableDistricts = useMemo(
    () => (currentStateObj ? currentStateObj.districts : []),
    [currentStateObj]
  );

  const currentDistrictObj = useMemo(
    () => availableDistricts.find((d) => d.id === selectedDistrict),
    [availableDistricts, selectedDistrict]
  );

  const availableTaluks = useMemo(
    () => (currentDistrictObj ? currentDistrictObj.taluks : []),
    [currentDistrictObj]
  );

  const currentTalukObj = useMemo(
    () => availableTaluks.find((t) => t.id === selectedTaluk),
    [availableTaluks, selectedTaluk]
  );

  const availableVillages = useMemo(
    () => (currentTalukObj ? currentTalukObj.villages : []),
    [currentTalukObj]
  );

  // Filtered parcels count & computed metrics
  const multiplier = useMemo(() => {
    if (selectedVillage !== 'all') return 0.005;
    if (selectedTaluk !== 'all') return 0.02;
    if (selectedDistrict !== 'all') return 0.09;
    if (selectedState !== 'all') return 0.18;
    return 1.0;
  }, [selectedState, selectedDistrict, selectedTaluk, selectedVillage]);

  // Scaled numbers for the drilldown
  const totalParcelsFormatted = useMemo(() => {
    if (selectedVillage !== 'all') return '3,420';
    if (selectedTaluk !== 'all') return '42,100';
    if (selectedDistrict !== 'all') return '2,140,000';
    if (selectedState !== 'all') return currentStateObj?.parcels || '18.4M';
    return NATIONAL_STATS.totalParcels;
  }, [selectedState, selectedDistrict, selectedTaluk, selectedVillage, currentStateObj]);

  const activeDisputesCount = useMemo(() => {
    const base = 1420830;
    return Math.round(base * multiplier).toLocaleString();
  }, [multiplier]);

  // Land-use breakdown with filter reactivity
  const landUseData = useMemo(() => {
    if (selectedLandUse === 'all') return NATIONAL_STATS.landUseDistribution;
    return NATIONAL_STATS.landUseDistribution.map((item) => ({
      ...item,
      percentage: item.label.toLowerCase() === selectedLandUse.toLowerCase() ? 100 : 0
    }));
  }, [selectedLandUse]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Drill-Down Breadcrumb Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-300">Administrative Hierarchy:</span>
            <button
              onClick={() => {
                setSelectedState('all');
                setSelectedDistrict('all');
                setSelectedTaluk('all');
                setSelectedVillage('all');
              }}
              className={`hover:text-emerald-400 transition ${selectedState === 'all' ? 'text-emerald-400 font-bold' : ''}`}
            >
              National (India)
            </button>
            {currentStateObj && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <button
                  onClick={() => {
                    setSelectedDistrict('all');
                    setSelectedTaluk('all');
                    setSelectedVillage('all');
                  }}
                  className={`hover:text-emerald-400 transition ${selectedDistrict === 'all' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  {currentStateObj.name}
                </button>
              </>
            )}
            {currentDistrictObj && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <button
                  onClick={() => {
                    setSelectedTaluk('all');
                    setSelectedVillage('all');
                  }}
                  className={`hover:text-emerald-400 transition ${selectedTaluk === 'all' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  {currentDistrictObj.name}
                </button>
              </>
            )}
            {currentTalukObj && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <button
                  onClick={() => setSelectedVillage('all')}
                  className={`hover:text-emerald-400 transition ${selectedVillage === 'all' ? 'text-emerald-400 font-bold' : ''}`}
                >
                  {currentTalukObj.name}
                </button>
              </>
            )}
            {selectedVillage !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-emerald-400 font-bold">
                  {availableVillages.find((v) => v.id === selectedVillage)?.name || selectedVillage}
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Drill-down filters automatically re-aggregate cadastral statistics, mutation velocity, and dispute vectors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* State selector */}
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedDistrict('all');
              setSelectedTaluk('all');
              setSelectedVillage('all');
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All States (National)</option>
            {HIERARCHY_TREE.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.parcels})</option>
            ))}
          </select>

          {/* District selector */}
          <select
            disabled={selectedState === 'all'}
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedTaluk('all');
              setSelectedVillage('all');
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 disabled:opacity-40 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Districts</option>
            {availableDistricts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          {/* Taluk / Mandal */}
          <select
            disabled={selectedDistrict === 'all'}
            value={selectedTaluk}
            onChange={(e) => {
              setSelectedTaluk(e.target.value);
              setSelectedVillage('all');
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 disabled:opacity-40 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Taluks / Mandals</option>
            {availableTaluks.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          {/* Village */}
          <select
            disabled={selectedTaluk === 'all'}
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 disabled:opacity-40 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Habitations / Villages</option>
            {availableVillages.map((v) => (
              <option key={v.id} value={v.id}>{v.name} ({v.surveyPrefix})</option>
            ))}
          </select>

          {/* Land-use filter */}
          <select
            value={selectedLandUse}
            onChange={(e) => setSelectedLandUse(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Land Use Classes</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Residential">Residential</option>
            <option value="Commercial & Infra">Commercial & Infra</option>
            <option value="Industrial">Industrial</option>
            <option value="Forest & Eco">Forest & Eco</option>
            <option value="Government & Public">Government Land</option>
            <option value="Water Bodies">Water Bodies</option>
          </select>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedState('all');
              setSelectedDistrict('all');
              setSelectedTaluk('all');
              setSelectedVillage('all');
              setSelectedLandUse('all');
            }}
            title="Reset Filters"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Parcels */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Mapped Parcels
          </div>
          <div className="text-2xl font-extrabold text-slate-100 mt-1 font-mono tracking-tight">
            {totalParcelsFormatted}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.8% Newly Geotagged (2026)</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>DILRMP & SVAMITVA</span>
            <span className="font-mono text-emerald-400">94.6% Digitized</span>
          </div>
        </div>

        {/* Metric 2: Mapped Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Surveyed Area
          </div>
          <div className="text-2xl font-extrabold text-slate-100 mt-1 font-mono tracking-tight">
            {selectedState === 'all' ? '3,287,263 km²' : `${Math.round(3287263 * multiplier).toLocaleString()} km²`}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-cyan-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CORS RTK Centimeter Precision</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Geodetic Datum</span>
            <span className="font-mono text-cyan-400">WGS84 UTM</span>
          </div>
        </div>

        {/* Metric 3: Active Disputes */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Disputes Identified
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono tracking-tight">
            {activeDisputesCount}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{NATIONAL_STATS.disputeResolutionRate} Resolution Rate</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>eCourts NJDG Sync</span>
            <span className="font-mono text-amber-400">680+ Districts</span>
          </div>
        </div>

        {/* Metric 4: Mutation Speed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Avg Mutation Velocity
          </div>
          <div className="text-2xl font-extrabold text-indigo-400 mt-1 font-mono tracking-tight">
            {NATIONAL_STATS.avgMutationTimeDays} Days
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Down from 110 Days (2020)</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>NGDRS Auto-Notice</span>
            <span className="font-mono text-indigo-400">Instant Locking</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Land Use Distribution & Interactive Chart Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Land Use Breakdown & Heatmap representation (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-100">Land-Use Distribution & Classification</h3>
            </div>
            <DataTrustBadge score={96} source="ISRO LULC 10m" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-spectral satellite segmentation calibrated with Survey of India ground-truth CORS benchmarks.
          </p>

          {/* Distribution Bars */}
          <div className="space-y-3 pt-2">
            {landUseData.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">{item.areaHa}</span>
                    <span className="text-slate-200 font-semibold">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Encroachment & Conversion Warning Cards */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs space-y-1 text-slate-200">
            <div className="flex items-center gap-2 font-semibold text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Conversion & Encroachment Indicators</span>
            </div>
            <p className="text-slate-400">
              AI change detection logged <strong className="text-amber-300">1,240 unauthorized conversions</strong> within prime agricultural and wetland corridors in the selected zone during the last 90 days.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Charts (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">National Cadastral & Registration Dynamics</h3>
                <p className="text-xs text-slate-400">Time-series validation from 2020 through 2026</p>
              </div>

              {/* Chart Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveChartTab('trends')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition ${
                    activeChartTab === 'trends'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Registrations
                </button>
                <button
                  onClick={() => setActiveChartTab('mutations')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition ${
                    activeChartTab === 'mutations'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Mutation Velocity
                </button>
                <button
                  onClick={() => setActiveChartTab('disputes')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition ${
                    activeChartTab === 'disputes'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Dispute Causes
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="pt-6 min-h-[260px] flex flex-col justify-end">
              {activeChartTab === 'trends' && (
                <div className="space-y-4">
                  <div className="flex items-end justify-between gap-2 h-44 px-2">
                    {NATIONAL_STATS.registrationTrends.map((point) => {
                      const max = 45;
                      const barHeight = (point.count / max) * 100;
                      const mutHeight = (point.mutations / max) * 100;
                      return (
                        <div key={point.year} className="flex-1 flex flex-col items-center gap-1 group">
                          <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">
                            {point.count}M
                          </div>
                          <div className="w-full flex items-end justify-center gap-1 h-36">
                            <div
                              style={{ height: `${barHeight}%` }}
                              className="w-1/2 bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all"
                              title={`${point.year}: ${point.count}M Registrations`}
                            />
                            <div
                              style={{ height: `${mutHeight}%` }}
                              className="w-1/2 bg-cyan-500/80 hover:bg-cyan-400 rounded-t transition-all"
                              title={`${point.year}: ${point.mutations}M Auto-Mutations`}
                            />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 mt-1">{point.year}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-emerald-500 rounded" />
                      <span>Total Registrations (Million Deeds)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-cyan-500 rounded" />
                      <span>Completed Auto-Mutations (Million)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeChartTab === 'mutations' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-2 h-44 items-end px-2">
                    {NATIONAL_STATS.monthlyMutations.map((m) => {
                      const height = (m.processed / 550) * 100;
                      return (
                        <div key={m.month} className="flex flex-col items-center gap-1 group">
                          <span className="text-[10px] font-mono text-indigo-400 opacity-0 group-hover:opacity-100">
                            {m.avgDays}d
                          </span>
                          <div
                            style={{ height: `${height}%` }}
                            className="w-full bg-indigo-500/80 hover:bg-indigo-400 rounded-t transition-all"
                            title={`${m.month}: ${m.processed}K processed in ${m.avgDays} days`}
                          />
                          <span className="text-[11px] font-mono text-slate-400 mt-1">{m.month}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>Peak Month: June (510,000 processed)</span>
                    <span className="text-emerald-400 font-mono">11.4 Days Avg Latency</span>
                  </div>
                </div>
              )}

              {activeChartTab === 'disputes' && (
                <div className="space-y-3 pt-2">
                  {NATIONAL_STATS.disputeCategories.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.name}</span>
                        <div className="flex items-center gap-3 font-mono">
                          <span className="text-slate-400">{item.count}</span>
                          <span className="text-amber-400 font-semibold">{item.share}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${item.share * 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Simulated NGDRS & eCourts API Sync</span>
            <button
              onClick={() => onNavigateModule && onNavigateModule('scoreboard')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
            >
              <span>View Governance Scoreboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sample Parcels in Selected Region */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Live Surveyed Parcels in Active Scope</h3>
            <p className="text-xs text-slate-400">Click any parcel to inspect geospatial vector boundaries and AI anomaly checks</p>
          </div>
          <button
            onClick={() => onNavigateModule && onNavigateModule('gis')}
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
          >
            <span>Open in Interactive GIS</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {MOCK_PARCELS.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigateToParcel && onNavigateToParcel(p.id)}
              className="p-3.5 rounded-lg bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 font-mono">
                  {p.surveyNumber}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  p.disputeStatus === 'Clear'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {p.disputeStatus}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>{p.village}, {p.district}</span>
                <span className="font-mono text-slate-300">{p.areaAcres} Acres</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80 text-slate-500 font-mono">
                <span>Quality: {p.qualityScore}%</span>
                <span>Risk: {p.riskScore}/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
