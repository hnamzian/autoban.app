import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
  selector: "edit-bar",
  templateUrl: "edit-bar.html"
})
export class EditBarCompponent {

  constructor(public viewCtrl: ViewController) {
  }

  remove() {
    this.viewCtrl.dismiss({remove: true})
  }

  edit() {
    this.viewCtrl.dismiss({edit: true})
  }
}
