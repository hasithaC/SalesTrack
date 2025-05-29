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
import { Customer } from '../models';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            NavigationManager.goBack();
          }}>
          <CaretLeft size={28} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Customer Details</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{route.params.customer.name[0]}</Text>
      </View>

      {/* Screen Title */}
      <Text style={styles.title}>{route.params.customer.name}</Text>

      {/* Customer Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{route.params.customer.id}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{route.params.customer.email}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{route.params.customer.phone}</Text>

        {route.params.customer.address ? (
          <>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{route.params.customer.address}</Text>
          </>
        ) : null}

        <Text style={styles.label}>Status:</Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(route.params.customer.status)},
          ]}>
          <Text style={styles.statusText}>{route.params.customer.status}</Text>
        </View>
      </View>

      {/* Opportunities */}
      <View style={styles.subHeader}>
        <Text style={styles.sectionTitle}>Opportunities</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Plus size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>
      {route.params.customer.opportunities?.length ? (
        <FlatList
          data={route.params.customer.opportunities}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.opportunityCard}>
              <Text style={styles.opportunityName}>{item.name}</Text>
              <Text style={styles.opportunityStatus}>{item.status}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noOpportunities}>No opportunities available.</Text>
      )}

      <OpportunityModal
        customer={route.params.customer}
        visibility={modalVisible}
        onPressClose={() => {
          setModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CustomerDetailScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },

  subHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  container: {
    padding: 20,
  },
  avatarContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginVertical: 10,
  },
  detailContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  opportunityCard: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  opportunityName: {
    fontSize: 16,
    fontWeight: '500',
  },
  opportunityStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noOpportunities: {
    color: '#999',
    fontStyle: 'italic',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
