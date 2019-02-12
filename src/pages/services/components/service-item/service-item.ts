import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "service-item",
  templateUrl: "service-item.html"
})
export class ServiceItemComponent {
  @Input() serviceItem;
  @Output() onChanged = new EventEmitter<boolean>();
  @Output() onFailed = new EventEmitter<boolean>();
  @Output() onOK = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController) {}

  emitChangedEvent() {
    this.onChanged.emit(true);
  }

  emitOKEvent() {
    this.onOK.emit(true);
  }

  emitFailedEvent() {
    this.onFailed.emit(true);
  }
}
