import { Component } from "@angular/core";
import { NavController, AlertController, PopoverController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { RepairsListPage } from "../repairs-list/repairs-list";
import { ImageResSelection } from "../../../core/components/image-res-selection/image-res-selection";

@Component({
  selector: "repair-receipts",
  templateUrl: "repair-receipts.html"
})
export class RepairReceiptsPage {
  title = "فاکتورها";

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  IMAGE_HEADER = "data:image/jpeg;base64,";

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

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public alertCtrl: AlertController, public camera: Camera) {}

  addNewReceipt() {
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
          this.invoiceImage = this.IMAGE_HEADER + imageData;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  navToReciepts() {
    this.navCtrl.push(RepairsListPage);
  }
}
