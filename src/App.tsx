import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { StartupAnalysisWizard } from './components/StartupAnalysisWizard';
import { MarketResearchView } from './components/MarketResearchView';
import { CompetitorIntelView } from './components/CompetitorIntelView';
import { FinancialModelView } from './components/FinancialModelView';
import { PitchDeckView } from './components/PitchDeckView';
import { InvestorMatchingView } from './components/InvestorMatchingView';
import { CopilotChatView } from './components/CopilotChatView';
import { SettingsView } from './components/SettingsView';
import { User, StartupProject, NotificationItem } from './types';
import { Search, Rocket, Sparkles, FolderOpen, ArrowRight, X } from 'lucide-react';

const DEFAULT_PROJECT: StartupProject = {
  id: 'proj_demo_1',
  userId: 'usr_demo_1',
  name: 'AuraScale AI',
  tagline: 'Autonomous AI Copilot for Enterprise Revenue Operations',
  industry: 'B2B SaaS / Generative AI',
  stage: 'Seed',
  fundingGoal: 1500000,
  currency: 'USD',
  country: 'United States',
  problem: 'Enterprise RevOps teams spend 20+ hours weekly manually reconciling CRM deals, synthesizing buyer intent signals, and creating pitch decks.',
  solution: 'AuraScale AI integrates with Salesforce, Gong, and Hubspot to automate deal intelligence, predictive forecasts, and instant investor collateral generation.',
  targetCustomer: 'Mid-market & enterprise B2B SaaS sales teams ($10M-$100M ARR)',
  businessModel: 'B2B Annual SaaS Subscription ($24,000 / year / seat)',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  startupScore: 88,
  fundingReadinessScore: 82,
  executiveSummary: {
    overview: 'AuraScale AI is an autonomous enterprise RevOps copilot that eliminates manual sales friction.',
    problemValidation: {
      description: 'Critical revenue data leak and 20+ hours wasted per rep weekly.',
      painPointSeverity: 'High',
      affectedMarketSize: '$28.5 Billion B2B CRM Market'
    },
    solutionRefinement: {
      coreValueProps: ['Automated deal intelligence', 'Real-time sales velocity analytics', 'Instant investor & client deck generation'],
      technicalMoat: 'Proprietary fine-tuned RevOps LLM routing architecture',
      keyFeatures: ['CRM Auto-Sync', 'Predictive Deal Scoring', 'AI Pitch Deck Builder']
    },
    uniqueValueProposition: '10x faster RevOps workflow automation with zero manual data entry.',
    swotAnalysis: {
      strengths: ['Experienced founder team', 'Proprietary data pipeline', '34% MoM organic growth'],
      weaknesses: ['Early sales team headcount', 'Enterprise sales cycle length'],
      opportunities: ['Global RevOps expansion', 'FinTech platform partnerships'],
      threats: ['Legacy CRM incumbents adding AI features']
    },
    risks: [
      { category: 'Execution', risk: 'Scaling enterprise sales reps', mitigation: 'Hiring VP Sales from Gong', severity: 'Medium' }
    ]
  },
  marketResearch: {
    tam: 28500000000,
    sam: 6400000000,
    som: 850000000,
    tamFormatted: '$28.5B',
    samFormatted: '$6.4B',
    somFormatted: '$850M',
    cagr: 21.4,
    marketTrends: [
      'Shift toward Agentic AI workflows in B2B enterprise software',
      'Consolidation of fragmented RevOps tool stacks',
      'Demand for real-time buyer intent intelligence'
    ],
    targetSegments: [
      { name: 'Enterprise SaaS RevOps', demographics: 'Companies with 50-500 sales reps', willingnessToPay: '$2,000/mo', sizePercentage: 45 },
      { name: 'High-Growth Tech Startups', demographics: 'Series A-C VC-backed tech startups', willingnessToPay: '$800/mo', sizePercentage: 35 }
    ],
    geographicOpportunities: [
      { region: 'North America', marketSharePotential: '60%', growthDriver: 'High AI SaaS adoption' },
      { region: 'Europe (UK & DACH)', marketSharePotential: '25%', growthDriver: 'Strict RevOps compliance automation' }
    ]
  },
  financialModel: {
    assumptions: {
      initialCash: 350000,
      monthlyGrowthRate: 15,
      churnRate: 2.5,
      avgDealSizeMonthly: 2000,
      cac: 4500,
      initialTeamCount: 4,
      avgSalaryMonthly: 8500,
      marketingSpendMonthly: 12000
    },
    runwayMonths: 18,
    breakEvenMonth: 14,
    requiredCapital: 1500000,
    projections: [
      {
        year: 2025,
        revenue: 480000,
        costOfGoodsSold: 72000,
        grossProfit: 408000,
        operatingExpenses: { salaries: 380000, marketing: 120000, softwareAndInfra: 45000, officeAndAdmin: 20000, legalAndOther: 15000 },
        totalOpEx: 580000,
        netIncome: -172000,
        endingCashBalance: 1178000,
        monthlyBurnRate: 28000,
        headcount: 6,
        payingCustomers: 32,
        arpu: 2000
      },
      {
        year: 2026,
        revenue: 2150000,
        costOfGoodsSold: 280000,
        grossProfit: 1870000,
        operatingExpenses: { salaries: 950000, marketing: 320000, softwareAndInfra: 90000, officeAndAdmin: 40000, legalAndOther: 30000 },
        totalOpEx: 1430000,
        netIncome: 440000,
        endingCashBalance: 1618000,
        monthlyBurnRate: -36000,
        headcount: 14,
        payingCustomers: 120,
        arpu: 2200
      },
      {
        year: 2027,
        revenue: 6800000,
        costOfGoodsSold: 750000,
        grossProfit: 6050000,
        operatingExpenses: { salaries: 2400000, marketing: 850000, softwareAndInfra: 220000, officeAndAdmin: 80000, legalAndOther: 60000 },
        totalOpEx: 3610000,
        netIncome: 2440000,
        endingCashBalance: 4058000,
        monthlyBurnRate: -203000,
        headcount: 28,
        payingCustomers: 340,
        arpu: 2400
      }
    ],
    useOfFunds: [
      { category: 'Engineering & Product AI', percentage: 45, amount: 675000 },
      { category: 'Sales & Go-To-Market', percentage: 35, amount: 525000 },
      { category: 'Operations & Legal', percentage: 20, amount: 300000 }
    ]
  }
};

