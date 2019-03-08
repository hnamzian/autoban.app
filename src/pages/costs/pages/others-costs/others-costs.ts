import { Component } from "@angular/core";
import { NavController, ModalController, PopoverController, ToastController, Toast } from "ionic-angular";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";
import { OthersCost, Cost } from "../../../../models/costs";
import moment from "moment";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";
import { EditOthersCostPage } from "../edit-others/edit-others-cost";

@Component({
  selector: "others-costs",
  templateUrl: "others-costs.html"
})

// period, type, cost, date, comment
// معاینه فنی - بیمه شخص ثالث - بیمه بدنه - وام - سایر
export class OthersCostsPage {
  selectedCar: Car;
  othersCosts: Cost[];

  toast: Toast;
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public popoverCtrl: PopoverController, public carStorage: CarStorage, public costsProvider: CostsProvider) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let fine$ = await this.costsProvider.getOthersCosts(this.selectedCar.id);
    fine$.subscribe(result => {
      console.log(result);

      this.othersCosts = result.costs;
      this.othersCosts = this.othersCosts.map(costItem => {
        costItem.date = moment(costItem.date).format("YYYY-MM-DD");
        return costItem;
      });
    });
  }

  editOrRemoveItem(othersCost: OthersCost) {
    const modal = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    modal.present();
    modal.onDidDismiss(async action => {
      if (action && action.remove) {
        let cost$ = await this.costsProvider.deleteOthersCost(othersCost.id);
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
        const popover = this.popoverCtrl.create(EditOthersCostPage, { othersCost }, { cssClass: "costPopover" });
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
