import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Customer} from '../models';
import CustomerDetail from '../components/CustomerDetail';
import {useSelector} from 'react-redux';
import OpportunityCard from '../components/OpportunityCard';



type CustomerDetailScreenProps = {
  route: {
    params: {
      customer: Customer;
    };
  };
};

const CustomerDetailScreen: React.FC<CustomerDetailScreenProps> = ({route}) => {
  const customer: Customer | undefined = useSelector((state: any) =>
    state.commonReducer.customers.find(
      (c: Customer) => c.id === route.params.customer.id,
    ),
  );
  return (
    <>
      <FlatList
        data={customer?.opportunities}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <OpportunityCard
            customer={customer ?? route.params.customer}
            opportunity={item}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noOpportunities}>
            No opportunities available.
          </Text>
        }
        ListHeaderComponent={
          <CustomerDetail customer={customer ?? route.params.customer} />
        }
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  );
};

export default CustomerDetailScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  noOpportunities: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});
