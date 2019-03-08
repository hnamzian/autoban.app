import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController, ToastController, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageResSelection } from "../../../core/components/image-res-selection/image-res-selection";
import { UserProvider } from "../../../../providers/user/user";
import { User } from "../../../../models/user";
import { TokenStorage } from "../../../../storage/token/token";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { environment as env } from "../../../../config/environment.prod";
import { UserStorage } from "../../../../storage/user/user";
import { formattedError } from "@angular/compiler";

@Component({
  selector: "user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  IMAGE_HEADER = "data:image/jpeg;base64,";
  userAltImage = "../../../../assets/imgs/user.png";

  userProfileForm: FormGroup;
  imageUrl;
  user: User = {} as User;

  toast: Toast;

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  cameraPhoto: string = "";

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public userProvider: UserProvider,
    public userStorage: UserStorage,
    public tokenStorage: TokenStorage,
    public camera: Camera
  ) {}

  async ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });

    this.user = await this.userStorage.getUser();

    this.userProfileForm.setValue({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email]
    });

    this.imageUrl = this.getImageUrl(this.user.profileImage);
  }

  async updateProfile() {
    if (this.userProfileForm.invalid) {
      const errorMessage = this.formErrorCheck();
      return this.showToast(errorMessage);
    }

    const user = {
      firstName: this.userProfileForm.get("firstName").value,
      lastName: this.userProfileForm.get("lastName").value,
      email: this.userProfileForm.get("email").value
    } as User;
    if (this.cameraPhoto.length > 0) {
      user.image = this.cameraPhoto.replace(this.IMAGE_HEADER, "");
    }

    let user$ = await this.userProvider.updateUser(user);
    user$.subscribe(
      result => {
        if (result && result.success) {
          this.navCtrl.push(VehicleMenuPage);
          return this.showToast(result.message);
        }
        if (!result.success) {
          return this.showToast(result.message);
        }
      },
      error => this.showToast("خطا در برقراری ارتباط با سرور")
    );
  }

  formErrorCheck() {
    console.log(this.userProfileForm.get("password"));

    const message = this.userProfileForm.get("firstName").hasError("required")
      ? " نام الزامی است"
      : this.userProfileForm.get("lastName").hasError("required")
      ? "نام خانوادگی  نامعتبر است"
      : this.userProfileForm.get("email").hasError("required")
      ? "پست الکترونیک  نامعتبر است"
      : this.userProfileForm.get("email").hasError("email")
      ? "پست الکترونیک نامعتبر است"
      : "خطا";
    return message;
  }

  addUserPhoto() {
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
          this.cameraPhoto = this.IMAGE_HEADER + imageData;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getUserImage() {
    if (this.user && this.user.profileImage) {
      return this.getImageUrl(this.user.profileImage);
    }
    return this.userAltImage;
  }

  getImageUrl(url) {
    return `${env.BASE_URL}/${url}`;
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
