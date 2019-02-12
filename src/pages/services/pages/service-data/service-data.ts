import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ServicesListPage } from "../services-list/services-list";

@Component({
  selector: "service-data",
  templateUrl: "service-data.html"
})
export class ServiceDataPage {
  serviceItems = [
    {
      name: "روغن موتور",
      status: "changed"
    },
    {
      name: "فیلتر روغن",
      status: "ok"
    },
    {
      name: "فیلتر هوا",
      status: "fail"
    },
    {
      name: "فیلتر کابین",
      status: "ok"
    },
    {
      name: "فیلتر سوخت",
      status: "ok"
    },
    {
      name: "روغن گیربکس",
      status: "ok"
    },
    {
      name: "روغن هیدرولیک",
      status: "ok"
    },
    {
      name: "ترمز جلو",
      status: "ok"
    },
    {
      name: "ترمز عقب",
      status: "ok"
    },
    {
      name: "شمع",
      status: "fail"
    },
    {
      name: "کابل شمع",
      status: "changed"
    }
  ];

  constructor(public navCtrl: NavController) {}

  navToPrevPage() {
    this.navCtrl.push(ServicesListPage);
  }
}
