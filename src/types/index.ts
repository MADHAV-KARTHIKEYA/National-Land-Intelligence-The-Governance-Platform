export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'mr';

export type UserRole = 
  | 'citizen' 
  | 'researcher' 
  | 'government' 
  | 'planner' 
  | 'gis_analyst' 
  | 'innovator';

export type ActiveModule = 
  | 'command_center'
  | 'dashboard'
  | 'gis'
  | 'scoreboard'
  | 'knowledge'
  | 'catalog'
  | 'ai_assistant'
  | 'workspace'
  | 'case_studies'
  | 'collaboration'
  | 'challenges'
  | 'observatory'
  | 'provenance'
  | 'knowledge_graph'
  | 'policy_pipeline';

export interface LandParcel {
  id: string;
  surveyNumber: string;
  state: string;
  district: string;
  taluk: string;
  village: string;
  areaAcres: number;
  landUse: 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial' | 'Forest' | 'Government' | 'Water Body';
  ownershipType: 'Private' | 'Government' | 'Community' | 'Trust' | 'Disputed';
  disputeStatus: 'Clear' | 'Under Mutation Dispute' | 'Boundary Litigation' | 'Encroachment Suspected';
  qualityScore: number;
  riskScore: number;
  lastUpdated: string;
  source: string;
  coordinates: [number, number]; // lat, lng
  polygon: [number, number][]; // vertices relative to local map view
  anomalyFlag?: boolean;
  anomalyDescription?: string;
  valuationINR: string;
}

export interface GovernanceMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtext: string;
  category: 'parcels' | 'area' | 'disputes' | 'conversions' | 'quality';
}

export interface ScoreboardIndicator {
  id: string;
  title: string;
  category: 'Digitization' | 'Accuracy' | 'Transparency' | 'Dispute Resolution' | 'Provenance';
  score: number; // 0-100
  trend: 'improving' | 'stable' | 'declining';
  trendValue: string;
  level: 'National' | 'State' | 'District';
  region: string;
  supportingEvidence: string;
  dataSources: string[];
  confidence: number;
  lastUpdated: string;
  reasonForChange: string;
}

export interface DatasetItem {
  id: string;
  name: string;
  code: string;
  description: string;
  category: 'Cadastral' | 'Administrative Boundaries' | 'Land Use' | 'Agriculture' | 'Infrastructure' | 'Environment' | 'Urban Development' | 'Water Resources';
  provider: string;
  coverage: string;
  geographicLevel: 'National' | 'State' | 'District' | 'Village';
  temporalCoverage: string;
  format: 'GeoJSON' | 'Shapefile' | 'Cloud GeoTIFF' | 'REST API' | 'CSV / Parquet';
  updateFrequency: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Annual';
  license: string;
  qualityScore: number;
  completeness: number;
  consistency: number;
  provenanceCoverage: number;
  lastUpdated: string;
  recordsCount: string;
  apiStatus: 'Available' | 'Request Only' | 'Simulated Sandbox';
}

export interface ResearchDocument {
  id: string;
  title: string;
  description: string;
  category: 'Policy & Act' | 'Research Paper' | 'Technical Report' | 'Cadastral Standard' | 'Case Study' | 'Planning Guideline';
  author: string;
  organization: string;
  year: number;
  tags: string[];
  source: string;
  documentType: 'PDF' | 'Executive Brief' | 'Gazette Notification' | 'Working Paper' | 'Technical Report';
  provenance: string;
  relatedTopics: string[];
  citationsCount: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  state: string;
  category: 'Cadastral Modernization' | 'Urban Planning' | 'Rural Land Rights' | 'Dispute Resolution' | 'Forest Rights' | 'AI Anomaly Detection';
  problem: string;
  intervention: string;
  dataUsed: string[];
  method: string;
  outcome: string;
  lessonsLearned: string;
  evidence: string;
  source: string;
  year: number;
  impactMetrics: { label: string; value: string }[];
}

export interface ResearchProject {
  id: string;
  title: string;
  question: string;
  hypothesis: string;
  leadResearcher: string;
  status: 'In Progress' | 'Peer Review' | 'Completed' | 'Policy Draft';
  updatedAt: string;
  datasets: string[];
  documents: string[];
  savedParcels: string[];
  notes: string;
  findings: string[];
}

export interface InnovationChallenge {
  id: string;
  title: string;
  problemStatement: string;
  domain: 'AI & Satellite Imagery' | 'Blockchain Cadastre' | 'Dispute Analytics' | 'Climate & Forest Land' | 'Citizen Portal UX';
  organization: string;
  deadline: string;
  status: 'Open' | 'Upcoming' | 'Under Review' | 'Closed';
  prizePool: string;
  requiredSkills: string[];
  datasets: string[];
  submissionRequirements: string[];
  submissionsCount: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  role: string;
  avatar: string;
  topic: string;
  createdAt: string;
  repliesCount: number;
  upvotes: number;
  content: string;
  tags: string[];
  replies: {
    id: string;
    author: string;
    role: string;
    content: string;
    createdAt: string;
  }[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'Parcel' | 'Dataset' | 'Research Paper' | 'Policy' | 'Organization' | 'Program' | 'Land Use' | 'Case Study';
  details: string;
  metric?: string;
  x?: number;
  y?: number;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relationship: 'describes' | 'studies' | 'regulates' | 'publishes' | 'uses' | 'affects' | 'funds';
}

export interface PolicyPipelineStage {
  id: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'pending';
  summary: string;
  artifacts: string[];
  tradeoffs?: { option: string; benefits: string; risks: string; fiscalImpact: string }[];
}

export interface NotificationItem {
  id: string;
  type: 'alert' | 'update' | 'workspace' | 'challenge';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export interface AIAnalysisResult {
  summary: string;
  evidence: string;
  dataSources: string[];
  confidence: number;
  limitations: string;
  suggestedNextSteps: string[];
  timestamp: string;
}
