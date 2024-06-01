import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { LoadingComponent, SuccesComponent, ErrorComponent, DialogComponent } from "../../../../../components/components";
import DialogNotificationComponent from "../../../../../components/dialogs/dialogNotification";
import { percentWidth, percentHeight } from "../../../../../utils/dimensions/dimensions";
import { RootState } from "../../../../../utils/redux/store";
import { pagoMovilRegSchema } from "../../../../../utils/validators/validations_forms";
import CardPhones from "../../../../facturacion/components/metodos/pago_movil/components/card_phones";
import { getData } from "../../../../../utils/asyncStorage/asyncStorage";
import { saveMethods } from "../../../../../services/facturacion/methods_service";

const PagoMovilForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(pagoMovilRegSchema),
        shouldUnregister: false
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const [showDialog, setShowDialog] = useState(false);
    const area = useSelector((state: RootState) => state.formState.areaCode);
    const phoneNumberRef = useRef<TextInput>(null);
    const aliasRef = useRef<TextInput>(null);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const onSubmit = async (data: any) => {
        setShowLoading(true);
        const dataUser = await getData('user');

        const form = {
            "sender": `${area}${data.phoneNumber}`,
            "name": data.alias,
            "email": null,
            "method": 1,
            "client": dataUser.client.id,
        };

        const response = saveMethods(form);

        response.then(resp => {
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('success');
        }).catch(err => {
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('error');
        });
    };

    return (
        <View style={styles.frameParent}>
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <View style={styles.reportaTuPagoParent}>
                <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Nueva afiliacion</Text>
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
                            <TouchableOpacity style={[styles.wrapper, styles.wrapperBorder]} onPress={() => phoneNumberRef.current?.focus()}>
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            ref={phoneNumberRef}
                                            style={styles.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder="*******"
                                            placeholderTextColor="#fff"
                                            keyboardType="numeric"
                                            maxLength={7}
                                        />
                                    )}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.phoneNumber && (
                            <Text style={styles.errorText}>{(errors.phoneNumber as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Alias</Text>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => aliasRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="alias"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={aliasRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Alias"
                                        placeholderTextColor="#fff"
                                        maxLength={30}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        {errors.alias && (
                            <Text style={styles.errorText}>{(errors.alias as any).message}</Text>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.botonesBotnPrincipalParent}>
                <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Afiliar</Text>
                </TouchableOpacity>
            </View>
            <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Afiliación creada con exito"} route={"Afiliacion"} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Se ha producido un error"} />}
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

export default PagoMovilForm;
