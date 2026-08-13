import { StartupProject, User, Investor, NotificationItem } from '../src/types';

export const INITIAL_DEMO_USER: User = {
  id: 'usr_demo_101',
  email: 'founder@fundpilot.ai',
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'founder',
  companyName: 'AuraScale AI',
  plan: 'pro',
  createdAt: new Date().toISOString(),
};

export const SAMPLE_INVESTORS: Investor[] = [
  {
    id: 'inv_1',
    fundName: 'Apex Venture Partners',
    partnerName: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    stages: ['Seed', 'Series A'],
    checkSizeMin: 250000,
    checkSizeMax: 2000000,
    industries: ['B2B SaaS', 'Artificial Intelligence', 'Fintech', 'Developer Tools'],
    geographies: ['United States', 'Remote', 'Global'],
    notablePortfolio: ['Linear', 'Ramp', 'Vercel', 'Pinecone'],
    bio: 'Lead seed stage investor focusing on AI-native enterprise workflows, infrastructure, and vertical automation.',
    website: 'https://apexventures.example.com',
    contactEmail: 'sarah@apexventures.example.com',
  },
  {
    id: 'inv_2',
    fundName: 'Hyperplane Capital',
    partnerName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    stages: ['Pre-Seed', 'Seed'],
    checkSizeMin: 100000,
    checkSizeMax: 750000,
    industries: ['Artificial Intelligence', 'Cybersecurity', 'Automation', 'Cloud Services'],
    geographies: ['North America', 'Europe'],
    notablePortfolio: ['Supabase', 'Scale AI', 'Jasper', 'Cohere'],
    bio: 'Early backer of technical founders building high-velocity AI platforms and dev ecosystems.',
    website: 'https://hyperplanecap.example.com',
    contactEmail: 'marcus@hyperplanecap.example.com',
  },
  {
    id: 'inv_3',
    fundName: 'Horizon Global Capital',
    partnerName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    stages: ['Seed', 'Series A', 'Series B'],
    checkSizeMin: 500000,
    checkSizeMax: 5000000,
    industries: ['Fintech', 'B2B SaaS', 'Healthtech', 'Supply Chain'],
    geographies: ['Global', 'Europe', 'North America'],
    notablePortfolio: ['Revolut', 'Miro', 'Personio', 'Checkout.com'],
    bio: 'Investing in high-margin international B2B software scaling past $1M ARR.',
    website: 'https://horizonglobal.example.com',
    contactEmail: 'elena@horizonglobal.example.com',
  },
  {
    id: 'inv_4',
    fundName: 'Founders Collective',
    partnerName: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    stages: ['Pre-Seed', 'Seed'],
    checkSizeMin: 50000,
    checkSizeMax: 500000,
    industries: ['Artificial Intelligence', 'Marketplaces', 'Creator Economy', 'EdTech'],
    geographies: ['United States', 'Canada'],
    notablePortfolio: ['Substack', 'Descript', 'Notion', 'Figma'],
    bio: 'Ex-operator turned angel & seed investor. Hands-on help with product design and GTM strategy.',
    website: 'https://founderscollective.example.com',
    contactEmail: 'david@founderscollective.example.com',
  },
  {
    id: 'inv_5',
    fundName: 'NextWave Ventures',
    partnerName: 'Amara Patel',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    stages: ['Seed', 'Series A'],
    checkSizeMin: 500000,
    checkSizeMax: 3000000,
    industries: ['AI Agents', 'DevTools', 'Enterprise Software', 'Data Platforms'],
    geographies: ['North America', 'Global'],
    notablePortfolio: ['Weights & Biases', 'LangChain', 'Databricks'],
    bio: 'Focused on domain-specific AI agents, enterprise orchestration, and data workflow acceleration.',
    website: 'https://nextwave.example.com',
    contactEmail: 'amara@nextwave.example.com',
  }
];

