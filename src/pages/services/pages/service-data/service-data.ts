import { ServiceItem } from "./../../../../models/service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { ServicesListPage } from "../services-list/services-list";
import { ServicesProvider } from "../../../../providers/services/services";

@Component({
  selector: "service-data",
  templateUrl: "service-data.html"
})
export class ServiceDataPage implements OnInit {
  serviceItems: ServiceItem[];

  constructor(public navCtrl: NavController, public servicesProvider: ServicesProvider) {}

  async ngOnInit() {
    // let serviceItems$ = await this.servicesProvider.getServiceItems();
    // serviceItems$.subscribe(result => {
    //   this.serviceItems = result.serviceItems;
    // });
  }

  navToPrevPage() {
    this.navCtrl.push(ServicesListPage);
  }
}
