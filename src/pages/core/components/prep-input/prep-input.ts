import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "prep-input",
  templateUrl: "prep-input.html"
})
export class PrepInputComponent {
  @Input() label;
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<string>();

  rtl;

  onChange() {
    var english = /^[A-Za-z0-9]*$/;

    let lastChar = this.inputModel[this.inputModel.length-1]
    if (english.test(lastChar)) {
        this.rtl = false;
    } else {
        this.rtl = true
    }

  }
}
