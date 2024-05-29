import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../../components/components';
import { RootStackParamListRoute } from '../../../../navigations/routes/app_routes';
import Layout from '../../../../components/layouts/layout';
import { percentHeight, percentWidth } from '../../../../utils/dimensions/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';
import InfoPmComponent from './info_pm';
import InfoTrfComponent from './info_trf';
import InfoZelleComponent from './info_zelle';
import { setMethod } from '../../../../utils/redux/actions/invoiceActions';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const InfoPagoView: React.FC<Props> = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('pagoMovil');
  const dispatch = useDispatch();

  const renderSelectedComponent = () => {
    switch (selectedMethod) {
      case 'pagoMovil':
        return <InfoPmComponent />;
      case 'transferencias':
    
        return <InfoTrfComponent />;
      case 'zelle':
     
        return <InfoZelleComponent />;
      default:
        return null;
    }
  };

  const InfoPagoComponent = () => (
    <View style={styles.container}>
      <BackButton title={'Métodos de pago'} />
      <View style={[styles.menusMetodosDePagosParent, styles.parentFlexBox]}>
        <View style={[styles.menusMetodosDePagos, styles.parentFlexBox]}>
          <View style={styles.parentFlexBox}>
            <TouchableOpacity
              style={[
                styles.botonesMetdosDePago,
                styles.botonesSpaceBlock,
                selectedMethod === 'pagoMovil' && styles.selectedButton
              ]}
              onPress={() => {setSelectedMethod('pagoMovil');dispatch(setMethod(1))}}
            >
              <View style={[styles.iconosPagoMovil, styles.iconosFlexBox]}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/metodos/pago-movil.png')} />
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
              onPress={() => {setSelectedMethod('transferencias');dispatch(setMethod(4))}}
            >
              <View style={styles.iconosFlexBox}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/metodos/transferencia.png')} />
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
              onPress={() => {setSelectedMethod('zelle');dispatch(setMethod(3))}}
            >
              <View style={[styles.iconosPagoMovil, styles.iconosFlexBox]}>
                <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/metodos/zelle.png')} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.pagoMvil, styles.pagoMvilTypo]}>Zelle</Text>
          </View>
        </View>
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={styles.datosDelPagoMvilParent}>
            {renderSelectedComponent()}
          </View>
          <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.parentFlexBox]} onPress={() => navigation.navigate("ReportePago")}>
            <Text style={styles.iniciarSesin}>Reportar pago</Text>
          </TouchableOpacity>
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
    backgroundColor: "#e20a17",
    flexDirection: "row"
  },
  frameParent: {
    marginTop: percentHeight(2)
  },
  menusMetodosDePagosParent: {
    width: "100%"
  }
});

export default InfoPagoView;
