import * as Yup from 'yup';

export const gtvSchema = Yup.object().shape({
    user: Yup.string(),
    password: Yup.string()
    .required('Contraseña es Requerida'),
    pin: Yup.string()
    .required('PIN es Requerido.')
    .min(4,'Pin debe ser de 4 Digitos')
  });