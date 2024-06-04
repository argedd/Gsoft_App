import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton, LoadingComponent } from '../../components/components';
import LayoutPrimary from '../../components/layouts/layout_primary';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';
import { RootContract } from '../../data/interfaces/contract_interface';
import { getContractDetail } from '../../services/clients/clients_service';
import { percentHeight, percentWidth } from '../../utils/dimensions/dimensions';





interface ContractComponentProps {
  data: RootContract;
}

const getStatusImage = (status: number) => {
    switch (status) {
      case 16:
        return require("../../assets/icons/status/activo.png");
      case 18:
        return require("../../assets/icons/status/porInstalar.png");
      case 19:
        return require("../../assets/icons/status/suspendido.png");
      case 20:
        return require("../../assets/icons/status/pausado.png");
      case 35:
        return require("../../assets/icons/status/retirado.png");
      // Agrega más casos según los estados que manejes
    }
  };

const ContractComponent = ({ data }: ContractComponentProps) => (
  <View style={styles.container}>
    <BackButton title={'Contrato'} />
    <View style={styles.contractContainer}>
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}>
          <View style={styles.frameContainer}>
            <View style={styles.activoParent}>
              <Text style={styles.activo}>{data.status_name}</Text>
              <Image source={getStatusImage(data.status)} style={styles.indicatorImage} />
              {/* <Image style={styles.frameChild} resizeMode="cover" source="Group 1.png" /> */}
            </View>
            <View style={[styles.frameView, styles.frameViewSpaceBlock]}>
              <View style={styles.frameParent1}>
                <View style={styles.frameGroup}>
                  <Text style={styles.mbps30Typo}>Nº de contrato:</Text>
                  <Text style={[styles.text, styles.textTypo]}>{data.id}</Text>
                </View>
                <View style={styles.nOrdenParent}>
                  <Text style={styles.mbps30Typo}>Nº orden:</Text>
                  <Text style={[styles.text, styles.textTypo]}>{data.order_id}</Text>
                </View>
              </View>
              <View style={styles.frameParent2}>
                <View style={styles.frameGroup}>
                  <Text style={[styles.saldoAFavor, styles.bsTypo]}>Saldo a favor</Text>
                  <Text style={[styles.bs, styles.bsTypo]}>{data.balance} USD</Text>
                </View>
                <View style={styles.frameItem} />
                <View style={styles.deudaActualParent}>
                  <Text style={[styles.saldoAFavor, styles.bsTypo]}>Deuda actual</Text>
                  <Text style={[styles.bs, styles.bsTypo]}>{data.debt} USD</Text>
                </View>
              </View>
              <View style={styles.fechaDeCobroParent}>
                <Text style={styles.mbps30Typo}>Fecha de cobro:</Text>
                <Text style={[styles.deMayo, styles.textTypo]}>Pagar antes del {data.date_cicle} para evitar cortes</Text>
              </View>
            </View>
            <View style={styles.frameViewSpaceBlock}>
              <Text style={styles.mbps30Typo}>Firma cliente:</Text>
              <Image style={styles.firmas1Icon} resizeMode="cover" source={{ uri: data.signe }} />
            </View>
          </View>
          <View style={styles.fechaDeCobroParent}>
            <Text style={styles.mbps30Typo}>Dirección</Text>
            <Text style={[styles.loremIpsumDolor, styles.internetTypo]}>{data.address}</Text>
          </View>
        </View>
        <View style={styles.serviciosContratadosParent}>
          <Text style={styles.mbps30Typo}>Servicios contratados</Text>
          <View style={styles.frameParent3}>
            {data.contract_detail.map((service, index)=>(
               service.plan_type != null ? (
                <View key={index} style={styles.frameGroup}>
                  <Text style={styles.internetTypo}>{service.service_type.name}</Text>
                  <View style={styles.planDiamanteParent}>
                    <Text style={[styles.planDiamante, styles.planTypo]}>{service.plan_type.name}</Text>
                    <Text style={[styles.mbps30, styles.mbps30Typo]}>{service.plan_type.profile}</Text>
                  </View>
                </View>
              ) :  <View key={index} style={styles.frameGroup}>
              <Text style={styles.internetTypo}>{service.service_type.name}</Text>
              <View style={styles.planDiamanteParent}>
                <Text style={[styles.planDiamante, styles.planTypo]}>{service.plan_type_corpor.description}</Text>
                {/* <Text style={[styles.mbps30, styles.mbps30Typo]}>{service.plan_type_corpor.cost}</Text> */}
              </View>
            </View>
                  
            ))}
        
      
          </View>
        </View>
      </View>
    </View>
  </View>
);

