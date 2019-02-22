import { Component } from "@angular/core";
import {
  NavController,
  ViewController,
  PopoverController,
  ToastController,
  Toast
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewServiceSheetPage } from "../new-service-sheet/new-service-sheet";
import { Service } from "../../../../models/service";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";

@Component({
  selector: "new-service-form",
  templateUrl: "new-service-form.html"
})
export class NewServiceFormPage {
  selectedCar = {} as Car;

  serviceForm: FormGroup;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public carStorage: CarStorage
  ) {}

  async ngOnInit() {
    this.serviceForm = this.formBuilder.group({
      date: ["", Validators.required],
      title: [""],
      garage: [""],
      totalCost: ["", Validators.required],
      comment: [""]
    });

    this.selectedCar = await this.carStorage.getSelectedCar();
    console.log(this.selectedCar);
  }

  addServiceForm() {
    if (this.serviceForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    const serviceList = {
      title: this.serviceForm.get("title").value,
      carId: this.selectedCar.id,
      date: this.serviceForm.get("date").value,
      totalCost: this.serviceForm.get("totalCost").value,
      garageName: this.serviceForm.get("garage").value
    } as Service;

    let popover = this.popoverCtrl.create(
      NewServiceSheetPage,
      { serviceList: serviceList },
      { cssClass: "servicePopover" }
    );
    popover.present();
    popover.onDidDismiss(data => {
      this.viewCtrl.dismiss({}, "", { animate: false });
    });
  }

  formErrorCheck() {
    const message = this.serviceForm.get("date").hasError("required")
      ? "تاریخ الزامی است"
      : this.serviceForm.get("totalCost").hasError("required")
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
