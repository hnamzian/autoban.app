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
  bulityear: string;
}

export interface BrandItem {
  id: string;
  englishName: string;
  persianName: string;
  logo: string;
}

export interface CarBrands {
  success: boolean;
  carBrands: BrandItem[];
}

export interface ColorItem {
  id: string;
  englishName: string;
  persianName: string;
  code: string;
}

export interface CarColors {
  success: boolean;
  colors: ColorItem[];
}

export interface ModelItem {
  id: string;
  englishName: string;
  persianName: string;
  carBrandId: string;
}

export interface CarModels {
  success: boolean;
  carModels: ModelItem[];
}
