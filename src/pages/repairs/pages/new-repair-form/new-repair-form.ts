import { Component, OnInit } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { Repair } from "../../../../models/repair";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";
import { RepairsProvider } from "../../../../providers/repairs/repairs";

@Component({
  selector: "new-repair-form",
  templateUrl: "new-repair-form.html"
})
export class NewRepairFormPage implements OnInit {
  selectedCar: Car;
  date;
  title;
  garageName;
  totalCost;
  comment;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public carSorage: CarStorage,
    public repairsProvider: RepairsProvider
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carSorage.getSelectedCar();
  }

  async addRepairForm() {
    let repair = {} as Repair;
    repair.date = this.date;
    repair.title = this.title;
    repair.totalCost = this.totalCost;
    repair.garageName = this.garageName;
    repair.carId = this.selectedCar.id;

    let repair$ = await this.repairsProvider.addRepair(repair);
    repair$.subscribe(console.log);
  }
}
