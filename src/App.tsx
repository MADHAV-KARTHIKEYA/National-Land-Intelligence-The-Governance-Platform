import React, { useState, useEffect } from 'react';
import { ActiveModule, Language, UserRole, NotificationItem } from './types';
import { MOCK_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/common/Header';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AICommandCenter } from './components/command/AICommandCenter';
import { NationalGovernanceDashboard } from './components/dashboard/NationalGovernanceDashboard';
import { InteractiveGISMap } from './components/gis/InteractiveGISMap';
import { GovernanceScoreboard } from './components/scoreboard/GovernanceScoreboard';
import { KnowledgeRepository } from './components/knowledge/KnowledgeRepository';
import { DataCatalog } from './components/catalog/DataCatalog';
import { LandIntelligenceAI } from './components/ai/LandIntelligenceAI';
import { ResearchWorkspace } from './components/workspace/ResearchWorkspace';
import { CaseStudyExplorer } from './components/cases/CaseStudyExplorer';
import { CollaborationHub } from './components/collaboration/CollaborationHub';
import { InnovationChallengeHub } from './components/challenges/InnovationChallengeHub';
import { DataObservatory } from './components/observatory/DataObservatory';
import { ProvenanceEngine } from './components/provenance/ProvenanceEngine';
import { KnowledgeGraphViewer } from './components/graph/KnowledgeGraphViewer';
import { PolicyPipeline } from './components/policy/PolicyPipeline';

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('command_center');
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('government');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Modal states
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Deep-link context for sub-items
  const [targetedParcelId, setTargetedParcelId] = useState<string | undefined>(undefined);
  const [targetedDatasetId, setTargetedDatasetId] = useState<string | undefined>(undefined);
  const [targetedDocumentId, setTargetedDocumentId] = useState<string | undefined>(undefined);
  const [targetedCaseId, setTargetedCaseId] = useState<string | undefined>(undefined);
  const [targetedChallengeId, setTargetedChallengeId] = useState<string | undefined>(undefined);

  // Handle global search navigate
  const handleGlobalNavigate = (module: ActiveModule, itemId?: string) => {
    setActiveModule(module);
    if (module === 'gis' && itemId) setTargetedParcelId(itemId);
    if (module === 'catalog' && itemId) setTargetedDatasetId(itemId);
    if (module === 'knowledge' && itemId) setTargetedDocumentId(itemId);
    if (module === 'case_studies' && itemId) setTargetedCaseId(itemId);
    if (module === 'challenges' && itemId) setTargetedChallengeId(itemId);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Application Header */}
      <Header
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        language={language}
        onSelectLanguage={setLanguage}
        userRole={userRole}
        onSelectRole={setUserRole}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenVoice={() => setVoiceModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeModule === 'command_center' && (
          <AICommandCenter onNavigate={setActiveModule} userRole={userRole} />
        )}

        {activeModule === 'dashboard' && (
          <NationalGovernanceDashboard
            onNavigateToParcel={(id) => {
              setTargetedParcelId(id);
              setActiveModule('gis');
            }}
            onNavigateModule={setActiveModule}
          />
        )}

        {activeModule === 'gis' && (
          <InteractiveGISMap initialParcelId={targetedParcelId} />
        )}

        {activeModule === 'scoreboard' && <GovernanceScoreboard />}

        {activeModule === 'catalog' && (
          <DataCatalog initialDatasetId={targetedDatasetId} />
        )}

        {activeModule === 'knowledge' && (
          <KnowledgeRepository initialDocumentId={targetedDocumentId} />
        )}

        {activeModule === 'ai_assistant' && <LandIntelligenceAI />}

        {activeModule === 'workspace' && <ResearchWorkspace />}

        {activeModule === 'case_studies' && (
          <CaseStudyExplorer initialCaseId={targetedCaseId} />
        )}

        {activeModule === 'collaboration' && <CollaborationHub />}

        {activeModule === 'challenges' && (
          <InnovationChallengeHub initialChallengeId={targetedChallengeId} />
        )}

        {activeModule === 'observatory' && <DataObservatory />}

        {activeModule === 'provenance' && <ProvenanceEngine />}

        {activeModule === 'knowledge_graph' && <KnowledgeGraphViewer />}

        {activeModule === 'policy_pipeline' && <PolicyPipeline />}
      </main>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleGlobalNavigate}
      />

      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onNavigate={setActiveModule}
        onTriggerAI={(q) => {
          setActiveModule('ai_assistant');
        }}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onNavigate={setActiveModule}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400 font-semibold">National Land Intelligence & Governance Platform</span>
            <span>· Smart India Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Prototype / Simulated Data Active</span>
            <span>·</span>
            <span>WGS84 EPSG:4326 Datum</span>
            <span>·</span>
            <span>Survey of India CORS RTK v4.2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
