export interface Opportunity {
  id: string;
  name: string;
  status: OpportunityStatus;
}

export type OpportunityStatus = 'New' | 'Closed Won' | 'Closed Lost';
