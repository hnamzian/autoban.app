import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { NewServicePage } from "./pages/new-service/new-service"
import { ServiceDataPage } from "./pages/service-data/service-data"
import { ServicesListPage } from "./pages/services-list/services-list"
// import {} from "./pages/vehicle-periodic-services/vehicle-periodic-services"

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    NewServicePage,
    ServiceDataPage,
    ServicesListPage
  ],
  entryComponents: [
    NewServicePage,
    ServiceDataPage,
    ServicesListPage,
  ]
})
export class ServicesModule {}