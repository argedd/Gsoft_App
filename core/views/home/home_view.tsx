// App.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import MenuItem from '../../components/list/listMenuItem';
import menuItems, { IMenuItem } from '../../data/homeMenuItems';
import HeaderHome from './components/header_home';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import { DialogComponent, FloatingActionButton } from '../../components/components';
import LayoutPrimary from '../../components/layouts/layout_primary';
import Carousel from './components/carousel';
import { getData } from '../../utils/asyncStorage/asyncStorage';
import { getContracts, sendToken } from '../../services/clients/clients_service';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { percentHeight, percentWidth } from '../../utils/dimensions/dimensions';

type HomeViewProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: HomeViewProp;
}


const HomeView: React.FC<Props> = ({navigation}) => {
  const [contracts, setContracts] = useState([]);
  const [notification, setNotification] = useState<any>('');
  const [title, setTitle] = useState<any>();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    requestUserPermission();
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setShowDialog(true);
      setNotification(remoteMessage.notification?.body);
      setTitle(remoteMessage.notification?.title);
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getToken() {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Guarda el token en AsyncStorage o envíalo a tu servidor
    const form = {
      token: token.toString(),
    }

    const send =  await sendToken(form);

    await AsyncStorage.setItem('fcmToken', token);
    // O envíalo directamente a tu servidor
  }
  
  useEffect(() => {
  const getClient = async ()=>{
    const dataUser = await getData('user');
    const client_contracts= await getContracts(dataUser.client.id);

    setContracts(client_contracts.results);
  }
  getClient();
  
  },[])

  const handleFabPress = () => {
    // Maneja la acción del botón aquí
    navigation.navigate("Asistencia");
  };

  const renderItem = ({ item }:{ item: IMenuItem }) => (
    <MenuItem
      title={item.title}
      icon={item.icon}
      onPress={() => navigation.navigate(item.route as any)}
    />
  );

  const HomeComponent =() =>(
    <View style={styles.container}>

     <HeaderHome navigation={navigation} />
      <Carousel data={contracts}/>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        
      />
           <FloatingActionButton
        icon={require('../../assets/icons/home/asistencia.png')}
        onPress={handleFabPress}
      /> 
        <DialogComponent visible={showDialog} onClose={() => setShowDialog(false)}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.textNotification}>
            {notification}
          </Text>
          <View style={styles.botonesBotnPrincipalParent}>
                <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={() => setShowDialog(false)}>
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Cerrar</Text>
                </TouchableOpacity>
            </View>
      </DialogComponent>
          </View>

  );

  return (

    <LayoutPrimary>
      <HomeComponent />
    </LayoutPrimary>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 20
},
  textNotification: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop:16
},
  botonesBotnPrincipalParent: {
    marginTop: percentHeight(2),
    alignSelf: "stretch",
    alignItems: "center"
},
iniciarSesin: {
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fafafa"
},
botonesBotnPrincipal: {
    backgroundColor: "#e20a17"
},
iniciarSesinTypo: {
    textAlign: "left",
    fontSize: 16
},
botonesFlexBox: {
    paddingHorizontal: percentWidth(8),
    justifyContent: "center",
    paddingVertical: percentHeight(1.5),
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center"
},
});

export default HomeView;
