import { LoginSchema } from "@/schemas";
import { z } from "zod";

export type FormsFields = z.infer<typeof LoginSchema>;

export interface LoginCredentials {
  EmployeeId: string;
  Password: string;
}