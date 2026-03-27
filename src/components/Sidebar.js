import React from "react";
import {
  TrendingUp,
  Users,
  Newspaper,
  Network,
  ClipboardList,
  FileEdit,
  Send,
  ChevronDown,
  ChevronRight,
  Zap,
} from "lucide-react";

const NAV = [
  {
    id: "bd",
    label: "Business Development",
    icon: TrendingUp,
    color: "#D97706",
    children: [
      { id: "bd-brief", label: "Company Brief", icon: Newspaper },
      { id: "bd-relationship", label: "Relationship Map", icon: Network },
      { id: "bd-news", label: "News & Intel", icon: TrendingUp },
    ],
  },
  {
    id: "engagement",
    label: "Engagement",
    icon: ClipboardList,
    color: "#0284C7",
    children: [
      { id: "eng-prep", label: "Meeting Prep", icon: ClipboardList },
      { id: "eng-notes", label: "Live Notes", icon: FileEdit },
      { id: "eng-followup", label: "Follow-Up", icon: Send },
    ],
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [expanded, setExpanded] = React.useState({ bd: true, engagement: true });

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={16} />
        </div>
        <div>
          <div className="logo-title">ClientIQ</div>
          <div className="logo-sub">Meridian Consulting</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map((section) => {
          const Icon = section.icon;
          const isExpanded = expanded[section.id];
          return (
            <div key={section.id} className="nav-section">
              <button
                className="nav-section-header"
                onClick={() => setExpanded((e) => ({ ...e, [section.id]: !e[section.id] }))}
              >
                <div className="nav-section-left">
                  <Icon size={14} style={{ color: section.color }} />
                  <span>{section.label}</span>
                </div>
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {isExpanded && (
                <div className="nav-children">
                  {section.children.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        className={`nav-item ${isActive ? "active" : ""}`}
                        onClick={() => onNavigate(item.id)}
                      >
                        <ItemIcon size={13} />
                        <span>{item.label}</span>
                        {isActive && <div className="nav-active-bar" style={{ background: section.color }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="meeting-badge">
          <div className="meeting-dot" />
          <div>
            <div className="meeting-badge-title">Next Meeting</div>
            <div className="meeting-badge-time">Tomorrow · 14:00</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
