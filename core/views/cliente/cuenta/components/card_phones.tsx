import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setAreaCode, setAreaCode2 } from "../../../../utils/redux/actions/formActions";
import { RootState } from "../../../../utils/redux/store";


interface Props {
    onClose: () => void;
}

const CardPhones: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const area = useSelector((state: RootState) => state.formState.areaCode);
    const [value, setValue] = React.useState(area);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        dispatch(setAreaCode(newValue));
        onClose(); // Llama a onClose cuando se selecciona una opción
    };

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                <View style={styles.instanceParent}>
                    <RadioButton value="0412" color="#e20a17" />
                    <Text style={styles.text}>0412</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0414" color="#e20a17"/>
                    <Text style={styles.text}>0414</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0424" color="#e20a17"/>
                    <Text style={styles.text}>0424</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0416" color="#e20a17"/>
                    <Text style={styles.text}>0416</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0426" color="#e20a17" />
                    <Text style={styles.text}>0426</Text>
                </View>
            </RadioButton.Group>
        </View>
    );
};

const CardPhones2: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const area = useSelector((state: RootState) => state.formState.areaCode2);
    const [value, setValue] = React.useState(area);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        dispatch(setAreaCode2(newValue));
        onClose(); // Llama a onClose cuando se selecciona una opción
    };

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                <View style={styles.instanceParent}>
                    <RadioButton value="0412" color="#e20a17" />
                    <Text style={styles.text}>0412</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0414" color="#e20a17"/>
                    <Text style={styles.text}>0414</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0424" color="#e20a17"/>
                    <Text style={styles.text}>0424</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0416" color="#e20a17"/>
                    <Text style={styles.text}>0416</Text>
                </View>
                <View style={styles.instanceParent}>
                    <RadioButton value="0426" color="#e20a17" />
                    <Text style={styles.text}>0426</Text>
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

export {
    CardPhones,
    CardPhones2,
} 
