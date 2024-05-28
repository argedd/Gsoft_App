import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, StyleSheet, Image, View, Pressable, TextInput, TouchableOpacity } from "react-native";
import { recuperarSchema } from "../../../utils/validators/validations_forms";
import { Picker } from "@react-native-picker/picker";
import { recoveryPassword } from "../../../services/auth/auth_service";
import { useState } from "react";
import { LoadingComponent } from "../../../components/components";

interface DialogRecuperarProps {
  onClose: () => void;
}

const DialogRecuperar: React.FC<DialogRecuperarProps> = ({ onClose }) => {
    const [showLoading, setShowLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(recuperarSchema)
      });

      const onSubmit = async (data: any) => {
        setShowLoading(true);

        const form = {
          identification: `${data.tipoDocumento}${data.cedula}`,
          email:true,
          phone:false,
        };
        
        try {
          const response = await recoveryPassword(form);
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        setShowLoading(false);

         onClose();
        } catch (error) {
        setShowLoading(false);
            
        }
      };

  return (
    <View>
              {showLoading && <LoadingComponent isLoading={showLoading} />}

      <Text style={[styles.ingresaTuNumero, styles.vTypo]}>
        Ingresa tu número de cédula
      </Text>
      <View style={styles.frameParent}>
      <View style={styles.inputContainer}>
            <View style={styles.row}>
              <Controller
                control={control}
                name="tipoDocumento"
                defaultValue="V"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={value}
                      style={styles.picker}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      dropdownIconColor="#fff"

                    >
                      <Picker.Item label="V" value="V"  />
                      <Picker.Item label="E" value="E" />
                      <Picker.Item label="J" value="J" />
                      <Picker.Item label="G" value="G" />
                      <Picker.Item label="P" value="P" />
                    </Picker>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="cedula"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.usuarioWrapperBorder}>
                      <TextInput
                        style={[styles.usuario1, styles.usuario1Typo]}
                        placeholder="Cédula"
                        placeholderTextColor="#fff"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                )}
              />
            </View>
            {errors.cedula && (
              <Text style={styles.errorText}>{(errors.cedula as any).message}</Text>
            )}
          </View>
      </View>
      <TouchableOpacity
        style={[styles.aceptarWrapper, styles.wrapperFlexBox]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={[styles.aceptar, styles.vTypo]}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  vTypo: {
    textAlign: "center",
    fontSize: 16,
  },
  wrapperFlexBox: {
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  ingresaTuNumero: {
    fontFamily: "Roboto-Bold",
    color: "#fafafa",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 24,
  },
  v: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
    textAlign: "left",
    fontSize: 16,
  },



  frameParent: {
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
  },
  aceptar: {
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
    fontWeight: "600",
    textAlign: "left",
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
  },

  //estilos agg

  inputContainer: {
    marginBottom: 1,
  },
  usuario1: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    // Ensure the input takes up full width and is clickable

  },
  usuario1Typo: {
    fontSize: 16,
    textAlign: "left"
  },

  usuarioWrapperBorder: {
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    flexDirection: "row",
    width: 160,
    borderRadius: 8,
    alignItems: "center",
   
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: "#fafafa",
    borderStyle: "solid",
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginRight: 8,
  },
  picker: {
    color: "#fff",
    width: 90,
  },

  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default DialogRecuperar;
