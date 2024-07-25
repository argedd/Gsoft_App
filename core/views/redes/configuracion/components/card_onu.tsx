import * as React from 'react';
import { View, StyleSheet, Image, Text, Animated, PanResponder, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';
import { useEffect, useState } from 'react';
import { getContractDetail } from '../../../../services/clients/clients_service';
import { ErrorComponent, LoadingComponent, SuccesComponent } from '../../../../components/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getSignalOnu, getStatusOnu, rebootOnu } from '../../../../services/redes/redes_services';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DialogNotificationComponent from '../../../../components/dialogs/dialogNotification';
import { percentHeight, percentWidth } from '../../../../utils/dimensions/dimensions';

const CardOnu = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
  const contract = useSelector((state: RootState) => state.contractState);
  const [contractDetail, setContractDetail] = useState<any>(null);
  const [statusOnu, setStatusOnu] = useState<any>({});
  const [signalOnu, setSignalOnu] = useState<any>({});
  const [showLoading, setShowLoading] = useState(false);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [message, setMessage] = useState('');


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        { dx: pan.x, dy: pan.y }
      ],
      { useNativeDriver: false } // Opciones para Animated.event
    ),
    onPanResponderRelease: async (e, gesture) => {
      if (gesture.dx > 50) { // Umbral de deslizamiento hacia la izquierda
        // Lógica de reinicio aquí
        setShowLoading(true);

        try {
          const reboot = await rebootOnu(contract.contract)

          await setMessage(reboot.message)
          setShowLoading(false);
          setShowNotification(true);
          setNotificationType('success');
        } catch (err: any) {

          await setMessage(err.data.detail)

          setShowLoading(false);
          setShowNotification(true);
          setNotificationType('error');
        }



        // Alert.alert('Reiniciando...');
        // Animación de retorno del botón
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      } else {
        // Si no se alcanza el umbral, vuelve al estado inicial
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });

  useEffect(() => {
    setShowLoading(true);
    const fetchContract = async () => {
      try {
        const response = await getContractDetail(contract.contract);
 
        const filteredContractInternet = response.contract_detail.filter((contract: any) => contract.plan_type.service_type === 1);
  
        setContractDetail(filteredContractInternet[0]);
        const status = await getStatusOnu(contract.contract);
        await setStatusOnu(status);
        const signal = await getSignalOnu(contract.contract)

        await setSignalOnu(signal);
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        console.log('Error al obtener datos:', error);
      }
    };

    fetchContract();
  }, [contract.contract]);

  const getIconColor = (status: string) => {
    switch (status) {
      case 'Online':
        return '#4CAF50'; // verde
      case 'LOS':
        return '#F44336'; // rojo
      case 'Sync Mib':
        return '#FFEB3B'; // amarillo
      default:
        return '#9E9E9E'; // gris
    }
  };
  return (
    <View style={styles.container}>
      {showLoading && <LoadingComponent isLoading={showLoading} />}

      <View style={styles.frameParent}>
        {contractDetail && contractDetail.service_detail[0] ? (

          <>
            {/* <LinearGradient style={[styles.frameGroup, styles.frameGroupBorder]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
            <View>
              <View style={styles.nContrato0000Wrapper}>
                <Text style={[styles.nContrato0000, styles.iniciarSesinTypo]}>Nº contrato: {contractDetail.contract}</Text>
              </View>
            </View>
            <Text style={[styles.empGnetwork, styles.text1Clr]}>{contractDetail.plan_type.name}</Text>
          </LinearGradient> */}
            <LinearGradient style={[styles.ip1721714135Parent, styles.parentSpaceBlock]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
              <Text style={[styles.ip1721714135, styles.text1Clr]}>
                <Text style={styles.ip}>{`Nº contrato: `}</Text>
                <Text style={styles.text}>{contractDetail.contract}</Text>
              </Text>
              <Text style={[styles.mac885dfbeb839f, styles.text1Clr]}>
                <Text style={styles.ip}>{`Plan: `}</Text>
                <Text style={styles.text}>{contractDetail.plan_type.name}</Text>
              </Text>

            </LinearGradient>
            <LinearGradient style={[styles.gridContainer, styles.parentSpaceBlock]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
              <View style={styles.gridItem}>
                <Icon name="ip" size={20} color="#fff" />
                <Text style={styles.gridText}>{`IP: ${contractDetail.service_detail[0].ip}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Icon name="lan-connect" size={20} color="#fff" />
                <Text style={styles.gridText}>{`Mac: ${contractDetail.service_detail[0].mac}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Icon name="numeric" size={20} color="#fff" />
                <Text style={styles.gridText}>{`Serial: ${contractDetail.service_detail[0].serial}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Icon name="wifi" size={20} color={getIconColor(statusOnu.onu_status ? statusOnu.onu_status : 'default')} />
                <Text style={styles.gridText}>{`Estado ONU: ${statusOnu.onu_status ? statusOnu.onu_status : 'sin datos'}`}</Text>
              </View>
            </LinearGradient>
            <LinearGradient style={[styles.gridContainer, styles.parentSpaceBlock]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
              <View style={styles.gridItem}>
                <Icon name="router-wireless" size={20} color="#fff" />
                <Text style={styles.gridText}>{`onu_signal: ${signalOnu.onu_signal}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Icon name="signal-variant" size={20} color="#fff" />
                <Text style={styles.gridText}>{`onu_signal_1310: ${signalOnu.onu_signal_1310}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Icon name="lan-connect" size={20} color="#fff" />
                <Text style={styles.gridText}>{`onu_signal_value: ${signalOnu.onu_signal_value}`}</Text>
              </View>
              <View style={styles.gridItem}>
                <Icon name="signal-variant" size={20} color="#fff" />
                <Text style={styles.gridText}>{`onu_signal_1490: ${signalOnu.onu_signal_1490}`}</Text>
              </View>
            </LinearGradient>

            <View style={[styles.botonesBotnPrincipalWrapper, styles.parentSpaceBlock]}>
              <Animated.View
                style={[
                  styles.button,
                  {
                    transform: [{ translateX: pan.x }]
                  }
                ]}
                {...panResponder.panHandlers}

              >
                <Image  style={styles.icon} source={require('../../../../assets/icons/redes/btn-reinicio.png')} />
                {/* <Icon name="chevron-right" size={20} color="#fff" style={styles.icon} /> */}
              </Animated.View>
              <Text style={styles.buttonText}>Desliza para reiniciar el router</Text>

            </View></>
        ) : (
          <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Contrato sin informacion de Router</Text>
        )}
      </View>
      <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
        {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={message} route={"Home"} />}
        {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={message} />}
      </DialogNotificationComponent>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  button: {
    // backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 24
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  icon: {
    // marginRight: 10, // Espacio entre el borde del botón y el icono
    width:percentWidth(60),
    height:percentHeight(7),
    borderRadius:12
  },
  frameGroupBorder: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 0.45,
    borderColor: "#fafafa",
    borderStyle: "solid",
    borderRadius: 16,
    alignSelf: "stretch"
  },
  iniciarSesinTypo: {
    color: "#fafafa",
    fontWeight: "600",
    fontSize: 16
  },
  text1Clr: {
    color: "#fff",
    textAlign: "left"
  },
  parentSpaceBlock: {
    marginTop: 24,
    alignItems: "center"
  },
  parentFlexBox: {
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center"
  },
  nContrato0000: {
    textAlign: "center",
    fontFamily: "Roboto-Bold"
  },
  nContrato0000Wrapper: {
    flexDirection: "row"
  },
  empGnetwork: {
    marginLeft: 16,
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#fff"
  },
  frameGroup: {
    height: 80,
    flexDirection: "row",
    alignItems: "center"
  },
  ip: {
    fontWeight: "700",
    fontFamily: "Roboto-Bold"
  },
  text: {
    fontFamily: "Roboto-Regular"
  },
  ip1721714135: {
    textAlign: "left",
    fontSize: 14,
    color: "#fff"
  },
  mac885dfbeb839f: {
    marginTop: 9,
    textAlign: "left",
    fontSize: 14,
    color: "#fff"
  },
  ip1721714135Parent: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: "#fafafa",
    borderStyle: "solid",
    borderRadius: 12,
    alignSelf: "stretch",

  },
  nuevaAfiliacion: {
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    textAlign: "left",
    fontSize: 16,
    color: "#fff"
  },
  direccinIpv4: {
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
  },
  text1: {
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff"
  },
  vectorIcon: {
    width: 12,
    height: 7,
    opacity: 0
  },
  parent: {
    borderWidth: 0.5,
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 16,
    borderStyle: "solid",
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: "#fafafa"
  },
  formSeleccinMetodosDePag: {
    width: 278,
    marginTop: 2
  },
  nuevaAfiliacionParent: {
    backgroundColor: "rgba(171, 170, 170, 0.26)",
    borderColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderStyle: "solid",
    borderWidth: 0.45,
    borderRadius: 12,
    marginTop: 16
  },
  iniciarSesin: {
    fontFamily: "Inter-SemiBold",
    textAlign: "left"
  },
  botonesBotnPrincipal: {
    backgroundColor: "#e20a17",
    paddingHorizontal: 32,
    justifyContent: "center",
    borderRadius: 8,
  },
  botonesBotnPrincipalWrapper: {
    alignSelf: "stretch",
  },
  frameParent: {
    width: "100%",
    alignItems: "center"
  },
  gridContainer: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: "#fafafa",
    borderStyle: "solid",
    borderRadius: 12,
    alignSelf: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  gridText: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 14,
    textAlign: "left"
  },
});

export default CardOnu;
