import React from 'react';
import { Rocket, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base text-white tracking-tight">FundPilot AI</span>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
            The production-ready AI startup funding copilot helping founders validate ideas, analyze market opportunities, build 3-year financial projections, create pitch decks, and match with ideal venture investors.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[10px] mb-3">Product Copilot</h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate?.('wizard')} className="hover:text-indigo-400 transition-colors">Startup AI Analysis</button></li>
            <li><button onClick={() => onNavigate?.('market')} className="hover:text-indigo-400 transition-colors">Market Research TAM/SAM</button></li>
            <li><button onClick={() => onNavigate?.('competitors')} className="hover:text-indigo-400 transition-colors">Competitor Intelligence</button></li>
            <li><button onClick={() => onNavigate?.('financials')} className="hover:text-indigo-400 transition-colors">Financial Projections</button></li>
            <li><button onClick={() => onNavigate?.('pitch')} className="hover:text-indigo-400 transition-colors">Pitch Deck Generator</button></li>
            <li><button onClick={() => onNavigate?.('investors')} className="hover:text-indigo-400 transition-colors">Investor Matching</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[10px] mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Y Combinator Deck Guide</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">SaaS Unit Economics 101</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Seed Stage Valuation Calculator</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Cold Investor Email Templates</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[10px] mb-3">System & Security</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-mono text-[11px]">Systems Operational</span>
            </div>
            <p className="text-[10px] text-slate-500">SOC-2 Type II Certified • 256-Bit Encryption • Powered by Google Gemini AI</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-[11px]">
          © {new Date().getFullYear()} FundPilot AI Inc. All rights reserved. Built for founders globally.
        </p>
        <div className="flex items-center gap-4 text-slate-500 text-[11px]">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-300">Security</a>
        </div>
      </div>
    </footer>
  );
};
