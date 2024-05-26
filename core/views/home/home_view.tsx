// App.js
import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import MenuItem from '../../components/list/listMenuItem';
import menuItems, { IMenuItem } from '../../data/homeMenuItems';
import HeaderHome from './components/header_home';
import CardInfo from './components/card_info_contract';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import { FloatingActionButton } from '../../components/components';
import LayoutPrimary from '../../components/layouts/layout_primary';
import Carousel from './components/carousel';


type HomeViewProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: HomeViewProp;
}

const data = [
  {
    id: 19580,
    client: 10649,
    client_name: "CLEIDY VERONICA GIL AVENDANO",
    client_email: "CLEIDYGIL42@GMAIL.COM",
    identification: "V26131700",
    client_type: 3,
    client_type_name: "EMP G-NETWORK",
    client_phone: "04163650354",
    client_mobile: "04163650354",
    installation_order: "15SNWO",
    signe: "https://files.gsoft.app/installations/signes/10649-L3QVJ0WWNB8P4R0.jpg",
    order_id: 11998,
    finish_installation: null,
    synchronization_third: false,
    status: 18,
    balance: 0,
    debt: 0,
    sector_name: "CABRERIA",
    parish_name: "Carayaca",
    parish: 5,
    zone: 2,
    plan_name_internet: "PLAN EMP G-NETWORK",
    pts: "0.0",
    latitude: "10.60166",
    longitude: "-66.93214",
    date_cicle: null,
    change_cicle: null,
    invoice_date_cicle: null,
    status_name: "Por instalar",
    address: "LA GUI",
    address_tax: "LA GUAIRA, VARGAS, PRUEBA",
    client_name_name: "CLEIDY VERONICA",
    client_name_lastname: "GIL AVENDANO",
    bank_associated: 2,
    sft_detail: null,
    created_by_name: "Cleidy Gil",
    created_at: "2023-06-27T11:58:01.345909"
  },
  {
    id: 18823,
    client: 10649,
    client_name: "CLEIDY VERONICA GIL AVENDANO",
    client_email: "CLEIDYGIL42@GMAIL.COM",
    identification: "V26131700",
    client_type: 3,
    client_type_name: "EMP G-NETWORK",
    client_phone: "04163650354",
    client_mobile: "04163650354",
    installation_order: "WWLFDU",
    signe: "https://files.gsoft.app/installations/signes/10649-OZ58NVDI13BB2QB.jpg",
    order_id: 11242,
    finish_installation: "2023-06-06T12:12:07",
    synchronization_third: false,
    status: 16,
    balance: 0,
    debt: 0,
    sector_name: "EL GUARATARO",
    parish_name: "Carayaca",
    parish: 5,
    zone: 2,
    plan_name_internet: "PLAN EMP G-NETWORK",
    pts: "0.0",
    latitude: "10.59963",
    longitude: "-66.92082",
    date_cicle: 20,
    change_cicle: null,
    invoice_date_cicle: 15,
    status_name: "Activo",
    address: "QUEBRADA DE CARIACO, EL GUARATARO, CASA S/N, CALLE ESCUELA CARMEN DE RIOBUENO, PARROQUIA LA GUAIRA, ESTADO LA GUAIRA., EL GUARATARO, La Guaira",
    address_tax: "QUEBRADA DE CARIACO, EL GUARATARO, CASA S/N, CALLE ESCUELA CARMEN DE RIOBUENO, PARROQUIA LA GUAIRA, ESTADO LA GUAIRA.",
    client_name_name: "CLEIDY VERONICA",
    client_name_lastname: "GIL AVENDANO",
    bank_associated: 1,
    sft_detail: null,
    created_by_name: "Orioletmar Garcia",
    created_at: "2023-06-05T11:20:02.356076"
  },
  {
    id: 11111,
    client: 10649,
    client_name: "CLEIDY VERONICA GIL AVENDANO",
    client_email: "CLEIDYGIL42@GMAIL.COM",
    identification: "V26131700",
    client_type: 3,
    client_type_name: "EMP G-NETWORK",
    client_phone: "04163650354",
    client_mobile: "04163650354",
    installation_order: "WWLFDU",
    signe: "https://files.gsoft.app/installations/signes/10649-OZ58NVDI13BB2QB.jpg",
    order_id: 11242,
    finish_installation: "2023-06-06T12:12:07",
    synchronization_third: false,
    status: 16,
    balance: 0,
    debt: 0,
    sector_name: "EL GUARATARO",
    parish_name: "Carayaca",
    parish: 5,
    zone: 2,
    plan_name_internet: "PLAN EMP G-NETWORK",
    pts: "0.0",
    latitude: "10.59963",
    longitude: "-66.92082",
    date_cicle: 20,
    change_cicle: null,
    invoice_date_cicle: 15,
    status_name: "Activo",
    address: "QUEBRADA DE CARIACO, EL GUARATARO, CASA S/N, CALLE ESCUELA CARMEN DE RIOBUENO, PARROQUIA LA GUAIRA, ESTADO LA GUAIRA., EL GUARATARO, La Guaira",
    address_tax: "QUEBRADA DE CARIACO, EL GUARATARO, CASA S/N, CALLE ESCUELA CARMEN DE RIOBUENO, PARROQUIA LA GUAIRA, ESTADO LA GUAIRA.",
    client_name_name: "CLEIDY VERONICA",
    client_name_lastname: "GIL AVENDANO",
    bank_associated: 1,
    sft_detail: null,
    created_by_name: "Orioletmar Garcia",
    created_at: "2023-06-05T11:20:02.356076"
  }
];

// interface Menu{
//   item: IMenuItem
// }
const HomeView: React.FC<Props> = ({navigation}) => {

  const handleFabPress = () => {
    // Maneja la acción del botón aquí
    Alert.alert('FAB Pressed!');
  };

  const renderItem = ({ item }:{ item: IMenuItem }) => (
    <MenuItem
      title={item.title}
      icon={item.icon}
      onPress={() => navigation.navigate(item.route)}
    />
  );

  const HomeComponent =() =>(
    <View style={styles.container}>

     <HeaderHome navigation={navigation} />
     <Carousel data={data}/>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        
      />
           <FloatingActionButton
        icon="headset"
        onPress={handleFabPress}
      /> 
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
});

export default HomeView;
