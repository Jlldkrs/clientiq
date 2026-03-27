import React from "react";
import { Network, Clock, Briefcase, MessageSquare } from "lucide-react";
import { BD_MEETING } from "../data/dummy";

const STRENGTH_CONFIG = {
  strong: { label: "Strong", color: "#059669", bg: "rgba(5,150,105,0.10)" },
  medium: { label: "Warm", color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  light: { label: "Light", color: "#64748B", bg: "rgba(100,116,139,0.10)" },
};

function daysSince(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
  if (diff < 30) return `${diff}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

function RelationshipCard({ person }) {
  const cfg = STRENGTH_CONFIG[person.connectionStrength];
  return (
    <div className="rel-card" style={{ "--accent": cfg.color, "--accent-bg": cfg.bg }}>
      <div className="rel-card-top">
        <div className="rel-avatar">{person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
        <div className="rel-info">
          <div className="rel-name">{person.name}</div>
          <div className="rel-role">{person.role}</div>
          <div className="rel-tenure">{person.firmTenure} at firm</div>
        </div>
        <div className="rel-strength-badge" style={{ color: cfg.color, background: cfg.bg }}>
          {cfg.label}
        </div>
      </div>

      <div className="rel-details">
        <div className="rel-detail-row">
          <Clock size={11} />
          <span>Last contact: {daysSince(person.lastContact)} via {person.contactMethod}</span>
        </div>
        {person.sharedProjects.length > 0 && (
          <div className="rel-detail-row">
            <Briefcase size={11} />
            <span>{person.sharedProjects.join(" · ")}</span>
          </div>
        )}
        {person.notes && (
          <div className="rel-detail-row">
            <MessageSquare size={11} />
            <span className="rel-notes">{person.notes}</span>
          </div>
        )}
      </div>

      <div className="rel-card-footer">
        <button className="rel-action-btn">Request Intro</button>
        <button className="rel-action-btn">View in CRM</button>
      </div>
    </div>
  );
}

export default function BDRelationshipMap() {
  const { contact, relationshipMap } = BD_MEETING;

  const strong = relationshipMap.filter((r) => r.connectionStrength === "strong");
  const medium = relationshipMap.filter((r) => r.connectionStrength === "medium");
  const light = relationshipMap.filter((r) => r.connectionStrength === "light");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Business Development</div>
          <h1 className="page-title">Relationship Map</h1>
          <div className="page-meta">
            <span>Colleagues who know</span>
            <span className="contact-highlight">{contact.name}</span>
            <span className="meta-dot" />
            <span>{contact.title}</span>
          </div>
        </div>
      </div>

      {/* Target contact summary */}
      <div className="card target-card">
        <div className="target-avatar">
          {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="target-info">
          <div className="target-name">{contact.name}</div>
          <div className="target-title">{contact.title} · Horizon Bank</div>
        </div>
        <div className="target-stats">
          <div className="target-stat">
            <div className="target-stat-value" style={{ color: "#059669" }}>{strong.length}</div>
            <div className="target-stat-label">Strong</div>
          </div>
          <div className="target-stat">
            <div className="target-stat-value" style={{ color: "#D97706" }}>{medium.length}</div>
            <div className="target-stat-label">Warm</div>
          </div>
          <div className="target-stat">
            <div className="target-stat-value" style={{ color: "#64748B" }}>{light.length}</div>
            <div className="target-stat-label">Light</div>
          </div>
        </div>
      </div>

      {/* Network visual */}
      <div className="card network-visual-card">
        <div className="card-header">
          <Network size={14} className="card-icon" />
          <span>Network Graph</span>
          <span className="source-badge">LinkedIn + Salesforce</span>
        </div>
        <div className="network-graph">
          {/* Central node */}
          <div className="graph-center">
            <div className="graph-node target-node">MvdB</div>
            <div className="graph-node-label">{contact.name.split(" ")[0]}</div>
          </div>
          {/* Connection lines visual */}
          <div className="graph-connections">
            {relationshipMap.map((person, i) => {
              const cfg = STRENGTH_CONFIG[person.connectionStrength];
              const angle = (i * 360) / relationshipMap.length;
              return (
                <div
                  key={person.id}
                  className="graph-spoke"
                  style={{
                    "--angle": `${angle}deg`,
                    "--color": cfg.color,
                  }}
                >
                  <div className="spoke-line" />
                  <div className="spoke-node" style={{ background: cfg.bg, borderColor: cfg.color, color: cfg.color }}>
                    {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="spoke-label">{person.name.split(" ")[0]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Relationship cards */}
      <div className="rel-section">
        <div className="rel-section-header">
          <div className="rel-section-dot" style={{ background: "#059669" }} />
          Strong Connections
        </div>
        <div className="rel-cards-grid">
          {strong.map((p) => <RelationshipCard key={p.id} person={p} />)}
        </div>
      </div>

      {medium.length > 0 && (
        <div className="rel-section">
          <div className="rel-section-header">
            <div className="rel-section-dot" style={{ background: "#D97706" }} />
            Warm Connections
          </div>
          <div className="rel-cards-grid">
            {medium.map((p) => <RelationshipCard key={p.id} person={p} />)}
          </div>
        </div>
      )}

      {light.length > 0 && (
        <div className="rel-section">
          <div className="rel-section-header">
            <div className="rel-section-dot" style={{ background: "#64748B" }} />
            Light Connections
          </div>
          <div className="rel-cards-grid">
            {light.map((p) => <RelationshipCard key={p.id} person={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
