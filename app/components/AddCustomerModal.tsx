import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AppTextInput from './AppTextInput';
import ConfirmCancelButton from './ConfirmCancelButton';
import HorizontalRadioGroup from './HorizontalRadioGroup';
import {Customer, CustomerStatus} from '../models';
import {useDispatch} from 'react-redux';
import {setCustomer} from '../actions/action';

type Props = {
  visibility: boolean;
  onPressClose: () => void;
};

const AddCustomerModal = ({visibility, onPressClose}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<CustomerStatus>('Active');
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
  if (visibility) {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setStatus('Active');
    setFormError('');
  }
}, [visibility]);

  const validate = (): boolean => {
    if (!name.trim()) {
      setFormError('Name is required');
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormError('Valid email is required');
      return false;
    }
    if (!phone.trim() || !/^[0-9]{10,15}$/.test(phone)) {
      setFormError('Valid phone number is required');
      return false;
    }
    if (!address.trim()) {
      setFormError('Address is required');
      return false;
    }

    setFormError('');
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;

    const customer: Customer = {
      id: uuid.v4().toString(),
      name,
      email,
      phone,
      address,
      status,
      opportunities: [],
    };

    dispatch(setCustomer(customer));
    onPressClose();
  };

  return (
    <Modal animationType="none" transparent={true} visible={visibility}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Customer</Text>

          <AppTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AppTextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <AppTextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            keyboardType="default"
            multiline={true}
          />

          <HorizontalRadioGroup
            label="Customer Status"
            options={['Active', 'Lead', 'Inactive']}
            selected={status}
            onChange={value => setStatus(value as CustomerStatus)}
          />

          {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

          <ConfirmCancelButton onCancel={onPressClose} onSave={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

export default AddCustomerModal;

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
