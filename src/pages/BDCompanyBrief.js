import React, { useState } from "react";
import { Building2, TrendingUp, AlertTriangle, Cpu, Leaf, Zap, ExternalLink } from "lucide-react";
import { BD_MEETING } from "../data/dummy";
import { useClaude, PROMPTS } from "../hooks/useClaude";
import SlidePanel from "../components/SlidePanel";

const StatBar = ({ label, value, color }) => (
  <div className="stat-bar-row">
    <span className="stat-bar-label">{label}</span>
    <div className="stat-bar-track">
      <div className="stat-bar-fill" style={{ width: `${value}%`, background: color }} />
    </div>
    <span className="stat-bar-value">{value}</span>
  </div>
);

const ThemeTag = ({ theme }) => {
  const icons = { "AI": <Cpu size={10} />, "ESG": <Leaf size={10} />, "DORA": <AlertTriangle size={10} /> };
  const icon = Object.keys(icons).find((k) => theme.includes(k));
  return (
    <div className="theme-tag">
      {icon ? icons[icon] : <Zap size={10} />}
      {theme}
    </div>
  );
};

export default function BDCompanyBrief() {
  const { company, contact } = BD_MEETING;
  const { callClaude, loading } = useClaude();
  const [brief, setBrief] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const generateBrief = async () => {
    setPanelOpen(true);
    const { system, user, dummyKey } = PROMPTS.bdBrief(company, contact);
    const result = await callClaude(system, user, 600, dummyKey);
    setBrief(result);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Business Development</div>
          <h1 className="page-title">{company.name}</h1>
          <div className="page-meta">
            <span>{company.sector}</span>
            <span className="meta-dot" />
            <span>{company.hq}</span>
            <span className="meta-dot" />
            <span>{company.ticker}</span>
          </div>
        </div>
        <button className="btn-primary" onClick={generateBrief}>
          <Zap size={14} />
          Generate AI Brief
        </button>
      </div>

      <div className="grid-2">
        {/* Company Overview */}
        <div className="card">
          <div className="card-header">
            <Building2 size={14} className="card-icon" />
            <span>Company Overview</span>
          </div>
          <p className="body-text">{company.description}</p>
          <div className="kv-grid">
            <div className="kv-item"><div className="kv-label">Revenue</div><div className="kv-value">{company.revenue}</div></div>
            <div className="kv-item"><div className="kv-label">Employees</div><div className="kv-value">{company.employees}</div></div>
            <div className="kv-item"><div className="kv-label">Market Cap</div><div className="kv-value">{company.marketCap}</div></div>
            <div className="kv-item"><div className="kv-label">Credit Rating</div><div className="kv-value">{company.rating}</div></div>
          </div>
        </div>

        {/* Health Indicators */}
        <div className="card">
          <div className="card-header">
            <TrendingUp size={14} className="card-icon" />
            <span>Strategic Health Indicators</span>
          </div>
          <div className="stat-bars">
            <StatBar label="Financial Health" value={company.financialHealth} color="#059669" />
            <StatBar label="Digital Maturity" value={company.digitalMaturity} color="#0284C7" />
            <StatBar label="Regulatory Pressure" value={company.regulatoryPressure} color="#D97706" />
          </div>
          <div className="card-divider" />
          <div className="card-subheader">Key Strategic Themes</div>
          <div className="theme-tags">
            {company.keyThemes.map((t) => <ThemeTag key={t} theme={t} />)}
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div className="card contact-card">
        <div className="card-header">
          <span>Your Contact</span>
          <a href={`https://${contact.linkedin}`} className="external-link" target="_blank" rel="noreferrer">
            <ExternalLink size={12} /> LinkedIn
          </a>
        </div>
        <div className="contact-layout">
          <div className="contact-avatar">
            {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="contact-info">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-title">{contact.title}</div>
            <div className="contact-tenure">{contact.tenure}</div>
            <p className="body-text contact-bg">{contact.background}</p>
          </div>
          <div className="contact-activity">
            <div className="card-subheader">Recent Activity</div>
            {contact.recentActivity.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot" />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Opportunities */}
      <div className="card">
        <div className="card-header">
          <TrendingUp size={14} className="card-icon amber" />
          <span>Open Opportunities (CRM)</span>
          <span className="source-badge">Salesforce</span>
        </div>
        <div className="opportunities">
          {BD_MEETING.openOpportunities.map((opp, i) => (
            <div key={i} className="opp-row">
              <div className="opp-info">
                <div className="opp-title">{opp.title}</div>
                <div className="opp-owner">{opp.owner}</div>
              </div>
              <div className="opp-stage">{opp.stage}</div>
              <div className="opp-value">{opp.value}</div>
              <div className="opp-prob-wrap">
                <div className="opp-prob-bar">
                  <div className="opp-prob-fill" style={{ width: `${opp.probability}%` }} />
                </div>
                <span className="opp-prob-label">{opp.probability}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title="AI Pre-Meeting Brief"
        subtitle={`${company.name} · ${contact.name}`}
        content={brief}
        loading={loading}
        onRegenerate={generateBrief}
        onApprove={(text) => console.log("Approved brief:", text)}
      />
    </div>
  );
}
