import { Component } from "@angular/core";
import { ViewController, ToastController, Toast, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
import { CarStorage } from "../../../../storage/car/car";
import { CostsProvider } from "../../../../providers/costs/costs";

@Component({
  selector: "edit-others-cost",
  templateUrl: "edit-others-cost.html"
})
export class EditOthersCostPage {
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
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public carStorage: CarStorage,
    public costsProvider: CostsProvider
  ) {
    this.initDatePicker();
  }

  async ngOnInit() {
    let othersCost = this.navParams.get("othersCost");
    console.log(othersCost);
    this.costForm = this.formBuilder.group({
      costDate: [othersCost.date, Validators.required],
      costValue: [othersCost.value, Validators.required],
      costComment: [othersCost.comment]
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async updateCost() {
    // ToDo: handle this error
    if (this.costForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let othersCost = {
      date: this.costForm.get("costDate").value,
      value: this.costForm.get("costValue").value,
      comment: this.costForm.get("costComment"),
      carId: this.selectedCar.id
    };
    console.log(othersCost);
    let fuel$ = await this.costsProvider.addOthersCost(othersCost);
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
