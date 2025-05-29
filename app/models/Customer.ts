import {Opportunity} from './Opportunity';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: CustomerStatus;
  opportunities: Opportunity[];
}

export type CustomerStatus = 'Active' | 'Inactive' | 'Lead';
