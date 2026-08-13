import { Router, Response } from 'express';
import { db, SAMPLE_INVESTORS, INITIAL_DEMO_USER } from './db';
import { authMiddleware, generateToken, hashPassword, comparePassword, AuthRequest } from './auth';
import { 
  generateExecutiveSummary, 
  generateMarketResearch, 
  generateCompetitorAnalysis, 
  generatePitchDeck, 
  chatWithCopilot 
} from './gemini';
import { StartupProject, User, InvestorMatch } from '../src/types';

export const apiRouter = Router();

// --- Auth Routes ---
apiRouter.post('/auth/signup', (req: AuthRequest, res: Response) => {
  const { email, password, name, companyName } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required.' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const newUser: User = {
    id: `usr_${Date.now()}`,
    email,
    name,
    companyName: companyName || `${name}'s Startup`,
    role: 'founder',
    plan: 'pro',
    createdAt: new Date().toISOString(),
  };

  db.createUser(newUser);
  const token = generateToken(newUser);
  res.json({ user: newUser, token });
});

apiRouter.post('/auth/login', (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  
  // Instant demo shortcut support
  if (email === 'demo' || email === 'founder@fundpilot.ai') {
    const demoUser = db.getUserById(INITIAL_DEMO_USER.id) || INITIAL_DEMO_USER;
    const token = generateToken(demoUser);
    return res.json({ user: demoUser, token });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = generateToken(user);
  res.json({ user, token });
});

apiRouter.post('/auth/google', (req: AuthRequest, res: Response) => {
  const { email, name, avatar } = req.body;
  let user = db.getUserByEmail(email || 'google.founder@fundpilot.ai');
  
  if (!user) {
    user = {
      id: `usr_g_${Date.now()}`,
      email: email || 'google.founder@fundpilot.ai',
      name: name || 'Google Founder',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'founder',
      companyName: 'VentureScale Labs',
      plan: 'pro',
      createdAt: new Date().toISOString(),
    };
    db.createUser(user);
  }

  const token = generateToken(user);
  res.json({ user, token });
});

apiRouter.get('/auth/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

// --- Project Routes ---
apiRouter.get('/projects', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || INITIAL_DEMO_USER.id;
  const projects = db.getProjectsByUserId(userId);
  res.json(projects);
});

apiRouter.get('/projects/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const project = db.getProjectById(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  res.json(project);
});

apiRouter.post('/projects', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || INITIAL_DEMO_USER.id;
  const {
    name,
    tagline,
    industry,
    stage,
    fundingGoal,
    currency,
    country,
    problem,
    solution,
    targetCustomer,
    businessModel,
  } = req.body;

  const newProject: StartupProject = {
    id: `proj_${Date.now()}`,
    userId,
    name: name || 'New Startup Project',
    tagline: tagline || 'Building the future of software',
    industry: industry || 'B2B SaaS',
    stage: stage || 'Seed',
    fundingGoal: Number(fundingGoal) || 1000000,
    currency: currency || 'USD',
    country: country || 'United States',
    problem: problem || 'Manual workflows cost companies millions.',
    solution: solution || 'Automated AI copilot platform.',
    targetCustomer: targetCustomer || 'Mid-market companies',
    businessModel: businessModel || 'B2B SaaS subscription',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    startupScore: 78,
    fundingReadinessScore: 72,
  };

  const saved = db.saveProject(newProject);
  res.status(201).json(saved);
});

apiRouter.put('/projects/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const existing = db.getProjectById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const updated: StartupProject = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  const saved = db.saveProject(updated);
  res.json(saved);
});

apiRouter.delete('/projects/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const success = db.deleteProject(req.params.id);
  res.json({ success });
});

// Save Version Snapshot
apiRouter.post('/projects/:id/versions', authMiddleware, (req: AuthRequest, res: Response) => {
  const project = db.getProjectById(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  const { versionName, summaryNote } = req.body;
  const version = {
    id: `v_${Date.now()}`,
    versionName: versionName || `Version ${ (project.versions?.length || 0) + 1 }`,
    createdAt: new Date().toISOString(),
    summaryNote: summaryNote || 'Saved snapshot before investor meeting.',
    dataSnapshot: { ...project }
  };

  project.versions = [version, ...(project.versions || [])];
  db.saveProject(project);
  res.json(project);
});

// --- AI Generation Routes ---
apiRouter.post('/ai/analyze', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { name, industry, problem, solution, targetCustomer, businessModel, stage, fundingGoal } = req.body;
  
  try {
    const summary = await generateExecutiveSummary({
      name,
      industry,
      problem,
      solution,
      targetCustomer,
      businessModel,
      stage,
      fundingGoal: Number(fundingGoal) || 1000000,
    });

    res.json({ executiveSummary: summary });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'AI analysis failed' });
  }
});

