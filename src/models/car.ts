import { API } from "./api";

export interface CarAPI extends API {
    cars: Car[]
}

export interface Car {
  modelId: string;
  colorId: string;
  image;
  name: string;
  plate: string;
  odometer: string;
  builtyear: string;
}


export interface CarBrandsAPI extends API {
    carBrands: CarBrand[];
}

export interface CarBrand {
  id: string;
  englishName: string;
  persianName: string;
  logo: string;
}

export interface CarColorsAPI extends API {
    colors: CarColor[];
}

export interface CarColor {
  id: string;
  englishName: string;
  persianName: string;
  code: string;
}

export interface CarModelsAPI extends API {
    carModels: CarModel[];
}

export interface CarModel {
  id: string;
  englishName: string;
  persianName: string;
  carBrandId: string;
}