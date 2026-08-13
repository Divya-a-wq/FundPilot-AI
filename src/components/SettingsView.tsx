import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Users, 
  History, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Check, 
  Sparkles,
  Key,
  Database
} from 'lucide-react';
import { User, StartupProject, TeamMember, ProjectVersion } from '../types';

interface SettingsViewProps {
  user: User | null;
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
  onUpdateUser: (updated: Partial<User>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  project,
  onUpdateProject,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'project' | 'team' | 'versions' | 'billing'>('project');
  
  // Team management
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Founder' | 'Co-Founder' | 'Advisor' | 'Investor'>('Co-Founder');

  // Version management
  const [versionNote, setVersionNote] = useState('');

  const team: TeamMember[] = project.team || [
    { id: 'tm-1', name: user?.name || 'Alex Morgan', email: user?.email || 'alex@aurascale.example.com', role: 'Founder' }
  ];

  const versions: ProjectVersion[] = project.versions || [
    {
      id: 'v-1',
      versionName: 'Initial Seed Pitch Deck & Projections',
      createdAt: '2025-02-28 14:30',
      summaryNote: 'First AI analysis pass with $1.5M funding goal',
      dataSnapshot: {}
    }
  ];

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;

    const member: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole
    };

    onUpdateProject({ team: [...team, member] });
    setNewMemberName('');
    setNewMemberEmail('');
  };

  const handleRemoveMember = (id: string) => {
    onUpdateProject({ team: team.filter(m => m.id !== id) });
  };

  const handleCreateVersionSnapshot = () => {
    if (!versionNote) return;

    const newVer: ProjectVersion = {
      id: `v-${Date.now()}`,
      versionName: `Snapshot v${versions.length + 1}`,
      createdAt: new Date().toLocaleString(),
      summaryNote: versionNote,
      dataSnapshot: { ...project }
    };

    onUpdateProject({ versions: [newVer, ...versions] });
    setVersionNote('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-16">
      
      {/* Settings Navigation Header */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'project', label: 'Startup Profile', icon: UserIcon },
          { id: 'team', label: 'Team & Co-Founders', icon: Users },
          { id: 'versions', label: 'Version History & Restores', icon: History },
          { id: 'billing', label: 'Billing & Copilot Plan', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content: Project Profile */}
      {activeTab === 'project' && (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-white">Startup Profile Configuration</h3>
            <p className="text-xs text-slate-400">Update key metadata fed into Gemini AI prompt generation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={project.name}
                onChange={e => onUpdateProject({ name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
              <input
                type="text"
                value={project.tagline}
                onChange={e => onUpdateProject({ tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Funding Raise ($)</label>
              <input
                type="number"
                value={project.fundingGoal}
                onChange={e => onUpdateProject({ fundingGoal: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Fundraising Stage</label>
              <select
                value={project.stage}
                onChange={e => onUpdateProject({ stage: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Idea">Idea</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Core Problem Statement</label>
            <textarea
              rows={3}
              value={project.problem}
              onChange={e => onUpdateProject({ problem: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Core Solution & Moat</label>
            <textarea
              rows={3}
              value={project.solution}
              onChange={e => onUpdateProject({ solution: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Tab Content: Team */}
      {activeTab === 'team' && (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-white">Team & Permissions</h3>
            <p className="text-xs text-slate-400">Invite co-founders and advisors to collaborate on financial models & pitch decks.</p>
          </div>

          <form onSubmit={handleAddTeamMember} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400">Add Team Member</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newMemberEmail}
                onChange={e => setNewMemberEmail(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none"
              />
              <select
                value={newMemberRole}
                onChange={e => setNewMemberRole(e.target.value as any)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none"
              >
                <option value="Founder">Founder</option>
                <option value="Co-Founder">Co-Founder</option>
                <option value="Advisor">Advisor</option>
                <option value="Investor">Investor</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Invite Member
            </button>
          </form>

          <div className="space-y-2">
            {team.map((m) => (
              <div key={m.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">{m.name}</span>
                  <span className="text-slate-400 text-[11px] ml-2">({m.email})</span>
                  <span className="ml-3 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-bold">
                    {m.role}
                  </span>
                </div>
                {m.role !== 'Founder' && (
                  <button
                    onClick={() => handleRemoveMember(m.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Version Snapshots */}
      {activeTab === 'versions' && (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-white">Project Snapshots & Version History</h3>
            <p className="text-xs text-slate-400">Save complete state checkpoints before pitching VCs or updating financial assumptions.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400">Create New Snapshot</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Note e.g. Pre-YC Application Numbers"
                value={versionNote}
                onChange={e => setVersionNote(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none"
              />
              <button
                onClick={handleCreateVersionSnapshot}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                Save Version
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {versions.map((ver) => (
              <div key={ver.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{ver.versionName}</span>
                    <span className="text-[10px] text-slate-500">{ver.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{ver.summaryNote}</p>
                </div>
                <button
                  onClick={() => alert(`Restored snapshot: ${ver.versionName}`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Billing */}
      {activeTab === 'billing' && (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-white">Current Copilot Plan</h3>
              <p className="text-xs text-slate-400">Unlimited Gemini 3.6 Flash pitch deck & financial model generations.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold text-xs">
              PRO COPILOT ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3">
              <div className="text-xs font-bold text-indigo-400">PRO PLAN</div>
              <div className="text-2xl font-black text-white">$49 <span className="text-xs text-slate-400">/ mo</span></div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited AI Pitch Decks</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> 3-Year Financial Models</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> VC Investor Matching</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
