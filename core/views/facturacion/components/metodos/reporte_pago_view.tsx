import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../../../components/layouts/layout';
import { BackButton } from '../../../../components/components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';




const ReportePagoView = () => {
  const method = useSelector((state: RootState) => state.invoiceState.method);
    console.log('====================================');
    console.log(method);
    console.log('====================================');
    const ReportePagoComponent =() =>(
        <View style={styles.container}>
          <BackButton title={'Reportar Pago'} />
      
      
          </View>
      
      );
  return (

    <Layout>
    <ReportePagoComponent />
  </Layout>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: 50,
    },

    
  });
export default ReportePagoView