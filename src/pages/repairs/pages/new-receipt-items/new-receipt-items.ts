import { Component } from "@angular/core";
import { NavController, ViewController, AlertController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { RepairReceiptsPage } from "../repair-receipts/repair-receipts";

@Component({
  selector: "new-receipt-items",
  templateUrl: "new-receipt-items.html"
})
export class NewReceiptItems {
  invoiceImage = null;
  invoice = {
    tag: "Untitled",
    date: "1/1/2019",
    items: [],
    totalCost: 0
  };
  item = {};
  name = null

  parts = ["engine", "wind shielder", "cyllender", "spike"];
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public camera: Camera
  ) {}

  dismiss() {
    this.navCtrl.push(RepairReceiptsPage);
  }

  addItem() {
    this.invoice.items.push(this.item);
    for (let item of this.invoice.items) {
      this.invoice.totalCost += +item.cost;
    }
    this.item = {}
    this.item['name'] = null
}

  clearInvoice() {
    this.item = {}
    this.item['name'] = null

    this.invoice.items = [];
    this.invoice.totalCost = 0

    this.invoiceImage = null
  }

  getInvoice() {
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
}
