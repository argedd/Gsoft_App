import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import CardOnu from './components/card_onu';
import LayoutPrimary from '../../../components/layouts/layout_primary';


type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const ConfiguracionComponent = () => (
  <View style={styles.container}>
    <BackButton title={'Configuración de Router'} />
    <ScrollView>
      <CardOnu />

    </ScrollView>

  </View>

);
const ConfiguracionView: React.FC<Props> = ({ navigation }) => {

  return (

    <LayoutPrimary>
      <ConfiguracionComponent />
    </LayoutPrimary>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },


});
export default ConfiguracionView