import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { RepairCardPage } from "../repair-card/repair-card";

@Component({
  selector: "repairs-list",
  templateUrl: "repairs-list.html"
})
export class RepairsListPage {
  repairs = [
    {
      date: "1/1/2019",
      garage: "تعمیرگاه راغبی",
      title: "تعمیر موتور",
      cost: 2700000
    },
    {
      date: "1/5/2019",
      garage: "تعمیرگاه راغبی",
      title: "تعمیر گیربکس",
      cost: 1550000
    },
    {
      date: "1/10/2019",
      garage: "تعمیرگاه راغبی",
      title: "تعویض رادیاتور",
      cost: 600000
    },
    {
      date: "1/11/2019",
      garage: "تعمیرگاه راغبی",
      title: "تعویض اگزوز",
      cost: 500000
    }
  ];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  openRepairData() {
    this.navCtrl.push(RepairCardPage);
  }

  addNewRepair() {
    const prompt = this.alertCtrl.create({
      title: "New Repair",
      message: "Please enter general information.",
      inputs: [
        {
          name: "title",
          placeholder: "Title"
        },
        {
          name: "garage",
          placeholder: "Garage Name"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
}
