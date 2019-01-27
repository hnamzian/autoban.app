import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { CoreModule } from "../core/core.module";
import { CarProfilePage } from "./pages/car-profile/car-profile";
import { RegisterCarProfilePage } from "./pages/register-car-profile/register-car-profile";

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule, CoreModule],
  declarations: [CarProfilePage, RegisterCarProfilePage],
  entryComponents: [CarProfilePage, RegisterCarProfilePage]
})
export class CarModule {}
