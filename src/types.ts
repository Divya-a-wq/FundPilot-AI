export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'founder' | 'admin' | 'investor';
  companyName?: string;
  plan: 'free' | 'pro' | 'growth';
  createdAt: string;
}

export interface StartupProject {
  id: string;
  userId: string;
  name: string;
  tagline: string;
  industry: string;
  stage: 'Idea' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B+';
  fundingGoal: number;
  currency: string;
  country: string;
  problem: string;
  solution: string;
  targetCustomer: string;
  businessModel: string;
  createdAt: string;
  updatedAt: string;
  
  // Scores
  startupScore: number;
  fundingReadinessScore: number;
  
  // AI Generated Sections
  executiveSummary?: ExecutiveSummary;
  marketResearch?: MarketResearchData;
  competitors?: CompetitorData;
  pricingStrategy?: PricingStrategyData;
  financialModel?: FinancialModelData;
  pitchDeck?: PitchDeckData;
  investorMatches?: InvestorMatch[];
  versions?: ProjectVersion[];
  team?: TeamMember[];
}

export interface ExecutiveSummary {
  overview: string;
  problemValidation: {
    description: string;
    painPointSeverity: 'Low' | 'Medium' | 'High' | 'Critical';
    affectedMarketSize: string;
  };
  solutionRefinement: {
    coreValueProps: string[];
    technicalMoat: string;
    keyFeatures: string[];
  };
  uniqueValueProposition: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risks: {
    category: 'Market' | 'Execution' | 'Financial' | 'Regulatory';
    risk: string;
    mitigation: string;
    severity: 'Low' | 'Medium' | 'High';
  }[];
}

export interface MarketResearchData {
  tam: number; // in USD
  sam: number;
  som: number;
  tamFormatted: string;
  samFormatted: string;
  somFormatted: string;
  cagr: number; // e.g. 18.5 for 18.5%
  marketTrends: string[];
  targetSegments: {
    name: string;
    demographics: string;
    willingnessToPay: string;
    sizePercentage: number;
  }[];
  geographicOpportunities: {
    region: string;
    marketSharePotential: string;
    growthDriver: string;
  }[];
}

export interface CompetitorItem {
  id: string;
  name: string;
  website?: string;
  fundingRaised: string;
  estimatedValuation: string;
  strengths: string[];
  weaknesses: string[];
  priceRange: string;
  xPosition: number; // 0 to 100 (e.g. Price: Low to High)
  yPosition: number; // 0 to 100 (e.g. Feature Richness: Low to High)
}

export interface CompetitorData {
  competitors: CompetitorItem[];
  featureComparisonMatrix: {
    featureName: string;
    ourProduct: boolean;
    competitorA: boolean;
    competitorB: boolean;
    competitorC: boolean;
  }[];
  competitivePositioningSummary: string;
}

export interface PricingTier {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  targetAudience: string;
  featuresIncluded: string[];
  isRecommended?: boolean;
}

export interface PricingStrategyData {
  recommendedModel: 'Freemium' | 'Subscription' | 'Usage-Based' | 'Enterprise';
  tiers: PricingTier[];
  unitEconomics: {
    estimatedCAC: number;
    estimatedLTV: number;
    ltvCacRatio: number;
    paybackMonths: number;
    grossMarginPercent: number;
  };
  optimizationTips: string[];
}

export interface FinancialYearProjection {
  year: number;
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: {
    salaries: number;
    marketing: number;
    softwareAndInfra: number;
    officeAndAdmin: number;
    legalAndOther: number;
  };
  totalOpEx: number;
  netIncome: number;
  endingCashBalance: number;
  monthlyBurnRate: number;
  headcount: number;
  payingCustomers: number;
  arpu: number; // Average Revenue Per User
}

export interface FinancialModelAssumptions {
  initialCash: number;
  monthlyGrowthRate: number; // percentage e.g. 15
  churnRate: number; // percentage e.g. 3
  avgDealSizeMonthly: number;
  cac: number;
  initialTeamCount: number;
  avgSalaryMonthly: number;
  marketingSpendMonthly: number;
}

export interface FinancialModelData {
  assumptions: FinancialModelAssumptions;
  projections: FinancialYearProjection[];
  runwayMonths: number;
  breakEvenMonth: number;
  requiredCapital: number;
  useOfFunds: {
    category: string;
    percentage: number;
    amount: number;
  }[];
}

export interface PitchSlide {
  id: number;
  title: string;
  subtitle: string;
  bullets: string[];
  keyHighlight?: string;
  chartType?: 'bar' | 'pie' | 'metrics' | 'competitors' | 'financials';
  chartData?: any;
  notes?: string;
}

export interface PitchDeckData {
  theme: 'modern-dark' | 'glass-purple' | 'stripe-slate' | 'clean-light';
  slides: PitchSlide[];
  lastExportedAt?: string;
}

export interface Investor {
  id: string;
  fundName: string;
  partnerName: string;
  avatar: string;
  logo: string;
  stages: ('Pre-Seed' | 'Seed' | 'Series A' | 'Series B')[];
  checkSizeMin: number;
  checkSizeMax: number;
  industries: string[];
  geographies: string[];
  notablePortfolio: string[];
  bio: string;
  website: string;
  contactEmail: string;
  linkedIn?: string;
}

export interface InvestorMatch extends Investor {
  matchScore: number; // 0 - 100
  matchReasoning: string[];
  outreachStatus?: 'Not Contacted' | 'Email Drafted' | 'In Conversation' | 'Passed';
  customEmailDraft?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionKey: string; payload?: any }[];
}

export interface ProjectVersion {
  id: string;
  versionName: string;
  createdAt: string;
  summaryNote: string;
  dataSnapshot: Partial<StartupProject>;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Founder' | 'Co-Founder' | 'Advisor' | 'Investor';
  avatar?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'ai' | 'funding' | 'competitor' | 'system';
  read: boolean;
}
