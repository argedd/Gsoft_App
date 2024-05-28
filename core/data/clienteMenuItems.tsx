// data/menuItems.js

import { RootStackParamListRoute } from "../navigations/routes/app_routes";

export interface ClienteMenuItem {
    id: string;
    title: string;
    icon:string;
    route:keyof RootStackParamListRoute;
  }
   const menuCilenteItems: ClienteMenuItem[] = [
      { id: '1', title: 'Afilición de Cuentas', icon:require('../assets/icons/user/afiliacion-cuentas.png'), route:'Configuracion'},
      { id: '2', title: 'Actualizar Contraseña', icon:require('../assets/icons/user/gestion-clave.png'), route:'Configuracion' },
      { id: '3', title: 'Editar Datos', icon:require('../assets/icons/user/editar-datos.png'), route:'Configuracion' },
   
    ];
    
    export default menuCilenteItems;