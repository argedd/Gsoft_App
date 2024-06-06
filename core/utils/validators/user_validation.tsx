import * as Yup from 'yup';

export const passwordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    newPassword: Yup.string()
        .required('Contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string()
        .required('Confirmar contraseña es requerido')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .test('passwords-match', 'Las contraseñas deben coincidir', function (value) {
            return this.parent.newPassword === value;
        }),
});


export const editDataSchema = Yup.object().shape({
    fullName: Yup.string(),
    email: Yup.string()
        .email('Correo electrónico no es válido.')
        .required('Correo electrónico es Requerido.'),
    areaCode: Yup.string(),
    phoneNumber1: Yup.string()
        .required('Teléfono es Requerido.')
        .matches(/^[0-9]+$/, 'eléfono debe ser numéric0')
        .max(7, 'la Operadora debe tener maximo 7 dígitos')
        .min(7, 'la Operadora debe tener maximo 7 dígitos'),
    areaCode2: Yup.string(),
    phoneNumber2: Yup.string()
        .required('Teléfono es Requerido.')
        .matches(/^[0-9]+$/, 'eléfono debe ser numéric0')
        .max(7, 'la Operadora debe tener maximo 7 dígitos')
        .min(7, 'la Operadora debe tener maximo 7 dígitos'),

});
