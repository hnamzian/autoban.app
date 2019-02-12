import { API } from "./api";

export interface ReceiptAPI extends API, Receipt {}
export interface Receipt {
  title: string;
  date: string;
  totalCost: string;
  shopName: string;
  repairId: string;
  receipImage: string;
}
