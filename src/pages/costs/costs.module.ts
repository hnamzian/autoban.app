import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { VehicleCostsPage } from "./pages/vehicle-costs/vehicle-costs";
import { FuelCostsPage } from "./pages/fuel-costs/fuel-costs"
import { FineCostsPage } from "./pages/fine-costs/fine-costs"
import { OthersCostsPage } from "./pages/others-costs/others-costs"
import { PeriodicCostsPage } from "./pages/periodic-costs/periodic-costs"
import { NewFuelCostPage } from "./pages/new-fuel-cost/new-fuel-cost"
import { NewFineCostPage } from "./pages/new-fine-cost/new-fine-cost"
import { NewOthersCostPage } from "./pages/new-others-cost/new-others-cost"
import { NewPeriodicCostPage } from "./pages/new-periodic-cost/new-periodic-cost"

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage,
    PeriodicCostsPage,
    NewFuelCostPage,
    NewFineCostPage,
    NewOthersCostPage,
    NewPeriodicCostPage
  ],
  entryComponents: [
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage,
    PeriodicCostsPage,
    NewFuelCostPage,
    NewFineCostPage,
    NewOthersCostPage,
    NewPeriodicCostPage
  ]
})
export class CostsModule {}