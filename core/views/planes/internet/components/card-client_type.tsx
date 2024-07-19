import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { percentHeight, percentWidth } from "../../../../utils/dimensions/dimensions";
import { setSender } from "../../../../utils/redux/actions/formActions";
import { RootState } from "../../../../utils/redux/store";
import { setClientType, setPlan } from "../../../../utils/redux/actions/planActions";


interface Props {
    onClose: () => void;
}

const CardClientType: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const client_type = useSelector((state: RootState) => state.planState.client_type);
    const clients = useSelector((state: RootState) => state.planState.clients);
    const [value, setValue] = useState<string>(client_type?.id);

    useEffect(() => {
        // Si hay un client_type y no está en el estado, configúralo.
        if (client_type?.id && !value) {
            setValue(client_type.id);
        }
    }, [client_type, value])




    const handleValueChange = (newValue: any) => {
        //aplicar filter para obtener cambios del clients
        const filteredClients = clients.filter((client: any) => client.id === newValue);
  
        const planAct={
            name:filteredClients[0].plan_type[0].name,
            id:filteredClients[0].plan_type[0].id,
            cost:filteredClients[0].plan_type[0].cost,
            profile:filteredClients[0].plan_type[0].profile,
          }
        const client ={
            id: filteredClients[0].id,
            client_type:filteredClients[0].name
        }
        dispatch(setClientType(client))
        dispatch(setPlan(planAct))
        setValue(newValue.id);

         onClose();
    };

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                {clients.map((client: any) => (
                    <View key={client.id}>
                        <View style={styles.instanceParent}>
                            <RadioButton value={client.id} color="#e20a17" />
                            <View>
                                <Text style={styles.nombreAliasTypo}>{client.name}</Text>
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

export default CardClientType;
