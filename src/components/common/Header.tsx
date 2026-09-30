import React, { useState } from 'react';
import {
  Shield,
  Search,
  Mic,
  Bell,
  Globe,
  UserCheck,
  ChevronDown,
  Layers,
  BarChart3,
  Map,
  Database,
  Bot,
  Briefcase,
  Compass,
  Users,
  Trophy,
  History,
  ShieldCheck,
  Share2,
  GitBranch,
  Menu,
  X,
  Gauge
} from 'lucide-react';
import { ActiveModule, Language, UserRole } from '../../types';
import { TRANSLATIONS, LANGUAGE_OPTIONS } from '../../i18n/translations';

interface HeaderProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenSearch: () => void;
  onOpenVoice: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  language,
  onSelectLanguage,
  userRole,
  onSelectRole,
  onOpenSearch,
  onOpenVoice,
  onOpenNotifications,
  unreadCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreNavOpen, setMoreNavOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const roleLabels: Record<UserRole, string> = {
    citizen: t.citizen,
    researcher: t.researcher,
    government: t.government,
    planner: t.planner,
    gis_analyst: t.gis_analyst,
    innovator: t.innovator
  };

  const navPrimary = [
    { id: 'command_center' as ActiveModule, label: t.commandCenter, icon: Gauge },
    { id: 'dashboard' as ActiveModule, label: t.dashboard, icon: BarChart3 },
    { id: 'gis' as ActiveModule, label: t.gis, icon: Map },
    { id: 'scoreboard' as ActiveModule, label: t.scoreboard, icon: Layers },
    { id: 'catalog' as ActiveModule, label: t.catalog, icon: Database },
    { id: 'ai_assistant' as ActiveModule, label: t.aiAssistant, icon: Bot },
  ];

  const navSecondary = [
    { id: 'workspace' as ActiveModule, label: t.workspace, icon: Briefcase },
    { id: 'knowledge' as ActiveModule, label: t.knowledge, icon: Compass },
    { id: 'case_studies' as ActiveModule, label: t.caseStudies, icon: Compass },
    { id: 'collaboration' as ActiveModule, label: t.collaboration, icon: Users },
    { id: 'challenges' as ActiveModule, label: t.challenges, icon: Trophy },
    { id: 'observatory' as ActiveModule, label: t.observatory, icon: History },
    { id: 'provenance' as ActiveModule, label: t.provenance, icon: ShieldCheck },
    { id: 'knowledge_graph' as ActiveModule, label: t.knowledgeGraph, icon: Share2 },
    { id: 'policy_pipeline' as ActiveModule, label: t.policyPipeline, icon: GitBranch },
  ];

  const isSecondaryActive = navSecondary.some(n => n.id === activeModule);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-slate-100 select-none">
      {/* Top GovTech National Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/50 px-4 py-1 text-[11px] flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Smart India Hackathon 2026 Prototype</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            {t.simulatedDisclaimer}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline text-slate-400">WGS84 CORS Network RTK v4.2</span>
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-400">{t.roleLabel}</span>
            <select
              value={userRole}
              onChange={(e) => onSelectRole(e.target.value as UserRole)}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer text-[11px]"
            >
              <option value="government" className="bg-slate-900 text-slate-100">{t.government}</option>
              <option value="researcher" className="bg-slate-900 text-slate-100">{t.researcher}</option>
              <option value="planner" className="bg-slate-900 text-slate-100">{t.planner}</option>
              <option value="gis_analyst" className="bg-slate-900 text-slate-100">{t.gis_analyst}</option>
              <option value="citizen" className="bg-slate-900 text-slate-100">{t.citizen}</option>
              <option value="innovator" className="bg-slate-900 text-slate-100">{t.innovator}</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
            <Globe className="w-3 h-3 text-cyan-400" />
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as Language)}
              className="bg-transparent text-cyan-400 font-semibold focus:outline-none cursor-pointer text-[11px]"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-slate-900 text-slate-100">
                  {opt.native} ({opt.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onSelectModule('command_center')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:border-emerald-400 transition">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
              <span>{t.appTitle}</span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              {t.appSubtitle}
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Search Ctrl+K Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-850 rounded-lg border border-slate-800 hover:border-slate-700 transition"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{t.searchPlaceholder.slice(0, 30)}...</span>
            <span className="md:hidden">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded text-[10px] font-mono border border-slate-700">⌘K</kbd>
          </button>

          {/* Voice AI button */}
          <button
            onClick={onOpenVoice}
            title="Activate Voice AI Commands"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t.voiceAI}</span>
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            title={t.notifications}
            className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-bold text-[9px] rounded-full flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Module Navigation Tabs (Desktop) */}
      <nav className="hidden lg:block border-t border-slate-800/80 bg-slate-950/60 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {navPrimary.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition ${
                    isActive
                      ? 'border-emerald-400 text-emerald-300 bg-emerald-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* "More Modules" Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreNavOpen(!moreNavOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition ${
                  isSecondaryActive
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Extended Modules</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {moreNavOpen && (
                <div
                  onMouseLeave={() => setMoreNavOpen(false)}
                  className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 grid grid-cols-1 gap-1 z-50 animate-in fade-in duration-150"
                >
                  {navSecondary.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectModule(item.id);
                          setMoreNavOpen(false);
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <span>CORS RTK Latency: 42ms</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">184.2M Parcels Online</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 p-4 space-y-2 animate-in fade-in">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">Core Modules</div>
          <div className="grid grid-cols-2 gap-1.5">
            {navPrimary.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectModule(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 pt-2">Extended Modules</div>
          <div className="grid grid-cols-2 gap-1.5">
            {navSecondary.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectModule(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
