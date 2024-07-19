import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { percentWidth, percentHeight } from "../../../../utils/dimensions/dimensions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingComponent, SuccesComponent, ErrorComponent, DialogComponent } from "../../../../components/components";
import DialogNotificationComponent from "../../../../components/dialogs/dialogNotification";
import { internetSchema } from "../../../../utils/validators/gtv_validator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/store";
import LinearGradient from "react-native-linear-gradient";
import CardPlanes from "./card-planes";
import { changePlan, getPlanes } from "../../../../services/planes/plan_services";
import CardClientType from "./card-client_type";
import DialogConfirm from "../../../../components/dialogs/dialogConfirm";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { resetFormPlan } from "../../../../utils/redux/actions/planActions";

const PlanesComponents = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(internetSchema),
        shouldUnregister: false
    });
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogClient, setShowDialogClient] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
    const client_type = useSelector((state: RootState) => state.planState.client_type);
    const plan = useSelector((state: RootState) => state.planState.plan);
    const contract = useSelector((state: RootState) => state.contractState.contract);
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    useEffect(() => {
        setValue('client_type', client_type.client_type);
        setValue('plan', plan.name);
    }, [client_type, plan, setValue]);

    const toggleDialogClient = () => {
        setShowDialogClient(!showDialogClient);
    };

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        const form = {
            "client_type": client_type.id,
            "plan": plan.id
        };
       
        setShowLoading(true);

        try {
            const response = await changePlan(contract,form);
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('success');
            // dispatch(resetFormPlan());
        } catch (err:any) {

            setMessage(err.data.detail)
            setShowLoading(false);
            setShowNotification(true);
            setNotificationType('error');
        }
    }

    return (
        <View style={styles.frameParent}>
            {showLoading && <LoadingComponent isLoading={showLoading} />}
            <View style={styles.reportaTuPagoParent}>
                <Text style={[styles.reportaTuPago, styles.iniciarSesinTypo]}>Datos de plan de Internet</Text>
                <View style={styles.formTelefonoParent}>
                    <View>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Tipo Cliente</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                            <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={toggleDialogClient}>
                                <Controller
                                    control={control}
                                    name="client_type"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.textContainer}>
                                            <TextInput
                                                style={styles.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholder="Tipo Cliente"
                                                placeholderTextColor="#fff"
                                                maxLength={30}
                                                editable={false}
                                            />
                                            <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                                        </View>
                                    )}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formUsuario}>
                        <Text style={[styles.nDeTelfono, styles.textTypo]}>Plan</Text>
                        <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
                            <TouchableOpacity style={[styles.zathit17Wrapper, styles.wrapperBorder]} onPress={toggleDialog}>
                                <Controller
                                    control={control}
                                    name="plan"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.textContainer}>
                                            <TextInput
                                                style={styles.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholder="Plan"
                                                placeholderTextColor="#fff"
                                                editable={false}
                                            />
                                            <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                                        </View>
                                    )}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <LinearGradient style={styles.descriptionPlan} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
                <View style={styles.planBronceParent}>
                    <Text style={[styles.planBronce, styles.bsAlMesTypo]}>{plan.name}</Text>
                </View>
                <View style={[styles.textContainer]}>
                <Text style={[styles.price, styles.bsAlMesTypo]}>{plan.cost} USD / </Text><Text style={[styles.mensual, styles.bsAlMesTypo]}>mensual</Text>
                </View>
                <Text style={[styles.velocidadDeDescarga, styles.bsAlMesTypo]}>Velocidad Internet: {plan.profile}</Text>

               
            </LinearGradient>
            <View style={styles.botonesBotnPrincipalParent}>
                <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={() => setShowConfirm(true)}>
                    <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Cambiar Plan</Text>
                </TouchableOpacity>
            </View>
            <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Cambio de Plan exitoso"} route="Home" />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={message} />}
            </DialogNotificationComponent>
            <DialogComponent visible={showDialog} onClose={toggleDialog}>
                <CardPlanes onClose={() => setShowDialog(false)} />
            </DialogComponent>
            <DialogComponent visible={showDialogClient} onClose={toggleDialogClient}>
                <CardClientType onClose={() => setShowDialogClient(false)} />
            </DialogComponent>
            <DialogConfirm
                visible={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
                message={`¿Estás seguro de cambiar a ${client_type.client_type} / ${plan.name} ? `}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    iniciarSesinTypo: {
        textAlign: "left",
        fontSize: 16
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
    textTypo: {
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        color: "#fff"
    },
    frameGroupSpaceBlock: {
        width: percentWidth(80)
    },
    wrapperBorder: {
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: "#fafafa",
        paddingHorizontal: percentWidth(4),
        borderStyle: "solid",
        alignItems: "center"
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%'
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
    reportaTuPago: {
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        color: "#fff",
        textAlign: "left"
    },
    nDeTelfono: {
        fontSize: 14,
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        fontFamily: "Roboto-Regular",
        color: "#fff",
        flex: 1
    },
    parent: {
        width: percentWidth(23)
    },
    wrapper: {
        marginLeft: percentWidth(1),
    },
    frameGroup: {
        flexDirection: "row"
    },
    zathit17Wrapper: {
        marginTop: percentHeight(1),
        width: percentWidth(80)
    },
    formUsuario: {
        marginTop: percentHeight(2)
    },
    formTelefonoParent: {
        marginTop: percentHeight(2),
        alignSelf: "stretch"
    },
    registrarDatosDe: {
        marginLeft: percentWidth(3),
        fontSize: 16,
        fontFamily: "Roboto-Regular"
    },
    iconosSelectParent: {
        flexDirection: "row",
        alignItems: "center"
    },
    aliasWrapper: {
        width: percentWidth(80),
        borderWidth: 0.5,
        borderRadius: 8
    },
    registrarDatos: {
        overflow: "hidden",
        alignItems: "center"
    },
    reportaTuPagoParent: {
        borderRadius: 16,
        backgroundColor: "rgba(171, 170, 170, 0.26)",
        borderWidth: 0.5,
        paddingVertical: percentHeight(2),
        paddingHorizontal: percentWidth(4),
        borderStyle: "solid",
        alignItems: "center"
    },
    descriptionPlan: {
        borderRadius: 16,
        backgroundColor: "rgba(171, 170, 170, 0.26)",
        borderWidth: 0.5,
        paddingVertical: percentHeight(5),
        paddingHorizontal: percentWidth(2),
        borderStyle: "solid",
        alignItems: "center",
        marginTop: 16
    },
    iniciarSesin: {
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#fafafa"
    },
    botonesBotnPrincipal: {
        backgroundColor: "#e20a17"
    },
    botonesBotnPrincipalParent: {
        marginTop: percentHeight(2),
        marginBottom: percentHeight(2),
        alignSelf: "stretch",
        alignItems: "center"
    },
    frameParent: {
        width: "100%",
        alignItems: "center",
        marginTop: 16
    },
    bsAlMesTypo: {
        textAlign: "left",
        fontFamily: "Roboto-Regular"
    },
    planBronce: {
        color: "#fafafa",
        textAlign: "left",
        fontFamily: "Roboto-bold",
        fontWeight:"bold",
        fontSize: 24,
    },
    price: {
        color: "#fafafa",
        textAlign: "left",
        fontFamily: "Roboto-bold",
        fontWeight:"bold",
        fontSize: 18,
        marginTop: 8
    },
    mensual: {
        color: "red",
        textAlign: "left",
        fontFamily: "Roboto-bold",
        fontWeight:"bold",
        fontSize: 18,
        marginTop: 8
    },
    bsAlMes: {
        color: "#abaaaa",
        marginLeft: 62,
        textAlign: "left",
        fontFamily: "Roboto-Regular",
        fontSize: 16
    },
    planBronceParent: {
        alignItems: "center",
        justifyContent: "center"
    },
    velocidadDeDescarga: {
        fontSize: 16,
        width: 299,
        marginTop: 12,
        color: "#fafafa",
        textAlign: "left",
        fontFamily: "Roboto-Regular"
    },

});
export default PlanesComponents;
