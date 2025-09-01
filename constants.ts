
import type { ProposalInputs } from './types';

export const PROPOSAL_PROMPT_TEMPLATE = (inputs: ProposalInputs): string => `
Act as an expert IT consultant and SaaS product designer.
Generate a professional consulting proposal based on the following details.
The tone should be clear, professional, persuasive, and use a consulting style.
Format the output using markdown with clear headings for each section (e.g., using '# ' for main headings and '## ' for subheadings).

**Client Name:** ${inputs.clientName}
**Industry:** ${inputs.industry}
**Problem Statement:** ${inputs.problemStatement}
**Proposed Solution:** ${inputs.solution}
**Scope of Work:** ${inputs.scope}
**Timeline:** ${inputs.timeline}
**Budget:** ${inputs.budget}
**Key Risks:** ${inputs.risks}
**Deliverables:** ${inputs.deliverables}
**Billing Preference:** ${inputs.billingPreference}

The consulting proposal MUST have these sections:
1.  **Executive Summary:** A concise overview of the client's problem, the proposed solution, and the expected outcomes.
2.  **Client Background & Problem:** Elaborate on the client's situation and the specific challenges they face, based on the problem statement provided.
3.  **Proposed Solution & Methodology:** Detail the solution you are proposing. Explain the methodology and approach you will take to implement it.
4.  **Scope of Work:** Clearly define what is included in the project and, if necessary, what is out of scope.
5.  **Project Timeline:** Provide a high-level timeline with key phases and milestones.
6.  **Budget & Pricing:**
    - State the total project cost clearly.
    - Provide 3 flexible payment options based on the client's preference:
      a) Milestone-based payments (Define the milestones and payment for each).
      b) Equal monthly installments over the project duration.
      c) A single upfront payment with a 5-10% discount.
    - Include this exact payment note: "To complete payment, you will receive a Google Pay / UPI QR code via WhatsApp or email from our team."
7.  **Key Risks & Mitigation Plan:** Identify potential risks and outline a plan to mitigate them.
8.  **Deliverables:** List the specific, tangible deliverables the client will receive.
9.  **Next Steps:** Outline the immediate next steps to get the project started (e.g., signing the proposal, initial deposit, kickoff meeting).
10. **About This Proposal:** Include this short note at the very end: "This proposal was generated using an AI-powered consulting assistant that helps consultants save time creating client-ready documents."

Generate the full proposal now.
`;