const DEFAULT_USER: User = {
  id: 'usr_demo_1',
  email: 'founder@fundpilot.ai',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'founder',
  companyName: 'AuraScale AI',
  plan: 'pro',
  createdAt: new Date().toISOString()
};

export default function App() {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [projects, setProjects] = useState<StartupProject[]>([DEFAULT_PROJECT]);
  const [currentProject, setCurrentProject] = useState<StartupProject | null>(DEFAULT_PROJECT);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Investor Match Alert',
      message: 'Apex Venture Partners matched with 96% confidence score.',
      time: '10m ago',
      type: 'funding',
      read: false
    },
    {
      id: 'n-2',
      title: 'Financial Model Updated',
      message: 'Break-even forecast calculated at Month 14.',
      time: '1h ago',
      type: 'ai',
      read: false
    }
  ]);

  // Keyboard shortcut for Cmd+K Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateProject = (updated: Partial<StartupProject>) => {
    if (!currentProject) return;
    const merged = { ...currentProject, ...updated, updatedAt: new Date().toISOString() };
    setCurrentProject(merged);
    setProjects(prev => prev.map(p => p.id === merged.id ? merged : p));

    // Save to server
    fetch(`/api/projects/${merged.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged)
    }).catch(err => console.error(err));
  };

  const handleCreateNewProject = () => {
    setActiveTab('wizard');
  };

  const handleLoginSuccess = (usr: User) => {
    setUser(usr);
    setAuthModalOpen(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      
      {/* Top Sticky Header Navbar */}
      <Navbar
        user={user}
        projects={projects}
        currentProject={currentProject}
        onSelectProject={(p) => {
          setCurrentProject(p);
          setActiveTab('dashboard');
        }}
        onNewProject={handleCreateNewProject}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenSearch={() => setSearchModalOpen(true)}
        notifications={notifications}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      {/* Main App Content Router */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Landing Page (Public / Default when logged out or requested) */}
        {activeTab === 'landing' && (
          <LandingPage
            onGetStarted={() => {
              if (user) {
                setActiveTab('wizard');
              } else {
                setAuthModalOpen(true);
              }
            }}
            onLogin={() => setAuthModalOpen(true)}
          />
        )}

        {/* Startup Wizard (Multi-step Creation & Analysis) */}
        {activeTab === 'wizard' && (
          <StartupAnalysisWizard
            onComplete={(newProj) => {
              const fullProj = { ...DEFAULT_PROJECT, ...newProj, id: `proj_${Date.now()}` };
              setProjects(prev => [fullProj, ...prev]);
              setCurrentProject(fullProj);
              if (!user) setUser(DEFAULT_USER);
              setActiveTab('dashboard');
            }}
            onCancel={() => setActiveTab(user ? 'dashboard' : 'landing')}
          />
        )}

        {/* Main Dashboard Hub */}
        {activeTab === 'dashboard' && currentProject && (
          <DashboardView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Market Research TAM/SAM/SOM View */}
        {activeTab === 'market' && currentProject && (
          <MarketResearchView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigateNext={() => setActiveTab('competitors')}
          />
        )}

        {/* Competitor Intel View */}
        {activeTab === 'competitors' && currentProject && (
          <CompetitorIntelView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigateNext={() => setActiveTab('financials')}
          />
        )}

        {/* Financial Model Projections View */}
        {activeTab === 'financials' && currentProject && (
          <FinancialModelView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigateNext={() => setActiveTab('pitch')}
          />
        )}

        {/* Pitch Deck Generator View */}
        {activeTab === 'pitch' && currentProject && (
          <PitchDeckView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigateNext={() => setActiveTab('investors')}
          />
        )}

        {/* Investor Matching View */}
        {activeTab === 'investors' && currentProject && (
          <InvestorMatchingView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigateNext={() => setActiveTab('chat')}
          />
        )}

        {/* 24/7 AI Copilot Chat View */}
        {activeTab === 'chat' && currentProject && (
          <CopilotChatView
            project={currentProject}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {/* Settings & Team View */}
        {activeTab === 'settings' && currentProject && (
          <SettingsView
            user={user}
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onUpdateUser={(updated) => setUser(user ? { ...user, ...updated } : null)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Command Palette / Search Modal (⌘K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 space-y-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tools, pitch deck slides, market data, or ask copilot..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button onClick={() => setSearchModalOpen(false)} className="text-slate-500 hover:text-white text-xs">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto">
              {[
                { label: '📊 Executive Summary & AI Audit', tab: 'dashboard', category: 'Copilot' },
                { label: '📈 TAM / SAM / SOM Market Analysis', tab: 'market', category: 'Market' },
                { label: '⚔️ Competitor Positioning Matrix', tab: 'competitors', category: 'Intelligence' },
                { label: '💰 3-Year Financial Model & Assumptions', tab: 'financials', category: 'Finance' },
                { label: '🖼️ Pitch Deck Generator & Slides', tab: 'pitch', category: 'Pitch' },
                { label: '🤝 Investor Radar & Cold Email Drafts', tab: 'investors', category: 'Investors' },
                { label: '💬 24/7 Co-Founder Chat Assistant', tab: 'chat', category: 'AI Chat' },
              ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setSearchModalOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl text-left text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-indigo-400 font-semibold">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
