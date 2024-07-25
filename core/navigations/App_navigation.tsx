import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { 
   AfiliacionView,
   AsistenciaView,
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
   InternetView, 
   LoginView, 
   PagoFacturaView, 
   PreguntasView, 
   RegistrarCuentaView, 
   RegistroTicketView, 
   ReportePagoView, 
   TestView, 
   TicketDetailView, 
   TicketsView 
} from '../views/views';
import EditDatosView from '../views/cliente/cuenta/editar_datos';
import eventEmitter from '../eventEmitter';
import { RootStackParamListRoute } from './routes/app_routes';
import { StackNavigationProp } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {

    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

const MainStackNavigator = () => {
   type NavigationProp = StackNavigationProp<RootStackParamListRoute>;
   const navigation = useNavigation<NavigationProp>(); // Use the correct type here


    useEffect(() => {
        const handleUnauthorized = () => {
            navigation.navigate("Login");
        };

        eventEmitter.on('unauthorized', handleUnauthorized);

        return () => {
            eventEmitter.off('unauthorized', handleUnauthorized);
        }
    }, [navigation]);

    return (
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
            <Stack.Screen name="EditDatos" component={EditDatosView} />
            <Stack.Screen name="Preguntas" component={PreguntasView} />
            <Stack.Screen name="GestionInternet" component={InternetView} />
            <Stack.Screen name="Asistencia" component={AsistenciaView} />
        </Stack.Navigator>
    );
}

export default AppNavigation;
