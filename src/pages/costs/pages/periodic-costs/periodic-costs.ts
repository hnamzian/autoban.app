import { Component } from "@angular/core";
import { NavController, ModalController, PopoverController, ToastController, Toast } from "ionic-angular";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Car } from "../../../../models/car";
import { PeriodicCost } from "../../../../models/costs";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";
import moment from "moment";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";
import { EditPeriodicCostPage } from "../edit-periodic/edit-periodic-cost";

@Component({
  selector: "periodic-costs",
  templateUrl: "periodic-costs.html"
})

// period, type, cost, date, comment
// معاینه فنی - بیمه شخص ثالث - بیمه بدنه - وام - سایر
export class PeriodicCostsPage {
  selectedCar: Car;
  periodicCosts: PeriodicCost[];

  toast: Toast;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public popoverCtrl: PopoverController, public carStorage: CarStorage, public costsProvider: CostsProvider) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let periodicCost$ = await this.costsProvider.getPeriodicCosts(this.selectedCar.id);
    periodicCost$.subscribe(result => {
      console.log(result);

      this.periodicCosts = result.periodicCosts;
      this.periodicCosts = this.periodicCosts.map(costItem => {
        costItem.cost.date = moment(costItem.cost.date).format("YYYY-MM-DD");
        return costItem;
      });
    });
  }

  editOrRemoveItem(periodicCost: PeriodicCost) {
    const modal = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    modal.present();
    modal.onDidDismiss(async action => {
      if (action && action.remove) {
        let cost$ = await this.costsProvider.deletePeriodicCost(periodicCost.id);
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
        const popover = this.popoverCtrl.create(EditPeriodicCostPage, { periodicCost }, { cssClass: "costPopover" });
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
