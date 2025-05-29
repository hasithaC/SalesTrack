import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Customer} from '../models';
import {Plus} from 'phosphor-react-native';
import NavigationManager from '../navigations/NavigationManager';
import AddCustomerModal from '../components/AddCustomerModal';
import HorizontalRadioGroup from '../components/HorizontalRadioGroup';

const CustomerListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const customers: Customer[] = useSelector(
    (state: any) => state.commonReducer.customers,
  );
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}: {item: Customer}) => {
    const initial = item.name ? item.name[0].toUpperCase() : '?';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          NavigationManager.navigate('CustomerDetail', {customer: item});
        }}>
        <View style={styles.cardTitleView}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.name} adjustsFontSizeToFit>
              {item.name}
            </Text>
            <Text style={styles.contact} adjustsFontSizeToFit>
              {item.phone}
            </Text>
          </View>

          <Text
            style={
              styles.oppaturnity
            }>{`Num Of Opp ${item.opportunities.length}`}</Text>
        </View>

        <HorizontalRadioGroup
          label="Customer Status"
          options={['Active', 'Lead', 'Inactive']}
          selected={item.status}
          disabled={true}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Plus size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={filteredCustomers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />

      <AddCustomerModal
        visibility={modalVisible}
        onPressClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default CustomerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitleView: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D1D1D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  contact: {
    fontSize: 14,
    color: '#777',
  },
  oppaturnity: {
    textAlign: 'center',
    color: '#007BFF',
    fontStyle: 'italic',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
