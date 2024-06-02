import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../utils/redux/store";
import { setIssue } from "../../../../../utils/redux/actions/ticketActions";
import { percentHeight, percentWidth } from "../../../../../utils/dimensions/dimensions";
import { Issue } from "../../../../../data/interfaces/tickets_interface";
import { getIssues } from "../../../../../services/tickets/tickets_service";

interface Props {
    onClose: () => void;
}

const CardIssues: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const depto = useSelector((state: RootState) => state.ticketState.department.id);
    const issue = useSelector((state: RootState) => state.ticketState.issue.id);
    const [value, setValue] = useState(issue);
    const [issues, setIssuesD] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const result = await getIssues(depto);
                setIssuesD(result);
            } catch (error) {
                console.error('Error al obtener métodos del cliente:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchIssues();
    }, [depto]);

    useEffect(() => {
        if (issues.length > 0) {
            const selectedIssue = issues.find(issueItem => issueItem.id.toString() === issue.toString());
            if (selectedIssue) {
                setValue(selectedIssue.id.toString());
            }
        }
    }, [issues, issue]);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        const selectedIssue = issues.find(issueItem => issueItem.id.toString() === newValue);
        if (selectedIssue) {
            dispatch(setIssue(selectedIssue));
        }
        onClose();
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#e20a17" />;
    }

    return (
        <View>
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                {issues.map(issueItem => (
                    <View style={styles.instanceParent} key={issueItem.id}>
                        <RadioButton value={issueItem.id.toString()} color="#e20a17" />
                        <Text style={styles.text}>{issueItem.name}</Text>
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

export default CardIssues;
