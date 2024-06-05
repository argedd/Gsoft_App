import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LoadingComponent, SuccesComponent, ErrorComponent } from '../../../../components/components';
import DialogNotificationComponent from '../../../../components/dialogs/dialogNotification';
import { deleteDevice, getInfo } from '../../../../services/gtv/gtv_service';
import LinearGradient from 'react-native-linear-gradient';
import { percentHeight, percentWidth } from '../../../../utils/dimensions/dimensions';
import moment from 'moment';

interface Props {
    id: string,
    contract: any,
}

const GtvPantallasComponent = ({ id, contract }: Props) => {
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const [selectedTab, setSelectedTab] = useState<'disponibles' | 'ocupadas'>('disponibles');
    const [disponibles, setDisponibles] = useState<any[]>([]);
    const [ocupadas, setOcupadas] = useState<any[]>([]);
    const [isSwitchOn, setIsSwitchOn] = React.useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            setShowLoading(true);
            try {
                const response = await getInfo(id);
                setDisponibles(response.result.activationCodes);
                setOcupadas(response.result.devices);
                setShowLoading(false);
            } catch (error) {
                setShowLoading(false);
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchInfo();
    }, [isSwitchOn]);

    const onToggleSwitch = async (serial:string) => {
     

       const form ={
        
            "contract_detail": id,
            "serial": serial
       
        }
        const deleteDev = await deleteDevice(form);
        console.log('====================================');
        console.log(deleteDev);
        console.log('====================================');
        // deleteDev.then((resp: any) => {
        //     console.log('====================================');
        //     console.log(resp);
        //     console.log('====================================');
            setShowNotification(true);
            setNotificationType('success');
            setIsSwitchOn(!isSwitchOn)

        // }).catch((err: any) => {

        //     setShowNotification(true);
        //     setNotificationType('error');
        //     setIsSwitchOn(!isSwitchOn)

        // });
        console.log('====================================');
        console.log(form);
        console.log('====================================');
    };

    const DisponiblesComponents = () => (
        <View>
        {disponibles.map((item, index) => (
            <LinearGradient key={index} style={[styles.frameParent, styles.parentFlexBox]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
                <View style={styles.parentFlexBox}>
             
                    <View style={[styles.iconosPantallas, styles.parentFlexBox]}>
                        <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/gtv/pantalla.png')} />
                        <Text style={styles.informacinDeLa}>Información de la pantalla</Text>

                    </View>
                    <View style={styles.parentSpaceBlock}>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <View style={styles.grid}>
                                <Text style={styles.cdigo78623005Typo}>
                                    <Text style={styles.fechaDeExpiracin}>Fecha de expiración: </Text>
                                    <Text style={styles.textInfo}>{moment(item.expirationTime).format('YYYY-MM-DD')}</Text>
                                </Text>
                            </View>
                            <View style={styles.grid}>
                                <Text style={styles.cdigo78623005Typo}>
                                    <Text style={styles.fechaDeExpiracin}>Código: </Text>
                                    <Text style={styles.textInfo}>{item.linkCode}</Text>
                                </Text>
                            </View>
                            <View style={styles.grid}>
                                <Text style={styles.cdigo78623005Typo}>
                                    <Text style={styles.fechaDeExpiracin}>Código de Activación: </Text>
                                    <Text style={styles.textInfo}>{item.activationCodeId}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        ))}
    </View>

    );

    const OcupadasComponents = () => (
        <View>
            {ocupadas.map((item, index) => (
                <LinearGradient key={index} style={[styles.frameParent, styles.parentFlexBox]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
                    <View style={styles.parentFlexBox}>
                 
                        <View style={[styles.iconosPantallas, styles.parentFlexBox]}>
                            <Image style={styles.vectorIcon} resizeMode="cover" source={require('../../../../assets/icons/gtv/pantalla.png')} />
                            <Text style={styles.informacinDeLa}>Información de la pantalla</Text>

                        </View>
                        <View style={styles.parentSpaceBlock}>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <View style={styles.grid}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>Nombre: </Text>
                                        <Text style={styles.textInfo}>{item.name}</Text>
                                    </Text>
                                </View>
                                <View style={styles.grid}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>Identificador: </Text>
                                        <Text style={styles.textInfo}>{item.identifier}</Text>
                                    </Text>
                                </View>
                                <View style={styles.grid}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>Modelo: </Text>
                                        <Text style={styles.textInfo}>{item.platform}</Text>
                                    </Text>
                                </View>
                                <View style={styles.grid}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>Plataforma: </Text>
                                        <Text style={styles.textInfo}>{item.platform}</Text>
                                    </Text>
                                </View>
                                <View style={styles.grid}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>MAC: </Text>
                                        <Text style={styles.textInfo}>{item.macAddress}</Text>
                                    </Text>
                                </View>
                                <View style={styles.grid}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>Aplicacion: </Text>
                                        <Text style={styles.textInfo}>{item.appName}</Text>
                                    </Text>
                                </View>
                                <View style={styles.grid2}>
                                    <Text style={styles.cdigo78623005Typo}>
                                        <Text style={styles.fechaDeExpiracin}>Ubicacion: </Text>
                                        <Text style={styles.textInfo}>{item.location}</Text>
                                    </Text>
                                </View>
                            </View>


                        </View>
                    </View>
                    <View style={[styles.desactivarPantallaParent, styles.parentSpaceBlock]}>
                        <Text style={styles.desactivarPantalla}>Desactivar pantalla</Text>
                        <Switch value={isSwitchOn} onValueChange={()=>onToggleSwitch(item.serialNumber)}    
                         trackColor={{ false: '#767577', true: '#767577' }}
      thumbColor={isSwitchOn ? '#ff0000' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e" />

                    </View>
                </LinearGradient>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.botonesPantallasGtv}>
                <TouchableOpacity
                    style={[styles.botonesPantallasDisponibles, styles.botonesFlexBox, selectedTab === 'disponibles' && styles.selectedButton]}
                    onPress={() => setSelectedTab('disponibles')}
                >
                    <View style={styles.disponiblesParent}>
                        <Text style={[styles.disponibles, styles.textTypo]}>Disponibles</Text>
                        <Text style={[styles.text, styles.textTypo]}>{disponibles.length}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.botonesPantallasOcupadas, styles.botonesFlexBox, selectedTab === 'ocupadas' && styles.selectedButton]}
                    onPress={() => setSelectedTab('ocupadas')}
                >
                    <View style={styles.disponiblesParent}>
                        <Text style={[styles.disponibles, styles.textTypo]}>Ocupadas</Text>
                        <Text style={[styles.text, styles.textTypo]}>{ocupadas.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {selectedTab === 'disponibles' ? <DisponiblesComponents /> : <OcupadasComponents />}
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Pantalla Desactivada"} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={"Se ha producido un error"} />}
            </DialogNotificationComponent>
        </View>
    );
}
   
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            paddingHorizontal: percentWidth(10),
        },
        grid: {
            width: percentWidth(40),
            padding: percentWidth(1),
            paddingLeft: percentWidth(6),
        },
        grid2: {
            width: "100%",
            padding: percentWidth(1),
            paddingLeft: percentWidth(6),
        },

        botonesFlexBox: {
            padding: percentWidth(2),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        },
        textTypo: {
            textAlign: "left",
            fontFamily: "Roboto-Regular"
        },
        disponibles: {
            color: "#fafafa",
            fontSize: percentWidth(4),
            textAlign: "left"
        },
        text: {
            fontSize: percentWidth(5),
            color: "#fff",
            marginTop: percentHeight(2)
        },
        textInfo: {
            fontSize: percentWidth(3),
            color: "#fff",
            marginTop: percentHeight(2)
        },
        disponiblesParent: {
            justifyContent: "center",
            alignItems: "center"
        },
        botonesPantallasDisponibles: {
            borderTopLeftRadius: percentWidth(2),
            borderBottomLeftRadius: percentWidth(2),
            backgroundColor: "rgba(171, 170, 170, 0.55)"
        },
        botonesPantallasOcupadas: {
            borderTopRightRadius: percentWidth(2),
            borderBottomRightRadius: percentWidth(2),
            backgroundColor: "rgba(171, 170, 170, 0.55)"
        },
        botonesPantallasGtv: {
            width: "100%",
            flexDirection: "row"
        },
        selectedButton: {
            backgroundColor: "#e20a17",
        },
        parentFlexBox: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        },
        toggleFlexBox: {
            flexDirection: "row",
        },
        cdigo78623005Typo: {
            color: "#abaaaa",
            fontSize: percentWidth(3),
            textAlign: "left"
        },
        parentSpaceBlock: {
            marginTop: percentHeight(1),
            flexDirection: "row"
        },
        informacinDeLa: {
            fontSize: percentWidth(3),
            textAlign: "left",
            color: "#fff",
            fontFamily: "Roboto-Medium",
            fontWeight: "500",
            marginLeft: percentWidth(1)
        },
        vectorIcon: {
            width: 44,
            height: 35
        },
        iconosPantallas: {
            width: percentWidth(10),
            height: percentHeight(6),
            flexDirection: "row",
            marginRight:percentWidth(18)
        },
        fechaDeExpiracin: {
            fontWeight: "700",
            fontFamily: "Roboto-Bold"
        },
        fechaDeExpiracin1212202Parent: {
            width: percentWidth(30),
            flexWrap: "wrap",
        },
        desactivarPantalla: {
            fontSize: percentWidth(3),
            textAlign: "left",
            color: "#fff",
            fontFamily: "Roboto-Medium",
            fontWeight: "500"
        },
        desactivarPantallaParent: {
            justifyContent: "center",
            alignItems: "center"
        },
        frameParent: {
            borderRadius: percentWidth(4),
            paddingTop: percentHeight(2),
            paddingBottom: percentHeight(2),
            marginTop: percentHeight(2),
            marginBottom: percentHeight(2),
        },

});

export default GtvPantallasComponent;
