import {Customer, Opportunity} from '../models';
import {SET_CUSTOMER, SET_OPPORTUNITY} from './type';

export const setCustomer = (customer: Customer) => {
  return {
    type: SET_CUSTOMER,
    payload: customer,
  };
};

export const setOpportunity = (payload: {
  customer: Customer;
  opportunity: Opportunity;
}) => {
  return {
    type: SET_OPPORTUNITY,
    payload: payload,
  };
};
