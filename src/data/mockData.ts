import {
  LandParcel,
  ScoreboardIndicator,
  DatasetItem,
  ResearchDocument,
  CaseStudy,
  ResearchProject,
  InnovationChallenge,
  DiscussionThread,
  KnowledgeGraphNode,
  KnowledgeGraphLink,
  PolicyPipelineStage,
  NotificationItem
} from '../types';

export const NATIONAL_STATS = {
  totalParcels: '184,290,412',
  totalMappedAreaKm2: '3,287,263',
  digitizedPercentage: 94.6,
  activeDisputes: '1,420,830',
  disputeResolutionRate: '+14.2%',
  avgMutationTimeDays: 11.4,
  landUseDistribution: [
    { label: 'Agricultural', percentage: 54.8, color: '#10b981', areaHa: '179.8M' },
    { label: 'Forest & Eco', percentage: 22.4, color: '#059669', areaHa: '71.4M' },
    { label: 'Residential', percentage: 8.7, color: '#3b82f6', areaHa: '28.5M' },
    { label: 'Commercial & Infra', percentage: 5.3, color: '#6366f1', areaHa: '17.3M' },
    { label: 'Industrial', percentage: 3.2, color: '#8b5cf6', areaHa: '10.5M' },
    { label: 'Government & Public', percentage: 4.1, color: '#f59e0b', areaHa: '13.4M' },
    { label: 'Water Bodies', percentage: 1.5, color: '#06b6d4', areaHa: '4.9M' },
  ],
  registrationTrends: [
    { year: '2020', count: 18.2, mutations: 14.1, disputesResolved: 2.1 },
    { year: '2021', count: 21.4, mutations: 17.5, disputesResolved: 2.9 },
    { year: '2022', count: 25.8, mutations: 21.2, disputesResolved: 3.8 },
    { year: '2023', count: 29.3, mutations: 25.4, disputesResolved: 4.6 },
    { year: '2024', count: 34.1, mutations: 30.1, disputesResolved: 5.4 },
    { year: '2025', count: 39.8, mutations: 36.2, disputesResolved: 6.9 },
    { year: '2026', count: 44.5, mutations: 41.8, disputesResolved: 8.2 },
  ],
  monthlyMutations: [
    { month: 'Jan', processed: 310, avgDays: 14.2 },
    { month: 'Feb', processed: 345, avgDays: 13.8 },
    { month: 'Mar', processed: 420, avgDays: 12.5 },
    { month: 'Apr', processed: 390, avgDays: 12.0 },
    { month: 'May', processed: 460, avgDays: 11.8 },
    { month: 'Jun', processed: 510, avgDays: 11.4 },
  ],
  disputeCategories: [
    { name: 'Boundary Demarcation', count: '542K', share: 38 },
    { name: 'Inheritance & Succession', count: '410K', share: 29 },
    { name: 'Encroachment / Public Land', count: '270K', share: 19 },
    { name: 'Title Fraud / Dual Registry', count: '142K', share: 10 },
    { name: 'Conversion Disputes', count: '56K', share: 4 },
  ],
};

export const HIERARCHY_TREE = [
  {
    id: 'telangana',
    name: 'Telangana',
    code: 'TS',
    parcels: '18.4M',
    digitization: '98.2%',
    districts: [
      {
        id: 'rangareddy',
        name: 'Ranga Reddy',
        parcels: '2.1M',
        taluks: [
          {
            id: 'rajendranagar',
            name: 'Rajendranagar',
            parcels: '420K',
            villages: [
              { id: 'v1', name: 'Narsingi', surveyPrefix: 'SY-104' },
              { id: 'v2', name: 'Gandipet', surveyPrefix: 'SY-208' },
              { id: 'v3', name: 'Puppalguda', surveyPrefix: 'SY-312' }
            ]
          },
          {
            id: 'serilingampally',
            name: 'Serilingampally',
            parcels: '510K',
            villages: [
              { id: 'v4', name: 'Gachibowli', surveyPrefix: 'SY-401' },
              { id: 'v5', name: 'Madhapur', surveyPrefix: 'SY-502' }
            ]
          }
        ]
      },
      {
        id: 'medchal',
        name: 'Medchal-Malkajgiri',
        parcels: '1.8M',
        taluks: [
          {
            id: 'ghatkesar',
            name: 'Ghatkesar',
            parcels: '310K',
            villages: [{ id: 'v6', name: 'Korremula', surveyPrefix: 'SY-610' }]
          }
        ]
      }
    ]
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    code: 'KA',
    parcels: '24.1M',
    digitization: '97.5%',
    districts: [
      {
        id: 'bengaluru_urban',
        name: 'Bengaluru Urban',
        parcels: '3.4M',
        taluks: [
          {
            id: 'bengaluru_north',
            name: 'Bengaluru North',
            parcels: '820K',
            villages: [{ id: 'v7', name: 'Yelahanka', surveyPrefix: 'SY-701' }]
          },
          {
            id: 'bengaluru_south',
            name: 'Bengaluru South',
            parcels: '910K',
            villages: [{ id: 'v8', name: 'Anekal', surveyPrefix: 'SY-805' }]
          }
        ]
      }
    ]
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    code: 'MH',
    parcels: '32.8M',
    digitization: '95.1%',
    districts: [
      {
        id: 'pune',
        name: 'Pune',
        parcels: '4.2M',
        taluks: [
          {
            id: 'haveli',
            name: 'Haveli',
            parcels: '740K',
            villages: [{ id: 'v9', name: 'Wagholi', surveyPrefix: 'SY-912' }]
          }
        ]
      }
    ]
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    code: 'TN',
    parcels: '28.4M',
    digitization: '96.4%',
    districts: [
      {
        id: 'kancheepuram',
        name: 'Kancheepuram',
        parcels: '1.9M',
        taluks: [
          {
            id: 'sriperumbudur',
            name: 'Sriperumbudur',
            parcels: '380K',
            villages: [{ id: 'v10', name: 'Irungattukottai', surveyPrefix: 'SY-1011' }]
          }
        ]
      }
    ]
  },
  {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh',
    code: 'UP',
    parcels: '46.2M',
    digitization: '91.8%',
    districts: [
      {
        id: 'varanasi',
        name: 'Varanasi',
        parcels: '2.4M',
        taluks: [
          {
            id: 'pindra',
            name: 'Pindra',
            parcels: '450K',
            villages: [{ id: 'v11', name: 'Karkhiyaon', surveyPrefix: 'SY-1120' }]
          }
        ]
      }
    ]
  }
];

