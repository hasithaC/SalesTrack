import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomer} from './actions/action';

const Content = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: any) => state.commonReducer.customers);

  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Lead'>('Lead');

  const handleAddCustomer = () => {
    const newCustomer = {
      id: Date.now().toString(), // simple unique ID
      name,
      email,
      phone,
      status,
      opportunities: [],
    };
    dispatch(setCustomer(newCustomer));
    setAdding(false);
    setName('');
    setEmail('');
    setPhone('');
    setStatus('Lead');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers</Text>

      <FlatList
        data={customers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.customerItem}>
            <Text style={styles.customerText}>{item.name} - {item.status}</Text>
            <Text style={styles.customerText}>{item.email} | {item.phone}</Text>
          </View>
        )}
      />

      {adding ? (
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Button title="Save Customer" onPress={handleAddCustomer} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setAdding(true)}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Customer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  customerItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  customerText: {
    fontSize: 14,
  },
  form: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
