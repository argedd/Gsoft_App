import React, { useEffect, useState } from 'react';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton, MenuItem } from '../../components/components';
import menuCilenteItems, { ClienteMenuItem } from '../../data/clienteMenuItems';
import LayoutPrimary from '../../components/layouts/layout_primary';
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../../services/auth/auth_service';
import { getData } from '../../utils/asyncStorage/asyncStorage';
import { percentWidth, percentHeight } from '../../utils/dimensions/dimensions';

type ClientViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ClientViewNavigationProp;
}

const ClientView: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = async () => {
      const dataUser = await getData('user');
      if (dataUser) {
        setUser(dataUser.client);
      }
    };
    userData();
  }, []);


  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  const renderItem = ({ item }: { item: ClienteMenuItem }) => (
    <MenuItem
      title={item.title}
      icon={item.icon}
      onPress={() => navigation.navigate(item.route as any)}
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

        <MaterialCommunityIcons name="account-circle-outline" size={percentWidth(15)} color="#fff" />

        <View style={styles.frameParent}>
          <View style={styles.gabrielaRamosWrapper}>
            <Text style={[styles.gabrielaRamos, styles.j258722635FlexBox]}>{user ? `${user.name} ${user.last_name}` : 'Cargando...'}</Text>
          </View>
          <Text style={[styles.j258722635, styles.j258722635FlexBox]}>{user ? user.identification : 'Cargando...'}</Text>
        </View>
      </LinearGradient>
      <FlatList
        data={menuCilenteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    marginVertical: percentHeight(3), // Aproximadamente 12
  },
  logoutButton: {
    borderRadius: percentWidth(4), // Aproximadamente 16
    paddingHorizontal: percentWidth(10), // Aproximadamente 40
    paddingVertical: percentHeight(2), // Aproximadamente 8
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 2,
    width: percentWidth(80), // Aproximadamente 320
    alignItems: "center",
    justifyContent: "center",

  },
  logoutButtonText: {
    color: '#fff',
    fontSize: percentWidth(4), // Aproximadamente 16
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
    width: percentWidth(10), // Aproximadamente 44
    height: percentHeight(10), // Aproximadamente 44
  },
  iconosUsuario: {
    width: percentWidth(15), // Aproximadamente 66
    height: percentWidth(15), // Aproximadamente 66
    padding: percentWidth(2), // Aproximadamente 11
  },
  gabrielaRamos: {
    fontSize: percentWidth(4), // Aproximadamente 16
    fontWeight: "600",
    fontFamily: "Roboto-Bold"
  },
  gabrielaRamosWrapper: {
    flexDirection: "row"
  },
  j258722635: {
    fontSize: percentWidth(4), // Aproximadamente 12
    fontFamily: "Roboto-Regular",
    marginTop: percentHeight(1), // Aproximadamente 6
  },
  frameParent: {
    marginLeft: percentWidth(2), // Aproximadamente 9
    paddingTop: percentHeight(5), // Aproximadamente 30
    paddingBottom: percentHeight(5), // Aproximadamente 30
  },
  iconosUsuarioParent: {
    borderRadius: percentWidth(8), // Aproximadamente 16
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 0.5,
    width: percentWidth(90),  // Ajusta el ancho al 90% del contenedor padre
    paddingHorizontal: percentWidth(2), // Aproximadamente 16
    backgroundColor: "transparent",
    marginTop: percentHeight(15), // Aproximadamente 60
    marginBottom: percentHeight(6), // Aproximadamente 80
    alignSelf: 'center'  // Centra el componente horizontalmente
  }
});

export default ClientView;
