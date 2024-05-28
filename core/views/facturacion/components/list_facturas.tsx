import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image, GestureResponderEvent } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ResultInvoices } from "../../../data/interfaces/invoices_interface";

interface Props {
  invoices: ResultInvoices[];
}

const ListInvoices: React.FC<Props> = ({ invoices }) => {

  const handleDescargar = async (invoice:number) => {
   
  };

  const handlePay = async (invoice:number) => {
   console.log('====================================');
   console.log(invoice);
   console.log('====================================');
  };

  const renderInvoiceItem = ({ item }: { item: ResultInvoices }) => (
    
    <TouchableOpacity style={styles.frameFlexBox} onPress={()=>item.status ==22 ? handleDescargar(item.id):handlePay( item.id)}>

      <View>
        <Text style={[styles.planPlatino, styles.abril10Typo]}>N°{item.id}</Text>
        <Text style={[styles.abril10, styles.abril10Typo]}>{item.date_emission}</Text>
      </View>
      <Text style={[styles.bs, styles.bsFlexBox]}>{item.amount} USD</Text>
      <Text style={[styles.bs, item.status == 22 ? styles.pagado : styles.other]}>{item.status_name}</Text>

      <View style={styles.botonesFlexBox}>
        {item.status == 23 ?(<MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />)
        :(<Image source={require('../../../assets/icons/facturacion/descargar.png')} style={styles.icon} />)}

      </View>
    </TouchableOpacity>
  );

  // Función para agrupar las facturas por ciclo de mayor a menor
  const groupInvoicesByCicle = (invoices: ResultInvoices[]) => {
    const groupedInvoices: { [key: string]: ResultInvoices[] } = {};

    invoices.forEach((invoice) => {
      const cicle = invoice.cicle.toString();
      if (!groupedInvoices[cicle]) {
        groupedInvoices[cicle] = [];
      }
      groupedInvoices[cicle].push(invoice);
    });

    return Object.keys(groupedInvoices)
      .sort((a, b) => parseInt(b) - parseInt(a)) // Ordenar ciclos de mayor a menor
      .reduce((obj, key) => {
        obj[key] = groupedInvoices[key];
        return obj;
      }, {} as { [key: string]: ResultInvoices[] });
  };

  // Agrupar las facturas por ciclo de mayor a menor
  const groupedInvoices = groupInvoicesByCicle(invoices);

  // Función para renderizar cada ciclo y sus facturas
  const renderInvoiceCicle = (cicle: string) => (
    <View key={`cicle_${cicle}`}>
      <Text style={styles.yearText}>{cicle}</Text>
      {groupedInvoices[cicle].map((invoice) => (
        <View key={`invoice_${invoice.id}`}>
          {renderInvoiceItem({ item: invoice })}
        </View>
      ))}
    </View>
  );

  // Obtener las claves de los ciclos en orden de mayor a menor
  const invoiceCycles = Object.keys(groupedInvoices).reverse();

  return (
    <FlatList
      data={invoiceCycles}
      renderItem={({ item }) => renderInvoiceCicle(item)}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  pagado: {
    color: '#45CC23',
  },
  other: {
    color: '#FF414D',
  },
  bsFlexBox: {
    textAlign: "left",
    color: "#fafafa"
  },
  abril10Typo: {
    fontFamily: "Roboto-Regular",
    textAlign: "left"
  },
  frameFlexBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: '90%', // Ajusta el ancho al 90% del padre para permitir margen
    backgroundColor: "rgba(255, 255, 255, 0.31)",
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: '5%', // Agrega margen a los lados
  },
  text: {
    fontSize: 21,
    fontWeight: "600",
    fontFamily: "Roboto-Bold"
  },
  planPlatino: {
    fontSize: 16,
    color: "#fafafa",
    fontFamily: "Roboto-Regular"
  },
  abril10: {
    fontSize: 12,
    color: "#90908f",
    marginTop: 8
  },
  bs: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto-Medium"
  },
  botonesFlexBox: {
    paddingVertical: 16,
    paddingHorizontal: 5,
    justifyContent: "center",
    height: 53,
    alignItems: "center",
    flexDirection: "row"
  },
  frameContainer: {
    marginTop: 6
  },
  frameParent: {
    marginTop: 13,
    alignItems: 'center', // Centra los hijos horizontalmente
  },
  parent: {
    width: "100%",
    alignItems: 'center', // Centra los contenidos del padre
  },
  container: {
    paddingBottom: 20,
    paddingTop: 10
  },
  yearText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft:20,
    color: "#fafafa", // Color blanco
    textAlign: "left", // Alineado a la izquierda
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#fff', // Si deseas cambiar el color de la imagen
  },
});

export default ListInvoices;


