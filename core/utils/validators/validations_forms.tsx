// utils/validation.ts
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  digito: Yup.string(),
  cedula: Yup.string()
    .required('Cédula es Requerida.')
    .matches(/^[0-9]+$/, 'la Cédula debe ser numérica')
    .min(6, 'la Cédula debe tener al menos 6 dígitos'),
  password: Yup.string()
    .required('Contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const recuperarSchema = Yup.object().shape({
  cedula: Yup.string()
    .required('Cédula es Requerida.')
    .matches(/^[0-9]+$/, 'la Cédula debe ser numérica')
    .min(6, 'la Cédula debe tener al menos 6 dígitos'),
    digito: Yup.string()
});


export const pagoMovilSchema = Yup.object().shape({
  areaCode: Yup.string(),
    phoneNumber: Yup.string()
  .required('Teléfono es Requerido.')
    .matches(/^[0-9]+$/, 'eléfono debe ser numéric0')
    .max(7, 'la Operadora debe tener maximo 7 dígitos')
    .min(7, 'la Operadora debe tener maximo 7 dígitos'),
    referenceNumber: Yup.string()
  .required('Referencia es Requerida.')
  .matches(/^[0-9]+$/, 'la referencia debe ser numérica')
  .min(6, 'la referencia debe tener al menos 6 dígitos'),
  alias: Yup.string()

});

export const transferenciaSchema = Yup.object().shape({
  accountNumber: Yup.string()
  .required('Cuenta es Requerida.')
  .matches(/^[0-9]+$/, 'la cuenta debe ser numérica')
  .min(6, 'Nro de Cuenta debe tener al menos 6 dígitos'),
  referenceNumber: Yup.string()
  .required('Referencia es Requerida.')
  .matches(/^[0-9]+$/, 'la referencia debe ser numérica')
  .min(6, 'la referencia debe tener al menos 6 dígitos'),
  alias: Yup.string()

});


export const zelleSchema = Yup.object().shape({
  titular: Yup.string()
  .required('Titular es Requerido.'),
  amount: Yup.string()
  .required('Monto es Requerido.'),
  date: Yup.string()
  .required('Fecha de pago requerida.'),
  alias: Yup.string()

});


export const pagoMovilRegSchema = Yup.object().shape({
  areaCode: Yup.string(),
    phoneNumber: Yup.string()
  .required('Teléfono es Requerido.')
    .matches(/^[0-9]+$/, 'eléfono debe ser numéric0')
    .max(7, 'la Operadora debe tener maximo 7 dígitos')
    .min(7, 'la Operadora debe tener maximo 7 dígitos'),
  alias: Yup.string()
  .required('Alias es Requerido')

});

export const trfRegSchema = Yup.object().shape({
  accountNumber: Yup.string()
  .required('Cuenta es Requerida.')
  .matches(/^[0-9]+$/, 'la cuenta debe ser numérica')
  .min(6, 'Nro de Cuenta debe tener al menos 6 dígitos'),
  alias: Yup.string()
  .required('Alias es Requerido')

});


export const zelleRegSchema = Yup.object().shape({
  titular: Yup.string()
  .required('Titular es Requerido.'),
  alias: Yup.string()
  .required('Alias es Requerido'),
  email: Yup.string()
  .email('Correo electrónico no es válido.')
  .required('Correo electrónico es Requerido.')
});

