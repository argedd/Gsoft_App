import React, { useRef, useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackButton, ErrorComponent, LoadingComponent, SuccesComponent } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { Controller, useForm } from 'react-hook-form';
import DialogNotificationComponent from '../../../components/dialogs/dialogNotification';
import { percentWidth, percentHeight } from '../../../utils/dimensions/dimensions';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../../../utils/validators/user_validation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}


const ChangePasswordView: React.FC<Props> = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(passwordSchema),
        shouldUnregister: false
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const passwordRef = useRef<TextInput>(null);
    const newpasswordRef = useRef<TextInput>(null);
    const confirmRef = useRef<TextInput>(null);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const onSubmit = async (data: any) => {

    }

    const FormComponent = () => (
        <View style={styles.container}>
          <BackButton title={'Editar contraseña'} />
          <View style={styles.containeItem}>
          <View style={styles.frameParent}>
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <View style={styles.reportaTuPagoParent}>
                <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Cambio de Contraseña</Text>
                <View style={styles.formTelefonoParent}>
                    <View>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Contraseña actual</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity onPress={() => passwordRef.current?.focus()}>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <View style={[styles.contraseaParent, styles.passwordWrapperBorder]}>
                    <TextInput
                      ref={passwordRef}
                      style={[styles.password, styles.passwordTypo]}
                      placeholder="Contraseña"
                      placeholderTextColor="#fff"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{(errors.password as any).message}</Text>
                  )}
                </View>
              )}
            />
          </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Nueva Contraseña</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => confirmRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="newPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={confirmRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Ingrese Contraseña"
                                        placeholderTextColor="#fff"
                                        maxLength={30}
        
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        </View>
                        {errors.newPassword && (
                            <Text style={styles.errorText}>{(errors.newPassword as any).message}</Text>
                        )}
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Confirma la contraseña</Text>
                        <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={() => newpasswordRef.current?.focus()}>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={newpasswordRef}
                                        style={styles.text}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Confirma la contraseña ingresada"
                                        placeholderTextColor="#fff"
                                        maxLength={30}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{(errors.confirmPassword as any).message}</Text>
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
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Afiliación creada con exito"} route={"Afiliacion"} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Se ha producido un error"} />}
            </DialogNotificationComponent>
        </View>
      
        </View>
        </View>
      
      );
  return (
    <LayoutPrimary>
      <FormComponent />
    </LayoutPrimary>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },
  containeItem:{
    alignContent:'center',
    alignItems:'center',
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
    alignItems: "center",
    width:"90%"
},
frameParent: {
    width: "100%",
    alignItems: "center",
    paddingTop:percentHeight(10)
},
inputContainer: {
    marginBottom: 1,
  },
  password: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  contraseaParent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordWrapperBorder: {
    marginTop: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    flexDirection: "row",
    width: percentWidth(80),
    borderRadius: 8,
    alignItems: "center",
    height: 50, // Ensure the height is enough for easy clicking
  },
  passwordTypo: {
    fontSize: 16,
    textAlign: "left",
  },


});
export default ChangePasswordView