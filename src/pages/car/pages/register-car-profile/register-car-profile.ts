import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController, LoadingController } from "ionic-angular";
import { map, catchError } from "rxjs/operators";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { RegisterPage } from "../../../auth/pages/register/register";
import { SelectListComponent } from "../../../core/components/select-list/select-list";
import { CarProvider } from "../../../../providers/car/car";
import { Car, CarBrand, CarColor, CarModel } from "../../../../models/car";

@Component({
  selector: "register-car-profile",
  templateUrl: "register-car-profile.html"
})
export class RegisterCarProfilePage implements OnInit {
  carProfile = {} as Car;
  brand = {} as CarBrand;
  model = {} as CarModel;
  color = {} as CarColor;

  brands: CarBrand[];
  trims: CarColor[];
  models: CarModel[];

  loading;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public carProvider: CarProvider,
    public loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.loadCarBrands();
    await this.loadCarColors();
  }

  async loadCarBrands() {
    let brands$ = (await this.carProvider.getCarBrands()).pipe(map(result => result.carBrands));
    brands$.subscribe(result => (this.brands = result));
  }

  async loadCarColors() {
    let trims$ = (await this.carProvider.getCarColors()).pipe(map(result => result.colors));
    trims$.subscribe(result => (this.trims = result));
  }

  async loadCarModels(brandId) {
    let models$ = (await this.carProvider.getCarModels(brandId)).pipe(
      map(result => result.carModels)
    );
    models$.subscribe(result => {
      this.showLoader();
      this.models = result;
      this.dismissLoader();
    });
  }

  openBrandsList() {
    let popover = this.popoverCtrl.create(
      SelectListComponent,
      { itemsList: this.brands },
      { cssClass: "listPopover" }
    );
    popover.present();
    popover.onDidDismiss(async brand => {
      if (brand && brand.id) {
        if (brand.id != this.brand.id) {
          this.brand = brand;
          this.model = {} as CarModel;
          await this.loadCarModels(this.brand.id);
        }
      }
    });
  }

  async openModelsList() {
    let popover = this.popoverCtrl.create(
      SelectListComponent,
      { itemsList: this.models },
      { cssClass: "listPopover" }
    );
    popover.present();
    popover.onDidDismiss(model => {
      if (model && model.id) {
        this.model = model;
      }
    });
  }

  openColorsList() {
    let popover = this.popoverCtrl.create(
      SelectListComponent,
      { itemsList: this.trims },
      { cssClass: "listPopover" }
    );
    popover.present();
    popover.onDidDismiss(color => {
      if (color && color.id) {
        this.color = color;
      }
    });
  }

  async registerCar() {
    this.carProfile.brandId = this.brand.id;
    this.carProfile.modelId = this.model.id
    this.carProfile.colorId = this.color.id
    
    let carapi$ = await this.carProvider.registerCar(this.carProfile);
    carapi$.subscribe(carapi => {
      console.log(carapi);

      if (!carapi) {
        this.navCtrl.push(RegisterPage);
      } else if (!carapi.success) {
        // ToDo: toast error and stay this page
        console.log(carapi.msg);
      } else {
        this.navCtrl.push(VehicleMenuPage);
      }
    });
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
