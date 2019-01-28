import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageResSelection } from "../../../core/components/image-res-selection/image-res-selection";
import { UserProvider } from "../../../../providers/user/user";
import { User } from "../../../../models/user";
import { TokenStorage } from "../../../../storage/token/token";
import { VehicleMenuPage } from "../../../vehicle-menu/vehicle-menu";

@Component({
  selector: "user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  userAltImage = "../../../../assets/imgs/user.png";
  firstName;
  lastName;
  email;
  user: User; // = {} as User;

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  userPhoto;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public userProvider: UserProvider,
    public tokenStorage: TokenStorage,
    public camera: Camera
  ) {
    this.user = this.navParams.get("user");
    console.log(this.user);
  }

  async updateProfile() {
    this.user.profileImage = this.userPhoto;
    console.log(this.user);

    let user$ = await this.userProvider.updateUser(this.user);
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
          this.userPhoto = "data:image/jpeg;base64," + imageData;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
