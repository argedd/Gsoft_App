import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface CardInfoProps {
  data: any;
}

const CardInfo: React.FC<CardInfoProps> = ({ data }) => {
  return (
    <LinearGradient
      style={styles.contratos}
      locations={[0, 1]}
      colors={['rgba(255, 255, 255, 0.24)', 'rgba(153, 153, 153, 0.24)']}
    >
      <View style={styles.frameParent}>
        <View>
          <View style={styles.frameParentFlexBox}>
            <Text style={[styles.activo, styles.textTypo]}>{data.status_name}</Text>
            <View style={styles.outerIndicator}>
              <View style={styles.innerIndicator} />
            </View>
          </View>
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.frameContainer, styles.frameParentFlexBox]}>
            <View>
              <Text style={[styles.nContrato, styles.nContratoTypo]}>Nº Contrato:</Text>
              <Text style={[styles.text, styles.textTypo]}>{data.id}</Text>
            </View>
            <View style={styles.mensualidadParent}>
              <Text style={[styles.nContrato, styles.nContratoTypo]}>Mensualidad:</Text>
              <Text style={[styles.text, styles.textTypo]}>150 Bs.</Text>
            </View>
          </View>
          <View style={[styles.frameView, styles.frameParentFlexBox]}>
            <View style={styles.frameParent}>
              <Text style={[styles.nContrato, styles.nContratoTypo]}>Fecha de pago:</Text>
              <Text style={[styles.text, styles.textTypo]}>12/06</Text>
            </View>
            <View style={[styles.informacionDelCirculoDeArcParent, styles.frameParentFlexBox]}>
              <MaterialCommunityIcons name='file-search-outline' size={24} color="#fff" />
              <Text style={[styles.verDetalle, styles.nContratoTypo]}>Ver detalle</Text>
            </View>
          </View>
        </View>
      </View>
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
    alignItems: "center"
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
  mensualidadParent: {
    marginLeft: 38
  },
  frameContainer: {
    justifyContent: "center"
  },
  frameParent: {
    justifyContent: "center"
  },
  verDetalle: {
    marginLeft: 4,
    color: "#fafafa",
    fontFamily: "Roboto-Regular",
    fontSize: 12
  },
  informacionDelCirculoDeArcParent: {
    marginLeft: 25,
    justifyContent: "center"
  },
  frameView: {
    marginTop: 8,
    justifyContent: "center"
  },
  frameGroup: {
    marginTop: 24,
    justifyContent: "center"
  },
  contratos: {
    borderRadius: 16,
    borderStyle: "solid",
    borderColor: "#abaaaa",
    width: 300, // Ajuste del ancho de la tarjeta
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8, // Espaciado entre las tarjetas
  },
  outerIndicator: {
    width: 16, // Tamaño del indicador externo
    height: 16,
    borderRadius: 8, // Hace que sea circular
    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Verde con opacidad
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  innerIndicator: {
    width: 8, // Tamaño del indicador interno
    height: 8,
    borderRadius: 4, // Hace que sea circular
    backgroundColor: 'green', // Verde sólido
  },
});

export default CardInfo;
