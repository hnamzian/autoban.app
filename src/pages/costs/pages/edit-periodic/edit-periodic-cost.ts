import { Component } from "@angular/core";
import { ViewController, ToastController, Toast, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";

@Component({
  selector: "edit-periodic-cost",
  templateUrl: "edit-periodic-cost.html"
})
export class EditPeriodicCostPage {
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
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {
    this.initDatePicker();
  }

  async ngOnInit() {
    let periodicCost = this.navParams.get("periodicCost");
    this.costForm = this.formBuilder.group({
      costDate: [periodicCost.cost.date, Validators.required],
      costValue: [periodicCost.cost.value, Validators.required],
      costComment: [periodicCost.cost.value],
      period: [periodicCost.period]
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
      value: this.costForm.get("costValue"),
      comment: this.costForm.get("costComment").value,
      //   type: 1,
      period: this.costForm.get("period").value
    };
    console.log(periodicCost);
    let fuel$ = await this.costsProvider.addPeriodicCost(periodicCost);
    fuel$.subscribe(console.log);
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
