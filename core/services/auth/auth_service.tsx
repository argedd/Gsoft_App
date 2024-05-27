import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const gsoftAuthAPI = axios.create({
  baseURL: "https://core.gsoft.app/portal",
});

export const login = async (data: any) => {
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
    await AsyncStorage.clear();
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return response.data;
 
  } catch (error) {
    // console.error('Error al iniciar sesión:', error);
    // Manejar errores de inicio de sesión
    await AsyncStorage.clear();
  }
};
