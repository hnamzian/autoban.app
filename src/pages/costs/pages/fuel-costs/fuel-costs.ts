import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, PopoverController, ToastController, Toast } from "ionic-angular";
import { NewFuelCostPage } from "../new-fuel-cost/new-fuel-cost";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Car } from "../../../../models/car";
import { Fuel } from "../../../../models/costs";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";
import moment from "moment";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";
import { EditFuelCostPage } from "../edit-fuel/edit-fuel-cost";

@Component({
  selector: "fuel-costs",
  templateUrl: "fuel-costs.html"
})
export class FuelCostsPage implements OnInit {
  selectedCar: Car;
  fuels: Fuel[];

  toast: Toast;
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public popoverCtrl: PopoverController, public carStorage: CarStorage, public costsProvider: CostsProvider) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let fine$ = await this.costsProvider.getFuels(this.selectedCar.id);
    fine$.subscribe(result => {
      console.log(result);

      this.fuels = result.fuels;
      this.fuels = this.fuels.map(fine => {
        fine.cost.date = moment(fine.cost.date).format("YYYY-MM-DD");
        return fine;
      });
    });
  }

  editOrRemoveItem(fuel: Fuel) {
    const modal = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    modal.present();
    modal.onDidDismiss(async action => {
      if (action && action.remove) {
        let cost$ = await this.costsProvider.deleteFuelCost(fuel.id);
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
        const popover = this.popoverCtrl.create(EditFuelCostPage, { fuel }, { cssClass: "costPopover" });
        popover.present();
      }
    });
  }

  navToMenu() {
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
