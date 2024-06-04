import React, { useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { useRoute, RouteProp } from '@react-navigation/native';
import { percentHeight, percentWidth } from '../../../utils/dimensions/dimensions';
import GtvDatosComponent from './components/datosGtv';




type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}


const GtvView: React.FC<Props> = ({ navigation }) => {
    const route = useRoute<RouteProp<RootStackParamListRoute, 'DetalleGtv'>>();
    const [selectedMethod, setSelectedMethod] = useState<string>('datos');

    const { service } = route.params;
    // console.log('====================================');
    // console.log(service);
    // console.log('====================================');
    const renderSelectedComponent = () => {
        switch (selectedMethod) {
          case 'datos':
            return <GtvDatosComponent id={service.id} contract={service.contract_detail_account.id} />;
          case 'pantallas':
        
            return <Text>Pantallas</Text>;
          case 'planes':
         
            return <Text>Planes</Text>;
          default:
            return null;
        }
      };
    const GtvComponent = () => (
        <View style={styles.container}>
          <BackButton title={'Gestion de Planes'} />
          <View style={styles.itemContainer}>
            <Image style={styles.component1Icon} resizeMode="contain" source={require("../../../assets/icons/gtv/gtv.png")} />

          <View style={[styles.menusMetodosDePagosParent, styles.parentFlexBox]}>
        <View style={[styles.menusMetodosDePagos, styles.parentFlexBox]}>
          <View style={styles.parentFlexBox}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago,
                styles.botonesSpaceBlock,
                selectedMethod === 'datos' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('datos')}}
            >
              <View style={[styles.iconosdatos, styles.iconosFlexBox]}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../assets/icons/user/editar-datos.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Datos</Text>
          </View>
          <View style={[styles.botonesMetdosDePagoGroup, styles.parentFlexBox]}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago1,
                styles.botonesSpaceBlock,
                selectedMethod === 'pantallas' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('pantallas')}}
            >
              <View style={styles.iconosFlexBox}>
                <Image style={styles.vectorIconP} resizeMode="cover" source={require('../../../assets/icons/gtv/pantalla.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.pantallas, styles.pagoMvilTypo]}>Pantallas</Text>
          </View>
          <View style={[styles.botonesMetdosDePagoGroup, styles.parentFlexBox]}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago1,
                styles.botonesSpaceBlock,
                selectedMethod === 'planes' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('planes')}}
            >
              <View style={[styles.iconosdatos, styles.iconosFlexBox]}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../assets/icons/home/gestion-planes.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Planes</Text>
          </View>
        </View>
        <View style={[ styles.parentFlexBox]}>
            {renderSelectedComponent()}
          
        </View>
      </View>
          </View>
         
      
        </View>
      
      );
  return (
    <LayoutPrimary>
      <GtvComponent />
    </LayoutPrimary>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:16
  },
  component1Icon: {
    width: "100%",
    height: 26,
    overflow: "hidden"
    },
  vectorIcon: {
    width: 35,
    height: 40
  },
  vectorIconP: {
    width: 52,
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
  iconosdatos: {
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
  pantallas: {
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

 
 
  menusMetodosDePagosParent: {
    width: "100%"
  }


});
export default GtvView