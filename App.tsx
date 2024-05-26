import React from 'react'
import {  MD3DarkTheme as DefaultTheme,PaperProvider } from 'react-native-paper'
import AppNavigation from './core/navigations/App_navigation'

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
        <AppNavigation />
    </PaperProvider>
  )
}
export default App;