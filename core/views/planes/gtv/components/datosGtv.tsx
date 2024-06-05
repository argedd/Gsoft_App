import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { percentWidth, percentHeight } from "../../../../utils/dimensions/dimensions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingComponent, SuccesComponent, ErrorComponent } from "../../../../components/components";
import DialogNotificationComponent from "../../../../components/dialogs/dialogNotification";
import { gtvSchema } from "../../../../utils/validators/gtv_validator";
import { getInfo, putAccountGtv } from "../../../../services/gtv/gtv_service";

interface Props{
    id: string,
    contract:any,
    
  }

const GtvDatosComponent = ({id,contract}:Props) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(gtvSchema),
        shouldUnregister: false
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const passwordRef = useRef<TextInput>(null);
    const pinRef = useRef<TextInput>(null);

    useEffect(() => {
        const fetchInfo = async () => {
            setShowLoading(true);
          try {
            const response = await getInfo(id);
         
            setValue('user',response.result.userName)
            setValue('password',response.result.password)
            setValue('pin',response.result.pinCode)
            setShowLoading(false);      

          } catch (error) {
            setShowLoading(false);      
            console.error('Error al obtener los datos:', error);
          }
        };
      
        fetchInfo();
      }, []);

    
    const onSubmit = async (data: any) => {
        console.log('====================================');
        console.log(data);
        console.log(contract);
        setShowLoading(true);
        const form ={
            
                "password": data.password,
                "pin_code": data.pin,
                "contract_detail": contract
            
        }
      
        setShowLoading(false);

        const response = putAccountGtv(contract,form);

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
    return (
        <View style={styles.frameParent}>
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <View style={styles.reportaTuPagoParent}>
                <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Datos de acceso G-TV</Text>
                <View style={styles.formTelefonoParent}>
                    <View>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Usuario</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]}>
                            <Controller
                                control={control}
                                name="user"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Usuario"
                                        placeholderTextColor="#fff"
                                        maxLength={30}
                                        readOnly={true}
        
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        </View>
                        {errors.user && (
                            <Text style={styles.errorText}>{(errors.user as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Contraseña</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => passwordRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={passwordRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Contraseña"
                                        placeholderTextColor="#fff"
                                        maxLength={10}
                                        keyboardType="numeric"
        
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        </View>
                        {errors.password && (
                            <Text style={styles.errorText}>{(errors.password as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Pin</Text>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => pinRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="pin"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={pinRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Pin"
                                        placeholderTextColor="#fff"
                                        maxLength={4}
                                        keyboardType="numeric"
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        {errors.pin && (
                            <Text style={styles.errorText}>{(errors.pin as any).message}</Text>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.botonesBotnPrincipalParent}>
                <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={handleSubmit(onSubmit)}>
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Modificar</Text>
                </TouchableOpacity>
            </View>
            <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Datos Actualizados"}  />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Se ha producido un error"} />}
            </DialogNotificationComponent>
        </View>
    );


}

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
export default GtvDatosComponent


