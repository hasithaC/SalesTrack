import {SET_CUSTOMER} from '../actions/type';
import createReducer from '../helper/CreateReducer';
import {Customer} from '../models';

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
});

