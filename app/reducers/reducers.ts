import {SET_CUSTOMER, SET_OPPORTUNITY} from '../actions/type';
import createReducer from '../helper/createReducer';
import {Customer, Opportunity} from '../models';

const initialState = {
  customers: [],
};

export const commonReducer = createReducer(initialState, {
  [SET_CUSTOMER](state: any, action: {payload: Customer}) {
    const existingCustomers = Array.isArray(state.customers)
      ? state.customers
      : [];
    return {
      ...state,
      customers: [...existingCustomers, action.payload],
    };
  },
  [SET_OPPORTUNITY](
    state: any,
    action: {payload: {customer: Customer; opportunity: Opportunity}},
  ) {
    const {customer, opportunity} = action.payload;

    const updatedCustomers = state.customers.map((c: Customer) => {
      if (c.id === customer.id) {
        return {
          ...c,
          opportunities: [...(c.opportunities || []), opportunity],
        };
      }
      return c;
    });

    return {
      ...state,
      customers: updatedCustomers,
    };
  },
});
