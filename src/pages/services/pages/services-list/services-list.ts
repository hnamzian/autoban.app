import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController, LoadingController, Loading, ToastController, Toast } from "ionic-angular";
import { ServiceDataPage } from "../service-data/service-data";
import { NewServiceFormPage } from "../new-service-form/new-service-form";
import { ServicesProvider } from "../../../../providers/services/services";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";
import { ServiceItem, Service } from "../../../../models/service";
import * as moment from "moment";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { EditBarCompponent } from "../../../core/components/edit-bar/edit-bar";
import { EditServiceFormPage } from "../edit-service-form/edit-service-form";

@Component({
  selector: "services-list",
  templateUrl: "services-list.html"
})
export class ServicesListPage implements OnInit {
  title = "سرویس ها";
  selectedCar: Car;
  services = [] as Service[];
  newServiceItems;

  toast: Toast;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public carStorage: CarStorage,
    public servicesProvider: ServicesProvider
  ) {}

  async ngOnInit() {
    await this.refreshServicesList();
  }

  addService() {
    const popover = this.popoverCtrl.create(NewServiceFormPage, {}, { cssClass: "servicePopover" });
    popover.present();
    popover.onDidDismiss(async () => {
      await this.refreshServicesList();
    });
  }

  editOrRemoveItem(service: Service) {
    const modal = this.popoverCtrl.create(EditBarCompponent, {}, { cssClass: "editBarPopover" });
    modal.present();
    modal.onDidDismiss(async action => {
      if (action && action.remove) {
        // let cost$ = await this.servicesProvider.(service.id)
        // cost$.subscribe(d => console.log(d))
      } else if (action && action.edit) {
        const popover = this.popoverCtrl.create(EditServiceFormPage, { service }, { cssClass: "costPopover" });
        popover.present();
        popover.onDidDismiss(async () => {
          await this.refreshServicesList();
        });
      }
    });
  }

  showServiceSheet(service) {
    this.navCtrl.push(ServiceDataPage, { service });
  }

  navToHome() {
    this.navCtrl.push(VehicleMenuPage);
  }

  async refreshServicesList() {
    this.showLoader();
    await this.getServices();
    this.dismissLoader();
  }

  async getServices() {
    this.selectedCar = await this.carStorage.getSelectedCar();
    let services$ = await this.servicesProvider.getServices(this.selectedCar.id);
    services$.subscribe(result => {
      this.services = result.periodicServices;
      this.services = this.services.map(service => {
        service.date = moment(service.date).format("YYYY-MM-DD");
        return service;
      });
      console.log(this.services);
    });
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

  showLoader() {
    this.loading = this.loadingCtrl.create({
      showBackdrop: false
    });

    this.loading.present();
  }

  dismissLoader() {
    this.loading.dismiss();
  }
}
