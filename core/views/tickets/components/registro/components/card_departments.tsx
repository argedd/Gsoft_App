import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../utils/redux/store";
import { setDeparment } from "../../../../../utils/redux/actions/ticketActions";
import { percentHeight, percentWidth } from "../../../../../utils/dimensions/dimensions";

interface Props {
    onClose: () => void;
}

const CardDepartments: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const depto = useSelector((state: RootState) => state.ticketState.department.id);
    const [value, setValue] = React.useState(depto);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        const selectedDepartment = departments.find(dept => dept.id === newValue);
        if (selectedDepartment) {
            dispatch(setDeparment(selectedDepartment));
        }
        onClose();
    };

    const departments = [
        { id: '4', name: 'FINANZAS' },
        { id: '37', name: 'SOPORTE' }
    ];

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                {departments.map(dept => (
                    <View style={styles.instanceParent} key={dept.id}>
                        <RadioButton value={dept.id} color="#e20a17" />
                        <Text style={styles.text}>{dept.name}</Text>
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
    text: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: "#fff",
        textAlign: "left",
        marginLeft: 11,
        alignSelf: 'center'
    },
    instanceParent: {
        flexDirection: "row",
        alignItems: "center",
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

export default CardDepartments;