export const MOCK_PARCELS: LandParcel[] = [
  {
    id: 'PCL-TS-RR-001',
    surveyNumber: 'SY-104/1A',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Rajendranagar',
    village: 'Narsingi',
    areaAcres: 4.82,
    landUse: 'Agricultural',
    ownershipType: 'Private',
    disputeStatus: 'Clear',
    qualityScore: 96,
    riskScore: 12,
    lastUpdated: '2026-03-12',
    source: 'Dharani Land Records v4.2 / Survey of India CORS',
    coordinates: [17.385, 78.364],
    polygon: [
      [17.384, 78.362],
      [17.387, 78.363],
      [17.388, 78.367],
      [17.383, 78.366]
    ],
    valuationINR: '₹ 14.2 Crore',
    anomalyFlag: false,
    anomalyDescription: 'None. Coordinates match drone cadastral orthomosaic perfectly.'
  },
  {
    id: 'PCL-TS-RR-002',
    surveyNumber: 'SY-104/2B',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Rajendranagar',
    village: 'Narsingi',
    areaAcres: 12.14,
    landUse: 'Government',
    ownershipType: 'Government',
    disputeStatus: 'Encroachment Suspected',
    qualityScore: 84,
    riskScore: 78,
    lastUpdated: '2026-03-24',
    source: 'State Revenue Department & Sentinel-2 Change Detection',
    coordinates: [17.389, 78.371],
    polygon: [
      [17.387, 78.368],
      [17.392, 78.370],
      [17.391, 78.375],
      [17.386, 78.373]
    ],
    valuationINR: '₹ 48.5 Crore',
    anomalyFlag: true,
    anomalyDescription: 'AI Detection: New unauthorized perimeter boundary detected via 0.5m satellite feed within lake buffer zone.'
  },
  {
    id: 'PCL-TS-RR-003',
    surveyNumber: 'SY-208/4',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Rajendranagar',
    village: 'Gandipet',
    areaAcres: 2.30,
    landUse: 'Residential',
    ownershipType: 'Private',
    disputeStatus: 'Under Mutation Dispute',
    qualityScore: 78,
    riskScore: 64,
    lastUpdated: '2026-02-18',
    source: 'Sub-Registrar Office, Rajendranagar',
    coordinates: [17.398, 78.349],
    polygon: [
      [17.396, 78.347],
      [17.400, 78.348],
      [17.399, 78.352],
      [17.395, 78.350]
    ],
    valuationINR: '₹ 9.1 Crore',
    anomalyFlag: true,
    anomalyDescription: 'Disputed partition deed overlapping with Sy 208/5. Mutation stayed by High Court.'
  },
  {
    id: 'PCL-TS-RR-004',
    surveyNumber: 'SY-312/1C',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Rajendranagar',
    village: 'Puppalguda',
    areaAcres: 6.75,
    landUse: 'Commercial',
    ownershipType: 'Private',
    disputeStatus: 'Clear',
    qualityScore: 98,
    riskScore: 8,
    lastUpdated: '2026-03-28',
    source: 'National Cadastral Map Service / High Precision CORS RTK',
    coordinates: [17.405, 78.378],
    polygon: [
      [17.402, 78.375],
      [17.408, 78.377],
      [17.407, 78.382],
      [17.401, 78.380]
    ],
    valuationINR: '₹ 67.5 Crore',
    anomalyFlag: false,
    anomalyDescription: 'High precision boundary verified with geotagged boundary stones.'
  },
  {
    id: 'PCL-TS-RR-005',
    surveyNumber: 'SY-401/1',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Serilingampally',
    village: 'Gachibowli',
    areaAcres: 18.50,
    landUse: 'Industrial',
    ownershipType: 'Government',
    disputeStatus: 'Clear',
    qualityScore: 94,
    riskScore: 15,
    lastUpdated: '2026-01-30',
    source: 'TSIIC & State GIS Portal',
    coordinates: [17.442, 78.356],
    polygon: [
      [17.438, 78.351],
      [17.445, 78.353],
      [17.444, 78.361],
      [17.437, 78.359]
    ],
    valuationINR: '₹ 185.0 Crore',
    anomalyFlag: false,
    anomalyDescription: 'State IT Park Zone. Digitized with geo-referenced master plan.'
  },
  {
    id: 'PCL-TS-RR-006',
    surveyNumber: 'SY-502/7',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Serilingampally',
    village: 'Madhapur',
    areaAcres: 3.10,
    landUse: 'Commercial',
    ownershipType: 'Private',
    disputeStatus: 'Boundary Litigation',
    qualityScore: 82,
    riskScore: 71,
    lastUpdated: '2026-02-14',
    source: 'District Civil Court / Revenue Record',
    coordinates: [17.451, 78.384],
    polygon: [
      [17.448, 78.381],
      [17.453, 78.383],
      [17.452, 78.388],
      [17.447, 78.386]
    ],
    valuationINR: '₹ 42.0 Crore',
    anomalyFlag: true,
    anomalyDescription: '0.12 acre boundary overlap with adjacent road widening corridor.'
  },
  {
    id: 'PCL-TS-RR-007',
    surveyNumber: 'SY-208/8A',
    state: 'Telangana',
    district: 'Ranga Reddy',
    taluk: 'Rajendranagar',
    village: 'Gandipet',
    areaAcres: 14.80,
    landUse: 'Water Body',
    ownershipType: 'Government',
    disputeStatus: 'Clear',
    qualityScore: 99,
    riskScore: 5,
    lastUpdated: '2026-03-15',
    source: 'National Remote Sensing Centre (NRSC) / HMDA Catchment Basin',
    coordinates: [17.391, 78.341],
    polygon: [
      [17.387, 78.337],
      [17.395, 78.339],
      [17.394, 78.346],
      [17.386, 78.344]
    ],
    valuationINR: 'Public Ecological Asset',
    anomalyFlag: false,
    anomalyDescription: 'Full FTL (Full Tank Level) demarcation protected under HMDA Lake Protection guidelines.'
  }
];

