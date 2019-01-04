import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ServiceDataPage } from "../service-data/service-data";

@Component({
  selector: "services-list",
  templateUrl: "services-list.html"
})
export class ServicesListPage {
  services = [
    {
      date: "1/2/2018",
      title: "Full Service",
      repairMan: "Raghebi",
      cost: 120000
    },
    {
      date: "1/5/2018",
      title: "Full Service",
      repairMan: "Raghebi",
      cost: 100000
    },
    {
      date: "1/8/2018",
      title: "Full Service",
      repairMan: "Raghebi",
      cost: 80000
    },
    {
      date: "1/11/2018",
      title: "Full Service",
      repairMan: "Raghebi",
      cost: 120000
    },
    {
      date: "1/2/2019",
      title: "Full Service",
      repairMan: "Raghebi",
      cost: 120000
    }
  ];

  constructor(public navCtrl: NavController) {}

  addNewService() {}

  openServiceData() {
    this.navCtrl.push(ServiceDataPage);
  }
}
