# 🚀 FundPilot AI — AI Startup Funding Copilot

FundPilot AI is a full-stack AI-powered SaaS platform designed to help **startup founders evaluate business ideas, analyze markets, build financial projections, research competitors, and prepare for fundraising**.

The platform combines AI-powered business analysis, financial modeling, investor research, and interactive dashboards into a single workspace for startup planning.

## ✨ Features

* 🤖 AI-powered startup analysis
* 💡 Business idea validation
* 📊 Financial forecasting
* 💰 Funding analysis
* 🔎 Competitor research
* 🏢 Investor research
* 📑 Investor material generation
* 📈 Interactive analytics dashboards
* 📁 Startup project management
* 🔐 JWT authentication
* 📱 Responsive SaaS interface

## 🏗️ Architecture

```text
┌──────────────────────┐
│    React Frontend    │
│    SaaS Dashboard    │
└───────────┬──────────┘
            │ REST API
            ▼
┌──────────────────────┐
│   Node.js + Express  │
│      Backend API     │
└───────┬───────┬──────┘
        │       │
        ▼       ▼
┌────────────┐ ┌─────────────────┐
│  MongoDB   │ │    OpenAI API   │
│ Startup    │ │ AI Analysis     │
│ Data       │ │ Generation      │
└────────────┘ └─────────────────┘
        │
        ▼
┌──────────────────────┐
│ Financial Analytics  │
│ & Reporting Engine   │
└──────────────────────┘
```

The React frontend communicates with the Express backend through REST APIs. The backend handles authentication, startup projects, AI workflows, financial analysis, and report generation while MongoDB stores application data.

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* OpenAI API
* JWT Authentication

### Development

* Git
* GitHub
* REST APIs
* npm

## 📁 Project Structure

```text
FundPilot-AI/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB
* OpenAI API key
* Git

### Clone Repository

```bash
git clone https://github.com/Divya-a-wq/FundPilot-AI.git

cd FundPilot-AI
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Configure Environment Variables

Create `.env` inside the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fundpilot
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

## 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## 🔌 API Endpoints

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a user             |
| POST   | `/api/auth/login`    | Authenticate a user         |
| POST   | `/api/projects`      | Create startup project      |
| GET    | `/api/projects`      | Retrieve startup projects   |
| POST   | `/api/analysis`      | Generate startup analysis   |
| POST   | `/api/financials`    | Generate financial analysis |
| POST   | `/api/reports`       | Generate startup report     |

## 🔄 Core Workflow

```text
Startup Idea
     ↓
Business Analysis
     ↓
Market & Competitor Analysis
     ↓
Financial Forecasting
     ↓
Funding Analysis
     ↓
Investor Research
     ↓
Reports & Investor Materials
```

## 🔮 Future Improvements

* Investor CRM integration
* PDF pitch deck export
* AI-generated pitch decks
* Advanced financial modeling
* Team collaboration
* Real-time fundraising analytics
* Startup valuation analysis
* Investor matching
* Market intelligence dashboard
* RAG-powered startup research

## 👩‍💻 Author

**Divya Nishad**

GitHub:
https://github.com/Divya-a-wq/FundPilot-AI

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
