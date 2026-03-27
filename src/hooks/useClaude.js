import { useState } from "react";

// ─── Dummy Responses ────────────────────────────────────────────────────────
const DUMMY_RESPONSES = {
  bdBrief: `PRE-MEETING BRIEF — Horizon Bank N.V.
Contact: Sophie van Beek, Head of Regulatory Affairs & Compliance
Prepared: 27 March 2026

COMMERCIAL ANGLES

• DORA Remediation Gap — Horizon Bank is publicly behind on third-party ICT risk management. Our DORA gap assessment offer is directly aligned with Sophie's mandate. She owns the problem; we can own the solution. Position this as execution support, not advisory.

• CSRD Data Architecture — The regulator has flagged European banks' data quality issues in climate disclosures. With Sophie's ESG exposure at board level, there's a natural entry point for a data architecture engagement tied to CSRD compliance timelines (FY2025 reporting due mid-2026).

• RegTech Operating Model — Horizon Bank's €200M AI compliance investment signals internal appetite for transformation. There's a strong case for an external view on governance, vendor selection, and integration risk. Frame as risk mitigation, not change management.

SMART QUESTIONS TO ASK

• "Where in the DORA remediation programme are you finding the most friction — is it the third-party register, contractual remediation, or the testing regime?"
• "How is the CSRD data quality programme being governed — is it sitting with you or with Finance?"
• "With the AI compliance investment announced, how are you thinking about the build vs buy vs partner question on the tooling side?"

RISKS TO BE AWARE OF

• Erik Janssen has an active DORA proposal in flight (€380K, 65%). Avoid stepping on that relationship — coordinate before the meeting.
• Sophie came from the central bank — she will be rigorous and sceptical of consultant overreach. Lead with substance, not credentials.
• Horizon Bank may be in a procurement freeze given NII compression and cost programme. Be ready to scope down or phase.

RECOMMENDED OPENING POSITIONING

Open by acknowledging her recent promotion and the Risk Amsterdam forum appearance — genuine, not flattery. Frame the conversation as a peer exchange on where regulatory pressure is landing hardest in 2026, not a pitch. Let the commercial conversation follow naturally from the themes she raises.`,

  followUpEmail: `Thank you all for a productive steering committee session this afternoon. I wanted to follow up quickly with a summary of where we landed and the actions we agreed.

On the data access blocker: we confirmed this needs to be escalated to CFO level to unlock progress on the origination workstream. Ruben has committed to securing that sign-off by 2 April — this is the critical path item for the next two weeks.

On the options paper: we've revised the deadline to 4 April, with Tom as owner. Given the data constraints, the paper will present three scenarios including a reduced-dependency option.

On budget: Nina, as discussed, I'll prepare a concise business case for the change request by 7 April. I'll keep it tight — one page, with a clear cost-benefit framing and risk-adjusted scenarios.

On pilot scope: Eva's proposal to reduce the pilot to two branches is a sensible de-risking move. We'll incorporate this into the revised Q2 roadmap and present it at the next SteerCo.

Agreed actions summary:
1. Data access escalation to CFO — Ruben Kok — by 2 April
2. Data architecture options paper — Tom Hendriks — by 4 April
3. Budget change request business case — Max van Dalen — by 7 April
4. Revised Q2 roadmap including pilot scope reduction — Lisa de Witt — by 9 April
5. Next SteerCo invitation — Max van Dalen — to be sent this week, provisionally 11 April

Thanks again for the constructive session. Looking forward to the next one.

Warm regards,
Max`,

  nextMeetingAgenda: `STEERING COMMITTEE — PHASE 2 PROGRESS REVIEW
Atlas Bank Mortgage Operations Transformation
Proposed date: Friday 11 April 2026, 14:00–15:00
Location: Atlas Bank HQ, Amsterdam + Teams

AGENDA

1. Welcome & housekeeping (5 min)
   Chair: Max van Dalen

2. Action review from 28 March SteerCo (10 min)
   • Data access escalation: CFO sign-off status (Ruben Kok)
   • Options paper: review and sign-off (Tom Hendriks)
   • Budget change request: business case presentation (Max van Dalen)

3. Q2 roadmap — revised plan (15 min)
   • Revised milestone schedule incorporating pilot scope reduction
   • IT integration blueprint: status and dependencies
   • Decision required: approve revised Q2 roadmap

4. Budget change request — decision (10 min)
   • Business case presentation (Max)
   • Decision required: approve / defer / reject change request

5. Risks & issues update (5 min)
   • Origination workstream timeline risk
   • Data dependency mitigation options

6. AOB & next steps (5 min)

PRE-READS TO BE CIRCULATED BY 9 APRIL
• Data architecture options paper (Tom Hendriks)
• Budget change request business case (Max van Dalen)
• Revised Q2 roadmap (Lisa de Witt)`,

  meetingInsights: `KEY THEMES EMERGING
• Data access is the critical path blocker — this is political, not technical. The CFO escalation is the right lever but carries risk if not framed correctly.
• Budget sensitivity is higher than anticipated. Nina's reaction suggests the change request will face scrutiny — lead with risk framing, not scope expansion.
• Eva's pilot scope reduction proposal signals client-side anxiety about delivery confidence.

RISKS & TENSIONS DETECTED
• Ruben's data access issue has been open since 14 March — a second SteerCo without resolution will erode credibility. Push for a firm commitment and owner today.
• Nina's "business case first" response to the budget discussion is a soft rejection signal. Avoid pushing further in this session.
• Timeline risk on origination workstream is not yet formally logged — consider proposing a risk register update before close.

DECISIONS CRYSTALLISING
• Pilot scope reduction (2 branches vs 5) — push for a decision in principle today
• Data access escalation path — agree owner and deadline explicitly

SUGGESTED INTERVENTIONS
• "Ruben, can we get a firm commitment on the CFO conversation — specifically a date and what you need from us to support that conversation?"
• "Nina, to make sure the business case lands well — is the primary concern budget quantum, or is it more about demonstrating ROI on the scope expansion?"
• Consider calling a time-check on agenda item 4 and proposing to park the budget conversation to a bilateral before next SteerCo.`,

  fallback: `Analysis complete. Based on the information provided, here are the key findings and recommended next steps for your review. Please edit as needed before approving.`,
};

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useClaude() {
  const [loading, setLoading] = useState(false);

  const callClaude = async (_system, _user, _maxTokens, dummyKey = "fallback") => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 500));
    setLoading(false);
    return DUMMY_RESPONSES[dummyKey] ?? DUMMY_RESPONSES.fallback;
  };

  return { callClaude, loading, error: null };
}

// ─── Prompts ─────────────────────────────────────────────────────────────────

export const PROMPTS = {
  bdBrief: (_company, _contact) => ({ system: "", user: "", dummyKey: "bdBrief" }),
  followUpEmail: (_meeting, _notes) => ({ system: "", user: "", dummyKey: "followUpEmail" }),
  nextMeetingAgenda: (_meeting, _notes) => ({ system: "", user: "", dummyKey: "nextMeetingAgenda" }),
  meetingInsights: (_meeting, _notes) => ({ system: "", user: "", dummyKey: "meetingInsights" }),
};
