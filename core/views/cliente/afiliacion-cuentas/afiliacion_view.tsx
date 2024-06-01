import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BackButton } from '../../../components/components';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { ResultMethods } from '../../../data/interfaces/methods_interface';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import { percentWidth, percentHeight } from '../../../utils/dimensions/dimensions';
import {  getMethods } from '../../../services/facturacion/methods_service';
import { useFocusEffect } from '@react-navigation/native';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
    navigation: ConfiguracionViewNavigationProp;
}

const AfiliacionView: React.FC<Props> = ({ navigation }) => {
    const [metodos, setMetodos] = useState<ResultMethods[]>([]);
    
    useFocusEffect(
        React.useCallback(() => {
        const fetchMethods = async () => {
            try {
                const methods = await getMethods();
                setMetodos(methods.results);
            } catch (error) {
                console.error('Error al obtener metodos del cliente:', error);
            }
        };

        fetchMethods();
    }, []));

    const ComponentNoMetodos = () => (
        <Text style={styles.aunNoTienes}>Aun no tienes cuentas afiliadas</Text>
    );

    const editMethod = (method:any) =>{
        navigation.navigate('EditarCuenta', {method: method});
    }



    const ComponentMetodos = () => (
        <View style={styles.frameParent}>
            <View style={styles.frameGroup}>
                {metodos.map((metodo, index) => (
                    <TouchableOpacity key={index} onPress={()=>editMethod(metodo)}>
                    <LinearGradient
                        key={index}
                        style={styles.iconosAfiliacionDeCuentasParent}
                        locations={[0.04, 1]}
                        colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']}
                        useAngle={true}
                        angle={180}
                    >
                        <View style={styles.iconosAfiliacionDeCuentas}>
                            <Image style={styles.vectorIcon} resizeMode="cover" source={require("../../../assets/icons/user/afiliacion-cuentas.png")} />
                        </View>
                        <View style={styles.frameContainer}>
                            <Text style={[styles.gabrielaRamos, styles.iniciarSesinFlexBox]}>{metodo.name}</Text>
                            <Text style={[styles.metodoPagoMvil, styles.iniciarSesinFlexBox]}>Metodo: {metodo.method_name}</Text>
                        </View>
                    </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const AfiliacionComponent = () => (
        <ScrollView style={styles.container}>
            <BackButton title={'Afiliación de cuentas'} />
            <View style={styles.containerItem}>
                {metodos.length > 0 ? <ComponentMetodos /> : <ComponentNoMetodos />}
            </View>
        </ScrollView>
    );

    return (
        <LayoutPrimary>
            <AfiliacionComponent />
            <TouchableOpacity style={styles.botonesBotnPrincipal} onPress={() => navigation.navigate("RegistrarCuenta")}>
                <Text style={styles.iniciarSesin}>Afiliar nueva cuenta</Text>
            </TouchableOpacity>
        </LayoutPrimary>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iniciarSesin: {
fontFamily: "Inter-SemiBold",
fontWeight: "600",
fontSize: 16,
color: "#fafafa"
},
    aunNoTienes: {
        fontSize: percentWidth(6),
        fontWeight: "600",
        fontFamily: "Roboto-Bold",
        color: "#fafafa",
        textAlign: "center",
        width: percentWidth(60),
        marginVertical: percentHeight(20),
    },
    frameWrapperFlexBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    iniciarSesinFlexBox: {
        textAlign: "left",
        color: "#fafafa",
    },
    vectorIcon: {
        width: percentWidth(10),
        height: percentWidth(10),
    },
    iconosAfiliacionDeCuentas: {
        width: percentWidth(16),
        height: percentWidth(16),
        justifyContent: "center",
        alignItems: "center",
    },
    gabrielaRamos: {
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        fontSize: percentWidth(4),
        color: "#fafafa",
    },
    metodoPagoMvil: {
        fontSize: percentWidth(3),
        fontFamily: "Roboto-Regular",
        marginTop: percentHeight(1),
    },
    frameContainer: {
        marginLeft: percentWidth(2),
        justifyContent: "center",
    },
    iconosAfiliacionDeCuentasParent: {
        paddingHorizontal: percentWidth(4),
        backgroundColor: "transparent",
        paddingVertical: percentHeight(2),
        borderWidth: 0.4,
        borderColor: "#fafafa",
        flexDirection: "row",
        width: percentWidth(90),
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: percentHeight(1),
        borderRadius:8
    },
    botonesBotnPrincipal: {
        position: 'absolute',
        bottom: percentHeight(4),
        alignSelf: 'center',
        backgroundColor: "#e20a17",
        paddingHorizontal: percentWidth(8),
        paddingVertical: percentHeight(1.5),
        flexDirection: "row",
        width: percentWidth(80),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: percentWidth(2),
    },
    frameParent: {
        width: "100%",
        alignItems: 'center',
    },
    frameGroup: {
        width: "100%",
        alignItems: 'center',
    },
});

export default AfiliacionView;
