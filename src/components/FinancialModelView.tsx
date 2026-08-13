import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Flame, 
  Clock, 
  Calculator, 
  ArrowRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { StartupProject, FinancialModelData, FinancialModelAssumptions } from '../types';

interface FinancialModelViewProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onNavigateNext: () => void;
}

export const FinancialModelView: React.FC<FinancialModelViewProps> = ({
  project,
  onUpdateProject,
  onNavigateNext
}) => {
  const model: FinancialModelData = project.financialModel || {
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
      { year: 1, revenue: 384000, costOfGoodsSold: 53760, grossProfit: 330240, operatingExpenses: { salaries: 540000, marketing: 144000, softwareAndInfra: 36000, officeAndAdmin: 18000, legalAndOther: 24000 }, totalOpEx: 762000, netIncome: -431760, endingCashBalance: 518240, monthlyBurnRate: 35980, headcount: 8, payingCustomers: 32, arpu: 1000 },
      { year: 2, revenue: 1680000, costOfGoodsSold: 218400, grossProfit: 1461600, operatingExpenses: { salaries: 960000, marketing: 360000, softwareAndInfra: 72000, officeAndAdmin: 36000, legalAndOther: 36000 }, totalOpEx: 1464000, netIncome: -2400, endingCashBalance: 1215840, monthlyBurnRate: 1200, headcount: 14, payingCustomers: 125, arpu: 1120 },
      { year: 3, revenue: 5420000, costOfGoodsSold: 650400, grossProfit: 4769600, operatingExpenses: { salaries: 1800000, marketing: 840000, softwareAndInfra: 180000, officeAndAdmin: 60000, legalAndOther: 60000 }, totalOpEx: 2940000, netIncome: 1829600, endingCashBalance: 3045440, monthlyBurnRate: 0, headcount: 24, payingCustomers: 380, arpu: 1190 }
    ],
    runwayMonths: 14.5,
    breakEvenMonth: 21,
    requiredCapital: 1500000,
    useOfFunds: [
      { category: 'AI Engineering & R&D', percentage: 45, amount: 675000 },
      { category: 'Sales & Go-To-Market', percentage: 35, amount: 525000 },
      { category: 'Customer Success & Ops', percentage: 12, amount: 180000 },
      { category: 'Legal & Working Capital', percentage: 8, amount: 120000 }
    ]
  };

  const [assumptions, setAssumptions] = useState<FinancialModelAssumptions>(model.assumptions);

  const handleAssumptionChange = (field: keyof FinancialModelAssumptions, value: number) => {
    const updated = { ...assumptions, [field]: value };
    setAssumptions(updated);

    // Dynamically recalculate 3-year projections
    const growthMult = 1 + updated.monthlyGrowthRate / 100;
    const y1Rev = updated.avgDealSizeMonthly * 30 * 12 * Math.pow(growthMult, 2);
    const y2Rev = y1Rev * Math.pow(growthMult, 6);
    const y3Rev = y2Rev * Math.pow(growthMult, 6);

    const y1Salaries = updated.initialTeamCount * updated.avgSalaryMonthly * 12;
    const y1Mktg = updated.marketingSpendMonthly * 12;
    const y1OpEx = y1Salaries + y1Mktg + 60000;
    const y1Gross = y1Rev * 0.86;
    const y1Net = y1Gross - y1OpEx;

    const recalculatedProjections = [
      { ...model.projections[0], revenue: Math.round(y1Rev), grossProfit: Math.round(y1Gross), netIncome: Math.round(y1Net), endingCashBalance: Math.max(0, Math.round(updated.initialCash + y1Net)) },
      { ...model.projections[1], revenue: Math.round(y2Rev), grossProfit: Math.round(y2Rev * 0.86), netIncome: Math.round(y2Rev * 0.86 - y1OpEx * 1.5), endingCashBalance: Math.round(updated.initialCash + y1Net + (y2Rev * 0.86 - y1OpEx * 1.5)) },
      { ...model.projections[2], revenue: Math.round(y3Rev), grossProfit: Math.round(y3Rev * 0.86), netIncome: Math.round(y3Rev * 0.86 - y1OpEx * 2.2), endingCashBalance: Math.round(updated.initialCash + y1Net + (y2Rev * 0.86 - y1OpEx * 1.5) + (y3Rev * 0.86 - y1OpEx * 2.2)) },
    ];

    onUpdateProject({
      financialModel: {
        ...model,
        assumptions: updated,
        projections: recalculatedProjections
      }
    });
  };

  const chartData = model.projections.map(p => ({
    name: `Year ${p.year}`,
    Revenue: p.revenue,
    GrossProfit: p.grossProfit,
    NetIncome: p.netIncome,
    Cash: p.endingCashBalance
  }));

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>3-Year Financial Model Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Interactive Financial Projections</h2>
          <p className="text-xs text-slate-400">Target Raise: ${project.fundingGoal.toLocaleString()} USD • Stage: {project.stage}</p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-bold uppercase">Estimated Runway</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{model.runwayMonths} <span className="text-xs font-normal text-slate-400">Months</span></div>
          <div className="text-[10px] text-slate-500 mt-1">Based on current cash & burn</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-bold uppercase">Break-Even Milestone</div>
          <div className="text-3xl font-extrabold text-indigo-400 mt-1">Month {model.breakEvenMonth}</div>
          <div className="text-[10px] text-slate-500 mt-1">Net Income Cash Flow Positive</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-bold uppercase">Year 3 ARR Target</div>
          <div className="text-3xl font-extrabold text-cyan-400 mt-1">${(model.projections[2]?.revenue/1000000).toFixed(2)}M</div>
          <div className="text-[10px] text-slate-500 mt-1">86% Gross Margin</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-bold uppercase">LTV / CAC Ratio</div>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">13.2x</div>
          <div className="text-[10px] text-emerald-400 mt-1">Payback in 4.2 Months</div>
        </div>
      </div>

      {/* Assumptions Editor & Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Assumptions Sliders Panel */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Model Assumptions Sliders
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Monthly Growth Rate</span>
                <span className="font-bold text-emerald-400">{assumptions.monthlyGrowthRate}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                value={assumptions.monthlyGrowthRate}
                onChange={e => handleAssumptionChange('monthlyGrowthRate', Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Initial Cash Balance ($)</span>
                <span className="font-bold text-white">${assumptions.initialCash.toLocaleString()}</span>
              </div>
              <input
                type="number"
                value={assumptions.initialCash}
                onChange={e => handleAssumptionChange('initialCash', Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Avg Monthly Deal Size ($)</span>
                <span className="font-bold text-white">${assumptions.avgDealSizeMonthly}</span>
              </div>
              <input
                type="number"
                value={assumptions.avgDealSizeMonthly}
                onChange={e => handleAssumptionChange('avgDealSizeMonthly', Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Customer Acquisition Cost (CAC)</span>
                <span className="font-bold text-white">${assumptions.cac}</span>
              </div>
              <input
                type="number"
                value={assumptions.cac}
                onChange={e => handleAssumptionChange('cac', Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Initial Team Headcount</span>
                <span className="font-bold text-white">{assumptions.initialTeamCount} reps/devs</span>
              </div>
              <input
                type="number"
                value={assumptions.initialTeamCount}
                onChange={e => handleAssumptionChange('initialTeamCount', Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Area Chart Projections */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">3-Year Financial Forecast ($ USD)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="Revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="GrossProfit" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="EndingCash" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Use of Funds Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Target Seed Raise Use of Funds Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {model.useOfFunds.map((u, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-bold">{u.category}</div>
              <div className="text-2xl font-extrabold text-white">{u.percentage}%</div>
              <div className="text-[11px] text-indigo-400 font-medium">${u.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNavigateNext}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          Continue to Pitch Deck Generator
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
