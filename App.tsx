import {Provider} from 'react-redux';
import NavigationStack from './app/navigations/NavigationStack';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from './app/store/store';
import {SafeAreaView, StyleSheet} from 'react-native';
import { navigationRef } from './app/navigations/NavigationManager';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={style.safeArea}>
          <NavigationContainer ref={navigationRef}>
            <NavigationStack />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
