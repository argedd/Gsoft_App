import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { percentWidth, percentHeight } from '../../../utils/dimensions/dimensions';
import { BackButton } from '../../../components/components';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

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
          angle={180}
        >
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require('../../../assets/icons/notificacion/advertencia.png')}
          />
          <View style={styles.subeUnaImagenParent}>
            <Text style={[styles.subeUnaImagen, styles.subeUnaImagenFlexBox]}>
              Sube una imagen
            </Text>
            <Text
              style={[
                styles.formatosAdmitidosJpg,
                styles.subeUnaImagenFlexBox,
              ]}
            >
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
              style={[styles.metodoDePagoParent, styles.parentWrapperBorder]}
            >
              <Text style={[styles.text1, styles.text1Typo]}>Departamento</Text>
            </View>
          </View>
          <View style={styles.formSeleccinMetodosDePag}>
            <Text style={[styles.metodoDePago, styles.text1Typo]}>Asunto</Text>
            <View
              style={[styles.metodoDePagoParent, styles.parentWrapperBorder]}
            >
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
        <RegistroComponent />
      </ScrollView>
    </LayoutPrimary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    alignContent: 'center',
    alignItems: 'center',
  },
  iniciarSesin: {
    fontSize: percentWidth(4),
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: '#fafafa',
    textAlign: 'left',
  },
  botonesBotnPrincipal: {
    borderRadius: percentWidth(2),
    backgroundColor: '#e20a17',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: percentWidth(8),
    paddingVertical: percentHeight(1.5),
    marginTop: percentHeight(2),
  },
  textTypo: {
    textAlign: 'left',
    fontSize: percentWidth(4),
  },
  parentFlexBox1: {
    justifyContent: 'center',
    marginTop: percentHeight(2),
  },
  parentFlexBox: {
    alignSelf: 'stretch',
    marginTop: percentHeight(2),
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
    paddingVertical: percentHeight(1.5),
    borderWidth: 0.5,
    borderColor: '#fafafa',
    borderRadius: percentWidth(2),
    flexDirection: 'row',
    paddingHorizontal: percentWidth(4),
    alignItems: 'center',
    borderStyle: 'solid',
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
    marginTop: percentHeight(2.5),
    fontWeight: '600',
  },
  nContratoParent: {
    marginTop: percentHeight(2),
    alignItems: 'center',
  },
  vectorIcon: {
    width: percentWidth(9.5),
    height: percentWidth(9.5),
  },
  subeUnaImagen: {
    fontSize: percentWidth(4.25),
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  formatosAdmitidosJpg: {
    fontSize: percentWidth(3.25),
    fontFamily: 'Inter-Regular',
    marginTop: percentHeight(2.1),
  },
  subeUnaImagenParent: {
    marginTop: percentHeight(4.2),
    alignItems: 'center',
  },
  vectorParent: {
    borderRadius: percentWidth(4.25),
    height: percentHeight(17.75),
    padding: percentWidth(4.25),
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  nDeTelfono: {
    fontSize: percentWidth(3.5),
    fontFamily: 'Roboto-Regular',
  },
  text1: {
    fontSize: percentWidth(4),
    fontFamily: 'Roboto-Regular',
  },
  zathit17Wrapper: {
    width: percentWidth(69.5),
    marginTop: percentHeight(2),
  },
  metodoDePago: {
    opacity: 0,
    fontSize: percentWidth(3.5),
    fontFamily: 'Roboto-Regular',
  },
  metodoDePagoParent: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: percentHeight(2),
  },
  formSeleccinMetodosDePag: {
    marginTop: percentHeight(4),
    width: percentWidth(69.5),
  },
  intentoHacerEl: {
    fontSize: percentWidth(4),
    fontFamily: 'Roboto-Regular',
  },
  hasta1000Caracteres: {
    fontSize: percentWidth(3),
    width: percentWidth(30.25),
    height: percentHeight(1.75),
    marginTop: percentHeight(2),
  },
  formUsuarioParent: {
    alignItems: 'flex-end',
    marginTop: percentHeight(2),
  },
  detallaLaIncidenciaParent: {
    borderRadius: percentWidth(4),
    backgroundColor: 'rgba(171, 170, 170, 0.26)',
    borderColor: '#fff',
    borderWidth: 0.4,
    width: '90%',
    paddingVertical: percentHeight(8),
    paddingHorizontal: percentWidth(4),
    borderStyle: 'solid',
    alignItems: 'center',
  },
});

export default RegistroTicketView;
