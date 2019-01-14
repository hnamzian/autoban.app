import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { MenuHeaderComponent, UserMenu } from "./components/menu-header/menu-header";

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    MenuHeaderComponent,
    UserMenu
  ],
  entryComponents: [
      UserMenu
  ],
  exports: [
    MenuHeaderComponent,
  ]
})
export class CoreModule {}