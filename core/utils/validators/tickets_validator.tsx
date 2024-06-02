import * as Yup from 'yup';

export const ticketsSchema = Yup.object().shape({
  issue: Yup.string()
  .required('Asunto es Requerido'),
  department: Yup.string()
  .required('Departamento es Requerido'),
  description: Yup.string()
    .required('Descripcion es Requerida.')
    .min(10, 'la Descripcion debe tener al menos 10 dígitos')
    .max(1000, 'la Descripcion debe tener como max 1000 dígitos'),
});