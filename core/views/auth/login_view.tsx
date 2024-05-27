// views/LoginView.tsx
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import LayoutSecondary from '../../components/layouts/layout_secondary';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import LoginComponent from './components/login_form_component';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const LoginView: React.FC<Props> = ({ navigation }) => {
  return (
    <LayoutSecondary>
      <LoginComponent navigation={navigation} />
    </LayoutSecondary>
  );
};

export default LoginView;