export const MOCK_INDICATORS: ScoreboardIndicator[] = [
  {
    id: 'IND-01',
    title: 'Cadastral Digitization & Vectorization Coverage',
    category: 'Digitization',
    score: 94.6,
    trend: 'improving',
    trendValue: '+3.8% YoY',
    level: 'National',
    region: 'All India',
    supportingEvidence: 'Validated against 580K villages covered under SVAMITVA drone surveys & DILRMP.',
    dataSources: ['Survey of India', 'Ministry of Panchayati Raj', 'DoLR DILRMP'],
    confidence: 96,
    lastUpdated: '2026-03-25',
    reasonForChange: 'Accelerated drone flight completion across hilly and tribal districts in UP, MP, and Odisha.'
  },
  {
    id: 'IND-02',
    title: 'Spatial Boundary Accuracy & Ground-Truthing',
    category: 'Accuracy',
    score: 89.2,
    trend: 'improving',
    trendValue: '+5.1% YoY',
    level: 'National',
    region: 'All India',
    supportingEvidence: 'Differential GNSS baseline networks expanded to 750+ continuous operating reference stations (CORS).',
    dataSources: ['CORS Network Survey of India', 'State Cadastral Survey Bureaus'],
    confidence: 91,
    lastUpdated: '2026-03-20',
    reasonForChange: 'Transition from legacy chain surveys to centimeter-level RTK GPS ground truth points.'
  },
  {
    id: 'IND-03',
    title: 'Mutation Lifecycle Transparency & Velocity',
    category: 'Transparency',
    score: 91.8,
    trend: 'improving',
    trendValue: '-2.4 days avg cycle',
    level: 'National',
    region: 'All India',
    supportingEvidence: 'Automated integration between Registration Offices and Revenue records in 26 states.',
    dataSources: ['National Generic Document Registration System (NGDRS)', 'State Portals'],
    confidence: 94,
    lastUpdated: '2026-03-22',
    reasonForChange: 'API handshake between Deed Registration and RoR (Record of Rights) auto-initiating mutation notice.'
  },
  {
    id: 'IND-04',
    title: 'Dispute Information Accessibility & Demarcation',
    category: 'Dispute Resolution',
    score: 78.4,
    trend: 'stable',
    trendValue: '+1.2% YoY',
    level: 'National',
    region: 'All India',
    supportingEvidence: 'Court litigation flags integrated in cadastral viewer for 68% of district revenue tribunals.',
    dataSources: ['eCourts National Judicial Data Grid (NJDG)', 'State Land Revenue Boards'],
    confidence: 85,
    lastUpdated: '2026-03-10',
    reasonForChange: 'District court record linkage growing steadily; pending unification of revenue court decree logs.'
  },
  {
    id: 'IND-05',
    title: 'Data Provenance & Cryptographic Audit Trails',
    category: 'Provenance',
    score: 86.5,
    trend: 'improving',
    trendValue: '+8.4% YoY',
    level: 'National',
    region: 'All India',
    supportingEvidence: 'Immutable ledger hashing implemented on boundary changes and survey certifications.',
    dataSources: ['National Land Data Architecture Framework', 'NIC GovCloud Ledger'],
    confidence: 92,
    lastUpdated: '2026-03-27',
    reasonForChange: 'Rollout of W3C PROV-O ontology compliance and SHA-256 state transaction hashing.'
  },
  {
    id: 'IND-06',
    title: 'Urban Expansion & Farmland Conversion Oversight',
    category: 'Accuracy',
    score: 82.1,
    trend: 'improving',
    trendValue: '+4.0% YoY',
    level: 'State',
    region: 'Telangana',
    supportingEvidence: 'Satellite AI change detection flagged 1,240 illegal conversions before registry transfer.',
    dataSources: ['NRSC Bhuvan', 'Telangana Remote Sensing Applications Centre (TRAC)'],
    confidence: 88,
    lastUpdated: '2026-03-18',
    reasonForChange: 'Bi-weekly high-resolution multispectral comparisons across peri-urban Ranga Reddy & Medchal.'
  }
];

export const MOCK_DATASETS: DatasetItem[] = [
  {
    id: 'DS-IND-CAD-01',
    name: 'National Cadastral Parcel Geodatabase (High Precision)',
    code: 'CAD-NAT-2026-V2',
    description: 'Vector parcel polygons with standardized survey numbers, administrative codes, and validated area measurements across 28 states.',
    category: 'Cadastral',
    provider: 'Survey of India & Department of Land Resources',
    coverage: 'National (94.6% of mapped agricultural & rural habitations)',
    geographicLevel: 'Village',
    temporalCoverage: '2020 – 2026',
    format: 'GeoJSON',
    updateFrequency: 'Daily',
    license: 'Government Open Data License (Simulated Sandbox)',
    qualityScore: 94,
    completeness: 96,
    consistency: 92,
    provenanceCoverage: 98,
    lastUpdated: '2026-03-29',
    recordsCount: '184.2M Parcels',
    apiStatus: 'Available'
  },
  {
    id: 'DS-IND-LULC-02',
    name: 'Decadal Multi-Spectral Land Use & Land Cover (10m Resolution)',
    code: 'LULC-ISRO-10M',
    description: 'Sentinel-2 & Resourcesat calibrated classification identifying agriculture, wetlands, barren land, built-up surfaces, and dense forest canopy.',
    category: 'Land Use',
    provider: 'National Remote Sensing Centre (ISRO)',
    coverage: 'All India Coastal, Plains & Himalayan Basins',
    geographicLevel: 'National',
    temporalCoverage: '2016 – 2026',
    format: 'Cloud GeoTIFF',
    updateFrequency: 'Monthly',
    license: 'Research & Non-Commercial Gov License',
    qualityScore: 97,
    completeness: 99,
    consistency: 95,
    provenanceCoverage: 100,
    lastUpdated: '2026-03-15',
    recordsCount: '3.28M km²',
    apiStatus: 'Available'
  },
  {
    id: 'DS-IND-DISP-03',
    name: 'National Land Dispute & Title Litigation Registry',
    code: 'DISP-NJDG-CIVIL',
    description: 'Geocoded revenue court case filings, stay orders, mutation objections, and inheritance disputes linked to cadastral survey numbers.',
    category: 'Cadastral',
    provider: 'National Judicial Data Grid & State Revenue Boards',
    coverage: '680+ Districts',
    geographicLevel: 'District',
    temporalCoverage: '2018 – 2026',
    format: 'REST API',
    updateFrequency: 'Weekly',
    license: 'Restricted GovTech Access',
    qualityScore: 86,
    completeness: 88,
    consistency: 84,
    provenanceCoverage: 90,
    lastUpdated: '2026-03-26',
    recordsCount: '1.42M Active Matters',
    apiStatus: 'Request Only'
  },
  {
    id: 'DS-IND-URB-04',
    name: 'Peri-Urban Expansion & Farmland Conversion Vector Stream',
    code: 'URB-PERI-EXP-AI',
    description: 'AI-inferred impervious surface expansion, brick-kiln detection, and agricultural-to-commercial conversion vectors in Tier 1 & Tier 2 agglomerations.',
    category: 'Urban Development',
    provider: 'National Institute of Urban Affairs (NIUA) & AI Labs',
    coverage: '120 Metros & Rapid Growth Corridors',
    geographicLevel: 'Village',
    temporalCoverage: '2021 – 2026',
    format: 'GeoJSON',
    updateFrequency: 'Weekly',
    license: 'Open Access Research (Simulated)',
    qualityScore: 91,
    completeness: 93,
    consistency: 89,
    provenanceCoverage: 94,
    lastUpdated: '2026-03-24',
    recordsCount: '45,200 Growth Polygons',
    apiStatus: 'Available'
  },
  {
    id: 'DS-IND-WAT-05',
    name: 'National Water Bodies & Catchment Buffer Zone Index',
    code: 'WAT-FTL-CATCH-01',
    description: 'Full Tank Level (FTL) polygons, river riparian boundaries, and wetland protection zones with encroachment vulnerability indexes.',
    category: 'Water Resources',
    provider: 'Central Water Commission & State Irrigation Boards',
    coverage: 'Peninsular & Gangetic Basins',
    geographicLevel: 'Village',
    temporalCoverage: '2022 – 2026',
    format: 'Shapefile',
    updateFrequency: 'Monthly',
    license: 'Open Gov Data',
    qualityScore: 95,
    completeness: 94,
    consistency: 96,
    provenanceCoverage: 97,
    lastUpdated: '2026-03-10',
    recordsCount: '240,000 Water Bodies',
    apiStatus: 'Available'
  }
];

