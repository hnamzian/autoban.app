import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, PopoverController } from "ionic-angular";
import { NewFineCostPage } from "../new-fine-cost/new-fine-cost";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { Fine } from "../../../../models/costs";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";
import moment from "moment";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";

@Component({
  selector: "fine-costs",
  templateUrl: "fine-costs.html"
})
export class FineCostsPage implements OnInit {
  selectedCar: Car;
  fines: Fine[];

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public costsProvider: CostsProvider,
    public carStorage: CarStorage
  ) {}

  async ngOnInit() {
    this.selectedCar = await this.carStorage.getSelectedCar();

    let fine$ = await this.costsProvider.getFines(this.selectedCar.id);
    fine$.subscribe(result => {
      console.log(result);

      this.fines = result.fines;
      this.fines = this.fines.map(fine => {
        fine.cost.date = moment(fine.cost.date).format("YYYY-MM-DD");
        return fine;
      });
    });
  }

  editOrRemoveItem(fine: Fine) {
    const modal = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    modal.present();
    modal.onDidDismiss(async action => {
      if(action && action.remove) {
        let cost$ = await this.costsProvider.deleteFineCost(fine.id)
        cost$.subscribe(d => console.log(d))
      } 
      else if(action && action.edit) {
        console.log("edit")
      }
    })
  }

  navToMenu() {
    this.navCtrl.push(VehicleMenuPage);
  }
}
