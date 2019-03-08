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

  periodicCost;
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
    this.periodicCost = this.navParams.get("periodicCost");
    this.costForm = this.formBuilder.group({
      costDate: [this.periodicCost.cost.date, Validators.required],
      costValue: [this.periodicCost.cost.value, Validators.required],
      costComment: [this.periodicCost.cost.value],
      period: [this.periodicCost.period]
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

  async updateCost() {
    //ToDo: handle this error
    if (this.costForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let periodicCost = {
      id: this.periodicCost.id,
      date: this.costForm.get("costDate").value,
      carId: this.selectedCar.id,
      value: this.costForm.get("costValue").value,
      comment: this.costForm.get("costComment").value,
      type: this.periodicCost.type,
      period: this.costForm.get("period").value
    };
    console.log(periodicCost);
    let periodic$ = await this.costsProvider.updatePeriodicCost(periodicCost);
    periodic$.subscribe(
      result => {
        if (result.success) {
          this.viewCtrl.dismiss();
        }
        this.showToast(result.message);
      },
      error => this.showToast("خطا در برقراری ارتباط با سرور")
    );
  }

  formErrorCheck() {
    const message = this.costForm.get("costDate").hasError("required") ? "فیلد تاریخ الزامی است" : this.costForm.get("costValue").hasError("required") ? "فیلد هزینه الزامی است" : "خطا";
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
