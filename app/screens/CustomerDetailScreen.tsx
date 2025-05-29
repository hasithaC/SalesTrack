import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  ArrowLeft,
  CaretLeft,
  NavigationArrow,
  Plus,
} from 'phosphor-react-native';
import NavigationManager from '../navigations/NavigationManager';
import AppTextInput from '../components/AppTextInput';
import OpportunityModal from '../components/OpportunityModal';
import {Customer} from '../models';
import AddCustomerModal from '../components/AddCustomerModal';
import CustomerDetail from '../components/CustomerDetail';
import {useSelector} from 'react-redux';
import HorizontalRadioGroup from '../components/HorizontalRadioGroup';
import OpportunityCard from '../components/OpportunityCard';

type CustomerStatus = 'Active' | 'Inactive' | 'Lead';
type OpportunityStatus = 'New' | 'Closed Won' | 'Closed Lost';

interface Opportunity {
  id: string;
  name: string;
  status: OpportunityStatus;
}

const getStatusColor = (status: CustomerStatus) => {
  switch (status) {
    case 'Active':
      return '#4CAF50';
    case 'Inactive':
      return '#9E9E9E';
    case 'Lead':
      return '#2196F3';
    default:
      return '#000';
  }
};

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
  },
  noOpportunities: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});
