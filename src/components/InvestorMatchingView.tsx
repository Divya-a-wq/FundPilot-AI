import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Sparkles, 
  Mail, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Building, 
  DollarSign, 
  RefreshCw,
  Copy,
  Check,
  ChevronRight
} from 'lucide-react';
import { StartupProject, InvestorMatch } from '../types';

interface InvestorMatchingViewProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onNavigateNext: () => void;
}

export const InvestorMatchingView: React.FC<InvestorMatchingViewProps> = ({
  project,
  onUpdateProject,
  onNavigateNext
}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorMatch | null>(null);
  const [copied, setCopied] = useState(false);
  const [generatingEmail, setGeneratingEmail] = useState(false);

  const matches: InvestorMatch[] = project.investorMatches || [
    {
      id: 'inv-1',
      fundName: 'Apex Venture Partners',
      partnerName: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      logo: 'Apex',
      stages: ['Seed', 'Series A'],
      checkSizeMin: 500000,
      checkSizeMax: 2500000,
      industries: ['B2B SaaS', 'AI/ML', 'DevTools'],
      geographies: ['North America', 'Remote'],
      notablePortfolio: ['Datadog', 'Figma', 'Vercel'],
      bio: 'Investing early in intelligent enterprise software and automated workflows with high developer love.',
      website: 'https://apexvc.example.com',
      contactEmail: 's.jenkins@apexvc.example.com',
      matchScore: 96,
      matchReasoning: [
        'Active mandate in B2B AI SaaS',
        'Check size ($500k-$2.5M) fits $1.5M Seed ask perfectly',
        'Recent leading deal in automated revenue tools'
      ],
      outreachStatus: 'Not Contacted'
    },
    {
      id: 'inv-2',
      fundName: 'Frontier Capital',
      partnerName: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      logo: 'Frontier',
      stages: ['Pre-Seed', 'Seed'],
      checkSizeMin: 250000,
      checkSizeMax: 1000000,
      industries: ['AI/ML', 'FinTech', 'B2B SaaS'],
      geographies: ['Global'],
      notablePortfolio: ['Ramp', 'Notion', 'Retool'],
      bio: 'Focusing on technical founders leveraging generative AI for domain-specific automation.',
      website: 'https://frontiercap.example.com',
      contactEmail: 'mchen@frontiercap.example.com',
      matchScore: 91,
      matchReasoning: [
        'High density of AI SaaS portfolio companies',
        'Global check placement experience',
        'First-check investor willing to lead Seed'
      ],
      outreachStatus: 'Not Contacted'
    },
    {
      id: 'inv-3',
      fundName: 'Sequoia Speed Fund',
      partnerName: 'David Zhang',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      logo: 'Sequoia',
      stages: ['Seed', 'Series A'],
      checkSizeMin: 1000000,
      checkSizeMax: 4000000,
      industries: ['Enterprise Software', 'AI Agents'],
      geographies: ['North America'],
      notablePortfolio: ['Stripe', 'HubSpot', 'Linear'],
      bio: 'Partnering with category-defining founders transforming B2B workflows.',
      website: 'https://sequoia.example.com',
      contactEmail: 'david.zhang@sequoia.example.com',
      matchScore: 88,
      matchReasoning: [
        'Top tier brand validation for follow-on Series A',
        'Strong network of VP Sales customer introductions'
      ],
      outreachStatus: 'Not Contacted'
    },
    {
      id: 'inv-[4]',
      fundName: 'Operator Guild Angels',
      partnerName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      logo: 'OG Angels',
      stages: ['Pre-Seed', 'Seed'],
      checkSizeMin: 50000,
      checkSizeMax: 200000,
      industries: ['B2B SaaS', 'Sales Tech'],
      geographies: ['Global'],
      notablePortfolio: ['Gong alumni Syndicate', 'Apollo'],
      bio: 'Ex-VP Sales at Salesforce turned angel investor backing revenue infrastructure.',
      website: 'https://operatorguild.example.com',
      contactEmail: 'elena@operatorguild.example.com',
      matchScore: 85,
      matchReasoning: [
        'Direct domain expertise in Sales Ops & Gong ecosystem',
        'High value angel advisor for early customer pipeline'
      ],
      outreachStatus: 'Not Contacted'
    }
  ];

  const handleRegenerateMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/investors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: project.name,
          industry: project.industry,
          fundingGoal: project.fundingGoal,
          stage: project.stage
        }),
      });
      const data = await res.json();
      if (res.ok && data.investorMatches) {
        onUpdateProject({ investorMatches: data.investorMatches });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateColdEmail = async (inv: InvestorMatch) => {
    setSelectedInvestor(inv);
    setGeneratingEmail(true);

    try {
      const res = await fetch('/api/ai/outreach-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startupName: project.name,
          tagline: project.tagline,
          industry: project.industry,
          fundingGoal: project.fundingGoal,
          problem: project.problem,
          solution: project.solution,
          investorName: inv.partnerName,
          fundName: inv.fundName
        }),
      });
      const data = await res.json();
      if (res.ok && data.emailDraft) {
        const updatedMatches = matches.map(m => 
          m.id === inv.id ? { ...m, customEmailDraft: data.emailDraft, outreachStatus: 'Email Drafted' as const } : m
        );
        onUpdateProject({ investorMatches: updatedMatches });
        setSelectedInvestor({ ...inv, customEmailDraft: data.emailDraft, outreachStatus: 'Email Drafted' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingEmail(false);
    }
  };

  const handleUpdateStatus = (invId: string, status: 'Not Contacted' | 'Email Drafted' | 'In Conversation' | 'Passed') => {
    const updatedMatches = matches.map(m => m.id === invId ? { ...m, outreachStatus: status } : m);
    onUpdateProject({ investorMatches: updatedMatches });
    if (selectedInvestor?.id === invId) {
      setSelectedInvestor({ ...selectedInvestor, outreachStatus: status });
    }
  };

  const handleCopyEmail = () => {
    if (selectedInvestor?.customEmailDraft) {
      navigator.clipboard.writeText(selectedInvestor.customEmailDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredMatches = matches.filter(m => {
    const matchesSearch = m.fundName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.industries.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStage = selectedStage === 'All' || m.stages.includes(selectedStage as any);
    return matchesSearch && matchesStage;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>AI Investor Matching Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">VC & Angel Investor Radar</h2>
          <p className="text-xs text-slate-400">
            Target Raise: ${project.fundingGoal.toLocaleString()} • Stage: {project.stage} • Sector: {project.industry}
          </p>
        </div>

        <button
          onClick={handleRegenerateMatches}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
          Refresh Investor Database
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search venture funds, partners, or sectors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          {['All', 'Pre-Seed', 'Seed', 'Series A'].map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedStage === stg
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>
      </div>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((inv) => (
          <div
            key={inv.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Partner Avatar & Match Score Badge */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={inv.avatar}
                    alt={inv.partnerName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-white">{inv.partnerName}</h3>
                    <p className="text-xs text-indigo-400 font-semibold">{inv.fundName}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
                    {inv.matchScore}% Match
                  </div>
                  <span className={`text-[10px] font-bold mt-1 ${
                    inv.outreachStatus === 'In Conversation' ? 'text-cyan-400' :
                    inv.outreachStatus === 'Email Drafted' ? 'text-indigo-400' : 'text-slate-500'
                  }`}>
                    {inv.outreachStatus}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">{inv.bio}</p>

              {/* Key Details Strip */}
              <div className="grid grid-cols-2 gap-2 my-3 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Target Check Size</div>
                  <div className="font-bold text-white">
                    ${(inv.checkSizeMin/1000).toFixed(0)}k - ${(inv.checkSizeMax/1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Notable Deals</div>
                  <div className="font-bold text-slate-200 truncate">{inv.notablePortfolio.join(', ')}</div>
                </div>
              </div>

              {/* Match Reasoning */}
              <div className="space-y-1 bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/20 text-[11px]">
                <div className="font-bold text-indigo-300 mb-0.5">Why FundPilot AI matched this VC:</div>
                {inv.matchReasoning.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleGenerateColdEmail(inv)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Draft Cold Pitch Email
              </button>

              <select
                value={inv.outreachStatus || 'Not Contacted'}
                onChange={e => handleUpdateStatus(inv.id, e.target.value as any)}
                className="py-2.5 px-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none"
              >
                <option value="Not Contacted">Not Contacted</option>
                <option value="Email Drafted">Email Drafted</option>
                <option value="In Conversation">In Conversation</option>
                <option value="Passed">Passed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Cold Email Outreach Drawer/Modal */}
      {selectedInvestor && selectedInvestor.customEmailDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Outreach Copilot</span>
                <h3 className="text-xl font-extrabold text-white">
                  Cold Intro to {selectedInvestor.partnerName} ({selectedInvestor.fundName})
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvestor(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {generatingEmail ? (
              <div className="py-12 text-center text-xs text-indigo-300 space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-400" />
                <p>Gemini 3.6 Flash synthesizing tailored investor narrative...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>To: {selectedInvestor.contactEmail}</span>
                    <span>Subject: Seed Round / AuraScale AI (34% MoM Growth)</span>
                  </div>
                  <textarea
                    rows={10}
                    value={selectedInvestor.customEmailDraft}
                    onChange={e => {
                      const updated = { ...selectedInvestor, customEmailDraft: e.target.value };
                      setSelectedInvestor(updated);
                      const updatedMatches = matches.map(m => m.id === selectedInvestor.id ? updated : m);
                      onUpdateProject({ investorMatches: updatedMatches });
                    }}
                    className="w-full bg-transparent text-xs text-slate-200 leading-relaxed focus:outline-none font-mono resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Email Text'}
                  </button>

                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedInvestor.id, 'In Conversation');
                      setSelectedInvestor(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Mark as Sent
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={onNavigateNext}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          Open 24/7 AI Copilot Chat Assistant
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
