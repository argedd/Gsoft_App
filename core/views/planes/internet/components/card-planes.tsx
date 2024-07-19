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

const CardPlanes: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const { client_type, clients, plan } = useSelector((state: RootState) => state.planState);
    const [value, setValue] = useState<string>(plan.id);
    const [planes, setPlanes] = useState<any>([]);

    useEffect(() => {
        const filteredPlans = clients.filter((client: any) => client.id === client_type.id);
        setPlanes(filteredPlans[0].plan_type);

    }, [client_type])



    const handleValueChange = (newValue: any) => {

        //aplicar filter para obtener cambios del clients
        const filteredPlans = planes.filter((plan: any) => plan.id === newValue);
        const planAct = {
            name: filteredPlans[0].name,
            id: filteredPlans[0].id,
            cost: filteredPlans[0].cost,
            profile: filteredPlans[0].profile,
        }

        dispatch(setPlan(planAct))
        setValue(newValue);

        onClose();
    };

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                {planes.map((plan: any) => (
                    <View key={plan.id}>
                        <View style={styles.instanceParent}>
                            <RadioButton value={plan.id} color="#e20a17" />
                            <View>
                                <Text style={styles.nombreAliasTypo}>{plan.name}</Text>
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

export default CardPlanes;
