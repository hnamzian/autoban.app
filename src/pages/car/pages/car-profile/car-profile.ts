import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, PopoverController, LoadingController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { map, catchError } from "rxjs/operators";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { SelectListComponent } from "../../../core/components/select-list/select-list";
import { CarProvider } from "../../../../providers/car/car";
import { CarStorage } from "../../../../storage/car/car";
import { Car, CarBrand, CarColor, CarModel } from "../../../../models/car";
import { ImageResSelection } from "../../../core/components/image-res-selection/image-res-selection";

@Component({
  selector: "car-profile",
  templateUrl: "car-profile.html"
})
export class CarProfilePage implements OnInit {
  altCarImage = "../../../../assets/imgs/altcar.svg";

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  carPhoto;

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
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public carProvider: CarProvider,
    public carStorage: CarStorage,
    public camera: Camera
  ) {
    this.carProfile = navParams.get("car");
    this.brand = this.carProfile.car_brand;
    this.model = this.carProfile.car_model;
    this.color = this.carProfile.color;
  }

  async ngOnInit() {
    await this.loadCarBrands();
    await this.loadCarColors();
  }

  async loadCarBrands() {
    let brands$ = (await this.carProvider.getCarBrands()).pipe(map(result => result.carBrands));
    brands$.subscribe(result => {
      this.brands = result;
    });
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

  addCarPhoto() {
    let popover = this.popoverCtrl.create(ImageResSelection, {}, { cssClass: "image-resource-popover"})
    popover.present()
    popover.onDidDismiss(data => {
      console.log(data);
      
      if (data && data.camera) {
        this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
      } else if (data && data.gallery) {
        this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      } else {
        return
      }

      this.camera.getPicture(this.cameraOptions).then(
        imageData => {
          this.carPhoto = "data:image/jpeg;base64," + imageData;
        },
        err => {
          console.log(err);
        }
      );
    })
  }

  async updateCarProfile() {
    let carProfile = {} as Car;
    carProfile.id = this.carProfile.id;
    carProfile.brandId = this.brand.id;
    carProfile.car_brand = this.brand;
    carProfile.modelId = this.model.id;
    carProfile.car_model = this.model;
    carProfile.colorId = this.color.id;
    carProfile.color = this.color;
    carProfile.odometer = this.carProfile.odometer;
    carProfile.plate = this.carProfile.plate;
    carProfile.builtyear = this.carProfile.builtyear
    carProfile.name = this.carProfile.name
    console.log(carProfile);

    (await this.carProvider.updateCar(this.carProfile)).subscribe(async result => {
      console.log(result);

      if (!result.success) {
      }

      await this.carStorage.setSelectedCar(carProfile);
      this.navCtrl.push(VehicleMenuPage);
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
