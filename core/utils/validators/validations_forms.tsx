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


export const pagoMovilSchema = Yup.object().shape({
  areaCode: Yup.string()
    .required('Operadora es Requerida.')
    .matches(/^[0-9]+$/, 'la Operadora debe ser numérica')
    .min(4, 'la Operadora debe tener maximo 4 dígitos')
    .max(4, 'la Operadora debe tener maximo 4 dígitos'),
    phoneNumber: Yup.string()
  .required('Teléfono es Requerid0.')
    .matches(/^[0-9]+$/, 'eléfono debe ser numéric0')
    .max(7, 'la Operadora debe tener maximo 7 dígitos')
    .min(7, 'la Operadora debe tener maximo 7 dígitos'),
    referenceNumber: Yup.string()
  .required('Referencia es Requerida.')
  .matches(/^[0-9]+$/, 'la referencia debe ser numérica')
  .min(6, 'la referencia debe tener al menos 6 dígitos'),
  alias: Yup.string()

});