import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { CoreModule } from "../core/core.module"
import { NewServiceFormPage } from "./pages/new-service-form/new-service-form";
import { NewServiceSheetPage } from "./pages/new-service-sheet/new-service-sheet";
import { ServiceDataPage } from "./pages/service-data/service-data";
import { ServicesListPage } from "./pages/services-list/services-list";
import { ServiceItemComponent } from "./components/service-item/service-item";

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule],
  declarations: [
    NewServiceFormPage,
    NewServiceSheetPage,
    ServiceDataPage,
    ServicesListPage,
    ServiceItemComponent
  ],
  entryComponents: [
    NewServiceFormPage,
    NewServiceSheetPage,
    ServiceDataPage,
    ServicesListPage,
    ServiceItemComponent
  ]
})
export class ServicesModule {}
