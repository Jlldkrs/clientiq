import React, { useState } from "react";
import { Zap } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "demo@meridian.com" && password === "clientiq2026") {
      sessionStorage.setItem("authenticated", "true");
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">
          <div className="logo-icon">
            <Zap size={16} />
          </div>
          <div>
            <div className="logo-title">ClientIQ</div>
            <div className="logo-sub">MERIDIAN CONSULTING</div>
          </div>
        </div>
        <label className="login-label">Email</label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="you@meridian.com"
          autoFocus
        />
        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Enter password"
        />
        {error && <div className="login-error">{error}</div>}
        <button className="login-btn" type="submit">Sign In</button>
      </form>
    </div>
  );
}
