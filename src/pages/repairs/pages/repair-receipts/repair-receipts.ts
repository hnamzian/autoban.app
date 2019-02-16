import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { RepairNewReceiptsPage } from "../repair-new-receipt/repair-new-receipt";
import { RepairReceiptDetailPage } from "../repair-receipt-detail/repair-receipt-detail";
@Component({
  selector: "repair-receipts",
  templateUrl: "repair-receipts.html"
})
export class RepairReceiptsPage {
  images = [
    "../../../../assets/imgs/jimmi/jimmi1.jpg",
    "../../../../assets/imgs/jimmi/jimmi2.jpg",
    "../../../../assets/imgs/jimmi/jimmi3.jpg"
  ];
  // receipts = [
  //     {
  //         receiptNumber: 1,
  //         tag: 'Cyllender',
  //         date: '1/1//2019',
  //         seller: 'Iran Yadak',
  //         cost: 278000,
  //         imageUrl: '../../assets/imgs/receipt.jpg'
  //     },
  //     {
  //         receiptNumber: 1,
  //         tag: 'Engine',
  //         date: '1/1//2019',
  //         seller: 'Iran Yadak',
  //         cost: 1354000,
  //         imageUrl: '../../assets/imgs/receipt.jpg'
  //     },
  //     {
  //         receiptNumber: 1,
  //         tag: 'Gearbox',
  //         date: '1/1//2019',
  //         seller: 'Iran Yadak',
  //         cost: 215600,
  //         imageUrl: '../../assets/imgs/receipt.jpg'
  //     }
  // ]

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  openReceiptDetail() {
    this.navCtrl.push(RepairReceiptDetailPage);
  }

  addNewReceipt() {
    this.navCtrl.push(RepairNewReceiptsPage);
    // const modal = this.modalCtrl.create(RepairNewReceiptsPage);
    // modal.present();
  }
}
