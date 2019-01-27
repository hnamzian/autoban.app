import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { NavController, PopoverController, NavParams, ViewController } from "ionic-angular";
import { UserStorage } from "../../../../storage/user/user";
import { CarStorage } from "../../../../storage/car/car";
import { Car } from "../../../../models/car";

@Component({
  selector: "menu-header",
  templateUrl: "menu-header.html"
})
export class MenuHeaderComponent implements OnInit {
  @Input() title;

  @Input() profileImage;
  @Input() userName: string;
  @Output() userProfileClicked = new EventEmitter<boolean>();

  @Input() vehicleImage;
  @Input() selectedCar = {} as Car;
  @Input() cars: Car[];
  @Output() onCarSelected = new EventEmitter<Car>();

  storedUser;
  storedCars;
  storedSelectedCar;
  userAltImage = "../../../../assets/imgs/user.png";
  carAltImage = "../../../../assets/imgs/car.svg";

  carsMenuTitle = "انتخاب خودرو";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public userStorage: UserStorage,
    public carStorage: CarStorage
  ) {
    this.cars = navParams.get("cars");
    console.log(this.cars);
  }

  async ngOnInit() {
    this.storedUser = await this.userStorage.getUser();
    this.storedCars = await this.carStorage.getCars();
    this.storedSelectedCar = await this.carStorage.getSelectedCar();
  }

  openUserMenu() {
    let popover = this.popoverCtrl.create(UserMenu, {}, { cssClass: "userMenuPopover" });
    popover.present();
    popover.onDidDismiss(d => {
      if (d && d.profileClicked) {
        this.userProfileClicked.emit();
      }
    });
  }

  openCarsMenu() {
    let popover = this.popoverCtrl.create(
      CarsMenuPopover,
      { cars: this.cars, selectedCar: this.selectedCar },
      { cssClass: "carsMenuPopover" }
    );
    popover.present();
    popover.onDidDismiss(d => {
      if (d && d.selectedCar) {
        this.selectedCar = d.selectedCar;
        this.onCarSelected.emit(this.selectedCar);
      }
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
    console.log("kjnijnjojinhubv", this.selectedCar);
  }

  selectCar(car) {
    this.selectedCar = car;
    this.viewCtrl.dismiss({ selectedCar: this.selectedCar });
  }
}
