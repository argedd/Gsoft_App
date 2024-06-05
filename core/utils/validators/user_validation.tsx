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
      .test('passwords-match', 'Las contraseñas deben coincidir', function(value) {
          return this.parent.newPassword === value;
      }),
});
