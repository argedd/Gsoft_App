import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BackButton, DialogComponent, ErrorComponent, LoadingComponent, SuccesComponent } from '../../../../components/components';
import LayoutPrimary from '../../../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../../../navigations/routes/app_routes';
import { percentWidth, percentHeight } from '../../../../utils/dimensions/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ticketsSchema } from '../../../../utils/validators/tickets_validator';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';
import CardDepartments from './components/card_departments';
import CardIssues from './components/card_issues';
import { getData } from '../../../../utils/asyncStorage/asyncStorage';
import { saveTickets } from '../../../../services/tickets/tickets_service';
import { resetForm } from '../../../../utils/redux/actions/ticketActions';
import DialogNotificationComponent from '../../../../components/dialogs/dialogNotification';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';


type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}



const RegistroTicketView: React.FC<Props> = ({ navigation }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const depto = useSelector((state: RootState) => state.ticketState.department);
  const iss = useSelector((state: RootState) => state.ticketState.issue);
  const contract = useSelector((state:RootState) => state.contractState);
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<null | 'success' | 'error'>(null);
  const dispatch = useDispatch();

  const [selectImage, setSelectImage] = useState<any>([]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>('');





  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(ticketsSchema),
    shouldUnregister: false
  });

  useEffect(() => {
    setValue('department', depto.name);
    setValue('issue', iss.name);
  }, [depto,iss]);
  

  
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const openDialog = (content: React.ReactNode) => {
    setDialogContent(content);
    toggleDialog();
  };


  const pickImage = async () => {
    const options:ImageLibraryOptions  = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64:true,
    };

    try {
      const result = await launchImageLibrary(options);

      if (!result.didCancel && result.assets) {
 // Check if assets exist
        const { uri } = result.assets[0];
        setSelectedImageUri(uri);
        setShowImagePreview(true);
        setSelectImage(result.assets[0]);
      
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  interface SelectImage {
    type: string;
    base64: string;
  }
  
  interface MyTypeElement {
    [key: string]: string[];
  }
  
  type MyType = MyTypeElement[];

  const convertToMyType = (selectImage: SelectImage, type: string): MyType => {
    return [
      {
        [type]: [`data:${selectImage.type};base64,${selectImage.base64}`]
      }
    ];
  };
  
  

  const onSubmit = async (data: any) => {

    setShowLoading(true);
    const type = selectImage.fileName?.split('.').pop();
    let fl={
      type:selectImage.type ? selectImage.type : '',

      base64:selectImage.base64 ? selectImage.base64 : '',

    }
    let filedef = convertToMyType(fl,type);
   const dataUser = await getData('user');
   const form = {
      "client": dataUser.client.id,
      "contract": contract.contract,
      "issue": iss.id,
      "description":data.description,
      "office": depto.id,
      "files": filedef[0]?.undefined ? [] : filedef 
  }
 
// console.log('====================================');
// console.log(form);
// console.log('====================================');
 
    try {
      const response = await saveTickets(form);

      setShowLoading(false);
      setShowNotification(true);
      dispatch(resetForm());
      setNotificationType('success');
  
    } catch (error:any) {
    
      setMessage(error.data[0]);
      setShowLoading(false);
      setShowNotification(true);
      setNotificationType('error');

    }
  };

  const RegistroComponent = () => {
    const [comment, setComment] = useState('');

    return (
      <View style={styles.containerItem}>
         {showLoading && <LoadingComponent isLoading={showLoading} />}

        <View style={styles.detallaLaIncidenciaParent}>
          <Text style={[styles.detallaLaIncidencia, styles.textTypo]}>
            Detalla la incidencia
          </Text>
          <View style={[styles.nContratoParent, styles.parentFlexBox1]}>
            <Text style={[styles.detallaLaIncidencia, styles.textTypo]}>
              Nº Contrato
            </Text>
            <Text style={[styles.text, styles.textTypo]}>12345</Text>
          </View>
          <View style={styles.parentFlexBox}>
  {/* Resto del código */}
  <TouchableOpacity onPress={pickImage}>
    <LinearGradient
      style={[styles.vectorParent, styles.parentFlexBox]}
      locations={[0.04, 1]}
      colors={['#e20a17', '#e20a17']}
      useAngle={true}
      angle={180}>
      {selectedImageUri  ? (
        <Image source={{ uri: selectedImageUri  }} style={styles.vectorIcon} resizeMode="cover" />
      ) : (
        <Image source={require('../../../../assets/icons/home/multimedia.png')} style={styles.vectorIcon} resizeMode="cover" />
      )}
      <View style={styles.subeUnaImagenParent}>
        <Text style={[styles.subeUnaImagen, styles.subeUnaImagenFlexBox]}>Sube una imagen</Text>
        <Text style={[styles.formatosAdmitidosJpg, styles.subeUnaImagenFlexBox]}>
          Formatos admitidos: JPG y PNG
        </Text>
        {/* {imageName ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginRight: 5 }}>{imageName}</Text>
            <TouchableOpacity onPress={() => setImage(null)}>
              <Icon name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : null} */}
      </View>
    </LinearGradient>
  </TouchableOpacity>
</View>
         
          <View style={styles.parentFlexBox}>
            <Controller
              name="department"
              control={control}
              defaultValue={depto.name}
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity style={styles.formSeleccinMetodosDePag} onPress={() => openDialog(<CardDepartments onClose={() => setShowDialog(false)}/>)}>
                  <Text style={[styles.metodoDePago, styles.text1Typo]}>
                    Departamento
                  </Text>
                  <View style={[styles.metodoDePagoParent, styles.parentWrapperBorder]}>
                    <Text style={[styles.text1, styles.text1Typo]}>{value}</Text>
                    <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              )}
            />
             {errors.department && (
            <Text style={styles.errorText}>{(errors.department as any).message}</Text>
          )}
            <Controller
              name="issue"
              control={control}
              defaultValue={iss.name}
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity style={styles.formSeleccinMetodosDePag} onPress={() => openDialog(<CardIssues onClose={() => setShowDialog(false)}/>)}>
                  <Text style={[styles.metodoDePago, styles.text1Typo]}>Asunto</Text>
                  <View style={[styles.metodoDePagoParent, styles.parentWrapperBorder]}>
                    <Text style={[styles.text1, styles.text1Typo]}>{value}</Text>
                    <Icon name="keyboard-arrow-down" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              )}
            />
              {errors.issue && (
            <Text style={styles.errorText}>{(errors.issue as any).message}</Text>
          )}
          </View>
          <View style={[styles.formUsuarioParent, styles.parentFlexBox1]}>
            <View>
              <Text style={[styles.nDeTelfono, styles.text1Typo]}>
                Comentario
              </Text>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.zathit17Wrapper, styles.parentWrapperBorder, { height: Math.max(80, value.split('\n').length * 20) }]}
                    multiline
                    maxLength={1000}
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                      setComment(text);
                    }}
                  />
                )}
              />
            </View>
            {errors.description && (
            <Text style={styles.errorText}>{(errors.description as any).message}</Text>
          )}
            <Text style={[styles.hasta1000Caracteres, styles.text1Typo]}>
              {`${comment.length}/1000 caracteres`}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.botonesBotnPrincipal} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.iniciarSesin}>Crear nuevo ticket</Text>
        </TouchableOpacity>
        <DialogComponent visible={showDialog} onClose={toggleDialog}>
          {dialogContent}
        </DialogComponent>

        <DialogNotificationComponent visible={showNotification} onClose={() => setShowNotification(false)}>
                {notificationType === 'success' && <SuccesComponent onClose={() => setShowNotification(false)} message={"Se ha generado un ticket para que puedas ver el avance de la solicitud"} route={"Tickets"} />}
                {notificationType === 'error' && <ErrorComponent onClose={() => setShowNotification(false)} message={message} />}
            </DialogNotificationComponent>
      </View>
    );
  };

  return (
    <LayoutPrimary>
      <BackButton title={'Nuevo Ticket'} />

      <ScrollView style={styles.container}>
        <RegistroComponent />
      </ScrollView>
    </LayoutPrimary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    alignContent: 'center',
    alignItems: 'center',
  },
  iniciarSesin: {
    fontSize: percentWidth(4),
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: '#fafafa',
    textAlign: 'left',
  },
  botonesBotnPrincipal: {
    borderRadius: percentWidth(2),
    backgroundColor: '#e20a17',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: percentWidth(8),
    paddingVertical: percentHeight(1.5),
    marginTop: percentHeight(2),
    marginBottom: percentHeight(2),
  },
  textTypo: {
    textAlign: 'left',
    fontSize: percentWidth(4),
  },
  parentFlexBox1: {
    justifyContent: 'center',
    marginTop: percentHeight(2),
  },
  parentFlexBox: {
    alignSelf: 'stretch',
    marginTop: percentHeight(2),
  },
  subeUnaImagenFlexBox: {
    textAlign: 'center',
    color: '#fff',
  },
  text1Typo: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    color: '#fff',
  },
  parentWrapperBorder: {
    paddingVertical: percentHeight(1.5),
    borderWidth: 0.5,
    borderColor: '#fafafa',
    borderRadius: percentWidth(2),
    flexDirection: 'row',
    paddingHorizontal: percentWidth(4),
    alignItems: 'center',
    borderStyle: 'solid',
    color:'#fff'
  },
  detallaLaIncidencia: {
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    textAlign: 'left',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: '#fafafa',
    marginTop: percentHeight(2.5),
    fontWeight: '600',
  },
  nContratoParent: {
    marginTop: percentHeight(2),
    alignItems: 'center',
  },
  vectorIcon: {
    width: percentWidth(9.5),
    height: percentWidth(9.5),
  },
  subeUnaImagen: {
    fontSize: percentWidth(4.25),
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  formatosAdmitidosJpg: {
    fontSize: percentWidth(3.25),
    fontFamily: 'Inter-Regular',
    marginTop: percentHeight(2.1),
  },
  subeUnaImagenParent: {
    marginTop: percentHeight(4.2),
    alignItems: 'center',
  },
  vectorParent: {
    borderRadius: percentWidth(4.25),
    height: percentHeight(17.75),
    padding: percentWidth(4.25),
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  nDeTelfono: {
    fontSize: percentWidth(3.5),
    fontFamily: 'Roboto-Regular',
  },
  text1: {
    fontSize: percentWidth(4),
    fontFamily: 'Roboto-Regular',
  },
  zathit17Wrapper: {
    width: percentWidth(80),
    marginTop: percentHeight(2),
  },
  metodoDePago: {
    opacity: 0,
    fontSize: percentWidth(3.5),
    fontFamily: 'Roboto-Regular',
  },
  metodoDePagoParent: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  formSeleccinMetodosDePag: {
    marginTop: percentHeight(1),
    width: percentWidth(80),
  },
  intentoHacerEl: {
    fontSize: percentWidth(4),
    fontFamily: 'Roboto-Regular',
  },
  hasta1000Caracteres: {
    fontSize: percentWidth(3),
    width: percentWidth(50),
    marginTop: percentHeight(2),
  },
  formUsuarioParent: {
    alignItems: 'flex-end',
  },
  detallaLaIncidenciaParent: {
    borderRadius: percentWidth(4),
    backgroundColor: 'rgba(171, 170, 170, 0.26)',
    borderColor: '#fff',
    borderWidth: 0.4,
    width: '90%',
    paddingVertical: percentHeight(4),
    paddingHorizontal: percentWidth(4),
    borderStyle: 'solid',
    alignItems: 'center',
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
});

export default RegistroTicketView;
