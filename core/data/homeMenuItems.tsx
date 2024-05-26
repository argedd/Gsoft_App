// data/menuItems.js

import { RootStackParamListRoute } from "../navigations/routes/app_routes";

export interface IMenuItem {
  id: string;
  title: string;
  icon:string;
  route:keyof RootStackParamListRoute;
}
 const menuItems: IMenuItem[] = [
    { id: '1', title: 'Configuración de Router', icon:'router-wireless-settings', route:'Configuracion' },
    { id: '2', title: 'Gestión de Planes', icon:'cellphone-cog',route:'Gestion' },
    { id: '3', title: 'Facturación', icon:'file-percent-outline',route:'Facturacion' },
    { id: '4', title: 'Mis Tickets', icon:'ticket-account',route:'Tickets' },
    { id: '5', title: 'Prueba de velocidad', icon:'speedometer',route:'Test' },
    { id: '6', title: 'Uso de datos', icon:'chart-bar',route:'Estadisticas' },
  ];
  
  export default menuItems;