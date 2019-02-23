import { API } from "../models/api";

export interface Cost {
  carId: number;
  comment: string;
  date: string;
  id: string;
  type: string;
  value: string;
}

export interface Fuel {
  cost: Cost;
  id: string;
  costId: string;
  isFull: boolean;
  odometer: string;
  stationName: string;
  type: string;
  volume: string;
}
export interface FuelAPI extends API {
  fuel: Fuel;
}
export interface AllFuelsAPI {
  fuels: Fuel[];
}

export interface Fine {
  cost: Cost;
  id: string;
  fineCategoryCode: string;
  fine_category: string;
  costId: string;
}
export interface FineAPI extends API {
  fine: Fine;
}
export interface AllFinesAPI {
  fines: Fine[];
}

export interface PeriodicCost {
  cost: Cost;
  id: string;
  costId: string;
}
export interface PeriodicCostAPI extends API {
  periodicCost: PeriodicCost;
}
export interface AllPeriodicCostAPI {
  periodicCosts: PeriodicCost[];
}

export interface OthersCost {
  cost: Cost;
  id: string;
  costId: string;
}
export interface OthersCostAPI extends API {
  othersCost: OthersCost;
}
export interface AllOthersCostAPI {
  costs: Cost[];
}
