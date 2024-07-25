import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { percentHeight, percentWidth } from '../../../../utils/dimensions/dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';



const InfoZelleComponent = () => {

  const amount = useSelector((state: RootState) => state.invoiceState.amount);
  
  return (
        <View>
             <Text style={[styles.datosDelPago, styles.textTypo]}>Datos del Zelle</Text>
          <View style={styles.frameGroup}>
            <View style={styles.nDeTelefonoParent}>
              <Text style={[styles.nDeTelefono, styles.bsTypo]}>Titular:</Text>
              <Text style={[styles.text, styles.textTypo]}>gnetworkve1@gmail.com</Text>
            </View>
          </View>
          <View style={styles.frameGroup}>
            <Text style={[styles.datosDelPago, styles.textTypo]}>Monto a pagar</Text>
            <Text style={[styles.bs, styles.bsTypo]}>{amount.toFixed(2)} USD</Text>
          </View>
        </View>
       
    
  );
}

const styles = StyleSheet.create({
 
 

  textTypo: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    textAlign: "center"
  },
  bsTypo: {
    fontFamily: "Roboto-Regular",
    textAlign: "left"
  },
  datosDelPago: {
    color: "#fff",
    fontSize: percentWidth(4), 
    textAlign: "center"
  },
  nDeTelefono: {
    color: "#abaaaa",
    fontSize: percentWidth(4) 
  },
  text: {
    fontSize: percentWidth(3.75), 
    marginTop: percentHeight(0.6), 
    textAlign: "left",
    color: "#fafafa"
  },
  nDeTelefonoParent: {
    alignItems: "center"
  },
  nDeRifParent: {
    alignItems: "center"
  },
  bankParent: {
    marginTop: percentHeight(1), 
    alignItems: "center"
  },
  frameGroup: {
    marginTop: percentHeight(2), 
    alignItems: "center"
  },
  bs: {
    fontSize: percentWidth(6), 
    marginTop: percentHeight(1.25), 
    color: "#fafafa"
  },

});

export default InfoZelleComponent;
