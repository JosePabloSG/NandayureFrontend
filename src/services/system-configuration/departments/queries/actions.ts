import { Department } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';

/**
 * Obtiene todos los departamentos
 * 
 * @returns {Promise<Department[]>} Promesa que resuelve con la lista de departamentos
 */
export const getAllDepartments = async (): Promise<Department[]> => {
  return await httpClient.get<Department[]>(ROUTES.DEPARTMENTS.BASE);
};

/**
 * Obtiene un departamento por su ID
 * 
 * @param {number} departmentId - ID del departamento
 * @returns {Promise<Department>} Promesa que resuelve con el departamento solicitado
 */
export const getDepartmentById = async (departmentId: number): Promise<Department> => {
  return await httpClient.get<Department>(ROUTES.DEPARTMENTS.BY_ID(departmentId));
};