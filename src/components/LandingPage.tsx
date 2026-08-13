import React, { useState } from 'react';
import { 
  Rocket, 
  Sparkles, 
  TrendingUp, 
  PieChart, 
  Users, 
  DollarSign, 
  Presentation, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Star, 
  ShieldCheck, 
  ChevronDown, 
  Layers, 
  Zap,
  Check
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenDemo }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const faqs = [
    {
      q: "How does FundPilot AI generate startup analysis & financial models?",
      a: "FundPilot AI combines Google Gemini 3.6 Flash reasoning models with real venture benchmark databases (TAM data, competitor databases, SaaS metrics benchmarks) to synthesize institutional-grade executive summaries, 3-year P&L forecasts, and investor pitch decks in minutes."
    },
    {
      q: "Can I export my financial projections and pitch deck to PDF or PowerPoint?",
      a: "Yes! You can export your executive summary, 3-year financial model, competitor matrix, and 12-slide pitch deck to high-resolution vector PDF files ready for investor meetings."
    },
    {
      q: "How does the AI Investor Matching system work?",
      a: "Our engine indexes venture funds and angel investors, mapping their recent portfolio deals, target check sizes ($50k to $5M+), sector preferences, and stage focus against your startup parameters to rank matches and generate customized cold outreach emails."
    },
    {
      q: "Is my startup data kept private and confidential?",
      a: "Absolutely. All data is encrypted using 256-bit AES encryption at rest and TLS 1.3 in transit. Your startup details are never used to train public LLMs."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Background Gradients & Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-indigo-300 mb-8 shadow-xl hover:border-indigo-500/50 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>FundPilot AI 2.0 Released • Next-Gen Startup Copilot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Raise funding with <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              AI-powered precision
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            The all-in-one fundraising copilot for founders. Validate startup ideas, conduct deep market research, build 3-year financial models, generate pitch decks, and match with venture investors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Rocket className="w-5 h-5 text-indigo-200" />
              Analyze My Startup Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 text-slate-200 font-bold text-base transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              Watch Live Demo
            </button>
          </div>

          {/* Key Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-900/80">
            <div>
              <div className="text-2xl font-extrabold text-white">$450M+</div>
              <div className="text-xs text-slate-400">Capital Raised by Alumni</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-indigo-400">12,400+</div>
              <div className="text-xs text-slate-400">Startup Decks Created</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-cyan-400">95%</div>
              <div className="text-xs text-slate-400">Investor Match Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-purple-400">3.5x</div>
              <div className="text-xs text-slate-400">Faster Pitch Preparation</div>
            </div>
          </div>

        </div>
      </section>

      {/* Trusted Logos */}
      <section className="py-8 border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-6">
            Trusted by founders backed by top accelerators & funds
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-mono text-sm font-bold text-slate-300 tracking-tighter">Y COMBINATOR</span>
            <span className="font-serif text-sm font-bold text-slate-300">TECHSTARS</span>
            <span className="font-sans text-sm font-bold text-slate-300 tracking-wider">SEQUOIA CAP</span>
            <span className="font-mono text-sm font-bold text-slate-300">a16z SPEED</span>
            <span className="font-sans text-sm font-bold text-slate-300">500 GLOBAL</span>
          </div>
        </div>
      </section>

      {/* Interactive Feature Cards Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            The Full Venture Stack
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything you need to go from idea to institutional term sheet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Startup AI Validator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesize problem validation, solution moat, UVP, and risk matrix tailored to your exact industry vertical.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Market Research Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculate TAM, SAM, and SOM figures with CAGR forecasts, geographic opportunity matrices, and target personas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3-Year Financial Model</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive financial projections with editable assumptions (growth rate, CAC, churn, headcount, and break-even).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Presentation className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">12-Slide Pitch Deck Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate structured investor slides from cover to ask. Present directly in browser or export to PDF.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Investor Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Match with target VC partners based on stage, check size, sector, and geographic criteria with cold email generation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fundraising Copilot Chat</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              24/7 AI chat assistant to refine pitch narratives, answer valuation questions, and prep for partner Q&A meetings.
            </p>
          </div>

        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-1 rounded-3xl bg-gradient-to-b from-indigo-500/30 via-slate-800 to-slate-900 shadow-2xl">
          <div className="rounded-[22px] bg-slate-950 p-6 sm:p-10 border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Interactive Founder Cockpit</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Institutional insights at your fingertips
                </h3>
              </div>
              <button
                onClick={onOpenDemo}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                Launch Demo Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Glass Panel Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Startup Quality Score</div>
                <div className="text-3xl font-extrabold text-indigo-400 mt-1">88 / 100</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-[88%]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Funding Readiness</div>
                <div className="text-3xl font-extrabold text-cyan-400 mt-1">84 / 100</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[84%]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Target TAM Market</div>
                <div className="text-3xl font-extrabold text-purple-400 mt-1">$18.5 Billion</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> 22.4% Annual CAGR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Flexible Founder Pricing
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent plans that scale with your fundraising journey
          </p>

          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Annual <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded">20% Off</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plan 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Founder Free</h3>
              <p className="text-xs text-slate-400 mb-6">Ideal for validating early concepts.</p>
              <div className="text-4xl font-extrabold text-white mb-6">$0 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1 Active Startup Project</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic AI Executive Summary</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Market TAM/SAM Calculator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Sample Investor Directory Access</li>
              </ul>
            </div>
            <button onClick={onGetStarted} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Plan 2 - Highlighted */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-indigo-500 relative flex flex-col justify-between shadow-2xl shadow-indigo-500/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-extrabold text-white tracking-wider uppercase">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Seed Pro Copilot</h3>
              <p className="text-xs text-slate-400 mb-6">For active founders raising Seed or Series A rounds.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                ${billingCycle === 'annual' ? '39' : '49'} <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Unlimited Startup Projects</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Full 12-Slide Pitch Deck Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Editable 3-Year Financial Models</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> AI Investor Matching & Cold Email Builder</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> High-Resolution Vector PDF Exports</li>
              </ul>
            </div>
            <button onClick={onGetStarted} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all">
              Start Seed Pro
            </button>
          </div>

          {/* Plan 3 */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Growth Studio</h3>
              <p className="text-xs text-slate-400 mb-6">For studios, incubators, and multi-startup builders.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                ${billingCycle === 'annual' ? '119' : '149'} <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Seed Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Team Collaboration (Up to 10 members)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated VC Advisory Session</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom Pitch Deck Branding & Themes</li>
              </ul>
            </div>
            <button onClick={onGetStarted} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors">
              Contact Growth Team
            </button>
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-200 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 border border-indigo-500/40 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to close your seed round 3x faster?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Join over 12,000 founders who use FundPilot AI to build pitch decks, financial models, and connect with top investors.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
          >
            Launch Your Startup Copilot Now
          </button>
        </div>
      </section>

    </div>
  );
};
