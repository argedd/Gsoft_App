import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BackButton } from '../../../../components/components';
import LayoutPrimary from '../../../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../../../navigations/routes/app_routes';
import LinearGradient from 'react-native-linear-gradient';

type ConfiguracionViewNavigationProp =
  StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const RegistroTicketView: React.FC<Props> = ({ navigation }) => {
  const RegistroComponent = () => (
    <View style={styles.containerItem}>
      <View style={styles.detallaLaIncidenciaParent}>
        <Text style={[styles.detallaLaIncidencia, styles.textTypo]}>
          Detalla la incidencia
        </Text>
        <View style={[styles.nContratoParent, styles.parentFlexBox1]}>
          <Text style={[styles.detallaLaIncidencia, styles.textTypo]}>
            Nº Contrato
          </Text>
          <Text style={[styles.text, styles.textTypo]}>12345</Text>
        </View>
        <LinearGradient
          style={[styles.vectorParent, styles.parentFlexBox]}
          locations={[0.04, 1]}
          colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']}
          useAngle={true}
          angle={180}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require('../../../../assets/icons/notificacion/advertencia.png')}
          />
          <View style={styles.subeUnaImagenParent}>
            <Text style={[styles.subeUnaImagen, styles.subeUnaImagenFlexBox]}>
              Sube una imagen
            </Text>
            <Text
              style={[
                styles.formatosAdmitidosJpg,
                styles.subeUnaImagenFlexBox,
              ]}>
              Formatos admitidos: JPG y PNG
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.parentFlexBox}>
          <View></View>

          <View style={styles.formSeleccinMetodosDePag}>
            <Text style={[styles.metodoDePago, styles.text1Typo]}>
              Departamento
            </Text>
            <View
              style={[styles.metodoDePagoParent, styles.parentWrapperBorder]}>
              <Text style={[styles.text1, styles.text1Typo]}>Departamento</Text>
            </View>
          </View>
          <View style={styles.formSeleccinMetodosDePag}>
            <Text style={[styles.metodoDePago, styles.text1Typo]}>Asunto</Text>
            <View
              style={[styles.metodoDePagoParent, styles.parentWrapperBorder]}>
              <Text style={[styles.text1, styles.text1Typo]}>Asunto</Text>
            </View>
          </View>
        </View>
        <View style={[styles.formUsuarioParent, styles.parentFlexBox1]}>
          <View>
            <Text style={[styles.nDeTelfono, styles.text1Typo]}>
              Comentario
            </Text>
            <View style={[styles.zathit17Wrapper, styles.parentWrapperBorder]}>
              <Text style={[styles.intentoHacerEl, styles.text1Typo]}>
                intento hacer el pago pero el sistema no lo reconoce
              </Text>
            </View>
          </View>
          <Text style={[styles.hasta1000Caracteres, styles.text1Typo]}>
            Hasta 1000 caracteres
          </Text>
        </View>
      </View>
      <View style={styles.botonesBotnPrincipal}>
        <Text style={styles.iniciarSesin}>Crear nuevo ticket</Text>
      </View>
    </View>
      
    
  );
  return (
    <LayoutPrimary>
        <ScrollView style={styles.container}>
    <BackButton title={'Afiliación de cuentas'} />
        <RegistroComponent/>
</ScrollView>
    </LayoutPrimary>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },
  containerItem:{
    alignContent:'center',
    alignItems:'center',
  },

  iniciarSesin: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    textAlign: "left"
  },
  botonesBotnPrincipal: {
    borderRadius: 8,
    backgroundColor: "#e20a17",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop:8,
  },
  textTypo: {
    textAlign: 'left',
    fontSize: 16,
  },
  parentFlexBox1: {
    justifyContent: 'center',
    marginTop: 8,
  },
  parentFlexBox: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
  subeUnaImagenFlexBox: {
    textAlign: 'center',
    color: '#fff',
  },
  text1Typo: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    color: '#fff',
  },
  parentWrapperBorder: {
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: '#fafafa',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    borderStyle: 'solid',
  },
  vectorIconLayout: {
    height: 7,
    width: 12,
  },
  detallaLaIncidencia: {
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    textAlign: 'left',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: '#fafafa',
    marginTop: 10,
    fontWeight: '600',
  },
  nContratoParent: {
    marginTop: 8,
    alignItems: 'center',
  },
  vectorIcon: {
    width: 38,
    height: 38,
  },
  subeUnaImagen: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  formatosAdmitidosJpg: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    marginTop: 8.4,
  },
  subeUnaImagenParent: {
    marginTop: 16.8,
    alignItems: 'center',
  },
  vectorParent: {
    borderRadius: 17,
    height: 141,
    padding: 17,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  nDeTelfono: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  text1: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  vectorIcon1: {
    marginLeft: 10,
  },
  parent: {
    width: 90,
  },
  wrapper: {
    marginLeft: 4,
  },
  frameParent: {
    flexDirection: 'row',
    width: 278,
    marginTop: 8,
  },
  zathit17Wrapper: {
    width: 278,
    marginTop: 8,
  },
  formUsuario: {
    marginTop: 16,
  },
  metodoDePago: {
    opacity: 0,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  metodoDePagoParent: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: 8,
  },
  formSeleccinMetodosDePag: {
    marginTop: 16,
    width: 278,
  },
  intentoHacerEl: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  hasta1000Caracteres: {
    fontSize: 12,
    width: 121,
    height: 14,
    marginTop: 8,
  },
  formUsuarioParent: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  detallaLaIncidenciaParent: {
    borderRadius: 16,
    backgroundColor: 'rgba(171, 170, 170, 0.26)',
    borderColor: '#fff',
    borderWidth: 0.4,
    width: '90%',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderStyle: 'solid',
    alignItems: 'center',
  },
});
export default RegistroTicketView;
