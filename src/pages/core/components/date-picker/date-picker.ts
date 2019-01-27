import { Component, EventEmitter, Input, Output } from "@angular/core";
import moment from "moment";

@Component({
  selector: "date-picker",
  templateUrl: "date-picker.html"
})
export class DatePickerCompponent {
  start: any;
  end: any;
  startMin: any;
  startMax: any;
  endMin: any;
  endMax: any;

  constructor() {
    this.startMax = moment()
      .subtract(622, "year")
      .format();
    this.endMin = this.startMin;
    this.endMax = this.startMax;
  }
}
