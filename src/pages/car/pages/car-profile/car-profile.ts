import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController, LoadingController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  carProfileForm: FormGroup;

  carProfile = {} as Car;
  brand = {} as CarBrand;
  model = {} as CarModel;
  color = {} as CarColor;

  brands: CarBrand[];
  trims: CarColor[];
  models: CarModel[];

  toast: Toast;
  loading;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public carProvider: CarProvider,
    public carStorage: CarStorage,
    public camera: Camera
  ) {}

  async ngOnInit() {
    this.carProfileForm = this.formBuilder.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      color: ["", Validators.required],
      builtyear: [""],
      odometer: [""],
      plate: [""]
    });

    this.carProfile = await this.carStorage.getSelectedCar();
    console.log(this.carProfile);

    this.carProfileForm.setValue({
      name: [this.carProfile.name],
      brand: [this.carProfile.car_brand.persianName],
      model: [this.carProfile.car_model.persianName],
      color: [this.carProfile.color.persianName],
      builtyear: [this.carProfile.builtyear],
      odometer: [this.carProfile.odometer],
      plate: [this.carProfile.plate]
    });

    this.brand = this.carProfile.car_brand;
    this.model = this.carProfile.car_model;
    this.color = this.carProfile.color;

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
    let models$ = (await this.carProvider.getCarModels(brandId)).pipe(map(result => result.carModels));
    models$.subscribe(result => {
      this.showLoader();
      this.models = result;
      this.dismissLoader();
    });
  }

  openBrandsList() {
    let popover = this.popoverCtrl.create(SelectListComponent, { itemsList: this.brands }, { cssClass: "listPopover" });
    popover.present();
    popover.onDidDismiss(async brand => {
      if (brand && brand.id) {
        if (brand.id != this.brand.id) {
          this.brand = brand;
          this.carProfileForm.get("brand").setValue(this.brand.persianName);
          this.model = {} as CarModel;
          await this.loadCarModels(this.brand.id);
        }
      }
    });
  }

  async openModelsList() {
    let popover = this.popoverCtrl.create(SelectListComponent, { itemsList: this.models }, { cssClass: "listPopover" });
    popover.present();
    popover.onDidDismiss(model => {
      if (model && model.id) {
        this.model = model;
        this.carProfileForm.get("model").setValue(this.model.persianName);
      }
    });
  }

  openColorsList() {
    let popover = this.popoverCtrl.create(SelectListComponent, { itemsList: this.trims }, { cssClass: "listPopover" });
    popover.present();
    popover.onDidDismiss(color => {
      if (color && color.id) {
        this.color = color;
        this.carProfileForm.get("color").setValue(this.color.persianName);
      }
    });
  }

  addCarPhoto() {
    let popover = this.popoverCtrl.create(ImageResSelection, {}, { cssClass: "image-resource-popover" });
    popover.present();
    popover.onDidDismiss(data => {
      console.log(data);

      if (data && data.camera) {
        this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
      } else if (data && data.gallery) {
        this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      } else {
        return;
      }

      this.camera.getPicture(this.cameraOptions).then(
        imageData => {
          this.carPhoto = "data:image/jpeg;base64," + imageData;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  async updateCarProfile() {
    if (this.carProfileForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    let carProfile = {
      id: this.carProfile.id,
      brandId: this.brand.id,
      car_brand: this.brand,
      modelId: this.model.id,
      car_model: this.model,
      colorId: this.color.id,
      color: this.color,
      odometer: this.carProfileForm.get("odometer").value,
      plate: this.carProfileForm.get("plate").value,
      builtyear: this.carProfileForm.get("builtyear").value,
      name: this.carProfileForm.get("name").value
    } as Car;

    (await this.carProvider.updateCar(this.carProfile)).subscribe(
      async result => {
        if (result && result.success) {
          return this.showToast(result.message);
        } else if (result && !result.success) {
          return this.showToast(result.message);
        }

        await this.carStorage.setSelectedCar(carProfile);
        this.navCtrl.push(VehicleMenuPage);
      },
      error => this.showToast("خطا در برقراری ارتباط با سرور")
    );
  }

  formErrorCheck() {
    const message = this.carProfileForm.get("name").hasError("required")
      ? "نام خودرو الزامی است"
      : this.carProfileForm.get("brand").hasError("required")
      ? "برند خودرو نامعتبر است"
      : this.carProfileForm.get("model").hasError("required")
      ? "مدل خودرو نامعتبر است"
      : this.carProfileForm.get("color").hasError("required")
      ? "رنگ خودرو الزامی است"
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
