import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User as UserIcon, Building, ArrowRight, Check } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
    const body = mode === 'signup' ? { email, password, name, companyName } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error authenticating');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo' }),
      });
      const data = await res.json();
      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError('Could not boot demo account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'founder.google@fundpilot.ai',
          name: 'Google Founder',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        }),
      });
      const data = await res.json();
      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError('Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {mode === 'signin' ? 'Welcome Back to FundPilot' : 'Create Founder Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'signin'
              ? 'Sign in to access your startup dashboard & investor decks'
              : 'Join 12,000+ founders raising capital with AI precision'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Instant 1-Click Demo Shortcut */}
        <button
          type="button"
          onClick={handleDemoAccess}
          className="w-full mb-4 py-2.5 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          1-Click Instant Demo Login (AuraScale AI)
        </button>

        {/* Google OAuth Option */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full mb-4 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          Continue with Google OAuth
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-slate-800"></div>
          <span className="px-3 text-[10px] uppercase font-bold text-slate-500">Or Email</span>
          <div className="flex-1 border-t border-slate-800"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Company / Startup Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="AuraScale AI"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="founder@startup.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-colors"
          >
            {loading ? 'Processing...' : mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

      </div>
    </div>
  );
};
