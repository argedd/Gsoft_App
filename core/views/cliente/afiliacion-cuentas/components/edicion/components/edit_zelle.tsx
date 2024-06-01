import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogConfirm from "../../../../../../components/dialogs/dialogConfirm";
import { LoadingComponent, SuccesComponent, ErrorComponent, DialogComponent } from "../../../../../../components/components";
import DialogNotificationComponent from "../../../../../../components/dialogs/dialogNotification";
import { deleteMethod, editMethods } from "../../../../../../services/facturacion/methods_service";
import { percentWidth, percentHeight } from "../../../../../../utils/dimensions/dimensions";
import { RootState } from "../../../../../../utils/redux/store";
import CardPhones from "../../../../../facturacion/components/metodos/pago_movil/components/card_phones";
import { trfRegSchema, zelleRegSchema } from "../../../../../../utils/validators/validations_forms";



const EditZelleForm = (method: any) => {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(zelleRegSchema),
        shouldUnregister: false
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogConfirm, setShowDialogConfirm] = useState(false);
    const zelleRef = useRef<TextInput>(null);
    const aliasRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);

    useEffect(() => {
        if (method.method) {
            setValue('alias', method.method.name);
            setValue('titular', method.method.sender);
            setValue('email', method.method.email);
        }
    }, [method.method]);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const onSubmit = async (data: any) => {
        setShowLoading(true);

        const form = {
            "sender": data.titular,
            "name": data.alias,
            "email": data.email,
            "method": 3,
        };

        const response = editMethods(method.method.id, form);

        response.then((resp: any) => {
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('success');
        }).catch((err: any) => {
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('error');
        });
    };

    const deleteMethodUser = () => {
        setShowDialogConfirm(true);
    }

    const handleDeleteConfirm = async () => {
        setShowDialogConfirm(false);
        setShowLoading(true);
        try {
            await deleteMethod(method.method.id); // Llama al servicio de eliminación
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('success');
        } catch (err) {
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('error');
        }
    };

    return (
        <View style={styles.frameParent}>
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <View style={styles.reportaTuPagoParent}>
                <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Cuenta Afiliada</Text>
                <View style={styles.formTelefonoParent}>
                    <View>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Titular</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => zelleRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="titular"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={zelleRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Titular zelle"
                                        placeholderTextColor="#fff"
                                        maxLength={30}
        
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        </View>
                        {errors.titular && (
                            <Text style={styles.errorText}>{(errors.titular as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Email</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => emailRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={emailRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Email"
                                        placeholderTextColor="#fff"
                                        maxLength={30}
        
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        </View>
                        {errors.email && (
                            <Text style={styles.errorText}>{(errors.email as any).message}</Text>
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
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Editar Método</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonesBotnSegundario} onPress={deleteMethodUser}>
                    <Text style={styles.iniciarSesin}>Eliminar Método</Text>
                </TouchableOpacity>
            </View>
            <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Operación exitosa"} route={"Afiliacion"} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Se ha producido un error"} />}
            </DialogNotificationComponent>
            <DialogComponent visible={showDialog} onClose={toggleDialog}>
                <CardPhones onClose={() => setShowDialog(false)} />
            </DialogComponent>
            <DialogConfirm 
                visible={showDialogConfirm}
                onClose={() => setShowDialogConfirm(false)}
                onConfirm={handleDeleteConfirm} // Pasa la función que maneja la confirmación
                message={"¿Estás seguro de eliminar éste método de pago?"} />
                
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
        width: percentWidth(90),
        alignSelf: "center",
        alignItems: "center"
    },
    frameParent: {
        width: "100%",
        alignItems: "center",
        paddingTop: percentHeight(20)
    },
    botonesBotnSegundario: {
        alignSelf: "stretch",
        borderRadius: 8,
        borderStyle: "solid",
        borderColor: "#fafafa",
        borderWidth: 2,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: percentWidth(4),
        paddingVertical:  percentHeight(1.5),
        marginTop:  percentHeight(1.5)
        }
});

export default EditZelleForm;
