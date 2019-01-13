import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "menu-header",
  templateUrl: "menu-header.html",
})
export class MenuHeaderComponent {
    @Input() profileImage
    @Input() userName: string
    @Input() vehicleImage
    @Input() vehiclesList

  constructor(public navCtrl: NavController) {} 
  
}
