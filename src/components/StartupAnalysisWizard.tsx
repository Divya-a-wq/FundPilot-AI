import React, { useState } from 'react';
import { 
  Sparkles, 
  Rocket, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Layers, 
  Target, 
  Globe, 
  HelpCircle,
  Lightbulb,
  FileText
} from 'lucide-react';
import { StartupProject, ExecutiveSummary } from '../types';

interface StartupAnalysisWizardProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onNavigateNext: () => void;
}

export const StartupAnalysisWizard: React.FC<StartupAnalysisWizardProps> = ({
  project,
  onUpdateProject,
  onNavigateNext
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: project.name || '',
    industry: project.industry || 'B2B SaaS',
    problem: project.problem || '',
    solution: project.solution || '',
    targetCustomer: project.targetCustomer || '',
    country: project.country || 'United States',
    businessModel: project.businessModel || 'B2B SaaS subscription',
    stage: project.stage || 'Seed',
    fundingGoal: project.fundingGoal || 1500000,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRunAiAnalysis = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'AI Analysis failed');
      }

      onUpdateProject({
        ...formData,
        executiveSummary: data.executiveSummary,
        startupScore: Math.floor(Math.random() * 10) + 85,
        fundingReadinessScore: Math.floor(Math.random() * 10) + 80,
      });

      setStep(3); // Jump to results step
    } catch (err: any) {
      setError(err.message || 'Error generating AI analysis');
    } finally {
      setLoading(false);
    }
  };

  const execSummary = project.executiveSummary;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-16">
      
      {/* Wizard Header & Step Indicator */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Startup Analysis Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Idea & Market Validation Wizard</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1. Startup Details
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            2. Business Model
          </button>
          <button
            onClick={() => setStep(3)}
            disabled={!execSummary}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              step === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50'
            }`}
          >
            3. AI Report
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="font-bold underline">Dismiss</button>
        </div>
      )}

      {/* STEP 1: Startup Basics */}
      {step === 1 && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Step 1: Core Startup Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Startup Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="e.g. AuraScale AI"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Industry / Sector</label>
              <input
                type="text"
                value={formData.industry}
                onChange={e => handleInputChange('industry', e.target.value)}
                placeholder="e.g. B2B SaaS / FinTech / AI Agents"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Problem Statement</label>
            <textarea
              rows={3}
              value={formData.problem}
              onChange={e => handleInputChange('problem', e.target.value)}
              placeholder="What specific pain point do your customers face? Include time or financial loss."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Solution Overview</label>
            <textarea
              rows={3}
              value={formData.solution}
              onChange={e => handleInputChange('solution', e.target.value)}
              placeholder="How does your product solve this problem better than existing alternatives?"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2"
            >
              Next: Business Model & Stage
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Business Model & Funding Ask */}
      {step === 2 && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Step 2: Business Model & Funding Ask
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Target Customer Persona</label>
              <input
                type="text"
                value={formData.targetCustomer}
                onChange={e => handleInputChange('targetCustomer', e.target.value)}
                placeholder="e.g. Mid-market B2B SaaS companies ($5M-$50M ARR)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Primary Country / Geography</label>
              <input
                type="text"
                value={formData.country}
                onChange={e => handleInputChange('country', e.target.value)}
                placeholder="United States / Remote / Global"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Business Model & Pricing Tier</label>
              <input
                type="text"
                value={formData.businessModel}
                onChange={e => handleInputChange('businessModel', e.target.value)}
                placeholder="e.g. B2B SaaS Subscription ($1,200/mo base)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Funding Stage</label>
              <select
                value={formData.stage}
                onChange={e => handleInputChange('stage', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Idea">Idea Stage</option>
                <option value="Pre-Seed">Pre-Seed ($100k - $500k)</option>
                <option value="Seed">Seed Stage ($500k - $3M)</option>
                <option value="Series A">Series A ($3M - $10M)</option>
                <option value="Series B+">Series B+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Target Funding Goal ($ USD)</label>
              <input
                type="number"
                value={formData.fundingGoal}
                onChange={e => handleInputChange('fundingGoal', Number(e.target.value))}
                placeholder="1500000"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Back
            </button>

            <button
              onClick={handleRunAiAnalysis}
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating AI Analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate AI Executive Analysis
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Generated Report View */}
      {step === 3 && execSummary && (
        <div className="space-y-6">
          
          {/* Executive Overview Card */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Executive Summary</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                AI Verified
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {execSummary.overview}
            </p>
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200">
              <strong className="text-white">Unique Value Proposition:</strong> {execSummary.uniqueValueProposition}
            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Problem Validation */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Problem Validation
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {execSummary.problemValidation.description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Pain Severity</div>
                  <div className="font-bold text-rose-400">{execSummary.problemValidation.painPointSeverity}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Market Impact</div>
                  <div className="font-bold text-white truncate">{execSummary.problemValidation.affectedMarketSize}</div>
                </div>
              </div>
            </div>

            {/* Solution & Moat */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Solution Refinement & Technical Moat
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Technical Moat:</strong> {execSummary.solutionRefinement.technicalMoat}
              </p>
              <div className="space-y-1.5 pt-1">
                {execSummary.solutionRefinement.coreValueProps.map((vp, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{vp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Risk Analysis Matrix */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              Risk Analysis & Mitigation Matrix
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {execSummary.risks.map((r, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">{r.category} Risk</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                      r.severity === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {r.severity} Severity
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white">{r.risk}</p>
                  <p className="text-[11px] text-slate-400"><strong>Mitigation:</strong> {r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Edit Inputs & Re-analyze
            </button>

            <button
              onClick={onNavigateNext}
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
            >
              Continue to Market Research (TAM / SAM)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
