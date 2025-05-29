import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AppTextInput from './AppTextInput';
import ConfirmCancelButton from './ConfirmCancelButton';
import HorizontalRadioGroup from './HorizontalRadioGroup';
import {Customer, Opportunity, OpportunityStatus} from '../models';
import {useDispatch} from 'react-redux';
import {setOpportunity} from '../actions/action';

type Props = {
  customer: Customer;
  visibility: boolean;
  onPressClose: () => void;
  opportunity?: Opportunity;
};

const OpportunityModal = ({
  visibility,
  customer,
  onPressClose,
  opportunity,
}: Props) => {
  const [name, setName] = useState(opportunity?.name ?? '');
  const [status, setStatus] = useState<OpportunityStatus>(
    opportunity?.status ?? 'New',
  );
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
      setName(opportunity?.name ?? '');
      setStatus(opportunity?.status ?? 'New');
      setFormError('');
  }, [visibility, opportunity]);

  const validate = (): boolean => {
    if (!name.trim()) {
      setFormError('Name is required');
      return false;
    }

    setFormError('');
    return true;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const newOpportunity: Opportunity = {
      id: opportunity?.id ?? uuid.v4().toString(),
      name,
      status,
    };

    dispatch(setOpportunity({opportunity: newOpportunity, customer: customer}));
    onPressClose();
  };

  return (
    <Modal animationType="none" transparent={true} visible={visibility}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Opportunity</Text>

          <AppTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />

          <HorizontalRadioGroup
            label="Opportunity Status"
            options={['New', 'Closed Won', 'Closed Lost']}
            selected={status}
            onChange={value => setStatus(value as OpportunityStatus)}
          />

          {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

          <ConfirmCancelButton onCancel={onPressClose} onSave={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

export default OpportunityModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  errorText: {
    color: '#D93025',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
});
