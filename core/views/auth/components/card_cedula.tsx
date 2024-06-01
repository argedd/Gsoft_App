import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setDigiCedula } from "../../../utils/redux/actions/formActions";
import { RootState } from "../../../utils/redux/store";


interface Props {
    onClose: () => void;
}

const CardCedula: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const digit = useSelector((state: RootState) => state.formState.digit);
    const [value, setValue] = React.useState(digit);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        dispatch(setDigiCedula(newValue));
        onClose(); // Llama a onClose cuando se selecciona una opción
    };

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                <View style={styles.instanceParent}>
                    <RadioButton value="V" color="#e20a17" />
                    <Text style={styles.text}>V</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="E" color="#e20a17"/>
                    <Text style={styles.text}>E</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="J" color="#e20a17"/>
                    <Text style={styles.text}>J</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="G" color="#e20a17"/>
                    <Text style={styles.text}>G</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="P" color="#e20a17" />
                    <Text style={styles.text}>P</Text>
                </View>
            </RadioButton.Group>
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
        alignSelf: 'center' // Centra el texto verticalmente
    },
    instanceParent: {
        flexDirection: "row",
        alignItems: "center", // Alinea el RadioButton y el texto verticalmente
        marginVertical: 5 // Añade espacio vertical entre los elementos
    },
});

export default CardCedula;
