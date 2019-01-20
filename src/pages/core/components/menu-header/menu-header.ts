import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  NavController,
  PopoverController,
  NavParams,
  ViewController
} from "ionic-angular";

@Component({
  selector: "menu-header",
  templateUrl: "menu-header.html"
})
export class MenuHeaderComponent {
  @Input() profileImage;
  @Input() userName: string;
  @Input() vehicleImage;
  @Input() vehiclesList;

  @Output() userProfileClicked = new EventEmitter<boolean>();

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController
  ) {}

  openUserMenu() {
    let popover = this.popoverCtrl.create(
      UserMenu,
      {},
      { cssClass: "userMenuPopover" }
    );
    popover.present();
    popover.onDidDismiss(d => {
      d.profileClicked ? this.userProfileClicked.emit() : null
    });
  }
}

@Component({
  selector: "user-menu-popover",
  template: `
    <p (click)="onProfileClicked()">
      <ion-icon name="settings"></ion-icon>
      <span>پروفایل</span>
    </p>
    <p (click)="onExitClicked()">
      <ion-icon name="exit"></ion-icon>
      <span>خروج</span>
    </p>
  `
})
export class UserMenu {
  profileClicked;
  exitClicked;

  constructor(public viewCtrl: ViewController) {}

  onProfileClicked() {
    this.profileClicked = true;
    this.viewCtrl.dismiss({ profileClicked: this.profileClicked }, "", { animate: false });
  }

  onExitClicked() {
    this.exitClicked = true;
    this.viewCtrl.dismiss({ exitClicked: this.exitClicked });
  }
}

// @Component({
//   template: ``
// })
// export class VehiclesMenu {
//   constructor() {}
// }
