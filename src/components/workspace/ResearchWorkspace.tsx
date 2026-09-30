import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Bot,
  FileText,
  Database,
  MapPin,
  Sparkles,
  CheckCircle2,
  Trash2,
  Save,
  Download,
  Share2,
  X
} from 'lucide-react';
import { ResearchProject } from '../../types';
import { MOCK_PROJECTS, MOCK_DATASETS, MOCK_DOCUMENTS, MOCK_PARCELS } from '../../data/mockData';
import { researchService } from '../../services/apiServices';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const ResearchWorkspace: React.FC = () => {
  const [projects, setProjects] = useState<ResearchProject[]>(MOCK_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [activeNotes, setActiveNotes] = useState<string>(MOCK_PROJECTS[0].notes);
  const [newFindingText, setNewFindingText] = useState('');
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);
  const [copilotSynthesis, setCopilotSynthesis] = useState<string | null>(null);

  // New Project Modal State
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newHypothesis, setNewHypothesis] = useState('');
  const [newLead, setNewLead] = useState('');

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleSaveNotes = () => {
    setProjects((prev) =>
      prev.map((p) => (p.id === currentProject.id ? { ...p, notes: activeNotes } : p))
    );
    alert('Research notes saved successfully to project ledger.');
  };

  const handleAddFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFindingText.trim()) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProject.id
          ? { ...p, findings: [...p.findings, newFindingText.trim()] }
          : p
      )
    );
    setNewFindingText('');
  };

  const handleCreateNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;
    const created = await researchService.createProject({
      title: newTitle.trim(),
      question: newQuestion.trim(),
      hypothesis: newHypothesis.trim() || 'Spatial cadastre digitization yields positive public welfare.',
      leadResearcher: newLead.trim() || 'Principal Investigator (GovTech)',
      status: 'In Progress',
      datasets: ['DS-IND-CAD-01'],
      documents: ['DOC-2026-01'],
      savedParcels: ['PCL-TS-RR-001'],
      notes: 'Initial problem formulation and spatial boundary identification.',
      findings: ['Base CORS RTK ground-truthing initialized.']
    });

    setProjects([created, ...projects]);
    setSelectedProjectId(created.id);
    setActiveNotes(created.notes);
    setNewProjectModalOpen(false);
    setNewTitle('');
    setNewQuestion('');
    setNewHypothesis('');
    setNewLead('');
  };

  const runAICopilot = () => {
    setIsCopilotThinking(true);
    setTimeout(() => {
      setCopilotSynthesis(
        `AI Copilot synthesized evidence from ${currentProject.datasets.length} datasets, ${currentProject.documents.length} literature sources, and ${currentProject.savedParcels.length} survey parcels. Key takeaway: Empirical data validates the hypothesis with 88% statistical significance. Recommend formulating policy brief for Ministry review.`
      );
      setIsCopilotThinking(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Land Research & Hypothesis Workspace
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Collaborative analytical sandbox for formulating land research questions, attaching GIS parcels, curating data catalogs, and synthesizing policy evidence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewProjectModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Research Project</span>
          </button>
          <DataTrustBadge score={94} source="Research Sandbox" />
        </div>
      </div>

      {/* Main Workspace Layout (Projects List + Active Project Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Project Selector & Meta (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Active Research Projects ({projects.length})
            </span>
            <div className="space-y-1.5">
              {projects.map((p) => {
                const isSelected = p.id === currentProject.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setActiveNotes(p.notes);
                      setCopilotSynthesis(null);
                    }}
                    className={`w-full text-left p-3 rounded-lg text-xs transition ${
                      isSelected
                        ? 'bg-slate-800 border-l-4 border-indigo-400 text-slate-100 font-medium'
                        : 'bg-slate-950/60 hover:bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                      <span>{p.id}</span>
                      <span className="text-indigo-400 font-semibold">{p.status}</span>
                    </div>
                    <div className="font-bold text-slate-200 truncate">{p.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{p.question}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Copilot Panel */}
          <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase font-mono">
                <Bot className="w-4 h-4" />
                <span>AI Research Copilot</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-synthesizes project findings, cross-references attached datasets, and evaluates evidence strength.
            </p>

            <button
              onClick={runAICopilot}
              disabled={isCopilotThinking}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition disabled:opacity-50 flex items-center justify-center gap-1.5 shadow"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{isCopilotThinking ? 'Synthesizing Project...' : 'Synthesize Project Evidence'}</span>
            </button>

            {copilotSynthesis && (
              <div className="p-3 bg-slate-950 rounded-lg border border-indigo-500/20 text-xs text-indigo-200/90 leading-relaxed animate-in fade-in">
                {copilotSynthesis}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          {/* Project Title and Question Header */}
          <div className="border-b border-slate-800 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-400 font-bold">{currentProject.id}</span>
              <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono">
                {currentProject.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">{currentProject.title}</h2>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px] block">
                Primary Research Question:
              </span>
              <p className="text-slate-200 font-semibold">{currentProject.question}</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px] block">
                Working Hypothesis:
              </span>
              <p className="text-slate-300 italic">{currentProject.hypothesis}</p>
            </div>
          </div>

          {/* Attached Artifacts (Datasets, Documents, Parcels) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Datasets */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 font-mono">
                <Database className="w-3.5 h-3.5" />
                <span>Datasets ({currentProject.datasets.length})</span>
              </div>
              <div className="space-y-1">
                {currentProject.datasets.map((d) => (
                  <div key={d} className="text-xs text-slate-300 font-mono truncate">
                    • {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 font-mono">
                <FileText className="w-3.5 h-3.5" />
                <span>Documents ({currentProject.documents.length})</span>
              </div>
              <div className="space-y-1">
                {currentProject.documents.map((doc) => (
                  <div key={doc} className="text-xs text-slate-300 font-mono truncate">
                    • {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Pinned Parcels */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pinned Parcels ({currentProject.savedParcels.length})</span>
              </div>
              <div className="space-y-1">
                {currentProject.savedParcels.map((p) => (
                  <div key={p} className="text-xs text-slate-300 font-mono truncate">
                    • {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Findings Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Key Empirical Findings
            </h3>
            <div className="space-y-2">
              {currentProject.findings.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{f}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddFinding} className="flex gap-2">
              <input
                type="text"
                value={newFindingText}
                onChange={(e) => setNewFindingText(e.target.value)}
                placeholder="Add new empirical finding or statistical observation..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded text-xs"
              >
                Add Finding
              </button>
            </form>
          </div>

          {/* Notes Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Researcher Field & Methodology Notes
              </h3>
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={activeNotes}
              onChange={(e) => setActiveNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setNewProjectModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-slate-100">Create Research Project</h3>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Assessment of Drone Cadastral Surveys in Hilly Regions"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Primary Research Question
                </label>
                <textarea
                  required
                  rows={2}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. How does terrain slope affect CORS RTK centimeter boundary precision?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Working Hypothesis
                </label>
                <input
                  type="text"
                  value={newHypothesis}
                  onChange={(e) => setNewHypothesis(e.target.value)}
                  placeholder="e.g. Dual-frequency GNSS reduces boundary error by 80% on steep slopes."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Lead Researcher</label>
                <input
                  type="text"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma, IIT Roorkee"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
