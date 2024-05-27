// components/LoginComponent.tsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loginSchema } from '../../../utils/validators/validations_forms';
import {Picker} from '@react-native-picker/picker';
import { login } from '../../../services/auth/auth_service';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';


type NavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: NavigationProp;
}

const LoginComponent: React.FC<Props> = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit =  (data: any) => {
    const form ={
        identification:`${data.tipoDocumento}${data.cedula}`,
        password: data.password
    }
    
    const responseLogin = login(form);
    responseLogin.then(resp=>{
        if (resp.token) {
            navigation.navigate("Home");
        }
    }).catch(err=>{
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.capa2Icon} resizeMode="cover" source={require("../../../assets/logo_gnetwork.png")} />
      <View style={styles.bienvenidoParent}>
        <Text style={[styles.bienvenido, styles.bienvenidoClr]}>Bienvenido</Text>
        <View style={styles.frameParent}>
        <View style={styles.inputContainer}>
            <View style={styles.row}>
        <Controller
                control={control}
                name="tipoDocumento"
                defaultValue="V"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={value}
                      style={styles.picker}
                      onValueChange={(itemValue) => onChange(itemValue)}
                    >
                      <Picker.Item label="V" value="V" />
                      <Picker.Item label="E" value="E" />
                      <Picker.Item label="J" value="J" />
                      <Picker.Item label="G" value="G" />
                      <Picker.Item label="P" value="P" />
                    </Picker>
                  </View>
                )}
              />
          <Controller
            control={control}
            name="cedula"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
                
              <View style={styles.inputContainer}>
                <View style={styles.usuarioWrapperBorder}>
                  <TextInput
                    style={[styles.usuario1, styles.usuario1Typo]}
                    placeholder="Cédula"
                    placeholderTextColor="#fff"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                  />
                </View>
               
              </View>
              
            )}
          />
          
          </View>
          {errors.cedula && (
                  <Text style={styles.errorText}>{(errors.cedula as any).message}</Text>
                )}
          </View>

          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <View style={[styles.contraseaParent, styles.passwordWrapperBorder]}>
                  <TextInput
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
        </View>
        <TouchableOpacity style={styles.iniciarSesinWrapper} onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.iniciarSesin, styles.buttonTypo]}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bienvenidoClr: {
    color: "#fafafa",
    fontWeight: "600"
  },
  usuarioClr: {
    color: "#fff",
    fontFamily: "Roboto-Regular"
  },
  usuario1Typo: {
    fontSize: 16,
    textAlign: "left"
  },
  passwordTypo: {
    fontSize: 16,
    textAlign: "left"
  },
  buttonTypo: {
    fontSize: 16,
    textAlign: "center"
  },
  usuarioWrapperBorder: {
    marginTop: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    flexDirection: "row",
    width: 220,
    borderRadius: 8,
    alignItems: "center",
    // Ensure the height is enough for easy clicking
    height: 50
  },
  passwordWrapperBorder: {
    marginTop: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    flexDirection: "row",
    width: 320,
    borderRadius: 8,
    alignItems: "center",
    // Ensure the height is enough for easy clicking
    height: 50
  },
  bienvenido: {
    fontSize: 26,
    fontFamily: "Roboto-Bold",
    textAlign: "left"
  },
  usuario: {
    fontSize: 14,
    textAlign: "left"
  },
  usuario1: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    // Ensure the input takes up full width and is clickable
    
  },
  password: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    // Ensure the input takes up full width and is clickable
    
  },
  contraseaParent: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  frameParent: {
    marginTop: 32
  },
  iniciarSesin: {
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    fontWeight: "600"
  },
  iniciarSesinWrapper: {
    backgroundColor: "#e20a17",
    justifyContent: "center",
    paddingHorizontal: 32,
    marginTop: 32,
    paddingVertical: 12,
    flexDirection: "row",
    width: 320,
    borderRadius: 8,
    alignItems: "center"
  },
  bienvenidoParent: {
    marginLeft: -160,
    top: 360,
    left: "50%",
    alignItems: "center",
    position: "absolute"
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
    overflow: "hidden"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginRight: 8,
    marginBottom:8,
  },
  picker: {
    color: "#fff",
    width: 90,
  },
});

export default LoginComponent;
