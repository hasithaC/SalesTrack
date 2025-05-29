import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Customer, CustomerStatus} from '../models';
import NavigationManager from '../navigations/NavigationManager';
import {CaretLeft, FloppyDisk, Plus} from 'phosphor-react-native';
import HorizontalRadioGroup from './HorizontalRadioGroup';
import {useDispatch} from 'react-redux';
import {setCustomerStatus} from '../actions/action';
import OpportunityModal from './OpportunityModal';

type Props = {
  customer: Customer;
};

const CustomerDetail = ({customer}: Props) => {
  const [status, setStatus] = useState<CustomerStatus>(customer.status);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              NavigationManager.goBack();
            }}>
            <CaretLeft size={28} color="#007BFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Customer Details</Text>

          {customer.status !== status ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setCustomerStatus({customer: customer, status: status}),
                );
              }}>
              <FloppyDisk size={28} color="#007BFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.navIconSpacer} />
          )}
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{customer.name[0]}</Text>
        </View>

        {/* Screen Title */}
        <Text style={styles.nameText}>{customer.name}</Text>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{customer.id}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{customer.email}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{customer.email}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{customer.phone}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{customer.address}</Text>
        </View>

        <HorizontalRadioGroup
          label="Customer Status"
          options={['Active', 'Lead', 'Inactive']}
          selected={status}
          onChange={value => setStatus(value as CustomerStatus)}
        />

        <View style={styles.subHeader}>
          <Text style={styles.sectionTitle}>Opportunities</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Plus size={28} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View>
      <OpportunityModal
        customer={customer}
        visibility={modalVisible}
        onPressClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default CustomerDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  navIconSpacer: {
    width: 28,
  },

  avatarContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 45,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },

  nameText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },

  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontWeight: '600',
  },
  value: {
    flex: 3,
    fontSize: 16,
    textAlign: 'right',
  },
  colon: {
    fontWeight: '600',
    marginHorizontal: 10,
  },

  subHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    marginVertical: 10,
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
    textAlign: 'center',
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
