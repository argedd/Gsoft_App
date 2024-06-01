import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamListRoute } from "../../navigations/routes/app_routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface Props {
  onClose: () => void;
  message: string;
  route: keyof RootStackParamListRoute;
}

const SuccesComponent: React.FC<Props> = ({ onClose, message, route }) => {
  type NavigationProp = StackNavigationProp<RootStackParamListRoute>;
  const navigation = useNavigation<NavigationProp>();

  const action = () => {
    onClose();
    navigation.navigate(route as any); 
  };

  return (
    <View style={styles.frameParent}>
      <View style={styles.capa1Parent}>
        <Image style={styles.capa1Icon} resizeMode="cover" source={require('../../assets/icons/notificacion/succes.png')} />
        <Text style={styles.tuOperacinHa}>{message}</Text>
      </View>
      <TouchableOpacity style={styles.botonesBotnPrincipal} onPress={action}>
        <Text style={styles.iniciarSesin}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  capa1Icon: {
    width: 130,
    height: 130
  },
  tuOperacinHa: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#fff",
    textAlign: "center",
    width: 246,
    marginTop: 48
  },
  capa1Parent: {
    alignItems: "center"
  },
  iniciarSesin: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    textAlign: "left"
  },
  botonesBotnPrincipal: {
    borderRadius: 8,
    backgroundColor: "#e20a17",
    width: 310,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 46,
    alignItems: "center"
  },
  frameParent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200
  }
});

export default SuccesComponent;
