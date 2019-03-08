import { Component } from "@angular/core";
import {
  NavController,
  ViewController,
  PopoverController,
  ToastController,
  Toast,
  NavParams
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewServiceSheetPage } from "../new-service-sheet/new-service-sheet";
import { Service } from "../../../../models/service";
import { Car } from "../../../../models/car";
import { CarStorage } from "../../../../storage/car/car";

@Component({
  selector: "edit-service-form",
  templateUrl: "edit-service-form.html"
})
export class EditServiceFormPage {
  selectedCar = {} as Car;

  serviceForm: FormGroup;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public carStorage: CarStorage
  ) {}

  async ngOnInit() {
    let service = this.navParams.get("service");
    this.serviceForm = this.formBuilder.group({
      date: [service.date, Validators.required],
      title: [service.title],
      garage: [service.garage],
      totalCost: [service.totalCost, Validators.required],
      comment: [service.comment]
    });

    this.selectedCar = await this.carStorage.getSelectedCar();
    console.log(this.selectedCar);
  }

  updateServiceForm() {
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
