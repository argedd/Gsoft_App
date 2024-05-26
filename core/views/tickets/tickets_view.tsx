import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../components/components';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import LayoutPrimary from '../../components/layouts/layout_primary';



type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const TicketsComponent =() =>(
  <View style={styles.container}>
    <BackButton title={'Mis Tickets'} />


    </View>

);
const TicketsView : React.FC<Props> = ({ navigation }) => {
 
  return (

    <LayoutPrimary>
    <TicketsComponent />
  </LayoutPrimary>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: 50,
    },

    
  });
export default TicketsView