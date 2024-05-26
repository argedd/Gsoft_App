// data/menuItems.js

export interface ClienteMenuItem {
    id: string;
    title: string;
    icon:string;
  }
   const menuCilenteItems: ClienteMenuItem[] = [
      { id: '1', title: 'Afilición de Cuentas', icon:'bank-plus' },
      { id: '2', title: 'Actualizar Contraseña', icon:'form-textbox-password' },
      { id: '3', title: 'Editar Datos', icon:'account-edit-outline' },
   
    ];
    
    export default menuCilenteItems;