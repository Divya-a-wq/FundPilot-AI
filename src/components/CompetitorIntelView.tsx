import React, { useState } from 'react';
import { 
  Users, 
  Check, 
  X, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { StartupProject, CompetitorData } from '../types';

interface CompetitorIntelViewProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onNavigateNext: () => void;
}

export const CompetitorIntelView: React.FC<CompetitorIntelViewProps> = ({
  project,
  onUpdateProject,
  onNavigateNext
}) => {
  const [loading, setLoading] = useState(false);

  const compData: CompetitorData = project.competitors || {
    competitors: [
      { id: 'c1', name: 'Gong.io', fundingRaised: '$584M', estimatedValuation: '$7.2B', strengths: ['Brand leader', 'Deep audio tech'], weaknesses: ['Expensive', 'Static reporting'], priceRange: '$$$$', xPosition: 85, yPosition: 80 },
      { id: 'c2', name: 'Clari', fundingRaised: '$495M', estimatedValuation: '$2.6B', strengths: ['Enterprise pipeline tracking'], weaknesses: ['Clunky UI', 'Complex setup'], priceRange: '$$$$', xPosition: 90, yPosition: 65 },
      { id: 'c3', name: `${project.name} (Us)`, fundingRaised: 'Seed Stage', estimatedValuation: '$8M', strengths: ['Proactive AI agent', '5-min setup', 'Modern sleek UX'], weaknesses: ['New brand'], priceRange: '$$', xPosition: 40, yPosition: 92 },
      { id: 'c4', name: 'HubSpot Breeze', fundingRaised: 'Public', estimatedValuation: '$30B+', strengths: ['Built-in CRM'], weaknesses: ['Basic generic AI prompts'], priceRange: '$$', xPosition: 35, yPosition: 45 }
    ],
    featureComparisonMatrix: [
      { featureName: 'Real-time Autonomous Deal Execution', ourProduct: true, competitorA: false, competitorB: false, competitorC: false },
      { featureName: 'AI Multi-Channel Intent Graph', ourProduct: true, competitorA: true, competitorB: false, competitorC: false },
      { featureName: 'Zero-Friction 5-Minute Setup', ourProduct: true, competitorA: false, competitorB: false, competitorC: true },
      { featureName: 'Bi-Directional Automated CRM Sync', ourProduct: true, competitorA: true, competitorB: true, competitorC: true },
      { featureName: 'Custom Fine-Tuned Deal Playbooks', ourProduct: true, competitorA: false, competitorB: false, competitorC: false }
    ],
    competitivePositioningSummary: `${project.name} sits in the optimal high-value, fast-implementation quadrant. While incumbents charge high enterprise fees for static reports, we provide an active execution copilot at a fraction of the cost.`
  };

  const scatterData = compData.competitors.map(c => ({
    x: c.xPosition,
    y: c.yPosition,
    name: c.name,
    isUs: c.name.includes('(Us)') || c.name === project.name
  }));

  const handleRegenerateCompetitors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: project.name,
          industry: project.industry,
          solution: project.solution
        }),
      });
      const data = await res.json();
      if (res.ok && data.competitors) {
        onUpdateProject({ competitors: data.competitors });
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Competitor Intelligence Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Market Positioning & Moat Analysis</h2>
        </div>

        <button
          onClick={handleRegenerateCompetitors}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${loading ? 'animate-spin' : ''}`} />
          Re-Analyze Competitors
        </button>
      </div>

      {/* 2x2 Positioning Matrix Graph */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">2x2 Competitive Positioning Matrix</h3>
            <p className="text-xs text-slate-400">X-Axis: Price/Setup Complexity • Y-Axis: AI Feature Completeness</p>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
            High Feature / Low Friction Winner
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" dataKey="x" name="Price/Complexity" domain={[0, 100]} stroke="#64748b" fontSize={11}>
                <Label value="Price & Complexity (High →)" offset={-10} position="insideBottom" fill="#64748b" fontSize={10} />
              </XAxis>
              <YAxis type="number" dataKey="y" name="Feature Completeness" domain={[0, 100]} stroke="#64748b" fontSize={11}>
                <Label value="Feature Richness (High ↑)" angle={-90} position="insideLeft" fill="#64748b" fontSize={10} />
              </YAxis>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val, name, item) => [`Score: ${val}`, item.payload.name]}
              />
              <Scatter name="Competitors" data={scatterData} fill="#818cf8">
                {scatterData.map((entry, index) => (
                  <circle
                    key={`c-${index}`}
                    cx={0}
                    cy={0}
                    r={entry.isUs ? 10 : 6}
                    fill={entry.isUs ? '#10b981' : '#6366f1'}
                    stroke={entry.isUs ? '#6ee7b7' : '#818cf8'}
                    strokeWidth={2}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-950 border border-slate-800 italic">
          "{compData.competitivePositioningSummary}"
        </p>
      </div>

      {/* Competitor Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {compData.competitors.map((comp) => {
          const isUs = comp.name.includes('(Us)') || comp.name === project.name;
          return (
            <div 
              key={comp.id} 
              className={`p-6 rounded-3xl bg-slate-900/80 border transition-all ${
                isUs ? 'border-emerald-500/50 shadow-xl shadow-emerald-500/10' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-extrabold ${isUs ? 'text-emerald-400' : 'text-white'}`}>
                  {comp.name}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{comp.priceRange}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Funding</div>
                  <div className="font-bold text-slate-200">{comp.fundingRaised}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Valuation</div>
                  <div className="font-bold text-indigo-300">{comp.estimatedValuation}</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-emerald-400 font-bold">Strengths:</span> {comp.strengths.join(', ')}
                </div>
                <div>
                  <span className="text-rose-400 font-bold">Weaknesses:</span> {comp.weaknesses.join(', ')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Feature Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold">
                <th className="py-3 px-4">Key Feature Capability</th>
                <th className="py-3 px-4 text-emerald-400 font-extrabold">{project.name} (Us)</th>
                <th className="py-3 px-4">Incumbent A</th>
                <th className="py-3 px-4">Incumbent B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {compData.featureComparisonMatrix.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-medium text-slate-200">{f.featureName}</td>
                  <td className="py-3 px-4">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </td>
                  <td className="py-3 px-4">
                    {f.competitorA ? <Check className="w-4 h-4 text-slate-300" /> : <X className="w-4 h-4 text-slate-600" />}
                  </td>
                  <td className="py-3 px-4">
                    {f.competitorB ? <Check className="w-4 h-4 text-slate-300" /> : <X className="w-4 h-4 text-slate-600" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNavigateNext}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          Continue to 3-Year Financial Model
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
