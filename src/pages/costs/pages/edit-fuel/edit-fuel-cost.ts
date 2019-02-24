import { Component, OnInit } from "@angular/core";
import { ViewController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cost, Fuel } from "../../../../models/costs";
import moment from "moment";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
  selector: "edit-fuel-cost",
  templateUrl: "edit-fuel-cost.html"
})
export class EditFuelCostPage implements OnInit {
  selectedCar: Car;

  fuelForm: FormGroup;

  toast: Toast;

  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {
    this.initDatePicker();
  }

  async ngOnInit() {
    let fuel = this.navParams.get("fuel");
    this.fuelForm = this.formBuilder.group({
      fuelDate: [fuel.cost.date, Validators.required],
      fuelVolume: [fuel.volume],
      fuelValue: [fuel.cost.value, Validators.required],
      fuelComment: [fuel.cost.omment],
      odometer: [fuel.odometer],
      stationName: [fuel.stationName]
    });

    this.selectedCar = await this.carStorage.getSelectedCar();
  }

  initDatePicker() {
    this.startMax = moment()
      .subtract(622, "year")
      .format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }

  async updateFuelCost() {
    // ToDo: handle this error
    if (this.fuelForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let fuelCost = {
      date: this.fuelForm.get("fuelDate").value,
      carId: this.selectedCar.id,
      value: this.fuelForm.get("fuelValue").value,
      comment: this.fuelForm.get("fuelComment").value,
      volume: this.fuelForm.get("fuelVolume").value,
      stationName: this.fuelForm.get("stationName").value,
      odometer: this.fuelForm.get("odometer").value || null
    };

    console.log(fuelCost);
    let fuel$ = await this.costsProvider.addFuelCost(fuelCost);
    fuel$.subscribe(console.log);
  }

  formErrorCheck() {
    const message = this.fuelForm.get("fuelDate").hasError("required")
      ? "فیلد تاریخ الزامی است"
      : this.fuelForm.get("fuelValue").hasError("required")
      ? "فیلد هزینه الزامی است"
      : "";
    return message;
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
