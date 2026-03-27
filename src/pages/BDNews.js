import React, { useState } from "react";
import { Newspaper, ExternalLink, Filter } from "lucide-react";
import { BD_MEETING } from "../data/dummy";

const REL_CONFIG = {
  high: { label: "High relevance", color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  medium: { label: "Medium relevance", color: "#0284C7", bg: "rgba(2,132,199,0.10)" },
  low: { label: "Low relevance", color: "#64748B", bg: "rgba(100,116,139,0.10)" },
};

const TAG_COLORS = {
  "AI / RegTech": "#7C3AED",
  Regulatory: "#D97706",
  Financial: "#059669",
  ESG: "#059669",
  DORA: "#DC2626",
};

export default function BDNews() {
  const [filter, setFilter] = useState("all");
  const news = BD_MEETING.news.filter((n) => filter === "all" || n.relevance === filter);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Business Development</div>
          <h1 className="page-title">News & Market Intel</h1>
          <div className="page-meta">
            <span>Horizon Bank N.V.</span>
            <span className="meta-dot" />
            <span>European Banking Sector</span>
            <span className="meta-dot" />
            <span className="live-badge">Live Feed</span>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="news-summary-bar">
        <div className="news-summary-item">
          <div className="news-summary-value amber">{BD_MEETING.news.filter((n) => n.relevance === "high").length}</div>
          <div className="news-summary-label">High relevance</div>
        </div>
        <div className="news-summary-divider" />
        <div className="news-summary-item">
          <div className="news-summary-value blue">{BD_MEETING.news.filter((n) => n.relevance === "medium").length}</div>
          <div className="news-summary-label">Medium relevance</div>
        </div>
        <div className="news-summary-divider" />
        <div className="news-summary-item">
          <div className="news-summary-value">{BD_MEETING.news.length}</div>
          <div className="news-summary-label">Total articles</div>
        </div>
        <div className="news-filter-group">
          <Filter size={12} />
          {["all", "high", "medium"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* News feed */}
      <div className="news-feed">
        {news.map((item) => {
          const rel = REL_CONFIG[item.relevance];
          const tagColor = TAG_COLORS[item.tag] || "#94A3B8";
          return (
            <div key={item.id} className="news-item">
              <div className="news-item-left">
                <div className="news-rel-indicator" style={{ background: rel.color }} />
              </div>
              <div className="news-item-body">
                <div className="news-item-meta">
                  <span className="news-source">{item.source}</span>
                  <span className="news-date">{new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="news-tag" style={{ color: tagColor, background: `${tagColor}18` }}>
                    {item.tag}
                  </span>
                </div>
                <div className="news-title">{item.title}</div>
                <div className="news-summary">{item.summary}</div>
                <div className="news-footer">
                  <div className="news-relevance-badge" style={{ color: rel.color, background: rel.bg }}>
                    {rel.label}
                  </div>
                  <button className="news-read-more">
                    Read full article <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
