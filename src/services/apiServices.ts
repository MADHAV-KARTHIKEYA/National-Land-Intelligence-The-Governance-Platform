import { GoogleGenAI } from '@google/genai';
import {
  LandParcel,
  DatasetItem,
  ResearchDocument,
  CaseStudy,
  ResearchProject,
  InnovationChallenge,
  AIAnalysisResult,
  ScoreboardIndicator
} from '../types';
import {
  MOCK_PARCELS,
  MOCK_DATASETS,
  MOCK_DOCUMENTS,
  MOCK_CASE_STUDIES,
  MOCK_PROJECTS,
  MOCK_CHALLENGES,
  NATIONAL_STATS,
  MOCK_INDICATORS,
  MOCK_OBSERVATORY_DATA
} from '../data/mockData';

// Initialize Gemini Client if key exists in env
const apiKey = typeof process !== 'undefined' ? (process.env?.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY) : '';
const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const parcelService = {
  async getParcels(): Promise<LandParcel[]> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return [...MOCK_PARCELS];
  },

  async getParcelById(id: string): Promise<LandParcel | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_PARCELS.find((p) => p.id === id);
  },

  async analyzeParcelWithAI(parcel: LandParcel): Promise<AIAnalysisResult> {
    // If real Gemini API is available and configured
    if (aiClient) {
      try {
        const prompt = `You are the National Land Intelligence AI Analyst for India GovTech.
Analyze the following land parcel data and produce an objective, explainable analytical summary.
Parcel Data:
- ID: ${parcel.id}
- Survey Number: ${parcel.surveyNumber}
- Location: Village ${parcel.village}, Taluk ${parcel.taluk}, District ${parcel.district}, State ${parcel.state}
- Area: ${parcel.areaAcres} Acres
- Land Use: ${parcel.landUse}
- Ownership: ${parcel.ownershipType}
- Dispute Status: ${parcel.disputeStatus}
- Quality Score: ${parcel.qualityScore}%
- Anomaly Flag: ${parcel.anomalyFlag ? 'YES - ' + parcel.anomalyDescription : 'None'}

Please provide:
1. SUMMARY
2. EVIDENCE
3. DATA SOURCES
4. CONFIDENCE
5. LIMITATIONS
6. SUGGESTED NEXT STEPS
Respond in concise, professional GovTech tone.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const text = response.text || '';
        return {
          summary: text.slice(0, 300) + '...',
          evidence: `Multi-spectral satellite correlation and Survey of India CORS ground-truth RTK baseline for ${parcel.surveyNumber}.`,
          dataSources: [parcel.source, 'ISRO Bhuvan LULC 10m', 'State Sub-Registrar Database'],
          confidence: parcel.qualityScore,
          limitations: 'Demonstration analysis verified against spatial vector boundaries. Legal decree status requires verified digital court token.',
          suggestedNextSteps: [
            'Initiate drone orthomosaic boundary cross-verification',
            'Cross-check adjacent mutation notices for Sy ' + parcel.surveyNumber,
            'Verify Full Tank Level (FTL) buffer compliance'
          ],
          timestamp: new Date().toISOString()
        };
      } catch (err) {
        console.warn('Gemini API call fell back to local analytical engine:', err);
      }
    }

    // Deterministic High-Quality GovTech analytical generation
    await new Promise((resolve) => setTimeout(resolve, 350));
    const isRisky = parcel.riskScore > 50 || parcel.anomalyFlag;
    return {
      summary: isRisky
        ? `Analytical risk elevated (${parcel.riskScore}/100) due to ${parcel.disputeStatus.toLowerCase()} and spatial anomaly flags detected on Survey No. ${parcel.surveyNumber}. Boundary vector requires sub-registrar alignment.`
        : `Verified regular agricultural/cadastral status. Spatial boundary vector matches continuous CORS geodetic reference with high integrity (${parcel.qualityScore}%). No active litigation flags.`,
      evidence: parcel.anomalyFlag
        ? parcel.anomalyDescription || 'Vector geometry overlaps with gazetted ecological protection buffer.'
        : `Centimeter-level RTK GPS survey points verified. Consistent mutation timestamps recorded across Revenue and Registration portals.`,
      dataSources: [
        parcel.source,
        'Survey of India CORS Network',
        'National Cadastral Map Service v2'
      ],
      confidence: parcel.qualityScore,
      limitations: 'Prototype analytical evaluation based on simulated cadastre and satellite vector datasets (SIH 2026).',
      suggestedNextSteps: isRisky
        ? [
            'Issue field survey verification notice via Revenue Inspector mobile app',
            'Lock digital registry mutation until boundary overlap objection is reviewed',
            'Request drone LiDAR point cloud slice of lake catchment buffer'
          ]
        : [
            'Issue auto-mutation approval token to Sub-Registrar',
            'Generate QR-coded digital property card',
            'Archive cryptographic provenance hash on state ledger'
          ],
      timestamp: new Date().toISOString()
    };
  }
};

export const datasetService = {
  async getDatasets(): Promise<DatasetItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return [...MOCK_DATASETS];
  },

  async requestDatasetAccess(datasetId: string, userOrg: string, purpose: string) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      requestId: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      datasetId,
      userOrg,
      purpose,
      status: 'Approved for Research Sandbox',
      accessKey: `govtech_token_${Math.random().toString(36).substring(2, 10)}`,
      expiresAt: '2026-12-31'
    };
  }
};

export const documentService = {
  async getDocuments(): Promise<ResearchDocument[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return [...MOCK_DOCUMENTS];
  }
};

export const researchService = {
  async getProjects(): Promise<ResearchProject[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return [...MOCK_PROJECTS];
  },

  async createProject(project: Omit<ResearchProject, 'id' | 'updatedAt'>): Promise<ResearchProject> {
    const newProj: ResearchProject = {
      ...project,
      id: `PROJ-${Date.now().toString().slice(-4)}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    MOCK_PROJECTS.unshift(newProj);
    return newProj;
  }
};

export const caseStudyService = {
  async getCaseStudies(): Promise<CaseStudy[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return [...MOCK_CASE_STUDIES];
  }
};

export const challengeService = {
  async getChallenges(): Promise<InnovationChallenge[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return [...MOCK_CHALLENGES];
  },

  async submitIdea(challengeId: string, submission: { title: string; team: string; abstract: string; githubUrl: string }) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    const ch = MOCK_CHALLENGES.find((c) => c.id === challengeId);
    if (ch) ch.submissionsCount += 1;
    return {
      submissionId: `SUB-SIH-${Math.floor(1000 + Math.random() * 9000)}`,
      challengeId,
      submittedAt: new Date().toISOString(),
      status: 'Under Review'
    };
  }
};

