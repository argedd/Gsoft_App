import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { percentHeight, percentWidth } from "../../../../../utils/dimensions/dimensions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import CheckBox from '@react-native-community/checkbox';
import { useEffect, useState } from "react";
import { DialogComponent, ErrorComponent, LoadingComponent, SuccesComponent } from "../../../../../components/components";
import { paymentInvoice, paymentValidate } from "../../../../../services/facturacion/facturas_service";
import DialogNotificationComponent from "../../../../../components/dialogs/dialogNotification";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../utils/redux/store";
import { formatDate } from "../../../../../utils/validators/format_date";
import { zelleSchema } from "../../../../../utils/validators/validations_forms";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { saveMethods } from "../../../../../services/facturacion/methods_service";
import { getData } from "../../../../../utils/asyncStorage/asyncStorage";

const MethodZelle = () => {

    const [showAlias, setShowAlias] = React.useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const [showDialog, setShowDialog] = useState(false);
    const area = useSelector((state: RootState) => state.formState.areaCode);
    const sender = useSelector((state: RootState) => state.formState.sender);
    const method = useSelector((state: RootState) => state.invoiceState.method);
    const [selected, setSelected] = useState('');
    const contract = useSelector((state: RootState) => state.contractState.contract);
    const invoice = useSelector((state: RootState) => state.invoiceState.data);
    const tasa = useSelector((state: RootState) => state.bcvState.tasa);
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(zelleSchema),
        context: { showAlias },
        shouldUnregister: false
    });
    useEffect(() => {
        if (sender && method === sender.method) {

            const senderDigits = sender.sender;
            setValue('titular', senderDigits); // Set initial phone number value

            // Set initial phone number value
        }
    }, [sender, method, setValue, dispatch]);


    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const onSubmit = async (data: any) => {
        const formValidate = {
            "bank": null,
            "amount": Number(data.amount),
            "reference": null,
            "sender": data.titular,
            "method": 3,
            "date": data.date
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
                const formPay = {
                    payment: [
                        {
                            bank: null,
                            method: 3,
                            reference: null,
                            amount: responseValidate.monto,
                            amount_bs: Number(responseValidate.monto * tasa).toFixed(2),
                            sender: data.titular,
                            date: data.date,
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
                    
                    const ze = {
                        "sender": data.titular,
                        "name": data.alias,
                        "email": data.email,
                        "method": 3,
                        "client": dataUser.client.id,
                    };
                    try {
                        const response = await saveMethods(ze);
                        setNotificationType('success');
                        setShowLoading(false);
                        setShowNotification(true);
                    } catch (error) {
                        setNotificationType('success');
                        setShowLoading(false);
                        setShowNotification(true);
                    }
                    setNotificationType('success');
                    setShowLoading(false);
                    setShowNotification(true);
                } catch (error: any) {
                    console.log(error.data);
                    setNotificationType('error');
                    setShowLoading(false);
                    setShowNotification(true);
                }

            }


        } catch (error) {
            console.log(error);
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
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Titular de la cuenta</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                            <Controller
                                control={control}
                                name="titular"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={[styles.zathit17Wrapper, styles.wrapperBorder]}>
                                        <TextInput
                                            style={styles.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="gnetworkve"
                                            placeholderTextColor="#fff"
                                            maxLength={30}

                                        />
                                    </View>
                                )}
                            />

                        </View>
                        {errors.titular && (
                            <Text style={styles.errorText}>{(errors.titular as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.margin}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Fecha de Pago</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={[styles.zathit17Wrapper, styles.wrapperBorder, styles.dateContainer]}>
                                        <TextInput
                                            style={styles.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="0000-00-00"
                                            placeholderTextColor="#fff"
                                            keyboardType="numeric"
                                            maxLength={15}

                                        />
                                        <TouchableOpacity onPress={toggleDialog} style={styles.calendarIcon}>
                                            <MaterialCommunityIcons name="calendar-clock-outline" size={20} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                )}

                            />

                        </View>
                        {errors.date && (
                            <Text style={styles.errorText}>{(errors.date as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Monto</Text>
                        <Controller
                            control={control}
                            name="amount"
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
                    {errors.amount && (
                        <Text style={styles.errorText}>{(errors.amount as any).message}</Text>
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
                <Calendar

                    theme={{
                        backgroundColor: 'transparent',
                        calendarBackground: 'transparent',
                        textSectionTitleColor: '#fff',
                        selectedDayBackgroundColor: '#fff',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#fff',
                        dayTextColor: '#fff',
                        monthTextColor: "#fff",
                        arrowColor: "#fff"
                    }}
                    onDayPress={(day: any) => {

                        setSelected(day.dateString);
                        setValue('date', day.dateString);
                        toggleDialog();
                        ;
                    }}

                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'red' }
                    }}
                />
            </DialogComponent>


        </View>
    );
};

const styles = StyleSheet.create({
    iniciarSesinTypo: {
        textAlign: "left",
        fontSize: 16
    },
    margin: {
        marginTop: 20,
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
    // Estilo adicional para el contenedor de la fecha
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between", // Alinear los elementos a lo largo del contenedor
        alignItems: "center", // Alinear los elementos verticalmente en el contenedor
        paddingRight: 10, // Agregar un espacio a la derecha para separar el icono del texto
    },
    calendarIcon: {
        marginLeft: 10, // Añadir un espacio a la izquierda del icono para separarlo del texto
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

export default MethodZelle;
