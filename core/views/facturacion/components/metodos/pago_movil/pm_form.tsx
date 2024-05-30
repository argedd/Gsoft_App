import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { percentHeight, percentWidth } from "../../../../../utils/dimensions/dimensions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { pagoMovilSchema } from '../../../../../utils/validators/validations_forms';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from "react";
import { LoadingComponent } from "../../../../../components/components";
import { paymentValidate } from "../../../../../services/facturacion/facturas_service";
import DialogNotificationComponent from "../../../../../components/dialogs/dialogNotification";
import ErrorComponent from "../../../../../components/notifications/error";
import SuccesComponent from "../../../../../components/notifications/succes";

const MethodPm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(pagoMovilSchema)
    });
    const [showAlias, setShowAlias] = React.useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);

    const onSubmit = async (data: any) => {
        const formValidate = {
            "bank": null,
            "amount": 1000,
            "reference": data.referenceNumber,
            "sender": `${data.areaCode}${data.phoneNumber}`,
            "method": 1,
            "date": "2024-05-29"
        };

        console.log('====================================');
        console.log(formValidate);
        console.log('====================================');

        setShowLoading(true);
        try {
            const responseValidate = await paymentValidate(formValidate);

            console.log('====================================');
            console.log(responseValidate);
            console.log('====================================');

            if ('error' in responseValidate) {
                console.log(responseValidate.error);
                setNotificationType('error');
            } else if (responseValidate.data && responseValidate.data.error) {
                console.log(responseValidate.data.error);
                setNotificationType('error');
            } else {
                console.log('Payment validation successful');
                setNotificationType('success');
            }
            setShowLoading(false);
            setShowNotification(true);

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
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Nº de teléfono</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                            <Controller
                                control={control}
                                name="areaCode"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={[styles.parent, styles.wrapperBorder]}>
                                        <TextInput
                                            style={styles.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="0412"
                                            placeholderTextColor="#fff"
                                            maxLength={4}
                                            selectionColor="red"
                                        />
                                        <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                                    </View>
                                )}
                            />
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
                                            placeholder="3250165"
                                            placeholderTextColor="#fff"
                                        />
                                    </View>
                                )}
                            />
                        </View>
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
                                        placeholder="12345678"
                                        placeholderTextColor="#fff"
                                    />
                                </View>
                            )}
                        />
                    </View>
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
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} />}
            </DialogNotificationComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    iniciarSesinTypo: {
        textAlign: "left",
        fontSize: 16
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