export const MOCK_DOCUMENTS: ResearchDocument[] = [
  {
    id: 'DOC-2026-01',
    title: 'National Land Governance & Digital Cadastre Framework 2026–2030',
    description: 'Official whitepaper proposing unified spatial standards for cross-state title registration, drone CORS integration, and AI anomaly prevention.',
    category: 'Policy & Act',
    author: 'Committee on Digital Land Infrastructure',
    organization: 'Ministry of Rural Development & DoLR',
    year: 2026,
    tags: ['Cadastre', 'AI Policy', 'DILRMP', 'SVAMITVA', 'Title Insurance'],
    source: 'Gov of India Gazette Vol. 48',
    documentType: 'PDF',
    provenance: 'Drafted by National Taskforce with inter-ministerial consensus.',
    relatedTopics: ['Spatial Accuracy', 'Mutation Speed', 'Dispute Mitigation'],
    citationsCount: 142
  },
  {
    id: 'DOC-2025-02',
    title: 'Evaluating Machine Learning Detection of Peri-Urban Farmland Encroachments',
    description: 'Comprehensive research paper analyzing multi-spectral index changes and edge-detection neural models across Hyderabad and Pune development corridors.',
    category: 'Research Paper',
    author: 'Prof. K. Venkatesh & Dr. S. Mukherjee',
    organization: 'Indian Institute of Science (IISc) & IIT Bombay',
    year: 2025,
    tags: ['Machine Learning', 'Satellite Imagery', 'Land Conversion', 'GIS'],
    source: 'Journal of Indian Remote Sensing & Land Economics',
    documentType: 'PDF',
    provenance: 'Peer-reviewed academic study with 50,000 ground-truth GPS survey points.',
    relatedTopics: ['AI Land Research', 'Peri-urban Growth', 'Ground Truthing'],
    citationsCount: 89
  },
  {
    id: 'DOC-2025-03',
    title: 'Operational Guidelines for High-Precision CORS RTK Cadastral Surveys',
    description: 'Technical standard detailing baseline distances, epoch collection durations, coordinate transformation to WGS84, and cadastral stone tagging.',
    category: 'Cadastral Standard',
    author: 'Surveyor General Office',
    organization: 'Survey of India',
    year: 2025,
    tags: ['CORS', 'RTK GPS', 'Survey Standards', 'Geodetic Baseline'],
    source: 'Technical Circular Series 109',
    documentType: 'Technical Report',
    provenance: 'Survey of India Geodetic & Research Branch.',
    relatedTopics: ['Spatial Accuracy', 'Survey Numbering', 'Boundary Stones'],
    citationsCount: 215
  },
  {
    id: 'DOC-2024-04',
    title: 'The Economic Impact of Automated Land Mutation: Evidence from 5 States',
    description: 'Empirical assessment showing a 72% reduction in litigation costs and 18-day average reduction in farmer loan approvals following auto-mutation.',
    category: 'Case Study',
    author: 'Land Policy & Economics Group',
    organization: 'NITI Aayog & World Bank Policy Review',
    year: 2024,
    tags: ['Rural Credit', 'Mutation Speed', 'Economic Growth', 'GovTech'],
    source: 'NITI Aayog Discussion Paper #44',
    documentType: 'Executive Brief',
    provenance: 'Rigorous quasi-experimental econometric evaluation across 12,000 households.',
    relatedTopics: ['Financial Inclusion', 'Farmer Security', 'Dispute Resolution'],
    citationsCount: 310
  }
];

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'CS-01',
    title: 'Automated Deed-to-RoR Mutation Pipeline in Telangana (Dharani Next)',
    location: 'Ranga Reddy & Medchal Districts',
    state: 'Telangana',
    category: 'Cadastral Modernization',
    problem: 'Manual mutation delays took 90 to 180 days, fostering intermediary bribery and frequent boundary overlaps between agricultural sub-divisions.',
    intervention: 'Engineered an API pipeline instantly syncing biometric deed registration with vector cadastral GIS, locking disputed sub-divisions in real time.',
    dataUsed: ['Dharani Sub-Registrar Database', 'DoLR Cadastral Shapefiles', 'CORS RTK Survey Points'],
    method: 'Real-time transactional locking with cryptographic hash receipts given immediately to buyers and sellers.',
    outcome: 'Average mutation processing time dropped from 110 days to 12 minutes for undisputed parcels. Citizen satisfaction surpassed 93%.',
    lessonsLearned: 'Decoupling revenue court appeals from plain registration prevented bottlenecking uncontested agricultural family transfers.',
    evidence: 'Over 4.8 million undisputed mutations executed without paper file movement.',
    source: 'Telangana State Technology Services (TSTS) Evaluation 2025',
    year: 2025,
    impactMetrics: [
      { label: 'Avg Mutation Time', value: '12 Mins' },
      { label: 'Litigation Reduction', value: '-64%' },
      { label: 'Parcels Covered', value: '18.4M' }
    ]
  },
  {
    id: 'CS-02',
    title: 'Drone Cadastral Mapping of Abadi Village Habitations (Bhoomi 3.0)',
    location: 'Mandya & Mysuru Districts',
    state: 'Karnataka',
    category: 'Rural Land Rights',
    problem: 'Generations of rural families in inhabited village cores (Abadi) held no formalized spatial property cards, preventing housing loans.',
    intervention: 'Deployed high-resolution drone flights at 5cm GSD combined with participatory ground validation involving village elders.',
    dataUsed: ['SVAMITVA Orthorectified Tiles', 'Panchayat Habitation Registers', 'Total Station Surveys'],
    method: 'Orthomosaics projected in public panchayat halls for on-spot objection resolution before final gazette notification.',
    outcome: 'Issued 840,000 unambiguous property cards with QR-coded boundaries, unlocking ₹2,400 Crore in institutional bank credit.',
    lessonsLearned: 'Community ground-truthing in the open village square resolves boundary squabbles faster than courtroom litigation.',
    evidence: 'Survey of India certified 99.1% boundary agreement rate post-objection period.',
    source: 'Karnataka Revenue Department & Panchayati Raj Report',
    year: 2024,
    impactMetrics: [
      { label: 'Property Cards', value: '840K' },
      { label: 'Credit Unlocked', value: '₹2,400 Cr' },
      { label: 'Dispute Settlement', value: '98.2%' }
    ]
  },
  {
    id: 'CS-03',
    title: 'AI Satellite Surveillance for Lake Catchment & Peri-Urban Protection',
    location: 'Outer Ring Road Growth Corridors, Pune',
    state: 'Maharashtra',
    category: 'AI Anomaly Detection',
    problem: 'Unauthorized landfilling and structural encroachment along natural drainage basins caused seasonal flash-flooding in industrial nodes.',
    intervention: 'Configured automated bi-weekly change detection comparing high-resolution satellite imagery against gazetted ecological buffer zones.',
    dataUsed: ['Sentinel-2', 'PlanetScope 3m', 'PMRDA Master Plan vector layers'],
    method: 'Convolutional neural network flagged abnormal vegetative loss and material dumping within 50 meters of watercourses.',
    outcome: 'Identified 312 illegal landfilling operations in early stages, recovering 480 acres of protected wetlands prior to unauthorized construction.',
    lessonsLearned: 'Early satellite detection prevents expensive post-construction demolitions and socio-political friction.',
    evidence: 'PMRDA Enforcement wing verified 94.2% precision on AI flagged anomaly coordinates.',
    source: 'Pune Metropolitan Region Development Authority Annual Review',
    year: 2025,
    impactMetrics: [
      { label: 'Wetlands Protected', value: '480 Acres' },
      { label: 'AI Detection Precision', value: '94.2%' },
      { label: 'Cost Avoided', value: '₹340 Cr' }
    ]
  }
];

