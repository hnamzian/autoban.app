import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageResSelection } from "../../../core/components/image-res-selection/image-res-selection";
import { UserProvider } from "../../../../providers/user/user";
import { User } from "../../../../models/user";
import { TokenStorage } from "../../../../storage/token/token";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";
import { environment as env } from "../../../../config/environment.prod";
import { UserStorage } from "../../../../storage/user/user";

@Component({
  selector: "user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  IMAGE_HEADER = "data:image/jpeg;base64,";
  userAltImage = "../../../../assets/imgs/user.png";

  userProfileForm: FormGroup;
  firstName;
  lastName;
  email;
  imageUrl;
  user: User = {} as User;

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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(5)]]
    });
    
    this.user = await this.userStorage.getUser();
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;

    this.userProfileForm.setValue({
      firstName: [this.firstName],
      lastName: [this.lastName],
      email: [this.email]
    });

    this.imageUrl = this.getImageUrl(this.user.profileImage);
    // this.userPhoto = this.getUserImage();
  }

  async updateProfile() {
    // console.log("image: ", this.userPhoto);
    // this.user.image = this.userPhoto.replace(this.IMAGE_HEADER, '');
    // console.log(this.user);

    // ToDo: handle this error
    if(this.userProfileForm.invalid) {
      console.log("error")
      return false;
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
    user$.subscribe(result => {
      console.log(result);
      if (!result.success) {
        // ToDo: alert error
      }
      this.navCtrl.push(VehicleMenuPage);
    });
  }

  addUserPhoto() {
    let popover = this.popoverCtrl.create(
      ImageResSelection,
      {},
      { cssClass: "image-resource-popover" }
    );
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
}
