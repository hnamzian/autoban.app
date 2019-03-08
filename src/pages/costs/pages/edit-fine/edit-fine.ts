import { Component, OnInit } from "@angular/core";
import { ViewController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
  selector: "edit-fine",
  templateUrl: "edit-fine.html"
})
export class EditFineCostPage implements OnInit {
  selectedCar: Car;

  fine;
  fineForm: FormGroup;

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
    public costsProvider: CostsProvider,
    public carStorgae: CarStorage
  ) {
    this.startMax = moment()
      .subtract(622, "year")
      .format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }

  async ngOnInit() {
    this.fine = this.navParams.get("fine");
    this.fineForm = this.formBuilder.group({
      fineDate: [this.fine.cost.date, Validators.required],
      fineValue: [this.fine.cost.value, Validators.required],
      fineCategoryCode: [this.fine.fineCategoryCode],
      fineComment: [this.fine.cost.comment]
    });

    this.selectedCar = await this.carStorgae.getSelectedCar();
  }

  async updateFineCost() {
    // ToDo: handle this error
    if (this.fineForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let fineCost = {
      id: this.fine.id,
      date: this.fineForm.get("fineDate").value,
      value: this.fineForm.get("fineValue").value,
      carId: this.selectedCar.id,
      comment: this.fineForm.get("fineComment").value,
      fineCategoryCode: this.fineForm.get("fineCategoryCode").value
    };

    console.log(fineCost);
    let fine$ = await this.costsProvider.updateFineCost(fineCost);
    fine$.subscribe(result => {
      if (result.success) {
        this.viewCtrl.dismiss();
        this.showToast(result.message);
      } else {
        this.showToast(result.message);
      }
    });
  }

  formErrorCheck() {
    const message = this.fineForm.get("fineDate").hasError("required")
      ? "فیلد تاریخ الزامی است"
      : this.fineForm.get("fineValue").hasError("required")
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