export const MOCK_PROJECTS: ResearchProject[] = [
  {
    id: 'PROJ-2026-01',
    title: 'Peri-Urban Agrarian Transition & Food Security Risks',
    question: 'How does rapid cadastral conversion of fertile multi-crop farmland into industrial logistics parks impact regional vegetable supply in Deccan cities?',
    hypothesis: 'Subsidized industrial highway corridors inadvertently consume Grade-A alluvial soil parcels faster than notified brownfield sites.',
    leadResearcher: 'Dr. Ananya Sen, Senior Fellow (Land & Food Policy)',
    status: 'In Progress',
    updatedAt: '2026-03-29',
    datasets: ['DS-IND-CAD-01', 'DS-IND-LULC-02', 'DS-IND-URB-04'],
    documents: ['DOC-2025-02', 'DOC-2024-04'],
    savedParcels: ['PCL-TS-RR-001', 'PCL-TS-RR-002'],
    notes: 'Satellite spectral indices indicate 14.8% reduction in double-cropped acreage along NH-44 radius. Need to correlate with APMC market arrival volumes.',
    findings: [
      'Conversion rates peaked within 3 km of expressway interchanges.',
      'Smallholder farmers sold 68% of parcel areas while retaining residential perimeter strips.',
      'Groundwater table dropped 18 meters post industrial conversion.'
    ]
  },
  {
    id: 'PROJ-2026-02',
    title: 'Impact of Drone Cadastre on Rural Collateralized Micro-Loans',
    question: 'Does the possession of a high-precision GIS property card increase formal banking penetration for women-headed rural households?',
    hypothesis: 'Formalized spatial ownership certificates reduce bank collateral processing costs by at least 40% in agricultural communities.',
    leadResearcher: 'Rakesh Verma, Institute of Economic Growth',
    status: 'Policy Draft',
    updatedAt: '2026-03-26',
    datasets: ['DS-IND-CAD-01', 'DS-IND-DISP-03'],
    documents: ['DOC-2026-01', 'DOC-2024-04'],
    savedParcels: ['PCL-TS-RR-003'],
    notes: 'Survey conducted across 42 villages in Karnataka and UP. Women applicants who possessed dual-name property cards experienced zero loan rejection due to boundary disputes.',
    findings: [
      'Loan turnaround time reduced from 42 days to 9 days.',
      'Informal moneylender interest rates decreased by 12% in villages with 100% drone cards.',
      'Zero reported title disputes reached civil court for drone-surveyed habitations.'
    ]
  }
];

