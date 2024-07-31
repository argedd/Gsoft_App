import React, { useCallback, useEffect, useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../components/components';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import LayoutPrimary from '../../components/layouts/layout_primary';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';
import ListInvoices from './components/list_facturas';
import { getInvoices } from '../../services/facturacion/facturas_service';
import { ResultInvoices, RootInvoices } from '../../data/interfaces/invoices_interface';
import { useFocusEffect } from '@react-navigation/native';



type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}


const FacturacionView = ({ navigation }:Props) => {
  const contract = useSelector((state:RootState) => state.contractState.contract);
  const [invoices, setInvoices] = useState<ResultInvoices[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchInvoices = async () => {
        try {
          const response = await getInvoices(contract);

          setInvoices(response.results);
        } catch (error) {
          console.log('Error al obtener las facturas:', error);
        }
      };

      fetchInvoices();
    }, []) // Ejecutar el efecto cuando el contrato cambie
  );
  

  const FacturacionComponent =() =>(
    <View style={styles.container}>
    <BackButton title={'Facturacion'} />
    
    <ListInvoices invoices={invoices}/>
  
    </View>
  
  );
  return (
    <LayoutPrimary>
        <FacturacionComponent  />
      </LayoutPrimary>
  
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 50,
    },

    
  });
export default FacturacionView