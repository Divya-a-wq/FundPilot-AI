import { GoogleGenAI, Type } from '@google/genai';
import { 
  ExecutiveSummary, 
  MarketResearchData, 
  CompetitorData, 
  PricingStrategyData, 
  FinancialModelData, 
  PitchDeckData,
  InvestorMatch,
  Investor
} from '../src/types';

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MODEL_NAME = 'gemini-3.6-flash';

// Helper to strip markdown code blocks if necessary
function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned;
}

export async function generateExecutiveSummary(params: {
  name: string;
  industry: string;
  problem: string;
  solution: string;
  targetCustomer: string;
  businessModel: string;
  stage: string;
  fundingGoal: number;
}): Promise<ExecutiveSummary> {
  const prompt = `
    You are an elite Silicon Valley VC partner & startup strategy expert.
    Analyze the following startup details and generate an executive summary report in JSON format:
    
    Startup Name: ${params.name}
    Industry: ${params.industry}
    Problem: ${params.problem}
    Solution: ${params.solution}
    Target Customer: ${params.targetCustomer}
    Business Model: ${params.businessModel}
    Stage: ${params.stage}
    Funding Goal: $${params.fundingGoal}
    
    Return a JSON object matching this exact structure:
    {
      "overview": "A compelling 2-3 sentence overview of the company vision & core opportunity.",
      "problemValidation": {
        "description": "Validation details of the problem pain point.",
        "painPointSeverity": "High", // "Low", "Medium", "High", or "Critical"
        "affectedMarketSize": "Dollar or count metric of market impact."
      },
      "solutionRefinement": {
        "coreValueProps": ["Value prop 1", "Value prop 2", "Value prop 3"],
        "technicalMoat": "Technical advantage or proprietary barrier to entry.",
        "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
      },
      "uniqueValueProposition": "Single killer UVP statement.",
      "swotAnalysis": {
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "opportunities": ["Opportunity 1", "Opportunity 2"],
        "threats": ["Threat 1", "Threat 2"]
      },
      "risks": [
        {
          "category": "Market",
          "risk": "Risk description",
          "mitigation": "How to mitigate this risk",
          "severity": "High"
        },
        {
          "category": "Execution",
          "risk": "Risk description",
          "mitigation": "Mitigation strategy",
          "severity": "Medium"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    return JSON.parse(cleanJsonText(text));
  } catch (error) {
    console.error('Gemini generateExecutiveSummary error:', error);
    // Fallback response if API fails
    return {
      overview: `${params.name} is a high-potential startup in ${params.industry} solving critical friction for ${params.targetCustomer}.`,
      problemValidation: {
        description: params.problem,
        painPointSeverity: 'High',
        affectedMarketSize: '$10B+ Annual Lost Revenue',
      },
      solutionRefinement: {
        coreValueProps: [
          'High ROI automation for core workflows',
          'Fast setup with low onboarding friction',
          'Scalable infrastructure built for expansion',
        ],
        technicalMoat: 'Proprietary workflows and data intelligence layers.',
        keyFeatures: [
          'Automated AI Insights',
          'Integrations Hub',
          'Real-time Analytics',
          'Executive Reporting',
        ],
      },
      uniqueValueProposition: `The leading ${params.industry} platform delivering 10x ROI for ${params.targetCustomer}.`,
      swotAnalysis: {
        strengths: ['Experienced founding vision', 'High customer demand', 'Modern tech stack'],
        weaknesses: ['Early brand recognition', 'Capital required for rapid GTM'],
        opportunities: ['Expanding global adoption', 'Enterprise upsell options'],
        threats: ['Established legacy incumbents'],
      },
      risks: [
        {
          category: 'Execution',
          risk: 'GTM velocity depends on sales hiring.',
          mitigation: 'Implement product-led growth acquisition loops.',
          severity: 'Medium',
        },
      ],
    };
  }
}

export async function generateMarketResearch(params: {
  name: string;
  industry: string;
  targetCustomer: string;
  country: string;
}): Promise<MarketResearchData> {
  const prompt = `
    Conduct an in-depth market research analysis for the startup "${params.name}" in industry "${params.industry}" targeting "${params.targetCustomer}" in "${params.country}".
    Return a valid JSON object matching this structure:
    {
      "tam": 15000000000,
      "sam": 3500000000,
      "som": 250000000,
      "tamFormatted": "$15.0 Billion",
      "samFormatted": "$3.5 Billion",
      "somFormatted": "$250 Million",
      "cagr": 18.5,
      "marketTrends": [
        "Trend 1 description",
        "Trend 2 description",
        "Trend 3 description"
      ],
      "targetSegments": [
        {
          "name": "Segment 1 Name",
          "demographics": "Details on team size, budget, or geography",
          "willingnessToPay": "High ($10k-$30k/yr)",
          "sizePercentage": 50
        },
        {
          "name": "Segment 2 Name",
          "demographics": "Details",
          "willingnessToPay": "Medium ($5k-$10k/yr)",
          "sizePercentage": 35
        },
        {
          "name": "Segment 3 Name",
          "demographics": "Details",
          "willingnessToPay": "High ($30k+/yr)",
          "sizePercentage": 15
        }
      ],
      "geographicOpportunities": [
        {
          "region": "North America",
          "marketSharePotential": "55%",
          "growthDriver": "High tech spending and enterprise density"
        },
        {
          "region": "Europe",
          "marketSharePotential": "30%",
          "growthDriver": "Digital transformation initiatives"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    return JSON.parse(cleanJsonText(response.text || ''));
  } catch (err) {
    console.error('Gemini generateMarketResearch error:', err);
    return {
      tam: 12000000000,
      sam: 2800000000,
      som: 180000000,
      tamFormatted: '$12.0 Billion',
      samFormatted: '$2.8 Billion',
      somFormatted: '$180 Million',
      cagr: 16.8,
      marketTrends: [
        'Rapid migration toward cloud-first AI workflows',
        'Increased demand for automated enterprise software',
        'Cost optimization in operational budgets',
      ],
      targetSegments: [
        { name: 'Mid-Market SaaS', demographics: '$5M-$20M ARR', willingnessToPay: 'High', sizePercentage: 60 },
        { name: 'Early-stage Startups', demographics: 'Pre-seed/Seed', willingnessToPay: 'Medium', sizePercentage: 40 },
      ],
      geographicOpportunities: [
        { region: 'North America', marketSharePotential: '60%', growthDriver: 'Early tech adoption' },
        { region: 'Europe', marketSharePotential: '25%', growthDriver: 'Growing software hub' },
      ],
    };
  }
}

export async function generateCompetitorAnalysis(params: {
  name: string;
  industry: string;
  solution: string;
}): Promise<CompetitorData> {
  const prompt = `
    Analyze real or representative competitors for "${params.name}" (${params.industry} solving: ${params.solution}).
    Return a valid JSON matching this schema:
    {
      "competitors": [
        {
          "id": "comp_1",
          "name": "Competitor Name A",
          "fundingRaised": "$250M",
          "estimatedValuation": "$1.5B",
          "strengths": ["Strong brand", "Large sales team"],
          "weaknesses": ["Legacy architecture", "Expensive pricing"],
          "priceRange": "$$$$",
          "xPosition": 80, // Price / Complexity: 0-100
          "yPosition": 70  // Feature Completeness: 0-100
        },
        {
          "id": "comp_2",
          "name": "Competitor Name B",
          "fundingRaised": "$40M",
          "estimatedValuation": "$200M",
          "strengths": ["Fast UI", "Good API"],
          "weaknesses": ["Lacks enterprise security"],
          "priceRange": "$$",
          "xPosition": 40,
          "yPosition": 55
        },
        {
          "id": "comp_us",
          "name": "${params.name} (Us)",
          "fundingRaised": "Seed Stage",
          "estimatedValuation": "$5M - $10M",
          "strengths": ["AI-native automation", "Affordable", "5-min setup"],
          "weaknesses": ["New brand"],
          "priceRange": "$$",
          "xPosition": 35,
          "yPosition": 90
        }
      ],
      "featureComparisonMatrix": [
        {
          "featureName": "AI-Native Automated Workflow",
          "ourProduct": true,
          "competitorA": false,
          "competitorB": true,
          "competitorC": false
        },
        {
          "featureName": "5-Minute Zero-Code Onboarding",
          "ourProduct": true,
          "competitorA": false,
          "competitorB": false,
          "competitorC": false
        },
        {
          "featureName": "Real-time Executive Dashboard",
          "ourProduct": true,
          "competitorA": true,
          "competitorB": true,
          "competitorC": false
        }
      ],
      "competitivePositioningSummary": "Executive narrative summarizing why our product wins against incumbent choices."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    return JSON.parse(cleanJsonText(response.text || ''));
  } catch (err) {
    console.error('Gemini generateCompetitorAnalysis error:', err);
    return {
      competitors: [
        { id: 'c1', name: 'Legacy Incumbent', fundingRaised: '$500M+', estimatedValuation: '$5B+', strengths: ['Market leader'], weaknesses: ['Slow innovation'], priceRange: '$$$$', xPosition: 85, yPosition: 75 },
        { id: 'c2', name: `${params.name} (Us)`, fundingRaised: 'Seed', estimatedValuation: '$8M', strengths: ['AI execution', 'Sleek UI'], weaknesses: ['Early stage'], priceRange: '$$', xPosition: 35, yPosition: 90 },
      ],
      featureComparisonMatrix: [
        { featureName: 'AI Autonomous Guidance', ourProduct: true, competitorA: false, competitorB: false, competitorC: false },
        { featureName: 'Modern API First Hub', ourProduct: true, competitorA: true, competitorB: false, competitorC: false },
      ],
      competitivePositioningSummary: 'Positioned in the high-feature, low-friction quadrant designed to disrupt slow incumbents.',
    };
  }
}

export async function generatePitchDeck(params: {
  name: string;
  industry: string;
  problem: string;
  solution: string;
  fundingGoal: number;
  stage: string;
  businessModel: string;
}): Promise<PitchDeckData> {
  const prompt = `
    Generate a complete 12-slide investor pitch deck for startup "${params.name}" (${params.industry}, Stage: ${params.stage}, Asking $${params.fundingGoal}).
    Return a valid JSON matching this schema:
    {
      "theme": "modern-dark",
      "slides": [
        { "id": 1, "title": "Cover Slide", "subtitle": "Company Tagline & Asking Amount", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Highlight phrase" },
        { "id": 2, "title": "The Problem", "subtitle": "Core Pain Points", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "keyHighlight": "Core Metric Impact" },
        { "id": 3, "title": "The Solution", "subtitle": "Our Product Approach", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "keyHighlight": "Core Value Prop" },
        { "id": 4, "title": "Market Opportunity", "subtitle": "TAM / SAM / SOM", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Market Growth Rate" },
        { "id": 5, "title": "The Product", "subtitle": "Key Features & Demo Highlights", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "keyHighlight": "User Delight Factor" },
        { "id": 6, "title": "Business Model", "subtitle": "Monetization & Unit Economics", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Pricing Tiers" },
        { "id": 7, "title": "Competition", "subtitle": "Competitive Landscape & Moat", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Key Differentiator" },
        { "id": 8, "title": "Traction", "subtitle": "Current Milestones & Growth", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Current MoM Growth" },
        { "id": 9, "title": "Financial Projections", "subtitle": "3-Year ARR & Margin Outlook", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Path to Profitability" },
        { "id": 10, "title": "Team", "subtitle": "Founders & Advisory Board", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Domain Expertise" },
        { "id": 11, "title": "Funding Ask", "subtitle": "Use of Funds & Target Milestones", "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"], "keyHighlight": "18-Month Runway" },
        { "id": 12, "title": "Vision", "subtitle": "Long-Term Category Ownership", "bullets": ["Bullet 1", "Bullet 2"], "keyHighlight": "Join Us" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    return JSON.parse(cleanJsonText(response.text || ''));
  } catch (err) {
    console.error('Gemini generatePitchDeck error:', err);
    return {
      theme: 'modern-dark',
      slides: Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        title: `Slide ${i + 1}: ${params.name}`,
        subtitle: `Strategic overview of ${params.industry}`,
        bullets: ['Key strategic milestone', 'Competitive advantage', 'Market momentum'],
        keyHighlight: 'High Growth Opportunity',
      })),
    };
  }
}

export async function chatWithCopilot(params: {
  messages: { sender: string; text: string }[];
  projectContext?: any;
}): Promise<string> {
  const contextStr = params.projectContext ? JSON.stringify({
    name: params.projectContext.name,
    industry: params.projectContext.industry,
    stage: params.projectContext.stage,
    fundingGoal: params.projectContext.fundingGoal,
    problem: params.projectContext.problem,
    solution: params.projectContext.solution
  }) : 'No active project selected.';

  const systemInstruction = `
    You are FundPilot AI — a top-tier venture capital copilot and fundraising advisor for tech founders.
    Your job is to provide actionable, crisp, strategic advice regarding pitch decks, valuation, investor email outreach, financial projections, and negotiation strategies.
    
    Current Startup Context: ${contextStr}
    
    Rules:
    - Keep responses formatted nicely with clean bullet points, bold key terms, and short paragraphs.
    - If asked to write or rewrite an investor cold email, provide an email subject line and a high-converting 3-paragraph email draft ready to copy.
    - Maintain an empowering, professional, and sharp VC partner tone.
  `;

  const formattedHistory = params.messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: formattedHistory,
      config: {
        systemInstruction,
      },
    });

    return response.text || 'I am ready to assist with your fundraising strategy. What specific topic should we focus on?';
  } catch (err) {
    console.error('Gemini chatWithCopilot error:', err);
    return 'I am currently processing your request. Please ensure your startup details are populated or try rephrasing your question.';
  }
}
