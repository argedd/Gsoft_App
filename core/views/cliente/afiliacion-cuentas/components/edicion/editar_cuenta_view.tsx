import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../../../../components/components';
import LayoutPrimary from '../../../../../components/layouts/layout_primary';
import { RootStackParamListRoute } from '../../../../../navigations/routes/app_routes';
import { RouteProp, useRoute } from '@react-navigation/native';
import EditPagoMovilForm from './components/edit_pm';
import EditTransferenciaForm from './components/edit_trf';
import EditZelleForm from './components/edit_zelle';



type NavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
    navigation: NavigationProp;
}

const EditarCuentaView: React.FC<Props> = ({ navigation },) => {
    const route = useRoute<RouteProp<RootStackParamListRoute, 'EditarCuenta'>>();
    const { method } = route.params;


    const renderComponent = () => {
        switch (method.method) {
            case 1:
                return <EditPagoMovilForm method={method} />;
            case 3:
                return <EditZelleForm method={method} />;
            case 4:
                return <EditTransferenciaForm method={method} />;

        }
    };

    const EditarComponent = () => (
        <View style={styles.container}>
            <BackButton title={'Detalle de Cuenta'} />

            {renderComponent()}


        </View>

    );
    return (

        <LayoutPrimary>
            <EditarComponent />
        </LayoutPrimary>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 50,
    },


});
export default EditarCuentaView