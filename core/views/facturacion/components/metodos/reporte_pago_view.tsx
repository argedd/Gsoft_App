import React, { useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../../../../components/layouts/layout';
import { BackButton } from '../../../../components/components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';
import InfoPmComponent from '../info_pago/info_pm';
import InfoTrfComponent from '../info_pago/info_trf';
import InfoZelleComponent from '../info_pago/info_zelle';
import { percentWidth, percentHeight } from '../../../../utils/dimensions/dimensions';
import { MethodPm } from './metodos';




const ReportePagoView = () => {
  const methodSelect = useSelector((state: RootState) => state.invoiceState.method);
  const methods = useSelector((state: RootState) => state.invoiceState.methods.results);
  const [selectedMethod, setSelectedMethod] = useState<number>(methodSelect);

   console.log('====================================');
   console.log(methodSelect);
   console.log('====================================');
   console.log(methods);

   const renderSelectedComponent = () => {
    switch (selectedMethod) {
      case 1:
        return <MethodPm />;
      case 4:
    
        return <InfoTrfComponent />;
      case 3:
     
        return <InfoZelleComponent />;
      default:
        return null;
    }
  };

  const renderSelectedButton = () => {
    switch (selectedMethod) {
      case 1:
        return <ButtonPm />;
      case 4:
    
        return <ButtonTrf />;
      case 3:
     
        return <ButtonZelle />;
      default:
        return null;
    }
  };

  const ButtonZelle = () =>{
    return(
        <View style={[styles.botonesMetdosDePagoGroup, styles.parentFlexBox]}>
        <View
          style={[
            styles.botonesMetdosDePago1,
            styles.botonesSpaceBlock,
            selectedMethod === 3 && styles.selectedButton
          ]}
        >
          <View style={[styles.iconosPagoMovil, styles.iconosFlexBox]}>
            <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/metodos/zelle.png')} />
          </View>
        </View>
        <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Zelle</Text>
      </View>
    );
  }

  const ButtonPm = () =>{
    return(
        <View style={styles.parentFlexBox}>
        <View
          style={[
            styles.botonesMetdosDePago,
            styles.botonesSpaceBlock,
            selectedMethod === 1 && styles.selectedButton
          ]}
        >
          <View style={[styles.iconosPagoMovil, styles.iconosFlexBox]}>
            <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/metodos/pago-movil.png')} />
          </View>
        </View>
        <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Pago móvil</Text>
      </View>
    );
  }

  const ButtonTrf = () =>{
    return(
        <View style={[styles.botonesMetdosDePagoGroup, styles.parentFlexBox]}>
        <View
          style={[
            styles.botonesMetdosDePago1,
            styles.botonesSpaceBlock,
            selectedMethod === 4 && styles.selectedButton
          ]}
        >
          <View style={styles.iconosFlexBox}>
            <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/metodos/transferencia.png')} />
          </View>
        </View>
        <Text style={[styles.transferencias, styles.pagoMvilTypo]}>Transferencias</Text>
      </View>
    );
  }

    const ReportePagoComponent =() =>(
        <View style={styles.container}>
          <View style={[styles.menusMetodosDePagosParent, styles.parentFlexBox]}>
        <View style={[styles.menusMetodosDePagos, styles.parentFlexBox]}>
       
        {renderSelectedButton()}
        
        </View>
        <View>
            
        </View>
        <View style={[styles.frameParent, styles.parentFlexBox]}>
        <TouchableOpacity style={[styles.botonesBotnSegundario, styles.parentFlexBox]} onPress={()=>{}}>
        <Text style={styles.iniciarSesin}>Datos de pagos guardados</Text>
        </TouchableOpacity>
          {/* <View style={styles.datosDelPagoMvilParent}> */}
            
            {renderSelectedComponent()}
          {/* </View> */}
          {/* <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.parentFlexBox]} onPress={() => {}}>
            <Text style={styles.iniciarSesin}>Reportar pago</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.botonesBotnSegundario, styles.parentFlexBox]} onPress={()=>{}}>
        <Text style={styles.iniciarSesin}>Atrás</Text>
        </TouchableOpacity>
        </View>
      </View>
        
          </View>
      
      );
  return (

    <Layout>
    <BackButton title={'Reportar Pago'} />

     <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ReportePagoComponent />
      </ScrollView>
  </Layout>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
      marginBottom: percentHeight(1),
    },
    datosDelPagoMvilParent: {
      backgroundColor: "rgba(171, 170, 170, 0.26)",
      borderStyle: "solid",
      borderColor: "#fff",
      borderWidth: percentWidth(0.15),
      width: percentWidth(90),
      paddingHorizontal: percentWidth(2),
      paddingVertical: percentHeight(4),
      borderRadius: percentWidth(4),
      alignItems: "center"
    },
    iniciarSesin: {
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
      fontSize: percentWidth(4),
      textAlign: "left",
      color: "#fafafa"
    },
    botonesBotnPrincipal: {
      borderRadius: percentWidth(2),
      width: percentWidth(90),
      paddingHorizontal: percentWidth(4),
      paddingVertical: percentHeight(2),
      marginTop: percentHeight(3),
      marginBottom: percentHeight(2),
      backgroundColor: "#e20a17",
      flexDirection: "row"
    },
    frameParent: {
      marginTop: percentHeight(2)
    },
    menusMetodosDePagosParent: {
      width: "100%"
    },

    botonesBotnSegundario: {
        borderRadius: 8,
        borderStyle: "solid",
        borderColor: "#fafafa",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: percentWidth(90),
        paddingHorizontal: percentWidth(4),
        paddingVertical: percentHeight(1.6),
        marginBottom: percentHeight(3),

        }
  });
export default ReportePagoView