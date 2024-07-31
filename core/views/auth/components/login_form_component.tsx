// components/LoginComponent.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
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
import { percentHeight, percentWidth } from '../../../utils/dimensions/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { resetForm } from '../../../utils/redux/actions/invoiceActions';
import TouchID from 'react-native-touch-id'; // Import TouchID
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [credentials, setCredentials] = useState({ identification: '', password: '' });



  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getStoredCredentials = async () => {
      try {
        const storedCredentials = await AsyncStorage.getItem('credentials');
        if (storedCredentials) {
          setCredentials(JSON.parse(storedCredentials));
        }
      } catch (error) {
        console.log('Error retrieving stored credentials:', error);
      }
    };

    getStoredCredentials();
  }, []);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const onSubmit = async (data: any) => {
    setShowLoading(true);
    // Combina el dígito y la cédula para formar la identificación
    const identification = `${digit}${data.cedula}`;
    const password = data.password;
    const form = {
      identification: `${digit}${data.cedula}`,
      password: data.password
    };

    try {
      const response = await login(form);
      // Guarda las credenciales en el estado local
      setCredentials({ identification, password });

      // Guarda las credenciales en el almacenamiento local
      try {
        await AsyncStorage.setItem('credentials', JSON.stringify({ identification, password }));
      } catch (error) {
        console.log('Error al guardar las credenciales:', error);
      }
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

  const handleBiometricAuth = () => {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS
    };

    TouchID.authenticate('To access your account', optionalConfigObject)
      .then((success: any) => {

        setShowLoading(true);
        login(credentials)
          .then(response => {
            if (response.token) {
              setShowLoading(false);
              dispatch(resetForm());
              navigation.navigate("Home");
            } else {
              setShowLoading(false);
              console.log('Token failed');
            }
          })
          .catch(error => {
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('error');
          });
      })
      .catch((error: any) => {
        setShowLoading(false);
        setShowNotification(true);
        setNotificationType('error');
      });
  };

  useEffect(() => {
    // Check if biometric authentication is supported
    TouchID.isSupported()
      .then(biometryType => {
        // If supported, you could automatically prompt for biometrics here
        // or enable a button for the user to trigger biometric authentication
      })
      .catch(error => {
        console.log('Biometric authentication not supported', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {showLoading && <LoadingComponent isLoading={showLoading} />}

      <Image style={styles.capa2Icon} resizeMode="contain" source={require("../../../assets/logo_gnetwork.png")} />
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
                          placeholder="V"
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
                      maxLength={10}
                      onChange={(text) => setCredentials((prevState) => ({ ...prevState, identification: `${digit}${text}` }))}

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
                      onChange={(text) => setCredentials((prevState) => ({ ...prevState, password: `${text}` }))}
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
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iniciarSesionButton} onPress={handleSubmit(onSubmit)}>
            <Text style={[styles.iniciarSesin, styles.buttonTypo]}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.biometricsButton} onPress={handleBiometricAuth}>
            <MaterialCommunityIcons name="fingerprint" size={24} color="#fff" />
            <Text style={[styles.iniciarSesin, styles.buttonTypo]}></Text>
          </TouchableOpacity>
        </View>
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
  iniciarSesionButton: {
    backgroundColor: "#e20a17",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: "row",
    width: percentWidth(70),
    borderRadius: 8,
    alignItems: "center",
  },
  biometricsButton: {
    backgroundColor: "#e20a17",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    width: percentWidth(15),
    borderRadius: 8,
    alignItems: "center",
    marginLeft: percentWidth(4),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: percentWidth(88),
    marginTop: 32,
  },
  bienvenidoParent: {
    top: percentHeight(35),
    left: percentWidth(6),
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
    // height: "5.5%",
    width: percentWidth(51),
    top: percentHeight(23),
    right: "24.44%",
    bottom: "80%",
    left: "25.56%",
    maxWidth: "100%",
    maxHeight: "100%",
    // position: "absolute",
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
