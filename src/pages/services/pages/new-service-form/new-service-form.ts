import { Component } from "@angular/core";
import { NavController, ViewController, PopoverController } from "ionic-angular";
import { NewServiceSheetPage } from "../new-service-sheet/new-service-sheet";
import { ServiceItem, Service } from "../../../../models/service";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";

@Component({
  selector: "new-service-form",
  templateUrl: "new-service-form.html"
})
export class NewServiceFormPage {
  selectedCar = {} as Car;

  title;
  garage;
  value;
  date;
  comment;

  serviceList = {} as Service;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public popoverCtrl: PopoverController,
    public carStorage: CarStorage
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();
    console.log(this.selectedCar);
  }

  addServiceForm() {
    this.serviceList.title = this.title;
    this.serviceList.carId = this.selectedCar.id;
    this.serviceList.date = this.date;
    this.serviceList.totalCost = this.value;
    this.serviceList.garageName = this.garage;

    let popover = this.popoverCtrl.create(
      NewServiceSheetPage,
      { serviceList: this.serviceList },
      { cssClass: "servicePopover" }
    );
    popover.present();
    popover.onDidDismiss(data => {
      this.viewCtrl.dismiss({}, "", { animate: false });
    });
  }
}
