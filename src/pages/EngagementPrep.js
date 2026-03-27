import React from "react";
import { Calendar, Clock, MapPin, Users, CheckSquare, AlertCircle, TrendingUp } from "lucide-react";
import { ENGAGEMENT } from "../data/dummy";

const STATUS_CONFIG = {
  done: { label: "Done", color: "#059669", bg: "rgba(5,150,105,0.10)" },
  "on-track": { label: "On Track", color: "#0284C7", bg: "rgba(2,132,199,0.10)" },
  "at-risk": { label: "At Risk", color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  overdue: { label: "Overdue", color: "#DC2626", bg: "rgba(220,38,38,0.10)" },
};

const HEALTH_CONFIG = {
  green: { label: "On Track", color: "#059669" },
  amber: { label: "At Risk", color: "#D97706" },
  red: { label: "Off Track", color: "#DC2626" },
};

export default function EngagementPrep() {
  const { project, team, upcomingMeeting, previousMeetings, milestones } = ENGAGEMENT;
  const health = HEALTH_CONFIG[project.health];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Engagement</div>
          <h1 className="page-title">{project.name}</h1>
          <div className="page-meta">
            <span>{project.client}</span>
            <span className="meta-dot" />
            <span>{project.phase}</span>
            <span className="meta-dot" />
            <div className="health-pill" style={{ color: health.color, borderColor: `${health.color}40` }}>
              <div className="health-dot" style={{ background: health.color }} />
              {health.label}
            </div>
          </div>
        </div>
      </div>

      {/* Project health bar */}
      <div className="card project-health-card">
        <div className="health-metrics">
          <div className="health-metric">
            <div className="health-metric-label">Budget Used</div>
            <div className="health-metric-value">{project.budgetUsed}%</div>
            <div className="health-metric-bar">
              <div className="health-metric-fill" style={{ width: `${project.budgetUsed}%`, background: project.budgetUsed > 80 ? "#DC2626" : "#0284C7" }} />
            </div>
            <div className="health-metric-sub">{project.budget} total</div>
          </div>
          <div className="health-metric-divider" />
          <div className="health-metric">
            <div className="health-metric-label">Timeline</div>
            <div className="health-metric-value amber">{project.health === "amber" ? "⚠ At Risk" : "On Track"}</div>
            <div className="health-metric-sub health-note">{project.healthNote}</div>
          </div>
          <div className="health-metric-divider" />
          <div className="health-metric">
            <div className="health-metric-label">Milestones</div>
            <div className="health-metric-value">
              {milestones.filter(m => m.status === "done").length}/{milestones.length}
            </div>
            <div className="health-metric-sub">completed</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Upcoming meeting */}
        <div className="card meeting-card">
          <div className="card-header">
            <Calendar size={14} className="card-icon amber" />
            <span>Upcoming Meeting</span>
            <span className="live-badge">Tomorrow</span>
          </div>
          <div className="meeting-title-row">
            <div className="meeting-title">{upcomingMeeting.title}</div>
          </div>
          <div className="meeting-details">
            <div className="meeting-detail"><Clock size={12} />{upcomingMeeting.time}</div>
            <div className="meeting-detail"><MapPin size={12} />{upcomingMeeting.location}</div>
            <div className="meeting-detail"><Users size={12} />{upcomingMeeting.attendees.length} attendees</div>
          </div>
          <div className="card-divider" />
          <div className="card-subheader">Agenda</div>
          <div className="agenda-list">
            {upcomingMeeting.agenda.map((item, i) => (
              <div key={i} className="agenda-item">
                <span className="agenda-num">{i + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prep notes */}
        <div className="card">
          <div className="card-header">
            <AlertCircle size={14} className="card-icon amber" />
            <span>Preparation Notes</span>
          </div>
          <p className="prep-notes">{upcomingMeeting.prepNotes}</p>

          <div className="card-divider" />
          <div className="card-subheader">Team</div>
          <div className="team-list">
            {team.map((member) => (
              <div key={member.name} className="team-member">
                <div className="team-avatar">{member.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role} · {member.firm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="card">
        <div className="card-header">
          <TrendingUp size={14} className="card-icon" />
          <span>Milestone Tracker</span>
        </div>
        <div className="milestone-timeline">
          {milestones.map((m, i) => {
            const cfg = STATUS_CONFIG[m.status];
            return (
              <div key={i} className="milestone-row">
                <div className="milestone-dot-wrap">
                  <div className="milestone-dot" style={{ background: cfg.color }} />
                  {i < milestones.length - 1 && <div className="milestone-line" />}
                </div>
                <div className="milestone-info">
                  <div className="milestone-name">{m.name}</div>
                  <div className="milestone-due">Due {new Date(m.due).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</div>
                </div>
                <div className="milestone-status" style={{ color: cfg.color, background: cfg.bg }}>
                  {cfg.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous meetings */}
      <div className="card">
        <div className="card-header">
          <CheckSquare size={14} className="card-icon" />
          <span>Previous Meetings & Open Actions</span>
        </div>
        {previousMeetings.map((mtg, i) => (
          <div key={i} className="prev-meeting">
            <div className="prev-meeting-header">
              <span className="prev-date">{new Date(mtg.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span className="prev-title">{mtg.title}</span>
            </div>
            {mtg.openActions.length > 0 && (
              <div className="open-actions">
                {mtg.openActions.map((action, j) => (
                  <div key={j} className="action-row">
                    <div className={`action-status-dot ${action.status}`} />
                    <span className="action-text">{action.action}</span>
                    <span className="action-owner">{action.owner}</span>
                    <span className={`action-due ${action.status === "overdue" ? "overdue" : ""}`}>
                      {action.status === "overdue" ? "⚠ " : ""}{new Date(action.due).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
