import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  Plus,
  UserCheck,
  CheckCircle,
  MessageCircle,
  Tag,
  Shield,
  X
} from 'lucide-react';
import { DiscussionThread } from '../../types';
import { MOCK_DISCUSSIONS } from '../../data/mockData';
import { DataTrustBadge } from '../common/DataTrustBadge';

export const CollaborationHub: React.FC = () => {
  const [threads, setThreads] = useState<DiscussionThread[]>(MOCK_DISCUSSIONS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(MOCK_DISCUSSIONS[0].id);
  const [replyText, setReplyText] = useState('');
  const [newThreadModalOpen, setNewThreadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('Cadastral Standards');
  const [newTags, setNewTags] = useState('GIS, Geodesy');

  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      id: `r-${Date.now()}`,
      author: 'You (Researcher / GovTech Team)',
      role: 'SIH 2026 Collaborator',
      content: replyText.trim(),
      createdAt: 'Just now'
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === currentThread.id
          ? {
              ...t,
              repliesCount: t.repliesCount + 1,
              replies: [...t.replies, newReply]
            }
          : t
      )
    );
    setReplyText('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: DiscussionThread = {
      id: `th-${Date.now()}`,
      title: newTitle.trim(),
      author: 'You (GovTech Investigator)',
      role: 'Cadastral GIS Researcher',
      avatar: 'YOU',
      topic: newTopic,
      createdAt: 'Just now',
      repliesCount: 0,
      upvotes: 1,
      content: newContent.trim(),
      tags: newTags.split(',').map((t) => t.trim()),
      replies: []
    };

    setThreads([created, ...threads]);
    setSelectedThreadId(created.id);
    setNewThreadModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">
              National Land Research & GovTech Collaboration Hub
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Multi-agency discussion workspace for Survey of India geodesists, state revenue commissioners, university GIS labs, and SIH 2026 teams.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewThreadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Start Discussion</span>
          </button>
          <DataTrustBadge score={97} source="GovTech Expert Network" />
        </div>
      </div>

      {/* Main Grid: Discussion List & Active Thread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Threads List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono px-1">
            Active Research Threads ({threads.length})
          </div>

          {threads.map((t) => {
            const isSelected = t.id === currentThread.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedThreadId(t.id)}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500/50 shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-indigo-300">
                      {t.avatar}
                    </div>
                    <span className="text-slate-300 font-semibold">{t.author}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{t.createdAt}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {t.content}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80 font-mono text-slate-500">
                  <span className="text-indigo-400 font-semibold">{t.topic}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleUpvote(t.id, e)}
                      className="flex items-center gap-1 hover:text-emerald-400 transition"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{t.upvotes}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t.repliesCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Thread Detail & Replies (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Thread Header */}
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-bold">{currentThread.topic}</span>
                <span className="text-xs text-slate-400 font-mono">{currentThread.createdAt}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{currentThread.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{currentThread.author}</span>
                <span>·</span>
                <span className="text-slate-400 font-mono">{currentThread.role}</span>
              </div>
            </div>

            {/* Thread Body */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
              <p>{currentThread.content}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentThread.tags.map((tg) => (
                  <span
                    key={tg}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono"
                  >
                    #{tg}
                  </span>
                ))}
              </div>
            </div>

            {/* Replies Stream */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Discussion Replies ({currentThread.replies.length})
              </span>

              {currentThread.replies.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs bg-slate-950/60 rounded border border-slate-800">
                  No replies yet. Be the first to share your cadastral field experience.
                </div>
              ) : (
                currentThread.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{reply.author}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({reply.role})</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{reply.createdAt}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{reply.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Contribute technical insight or reference legal circular..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition disabled:opacity-40 flex items-center gap-1.5 shadow"
            >
              <span>Reply</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* New Thread Modal */}
      {newThreadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setNewThreadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">Start GovTech Collaboration Thread</h3>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Thread Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Solving boundary discrepancies in multi-polygon hill cadastres"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Pillar / Topic</label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
                >
                  <option value="Cadastral Standards">Cadastral Standards</option>
                  <option value="Data Governance & Privacy">Data Governance & Privacy</option>
                  <option value="AI Anomaly Detection">AI Anomaly Detection</option>
                  <option value="Mutation Velocity">Mutation Velocity</option>
                  <option value="Dispute Mitigation">Dispute Mitigation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Discussion Content</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide context, problem statement, datasets, and proposed hypothesis..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. CORS, Drone, DILRMP"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewThreadModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-xs transition"
                >
                  Post Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
