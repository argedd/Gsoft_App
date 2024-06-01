import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../components/components';
import Layout from '../../../components/layouts/layout';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import { percentWidth, percentHeight } from '../../../utils/dimensions/dimensions';
import PagoMovilForm from './components/registro/pagomovil';
import TransferenciaForm from './components/registro/transferencia';
import ZelleForm from './components/registro/zelle';


type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const RegistrarCuenta: React.FC<Props> = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('pagoMovil');

  const renderSelectedComponent = () => {
    switch (selectedMethod) {
      case 'pagoMovil':
        return <PagoMovilForm/>;
      case 'transferencias':
    
        return <TransferenciaForm/>;
      case 'zelle':
     
        return <ZelleForm/>;
      default:
        return null;
    }
  };

  const InfoPagoComponent = () => (
    <View style={styles.container}>
      <BackButton title={'Afiliar Cuenta'} />
      <View style={[styles.menusMetodosDePagosParent, styles.parentFlexBox]}>
        <View style={[styles.menusMetodosDePagos, styles.parentFlexBox]}>
          <View style={styles.parentFlexBox}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago,
                styles.botonesSpaceBlock,
                selectedMethod === 'pagoMovil' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('pagoMovil')}}
            >
              <View style={[styles.iconosPagoMovil, styles.iconosFlexBox]}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../assets/icons/metodos/pago-movil.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Pago móvil</Text>
          </View>
          <View style={[styles.botonesMetdosDePagoGroup, styles.parentFlexBox]}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago1,
                styles.botonesSpaceBlock,
                selectedMethod === 'transferencias' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('transferencias')}}
            >
              <View style={styles.iconosFlexBox}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../assets/icons/metodos/transferencia.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.transferencias, styles.pagoMvilTypo]}>Transferencias</Text>
          </View>
          <View style={[styles.botonesMetdosDePagoGroup, styles.parentFlexBox]}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago1,
                styles.botonesSpaceBlock,
                selectedMethod === 'zelle' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('zelle')}}
            >
              <View style={[styles.iconosPagoMovil, styles.iconosFlexBox]}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../assets/icons/metodos/zelle.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Zelle</Text>
          </View>
        </View>
        <View style={[styles.frameParent, styles.parentFlexBox]}>
            {renderSelectedComponent()}
          
        </View>
      </View>
    </View>
  );

  return (
    <Layout>
      <InfoPagoComponent />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vectorIcon: {
    width: 35,
    height: 40
  },
  parentFlexBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  botonesSpaceBlock: {
    padding: percentWidth(2.5), // Aproximadamente 10
    borderRadius: percentWidth(4) // Aproximadamente 16
  },
  iconosFlexBox: {
    padding: percentWidth(1), // Aproximadamente 4
    justifyContent: "center",
    alignItems: "center"
  },
  pagoMvilTypo: {
    marginTop: percentHeight(3), // Aproximadamente 14
    width: percentWidth(25), // Aproximadamente 80
    fontSize: percentWidth(3), // Aproximadamente 12
    color: "#fafafa",
    fontFamily: "Roboto-Medium",
    fontWeight: "500"
  },
  iconosPagoMovil: {
    width: percentWidth(12), // Aproximadamente 49
    flexDirection: "row"
  },
  botonesMetdosDePago: {
    backgroundColor: "rgba(80, 80, 79, 0.3)" // color por defecto de botones no seleccionados
  },
  selectedButton: {
    backgroundColor: '#e20a17', // color para botón seleccionado
  },
  pagoMvil: {
    textAlign: "center"
  },
  botonesMetdosDePago1: {
    backgroundColor: "rgba(80, 80, 79, 0.3)"
  },
  transferencias: {
    textAlign: "center"
  },
  botonesMetdosDePagoGroup: {
    marginLeft: percentWidth(1)
  },
  menusMetodosDePagos: {
    flexDirection: "row",
    marginBottom: percentHeight(6),
    marginTop: percentHeight(6),
  },

 
  frameParent: {
    marginTop: percentHeight(2)
  },
  menusMetodosDePagosParent: {
    width: "100%"
  }
});

export default RegistrarCuenta;
