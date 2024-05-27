import React, { useEffect, useState } from 'react'

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



type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}


const FacturacionView = ({ navigation }:Props) => {
  const contract = useSelector((state:RootState) => state.contractState);
  const [invoices, setInvoices] = useState<ResultInvoices[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices(contract.contract);
        setInvoices(response.results);
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
      }
    };
  
    fetchInvoices();
  }, [contract.contract]); // Ejecutar el efecto cuando el contrato cambie
  
  // Utilizar el estado `invoices` en el componente
  console.log('Invoices:', invoices);
  
  
  console.log('====================================');
  console.log(contract.contract);
  console.log('====================================');

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
      // marginTop: 50,
    },

    
  });
export default FacturacionView