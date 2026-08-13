import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Zap, 
  HelpCircle, 
  TrendingUp, 
  ShieldAlert, 
  FileText,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { StartupProject, ChatMessage } from '../types';

interface CopilotChatViewProps {
  project: StartupProject;
  onUpdateProject: (updated: Partial<StartupProject>) => void;
}

export const CopilotChatView: React.FC<CopilotChatViewProps> = ({
  project,
  onUpdateProject
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello founder! I'm your **FundPilot AI Copilot**. I have full context on **${project.name}** (${project.stage} stage, $${project.fundingGoal.toLocaleString()} funding target).\n\nHow can I help you accelerate your raise today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: '💰 Evaluate my valuation range', actionKey: 'valuation' },
        { label: '🎯 Prepare for VC Q&A hard questions', actionKey: 'vc_qa' },
        { label: '📄 Critique my slide deck narrative', actionKey: 'pitch_narrative' },
        { label: '📊 How to present TAM/SAM effectively?', actionKey: 'tam_advice' }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
          messages: [...messages, userMsg].map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }))
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: data.suggestedActions || []
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        const fallbackMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `Based on **${project.name}**'s stage (${project.stage}) and $${project.fundingGoal.toLocaleString()} target raise, a standard dilution target is 15-20%. Ensure your traction metrics (CAC payback under 12 months) are front and center in your introductory slide deck.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'I ran into a network glitch. However, as your fundraising copilot, I recommend ensuring your financial model CAC/LTV ratio stays above 3x to impress Seed investors.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] min-h-[600px] flex flex-col bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in">
      
      {/* Header */}
      <div className="p-4 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-sm">FundPilot AI Co-Founder Chat</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-400">
              Context-Aware Gemini 3.6 Flash Assistant • Startup: <span className="text-indigo-300 font-semibold">{project.name}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(initialMessages)}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Clear Chat
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              m.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-800 text-indigo-400 border border-slate-700'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
            }`}>
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>

              {/* Action Chips */}
              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                  {m.suggestedActions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(act.label)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-[11px] font-semibold transition-all"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}

              <span className={`block text-[9px] mt-2 ${m.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-500'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Gemini AI is analyzing financial models & VC data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask your AI Copilot about valuation, term sheets, VC pitch objections..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>

    </div>
  );
};
