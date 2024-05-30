import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../utils/redux/store";
import { setSender } from "../../../../../utils/redux/actions/formActions";
import { percentHeight, percentWidth } from "../../../../../utils/dimensions/dimensions";

interface Props {
    onClose: () => void;
    metodos: Array<{ id: number; name: string; sender: string }>;
}

const Agenda: React.FC<Props> = ({ onClose, metodos }) => {
    const dispatch = useDispatch();
    const method = useSelector((state: RootState) => state.invoiceState.method);
    const sender = useSelector((state: RootState) => state.formState.sender);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (sender) {
            setValue(sender.sender);
        }
    }, [sender]);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        const agenda = {
            method: method,
            sender: newValue,
        };
        dispatch(setSender(agenda));
        onClose(); // Llama a onClose cuando se selecciona una opción
    };

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                {metodos.map((metodo) => (
                    <View key={metodo.id}>
                        <View style={styles.instanceParent}>
                            <RadioButton value={metodo.sender} color="#e20a17" />
                            <View>
                                <Text style={styles.nombreAliasTypo}>Nombre: {metodo.name}</Text>
                                <Text style={[styles.telfono, styles.nombreAliasTypo]}>Enviante: {metodo.sender}</Text>
                            </View>
                        </View>
                        <Divider style={styles.divider} />
                    </View>
                ))}
            </RadioButton.Group>
            <View style={styles.botonesBotnPrincipalParent}>
                <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={onClose}>
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nombreAliasTypo: {
        textAlign: "left",
        color: "#fff",
        fontFamily: "Roboto-Regular",
        fontSize: 16
    },
    telfono: {
        marginTop: 8
    },
    instanceParent: {
        flexDirection: "row",
        alignItems: "center", // Alinea el RadioButton y el texto verticalmente
        marginVertical: 5 // Añade espacio vertical entre los elementos
    },
    divider: {
        backgroundColor: "#fff",
        marginVertical: 5
    },
    botonesBotnPrincipalParent: {
        marginTop: percentHeight(2),
        alignSelf: "stretch",
        alignItems: "center"
    },
    iniciarSesin: {
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#fafafa"
    },
    botonesBotnPrincipal: {
        backgroundColor: "#e20a17"
    },
    iniciarSesinTypo: {
        textAlign: "left",
        fontSize: 16
    },
    botonesFlexBox: {
        paddingHorizontal: percentWidth(8),
        justifyContent: "center",
        paddingVertical: percentHeight(1.5),
        borderRadius: 8,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center"
    },
});

export default Agenda;