export const MOCK_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'CHALLENGE-SIH-01',
    title: 'Real-time Satellite AI for Cadastral Encroachment Alerting',
    problemStatement: 'Develop an automated computer vision model that ingests multi-spectral satellite imagery and compares building footings against vector cadastral boundaries to issue early red-flag warnings within 48 hours of foundation work.',
    domain: 'AI & Satellite Imagery',
    organization: 'Ministry of Panchayati Raj & ISRO (SIH 2026)',
    deadline: '2026-05-15',
    status: 'Open',
    prizePool: '₹ 15,00,000 + GovTech Incubation',
    requiredSkills: ['Computer Vision', 'PyTorch / TensorFlow', 'GeoTIFF / GDAL', 'FastAPI'],
    datasets: ['DS-IND-CAD-01', 'DS-IND-LULC-02', 'DS-IND-URB-04'],
    submissionRequirements: ['Working Model Code', 'Architecture Whitepaper', 'Demonstration Video on 100 Test Parcels'],
    submissionsCount: 48
  },
  {
    id: 'CHALLENGE-SIH-02',
    title: 'Cryptographic Land Record Provenance & Mutation Engine',
    problemStatement: 'Architect a verifiable, tamper-evident data provenance system that logs every survey change, boundary adjustment, and registry transaction without slowing down high-volume state revenue portals.',
    domain: 'Blockchain Cadastre',
    organization: 'Department of Land Resources & NIC',
    deadline: '2026-06-01',
    status: 'Open',
    prizePool: '₹ 10,00,000 + Pilot Deployment',
    requiredSkills: ['Distributed Ledgers / Merkle Trees', 'W3C PROV-O', 'TypeScript', 'PostgreSQL GIS'],
    datasets: ['DS-IND-CAD-01', 'DS-IND-DISP-03'],
    submissionRequirements: ['Provenance Verification Tool', 'Smart Contract / Ledger Audit Proof', 'Performance Benchmark Report'],
    submissionsCount: 32
  },
  {
    id: 'CHALLENGE-SIH-03',
    title: 'Predictive Civil Court Land Dispute Analytics & Amicable Settlement AI',
    problemStatement: 'Build a natural language analytics system that parses vernacular court plaints and revenue records to estimate litigation duration and generate equitable mediation terms for family partition disputes.',
    domain: 'Dispute Analytics',
    organization: 'Department of Justice & National Law University',
    deadline: '2026-04-30',
    status: 'Under Review',
    prizePool: '₹ 8,00,000',
    requiredSkills: ['Indic NLP', 'LLM Fine-Tuning', 'Legal Tech', 'Data Visualizations'],
    datasets: ['DS-IND-DISP-03', 'DS-IND-CAD-01'],
    submissionRequirements: ['NLP Pipeline', 'Mediation Recommendation Engine', 'Accuracy Benchmarks on Vernacular Texts'],
    submissionsCount: 71
  }
];

export const MOCK_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'TH-01',
    title: 'Standardizing CORS coordinate transforms between SOI 2026 and legacy Everest 1830 grids',
    author: 'Sunil Chaterjee',
    role: 'Principal GIS Geodesist',
    avatar: 'SC',
    topic: 'Cadastral Standards',
    createdAt: '2 hours ago',
    repliesCount: 8,
    upvotes: 27,
    content: 'When transforming legacy village revenue maps (drawn under local Cassini or Everest projections) to WGS84 UTM zones, we frequently observe a 1.2m to 2.8m rotational warp along village fringes. How are teams handling the 7-parameter Bursa-Wolf calibration?',
    tags: ['Geodesy', 'CORS', 'Cadastral Mapping', 'WGS84'],
    replies: [
      {
        id: 'R-01',
        author: 'Dr. Meera Nambiar',
        role: 'Geomatics Researcher, IIT Madras',
        content: 'We found that using a localized affine transformation grid per taluk instead of a single statewide polynomial eliminates 90% of fringe rotational shear.',
        createdAt: '1 hour ago'
      },
      {
        id: 'R-02',
        author: 'Arun K., Survey of India',
        role: 'CORS Technical Lead',
        content: 'Check the updated 2026 SOI Geodetic Transformation Utility published under Circular 109. It provides sub-centimeter correction rasters.',
        createdAt: '30 mins ago'
      }
    ]
  },
  {
    id: 'TH-02',
    title: 'Public data anonymization when publishing High-Precision Village Cadastres',
    author: 'Pooja Hegde',
    role: 'GovTech Policy Researcher',
    avatar: 'PH',
    topic: 'Data Governance & Privacy',
    createdAt: '1 day ago',
    repliesCount: 14,
    upvotes: 42,
    content: 'Under the Digital Personal Data Protection Act (DPDPA), should individual farmer Aadhaar-linked ownership hashes be separated from the public geometry layer while still allowing title verification?',
    tags: ['Privacy', 'DPDPA', 'Open Data', 'Governance'],
    replies: [
      {
        id: 'R-03',
        author: 'Vikas Rao',
        role: 'State Revenue Legal Advisor',
        content: 'Yes! The recommended architecture uses zero-knowledge verification tokens where title authenticity is proven without exposing personal identifiers on open maps.',
        createdAt: '18 hours ago'
      }
    ]
  }
];

