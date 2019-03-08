import { Component } from "@angular/core";
import { ViewController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";

@Component({
  selector: "new-periodic-cost",
  templateUrl: "new-periodic-cost.html"
})
export class NewPeriodicCostPage {
  selectedCar;

  costForm: FormGroup;

  toast: Toast;

  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor(
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {
    this.initDatePicker();
  }

  async ngOnInit() {
    this.costForm = this.formBuilder.group({
      costDate: ["", Validators.required],
      costValue: ["", Validators.required],
      costComment: [""],
      period: [""]
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

  async addCost() {
    //ToDo: handle this error
    if (this.costForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let periodicCost = {
      date: this.costForm.get("costDate").value,
      carId: this.selectedCar.id,
      value: this.costForm.get("costValue").value,
      comment: this.costForm.get("costComment").value,
      //   type: 1,
      period: this.costForm.get("period").value
    };
    console.log(periodicCost);
    let fuel$ = await this.costsProvider.addPeriodicCost(periodicCost);
    fuel$.subscribe(result => {
      if (result.success) {
        this.viewCtrl.dismiss();
        this.showToast(result.message);
      } else {
        this.showToast(result.message);
      }
    });
  }

  formErrorCheck() {
    const message = this.costForm.get("costDate").hasError("required")
      ? "فیلد تاریخ الزامی است"
      : this.costForm.get("costValue").hasError("required")
      ? "فیلد هزینه الزامی است"
      : "خطا";
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
