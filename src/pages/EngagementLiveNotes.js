import React, { useState, useRef } from "react";
import { FileEdit, Zap, Clock, Mic } from "lucide-react";
import { ENGAGEMENT } from "../data/dummy";
import { useClaude, PROMPTS } from "../hooks/useClaude";

const PLACEHOLDER = `Start typing your meeting notes here...

Example:
- Nina confirmed DORA remediation is top priority for H1
- Ruben: data access issue is political — needs CFO sign-off
- Agreed to prepare options paper by April 4th
- Budget change request: Nina cautious, wants business case first
- Eva proposed pilot scope reduction to de-risk timeline`;

export default function EngagementLiveNotes() {
  const [notes, setNotes] = useState("");
  const [insights, setInsights] = useState(null);
  const [recording, setRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const { callClaude, loading } = useClaude();
  const { upcomingMeeting } = ENGAGEMENT;

  const startTimer = () => {
    setRecording(true);
    setElapsedSeconds(0);
    timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
  };

  const stopTimer = () => {
    setRecording(false);
    clearInterval(timerRef.current);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const generateInsights = async () => {
    if (!notes.trim()) return;
    const { system, user, dummyKey } = PROMPTS.meetingInsights(upcomingMeeting, notes);
    const result = await callClaude(system, user, 500, dummyKey);
    setInsights(result);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Engagement</div>
          <h1 className="page-title">Live Notes</h1>
          <div className="page-meta">
            <span>{upcomingMeeting.title}</span>
            <span className="meta-dot" />
            <span>{upcomingMeeting.date} · {upcomingMeeting.time}</span>
          </div>
        </div>
        <div className="header-actions">
          <button
            className={`btn-record ${recording ? "recording" : ""}`}
            onClick={recording ? stopTimer : startTimer}
          >
            <div className={`record-dot ${recording ? "pulse" : ""}`} />
            {recording ? (
              <>Stop · {formatTime(elapsedSeconds)}</>
            ) : (
              <><Mic size={13} /> Start Timer</>
            )}
          </button>
        </div>
      </div>

      <div className="notes-layout">
        {/* Notes editor */}
        <div className="notes-main">
          <div className="card notes-card">
            <div className="card-header">
              <FileEdit size={14} className="card-icon" />
              <span>Meeting Notes</span>
              {recording && (
                <div className="recording-live">
                  <div className="record-dot pulse small" />
                  LIVE
                </div>
              )}
            </div>
            <textarea
              className="notes-textarea"
              placeholder={PLACEHOLDER}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              spellCheck={false}
            />
            <div className="notes-footer">
              <span className="notes-word-count">{notes.trim() ? notes.trim().split(/\s+/).length : 0} words</span>
              <button
                className="btn-primary"
                onClick={generateInsights}
                disabled={!notes.trim() || loading}
              >
                <Zap size={13} />
                {loading ? "Analysing…" : "Get AI Insights"}
              </button>
            </div>
          </div>

          {/* Agenda tracker */}
          <div className="card">
            <div className="card-header">
              <Clock size={14} className="card-icon" />
              <span>Agenda Tracker</span>
            </div>
            <div className="agenda-tracker">
              {upcomingMeeting.agenda.map((item, i) => (
                <AgendaTrackerItem key={i} index={i} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Insights panel */}
        <div className="notes-sidebar">
          <div className="card insights-card">
            <div className="card-header">
              <Zap size={14} className="card-icon amber" />
              <span>AI Insights</span>
            </div>
            {loading ? (
              <div className="insights-loading">
                <div className="pulse-bar" />
                <div className="pulse-bar short" />
                <div className="pulse-bar" />
              </div>
            ) : insights ? (
              <pre className="insights-text">{insights}</pre>
            ) : (
              <div className="insights-empty">
                <Zap size={24} className="insights-empty-icon" />
                <div className="insights-empty-title">Real-time intelligence</div>
                <div className="insights-empty-sub">Add meeting notes and click "Get AI Insights" for live analysis of risks, decisions, and smart interventions.</div>
              </div>
            )}
          </div>

          {/* Context panel */}
          <div className="card">
            <div className="card-header">
              <span>Meeting Context</span>
            </div>
            <div className="context-items">
              <div className="context-item">
                <div className="context-label">Project health</div>
                <div className="context-value amber">⚠ Amber</div>
              </div>
              <div className="context-item">
                <div className="context-label">Budget used</div>
                <div className="context-value">{ENGAGEMENT.project.budgetUsed}%</div>
              </div>
              <div className="context-item">
                <div className="context-label">Overdue actions</div>
                <div className="context-value red">1</div>
              </div>
              <div className="context-item">
                <div className="context-label">Phase</div>
                <div className="context-value">{ENGAGEMENT.project.phase}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaTrackerItem({ index, item }) {
  const [status, setStatus] = useState("pending");
  const statuses = ["pending", "in-progress", "done"];
  const colors = { pending: "#94A3B8", "in-progress": "#D97706", done: "#059669" };
  const next = () => setStatus(statuses[(statuses.indexOf(status) + 1) % 3]);

  return (
    <div className="tracker-item" onClick={next} style={{ "--dot-color": colors[status] }}>
      <div className="tracker-dot" />
      <span className="tracker-index">{index + 1}</span>
      <span className="tracker-text">{item}</span>
      <span className="tracker-status">{status === "in-progress" ? "In progress" : status === "done" ? "Done" : ""}</span>
    </div>
  );
}
