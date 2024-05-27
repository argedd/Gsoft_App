import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ResultInvoices } from "../../../data/interfaces/invoices_interface";

interface Props {
  invoices: ResultInvoices[];
}

const ListInvoices: React.FC<Props> = ({ invoices }) => {
  // Función para renderizar cada elemento de la lista de facturas
  const renderInvoiceItem = ({ item }: { item: ResultInvoices }) => (
    <TouchableOpacity style={styles.frameFlexBox} onPress={() => console.log(item.id)}>
      <View>
        <Text style={[styles.planPlatino, styles.abril10Typo]}>{item.id} : {item.status_name}</Text>
        <Text style={[styles.abril10, styles.abril10Typo]}>{item.date_emission}</Text>
      </View>
      <Text style={[styles.bs, styles.bsFlexBox]}>{item.amount} USD</Text>
      <View style={styles.botonesFlexBox}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
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
});

export default ListInvoices;