export const MOCK_OBSERVATORY_DATA: Record<number, {
  year: number;
  agriculturalPct: number;
  urbanBuiltPct: number;
  forestPct: number;
  disputeResolutionSpeedDays: number;
  anomaliesDetected: number;
  digitizedParcelsMillion: number;
  summary: string;
}> = {
  2018: {
    year: 2018,
    agriculturalPct: 58.4,
    urbanBuiltPct: 5.6,
    forestPct: 21.8,
    disputeResolutionSpeedDays: 140,
    anomaliesDetected: 1240,
    digitizedParcelsMillion: 42.1,
    summary: 'Initial DILRMP scanning phase. Heavy reliance on manual paper records and slow revenue court dispute resolutions.'
  },
  2019: {
    year: 2019,
    agriculturalPct: 57.8,
    urbanBuiltPct: 6.2,
    forestPct: 21.9,
    disputeResolutionSpeedDays: 115,
    anomaliesDetected: 2150,
    digitizedParcelsMillion: 61.4,
    summary: 'Introduction of digital sub-registrar integration in pilot southern states.'
  },
  2020: {
    year: 2020,
    agriculturalPct: 57.1,
    urbanBuiltPct: 6.9,
    forestPct: 22.0,
    disputeResolutionSpeedDays: 95,
    anomaliesDetected: 3410,
    digitizedParcelsMillion: 84.7,
    summary: 'SVAMITVA drone survey scheme launched nationally for Abadi residential areas.'
  },
  2021: {
    year: 2021,
    agriculturalPct: 56.5,
    urbanBuiltPct: 7.4,
    forestPct: 22.1,
    disputeResolutionSpeedDays: 78,
    anomaliesDetected: 4890,
    digitizedParcelsMillion: 108.3,
    summary: 'CORS base stations expanded. Rapid conversion of peri-urban agricultural tracts observed.'
  },
  2022: {
    year: 2022,
    agriculturalPct: 55.9,
    urbanBuiltPct: 7.9,
    forestPct: 22.2,
    disputeResolutionSpeedDays: 54,
    anomaliesDetected: 6420,
    digitizedParcelsMillion: 129.5,
    summary: 'Multi-spectral satellite change detection piloted across 40 urban development authorities.'
  },
  2023: {
    year: 2023,
    agriculturalPct: 55.4,
    urbanBuiltPct: 8.3,
    forestPct: 22.3,
    disputeResolutionSpeedDays: 38,
    anomaliesDetected: 7980,
    digitizedParcelsMillion: 148.9,
    summary: 'Unified National Land Portal prototype tests. Automated mutation notices introduced.'
  },
  2024: {
    year: 2024,
    agriculturalPct: 55.0,
    urbanBuiltPct: 8.5,
    forestPct: 22.3,
    disputeResolutionSpeedDays: 24,
    anomaliesDetected: 9810,
    digitizedParcelsMillion: 164.2,
    summary: 'Over 80% of nationwide agricultural land records digitally cross-referenced with bank loan portals.'
  },
  2025: {
    year: 2025,
    agriculturalPct: 54.8,
    urbanBuiltPct: 8.7,
    forestPct: 22.4,
    disputeResolutionSpeedDays: 16,
    anomaliesDetected: 12150,
    digitizedParcelsMillion: 178.6,
    summary: 'AI anomaly flags incorporated into live registration workflow, preventing fraud before deed stamping.'
  },
  2026: {
    year: 2026,
    agriculturalPct: 54.5,
    urbanBuiltPct: 9.0,
    forestPct: 22.4,
    disputeResolutionSpeedDays: 11.4,
    anomaliesDetected: 14820,
    digitizedParcelsMillion: 184.3,
    summary: 'Smart India Hackathon 2026 next-generation platform: live vector GIS, multi-lingual AI assistant, and national policy pipeline active.'
  }
};

export const MOCK_QUALITY_ALERTS = [
  {
    id: 'ALT-01',
    severity: 'High',
    title: 'Discrepant Boundary Overlap Detected',
    region: 'Survey No. 104/2B & Lake Buffer (Gandipet/Narsingi)',
    description: 'Vector polygon intersects gazetted Full Tank Level (FTL) hydrological boundary by 0.38 acres.',
    actionRequired: 'Automated notification sent to Executive Engineer (Irrigation) and Sub-Registrar.',
    date: '2026-03-29 09:15 AM'
  },
  {
    id: 'ALT-02',
    severity: 'Medium',
    title: 'Missing Geodetic CORS Epoch Metadata',
    region: 'District Varanasi (Pindra Taluk, 14 Parcels)',
    description: 'RTK positioning coordinates uploaded without dual-frequency CORS correction timestamp.',
    actionRequired: 'Prompt field surveyor for recalibration file upload.',
    date: '2026-03-28 04:30 PM'
  },
  {
    id: 'ALT-03',
    severity: 'Low',
    title: 'Outdated Valuation Benchmark Index',
    region: 'Taluk Rajendranagar, Ward 12',
    description: 'Unit land value table has not been synced with latest municipal revised circle rates.',
    actionRequired: 'Schedule automated database sync at midnight.',
    date: '2026-03-27 11:20 AM'
  }
];

export const MOCK_GRAPH_NODES: KnowledgeGraphNode[] = [
  { id: 'node-parcel-1', label: 'Parcel SY-104/1A', type: 'Parcel', details: '4.82 Acre Agricultural Plot, Narsingi', metric: 'Quality: 96%' },
  { id: 'node-parcel-2', label: 'Parcel SY-104/2B', type: 'Parcel', details: '12.14 Acre Government Buffer Plot', metric: 'Risk: 78%' },
  { id: 'node-ds-1', label: 'National Cadastral Geodatabase', type: 'Dataset', details: '184M High-Precision Polygons', metric: 'Coverage: 94.6%' },
  { id: 'node-ds-2', label: 'ISRO LULC Decadal Raster', type: 'Dataset', details: '10m Sentinel Multi-Spectral', metric: 'Confidence: 97%' },
  { id: 'node-policy-1', label: 'Digital Cadastre Act 2026', type: 'Policy', details: 'Mandatory CORS Baseline RTK', metric: 'National Act' },
  { id: 'node-org-1', label: 'Survey of India', type: 'Organization', details: 'National Mapping Agency', metric: 'Primary Source' },
  { id: 'node-org-2', label: 'DoLR / MoRD', type: 'Organization', details: 'Dept of Land Resources', metric: 'Gov Authority' },
  { id: 'node-prog-1', label: 'SVAMITVA Scheme', type: 'Program', details: 'Drone Village Habitation Survey', metric: '580K Villages' },
  { id: 'node-paper-1', label: 'Peri-Urban Farmland AI Paper', type: 'Research Paper', details: 'IISc / IITB 2025 Study', metric: 'Citations: 89' },
  { id: 'node-cs-1', label: 'Telangana Auto-Mutation Case', type: 'Case Study', details: 'Dharani Next Real-Time Pipeline', metric: '12 Min Cycle' },
  { id: 'node-use-agri', label: 'Agricultural Land Use', type: 'Land Use', details: '54.8% of National Terrestrial Area', metric: '179.8M Ha' },
  { id: 'node-use-water', label: 'Hydrological & Wetland Buffer', type: 'Land Use', details: 'Protected Water Ecosystems', metric: 'Ecological Asset' }
];

export const MOCK_GRAPH_LINKS: KnowledgeGraphLink[] = [
  { source: 'node-ds-1', target: 'node-parcel-1', relationship: 'describes' },
  { source: 'node-ds-1', target: 'node-parcel-2', relationship: 'describes' },
  { source: 'node-org-1', target: 'node-ds-1', relationship: 'publishes' },
  { source: 'node-org-2', target: 'node-prog-1', relationship: 'funds' },
  { source: 'node-prog-1', target: 'node-ds-1', relationship: 'uses' },
  { source: 'node-policy-1', target: 'node-ds-1', relationship: 'regulates' },
  { source: 'node-paper-1', target: 'node-use-agri', relationship: 'studies' },
  { source: 'node-paper-1', target: 'node-ds-2', relationship: 'uses' },
  { source: 'node-cs-1', target: 'node-ds-1', relationship: 'uses' },
  { source: 'node-parcel-2', target: 'node-use-water', relationship: 'affects' },
  { source: 'node-policy-1', target: 'node-use-water', relationship: 'regulates' }
];

