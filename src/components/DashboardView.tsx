import React from 'react';
import { 
  Rocket, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Presentation, 
  Download, 
  ChevronRight, 
  AlertCircle,
  BarChart3,
  Flame,
  Clock,
  ShieldAlert,
  FileText,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { StartupProject } from '../types';
import { downloadProjectPDF } from '../lib/pdfGenerator';

interface DashboardViewProps {
  project: StartupProject;
  onNavigate: (tab: string) => void;
  onRunAiAnalysis: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  project,
  onNavigate,
  onRunAiAnalysis
}) => {
  const financialData = project.financialModel?.projections.map(p => ({
    name: `Year ${p.year}`,
    Revenue: p.revenue,
    GrossProfit: p.grossProfit,
    NetIncome: p.netIncome,
    Cash: p.endingCashBalance
  })) || [
    { name: 'Year 1', Revenue: 384000, GrossProfit: 330240, NetIncome: -431760, Cash: 518240 },
    { name: 'Year 2', Revenue: 1680000, GrossProfit: 1461600, NetIncome: -2400, Cash: 1215840 },
    { name: 'Year 3', Revenue: 5420000, GrossProfit: 4769600, NetIncome: 1829600, Cash: 3045440 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      
      {/* Top Banner Card */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Active Startup Copilot Session</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {project.tagline} • <span className="text-indigo-400 font-semibold">{project.industry}</span> • Seeking <span className="text-emerald-400 font-bold">${project.fundingGoal.toLocaleString()} {project.currency}</span> ({project.stage} Stage)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('wizard')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Run AI Copilot Analysis
            </button>
            <button
              onClick={() => downloadProjectPDF(project, 'package')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Download Deck & Package
            </button>
          </div>
        </div>
      </div>

      {/* Main Score Gauges & Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Startup Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Startup Health</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Rocket className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-white">{project.startupScore} <span className="text-xs font-normal text-slate-400">/ 100</span></div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full" style={{ width: `${project.startupScore}%` }} />
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Top 8% compared to Seed peers</span>
        </div>

        {/* Funding Readiness */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Funding Readiness</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-cyan-400">{project.fundingReadinessScore} <span className="text-xs font-normal text-slate-400">/ 100</span></div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full" style={{ width: `${project.fundingReadinessScore}%` }} />
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Deck & Financials 90% verified</span>
        </div>

        {/* Monthly Burn Rate & Runway */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Burn & Runway</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-white">
              {project.financialModel?.runwayMonths || 14.5} <span className="text-xs font-normal text-slate-400">Months</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Monthly Burn: <span className="text-amber-400 font-semibold">${(project.financialModel?.projections[0]?.monthlyBurnRate || 35980).toLocaleString()}/mo</span>
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Comfortable Seed Horizon</span>
        </div>

        {/* Investor Matches */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">VC Matches</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-purple-400">
              {project.investorMatches?.length || 5} <span className="text-xs font-normal text-slate-400">High Match</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Top Match: <span className="text-white font-semibold">Apex Venture Partners</span>
            </div>
          </div>
          <button onClick={() => onNavigate('investors')} className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1">
            View Matches <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Main Content Area: Financial Forecast & Quick Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive 3-Year P&L Forecast Graph */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                3-Year Revenue & Net Income Trajectory
              </h3>
              <p className="text-xs text-slate-400">Automated Financial Projections ($ USD)</p>
            </div>
            <button
              onClick={() => onNavigate('financials')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 transition-colors"
            >
              Edit Model Assumptions
            </button>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="Revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                <Area type="monotone" dataKey="GrossProfit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
            <div>
              <div className="text-[10px] text-slate-400">Year 1 ARR</div>
              <div className="text-sm font-bold text-white">${(project.financialModel?.projections[0]?.revenue || 384000).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Year 2 ARR</div>
              <div className="text-sm font-bold text-white">${(project.financialModel?.projections[1]?.revenue || 1680000).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Year 3 ARR</div>
              <div className="text-sm font-bold text-indigo-400">${(project.financialModel?.projections[2]?.revenue || 5420000).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Copilot Shortcuts & Executive Radar */}
        <div className="space-y-4">
          
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Fundraising Hub Shortcuts</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('wizard')}
                className="w-full p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">1</div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-indigo-300">Executive Summary</div>
                    <div className="text-[10px] text-slate-400">Problem validation & moat</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('market')}
                className="w-full p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">2</div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-cyan-300">Market Research</div>
                    <div className="text-[10px] text-slate-400">TAM / SAM / SOM calculation</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('competitors')}
                className="w-full p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">3</div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-purple-300">Competitors Matrix</div>
                    <div className="text-[10px] text-slate-400">2x2 Positioning graph</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('pitch')}
                className="w-full p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">4</div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-300">12-Slide Pitch Deck</div>
                    <div className="text-[10px] text-slate-400">Interactive slide presentation</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* AI Copilot Advisor Prompt Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/90 to-purple-950/90 border border-indigo-500/30 text-white space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
              <MessageSquare className="w-4 h-4" />
              Ask AI Copilot
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Need help estimating your valuation or drafting a cold investor intro email?"
            </p>
            <button
              onClick={() => onNavigate('chat')}
              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              Open AI Chat Assistant
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
