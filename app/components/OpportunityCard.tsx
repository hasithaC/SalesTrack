import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import HorizontalRadioGroup from './HorizontalRadioGroup';
import { Customer, Opportunity } from '../models';
import OpportunityModal from './OpportunityModal';

type Props = {
    opportunity: Opportunity
    customer: Customer
}
const OpportunityCard = ({opportunity, customer}:Props) => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.opportunityCard}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.opportunityName}>{opportunity.name}</Text>
        <HorizontalRadioGroup
          label="Opportunity Status"
          options={['New', 'Closed Won', 'Closed Lost']}
          selected={opportunity.status}
          disabled={true}
        />
      </TouchableOpacity>

      <OpportunityModal
        opportunity={opportunity}
        customer={customer}
        visibility={modalVisible}
        onPressClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default OpportunityCard;

const styles = StyleSheet.create({
    opportunityCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  opportunityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222',
  },
});
