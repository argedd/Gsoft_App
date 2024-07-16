import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { percentHeight, percentWidth } from '../../utils/dimensions/dimensions';
import LayoutPrimary from '../../components/layouts/layout_primary';
import { BackButton } from '../../components/components';
import preguntasData from '../../data/preguntasData';



const PreguntasView = () => {
    const [time, setTime] = useState<any[]>([]);
    const [activeCollapse, setActiveCollapse] = useState<number | null>(null);



    const toggleCollapse = (index: number) => {
        setActiveCollapse(activeCollapse === index ? null : index);
    };

    const PreguntasComponent = () => (
        <View style={styles.containerItem}>
            <View style={styles.lineaDeTiempoParent}>
                {preguntasData.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.instanceParent}
                            onPress={() => toggleCollapse(index)}
                        >
                            <View style={[styles.instanceGroup, styles.instanceFlexBox]}>
                                <View style={[styles.numerosParent, styles.numerosParentFlexBox]}>
                                    <View style={[styles.numeros, activeCollapse === index && styles.numerosActive]}>
                                        <Text style={[styles.text, styles.textTypo, activeCollapse === index && styles.textActive]}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <Text style={[styles.text1, styles.textTypo, styles.fecha]}>
                                        {item.pregunta}
                                    </Text>
                                </View>
                                <Icon
                                    style={styles.arrowIcon}
                                    name={activeCollapse === index ? 'keyboard-arrow-down' : 'chevron-right'}
                                    size={28}
                                    color="#fff"
                                />
                            </View>
                        </TouchableOpacity>
                        {activeCollapse === index && (
                            <View style={styles.formUsuario}>
                                <View style={[styles.ticketCreadoDesdeElPortalWrapper, styles.numerosParentFlexBox]}>
                                    <Text style={styles.ticketCreadoDesde}>{item.respuesta}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <LayoutPrimary>
            <BackButton title={'Preguntas Frecuentes'} />
            <ScrollView>
                <PreguntasComponent />
            </ScrollView>
        </LayoutPrimary>
    );
};



const styles = StyleSheet.create({



    textActive: {
        color: '#fff', // Texto blanco cuando el collapse está activo
    },
    text1Clr: {
        color: "#fafafa",
        textAlign: "left",
    },

    numerosParentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    textTypo: {
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        fontSize: 16,
    },
    lineaDeTiempo: {
        fontSize: 12,
        textAlign: "left",
        fontFamily: "Roboto-Regular",
    },
    text: {
        textAlign: "center",
        color: "#fff",
    },

    text1: {
        textAlign: "left",
        color: "#fafafa",
    },


    detalle: {
        fontSize: 14,
        color: "#fff",
        textAlign: "left",
        fontFamily: "Roboto-Regular",
    },
    ticketCreadoDesde: {
        color: "#fff",
        fontSize: 16,
        textAlign: "left",
        fontFamily: "Roboto-Regular",
    },

    instanceGroup: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between", // Alinea los elementos a lo largo del eje principal (horizontalmente)
    },


    containerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: percentHeight(8), // Utilizo la función para porcentaje de altura
    },

    numeros: {
        borderRadius: percentWidth(8), // Ajustado en función del ancho
        backgroundColor: "#90908f",
        width: percentWidth(12), // Ajustado en función del ancho
        height: percentWidth(12), // Ajustado en función del ancho
        justifyContent: "center",
        padding: percentWidth(2), // Ajustado en función del ancho
        alignItems: "center",
    },
    numerosActive: {
        backgroundColor: '#e20a17', // Rojo cuando el collapse está activo
    },

    instanceFlexBox: {
        overflow: "hidden",
        alignItems: "center",
        height: percentHeight(6), // Ajustado en función de la altura
    },
    arrowIcon: {
        width: percentWidth(7), // Ajustado en función del ancho
        height: percentWidth(7), // Ajustado en función del ancho
        marginLeft: percentWidth(2), // Ajustado en función del ancho
    },
    numerosParent: {
        width: '90%',
        justifyContent: "space-between",
        alignItems: "center",
    },
    ticketCreadoDesdeElPortalWrapper: {
        borderRadius: percentWidth(3), // Ajustado en función del ancho
        borderStyle: "solid",
        borderColor: "#fafafa",
        borderWidth: 0.5,
        width: percentWidth(80), // Ajustado en función del ancho
        paddingHorizontal: percentWidth(4), // Ajustado en función del ancho
        paddingVertical: percentWidth(3), // Ajustado en función del ancho
        marginTop: percentHeight(1.5), // Ajustado en función de la altura
    },
    formUsuario: {
        marginTop: percentHeight(3), // Ajustado en función de la altura
    },
    instanceParent: {
        marginTop: percentHeight(6), // Ajustado en función de la altura
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lineaDeTiempoParent: {
        width: percentWidth(90), // Ajustado en función del ancho
    },
    fecha: {
        flex: 1, // Hace que el texto de la fecha ocupe todo el espacio disponible
        textAlign: "center", // Centra el texto horizontalmente
    },

});

export default PreguntasView;
