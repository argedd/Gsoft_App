import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { percentHeight, percentWidth } from "../../../../../utils/dimensions/dimensions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { pagoMovilSchema } from '../../../../../utils/validators/validations_forms';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { DialogComponent, ErrorComponent, LoadingComponent, SuccesComponent } from "../../../../../components/components";
import { paymentInvoice, paymentValidate } from "../../../../../services/facturacion/facturas_service";
import DialogNotificationComponent from "../../../../../components/dialogs/dialogNotification";
import CardPhones from "./components/card_phones";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../utils/redux/store";
import { setAreaCode } from '../../../../../utils/redux/actions/formActions';
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { saveMethods } from "../../../../../services/facturacion/methods_service";
import { getData } from "../../../../../utils/asyncStorage/asyncStorage";

const MethodPm = () => {

    const [showAlias, setShowAlias] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const [showDialog, setShowDialog] = useState(false);
    const area = useSelector((state: RootState) => state.formState.areaCode);
    const sender = useSelector((state: RootState) => state.formState.sender);
    const method = useSelector((state: RootState) => state.invoiceState.method);
    const contract = useSelector((state: RootState) => state.contractState.contract);
    const invoice = useSelector((state: RootState) => state.invoiceState.data);
    const tasa = useSelector((state: RootState) => state.bcvState.tasa);
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(pagoMovilSchema),
        context: { showAlias },
        shouldUnregister: false
    });
    useEffect(() => {
        if (sender && method === sender.method) {
            const senderDigits = sender.sender;
            const firstFourDigits = senderDigits.slice(0, 4);
            const remainingDigits = senderDigits.slice(4);

            dispatch(setAreaCode(firstFourDigits));
            setValue('phoneNumber', remainingDigits); // Set initial phone number value
        }
    }, [sender, method, setValue, dispatch]);


    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const onSubmit = async (data: any) => {
        const formValidate = {
            "bank": null,
            "amount": null,
            "reference": data.referenceNumber,
            "sender": `${area}${data.phoneNumber}`,
            "method": 1,
            "date": null,
            // "date": moment(new Date()).format('YYYY-MM-DD')
        };



        setShowLoading(true);
        try {
            const responseValidate = await paymentValidate(formValidate);



            if ('error' in responseValidate) {
                setShowLoading(false);
                setNotificationType('error');
                setShowNotification(true);
            } else if (responseValidate.data && responseValidate.data.error) {
                setShowLoading(false);
                setNotificationType('error');
                setShowNotification(true);

            } else {
                // console.log(invoice);
                const formPay = {
                    payment: [
                        {
                            bank: null,
                            method: 1,
                            reference: data.referenceNumber,
                            amount: responseValidate.monto,
                            amount_bs: Number(responseValidate.monto * tasa).toFixed(2),
                            sender: `${area}${data.phoneNumber}`,
                            date: responseValidate.date,
                            contract: contract,
                            payment_invoices: [
                                {
                                    invoice: invoice.id,
                                    amount: invoice.amount,
                                },
                            ],
                        },
                    ],
                }

                try {

                    const payment = await paymentInvoice(formPay)
                    const dataUser = await getData('user');

                    const pm = {
                        "sender": `${area}${data.phoneNumber}`,
                        "name": data.alias,
                        "email": null,
                        "method": 1,
                        "client": dataUser.client.id,
                    };

                    try {
                        const response = await saveMethods(pm);
              
                        setNotificationType('success');
                        setShowLoading(false);
                        setShowNotification(true);
                    } catch (error) {
                        setNotificationType('success');
                        setShowLoading(false);
                        setShowNotification(true);
                    }


                } catch (error: any) {
                    console.log(error.data[0].message);
                    setNotificationType('error');
                    setShowLoading(false);
                    setShowNotification(true);
                }



            }


        } catch (error) {
            // console.log(error);
            setNotificationType('error');
            setShowLoading(false);
            setShowNotification(true);
        }
    };

    return (
        <View style={styles.frameParent}>
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <View style={styles.reportaTuPagoParent}>
                <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Reporta tu pago</Text>
                <View style={styles.formTelefonoParent}>
                    <View>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Nº de teléfono</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                            <TouchableOpacity onPress={toggleDialog}>
                                <View style={[styles.parent, styles.wrapperBorder]}>
                                    <Controller
                                        control={control}
                                        name="areaCode"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <>
                                                <TextInput
                                                    style={styles.text}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={area}
                                                    placeholder="0412"
                                                    placeholderTextColor="#fff"
                                                    maxLength={4}
                                                    selectionColor="red"
                                                    editable={false}
                                                />
                                                <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                                            </>
                                        )}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={[styles.wrapper, styles.wrapperBorder]}>
                                        <TextInput
                                            style={styles.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="*******"
                                            placeholderTextColor="#fff"
                                            keyboardType="numeric"
                                            maxLength={7}

                                        />
                                    </View>
                                )}
                            />

                        </View>
                        {errors.phoneNumber && (
                            <Text style={styles.errorText}>{(errors.phoneNumber as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Nº de referencia</Text>
                        <Controller
                            control={control}
                            name="referenceNumber"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={[styles.zathit17Wrapper, styles.wrapperBorder]}>
                                    <TextInput
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="000000"
                                        placeholderTextColor="#fff"
                                        keyboardType="numeric"
                                        maxLength={6}

                                    />
                                </View>
                            )}
                        />
                    </View>
                    {errors.referenceNumber && (
                        <Text style={styles.errorText}>{(errors.referenceNumber as any).message}</Text>
                    )}
                </View>
                <View style={styles.formUsuario}>
                    <View style={styles.registrarDatos}>
                        <View style={styles.iconosSelectParent}>
                            <CheckBox
                                value={showAlias}
                                onValueChange={setShowAlias}
                            />
                            <Text style={[styles.registrarDatosDe, styles.textTypo]}>Registrar datos de pago</Text>
                        </View>
                        {showAlias && (
                            <View style={styles.formUsuario}>
                                <Controller
                                    control={control}
                                    name="alias"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={[styles.aliasWrapper, styles.wrapperBorder]}>
                                            <TextInput
                                                style={styles.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholder="Alias"
                                                placeholderTextColor="#fff"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.alias && (
                                    <Text style={styles.errorText}>{(errors.alias as any).message}</Text>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.botonesBotnPrincipalParent}>
                <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Reportar pago</Text>
                </TouchableOpacity>
            </View>

            <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Tu operación ha sido procesada con éxito"} route={"Facturacion"} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"No pudimos encontrar el pago"} />}
            </DialogNotificationComponent>
            <DialogComponent visible={showDialog} onClose={toggleDialog}>
                <CardPhones onClose={() => setShowDialog(false)} />
            </DialogComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    iniciarSesinTypo: {
        textAlign: "left",
        fontSize: 16
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
    textTypo: {
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        color: "#fff"
    },
    frameGroupSpaceBlock: {
        width: percentWidth(80)
    },
    wrapperBorder: {
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: "#fafafa",
        flexDirection: "row",
        paddingHorizontal: percentWidth(4),
        borderStyle: "solid",
        alignItems: "center"
    },
    botonesFlexBox: {
        paddingHorizontal: percentWidth(8),
        justifyContent: "center",
        paddingVertical: percentHeight(1.5),
        borderRadius: 8,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center"
    },
    reportaTuPago: {
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        color: "#fff",
        textAlign: "left"
    },
    nDeTelfono: {
        fontSize: 14,
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        fontFamily: "Roboto-Regular",
        color: "#fff"
    },
    parent: {
        width: percentWidth(23)
    },
    wrapper: {
        marginLeft: percentWidth(1),
        flex: 1
    },
    frameGroup: {
        flexDirection: "row"
    },
    zathit17Wrapper: {
        marginTop: percentHeight(1),
        width: percentWidth(80)
    },
    formUsuario: {
        marginTop: percentHeight(2)
    },
    formTelefonoParent: {
        marginTop: percentHeight(2),
        alignSelf: "stretch"
    },
    registrarDatosDe: {
        marginLeft: percentWidth(3),
        fontSize: 16,
        fontFamily: "Roboto-Regular"
    },
    iconosSelectParent: {
        flexDirection: "row",
        alignItems: "center"
    },
    aliasWrapper: {
        width: percentWidth(80),
        borderWidth: 0.5,
        borderRadius: 8
    },
    registrarDatos: {
        overflow: "hidden",
        alignItems: "center"
    },
    reportaTuPagoParent: {
        borderRadius: 16,
        backgroundColor: "rgba(171, 170, 170, 0.26)",
        borderColor: "#fff",
        borderWidth: 0.5,
        paddingVertical: percentHeight(2),
        paddingHorizontal: percentWidth(4),
        borderStyle: "solid",
        alignItems: "center"
    },
    iniciarSesin: {
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#fafafa"
    },
    botonesBotnPrincipal: {
        backgroundColor: "#e20a17"
    },
    botonesBotnPrincipalParent: {
        marginTop: percentHeight(2),
        marginBottom: percentHeight(2),
        alignSelf: "stretch",
        alignItems: "center"
    },
    frameParent: {
        width: "100%",
        alignItems: "center",
    }
});

export default MethodPm;
