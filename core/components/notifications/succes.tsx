import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamListRoute } from "../../navigations/routes/app_routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { percentWidth, percentHeight } from "../../utils/dimensions/dimensions";

interface Props {
  onClose: () => void;
  message: string;
  route?: keyof RootStackParamListRoute;
}

const SuccesComponent: React.FC<Props> = ({ onClose, message, route }) => {
  type NavigationProp = StackNavigationProp<RootStackParamListRoute>;
  const navigation = useNavigation<NavigationProp>();

  const action = () => {
    onClose();
    if (route) {
      navigation.navigate(route as any);
    }
  };

  return (
    <View style={styles.frameParent}>
      <View style={styles.capa1Parent}>
        <Image
          style={styles.capa1Icon}
          resizeMode="cover"
          source={require('../../assets/icons/notificacion/succes.png')}
        />
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
    width: percentWidth(35), // Approx 130px on a 360px wide screen
    height: percentWidth(35) // Ensure the height maintains aspect ratio if needed
  },
  tuOperacinHa: {
    fontSize: percentWidth(5.6), // Approx 20px on a 360px wide screen
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#fff",
    textAlign: "center",
    width: percentWidth(68), // Approx 246px on a 360px wide screen
    marginTop: percentHeight(6.5) // Approx 48px on a 750px tall screen
  },
  capa1Parent: {
    alignItems: "center"
  },
  iniciarSesin: {
    fontSize: percentWidth(4.4), // Approx 16px on a 360px wide screen
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    textAlign: "left"
  },
  botonesBotnPrincipal: {
    borderRadius: percentWidth(2.2), // Approx 8px on a 360px wide screen
    backgroundColor: "#e20a17",
    width: percentWidth(86), // Approx 310px on a 360px wide screen
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: percentWidth(8.8), // Approx 32px on a 360px wide screen
    paddingVertical: percentHeight(1.6), // Approx 12px on a 750px tall screen
    marginTop: percentHeight(6.1), // Approx 46px on a 750px tall screen
    alignItems: "center"
  },
  frameParent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: percentHeight(26.7) // Approx 200px on a 750px tall screen
  }
});

export default SuccesComponent;