export const INITIAL_PROJECT: StartupProject = {
  id: 'proj_demo_01',
  userId: 'usr_demo_101',
  name: 'AuraScale AI',
  tagline: 'Autonomous AI RevOps & Sales Pipeline Optimization Copilot',
  industry: 'B2B SaaS / Artificial Intelligence',
  stage: 'Seed',
  fundingGoal: 1500000,
  currency: 'USD',
  country: 'United States',
  problem: 'Sales & RevOps teams waste 40% of their time manually analyzing deal signals, drafting follow-ups, updating CRMs, and forecasting quarterly ARR.',
  solution: 'AuraScale AI connects directly to Salesforce/HubSpot, Gong, and email threads to continuously predict deal closure probabilities, auto-generate hyper-personalized deal playbooks, and update ARR forecasts in real time.',
  targetCustomer: 'Mid-market & Enterprise B2B SaaS companies ($5M-$50M ARR) with sales teams of 15 to 100 reps.',
  businessModel: 'B2B SaaS tier subscription ($1,200/mo base + $85/rep seat/mo)',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  startupScore: 88,
  fundingReadinessScore: 84,
  executiveSummary: {
    overview: 'AuraScale AI is an autonomous RevOps copilot that eliminates manual CRM debt and boosts B2B deal velocity by 34%. By unifying deal communications with predictive machine learning models, AuraScale empowers sales leaders to close deals faster and forecast revenue with 95%+ precision.',
    problemValidation: {
      description: 'Mid-market B2B companies experience a 28% deal slip rate due to missed signals and slow sales rep response times.',
      painPointSeverity: 'High',
      affectedMarketSize: '$12.4B annual lost revenue in unclosed sales pipeline',
    },
    solutionRefinement: {
      coreValueProps: [
        'Automated real-time deal probability scoring',
        'AI deal playbooks tailored to buyer behavior',
        'Zero-touch CRM auto-sync & bi-directional forecasting'
      ],
      technicalMoat: 'Proprietary B2B intent model fine-tuned on over 2.5 million sales conversations across SaaS verticals.',
      keyFeatures: [
        'Live Gong & Email Deal Radar',
        'Multi-Stakeholder Engagement Graph',
        '1-Click Executive Deal Summaries',
        'Predictive Pipeline Health Dashboard'
      ]
    },
    uniqueValueProposition: 'Unlike static CRMs or basic conversation intelligence tools, AuraScale actively guides reps on next-best actions and auto-executes workflow tasks.',
    swotAnalysis: {
      strengths: ['High rep adoption (91%)', 'Deep integration ecosystem', 'Strong early net revenue retention (138%)'],
      weaknesses: ['Requires initial CRM admin setup', 'Enterprise sales cycles take 45-60 days'],
      opportunities: ['Expansion into European mid-market', 'Automated contract negotiation module'],
      threats: ['CRM incumbents launching native light AI features']
    },
    risks: [
      { category: 'Execution', risk: 'Sales rep churn during onboarding', mitigation: 'Automated 1-click Chrome extension onboarding in < 5 mins', severity: 'Low' },
      { category: 'Market', risk: 'Incumbent CRM vendors copying feature set', mitigation: 'Maintain deeper multi-channel intent data & custom fine-tuned models', severity: 'Medium' }
    ]
  },
  marketResearch: {
    tam: 18500000000,
    sam: 4200000000,
    som: 380000000,
    tamFormatted: '$18.5 Billion',
    samFormatted: '$4.2 Billion',
    somFormatted: '$380 Million',
    cagr: 22.4,
    marketTrends: [
      'Rapid adoption of generative AI in enterprise sales workflows',
      'Shift from static CRM data entry to proactive AI agent co-pilots',
      'Increasing demand for tight revenue forecasting accuracy during tight economic cycles'
    ],
    targetSegments: [
      { name: 'Mid-Market B2B SaaS', demographics: '$5M - $50M ARR, 20-100 Reps', willingnessToPay: 'High ($15k-$45k/yr)', sizePercentage: 55 },
      { name: 'High-Growth Tech Startups', demographics: 'Series A/B, 10-25 Reps', willingnessToPay: 'Medium ($10k-$20k/yr)', sizePercentage: 30 },
      { name: 'Enterprise Tech', demographics: '$50M+ ARR, 100+ Reps', willingnessToPay: 'Very High ($50k-$150k/yr)', sizePercentage: 15 }
    ],
    geographicOpportunities: [
      { region: 'North America', marketSharePotential: '60%', growthDriver: 'Early tech adoption & high sales rep compensation cost' },
      { region: 'Europe (UK, DACH, Nordics)', marketSharePotential: '25%', growthDriver: 'Growing B2B SaaS hubs & demand for automation' },
      { region: 'Asia-Pacific (APAC)', marketSharePotential: '15%', growthDriver: 'Accelerating digital transformation in B2B enterprise' }
    ]
  },
  competitors: {
    competitors: [
      { id: 'c1', name: 'Gong.io', fundingRaised: '$584M', estimatedValuation: '$7.2B', strengths: ['Brand leadership', 'Deep audio analysis'], weaknesses: ['Expensive', 'Passive insights, non-actionable'], priceRange: '$$$$', xPosition: 85, yPosition: 80 },
      { id: 'c2', name: 'Clari', fundingRaised: '$495M', estimatedValuation: '$2.6B', strengths: ['Enterprise pipeline tracking'], weaknesses: ['Clunky UI', 'High setup friction'], priceRange: '$$$$', xPosition: 90, yPosition: 65 },
      { id: 'c3', name: 'AuraScale AI (Us)', fundingRaised: '$500K Bootstrapped', estimatedValuation: '$8M', strengths: ['Proactive AI execution', '5-min setup', 'Modern sleek UX'], weaknesses: ['New brand'], priceRange: '$$', xPosition: 45, yPosition: 92 },
      { id: 'c4', name: 'HubSpot Breeze AI', fundingRaised: 'Public', estimatedValuation: '$30B+', strengths: ['Built-in CRM'], weaknesses: ['Basic generic AI prompts', 'Limited custom workflows'], priceRange: '$$', xPosition: 40, yPosition: 45 }
    ],
    featureComparisonMatrix: [
      { featureName: 'Real-time Autonomous Deal Execution', ourProduct: true, competitorA: false, competitorB: false, competitorC: false },
      { featureName: 'AI Multi-Channel Intent Graph', ourProduct: true, competitorA: true, competitorB: false, competitorC: false },
      { featureName: 'Zero-Friction 5-Minute Setup', ourProduct: true, competitorA: false, competitorB: false, competitorC: true },
      { featureName: 'Bi-Directional Automated CRM Sync', ourProduct: true, competitorA: true, competitorB: true, competitorC: true },
      { featureName: 'Custom Fine-Tuned Deal Playbooks', ourProduct: true, competitorA: false, competitorB: false, competitorC: false }
    ],
    competitivePositioningSummary: 'AuraScale AI sits in the optimal high-value, fast-implementation quadrant. While Gong and Clari charge high enterprise pricing for static reporting, AuraScale provides an active execution copilot at a fraction of the cost.'
  },
  pricingStrategy: {
    recommendedModel: 'Subscription',
    tiers: [
      { name: 'Starter Copilot', priceMonthly: 499, priceAnnual: 399, targetAudience: 'Early startups & teams up to 5 reps', featuresIncluded: ['CRM Auto-Sync', 'AI Deal Summaries', 'Email Assistant', 'Up to 5 Rep Seats'], isRecommended: false },
      { name: 'Pro Growth', priceMonthly: 1299, priceAnnual: 999, targetAudience: 'Mid-market scaling sales teams (10-25 reps)', featuresIncluded: ['Everything in Starter', 'Gong/Slack Live Signal Radar', 'Predictive Pipeline Health', 'Custom Deal Playbooks', 'Dedicated Success Manager'], isRecommended: true },
      { name: 'Enterprise Autonomous', priceMonthly: 2999, priceAnnual: 2499, targetAudience: 'Enterprise sales orgs (25+ reps)', featuresIncluded: ['Custom Fine-Tuned AI Models', 'SOC-2 Compliance & On-Prem Options', 'Dedicated API Access', 'Custom Workflow Triggers'], isRecommended: false }
    ],
    unitEconomics: {
      estimatedCAC: 1850,
      estimatedLTV: 24500,
      ltvCacRatio: 13.2,
      paybackMonths: 4.2,
      grossMarginPercent: 86
    },
    optimizationTips: [
      'Offer an annual discount of 20% to boost upfront cash flow for early runway expansion.',
      'Introduce usage-based add-ons for additional custom deal playbook runs beyond 5,000 deals/month.'
    ]
  },
  financialModel: {
    assumptions: {
      initialCash: 450000,
      monthlyGrowthRate: 18,
      churnRate: 2,
      avgDealSizeMonthly: 1100,
      cac: 1850,
      initialTeamCount: 6,
      avgSalaryMonthly: 7500,
      marketingSpendMonthly: 12000
    },
    projections: [
      {
        year: 1,
        revenue: 384000,
        costOfGoodsSold: 53760,
        grossProfit: 330240,
        operatingExpenses: { salaries: 540000, marketing: 144000, softwareAndInfra: 36000, officeAndAdmin: 18000, legalAndOther: 24000 },
        totalOpEx: 762000,
        netIncome: -431760,
        endingCashBalance: 518240,
        monthlyBurnRate: 35980,
        headcount: 8,
        payingCustomers: 32,
        arpu: 1000
      },
      {
        year: 2,
        revenue: 1680000,
        costOfGoodsSold: 218400,
        grossProfit: 1461600,
        operatingExpenses: { salaries: 960000, marketing: 360000, softwareAndInfra: 72000, officeAndAdmin: 36000, legalAndOther: 36000 },
        totalOpEx: 1464000,
        netIncome: -2400,
        endingCashBalance: 1215840,
        monthlyBurnRate: 1200,
        headcount: 14,
        payingCustomers: 125,
        arpu: 1120
      },
      {
        year: 3,
        revenue: 5420000,
        costOfGoodsSold: 650400,
        grossProfit: 4769600,
        operatingExpenses: { salaries: 1800000, marketing: 840000, softwareAndInfra: 180000, officeAndAdmin: 60000, legalAndOther: 60000 },
        totalOpEx: 2940000,
        netIncome: 1829600,
        endingCashBalance: 3045440,
        monthlyBurnRate: 0,
        headcount: 24,
        payingCustomers: 380,
        arpu: 1190
      }
    ],
    runwayMonths: 14.5,
    breakEvenMonth: 21,
    requiredCapital: 1500000,
    useOfFunds: [
      { category: 'Engineering & AI R&D', percentage: 45, amount: 675000 },
      { category: 'Go-To-Market & Sales', percentage: 35, amount: 525000 },
      { category: 'Customer Success & Ops', percentage: 12, amount: 180000 },
      { category: 'Legal & Working Capital', percentage: 8, amount: 120000 }
    ]
  },
  pitchDeck: {
    theme: 'modern-dark',
    slides: [
      { id: 1, title: 'AuraScale AI', subtitle: 'The Autonomous AI Copilot for Enterprise RevOps & Pipeline Velocity', bullets: ['Raising $1.5M Seed', 'Targeting $18.5B Global RevOps Market'], keyHighlight: 'Autonomous Sales Execution Engine' },
      { id: 2, title: 'The Problem', subtitle: 'Sales Teams Waste 40% of Their Day on Manual CRM Debt & Late Deal Signals', bullets: ['28% of pipeline slips due to slow rep response times', 'CRMs are passive record databases, not active deal co-pilots', 'Sales leaders lack real-time deal closing visibility'], keyHighlight: '$12.4B Lost Annually in Unclosed Pipeline' },
      { id: 3, title: 'The Solution', subtitle: 'An Autonomous Copilot that Detects Signals, Guides Reps, and Auto-Updates CRM', bullets: ['Continuous multi-channel deal probability radar', 'Automated personalized buyer playbooks', 'Bi-directional zero-friction CRM sync'], keyHighlight: '34% Increase in Deal Velocity' },
      { id: 4, title: 'Market Opportunity', subtitle: '$18.5B TAM Driven by AI Automation in Enterprise Sales', bullets: ['TAM: $18.5 Billion Global Sales Software Market', 'SAM: $4.2 Billion Mid-Market & Enterprise B2B SaaS', 'SOM: $380 Million Target Year 3 Market Share'], keyHighlight: '22.4% Annual Market Growth Rate' },
      { id: 5, title: 'The Product', subtitle: 'Seamless Integration with Gong, Salesforce, HubSpot & Email Threads', bullets: ['Real-time Gong call transcript deal intent extractor', 'Multi-stakeholder engagement tree builder', 'Instant executive deal risk alerts on Slack/Teams'], keyHighlight: '5-Minute No-Code Onboarding' },
      { id: 6, title: 'Business Model', subtitle: 'High-Margin B2B SaaS Tiered Subscriptions with Expansion Loops', bullets: ['Pro Growth Tier: $1,299/mo per company + seats', 'Enterprise Tier: $2,999/mo + fine-tuned models', '86% Gross Margins with 138% Net Revenue Retention'], keyHighlight: '13.2x LTV to CAC Ratio' },
      { id: 7, title: 'Competitive Advantage', subtitle: 'Proactive AI Execution Engine vs. Passive Record Systems', bullets: ['Unlike Gong/Clari, AuraScale auto-executes deal playbooks', 'Proprietary intent model trained on 2.5M sales interactions', '10x faster implementation time than legacy platforms'], keyHighlight: 'Defensible Data Moat' },
      { id: 8, title: 'Traction & Milestones', subtitle: 'Rapid Organic Growth Across Early B2B SaaS Customers', bullets: ['$32k Monthly Recurring Revenue ($384k ARR)', '32 Paying Mid-Market SaaS Customers', '91% Monthly Active Rep Engagement'], keyHighlight: '18% Month-over-Month Revenue Growth' },
      { id: 9, title: 'Financial Projections', subtitle: 'Scaling from $384k ARR in Y1 to $5.4M ARR in Y3', bullets: ['Year 1: $384k ARR ($330k Gross Profit)', 'Year 2: $1.68M ARR (Net Income Break-even)', 'Year 3: $5.42M ARR ($1.83M Net Profit)'], keyHighlight: 'Profitable by Month 21' },
      { id: 10, title: 'Team', subtitle: 'Ex-Salesforce, Ex-Gong & MIT AI Research Veterans', bullets: ['Alex Rivera (CEO): Ex-Head of Sales Ops @ Salesforce', 'Dr. Elena Vance (CTO): PhD AI/NLP MIT, Ex-Google Brain', 'Marcus Sterling (VP Product): Early Lead PM @ Gong'], keyHighlight: '15+ Years Combined RevOps & AI Experience' },
      { id: 11, title: 'Funding Ask', subtitle: 'Raising $1,500,000 Seed Round for GTM & AI Engineering Scale', bullets: ['45% AI Model R&D & Engineering', '35% Sales & Marketing Expansion', '12% Customer Success & Onboarding', '8% Legal & Operational Working Capital'], keyHighlight: '18 Months Runway to Series A ($5M ARR)' },
      { id: 12, title: 'Vision', subtitle: 'The Standard Infrastructure Layer for Next-Gen Autonomous Revenue Operations', bullets: ['Empowering 100,000+ sales reps globally with AI co-pilots', 'Join us in defining the future of AI-driven commerce'], keyHighlight: 'Let\'s Build the Future of RevOps Together' }
    ]
  },
  investorMatches: SAMPLE_INVESTORS.slice(0, 3).map((inv, idx) => ({
    ...inv,
    matchScore: 94 - idx * 4,
    matchReasoning: [
      'Focuses on Seed stage B2B SaaS & AI platforms',
      'Average check size ($250k - $2M) perfectly fits $1.5M funding goal',
      'Portfolio synergy with enterprise automation platforms'
    ],
    outreachStatus: idx === 0 ? 'In Conversation' : 'Not Contacted'
  }))
};

