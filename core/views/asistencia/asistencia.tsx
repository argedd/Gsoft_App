import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../components/components';
import LayoutPrimary from '../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
    navigation: ConfiguracionViewNavigationProp;
}

const AsistenciaComponent = ({ navigation }: Props) => (
    <View style={styles.container}>
        <BackButton title={'Asistencia'} />
        <TouchableOpacity style={styles.itemContainer} onPress={() =>
            Linking.openURL(
                `https://wa.me/+584124630302`
            )
        }>
            <View style={styles.titleMenu}>
                <Image source={require("../../assets/icons/asistencia/ejecutivo.png")} style={styles.icon} resizeMode="contain" />
                <Text style={styles.itemText}>Chatear con un ejecutivo</Text>
            </View>
            <View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={() =>
            Linking.openURL(
                `https://wa.me/+584124630278`
            )
        }>
            <View style={styles.titleMenu}>
                <Image source={require("../../assets/icons/home/asistencia.png")} style={styles.icon} resizeMode="contain" />
                <Text style={styles.itemText}>Chatear con asistente Virtual</Text>
            </View>
            <View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("Preguntas")} >
            <View style={styles.titleMenu}>
                <Image source={require("../../assets/icons/asistencia/preguntas.png")} style={styles.icon} resizeMode="contain" />
                <Text style={styles.itemText}>Preguntas Frecuentes</Text>
            </View>
            <View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
            </View>
        </TouchableOpacity>
    </View>
);

const AsistenciaView: React.FC<Props> = ({ navigation }) => {
    return (
        <LayoutPrimary>
            <AsistenciaComponent navigation={navigation} />
        </LayoutPrimary>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    itemText: {
        fontSize: 16,
        paddingLeft: 12,
        color: "#fff"
    },
    titleMenu: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 26,
        height: 26,
        tintColor: '#fff',
    },
});

export default AsistenciaView;
