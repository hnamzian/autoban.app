import { Component, OnInit } from "@angular/core";
import { NavController, AlertController, PopoverController } from "ionic-angular";
import { NewRepairFormPage } from "../new-repair-form/new-repair-form";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { CarStorage } from "../../../../storage/car/car";
import { RepairsProvider } from "../../../../providers/repairs/repairs";
import { Car } from "../../../../models/car";
import { Repair } from "../../../../models/repair";
import * as moment from "moment";
import { filter } from "rxjs/operator/filter";
import { map } from "rxjs/operator/map";
import { RepairReceiptsPage } from "../repair-receipts/repair-receipts";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";

@Component({
  selector: "repairs-list",
  templateUrl: "repairs-list.html"
})
export class RepairsListPage implements OnInit {
  title = "تعمیرات";
  selectedCar: Car;
  repairs = [] as Repair[];
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public carStorage: CarStorage,
    public repairsProvider: RepairsProvider
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();
    let repairs$ = await this.repairsProvider.getRepairs(this.selectedCar.id);
    repairs$.subscribe(result => {
      this.repairs = result.repairs;
      this.repairs = this.repairs.map(repair => {
        repair.date = moment(repair.date).format("YYYY-MM-DD");
        return repair;
      });
      console.log(result);
    });
  }

  showDetail(repair) {
    this.navCtrl.push(RepairReceiptsPage);
  }

  editOrRemoveItem(repair: Repair) {
    const modal = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    modal.present();
    modal.onDidDismiss(async action => {
      if(action && action.remove) {
        let cost$ = await this.repairsProvider.removeRepair(repair.id)
        cost$.subscribe(d => console.log(d))
      } 
      else if(action && action.edit) {
        console.log("edit")
      }
    })
  }

  addNewRepair() {
    const popover = this.popoverCtrl.create(NewRepairFormPage, {}, { cssClass: "repairPopover" });
    popover.present();
  }

  navToHome() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
