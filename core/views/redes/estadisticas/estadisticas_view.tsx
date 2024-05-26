import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';




type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const EstadisticasComponent = () => (
  <View style={styles.container}>
    <BackButton title={'Uso de Datos'} />


  </View>

);
const EstadisticasView: React.FC<Props> = ({ navigation }) => {

  return (
    <LayoutPrimary>
      <EstadisticasComponent />
    </LayoutPrimary>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },


});
export default EstadisticasView