import React, { useEffect, useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { percentHeight, percentWidth } from '../../../utils/dimensions/dimensions';
import PlanesComponents from './components/planes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/store';
import { getPlanes } from '../../../services/planes/plan_services';
import { setClients } from '../../../utils/redux/actions/planActions';






type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
    navigation: ConfiguracionViewNavigationProp;
}


const InternetView: React.FC<Props> = ({ navigation }) => {
    const contract = useSelector((state: RootState) => state.contractState.contract);
    const dispatch = useDispatch();

     useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await getPlanes(contract);
                dispatch(setClients(response));         
            } catch (error) {
                console.error('Error al obtener planes:', error);
            }
        };

        fetchContract();
    }, [contract.contract]);
    const InternetComponent = () => (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Image style={styles.component1Icon} resizeMode="contain" source={require("../../../assets/logo_gnetwork.png")} />

                <View style={[styles.menusMetodosDePagosParent, styles.parentFlexBox]}>

                    <View style={[styles.parentFlexBox]}>
                        <PlanesComponents  />
                    </View>
                </View>
            </View>


        </View>

    );
    return (
        <LayoutPrimary>
            <BackButton title={'Gestion de Planes'} />
            <ScrollView stickyHeaderHiddenOnScroll={true}>
                <InternetComponent />

            </ScrollView>
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
        paddingTop: 16
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
        alignItems: "center",
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
export default InternetView