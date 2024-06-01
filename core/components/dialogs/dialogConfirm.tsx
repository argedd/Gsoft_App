import * as React from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

interface DialogConfirmProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    message: string;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ visible, onClose, onConfirm, message }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.backdrop} />
                <View style={styles.modalView}>
                    <Image source={require('../../assets/icons/notificacion/advertencia.png')} style={styles.image} />
                    <Text style={styles.estsSeguroDe}>{message}</Text>
                    <TouchableOpacity style={styles.botonesBotnPrincipal} onPress={onConfirm}>
                        <Text style={styles.iniciarSesin}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonesBotnSegundario} onPress={onClose}>
                        <Text style={styles.iniciarSesin}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        backgroundColor: "rgba(80, 80, 79, 0.9)",
        borderRadius: 16,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        width:"90%"
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 15,
    },
    estsSeguroDe: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        color: "#fff",
        textAlign: "center",
        width: 223,
        marginBottom: 15,
    },
    iniciarSesin: {
        fontSize: 12,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#fafafa",
        textAlign: "center",
    },
    botonesBotnPrincipal: {
        borderRadius: 6,
        backgroundColor: "#e20a17",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 9,
        marginVertical: 5,
    },
    botonesBotnSegundario: {
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: "#e20a17",
        borderWidth: 1.5,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 9,
        marginVertical: 5,
    }
});

export default DialogConfirm;