// In-memory data store with fallback state
class DataStore {
  private users: Map<string, User> = new Map();
  private projects: Map<string, StartupProject> = new Map();
  private notifications: NotificationItem[] = [
    { id: 'n1', title: 'AI Pitch Deck Ready', message: 'Your 12-slide investor pitch deck was generated.', time: '10m ago', type: 'ai', read: false },
    { id: 'n2', title: 'Investor Match Alert', message: 'Apex Venture Partners checked your profile criteria.', time: '1h ago', type: 'funding', read: false },
    { id: 'n3', title: 'Competitor Update', message: 'Gong.io announced a new pricing tier.', time: '1d ago', type: 'competitor', read: true }
  ];

  constructor() {
    this.users.set(INITIAL_DEMO_USER.id, INITIAL_DEMO_USER);
    this.projects.set(INITIAL_PROJECT.id, INITIAL_PROJECT);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  getProjectsByUserId(userId: string): StartupProject[] {
    return Array.from(this.projects.values()).filter(p => p.userId === userId || userId === 'usr_demo_101');
  }

  getProjectById(id: string): StartupProject | undefined {
    return this.projects.get(id) || INITIAL_PROJECT;
  }

  saveProject(project: StartupProject): StartupProject {
    project.updatedAt = new Date().toISOString();
    this.projects.set(project.id, project);
    return project;
  }

  deleteProject(id: string): boolean {
    return this.projects.delete(id);
  }

  getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  markNotificationRead(id: string): void {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
  }
}

export const db = new DataStore();
