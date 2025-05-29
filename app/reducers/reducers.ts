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
  // Handles adding a new customer to the state
  [SET_CUSTOMER](state: any, action: {payload: Customer}) {
    const existingCustomers = Array.isArray(state.customers)
      ? state.customers
      : [];
    return {
      ...state,
      customers: [...existingCustomers, action.payload],
    };
  },
  // Handles adding or updating an opportunity for a specific customer
  [SET_OPPORTUNITY](
    state: any,
    action: {payload: {customer: Customer; opportunity: Opportunity}},
  ) {
    const {customer, opportunity} = action.payload;

    const updatedCustomers = state.customers.map((c: Customer) => {
      if (c.id === customer.id) {
        const existingOpportunities = c.opportunities || [];

        // Check if the opportunity already exists
        const opportunityExists = existingOpportunities.some(
          (op: Opportunity) => op.id === opportunity.id,
        );

        let updatedOpportunities;
        if (opportunityExists) {
         // If it exists, update the existing opportunity
          updatedOpportunities = existingOpportunities.map((op: Opportunity) =>
            op.id === opportunity.id ? opportunity : op,
          );
        } else {
          // Otherwise, add it as a new opportunity
          updatedOpportunities = [...existingOpportunities, opportunity];
        }

        // Return customer with updated opportunities
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

   // Handles updating a customer's status (e.g., Active, Lead, Inactive)
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
