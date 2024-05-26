import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { ClientView, ConfiguracionView, EstadisticasView, FacturacionView, HomeView, LoginView, TestView, TicketsView } from '../views/views';
import GestionView from '../views/planes/gestion_view';

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
    return (
        <NavigationContainer  >
           <Stack.Navigator
             screenOptions={{ 
                headerShown: false 
                
            }}
             initialRouteName='Login'
             
           >
              <Stack.Screen name="Home" component={HomeView} />
              <Stack.Screen name="Client" component={ClientView} />
              <Stack.Screen name="Configuracion" component={ConfiguracionView} />
              <Stack.Screen name="Gestion" component={GestionView} />
              <Stack.Screen name="Facturacion" component={FacturacionView} />
              <Stack.Screen name="Tickets" component={TicketsView} />
              <Stack.Screen name="Test" component={TestView} />
              <Stack.Screen name="Estadisticas" component={EstadisticasView} />
              <Stack.Screen name="Login" component={LoginView} />
           </Stack.Navigator> 
          </NavigationContainer>
        ) 
}

export default AppNavigation