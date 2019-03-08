import { Component, OnInit } from "@angular/core";
import { NavController, ViewController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../../../providers/services/services";
import { ServiceItem, ServiceItemStatus, Service } from "../../../../models/service";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";

@Component({
  selector: "new-service-sheet",
  templateUrl: "new-service-sheet.html"
})
export class NewServiceSheetPage implements OnInit {
  serviceTypes = [] as ServiceItem[];
  serviceItems = [] as ServiceItem[];
  serviceList = {} as Service;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public servicesProvider: ServicesProvider
  ) {
    this.serviceList = this.navParams.get("serviceList");
  }

  async ngOnInit() {
    let services$ = await this.servicesProvider.getServiceItems();
    services$.subscribe(items => {
      this.serviceTypes = items.serviceItems;
    });
  }

  onChangedItem(item) {
    for (let serviceItem of this.serviceItems) {
      if (serviceItem === item) {
        serviceItem.status = ServiceItemStatus.changed;
        return;
      }
    }

    let newServiceitem = item;
    newServiceitem.status = ServiceItemStatus.changed;
    this.serviceItems.push(newServiceitem);
    return;
  }

  onOKItem(item) {
    for (let serviceItem of this.serviceItems) {
      if (serviceItem === item) {
        serviceItem.status = ServiceItemStatus.ok;
        return;
      }
    }

    let newServiceitem = item;
    newServiceitem.status = ServiceItemStatus.ok;
    this.serviceItems.push(newServiceitem);
    return;
  }

  onFailedItem(item) {
    for (let serviceItem of this.serviceItems) {
      if (serviceItem === item) {
        serviceItem.status = ServiceItemStatus.failed;
        return;
      }
    }

    let newServiceitem = item;
    newServiceitem.status = ServiceItemStatus.failed;
    this.serviceItems.push(newServiceitem);
    return;
  }

  async addServiceSheet() {
    this.serviceList.serviceItems = this.serviceItems;
    console.log(this.serviceList);

    let service$ = await this.servicesProvider.addService(this.serviceList);
    service$.subscribe(console.log);

    this.viewCtrl.dismiss(this.serviceItems, "", { animate: false });
  }
}
