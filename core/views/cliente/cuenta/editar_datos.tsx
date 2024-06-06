import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, SuccesComponent, ErrorComponent, DialogComponent, BackButton } from "../../../components/components";
import DialogNotificationComponent from "../../../components/dialogs/dialogNotification";
import { getData } from "../../../utils/asyncStorage/asyncStorage";
import { percentWidth, percentHeight } from "../../../utils/dimensions/dimensions";
import { RootState } from "../../../utils/redux/store";
import LayoutPrimary from "../../../components/layouts/layout_primary";
import { editDataSchema } from "../../../utils/validators/user_validation";
import { CardPhones, CardPhones2 } from "./components/card_phones";
import { getClient, setClient } from "../../../services/clients/clients_service";
import { ResultClient } from '../../../data/interfaces/client_interface';
import { setAreaCode, setAreaCode2 } from "../../../utils/redux/actions/formActions";


const EditDatosView = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(editDataSchema),
        shouldUnregister: false
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
    const area = useSelector((state: RootState) => state.formState.areaCode);
    const area2 = useSelector((state: RootState) => state.formState.areaCode2);
    const phoneNumber1Ref = useRef<TextInput>(null);
    const phoneNumber2Ref = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = async () => {
          const dataUser = await getClient();
            
          dataUser.results.map((resp:any)=>{

            setValue("fullName", `${resp.name} ${resp.last_name}`);
            setValue("email", `${resp.email}`);
            const firstFourDigits = resp.phone.slice(0, 4);
            const remainingDigits = resp.phone.slice(4);
            const firstFourDigits2 = resp.mobile.slice(0, 4);
            const remainingDigits2 = resp.mobile.slice(4);
            dispatch(setAreaCode(firstFourDigits));
            dispatch(setAreaCode2(firstFourDigits2));
            setValue('phoneNumber1', remainingDigits);
            setValue('phoneNumber2', remainingDigits2);
          })
         
        };
        userData();
      }, []);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const toggleDialog2 = () => {
        setShowDialog2(!showDialog2);
    };

 

    const onSubmit = async (data: any) => {

        setShowLoading(true);
        const dataUser = await getData('user');

        const form ={
            "email": data.email,
            "phone": `${area}${data.phoneNumber1}`,
            "mobile": `${area2}${data.phoneNumber2}`,
        }

      

        const response = setClient(dataUser.client.id,form);

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


    const FormComponent = () =>(
        <View style={styles.container}>
        <BackButton title={'Editar Datos'} />
        <View style={styles.containeItem}>
        <View style={styles.frameParent}>
        {showLoading && <LoadingComponent isLoading={showLoading} />}
        <View style={styles.reportaTuPagoParent}>
            <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Tus Datos</Text>
            <View style={styles.formTelefonoParent}>
            <View style={styles.formUsuario}>
                    <Text style={[ styles.textTypo]}>Nombres</Text>
                    <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} >
                        <Controller
                            control={control}
                            name="fullName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.text}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="fullName"
                                    placeholderTextColor="#fff"
                                    maxLength={30}
                                    readOnly={true}
                                />
                            )}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.formUsuario}>
                    <Text style={[ styles.textTypo]}>Email</Text>
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
                    {errors.email && (
                        <Text style={styles.errorText}>{(errors.email as any).message}</Text>
                    )}
                </View>
                <View style={styles.labelNro}>
                    <Text style={[styles.nDeTelfono, styles.textTypo]}>Nº de teléfono 1</Text>
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
                        <TouchableOpacity style={[styles.wrapper, styles.wrapperBorder]} onPress={() => phoneNumber1Ref.current?.focus()}>
                            <Controller
                                control={control}
                                name="phoneNumber1"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={phoneNumber1Ref}
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
                    {errors.phoneNumber1 && (
                        <Text style={styles.errorText}>{(errors.phoneNumber1 as any).message}</Text>
                    )}
                </View>
                <View style={styles.labelNro}>
                    <Text style={[styles.nDeTelfono, styles.textTypo]}>Nº de teléfono 2</Text>
                    <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity onPress={toggleDialog2}>
                            <View style={[styles.parent, styles.wrapperBorder]}>
                                <Controller
                                    control={control}
                                    name="areaCode2"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <>
                                            <TextInput
                                                style={styles.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={area2}
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
                        <TouchableOpacity style={[styles.wrapper, styles.wrapperBorder]} onPress={() => phoneNumber2Ref.current?.focus()}>
                            <Controller
                                control={control}
                                name="phoneNumber2"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={phoneNumber2Ref}
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
                    {errors.phoneNumber2 && (
                        <Text style={styles.errorText}>{(errors.phoneNumber2 as any).message}</Text>
                    )}
                </View>
            </View>
        </View>
        <View style={styles.botonesBotnPrincipalParent}>
            <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={handleSubmit(onSubmit)}>
                <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
        <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
            {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Datos actualizados con exito"} route={"Client"} />}
            {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Se ha producido un error"} />}
        </DialogNotificationComponent>
        <DialogComponent visible={showDialog} onClose={toggleDialog}>
            <CardPhones onClose={() => setShowDialog(false)} />
        </DialogComponent>
        <DialogComponent visible={showDialog2} onClose={toggleDialog2}>
            <CardPhones2 onClose={() => setShowDialog2(false)} />
        </DialogComponent>
    </View>
    </View>
    </View>
    );

    return (
        <LayoutPrimary>
        <FormComponent />
      </LayoutPrimary>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 50,
      },
      containeItem:{
        alignContent:'center',
        alignItems:'center',
        paddingTop:percentHeight(8)
      },
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
        paddingHorizontal: percentWidth(4),
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
    fullNameWrapper: {
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
        width: "90%",
        alignItems: "center",
    },

    labelNro:{
        marginTop:10,
    }
});

export default EditDatosView;
