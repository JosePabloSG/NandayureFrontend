import { z } from 'zod';

export const DepartmentSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }), // Mensaje personalizado para campos vacíos
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  departmentProgramId: z
    .number({
      invalid_type_error:
        'El ID del programa departamental debe ser un número.',
    })
    .min(1, { message: 'El ID del programa departamental es requerido' }),
});

export const UpdateDepartmentSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  departmentProgramId: z
    .number({
      invalid_type_error:
        'El ID del programa departamental debe ser un número.',
    })
    .min(1, 'El ID del programa departamental es requerido'),
});
