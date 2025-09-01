
export interface ProposalInputs {
  clientName: string;
  industry: string;
  problemStatement: string;
  solution: string;
  scope: string;
  timeline: string;
  budget: string;
  risks: string;
  deliverables: string;
  billingPreference: BillingPreference;
}

export enum BillingPreference {
  Milestone = 'milestone-based',
  Monthly = 'monthly',
  Upfront = 'upfront',
}
