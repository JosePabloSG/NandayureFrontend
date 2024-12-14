import { Employee } from "@/types";
import { RegisterSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { postEmployee } from "@/new-services";

export type FormsFields = z.infer<typeof RegisterSchema>;

export const useRegisterMutation = (setError: UseFormSetError<FormsFields>) => {
  return useMutation({
    mutationFn: async (data: Employee) => await postEmployee(data),
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};

export const convertEmployeeTypes = (employee: any): Employee => {
  return {
    id: employee.id,
    Name: employee.Name,
    Surname1: employee.Surname1,
    Surname2: employee.Surname2,
    Birthdate: new Date(employee.Birthdate),
    HiringDate: new Date(employee.HiringDate),
    Email: employee.Email,
    CellPhone: employee.CellPhone,
    NumberChlidren: parseInt(employee.NumberChlidren, 10),
    JobPositionId: parseInt(employee.JobPositionId, 10),
    AvailableVacationDays: parseInt(employee.AvailableVacationDays, 10),
    MaritalStatusId: parseInt(employee.MaritalStatusId, 10),
    GenderId: parseInt(employee.GenderId, 10),
  };
};