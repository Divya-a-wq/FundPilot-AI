import React, { useState } from 'react';
import { 
  Rocket, 
  Search, 
  Bell, 
  User as UserIcon, 
  ChevronDown, 
  Plus, 
  Sparkles, 
  LogOut, 
  ShieldCheck, 
  CreditCard,
  Sun,
  Moon,
  Zap,
  FolderOpen
} from 'lucide-react';
import { User, StartupProject, NotificationItem } from '../types';

interface NavbarProps {
  user: User | null;
  projects: StartupProject[];
  currentProject: StartupProject | null;
  onSelectProject: (proj: StartupProject) => void;
  onNewProject: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenSearch: () => void;
  notifications: NotificationItem[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  projects,
  currentProject,
  onSelectProject,
  onNewProject,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLogout,
  onOpenSearch,
  notifications,
  theme,
  onToggleTheme
}) => {
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Project Selector */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  FundPilot
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI
                </span>
              </div>
            </div>
          </button>

          {/* Active Project Switcher (If Authenticated) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 text-xs font-medium text-slate-200 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span className="max-w-[130px] truncate">{currentProject?.name || 'Select Project'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {projectDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    My Startup Projects
                  </div>
                  <div className="space-y-1 max-h-48 overflow-y-auto my-1">
                    {projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProject(p);
                          setProjectDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                          currentProject?.id === p.id 
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
                            : 'text-slate-300 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="truncate">
                          <div className="font-semibold text-slate-100">{p.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">{p.industry}</div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {p.stage}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      onNewProject();
                      setProjectDropdownOpen(false);
                    }}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Startup Project
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center: Quick Search Trigger */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs text-slate-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search projects, investors, slides, or ask AI...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & User Navigation */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Quick Navigation Tabs for Mobile / Tablet */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Dashboard
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-slate-200">Activity Notifications</span>
                      <span className="text-[10px] text-indigo-400 font-medium">{unreadCount} new</span>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-indigo-300">{n.title}</span>
                            <span className="text-[9px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-500/50"
                  />
                  <span className="text-slate-200 font-semibold max-w-[90px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs font-bold text-slate-100">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                        {user.plan.toUpperCase()} COPILOT
                      </span>
                    </div>

                    <button
                      onClick={() => { setActiveTab('settings'); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                      Account & Settings
                    </button>

                    <button
                      onClick={() => { setActiveTab('settings'); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                      Billing & Subscription
                    </button>

                    <div className="border-t border-slate-800 my-1" />

                    <button
                      onClick={() => { onLogout(); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Analyze My Startup
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};
