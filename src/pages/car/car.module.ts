import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { CoreModule } from "../core/core.module";
import { VehicleProfilePage } from "./pages/vehicle-profile/vehicle-profile";
import { RegisterCarProfilePage } from "./pages/register-car-profile/register-car-profile";

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule],
  declarations: [VehicleProfilePage, RegisterCarProfilePage],
  entryComponents: [VehicleProfilePage, RegisterCarProfilePage]
})
export class CarModule {}
