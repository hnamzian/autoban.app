import { Component, OnInit } from "@angular/core";
import { NavController, ViewController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Repair } from "../../../../models/repair";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";
import { RepairsProvider } from "../../../../providers/repairs/repairs";

@Component({
  selector: "new-repair-form",
  templateUrl: "new-repair-form.html"
})
export class NewRepairFormPage implements OnInit {
  selectedCar: Car;

  repairForm: FormGroup;

  date;
  title;
  garageName;
  totalCost;
  comment;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public carSorage: CarStorage,
    public repairsProvider: RepairsProvider
  ) {}

  async ngOnInit() {
    this.repairForm = this.formBuilder.group({
      date: ["", Validators.required],
      title: [""],
      garageName: [""],
      totalCost: ["", Validators.required],
      comment: [""]
    });
    this.selectedCar = await this.carSorage.getSelectedCar();
  }

  async addRepairForm() {
    if (this.repairForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let repair = {
      date: this.repairForm.get("date").value,
      title: this.repairForm.get("title").value,
      totalCost: this.repairForm.get("totalCost").value,
      garageName: this.repairForm.get("garageName").value,
      carId: this.selectedCar.id
    } as Repair;

    let repair$ = await this.repairsProvider.addRepair(repair);
    repair$.subscribe(console.log);
  }

  formErrorCheck() {
    const message = this.repairForm.get("date").hasError("required")
      ? "تاریخ الزامی است"
      : this.repairForm.get("totalCost").hasError("required")
      ? "هزینه نامعتبر است"
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
