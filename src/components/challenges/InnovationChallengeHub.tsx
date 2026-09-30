import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
  Filter,
  CheckCircle2,
  X,
  Code,
  Lightbulb
} from 'lucide-react';
import { InnovationChallenge } from '../../types';
import { MOCK_CHALLENGES } from '../../data/mockData';
import { challengeService } from '../../services/apiServices';
import { DataTrustBadge } from '../common/DataTrustBadge';

interface InnovationChallengeHubProps {
  initialChallengeId?: string;
}

export const InnovationChallengeHub: React.FC<InnovationChallengeHubProps> = ({ initialChallengeId }) => {
  const [challenges, setChallenges] = useState<InnovationChallenge[]>(MOCK_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<InnovationChallenge | null>(
    initialChallengeId ? challenges.find((c) => c.id === initialChallengeId) || challenges[0] : challenges[0]
  );
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Upcoming' | 'Under Review' | 'Closed'>('All');

  // Submit Modal
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [solutionTitle, setSolutionTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    submissionId: string;
    submittedAt: string;
    status: string;
  } | null>(null);

  const filteredChallenges = challenges.filter(
    (c) => statusFilter === 'All' || c.status === statusFilter
  );

  const handleSubmitSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;
    setIsSubmitting(true);
    try {
      const res = await challengeService.submitIdea(selectedChallenge.id, {
        title: solutionTitle,
        team: teamName,
        abstract,
        githubUrl: repoUrl
      });
      setSubmissionReceipt(res);
      // update state count
      setChallenges((prev) =>
        prev.map((c) =>
          c.id === selectedChallenge.id ? { ...c, submissionsCount: c.submissionsCount + 1 } : c
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">
              Smart India Hackathon 2026: Land-Tech Innovation Challenges
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            National problem statements from the Ministry of Rural Development, Survey of India, and ISRO inviting student innovators and GovTech startups.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataTrustBadge score={99} source="National Hackathon Portal" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status:</span>
        {(['All', 'Open', 'Upcoming', 'Under Review', 'Closed'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === st
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Main Grid: Challenge Cards List & Selected Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Challenge Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredChallenges.map((ch) => {
            const isSelected = selectedChallenge?.id === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(ch);
                  setSubmissionReceipt(null);
                }}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/50 shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-bold text-[11px]">{ch.id}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    ch.status === 'Open'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {ch.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {ch.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {ch.problemStatement}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80 font-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">{ch.prizePool}</span>
                  <span>{ch.submissionsCount} Teams Active</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Challenge Full Detail (7 cols) */}
        {selectedChallenge && (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">{selectedChallenge.domain}</span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deadline: {selectedChallenge.deadline}</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-100">{selectedChallenge.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>Hosting Agency:</span>
                <span className="text-slate-200">{selectedChallenge.organization}</span>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
                Official Hackathon Problem Statement
              </span>
              <p className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 leading-relaxed">
                {selectedChallenge.problemStatement}
              </p>
            </div>

            {/* Required Skills & Datasets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono block">
                  Required Technical Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedChallenge.requiredSkills.map((sk) => (
                    <span key={sk} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono block">
                  Attached Benchmark Datasets
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedChallenge.datasets.map((ds) => (
                    <span key={ds} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">
                      {ds}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Submission Requirements */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono block">
                Evaluation Deliverables
              </span>
              <div className="space-y-1">
                {selectedChallenge.submissionRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800/80 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bottom */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Prize & Incubation: <span className="text-emerald-400 font-bold">{selectedChallenge.prizePool}</span>
              </div>

              <button
                onClick={() => setSubmitModalOpen(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Submit Solution Idea</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {submitModalOpen && selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => {
                setSubmitModalOpen(false);
                setSubmissionReceipt(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-slate-100">Submit Solution to Hackathon Jury</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-mono truncate">
              {selectedChallenge.title}
            </p>

            {submissionReceipt ? (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submission Successfully Received!</span>
                  </div>
                  <p className="text-slate-300">
                    Your solution abstract has been registered on the SIH 2026 Land-Tech Review Queue.
                  </p>
                  <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                    Tracking ID: {submissionReceipt.submissionId}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Status: {submissionReceipt.status} · Timestamp: {new Date(submissionReceipt.submittedAt).toLocaleTimeString()}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitModalOpen(false);
                    setSubmissionReceipt(null);
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitSolution} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Geodetic Pioneers (Team #1042)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Proposed Solution Title</label>
                  <input
                    type="text"
                    required
                    value={solutionTitle}
                    onChange={(e) => setSolutionTitle(e.target.value)}
                    placeholder="e.g. Real-Time ResNet18 Satellite Footing Change Detector"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Architecture & Method Abstract</label>
                  <textarea
                    required
                    rows={3}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Summarize your model architecture, data preprocessing pipeline, and inference latency..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">GitHub / Prototype Repo URL</label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmitModalOpen(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Uploading to Jury...' : 'Submit Entry'}
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
