import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../components/components';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';




type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}


const AfiliacionView : React.FC<Props> = ({ navigation }) => {
    const AfiliacionComponent =() =>(
        <View style={styles.container}>
          <BackButton title={'Afiliación de cuentas'} />
      
      
          </View>
      
      );
  return (

    <LayoutPrimary>
    <AfiliacionComponent />
  </LayoutPrimary>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: 50,
    },

    
  });
export default AfiliacionView