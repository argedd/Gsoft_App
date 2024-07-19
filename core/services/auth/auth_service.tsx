import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeData } from '../../utils/asyncStorage/asyncStorage';

const gsoftAuthAPI = axios.create({
  baseURL: "https://core.gsoft.app/portal",
  // baseURL: "http://192.168.196.251:9000/portal",
  // baseURL: "http://192.168.196.206:8001/portal",
});

 const login = async (data: any) => {
  try {
    // Realizar la solicitud de inicio de sesión
  
    
    const response = await gsoftAuthAPI.post('/login/', data);




    // Obtener el token JWT del cuerpo de la respuesta
    const { token } = response.data;
    const { client } = response.data;
    
    const user ={
        token: token,
        client: client
    }
    // Guardar el token en AsyncStorage para su persistencia
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return response.data;
 
  } catch (error) {
    // console.error('Error al iniciar sesión:', error);
    // Manejar errores de inicio de sesión
    await removeData('user');  }
};

const recoveryPassword = async (data: any) => {
  try {
    // Realizar la solicitud de inicio de sesión  
    const response = await gsoftAuthAPI.post('/forgot_password/', data);

    return response.data;
 
  } catch (error) {

  }
};

const logout = async () => {
  try {
    // Realizar la solicitud de inicio de sesión  
    await removeData('user');

    return 'Exit';
 
  } catch (error) {

  }
};

export {
  login,
  recoveryPassword,
  logout
}
