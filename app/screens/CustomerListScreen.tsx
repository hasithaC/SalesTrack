import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Customer} from '../models'; // Adjust this import based on your folder structure
import {Plus} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';
import NavigationManager from '../navigations/NavigationManager';
import AddCustomerModal from '../components/AddCustomerModal';

const statusColors: Record<string, string> = {
  Active: '#4CAF50',
  Inactive: '#9E9E9E',
  Lead: '#FF9800',
};

const CustomerListScreen = () => {
  const customers: Customer[] = useSelector(
    (state: any) => state.commonReducer.customers,
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
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.contact}>{item.email}</Text>
        </View>
        <View
          style={[
            styles.statusBox,
            {backgroundColor: statusColors[item.status] || '#ccc'},
          ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Plus size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={customers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
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
    paddingHorizontal: 16,
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
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
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
  statusBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
