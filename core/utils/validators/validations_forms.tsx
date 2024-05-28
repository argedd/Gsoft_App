// utils/validation.ts
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  cedula: Yup.string()
    .required('Cédula es Requerida.')
    .matches(/^[0-9]+$/, 'la Cédula debe ser numérica')
    .min(6, 'la Cédula debe tener al menos 6 dígitos'),
  password: Yup.string()
    .required('Contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  tipoDocumento: Yup.string()
});

export const recuperarSchema = Yup.object().shape({
  cedula: Yup.string()
    .required('Cédula es Requerida.')
    .matches(/^[0-9]+$/, 'la Cédula debe ser numérica')
    .min(6, 'la Cédula debe tener al menos 6 dígitos'),
  tipoDocumento: Yup.string()
});
