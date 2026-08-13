import React, { useState } from 'react';
import { 
  Presentation, 
  Sparkles, 
  Download, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  RefreshCw, 
  Check, 
  X,
  Play
} from 'lucide-react';
import { StartupProject, PitchSlide, PitchDeckData } from '../types';
import { downloadProjectPDF } from '../lib/pdfGenerator';

interface PitchDeckViewProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onNavigateNext: () => void;
}

export const PitchDeckView: React.FC<PitchDeckViewProps> = ({
  project,
  onUpdateProject,
  onNavigateNext
}) => {
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<PitchSlide | null>(null);

  const deck: PitchDeckData = project.pitchDeck || {
    theme: 'modern-dark',
    slides: [
      { id: 1, title: project.name, subtitle: project.tagline, bullets: ['Raising $1.5M Seed', 'Targeting $18.5B Global Market'], keyHighlight: 'Autonomous AI RevOps Copilot' },
      { id: 2, title: 'The Problem', subtitle: 'Sales Teams Waste 40% of Their Time on Manual Debt', bullets: ['28% deal slip rate due to late rep responses', 'Static CRMs do not guide reps on next actions'], keyHighlight: '$12.4B Lost Annually in Pipeline' },
      { id: 3, title: 'The Solution', subtitle: 'Autonomous Signal Detection & Auto-Execution', bullets: ['Real-time deal probability scoring', 'Automated personalized buyer playbooks', 'Bi-directional zero-friction CRM sync'], keyHighlight: '34% Deal Velocity Increase' },
      { id: 4, title: 'Market Opportunity', subtitle: '$18.5B Global Enterprise Sales Software TAM', bullets: ['TAM: $18.5 Billion', 'SAM: $4.2 Billion', 'SOM: $380 Million Target Year 3'], keyHighlight: '22.4% Annual CAGR' },
      { id: 5, title: 'Product Overview', subtitle: 'Native Gong, Salesforce & Slack Integrations', bullets: ['Zero-touch 5-minute setup', 'Live multi-channel intent radar', '1-click executive deal summaries'], keyHighlight: '91% Rep Adoption Rate' },
      { id: 6, title: 'Business Model', subtitle: 'B2B SaaS Subscription Tiers', bullets: ['Starter: $499/mo base', 'Pro Growth: $1,299/mo + seats', 'Enterprise: $2,999/mo + fine-tuned models'], keyHighlight: '86% Gross Margins' },
      { id: 7, title: 'Competition & Moat', subtitle: 'Active Execution vs Passive Record Keepers', bullets: ['Proactive AI deal playbooks', 'Proprietary intent model on 2.5M conversations'], keyHighlight: 'Defensible Data Moat' },
      { id: 8, title: 'Traction & Milestones', subtitle: 'Rapid Organic Revenue Growth', bullets: ['$384k ARR ($32k MRR)', '32 Paying Mid-Market Customers', '138% Net Revenue Retention'], keyHighlight: '18% MoM Growth' },
      { id: 9, title: 'Financial Projections', subtitle: 'Path to $5.4M ARR in 3 Years', bullets: ['Year 1: $384k ARR', 'Year 2: $1.68M ARR (Break-even)', 'Year 3: $5.42M ARR ($1.8M Net Income)'], keyHighlight: 'Profitable Month 21' },
      { id: 10, title: 'Team & Expertise', subtitle: 'Ex-Salesforce, Ex-Gong & MIT AI PhDs', bullets: ['Alex Rivera (CEO): Ex-Head Sales Ops Salesforce', 'Dr. Elena Vance (CTO): PhD AI NLP MIT'], keyHighlight: '15+ Yrs Industry Experience' },
      { id: 11, title: 'Funding Ask', subtitle: 'Raising $1,500,000 Seed Round', bullets: ['45% AI Model Engineering', '35% Sales & Marketing GTM', '12% Customer Success', '8% Legal & Ops'], keyHighlight: '18 Months Runway' },
      { id: 12, title: 'Vision', subtitle: 'Defining Next-Gen Revenue Infrastructure', bullets: ['Empowering 100k+ sales reps globally with AI', 'Join us in shaping autonomous commerce'], keyHighlight: 'Let\'s Build Together' }
    ]
  };

  const currentSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  const handleGenerateDeck = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/pitch-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: project.name,
          industry: project.industry,
          problem: project.problem,
          solution: project.solution,
          fundingGoal: project.fundingGoal,
          stage: project.stage,
          businessModel: project.businessModel
        }),
      });
      const data = await res.json();
      if (res.ok && data.pitchDeck) {
        onUpdateProject({ pitchDeck: data.pitchDeck });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSlideEdit = () => {
    if (!editingSlide) return;
    const updatedSlides = deck.slides.map(s => s.id === editingSlide.id ? editingSlide : s);
    onUpdateProject({ pitchDeck: { ...deck, slides: updatedSlides } });
    setEditingSlide(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-16">
      
      {/* Header Controls */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Presentation className="w-3.5 h-3.5" />
            <span>12-Slide Pitch Deck Generator</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Investor Deck & Presentation Stage</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateDeck}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
            Regenerate Deck
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Present Fullscreen
          </button>

          <button
            onClick={() => downloadProjectPDF(project, 'pitch')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Deck PDF
          </button>
        </div>
      </div>

      {/* Main Slide Canvas Display */}
      <div className="relative aspect-[16/9] rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80 border-2 border-indigo-500/30 p-8 md:p-12 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Top Header of Slide */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">{project.name} • Pitch Deck</span>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-400">
            Slide {currentSlide.id} / 12
          </span>
        </div>

        {/* Center Content */}
        <div className="my-auto space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h1>
          <p className="text-sm sm:text-lg font-semibold text-indigo-300">
            {currentSlide.subtitle}
          </p>

          <div className="space-y-2 pt-2">
            {currentSlide.bullets.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {currentSlide.keyHighlight && (
            <div className="inline-block mt-4 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs font-extrabold">
              Key Metric: {currentSlide.keyHighlight}
            </div>
          )}
        </div>

        {/* Bottom Slide Toolbar */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setEditingSlide(currentSlide)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-semibold"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            Edit Slide Content
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentSlideIndex(Math.min(deck.slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === deck.slides.length - 1}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Slide Thumbnails Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {deck.slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`p-3 rounded-2xl text-left border transition-all ${
              currentSlideIndex === idx
                ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="text-[10px] font-mono text-indigo-400 font-bold mb-1">Slide {s.id}</div>
            <div className="text-xs font-bold text-white truncate">{s.title}</div>
          </button>
        ))}
      </div>

      {/* Fullscreen Presentation Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-8 md:p-16 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold text-indigo-400">{project.name} Pitch Presentation</div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto my-auto space-y-6">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Slide {currentSlide.id} of 12</span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">{currentSlide.title}</h1>
            <p className="text-xl font-semibold text-indigo-300">{currentSlide.subtitle}</p>
            <div className="space-y-3 pt-4">
              {currentSlide.bullets.map((b, i) => (
                <div key={i} className="text-lg text-slate-200 flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            {currentSlide.keyHighlight && (
              <div className="inline-block mt-6 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm">
                {currentSlide.keyHighlight}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-900 pt-4">
            <span className="text-xs text-slate-500">Use arrow keys or buttons to navigate</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentSlideIndex(Math.min(deck.slides.length - 1, currentSlideIndex + 1))}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Slide Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Edit Slide {editingSlide.id}</h3>
              <button onClick={() => setEditingSlide(null)} className="p-1 rounded bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Slide Title</label>
              <input
                type="text"
                value={editingSlide.title}
                onChange={e => setEditingSlide({ ...editingSlide, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle</label>
              <input
                type="text"
                value={editingSlide.subtitle}
                onChange={e => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Key Highlight Badge</label>
              <input
                type="text"
                value={editingSlide.keyHighlight || ''}
                onChange={e => setEditingSlide({ ...editingSlide, keyHighlight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditingSlide(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleSaveSlideEdit} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                Save Slide
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={onNavigateNext}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          Continue to Investor Matching
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
