import { Component, OnInit } from "@angular/core";
import { ViewController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cost } from "../../../../models/costs";
import moment from "moment";
import { CostsProvider } from "../../../../providers/costs/costs";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";

@Component({
  selector: "new-fine-cost",
  templateUrl: "new-fine-cost.html"
})
export class NewFineCostPage implements OnInit {
  selectedCar: Car;

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
    this.fineForm = this.formBuilder.group({
      fineDate: ["", Validators.required],
      fineValue: ["", Validators.required],
      fineCategoryCode: [""],
      fineComment: [""]
    });

    this.selectedCar = await this.carStorgae.getSelectedCar();
  }

  async addFineCost() {
    // ToDo: handle this error
    if (this.fineForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let fineCost = {
      date: this.fineForm.get("fineDate").value,
      value: this.fineForm.get("fineValue").value,
      carId: this.selectedCar.id,
      comment: this.fineForm.get("fineComment").value,
      fineCategoryCode: this.fineForm.get("fineCategoryCode")
    };

    let fine$ = await this.costsProvider.addFineCost(fineCost);
    fine$.subscribe(result => {
      if (result.success) {
        console.log(result);
        this.viewCtrl.dismiss({ fine: result.fine });
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
