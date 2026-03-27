import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
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
  const [activePage, setActivePage] = useState("bd-brief");
  const PageComponent = PAGES[activePage] || BDCompanyBrief;

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <PageComponent />
      </main>
    </div>
  );
}
