import { Component, Input } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: "image-res-selection",
  templateUrl: "image-res-selection.html"
})
export class ImageResSelection {

  constructor(public viewCtrl: ViewController) {}

  selectCamera() {
    this.viewCtrl.dismiss({ camera: true })
  }

  selectGallery() {
    this.viewCtrl.dismiss({ gallery: true })
  }

}
