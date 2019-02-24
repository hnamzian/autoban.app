import { Component, OnInit } from "@angular/core";
import { ViewController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cost } from "../../../../models/costs";
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
    let fine = this.navParams.get("fine");
    this.fineForm = this.formBuilder.group({
      fineDate: [fine.cost.date, Validators.required],
      fineValue: [fine.cost.value, Validators.required],
      fineCategoryCode: [fine.fineCategoryCode],
      fineComment: [fine.cost.comment]
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
