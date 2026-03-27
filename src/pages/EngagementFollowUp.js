import React, { useState } from "react";
import { Send, Calendar, Zap, FileText, Clock } from "lucide-react";
import { ENGAGEMENT } from "../data/dummy";
import { useClaude, PROMPTS } from "../hooks/useClaude";
import SlidePanel from "../components/SlidePanel";

const DEMO_NOTES = `Key outcomes from today's Steering Committee:
- Nina confirmed DORA remediation remains top priority for H1 2026
- Data access blocker escalated: Ruben to get CFO sign-off by April 2nd
- Agreed revised options paper deadline: April 4th (Tom Hendriks owner)
- Budget change request: Nina wants a formal business case before approval — Max to prepare 1-pager
- Pilot scope: Eva proposed reducing Phase 2 pilot from 5 branches to 2 to de-risk timeline
- Q2 roadmap confirmed as presented, with IT integration blueprint due April 15th
- Next SteerCo provisionally set for April 11th`;

export default function EngagementFollowUp() {
  const [notes, setNotes] = useState(DEMO_NOTES);
  const [panelContent, setPanelContent] = useState(null);
  const [panelTitle, setPanelTitle] = useState("");
  const [panelSubtitle, setPanelSubtitle] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const { callClaude, loading } = useClaude();
  const { upcomingMeeting } = ENGAGEMENT;

  const generate = async (type) => {
    setActiveType(type);
    setPanelOpen(true);
    setPanelContent(null);

    let system, user, dummyKey, title, subtitle;
    if (type === "email") {
      ({ system, user, dummyKey } = PROMPTS.followUpEmail(upcomingMeeting, notes));
      title = "Follow-Up Email Draft";
      subtitle = `To: ${upcomingMeeting.attendees.join(", ")}`;
    } else {
      ({ system, user, dummyKey } = PROMPTS.nextMeetingAgenda(upcomingMeeting, notes));
      title = "Next Meeting Agenda";
      subtitle = "Auto-drafted based on today's outcomes";
    }

    setPanelTitle(title);
    setPanelSubtitle(subtitle);
    const result = await callClaude(system, user, 700, dummyKey);
    setPanelContent(result);
  };

  const regenerate = () => generate(activeType);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Engagement</div>
          <h1 className="page-title">Follow-Up</h1>
          <div className="page-meta">
            <span>{upcomingMeeting.title}</span>
            <span className="meta-dot" />
            <span>{upcomingMeeting.date}</span>
          </div>
        </div>
      </div>

      {/* Meeting summary input */}
      <div className="card">
        <div className="card-header">
          <FileText size={14} className="card-icon" />
          <span>Meeting Notes — What happened?</span>
        </div>
        <p className="body-text" style={{ marginBottom: 12 }}>
          Review or edit the notes below. Claude will use these to draft the follow-up email and next meeting agenda.
        </p>
        <textarea
          className="followup-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Agentic action cards */}
      <div className="followup-actions">
        <div className="action-card" onClick={() => generate("email")}>
          <div className="action-card-icon">
            <Send size={20} />
          </div>
          <div className="action-card-body">
            <div className="action-card-title">Draft Follow-Up Email</div>
            <div className="action-card-desc">
              AI drafts a professional follow-up to all attendees, with confirmed decisions, action items, and next steps. You approve before sending.
            </div>
          </div>
          <div className="action-card-cta">
            <Zap size={13} />
            Generate
          </div>
        </div>

        <div className="action-card" onClick={() => generate("agenda")}>
          <div className="action-card-icon blue">
            <Calendar size={20} />
          </div>
          <div className="action-card-body">
            <div className="action-card-title">Draft Next Meeting Agenda</div>
            <div className="action-card-desc">
              AI proposes an agenda for the next steering committee based on open actions, decisions pending, and project status.
            </div>
          </div>
          <div className="action-card-cta">
            <Zap size={13} />
            Generate
          </div>
        </div>
      </div>

      {/* Action items extracted */}
      <div className="card">
        <div className="card-header">
          <Clock size={14} className="card-icon amber" />
          <span>Action Items (from notes)</span>
          <span className="source-badge">Auto-extracted</span>
        </div>
        <div className="extracted-actions">
          {[
            { action: "Data access escalation to CFO", owner: "Ruben Kok", due: "2 Apr", status: "new" },
            { action: "Data architecture options paper", owner: "Tom Hendriks", due: "4 Apr", status: "revised" },
            { action: "Budget change request business case", owner: "Max van Dalen", due: "7 Apr", status: "new" },
            { action: "Pilot scope reduction proposal", owner: "Eva Mulder", due: "11 Apr", status: "new" },
          ].map((a, i) => (
            <div key={i} className="extracted-action-row">
              <div className={`ea-status ${a.status}`}>{a.status}</div>
              <div className="ea-text">{a.action}</div>
              <div className="ea-owner">{a.owner}</div>
              <div className="ea-due">Due {a.due}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous send history */}
      <div className="card">
        <div className="card-header">
          <Send size={14} className="card-icon" />
          <span>Send History</span>
        </div>
        <div className="send-history">
          <div className="send-history-item">
            <div className="sh-date">7 Mar 2026</div>
            <div className="sh-title">Follow-up: Workstream Lead Sync</div>
            <div className="sh-status sent">Sent</div>
          </div>
          <div className="send-history-item">
            <div className="sh-date">21 Feb 2026</div>
            <div className="sh-title">Follow-up: Phase 1 Closeout SteerCo</div>
            <div className="sh-status sent">Sent</div>
          </div>
        </div>
      </div>

      <SlidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={panelTitle}
        subtitle={panelSubtitle}
        content={panelContent}
        loading={loading && !panelContent}
        onRegenerate={regenerate}
        onApprove={(text) => console.log("Approved:", text)}
      />
    </div>
  );
}
