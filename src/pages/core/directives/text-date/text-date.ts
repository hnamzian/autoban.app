import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[text-date]"
})
export class TextDateDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    el.nativeElement.onkeypress = e => {
      e.preventDefault();
      let value = e.target.value;
      value += e.key;
      e.target.value = this.format(value);
      console.log(this.format(value));
    };
  }

  format(value) {
    if (value.length == 1) {
      if (+value > 3) return "0" + value;
    } else if (value.length == 2) {
      if (+value > 31) return value.slice(0, 1);
    } else if (value.length > 2 && value[2] != "-") {
      const month = value[2];
      if (+month > 1) value = [value.slice(0, 2), "-0", value.slice(2)].join("");
      else value = [value.slice(0, 2), "-", value.slice(2)].join("");
    } else if (value.length == 5) {
      const month = value.slice(3, 4);
      if (+month > 12) return value.slice(0, 4);
    } else if (value.length > 5 && value[5] != "-") {
      value = [value.slice(0, 5), "-13", value.slice(5)].join("");
      const day = value.slice(0, 2);
      const month = value.slice(3, 5);
      const dateVerified = this.verifyDate(+month, +day);
      console.log(dateVerified);
    } else if (value.length == 7) {
      if (value[6] != "1") value = value.slice(0, 6);
    } else if (value.length == 8) {
      if (value[7] != "3") value = value.slice(0, 7);
    } else if (value.length > 10) {
      value = value.slice(0, 10);
    }
    return value;
  }

  verifyDay(day) {
    return day <= 31 ? true : false;
  }

  verifyDate(month, day) {
    if (month >= 1 && month <= 6 && day <= 31) {
      return true;
    } else if (month >= 7 && month <= 11 && day <= 30) {
      return true;
    }
    return false;
  }
}