apiRouter.post('/ai/market-research', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { name, industry, targetCustomer, country } = req.body;
  try {
    const market = await generateMarketResearch({
      name,
      industry,
      targetCustomer,
      country: country || 'United States',
    });
    res.json({ marketResearch: market });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/ai/competitors', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { name, industry, solution } = req.body;
  try {
    const comps = await generateCompetitorAnalysis({ name, industry, solution });
    res.json({ competitors: comps });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/ai/pitch-deck', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { name, industry, problem, solution, fundingGoal, stage, businessModel } = req.body;
  try {
    const deck = await generatePitchDeck({
      name,
      industry,
      problem,
      solution,
      fundingGoal: Number(fundingGoal) || 1000000,
      stage,
      businessModel,
    });
    res.json({ pitchDeck: deck });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/ai/chat', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { messages, projectContext } = req.body;
  try {
    const reply = await chatWithCopilot({ messages, projectContext });
    res.json({ reply });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Investor Matching Routes ---
apiRouter.get('/investors', (req: AuthRequest, res: Response) => {
  res.json(SAMPLE_INVESTORS);
});

apiRouter.post('/investors/match', authMiddleware, (req: AuthRequest, res: Response) => {
  const { industry, stage, fundingGoal } = req.body;
  const matches: InvestorMatch[] = SAMPLE_INVESTORS.map((inv, idx) => {
    let score = 75;
    if (inv.industries.some(i => industry?.toLowerCase().includes(i.toLowerCase()))) score += 15;
    if (inv.stages.includes(stage)) score += 10;
    
    return {
      ...inv,
      matchScore: Math.min(99, score - idx * 3),
      matchReasoning: [
        `Active investor in ${stage} stage funding rounds`,
        `Typical check size ($${inv.checkSizeMin.toLocaleString()} - $${inv.checkSizeMax.toLocaleString()}) matches your $${Number(fundingGoal || 1000000).toLocaleString()} ask`,
        `Strong network in ${inv.industries.join(', ')}`
      ],
      outreachStatus: 'Not Contacted' as const
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json(matches);
});

apiRouter.post('/ai/investors', authMiddleware, (req: AuthRequest, res: Response) => {
  const { industry, stage, fundingGoal } = req.body;
  const matches: InvestorMatch[] = SAMPLE_INVESTORS.map((inv, idx) => {
    let score = 75;
    if (inv.industries.some(i => industry?.toLowerCase().includes(i.toLowerCase()))) score += 15;
    if (inv.stages.includes(stage)) score += 10;
    
    return {
      ...inv,
      matchScore: Math.min(99, score - idx * 3),
      matchReasoning: [
        `Active investor in ${stage} stage funding rounds`,
        `Typical check size ($${inv.checkSizeMin.toLocaleString()} - $${inv.checkSizeMax.toLocaleString()}) matches your $${Number(fundingGoal || 1000000).toLocaleString()} ask`,
        `Strong network in ${inv.industries.join(', ')}`
      ],
      outreachStatus: 'Not Contacted' as const
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({ investorMatches: matches });
});

apiRouter.post('/ai/outreach-email', authMiddleware, (req: AuthRequest, res: Response) => {
  const { startupName, tagline, investorName, fundName, fundingGoal, problem } = req.body;
  const draft = `Subject: Seed Round / ${startupName || 'AuraScale AI'} - $${Number(fundingGoal || 1500000).toLocaleString()} Seed Raise\n\nHi ${investorName || 'Partner'},\n\nI noticed ${fundName || 'your fund'}'s strong thesis in enterprise AI and developer workflows. I'm building ${startupName || 'AuraScale AI'} — ${tagline || 'AI-powered pitch deck & financial model automation'}.\n\nWe solve: ${problem || 'Founders spend 100+ hours manually crafting spreadsheets and deck slides'}.\n\nWe are currently raising our $${Number(fundingGoal || 1500000).toLocaleString()} Seed round with 60% committed. I'd love to share our 3-year financial model and product demo with you if you have 10 minutes this week.\n\nBest regards,\nFounder, ${startupName || 'AuraScale AI'}`;
  res.json({ emailDraft: draft });
});

// --- Notifications Routes ---
apiRouter.get('/notifications', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json(db.getNotifications());
});

apiRouter.post('/notifications/:id/read', authMiddleware, (req: AuthRequest, res: Response) => {
  db.markNotificationRead(req.params.id);
  res.json({ success: true });
});