export const MOCK_POLICY_PIPELINE: PolicyPipelineStage[] = [
  {
    id: 1,
    title: 'Research Question Framing',
    subtitle: 'Clarifying the governance problem statement and spatial boundaries',
    status: 'completed',
    summary: 'Evaluating whether rapid conversion of irrigated peri-urban farmland along national expressways requires an automated ecological conversion tax and zoning protection buffer.',
    artifacts: ['Research Problem Matrix v1.4', 'Key Stakeholder Inception Note']
  },
  {
    id: 2,
    title: 'Data Discovery',
    subtitle: 'Identifying high-fidelity multi-source datasets',
    status: 'completed',
    summary: 'Selected National Cadastral Parcel Polygons, ISRO 10m LULC multi-spectral time-series, and District Sub-Registrar transaction logs (2018–2026).',
    artifacts: ['Dataset Catalog Metadata Pack', 'API Connector Manifest']
  },
  {
    id: 3,
    title: 'Data Validation & Quality Auditing',
    subtitle: 'Assessing spatial accuracy, completeness, and provenance',
    status: 'completed',
    summary: 'Verified spatial accuracy at 94.6% against ground-truth CORS benchmarks. Confirmed zero duplicate survey keys across selected 140 peri-urban villages.',
    artifacts: ['Data Trust Card: 92% Overall', 'W3C PROV-O Audit Certificate']
  },
  {
    id: 4,
    title: 'Evidence Collection',
    subtitle: 'Synthesizing empirical observations and GIS layers',
    status: 'completed',
    summary: 'Cross-tabulated 45,200 non-agricultural conversion applications with multi-spectral vegetative decline within 5 km of expressway access ramps.',
    artifacts: ['Spatial Cluster Maps', 'Vegetative Index Delta Sheets']
  },
  {
    id: 5,
    title: 'Spatial & Econometric Analysis',
    subtitle: 'Running predictive models and conversion velocity metrics',
    status: 'completed',
    summary: 'Analysis reveals that speculative agricultural purchases precede physical conversion by an average of 18 months, leading to premature cessation of farming on adjacent fields.',
    artifacts: ['Conversion Hazard Rate Regression', 'Peri-urban Land Rent Gradient Model']
  },
  {
    id: 6,
    title: 'Analytical Findings',
    subtitle: 'Distilling unbiased, evidence-grounded insights',
    status: 'completed',
    summary: '14.8% of multi-crop prime irrigated land in the study belt was converted between 2021 and 2026. However, 42% of nearby brownfield industrial parks remained under-utilized.',
    artifacts: ['Synthesis Brief #08', 'Peer-Reviewed Empirical Appendix']
  },
  {
    id: 7,
    title: 'Policy Options Formulation',
    subtitle: 'Structuring balanced policy alternatives with trade-offs',
    status: 'active',
    summary: 'Articulated three evidence-based interventions for ministerial review without political bias.',
    artifacts: ['Policy Trade-Off Matrix', 'Inter-departmental Consultation Pack'],
    tradeoffs: [
      {
        option: 'Option A: Mandatory Prime Soil Conversion Moratorium',
        benefits: '100% preservation of top-tier multi-crop alluvial food sheds within 15km of city hubs.',
        risks: 'May inflate land acquisition prices for high-priority renewable energy & tech logistics hubs.',
        fiscalImpact: 'Estimated ₹120 Cr annual decrease in registration stamp duties.'
      },
      {
        option: 'Option B: Brownfield-First Development Incentive & Conversion Cess',
        benefits: 'Steers 60% of new factories to vacant industrial parks; levies 5% ecological cess on greenfield farms.',
        risks: 'Requires rapid infrastructure upgrades in legacy industrial estates.',
        fiscalImpact: 'Net positive ₹380 Cr green fund generated for farmer soil enrichment.'
      },
      {
        option: 'Option C: Tradable Development Rights (TDR) for Peri-Urban Farmers',
        benefits: 'Compensates agricultural families with high-value urban transferable rights while preserving open green lungs.',
        risks: 'Demands transparent secondary TDR trading exchange and strict municipal zoning adherence.',
        fiscalImpact: 'Budget neutral; funded by commercial developers purchasing density bonuses.'
      }
    ]
  },
  {
    id: 8,
    title: 'Stakeholder & Public Review',
    subtitle: 'Gathering inputs from farmer cooperatives, industry bodies, and planners',
    status: 'pending',
    summary: 'Scheduled digital consultation period with automated summary of citizen feedback.',
    artifacts: ['Public Feedback Portal Template', 'Stakeholder Meeting Minutes']
  },
  {
    id: 9,
    title: 'Final Policy Brief Publication',
    subtitle: 'Delivering actionable policy whitepaper to government decision makers',
    status: 'pending',
    summary: 'Publication ready executive summary with data appendices, GIS map atlas, and draft gazette language.',
    artifacts: ['Executive Policy Brief PDF', 'Open Data Companion Package']
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'alert',
    title: 'AI Anomaly Flag in Sy 104/2B',
    message: 'Satellite change detection identified unauthorized boundary construction in protected lake buffer zone.',
    time: '12m ago',
    read: false,
    actionUrl: 'gis'
  },
  {
    id: 'n2',
    type: 'update',
    title: 'New National Cadastral Vector Batch',
    message: '1.4M newly surveyed parcels in Karnataka and Telangana published to Data Catalog.',
    time: '2h ago',
    read: false,
    actionUrl: 'catalog'
  },
  {
    id: 'n3',
    type: 'challenge',
    title: 'SIH 2026 Challenge Submission Alert',
    message: 'Submission window for "Real-time Satellite AI for Cadastral Encroachment" closes in 45 days.',
    time: '5h ago',
    read: true,
    actionUrl: 'challenges'
  },
  {
    id: 'n4',
    type: 'workspace',
    title: 'Research Workspace Synthesis Ready',
    message: 'AI Copilot generated preliminary finding on Peri-Urban Agrarian Transition project.',
    time: '1d ago',
    read: true,
    actionUrl: 'workspace'
  }
];
