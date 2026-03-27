# ClientIQ — Agentic Client Development Dashboard

A Big 4 consulting intelligence dashboard with two modules:
- **Business Development** — Company brief, relationship map, news feed
- **Engagement** — Meeting prep, live notes with AI insights, AI-powered follow-up

Built with React + Claude API (Anthropic). Designed for Financial Services consulting.

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### 1. Create a new GitHub repository
Create a repo named `clientiq` (or any name) on GitHub.

### 2. Push this code
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/clientiq.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save

### 4. Trigger deployment
Push any change to `main`, or go to **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

Your app will be live at: `https://YOUR_USERNAME.github.io/clientiq/`

---

## 🔑 API Key Note
AI features currently use hardcoded dummy responses — no API key is required. If you add a real Claude API integration in the future, **never embed API keys in the client bundle**. Use a backend proxy instead.

---

## 💻 Run locally
```bash
npm install
npm start
```

---

## 🏗 Project Structure
```
src/
  data/dummy.js          — All dummy data (BD scenario + engagement scenario)
  hooks/useClaude.js     — Claude API hook + prompt library
  components/
    Sidebar.js           — Navigation
    SlidePanel.js        — Slide-out AI draft panel (approve/edit/reject)
  pages/
    BDCompanyBrief.js    — Company overview + contact card + opportunities
    BDRelationshipMap.js — Warm intro network + colleague connections
    BDNews.js            — News feed with relevance scoring
    EngagementPrep.js    — Meeting prep, milestones, team
    EngagementLiveNotes.js — Live notes with real-time AI insights
    EngagementFollowUp.js  — AI follow-up email + next meeting agenda
  App.js                 — Routing
  App.css                — Complete stylesheet
```

---

## 🤖 AI Features
| Feature | Where | Prompt |
|---|---|---|
| Pre-meeting BD brief | BD → Company Brief → "Generate AI Brief" | Strategic commercial angles + smart questions |
| Real-time meeting insights | Engagement → Live Notes → "Get AI Insights" | Risk detection, decisions, interventions |
| Follow-up email draft | Engagement → Follow-Up → "Draft Follow-Up Email" | Professional email with action items |
| Next meeting agenda | Engagement → Follow-Up → "Draft Next Meeting Agenda" | Agenda with time allocations |

All AI outputs go through the **slide-out panel** with edit + approve/reject flow (human-in-the-loop).
