import React from 'react';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton, MenuItem } from '../../components/components';
import menuCilenteItems, { ClienteMenuItem } from '../../data/clienteMenuItems';
import LayoutPrimary from '../../components/layouts/layout_primary';
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ClientViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ClientViewNavigationProp;
}

const renderItem = ({ item }: { item: ClienteMenuItem }) => (
  <MenuItem
    title={item.title}
    icon={item.icon}
    onPress={() => console.log(`${item.title} pressed`)}
  />
);

const ClientComponent = () => (
  <View style={styles.container}>
    <BackButton title={'Mi Cuenta'} />
    <LinearGradient
      style={[styles.iconosUsuarioParent, styles.iconosFlexBox]}
      locations={[0.04, 1]}
      colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']}
      useAngle={true}
      angle={180}
    >
     
      <MaterialCommunityIcons name="account-circle-outline" size={60} color="#fff" />

      <View style={styles.frameParent}>
        <View style={styles.gabrielaRamosWrapper}>
          <Text style={[styles.gabrielaRamos, styles.j258722635FlexBox]}>Gabriela Ramos</Text>
        </View>
        <Text style={[styles.j258722635, styles.j258722635FlexBox]}>J- 25872263-5</Text>
      </View>
    </LinearGradient>
    <FlatList
      data={menuCilenteItems}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
    <View style={styles.logoutContainer}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logout pressed')}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ClientView: React.FC<Props> = ({ navigation }) => {
  return (
    <LayoutPrimary>
      <ClientComponent />
    </LayoutPrimary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    alignItems: 'center',  // Centra el contenido horizontalmente
    marginVertical: 30,
  },
  logoutButton: {
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",

  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconosFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  j258722635FlexBox: {
    textAlign: "left",
    color: "#fafafa"
  },
  vectorIcon: {
    width: 44,
    height: 44
  },
  iconosUsuario: {
    width: 66,
    height: 66,
    padding: 11
  },
  gabrielaRamos: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold"
  },
  gabrielaRamosWrapper: {
    flexDirection: "row"
  },
  j258722635: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    marginTop: 6
  },
  frameParent: {
    marginLeft: 9,
    paddingTop:30,
    paddingBottom:30,
  },
  iconosUsuarioParent: {
    borderRadius: 16,
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 0.5,
    width: '90%',  // Ajusta el ancho al 90% del contenedor padre
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "transparent",
    marginTop: 60,
    marginBottom: 80,
    alignSelf: 'center'  // Centra el componente horizontalmente
  }
});

export default ClientView;
