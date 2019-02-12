import { API } from "./api";

export interface ServiceAPI extends API {
  service: Service;
}
export interface ServicesListAPI extends API {
  periodicServices: Service[];
}
export interface ServiceItemsAPI extends API {
  serviceItems: ServiceItem[];
}

export interface Service {
  id: number;
  title: string;
  carId: number;
  date: string;
  totalCost: string;
  garageName: string;
  garageId: number;
  creatorId: number;
  isPeriodicService: boolean;
  serviceItems: ServiceItem[];
}
export interface ServiceItem {
  checkPeriodic: boolean;
  englishName: string;
  id: number;
  persianName: string;
  unit: string;
  status: ServiceItemStatus;
}

export enum ServiceItemStatus {
  ok = "OK",
  changed = "CHANGED",
  failed = "FAIL"
}
