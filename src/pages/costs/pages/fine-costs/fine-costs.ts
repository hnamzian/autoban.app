import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, PopoverController, ToastController, Toast } from "ionic-angular";
import { NewFineCostPage } from "../new-fine-cost/new-fine-cost";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Fine } from "../../../../models/costs";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";
import moment from "moment";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";
import { EditFineCostPage } from "../edit-fine/edit-fine";

@Component({
  selector: "fine-costs",
  templateUrl: "fine-costs.html"
})
export class FineCostsPage implements OnInit {
  selectedCar: Car;
  fines: Fine[];

  toast: Toast;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public popoverCtrl: PopoverController, public costsProvider: CostsProvider, public carStorage: CarStorage) {}

  async ngOnInit() {
    await this.getFines();
  }

  editOrRemoveItem(fine: Fine) {
    const editRemovePopover = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    editRemovePopover.present();
    editRemovePopover.onDidDismiss(async action => {
      if (action && action.remove) {
        let cost$ = await this.costsProvider.deleteFineCost(fine.id);
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
        const popover = this.popoverCtrl.create(EditFineCostPage, { fine }, { cssClass: "costPopover" });
        popover.present();
      }
    });
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }

  async getFines() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let fine$ = await this.costsProvider.getFines(this.selectedCar.id);
    fine$.subscribe(result => {
      this.fines = result.fines;
      this.fines = this.fines.map(fine => {
        fine.cost.date = moment(fine.cost.date).format("YYYY-MM-DD");
        return fine;
      });
    });
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