const ContractDetail = () => {
  const contract = useSelector((state: RootState) => state.contractState);
  const [contractDetail, setContractDetail] = useState<RootContract | undefined>(undefined);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getContractDetail(contract.contract);
        setContractDetail(response);
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
      }
    };

    fetchInvoices();
  }, [contract.contract]);

  return (
    <LayoutPrimary>
      {contractDetail ? <ContractComponent data={contractDetail} /> : <LoadingComponent isLoading={true} />}
    </LayoutPrimary>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      contractContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      frameViewSpaceBlock: {
        marginTop: percentHeight(1),
        alignItems: "center"
      },
      textTypo: {
        fontSize: percentWidth(4),
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        color: "#fafafa"
      },
      bsTypo: {
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        color: "#fafafa"
      },
      internetTypo: {
        textAlign: "center",
        fontFamily: "Roboto-Regular",
        fontSize: percentWidth(3),
        color: "#fafafa"
      },
      planTypo: {
        fontFamily: "Roboto-Medium",
        fontWeight: "500",
        textAlign: "center",
        fontSize: percentWidth(4),
        color: "#fafafa"
      },
      mbps30Typo: {
        color: "#abaaaa",
        fontFamily: "Roboto-Regular",
        fontSize: percentWidth(4),
        textAlign: "left"
      },
      activo: {
        fontSize: percentWidth(6.5),
        fontWeight: "600",
        fontFamily: "Roboto-Bold",
        textAlign: "left",
        color: "#fafafa"
      },
      frameChild: {
        width: percentWidth(4.5),
        height: percentWidth(4.5),
        marginLeft: percentWidth(3.2)
      },
      activoParent: {
        flexDirection: "row",
        alignItems: "center"
      },
      text: {
        marginTop: percentHeight(1.5)
      },
      frameGroup: {
        alignItems: "center",
        paddingRight:12,
      },
      nOrdenParent: {
        marginLeft: percentWidth(11.5),
        alignItems: "center"
      },
      frameParent1: {
        flexDirection: "row"
      },
      saldoAFavor: {
        fontSize: percentWidth(4),
        fontFamily: "Roboto-Regular"
      },
      bs: {
        fontSize: percentWidth(6),
        marginTop: percentHeight(0.6)
      },
      frameItem: {
        borderColor: "#fafafa",
        borderRightWidth: 0.5,
        width: 1,
        height: percentHeight(6.6),
        marginLeft: percentWidth(4),
        borderStyle: "solid"
      },
      deudaActualParent: {
        marginLeft: percentWidth(4),
        alignItems: "center"
      },
      frameParent2: {
        marginTop: percentHeight(3),
        flexDirection: "row"
      },
      deMayo: {
        marginTop: percentHeight(1)
      },
      fechaDeCobroParent: {
        marginTop: percentHeight(2),
        justifyContent: "center",
        alignItems: "center"
      },
      frameView: {
        justifyContent: "center"
      },
      firmas1Icon: {
        width: percentWidth(58),
        height: percentHeight(11.5),
        marginTop: percentHeight(1)
      },
      frameContainer: {
        justifyContent: "center",
        alignItems: "center"
      },
      loremIpsumDolor: {
        width: percentWidth(65),
        marginTop: percentHeight(1)
      },
      planDiamante: {
        width: percentWidth(23)
      },
      mbps30: {
        marginTop: percentHeight(1)
      },
      planDiamanteParent: {
        marginTop: percentHeight(2),
        alignItems: "center"
      },
      planDiamante1: {
        width: percentWidth(23),
        marginTop: percentHeight(2)
      },
      iptvParent: {
        marginLeft: percentWidth(9),
        alignItems: "center"
      },
      frameParent3: {
        marginTop: percentHeight(2.5),
        flexDirection: "row"
      },
      serviciosContratadosParent: {
        marginTop: percentHeight(3.2),
        alignItems: "center"
      },
      frameParent: {
        borderRadius: percentWidth(4),
        backgroundColor: "rgba(171, 170, 170, 0.26)",
        borderColor: "#fff",
        borderWidth: 0.4,
        width: "90%",
        paddingHorizontal: percentWidth(4),
        paddingVertical: percentHeight(4),
        borderStyle: "solid",
        alignItems: 'center'
      },
      indicatorImage: {
        width: 16, // Ajuste del tamaño de la imagen
        height: 16,
        marginLeft: 10,
      },
    });


export default ContractDetail;
