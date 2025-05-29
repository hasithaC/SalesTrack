import {Customer} from '../models';
import {SET_CUSTOMER} from './type';

export const setCustomer = (customer: Customer) => {
  return {
    type: SET_CUSTOMER,
    payload: customer,
  };
};
