import { Component, OnInit } from "@angular/core";
import { NavController, AlertController, PopoverController, ToastController, Toast } from "ionic-angular";
import { NewRepairFormPage } from "../new-repair-form/new-repair-form";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { CarStorage } from "../../../../storage/car/car";
import { RepairsProvider } from "../../../../providers/repairs/repairs";
import { Car } from "../../../../models/car";
import { Repair } from "../../../../models/repair";
import * as moment from "moment";
import { RepairReceiptsPage } from "../repair-receipts/repair-receipts";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";
import { EditRepairFormPage } from "../edit-repair-form/edit-repair-form";

@Component({
  selector: "repairs-list",
  templateUrl: "repairs-list.html"
})
export class RepairsListPage implements OnInit {
  title = "تعمیرات";
  selectedCar: Car;
  repairs = [] as Repair[];

  toast: Toast;
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public popoverCtrl: PopoverController, public carStorage: CarStorage, public repairsProvider: RepairsProvider) {}

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
    const editRemovePopover = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    editRemovePopover.present();
    editRemovePopover.onDidDismiss(async action => {
      if (action && action.remove) {
        let cost$ = await this.repairsProvider.removeRepair(repair.id);
        cost$.subscribe(
          result => {
            if (result && result.success) {
              return this.showToast(result.message);
            } else if (result && !result.success) {
              return this.showToast(result.message);
            }
          },
          error => this.showToast("خطا در برقراری ارتباط با سرور")
        );
      } else if (action && action.edit) {
        const popover = this.popoverCtrl.create(EditRepairFormPage, { repair }, { cssClass: "costPopover" });
        popover.present();
      }
    });
  }

  addNewRepair() {
    const popover = this.popoverCtrl.create(NewRepairFormPage, {}, { cssClass: "repairPopover" });
    popover.present();
  }

  navToHome() {
    this.navCtrl.push(VehicleMenuPage);
  }

  showToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: "bottom",
      duration: 2000,
      cssClass: "toast"
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }
}
