import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { NavController, PopoverController, ViewController, NavParams } from "ionic-angular";
import { Observable } from "rxjs";
import { UserStorage } from "../../../../storage/user/user";
import { CarStorage } from "../../../../storage/car/car";
import { Car, CarAPI } from "../../../../models/car";
import { UserProfilePage } from "../../../user/pages/user-profile/user-profile";
import { UserAPI, User } from "../../../../models/user";
import { environment as env } from "../../../../config/environment.prod";

@Component({
  selector: "menu-header",
  templateUrl: "menu-header.html"
})
export class MenuHeaderComponent implements OnInit {
  @Input() title;
  @Input() showLogo = false;
  @Output() onPrevPage = new EventEmitter();

  profileImage;
  vehicleImage;

  storedUser: User;
  storedCars: Car[];
  selectedCar = {} as Car;
  userAltImage = "../../../../assets/imgs/user.png";
  carAltImage = "../../../../assets/imgs/car.svg";

  carsMenuTitle = "انتخاب خودرو";

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public userStorage: UserStorage,
    public carStorage: CarStorage
  ) {}

  async ngOnInit() {
    await this.loadUserProfile();
    await this.loadCars();
    this.selectedCar = await this.carStorage.getSelectedCar();
  }

  async loadUserProfile() {
    while (!this.storedUser) {
      this.storedUser = await this.userStorage.getUser();
      this.profileImage = this.getUserImage();
      console.log("User profile loaded: ", this.storedUser);
    }
  }

  async loadCars() {
    while (!this.storedCars) {
      this.storedCars = await this.carStorage.getCars();
      console.log("Cars profile loaded: ", this.storedCars);
    }
  }

  prevPage() {
    this.onPrevPage.emit();
  }

  openUserMenu() {
    let popover = this.popoverCtrl.create(UserMenu, {}, { cssClass: "userMenuPopover" });
    popover.present();
    popover.onDidDismiss(d => {
      if (d && d.profileClicked) {
        this.navCtrl.push(UserProfilePage);
        // this.userProfileClicked.emit();
      }
    });
  }

  openCarsMenu() {
    let popover = this.popoverCtrl.create(
      CarsMenuPopover,
      { cars: this.storedCars, selectedCar: this.selectedCar },
      { cssClass: "carsMenuPopover" }
    );
    popover.present();
    popover.onDidDismiss(d => {
      if (d && d.selectedCar) {
        this.selectedCar = d.selectedCar;
        this.carStorage.setSelectedCar(this.selectedCar);
        // this.onCarSelected.emit(this.selectedCar);
      }
    });
  }

  getUserImage() {
    if (this.storedUser && this.storedUser.profileImage) {
      return this.getImageUrl(this.storedUser.profileImage);
    }
    return this.userAltImage;
  }

  getImageUrl(url) {
    return `${env.BASE_URL}/${url}`;
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

@Component({
  selector: "cars-menu-popover",
  template: `
    <p *ngFor="let car of cars" (click)="selectCar(car)">
      {{ car.name }}
      <span *ngIf="selectedCar?.id === car.id"><ion-icon name="checkmark"></ion-icon> </span>
    </p>
  `
})
export class CarsMenuPopover {
  cars;
  selectedCar;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.cars = navParams.get("cars");
    this.selectedCar = navParams.get("selectedCar");
  }

  selectCar(car) {
    this.selectedCar = car;
    this.viewCtrl.dismiss({ selectedCar: this.selectedCar });
  }
}
