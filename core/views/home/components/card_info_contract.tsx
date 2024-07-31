import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamListRoute } from "../../../navigations/routes/app_routes";
import { useNavigation } from "@react-navigation/native";
import { percentWidth } from "../../../utils/dimensions/dimensions";

interface CardInfoProps {
  data: any;
}
type NavigationProp = StackNavigationProp<RootStackParamListRoute, 'Contract'>;
// Función para obtener la imagen según el estado
const getStatusImage = (status: number) => {
  switch (status) {
    case 16:
      return require("../../../assets/icons/status/activo.png");
    case 18:
      return require("../../../assets/icons/status/porInstalar.png");
    case 19:
      return require("../../../assets/icons/status/suspendido.png");
    case 20:
      return require("../../../assets/icons/status/pausado.png");
    case 35:
      return require("../../../assets/icons/status/retirado.png");
    case 34:
      return require("../../../assets/icons/status/suspendido.png");
    // Agrega más casos según los estados que manejes
  }
};

const CardInfo: React.FC<CardInfoProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp>(); // Use the correct type here
  const handlePress = () => {
    navigation.navigate("Contract");
  };

  return (
    <LinearGradient
      style={styles.contratos}
      locations={[0, 1]}
      colors={['rgba(255, 255, 255, 0.24)', 'rgba(153, 153, 153, 0.24)']}
    >
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.frameParentFlexBox}>
          <Text style={[styles.activo, styles.textTypo]}>{data.status_name}</Text>
          <Image source={getStatusImage(data.status)} style={styles.indicatorImage} />
        </View>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={[styles.nContrato, styles.nContratoTypo]}>Nº Contrato:</Text>
            <Text style={[styles.text, styles.textTypo]}>{data.id}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={[styles.nContrato, styles.nContratoTypo]}>Deuda:</Text>
            <Text style={[styles.text, styles.textTypo]}>{data.debt} USD</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={[styles.nContrato, styles.nContratoTypo]}>Fecha de pago:</Text>
            <Text style={[styles.text, styles.textTypo]}>{data.invoice_date_cicle}</Text>
          </View>
          <View style={[styles.gridItem, styles.gridItemFlexBox]}>
            <MaterialCommunityIcons name='file-search-outline' size={24} color="#fff" />
            <Text style={[styles.verDetalle, styles.nContratoTypo]}>Ver detalle</Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    fontFamily: "Roboto-Bold",
    fontWeight: "600",
    color: "#fafafa"
  },
  frameParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  nContratoTypo: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    textAlign: "left"
  },
  activo: {
    fontSize: 21
  },
  nContrato: {
    color: "#90908f"
  },
  text: {
    fontSize: 16,
    marginTop: 10
  },
  gridContainer: {
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 16,
  },
  gridItemFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  verDetalle: {
    marginLeft: 4,
    color: "#fafafa",
    fontFamily: "Roboto-Regular",
    fontSize: 12
  },
  contratos: {
    borderRadius: 16,
    borderStyle: "solid",
    borderColor: "#abaaaa",
    width: percentWidth(90), // Ajuste del ancho de la tarjeta
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8, // Espaciado entre las tarjetas
  },
  indicatorImage: {
    width: 16, // Ajuste del tamaño de la imagen
    height: 16,
    marginLeft: 10,
  },
});

export default CardInfo;
