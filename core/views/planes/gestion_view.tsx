import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BackButton } from '../../components/components';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import LayoutPrimary from '../../components/layouts/layout_primary';
import { RootState } from '../../utils/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootContract } from '../../data/interfaces/contract_interface';
import { getContractDetail } from '../../services/clients/clients_service';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setClientType, setPlan } from '../../utils/redux/actions/planActions';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const GestionView: React.FC<Props> = ({ navigation }) => {
  const contract = useSelector((state: RootState) => state.contractState);
  const [contractDetail, setContractDetail] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await getContractDetail(contract.contract);
        setContractDetail(response.contract_detail);
      } catch (error) {
        console.error('Error al obtener los planes:', error);
      }
    };

    fetchContract();
  }, [contract.contract]);

  const handleGtv= (service:any) =>{
    // console.log('====================================');
    // console.log(service.contract_detail_account.id);
    // console.log('====================================');
     navigation.navigate("DetalleGtv",{ service: service });
  }

  const handleInternet= (service:any) =>{
    // console.log('====================================');
    // console.log(service.plan_type);
    // console.log('====================================');
    const client = {
      client_type: contract.data.client_type_name,
      id:contract.data.client_type
  }
  const planAct={
    name:service.plan_type.name,
    id:service.plan_type.id,
    cost:service.plan_type.cost,
    profile:service.plan_type.profile,
  }
  dispatch(setClientType(client));
  dispatch(setPlan(planAct));
     navigation.navigate("GestionInternet",{ service: service });
  }

  const CardComponent = () => (
    <View style={styles.itemContainer}>

      {contractDetail.map((item: any, index: any) => (
        <LinearGradient 
          key={index} 
          style={styles.parent} 
          locations={[0.04, 1]} 
          colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} 
          useAngle={true} 
          angle={180}
        >
          <Pressable style={styles.pressable} onPress={() => {}}>
            <View style={[styles.planPlatinoParent, styles.iconosCambioFlexBox]}>
              <Text style={[styles.planPlatino, styles.planTypo]}>{item.plan_type.name}</Text>
              <Text style={[styles.bsAlMes, styles.planTypo]}>/{item.plan_type.cost} USD</Text>
            </View>
            <Text style={[styles.velocidadDeDescarga, styles.planActualTypo]}>
              {item.plan_type.profile}
            </Text>
            <View style={[styles.frameParent, styles.parentFlexBox]}>
              <View style={styles.parentFlexBox}>
                {item.contract_detail_account != null ? (
                  <TouchableOpacity 
                    style={[styles.iconosCambio, styles.iconosCambioFlexBox, styles.redButton]} 
                    onPress={() => handleGtv(item)}
                  >
                    <MaterialCommunityIcons name="desktop-mac" size={24} color="#fff" />
                    <Text style={[styles.cambiarPlan, styles.planTypo]}>GTV+</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={[styles.iconosCambio, styles.iconosCambioFlexBox, styles.redButton]} 
                    onPress={() => handleInternet(item)}
                  >
                    <MaterialCommunityIcons name="refresh-circle" size={24} color="#fff" />
                    <Text style={[styles.cambiarPlan, styles.planTypo]}>Cambiar</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={[styles.planActual, styles.planActualTypo]}>Plan actual</Text>
            </View>
          </Pressable>
        </LinearGradient>
      ))}

      {/* <Pressable style={[styles.botonesMen, styles.botonesMenFlexBox]} onPress={() => {}}>
        <View style={[styles.iconosAfiliacionDeCuentasParent, styles.botonesMenFlexBox]}>
          <View style={styles.iconosAfiliacionDeCuentas}>
            <Image 
              style={styles.iconosAfiliacionDeCuentasChild} 
              resizeMode="cover" 
              source={require('../../assets/icons/user/afiliacion-cuentas.png')} 
            />
          </View>
          <Text style={styles.usoDeDatos}>Agregar plan TV</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
      </Pressable> */}
    </View>
  );

  const GestionComponent = () => (
    <View style={styles.container}>
      <BackButton title={'Gestion de Planes'} />
      <CardComponent/>
    </View>
  );

  return (
    <LayoutPrimary>
      <GestionComponent />
    </LayoutPrimary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  planResidencial: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    color: "#fafafa",
    textAlign: "left",
    marginBottom: 10
  },
  itemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  //card component 

  iconosCambioFlexBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  planTypo: {
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    marginLeft: 4,
  },
  planActualTypo: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Roboto-Regular"
  },
  parentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  planPlatino: {
    color: "#fafafa",
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  },
  bsAlMes: {
    marginLeft: 62,
    color: "#abaaaa",
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  },
  planPlatinoParent: {
    flexDirection: "row",
    justifyContent: "center"
  },
  velocidadDeDescarga: {
    width: 299,
    marginTop: 22,
    color: "#fafafa"
  },
  vectorIcon: {
    width: 15,
    height: 15
  },
  iconosCambio: {
    flexDirection: 'row', // Añadir esta línea
    justifyContent: 'center',
    alignItems: 'center',
    width: 100, // Ajusta el ancho según sea necesario
    height: 45,
  },
  cambiarPlan: {
    fontSize: 14,
    color: "#fafafa"
  },
  planActual: {
    color: "#abaaaa"
  },
  frameParent: {
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 22,
  },
  pressable: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "transparent",
    width: "100%",
  },
  parent: {
    width: "100%",
    borderRadius: 15,
    marginBottom: 10, // Added marginBottom
  },
  redButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },

  // Agregar Gtv
  botonesMenFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconosAfiliacionDeCuentasChild: {
    width: 30,
    height: 18
  },
  iconosAfiliacionDeCuentas: {
    width: 30,
    height: 30,
    justifyContent: "center",
    padding: 5,
    alignItems: "center"
  },
  usoDeDatos: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "#fafafa",
    textAlign: "left",
    marginLeft: 10
  },
  iconosAfiliacionDeCuentasParent: {
    alignItems: "center"
  },
  botonesMen: {
    width: "100%",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center"
  }
});

export default GestionView;
