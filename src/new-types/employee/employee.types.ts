import { Person } from "../person/person.types";

export interface Employee extends Person {
  id: string;
  HiringDate: string | Date;
  NumberChlidren: number;
  AvailableVacationDays: number;
  MaritalStatusId: number;
  GenderId: number;
  JobPositionId: number;
}