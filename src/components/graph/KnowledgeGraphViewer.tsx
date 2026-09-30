import React, { useState, useMemo } from 'react';
import {
  Share2,
  Search,
  Filter,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  CheckCircle,
  X
} from 'lucide-react';
import { KnowledgeGraphNode, KnowledgeGraphLink } from '../../types';
import { MOCK_GRAPH_NODES, MOCK_GRAPH_LINKS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const KnowledgeGraphViewer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(MOCK_GRAPH_NODES[0].id);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Position nodes radially / topologically on a 700x500 canvas
  const nodePositions = useMemo(() => {
    const width = 720;
    const height = 480;
    const centerX = width / 2;
    const centerY = height / 2;
    const positions: Record<string, { x: number; y: number }> = {};

    MOCK_GRAPH_NODES.forEach((node, i) => {
      const angle = (i / MOCK_GRAPH_NODES.length) * 2 * Math.PI;
      const radius = i % 2 === 0 ? 170 : 120;
      positions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });
    return positions;
  }, []);

  const selectedNode = useMemo(
    () => MOCK_GRAPH_NODES.find((n) => n.id === selectedNodeId) || MOCK_GRAPH_NODES[0],
    [selectedNodeId]
  );

  const relatedLinks = useMemo(() => {
    return MOCK_GRAPH_LINKS.filter(
      (l) => l.source === selectedNode.id || l.target === selectedNode.id
    );
  }, [selectedNode]);

  const getNodeColor = (type: KnowledgeGraphNode['type']) => {
    switch (type) {
      case 'Parcel':
        return '#10b981'; // emerald
      case 'Dataset':
        return '#06b6d4'; // cyan
      case 'Policy':
        return '#f59e0b'; // amber
      case 'Organization':
        return '#6366f1'; // indigo
      case 'Program':
        return '#ec4899'; // pink
      case 'Research Paper':
        return '#8b5cf6'; // purple
      case 'Case Study':
        return '#14b8a6'; // teal
      case 'Land Use':
        return '#84cc16'; // lime
      default:
        return '#94a3b8';
    }
  };

  const filteredNodes = useMemo(() => {
    return MOCK_GRAPH_NODES.filter((n) => {
      const matchType = filterType === 'All' || n.type === filterType;
      const matchSearch =
        !searchQuery ||
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.details.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Land Knowledge & Policy Ontological Graph
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Multi-relational graph tracing linkages between cadastral parcels, remote sensing datasets, legal frameworks, academic papers, and government schemes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={97} source="W3C OWL / RDF Graph" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entity node (e.g. Parcel, CORS, ISRO)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0">Entity:</span>
          {['All', 'Parcel', 'Dataset', 'Policy', 'Organization', 'Program', 'Land Use'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition ${
                filterType === t
                  ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Canvas + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Canvas Viewport (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl min-h-[480px] flex items-center justify-center">
          {/* Zoom controls */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
              className="p-1 text-slate-300 hover:text-indigo-400"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
              className="p-1 text-slate-300 hover:text-indigo-400"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-slate-300 hover:text-indigo-400 border-t border-slate-800"
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Graph */}
          <svg
            viewBox="0 0 720 480"
            className="w-full h-full max-h-[500px] transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Edge Connections */}
            {MOCK_GRAPH_LINKS.map((link, idx) => {
              const srcPos = nodePositions[link.source];
              const tgtPos = nodePositions[link.target];
              if (!srcPos || !tgtPos) return null;

              const isHighlighted =
                selectedNode.id === link.source || selectedNode.id === link.target;
              const midX = (srcPos.x + tgtPos.x) / 2;
              const midY = (srcPos.y + tgtPos.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={isHighlighted ? '#818cf8' : '#334155'}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    strokeDasharray={isHighlighted ? 'none' : '3 3'}
                  />
                  {isHighlighted && (
                    <text
                      x={midX}
                      y={midY}
                      fill="#a5b4fc"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="drop-shadow bg-slate-900"
                    >
                      {link.relationship}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              const isSelected = selectedNode.id === node.id;
              const color = getNodeColor(node.type);

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 18 : 12}
                    fill={color}
                    fillOpacity={isSelected ? 0.9 : 0.6}
                    stroke={isSelected ? '#ffffff' : color}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200 group-hover:fill-opacity-100"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + (isSelected ? 32 : 24)}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize={isSelected ? '11' : '9'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fontFamily="monospace"
                    className="pointer-events-none drop-shadow"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom legend */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Parcel
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Dataset
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Policy
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400" /> Organization
              </span>
            </div>
            <span>Click any node to inspect semantic triples</span>
          </div>
        </div>

        {/* Node Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between text-xs">
              <span
                className="font-mono font-bold text-xs"
                style={{ color: getNodeColor(selectedNode.type) }}
              >
                {selectedNode.type}
              </span>
              <span className="text-[11px] font-mono text-slate-500">{selectedNode.id}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-100 mt-1">
              {selectedNode.label}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{selectedNode.details}</p>
          </div>

          {selectedNode.metric && (
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between">
              <span className="text-slate-500">Core Attribute:</span>
              <span className="text-emerald-400 font-bold">{selectedNode.metric}</span>
            </div>
          )}

          {/* Relationships Triples */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Explicit Ontological Relations ({relatedLinks.length})
            </span>
            <div className="space-y-1.5">
              {relatedLinks.map((link, i) => {
                const otherId = link.source === selectedNode.id ? link.target : link.source;
                const otherNode = MOCK_GRAPH_NODES.find((n) => n.id === otherId);
                const isSource = link.source === selectedNode.id;

                return (
                  <div
                    key={i}
                    onClick={() => otherNode && setSelectedNodeId(otherNode.id)}
                    className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded border border-slate-800 cursor-pointer transition text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-indigo-400 font-semibold">{link.relationship}</span>
                      <span className="text-slate-500">{isSource ? 'Target' : 'Source'}</span>
                    </div>
                    <div className="font-semibold text-slate-200">
                      {otherNode ? otherNode.label : otherId}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-slate-950/70 rounded text-[11px] text-slate-500 font-mono">
            Compliant with W3C PROV-O & DCAT-AP spatial vocabulary standards.
          </div>
        </div>
      </div>
    </div>
  );
};
