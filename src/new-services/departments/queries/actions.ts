import httpClient from "@/helpers/httpClient";
import { Department } from "@/new-types";

export async function getAllDepartments() {
  const departments = await httpClient<Department[]>({
    method: "GET",
    endpoint: "/departments",
  });
  return departments;
}

export async function getDepartmentById(departmentId: number) {
  const department = await httpClient<Department>({
    method: 'GET',
    endpoint: `/departments/${departmentId}`,
  });
  return department;
}