export const analyticsService = {
  async getStats() {
    return { ...NATIONAL_STATS };
  },

  async getIndicators(): Promise<ScoreboardIndicator[]> {
    return [...MOCK_INDICATORS];
  },

  async getObservatoryByYear(year: number) {
    return MOCK_OBSERVATORY_DATA[year] || MOCK_OBSERVATORY_DATA[2026];
  }
};

export const aiService = {
  async queryAssistant(query: string, currentContext?: string): Promise<AIAnalysisResult> {
    if (aiClient) {
      try {
        const prompt = `You are "Land Intelligence AI", the official AI Research Assistant for the National Land Intelligence & Governance Platform (Smart India Hackathon 2026).
Respond to the user's research query adhering STRICTLY to this format:
SUMMARY: [Direct analytical answer]
EVIDENCE: [Empirical data, GIS trends, or verified legal framework points]
DATA SOURCES: [Name specific datasets like National Cadastral Geodatabase, ISRO LULC, NJDG, or DILRMP]
CONFIDENCE: [Prototype Analytical Confidence percentage between 75% and 98%]
LIMITATIONS: [State clearly: "Simulated research knowledge base for Smart India Hackathon 2026 demonstration."]
SUGGESTED NEXT STEPS: [3 actionable research, GIS, or policy steps]

User Query: "${query}"
Context: "${currentContext || 'National Cadastral & Land Governance'}"`;

        const resp = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        const raw = resp.text || '';
        return {
          summary: extractSection(raw, 'SUMMARY') || raw.slice(0, 250),
          evidence: extractSection(raw, 'EVIDENCE') || 'Derived from 184M mapped parcels and ISRO 10m LULC time-series indices.',
          dataSources: ['National Cadastral Geodatabase (CAD-NAT-2026)', 'ISRO Decadal LULC', 'SVAMITVA Drone Atlas'],
          confidence: 91,
          limitations: 'Demo response based on simulated knowledge and verified research papers (SIH 2026).',
          suggestedNextSteps: [
            'Correlate vector boundary anomalies with district court plaint numbers',
            'Cross-filter by agro-climatic zones in the Data Observatory',
            'Download open GeoJSON vector slice from Data Catalog'
          ],
          timestamp: new Date().toISOString()
        };
      } catch (e) {
        console.warn('Live AI unavailable, using intelligent GovTech synthesis:', e);
      }
    }

    // Context-aware simulated assistant
    await new Promise((r) => setTimeout(r, 400));
    const lower = query.toLowerCase();

    if (lower.includes('dispute') || lower.includes('litigation') || lower.includes('court')) {
      return {
        summary: 'Civil land litigation is primarily driven by boundary demarcation ambiguity (38%) and inheritance partitions (29%), with an average resolution timeline of 2.4 years in conventional courts.',
        evidence: 'Data linked from 680+ district courts in NJDG shows an 84% reduction in fresh plaint filings where drone-assisted SVAMITVA property cards with CORS RTK boundaries were gazetted.',
        dataSources: ['National Land Dispute & Title Litigation Registry', 'Survey of India CORS Network', 'eCourts NJDG Civil Index'],
        confidence: 89,
        limitations: 'Demo response based on simulated knowledge. Court decree records reflect prototype district revenue tribunals.',
        suggestedNextSteps: [
          'Filter the Governance Scoreboard by "Dispute Resolution" indicator',
          'Inspect Case Study CS-01: Dharani Next real-time deed-to-RoR locking',
          'Deploy boundary reconciliation module in Research Workspace'
        ],
        timestamp: new Date().toISOString()
      };
    }

    if (lower.includes('urban') || lower.includes('conversion') || lower.includes('agriculture') || lower.includes('expansion')) {
      return {
        summary: 'Peri-urban agricultural land conversion has accelerated at 4.2% annually along designated expressway growth corridors, with prime multi-crop alluvial soils experiencing the fastest conversion velocity.',
        evidence: 'Satellite spectral analysis indicates 45,200 non-agricultural growth polygons detected between 2021 and 2026, with 68% of farmers selling parcels while retaining roadside frontage.',
        dataSources: ['Peri-Urban Expansion Vector Stream (URB-PERI-EXP-AI)', 'ISRO Multi-Spectral LULC', 'DoLR DILRMP Cadastre'],
        confidence: 93,
        limitations: 'Demo response based on simulated knowledge. Satellite indices calibrated against sample districts in Telangana and Maharashtra.',
        suggestedNextSteps: [
          'Review the Evidence-to-Policy Pipeline stage on Farmland Conversion Moratorium vs. Brownfield incentives',
          'Open Data Observatory and scrub the Time Slider to inspect decadal shifts from 2018 to 2026',
          'Inspect Parcel SY-104/2B in the Interactive GIS viewer'
        ],
        timestamp: new Date().toISOString()
      };
    }

    return {
      summary: `Land Intelligence AI has synthesized national cadastral records, ISRO remote sensing classifications, and institutional case studies for your query: "${query}".`,
      evidence: 'Correlated across 184.2 million digitized parcels, 750+ geodetic CORS RTK reference stations, and verified 2026 cadastral modernization frameworks.',
      dataSources: ['National Cadastral Geodatabase', 'Survey of India CORS Baseline', 'DoLR DILRMP Portal'],
      confidence: 92,
      limitations: 'Demo response based on simulated knowledge. For official legal mutation certificates, contact the State Sub-Registrar.',
      suggestedNextSteps: [
        'Explore related datasets in the National Land Data Catalog',
        'Add this research query to your active Research Workspace',
        'Inspect the Knowledge Graph to trace relationships across datasets and policies'
      ],
      timestamp: new Date().toISOString()
    };
  }
};

function extractSection(text: string, title: string): string | null {
  const reg = new RegExp(`${title}[:\\s]+([\\s\\S]*?)(?=(SUMMARY|EVIDENCE|DATA SOURCES|CONFIDENCE|LIMITATIONS|SUGGESTED NEXT STEPS|$))`, 'i');
  const match = text.match(reg);
  return match ? match[1].trim() : null;
}
