import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import BDCompanyBrief from "./pages/BDCompanyBrief";
import BDRelationshipMap from "./pages/BDRelationshipMap";
import BDNews from "./pages/BDNews";
import EngagementPrep from "./pages/EngagementPrep";
import EngagementLiveNotes from "./pages/EngagementLiveNotes";
import EngagementFollowUp from "./pages/EngagementFollowUp";
import "./App.css";

const PAGES = {
  "bd-brief": BDCompanyBrief,
  "bd-relationship": BDRelationshipMap,
  "bd-news": BDNews,
  "eng-prep": EngagementPrep,
  "eng-notes": EngagementLiveNotes,
  "eng-followup": EngagementFollowUp,
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("authenticated") === "true"
  );
  const [activePage, setActivePage] = useState("bd-brief");
  const PageComponent = PAGES[activePage] || BDCompanyBrief;

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <PageComponent />
      </main>
    </div>
  );
}
