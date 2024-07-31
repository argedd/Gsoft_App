import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { recuperarSchema } from "../../../utils/validators/validations_forms";
import { recoveryPassword } from "../../../services/auth/auth_service";
import { useRef, useState } from "react";
import { DialogComponent, LoadingComponent, SuccesComponent } from "../../../components/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/store";
import { percentWidth } from "../../../utils/dimensions/dimensions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DialogNotificationComponent from "../../../components/dialogs/dialogNotification";
import CardCedula from "./card_cedula";
import { resetForm } from "../../../utils/redux/actions/invoiceActions";

interface DialogRecuperarProps {
  onClose: () => void;
}

const DialogRecuperar: React.FC<DialogRecuperarProps> = ({ onClose }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
  const [showDialog, setShowDialog] = useState(false);
  const digit = useSelector((state: RootState) => state.formState.digit);
  const cedulaRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(recuperarSchema)
  });

  const onSubmit = async (data: any) => {

    setShowLoading(true);

    const form = {
      identification: `${digit}${data.cedula}`,
      email: true,
      phone: false,
    };

    try {
      const response = await recoveryPassword(form);
      setShowLoading(false);
      setShowNotification(true);
      dispatch(resetForm());
      setNotificationType('success');

    } catch (error) {
      setShowLoading(false);
    }
  };

  return (
    <View style={styles.container}>      
    {showLoading && <LoadingComponent isLoading={showLoading} />}
      <Text style={styles.ingresaTuNumero}>Ingresa tu número de cédula</Text>
      <View style={styles.frameParent}>
        <View>
          <View style={styles.frameGroup}>
            <TouchableOpacity onPress={toggleDialog}>
              <View style={styles.parent}>
                <Controller
                  control={control}
                  name="digito"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        style={styles.text}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={digit}
                        placeholder="V"
                        placeholderTextColor="#fff"
                        maxLength={2}
                        selectionColor="red"
                        editable={false}
                      />
                      <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                    </>
                  )}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wrapper} onPress={() => cedulaRef.current?.focus()}>
              <Controller
                control={control}
                name="cedula"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={cedulaRef}
                    style={styles.text}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="*******"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    maxLength={8}
                  />
                )}
              />
            </TouchableOpacity>
          </View>
          {errors.cedula && (
            <Text style={styles.errorText}>{(errors.cedula as any).message}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.aceptarWrapper}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.aceptar}>Aceptar</Text>
      </TouchableOpacity>

      <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
        {notificationType === 'success' && <SuccesComponent onClose={() => {setShowNotification(false)}} message={"Su nueva contraseña fue enviada al Correo, verifique su Email afiliado al sistema"} route={"Login"} />}
      </DialogNotificationComponent>
      <DialogComponent visible={showDialog} onClose={toggleDialog}>
        <CardCedula onClose={() => setShowDialog(false)} />
      </DialogComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
  },
  ingresaTuNumero: {
    fontFamily: "Roboto-Bold",
    color: "#fafafa",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 20,
  },
  frameParent: {
    width: "90%",
    marginTop: 20,
    flexDirection: "row",
  },
  aceptar: {
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  aceptarWrapper: {
    alignSelf: "stretch",
    backgroundColor: "#e20a17",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  frameGroup: {
    flexDirection: "row",
    width: percentWidth(70),
  },
  parent: {
    width: percentWidth(23),
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#fafafa",
    flexDirection: "row",
    paddingHorizontal: percentWidth(4),
    borderStyle: "solid",
    alignItems: "center",
  },
  wrapper: {
    marginLeft: percentWidth(1),
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#fafafa",
    flexDirection: "row",
    paddingHorizontal: percentWidth(4),
    borderStyle: "solid",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#fff",
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
});

export default DialogRecuperar;
