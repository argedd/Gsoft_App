import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';

type NavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: NavigationProp;
}

const HeaderHome: React.FC<Props> = ({ navigation }) => {

  const goClientView = () => {
    navigation.navigate('Client');
  };

  return (
    <View >
      <View style={styles.itemContainer}>
        <View style={styles.titleMenu}>
          {/* <Text style={styles.itemText}>G-Network</Text>
          <MaterialCommunityIcons name='cloud-outline' size={24} color="#fff" /> */}
                  <Image style={styles.logoGnetwork1} source={require("../../../assets/logo_gnetwork.png")} />

        </View>
        <View>
          <TouchableOpacity onPress={goClientView}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.logoContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // headerContainer: {
  //   backgroundColor: '#000', // Añadir un fondo para mayor visibilidad
  //   paddingBottom: 16,
  // },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  itemText: {
    fontSize: 16,
    paddingRight: 12,
    color: "#fff",
  },
  titleMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10, // Ajustar el margen superior según sea necesario
  },
  logoGnetwork1: {
    height: 50, // Ajustar la altura según sea necesario
    width: 150, // Ajustar el ancho según sea necesario
    resizeMode: 'contain', // Asegurar que la imagen se ajuste dentro de las dimensiones
  },
});

export default HeaderHome;
