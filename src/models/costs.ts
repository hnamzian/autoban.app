import { API } from "../models/api";

export interface FuelCostAPI extends API {
  fuel: FuelCost;
}
export interface FuelCost {
  date: string;
  station: string;
  cost: string;
  odometer: string;
  litre: string;
}

export interface FineCostAPI extends API {
  id: string;
  costId: string;
  fineCategoryCode: string;
  cost: {
    id: string;
    carId: string;
    type: string;
    date: string;
    value: string;
    comment: string;
  };
}
export interface FineCost {
  date: string;
  value: string;
  fineCategoryCode: number;
  comment: string
}

export interface PeriodicCostAPI extends API {
  cost: PeriodicCost;
}
export interface PeriodicCost {
  date: string;
  title: string;
  cost: string;
  period: string;
  location: string;
}

export interface OthersCostAPI extends API {
  cost: OthersCost;
}
export interface OthersCost {
  title: string;
  date: string;
  cost: string;
}
