import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton, LoadingComponent } from '../../../components/components';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/store';
import { Invoice } from '../../../data/interfaces/invoice_interface';
import { percentWidth, percentHeight } from '../../../utils/dimensions/dimensions';
import { getTasaBcv } from '../../../services/bcv/bcv';
import { ResultBcv } from '../../../data/interfaces/bcv_interface';
import { setAmount, setAmountBs, getMethodsClient } from '../../../utils/redux/actions/invoiceActions';
import { getMethods } from '../../../services/facturacion/methods_service';
import { setTasa } from '../../../utils/redux/actions/bcvActions';

type NavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
    navigation: NavigationProp;
}

const PagoFacturaView: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const invoice = useSelector((state: RootState) => state.invoiceState);
    const contract = useSelector((state: RootState) => state.contractState);
    const [tasaBcv, setTasaBcv] = useState(0);
    const [totalBs, setTotalBs] = useState(0);
    const [invoiceDetail, setInvoiceDetail] = useState<Invoice | undefined>(undefined);
    
    useEffect(() => {
        const fetchTasaBcv = async () => {
            try {
                const tasa = await getTasaBcv();
                if (Array.isArray(tasa)) {
                    const firstTasa = tasa[0] as ResultBcv;
                    setTasaBcv(Number(firstTasa.monto));
                    dispatch(setTasa(Number(firstTasa.monto)))
                }
            } catch (error) {
                console.error('Error al obtener la tasa BCV:', error);
            }
        };

        const fetchMethods = async () => {
            try {
                const methods = await getMethods();
           
                dispatch(getMethodsClient(methods));

            } catch (error) {
                console.error('Error al obtener metodos del cliente:', error);
            }
        };

        fetchMethods();
        fetchTasaBcv();
    }, []);

    useEffect(() => {
        if (invoice.data) {
            setInvoiceDetail(invoice.data);
        }
    }, [invoice.data]);

    useEffect(() => {
    
        if (invoiceDetail && tasaBcv) {
            const calculatedTotalBs = Number(tasaBcv) * (Number(invoiceDetail.amount)-Number(invoiceDetail.balance));
            const calculatedTotal = Number(invoiceDetail.amount)-Number(invoiceDetail.balance);
            setTotalBs(calculatedTotalBs);
             dispatch(setAmountBs(calculatedTotalBs));
             dispatch(setAmount(calculatedTotal));

        }
    }, [invoiceDetail, tasaBcv]);
    
    const PagoFacturaComponent = () => (
        <View style={styles.container}>
            <BackButton title={'Pago Factura'} />
            <View style={styles.contractContainer}>
                <View style={styles.tasaBcv3650BsParent}>
                    <Text style={[styles.tasaBcv3650, styles.planTypo]}>Tasa BCV: {tasaBcv}. Bs</Text>
                    <View style={styles.frameWrapper}>
                        <View style={styles.frameContainer}>
                            <View style={styles.frameContainer}>
                                <View style={styles.frameGroup}>
                                    <View style={styles.nDeContratoParent}>
                                        <Text style={[styles.nDeContrato, styles.ref5Clr]}>Nº de contrato:</Text>
                                        <Text style={styles.text}>{contract.contract}</Text>
                                    </View>
                                    <View style={[styles.nOrdenParent, styles.parentFlexBox]}>
                                        <Text style={[styles.nDeContrato, styles.ref5Clr]}>Nº orden:</Text>
                                        <Text style={styles.text}>000000</Text>
                                    </View>
                                </View>
                                <View style={styles.frameView}>
                                    <View style={styles.nDeContratoParent}>
                                        <Text style={styles.saldoAFavor}>Saldo a favor</Text>
                                        <Text style={styles.text2}>{invoiceDetail?.balance} USD</Text>
                                    </View>
                                    <View style={styles.frameChild} />
                                    <View style={styles.deudaActualParent}>
                                        <Text style={styles.saldoAFavor}>Deuda actual</Text>
                                        <Text style={styles.text2}>{invoiceDetail?.amount} USD</Text>
                                    </View>
                                </View>
                                <View style={[styles.fechaDeCobroParent, styles.parentFlexBox]}>
                                    <Text style={[styles.nDeContrato, styles.ref5Clr]}>Fecha de cobro:</Text>
                                    <Text style={[styles.deMayo, styles.deMayoTypo]}>20 de mayo</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.frameWrapper}>
                        <Text style={[styles.nDeContrato, styles.ref5Clr]}>Servicios contratados</Text>
                        <View style={styles.frameParent1}>
                        {invoiceDetail?.invoices_items_gsoft.map((service, index)=>(
                            <View key={index} style={styles.nDeContratoParent}>                        
                                <Text style={[styles.internet, styles.planFlexBox]}>{service.service_name}</Text>
                                <View style={styles.planDiamanteParent}>
                                    <Text style={[styles.planDiamante, styles.planFlexBox]}>{service.details}</Text>
                                    {/* <Text style={[styles.mbps30, styles.deMayoTypo]}>60Mbps / 30 Mbps</Text> */}
                                </View>                            
                            </View>
                        )
                    )}
                            {/* <View style={styles.iptvParent}>
                                <Text style={[styles.internet, styles.planFlexBox]}>IPTV</Text>
                                <Text style={[styles.planDiamante1, styles.planFlexBox]}>{`Plan diamante `}</Text>
                            </View> */}
                        </View>
                    </View>
                    <View style={styles.frameWrapper}>
                        <View style={styles.nDeContratoParent}>
                            <Text style={styles.saldoAFavor}>Monto a pagar</Text>
                            <Text style={styles.text2}>{totalBs.toFixed(2)}.Bs</Text>
                        </View>
                        <Text style={[styles.ref5, styles.ref5Clr]}>Ref: {Number(invoiceDetail?.amount)-Number(invoiceDetail?.balance)} USD</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.botonesBotnPrincipal} onPress={() => { navigation.navigate("InfoPago")}}>
                    <Text style={styles.iniciarSesin}>Ir a pagar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <LayoutPrimary>
            {invoiceDetail ? <PagoFacturaComponent /> : <LoadingComponent isLoading={true} />}
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
    planTypo: {
        fontFamily: "Roboto-Medium",
        fontWeight: "500"
    },
    ref5Clr: {
        color: "#abaaaa",
        fontSize: percentWidth(4)
    },
    parentFlexBox: {
        display: "none",
        alignItems: "center"
    },
    deMayoTypo: {
        marginTop: percentHeight(1),
        fontFamily: "Roboto-Regular",
        textAlign: "left"
    },
    planFlexBox: {
        textAlign: "center",
        color: "#fafafa"
    },
    tasaBcv3650: {
        color: "#fff",
        textAlign: "left",
        fontSize: percentWidth(4)
    },
    nDeContrato: {
        fontFamily: "Roboto-Regular",
        textAlign: "left"
    },
    text: {
        marginTop: percentHeight(1.5),
        color: "#fafafa",
        fontSize: percentWidth(5),
        fontFamily: "Roboto-Regular",
        textAlign: "left"
    },
    nDeContratoParent: {
        alignItems: "center"
    },
    nOrdenParent: {
        marginLeft: percentWidth(12)
    },
    frameGroup: {
        flexDirection: "row"
    },
    saldoAFavor: {
        color: "#fafafa",
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        fontSize: percentWidth(4)
    },
    text2: {
        fontSize: percentWidth(6),
        marginTop: percentHeight(0.5),
        color: "#fafafa",
        fontFamily: "Roboto-Regular",
        textAlign: "left"
    },
    frameChild: {
        borderColor: "#fafafa",
        borderRightWidth: 0.5,
        width: 1,
        height: percentHeight(6),
        marginLeft: percentWidth(4),
        borderStyle: "solid"
    },
    deudaActualParent: {
        marginLeft: percentWidth(4),
        alignItems: "center"
    },
    frameView: {
        marginTop: percentHeight(3),
        flexDirection: "row"
    },
    deMayo: {
        color: "#fafafa",
        fontSize: percentWidth(5)
    },
    fechaDeCobroParent: {
        marginTop: percentHeight(3),
        justifyContent: "center"
    },
    frameContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    frameWrapper: {
        marginTop: percentHeight(3),
        alignItems: "center"
    },
    internet: {
        fontFamily: "Roboto-Regular",
        fontSize: percentWidth(4)
    },
    planDiamante: {
        width: percentWidth(90),
        fontSize: percentWidth(5),
        fontFamily: "Roboto-Medium",
        fontWeight: "500"
    },
    mbps30: {
        color: "#abaaaa",
        fontSize: percentWidth(4)
    },
    planDiamanteParent: {
        marginTop: percentHeight(2),
        alignItems: "center"
    },
    planDiamante1: {
        width: percentWidth(24),
        marginTop: percentHeight(2),
        fontSize: percentWidth(5),
        fontFamily: "Roboto-Medium",
        fontWeight: "500"
    },
    iptvParent: {
        marginLeft: percentWidth(9),
        alignItems: "center"
    },
    frameParent1: {
        flexDirection: "row"
    },
    ref5: {
        marginTop: percentHeight(2),
        fontFamily: "Roboto-Regular",
        textAlign: "left"
    },
    tasaBcv3650BsParent: {
        borderRadius: 16,
        backgroundColor: "rgba(171, 170, 170, 0.26)",
        borderColor: "#fff",
        borderWidth: 0.4,
        width: percentWidth(90),
        paddingHorizontal: percentWidth(4),
        paddingVertical: percentHeight(4),
        alignItems: "center",
        borderStyle: "solid",
        marginBottom: percentHeight(2),
    },
    iniciarSesin: {
        fontSize: percentWidth(4),
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#fafafa",
        textAlign: "left"
    },
    botonesBotnPrincipal: {
        borderRadius: 8,
        backgroundColor: "#e20a17",
        width: percentWidth(90),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: percentWidth(8),
        paddingVertical: percentHeight(2),
        marginTop: percentHeight(2),
    }
});

export default PagoFacturaView;
