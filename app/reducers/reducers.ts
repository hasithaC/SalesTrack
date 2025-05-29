import {
  SET_CUSTOMER,
  SET_CUSTOMER_STATUS,
  SET_OPPORTUNITY,
} from '../actions/type';
import createReducer from '../helper/createReducer';
import {Customer, CustomerStatus, Opportunity} from '../models';

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
        const existingOpportunities = c.opportunities || [];

        const opportunityExists = existingOpportunities.some(
          (op: Opportunity) => op.id === opportunity.id,
        );

        let updatedOpportunities;
        if (opportunityExists) {
          // Update existing opportunity
          updatedOpportunities = existingOpportunities.map((op: Opportunity) =>
            op.id === opportunity.id ? opportunity : op,
          );
        } else {
          // Add new opportunity
          updatedOpportunities = [...existingOpportunities, opportunity];
        }

        return {
          ...c,
          opportunities: updatedOpportunities,
        };
      }
      return c;
    });

    return {
      ...state,
      customers: updatedCustomers,
    };
  },

  [SET_CUSTOMER_STATUS](
    state: any,
    action: {payload: {customer: Customer; status: CustomerStatus}},
  ) {
    const {customer, status} = action.payload;

    const updatedCustomers = state.customers.map((c: Customer) => {
      if (c.id === customer.id) {
        return {
          ...c,
          status,
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
