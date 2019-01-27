import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import {
  MenuHeaderComponent,
  UserMenu,
  CarsMenuPopover
} from "./components/menu-header/menu-header";
import { PrepInputComponent } from "./components/prep-input/prep-input";
import { AuthHeaderComponent } from "./components/auth-header/auth-header";
import { DatePickerCompponent } from "./components/date-picker/date-picker";
import { SelectListComponent } from "./components/select-list/select-list";
import { ImageResSelection } from "./components/image-res-selection/image-res-selection"

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    MenuHeaderComponent,
    UserMenu,
    CarsMenuPopover,
    PrepInputComponent,
    AuthHeaderComponent,
    DatePickerCompponent,
    SelectListComponent,
    ImageResSelection
  ],
  entryComponents: [UserMenu, CarsMenuPopover, SelectListComponent, ImageResSelection],
  exports: [
    MenuHeaderComponent,
    PrepInputComponent,
    AuthHeaderComponent,
    DatePickerCompponent,
  ]
})
export class CoreModule {}
