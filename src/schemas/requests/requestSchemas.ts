import { z } from "zod";

export const SalaryCertificateSchema = z.object({
  reason: z.string().min(1, 'El motivo es requerido').max(100, 'El motivo no puede tener más de 100 caracteres'),
});

export const PaySlipSchema = z.object({
  reason: z.string().min(1, 'El motivo es requerido').max(100, 'El motivo no puede tener más de 100 caracteres'),
});

export const VacationSchema = z.object({
  daysRequested: z.number().int().min(1, 'Los días solicitados deben ser mayor a 0'),
  departureDate: z.date().min(new Date(), 'La fecha de salida debe ser mayor a la fecha actual'),
  entryDate: z.date().min(new Date(), 'La fecha de entrada debe ser mayor a la fecha actual'), 
});