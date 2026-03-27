import React, { useState, useEffect } from "react";
import { X, Check, RefreshCw, Copy, ChevronRight } from "lucide-react";

export default function SlidePanel({ open, onClose, title, subtitle, content, loading, onRegenerate, onApprove }) {
  const [editedContent, setEditedContent] = useState(content || "");
  const [copied, setCopied] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    setEditedContent(content || "");
    setApproved(false);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApprove = () => {
    setApproved(true);
    if (onApprove) onApprove(editedContent);
  };

  return (
    <>
      <div className={`panel-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`slide-panel ${open ? "open" : ""}`}>
        <div className="panel-header">
          <div>
            <div className="panel-title">{title}</div>
            {subtitle && <div className="panel-subtitle">{subtitle}</div>}
          </div>
          <button className="panel-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="panel-body">
          {loading ? (
            <div className="panel-loading">
              <div className="loading-pulse">
                <div className="pulse-bar" />
                <div className="pulse-bar short" />
                <div className="pulse-bar" />
                <div className="pulse-bar medium" />
                <div className="pulse-bar short" />
              </div>
              <div className="loading-label">Claude is drafting…</div>
            </div>
          ) : (
            <>
              <div className="panel-source-tag">
                <span className="source-dot" />
                AI Draft — Review before sending
              </div>
              <textarea
                className="panel-editor"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                spellCheck={false}
              />
            </>
          )}
        </div>

        {!loading && (
          <div className="panel-actions">
            <button className="panel-btn secondary" onClick={handleCopy}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
            {onRegenerate && (
              <button className="panel-btn secondary" onClick={onRegenerate}>
                <RefreshCw size={13} />
                Regenerate
              </button>
            )}
            <button
              className={`panel-btn primary ${approved ? "approved" : ""}`}
              onClick={handleApprove}
              disabled={approved}
            >
              {approved ? (
                <>
                  <Check size={13} /> Approved
                </>
              ) : (
                <>
                  <ChevronRight size={13} /> Approve & Use
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
