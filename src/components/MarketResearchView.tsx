import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Globe, 
  Users, 
  Sparkles, 
  RefreshCw, 
  ArrowRight 
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { StartupProject, MarketResearchData } from '../types';

interface MarketResearchViewProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onNavigateNext: () => void;
}

export const MarketResearchView: React.FC<MarketResearchViewProps> = ({
  project,
  onUpdateProject,
  onNavigateNext
}) => {
  const [loading, setLoading] = useState(false);

  const market: MarketResearchData = project.marketResearch || {
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
      'Increasing demand for tight revenue forecasting accuracy'
    ],
    targetSegments: [
      { name: 'Mid-Market B2B SaaS', demographics: '$5M - $50M ARR', willingnessToPay: 'High', sizePercentage: 55 },
      { name: 'High-Growth Startups', demographics: 'Series A/B', willingnessToPay: 'Medium', sizePercentage: 30 },
      { name: 'Enterprise Tech', demographics: '$50M+ ARR', willingnessToPay: 'Very High', sizePercentage: 15 }
    ],
    geographicOpportunities: [
      { region: 'North America', marketSharePotential: '60%', growthDriver: 'Early tech adoption & high sales rep compensation' },
      { region: 'Europe', marketSharePotential: '25%', growthDriver: 'Demand for automated enterprise software' },
      { region: 'Asia-Pacific', marketSharePotential: '15%', growthDriver: 'Accelerating digital transformation' }
    ]
  };

  const pieData = [
    { name: 'TAM (Total Market)', value: market.tam, formatted: market.tamFormatted, color: '#6366f1' },
    { name: 'SAM (Serviceable Market)', value: market.sam, formatted: market.samFormatted, color: '#06b6d4' },
    { name: 'SOM (Obtainable Target)', value: market.som, formatted: market.somFormatted, color: '#10b981' }
  ];

  const handleRegenerateMarket = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/market-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: project.name,
          industry: project.industry,
          targetCustomer: project.targetCustomer,
          country: project.country
        }),
      });
      const data = await res.json();
      if (res.ok && data.marketResearch) {
        onUpdateProject({ marketResearch: data.marketResearch });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Market Opportunity Analysis</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">TAM, SAM, SOM & Growth Dynamics</h2>
          <p className="text-xs text-slate-400">Industry: {project.industry} • Target: {project.targetCustomer}</p>
        </div>

        <button
          onClick={handleRegenerateMarket}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          Re-Analyze Market
        </button>
      </div>

      {/* Top 3 Market Sizing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">TAM (Total Addressable)</span>
          <div className="text-3xl font-extrabold text-white mt-2">{market.tamFormatted}</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Overall global market expenditure across all enterprise software segments.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">SAM (Serviceable Addressable)</span>
          <div className="text-3xl font-extrabold text-white mt-2">{market.samFormatted}</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Target market segment fitting product, region, and buyer criteria.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SOM (Obtainable Target)</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">{market.somFormatted}</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Realistic market share capture achievable within 3-5 years ({market.cagr}% CAGR).
          </p>
        </div>
      </div>

      {/* Visual Market Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TAM / SAM / SOM Donut Chart */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-indigo-400" />
            Market Sizing Proportion
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any, name: any, item: any) => [item.payload.formatted, item.payload.name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {pieData.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </span>
                <span className="font-bold text-white">{p.formatted}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Segments & Demographics */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Target Customer Personas & Size
          </h3>
          <div className="space-y-3">
            {market.targetSegments.map((seg, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{seg.name}</span>
                  <span className="text-indigo-400">{seg.sizePercentage}% of SOM</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{seg.demographics}</span>
                  <span className="text-emerald-400 font-medium">{seg.willingnessToPay} WTP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Market Trends & Geographic Expansion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Macro Industry Trends</h3>
          <div className="space-y-2">
            {market.marketTrends.map((trend, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{trend}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Geographic Opportunities
          </h3>
          <div className="space-y-2">
            {market.geographicOpportunities.map((geo, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{geo.region}</div>
                  <div className="text-[10px] text-slate-400">{geo.growthDriver}</div>
                </div>
                <span className="font-extrabold text-cyan-400">{geo.marketSharePotential}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNavigateNext}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          Continue to Competitor Intelligence
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
