import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { percentWidth, percentHeight } from "../../../../utils/dimensions/dimensions";
import { getChannels, getPackages } from "../../../../services/gtv/gtv_service";
import { ResultChannel, ResultPackages } from "../../../../data/interfaces/gtv_interface";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DialogComponent } from "../../../../components/components";

const GtvPaquetesComponent = () => {
    const [showLoading, setShowLoading] = useState(false);
    const [packages, setPackages] = useState<ResultPackages[]>([]);
    const [channels, setChannels] = useState<ResultChannel[]>([]);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            setShowLoading(true);
            try {
                const response = await getPackages();
                setPackages(response);
                setShowLoading(false);
            } catch (error) {
                setShowLoading(false);
                console.error('Error al obtener los datos:', error);
            }
        };

        const fetchChannels = async () => {
            setShowLoading(true);
            try {
                const response = await getChannels();
                setChannels(response);
            } catch (error) {
                console.error('Error al obtener los canales:', error);
            }
        };

        fetchInfo();
        fetchChannels();
    }, []);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const Channels = () => (
        <>
            <Text style={[styles.canales18, styles.canales18Typo]}>Canales +18</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
                {channels.map((channel, index) => (
                    <View key={index} style={styles.channelContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: channel.channel.file_logo }} style={styles.image} resizeMode="contain" />
                        </View>
                        <Text style={styles.channelName}>{channel.channel.name}</Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.botonesBotnSegundario} onPress={toggleDialog}>
                <Text style={[styles.iniciarSesin, styles.canales18Typo]}>Cerrar</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <View style={styles.container}>
            {packages.map((item, index) => (
                <LinearGradient
                    key={index}
                    style={styles.frameParent}
                    locations={[0.04, 1]}
                    colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']}
                    useAngle={true}
                    angle={180}
                >
                    <View style={styles.planPlatinoParent}>
                        <Text style={[styles.planPlatino, styles.bsAlMesTypo]}>{item.name}</Text>
                    </View>
                    <View style={styles.planPlatinoParent}>
                        <Text style={[styles.planPlatino, styles.bsAlMesTypo]}>{item.price} USD / mensual</Text>
                    </View>
                    <Text style={[styles.velocidadDeDescarga, styles.planActualTypo]}>
                        {`Este paquete incluye ${item.channels_package_gtv_count} canales +18`}
                    </Text>
                    <View style={[styles.planActualParent, styles.planActualParentFlexBox]}>
                        <TouchableOpacity style={styles.verCanalesButton} onPress={toggleDialog}>
                            <MaterialCommunityIcons name="remote-tv" size={24} color="#fff" />
                            <Text style={styles.verCanalesText}>Ver canales</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            ))}

            <DialogComponent visible={showDialog} onClose={toggleDialog} >
                <View style={styles.dialogContent}>
                    <Channels />
                </View>
            </DialogComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: percentWidth(5),
        paddingVertical: percentHeight(2),
    },
    frameParent: {
        borderRadius: 16,
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: "transparent",
        marginBottom: 20
    },
    bsAlMesTypo: {
        textAlign: "left",
        fontFamily: "Roboto-Regular",
        fontSize: percentWidth(4),
    },
    planActualTypo: {
        fontSize: percentWidth(4),
        textAlign: "left",
        fontFamily: "Roboto-Regular"
    },
    planActualParentFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: percentHeight(2),
    },
    planPlatino: {
        color: "#fafafa"
    },
    planPlatinoParent: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    velocidadDeDescarga: {
        color: "#fafafa",
        marginTop: percentHeight(2),
    },
    verCanalesButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e20a17",
        borderRadius: 8,
        paddingVertical: percentHeight(1),
        paddingHorizontal: percentWidth(3),
    },
    tvIcon: {
        width: percentWidth(5),
        height: percentHeight(5),
        marginRight: percentWidth(2),
    },
    verCanalesText: {
        color: "#fff",
        fontSize: percentWidth(4),
        fontFamily: "Roboto-Regular"
    },
    planActualParent: {
        alignSelf: "stretch",
        marginTop: 32
    },

    canales18: {
        fontSize: percentWidth(5),
        color: '#fff',
        textAlign: 'center',
        marginVertical: percentHeight(1.5),
    },
    canales18Typo: {
        fontFamily: 'Roboto-Regular',
    },
    scrollViewContainer: {
        flexDirection: 'row',
    },
    channelContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: percentWidth(1),
        marginBottom: percentHeight(2),
        marginRight: percentWidth(3),
        height:percentHeight(15)
    },
    imageContainer: {
        width: percentWidth(20),
        height: percentHeight(10),
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    channelName: {
        color: '#000',
        fontSize: percentWidth(4),
        marginTop: percentHeight(1),
    },
    botonesBotnSegundario: {
        backgroundColor: '#e20a17',
        borderRadius: 8,
        paddingVertical: percentHeight(1),
        paddingHorizontal: percentWidth(3),
        alignItems: 'center',
    },
    iniciarSesin: {
        color: '#fff',
        fontSize: percentWidth(4),
    },
    dialogContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: percentWidth(2),
    },
    dialogContent: {
        borderRadius: 8,
        width: '80%', // Adjust as needed
        // Adjust as needed
    }
});

export default GtvPaquetesComponent;
