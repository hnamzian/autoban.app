import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "service-data",
  templateUrl: "service-data.html"
})
export class ServiceDataPage {
  serviceItems = [
    {
      name: "Engine Oil",
      service: "Changed"
    },
    {
      name: "Oil Filter",
      service: "OK"
    },
    {
      name: "Air Filter",
      service: "OK"
    },
    {
      name: "Cabin FIlter",
      service: "OK"
    },
    {
      name: "Fuel Filter",
      service: "OK"
    },
    {
      name: "Gearbox Oil",
      service: "OK"
    },
    {
      name: "Hydrolic Oil",
      service: "OK"
    },
    {
      name: "Front Brake Lining",
      service: "OK"
    },
    {
      name: "Back Brake Lining",
      service: "Failed"
    },
    {
      name: "Spark Plug",
      service: "OK"
    },
    {
      name: "Spark Wire",
      service: "OK"
    }
  ];

  constructor(public navCtrl: NavController) {}
}
