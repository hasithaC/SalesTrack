import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerListScreen from '../screens/CustomerListScreen';

const NavigationStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="CustomerListScreen" screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CustomerListScreen" component={CustomerListScreen} />
      <Stack.Screen name="Profile" component={CustomerListScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
