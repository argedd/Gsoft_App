import React, { useEffect } from 'react'
import {  MD3DarkTheme as DefaultTheme,PaperProvider } from 'react-native-paper'
import AppNavigation from './core/navigations/App_navigation'
import { Provider } from 'react-redux';
import store from './core/utils/redux/store';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
 const App = () => {



  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: '#BADA55',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <Provider store={store} >
        <AppNavigation />
        </Provider>
    </PaperProvider>
  )
}
export default App;