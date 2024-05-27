import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value); // Convertir el objeto a cadena JSON
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error al guardar los datos:', e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value); // Convertir la cadena JSON a objeto
    }
  } catch (e) {
    console.log('Error al obtener los datos:', e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error al eliminar los datos:', e);
  }
};
