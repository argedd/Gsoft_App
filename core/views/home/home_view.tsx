// App.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Text } from 'react-native';
import MenuItem from '../../components/list/listMenuItem';
import menuItems, { IMenuItem } from '../../data/homeMenuItems';
import HeaderHome from './components/header_home';
import CardInfo from './components/card_info_contract';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import { FloatingActionButton } from '../../components/components';
import LayoutPrimary from '../../components/layouts/layout_primary';
import Carousel from './components/carousel';
import { getData } from '../../utils/asyncStorage/asyncStorage';
import { getContracts } from '../../services/clients/clients_service';
import { Provider } from 'react-redux';
import store from '../../utils/redux/store';


type HomeViewProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: HomeViewProp;
}


const HomeView: React.FC<Props> = ({navigation}) => {
  const [contracts, setContracts] = useState([]);
  
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
