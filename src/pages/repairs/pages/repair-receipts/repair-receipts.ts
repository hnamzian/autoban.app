import { Component } from "@angular/core";
import { NavController, ModalController, AlertController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { RepairsListPage } from "../repairs-list/repairs-list";

@Component({
  selector: "repair-receipts",
  templateUrl: "repair-receipts.html"
})
export class RepairReceiptsPage {
  title = "فاکتورها";

  invoiceImage = null;
  invoice = {
    tag: "Untitled",
    date: "1/1/2019",
    items: [],
    totalCost: 0
  };

  images = [
    "../../../../assets/imgs/jimmi/jimmi1.jpg",
    "../../../../assets/imgs/jimmi/jimmi2.jpg",
    "../../../../assets/imgs/jimmi/jimmi3.jpg",
    "../../../../assets/imgs/jimmi/jimmi1.jpg",
    "../../../../assets/imgs/jimmi/jimmi3.jpg",
    "../../../../assets/imgs/jimmi/jimmi2.jpg",
    "../../../../assets/imgs/jimmi/jimmi1.jpg"
  ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public camera: Camera) {}

  addNewReceipt() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    let alert = this.alertCtrl.create({
      message: "Choose Photo",
      cssClass: "alert",
      buttons: [
        {
          text: "Take a picture",
          cssClass: "alert-camera-btn",
          role: "ok",
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.CAMERA;
            this.camera.getPicture(options).then(
              imageData => {
                this.invoiceImage = "data:image/jpeg;base64," + imageData;
                console.log(imageData);
              },
              err => {
                console.log(err);
              }
            );
          }
        },
        {
          text: "Select from Gallery",
          cssClass: "alert-gallery-btn",
          role: "ok",
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
            this.camera.getPicture(options).then(
              imageData => {
                this.invoiceImage = "data:image/jpeg;base64," + imageData;
                console.log("jnijnin");
                console.log(imageData);
              },
              err => {
                console.log(err);
              }
            );
          }
        },
        {
          text: "Cancel",
          cssClass: "alert-close-btn",
          role: "ok",
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  navToReciepts() {
    this.navCtrl.push(RepairsListPage);
  }
}
