import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { 
   AfiliacionView,
   ChangePasswordView,
   ClientView, 
   ConfiguracionView, 
   ContractDetail, 
   EditarCuentaView, 
   EstadisticasView, 
   FacturacionView, 
   GestionView, 
   GtvView, 
   HomeView, 
   InfoPagoView, 
   LoginView, 
   PagoFacturaView, 
   RegistrarCuentaView, 
   RegistroTicketView, 
   ReportePagoView, 
   TestView, 
   TicketDetailView, 
   TicketsView 
} from '../views/views';

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
              <Stack.Screen name="Contract" component={ContractDetail} />
              <Stack.Screen name="Pago" component={PagoFacturaView} />
              <Stack.Screen name="InfoPago" component={InfoPagoView} />
              <Stack.Screen name="ReportePago" component={ReportePagoView} />
              <Stack.Screen name="Afiliacion" component={AfiliacionView} />
              <Stack.Screen name="RegistrarCuenta" component={RegistrarCuentaView} />
              <Stack.Screen name="EditarCuenta" component={EditarCuentaView} />
              <Stack.Screen name="RegistrarTicket" component={RegistroTicketView} />
              <Stack.Screen name="DetalleTicket" component={TicketDetailView} />
              <Stack.Screen name="DetalleGtv" component={GtvView} />
              <Stack.Screen name="ChangePassword" component={ChangePasswordView} />
           </Stack.Navigator> 
          </NavigationContainer>
        ) 
}

export default AppNavigation