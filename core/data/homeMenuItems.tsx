// data/menuItems.js

import { RootStackParamListRoute } from "../navigations/routes/app_routes";

export interface IMenuItem {
  id: string;
  title: string;
  icon:string;
  route:keyof RootStackParamListRoute;
}
 const menuItems: IMenuItem[] = [
    // { id: '1', title: 'Gestión de Router', icon:require('../assets/icons/home/gestion-router.png'), route:'Configuracion' },
    { id: '2', title: 'Gestión de Planes', icon:require('../assets/icons/home/gestion-planes.png'),route:'Gestion' },
    { id: '3', title: 'Facturación', icon:require('../assets/icons/home/facturas.png'),route:'Facturacion' },
    { id: '4', title: 'Mis Tickets', icon:require('../assets/icons/home/ticket.png'),route:'Tickets' },
    // { id: '5', title: 'Prueba de velocidad', icon:'speedometer',route:'Test' },
    { id: '6', title: 'Uso de datos', icon:require('../assets/icons/home/datos.png'),route:'Estadisticas' },
  ];
  
  export default menuItems;