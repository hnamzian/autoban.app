import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { MenuHeaderComponent, UserMenu } from "./components/menu-header/menu-header";
import { PrepInputComponent } from "./components/prep-input/prep-input";
import { AuthHeaderComponent } from "./components/auth-header/auth-header";
@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MenuHeaderComponent, UserMenu, PrepInputComponent, AuthHeaderComponent],
  entryComponents: [UserMenu],
  exports: [MenuHeaderComponent, PrepInputComponent, AuthHeaderComponent]
})
export class CoreModule {}
