import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

class NavigationManager {
  static navigate(name: string, params?: any) {
    if (navigationRef.current) {
      navigationRef.current.navigate(name as never, params as never);
    }
  }

  static goBack() {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current.goBack();
    }
  }
}

export default NavigationManager;
