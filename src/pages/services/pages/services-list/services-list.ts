import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
import { ServiceDataPage } from "../service-data/service-data";
import { NewServiceFormPage } from "../new-service-form/new-service-form";
import { ServicesProvider } from "../../../../providers/services/services";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";
import { ServiceItem, Service } from "../../../../models/service";
import * as moment from "moment";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";

@Component({
  selector: "services-list",
  templateUrl: "services-list.html"
})
export class ServicesListPage implements OnInit {
  title = "سرویس ها";
  selectedCar: Car;
  services = [] as Service[];
  newServiceItems;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public carStorage: CarStorage,
    public servicesProvider: ServicesProvider
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();
    let services$ = await this.servicesProvider.getServices(this.selectedCar.id);
    services$.subscribe(result => {
      this.services = result.periodicServices;
      this.services = this.services.map(service => {
        service.date = moment(service.date).format("YYYY-MM-DD");
        return service;
      });
      console.log(this.services);
    });
  }

  addService() {
    const popover = this.popoverCtrl.create(NewServiceFormPage, {}, { cssClass: "servicePopover" });
    popover.present();
    popover.onDidDismiss(data => {
      this.newServiceItems = data;
      console.log(this.newServiceItems);
    });
  }

  showServiceSheet(service) {
    this.navCtrl.push(ServiceDataPage, { service });
  }

  navToHome() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
