import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { percentHeight, percentWidth } from '../../../../utils/dimensions/dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';



const InfoTrfComponent = () => {

  const invoice = useSelector((state: RootState) => state.invoiceState.data);
  const amountBs = useSelector((state: RootState) => state.invoiceState.amountBs);
  const bankAssociated = invoice.contract.bank_associated;


  return (
        <View>
             <Text style={[styles.datosDelPago, styles.textTypo]}>Datos de Transferencia</Text>
          <View style={styles.frameGroup}>
           
            <View style={styles.nDeRifParent}>
              <Text style={[styles.nDeTelefono, styles.bsTypo]}>Nº de RIF:</Text>
              <Text style={[styles.text, styles.textTypo]}>J-500564015</Text>
            </View>
            <View style={styles.bankParent}>
              <Text style={[styles.nDeTelefono, styles.bsTypo]}>Banco:</Text>
              <Text style={[styles.text, styles.textTypo]}> {bankAssociated.bank_name}</Text>
            </View>
            <View style={styles.bankParent}>
              <Text style={[styles.nDeTelefono, styles.bsTypo]}>Nº de Cuenta:</Text>
              <Text style={[styles.text, styles.textTypo]}>{bankAssociated.nro_cta} </Text>
            </View>
          </View>
          <View style={styles.frameGroup}>
            <Text style={[styles.datosDelPago, styles.textTypo]}>Monto a pagar</Text>
            <Text style={[styles.bs, styles.bsTypo]}>{amountBs.toFixed(2)} Bs</Text>
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

export default InfoTrfComponent;
