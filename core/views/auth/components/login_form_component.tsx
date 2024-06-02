// components/LoginComponent.tsx
import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loginSchema } from '../../../utils/validators/validations_forms';
import { login } from '../../../services/auth/auth_service';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LoadingComponent from '../../../components/loading/loading';
import { DialogComponent, ErrorComponent } from '../../../components/components';
import DialogRecuperar from './dialog_recuperar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/store';
import DialogNotificationComponent from '../../../components/dialogs/dialogNotification';
import CardCedula from './card_cedula';
import { percentWidth } from '../../../utils/dimensions/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { resetForm } from '../../../utils/redux/actions/invoiceActions';

type NavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: NavigationProp;
}

const LoginComponent: React.FC<Props> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [showModalRecuperar, setShowModalRecuperar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
  const [showDialog, setShowDialog] = useState(false);
  const digit = useSelector((state: RootState) => state.formState.digit);
  const cedulaRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const onSubmit = async (data: any) => {
    setShowLoading(true);
    const form = {
      identification: `${digit}${data.cedula}`,
      password: data.password
    };

    try {
      const response = await login(form);

      if (response.token) {
        setShowLoading(false);
        dispatch(resetForm());
        navigation.navigate("Home");
      } else {
        setShowLoading(false);

        console.log('Token failed');
      }
    } catch (error) {
      setShowLoading(false);
      setShowNotification(true);
      setNotificationType('error');
    }
  };

  return (
    <View style={styles.container}>
      {showLoading && <LoadingComponent isLoading={showLoading} />}
 
      <Image style={styles.capa2Icon} resizeMode="cover" source={require("../../../assets/logo_gnetwork.png")} />
      <View style={styles.bienvenidoParent}>
        <Text style={[styles.bienvenido, styles.bienvenidoClr]}>Bienvenido</Text>
        <View style={styles.frameParent}>
          <View>
            <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
              <TouchableOpacity onPress={toggleDialog}>
                <View style={[styles.parent, styles.wrapperBorder]}>
                  <Controller
                    control={control}
                    name="digito"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <TextInput
                          style={styles.text}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={digit}
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
              
              <TouchableOpacity style={[styles.wrapper, styles.wrapperBorder]} onPress={() => cedulaRef.current?.focus()}>
                <Controller
                  control={control}
                  name="cedula"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      ref={cedulaRef}
                      style={styles.text}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="*******"
                      placeholderTextColor="#fff"
                      keyboardType="numeric"
                      maxLength={8}
                    />
                  )}
                />
              </TouchableOpacity>
            </View>
            {errors.cedula && (
              <Text style={styles.errorText}>{(errors.cedula as any).message}</Text>
            )}
          </View>
          
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
        <TouchableOpacity style={styles.iniciarSesinWrapper} onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.iniciarSesin, styles.buttonTypo]}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonesBotnSegundario} onPress={() => setShowModalRecuperar(true)}>
          <Text style={styles.iniciarSesin}>Nuevo usuario / olvide contraseña</Text>
        </TouchableOpacity>
      </View>
      <DialogComponent visible={showModalRecuperar} onClose={() => setShowModalRecuperar(false)}>
        <DialogRecuperar onClose={() => setShowModalRecuperar(false)} />
      </DialogComponent>
      <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
        {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Usuario y/o clave Invalida"} />}
      </DialogNotificationComponent>
      <DialogComponent visible={showDialog} onClose={toggleDialog}>
        <CardCedula onClose={() => setShowDialog(false)} />
      </DialogComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frameGroup: {
    flexDirection: "row",
  },
  frameGroupSpaceBlock: {
    width: percentWidth(88),
  },
  wrapperBorder: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#fafafa",
    flexDirection: "row",
    paddingHorizontal: percentWidth(4),
    borderStyle: "solid",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#fff",
  },
  parent: {
    width: percentWidth(23),
  },
  wrapper: {
    marginLeft: percentWidth(1),
    flex: 1,
  },
  bienvenidoClr: {
    color: "#fafafa",
    fontWeight: "600",
  },
  passwordTypo: {
    fontSize: 16,
    textAlign: "left",
  },
  buttonTypo: {
    fontSize: 16,
    textAlign: "center",
  },
  passwordWrapperBorder: {
    marginTop: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    flexDirection: "row",
    width: percentWidth(88),
    borderRadius: 8,
    alignItems: "center",
    height: 50, // Ensure the height is enough for easy clicking
  },
  bienvenido: {
    fontSize: 26,
    fontFamily: "Roboto-Bold",
    textAlign: "left",
  },
  password: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  contraseaParent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  frameParent: {
    marginTop: 32,
  },
  iniciarSesin: {
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    fontWeight: "600",
  },
  iniciarSesinWrapper: {
    backgroundColor: "#e20a17",
    justifyContent: "center",
    paddingHorizontal: 32,
    marginTop: 32,
    paddingVertical: 12,
    flexDirection: "row",
    width: percentWidth(88),
    borderRadius: 8,
    alignItems: "center",
  },
  bienvenidoParent: {
    marginLeft: -160,
    top: 300,
    left: "50%",
    alignItems: "center",
    position: "absolute",
  },
  inputContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  capa2Icon: {
    height: "5.5%",
    width: "51%",
    top: "20.33%",
    right: "24.44%",
    bottom: "80%",
    left: "25.56%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  botonesBotnSegundario: {
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 2,
    width: percentWidth(88),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 20,
  },
});

export default LoginComponent;
