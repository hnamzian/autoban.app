import { API } from "./api";

export interface RepairsAPI extends API {
  repairs: Repair[];
}

export interface Repair {
  id: string;
  title: string;
  date: string;
  totalCost: string;
  garageName: string;
  garageId: number;
  carId: number;
  isPeriodicService: boolean;
}
