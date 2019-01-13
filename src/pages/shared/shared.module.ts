import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { MenuHeaderComponent } from "./components/menu-header/menu-header";

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    MenuHeaderComponent,
  ],
  exports: [
    MenuHeaderComponent,
  ]
})
export class SharedModule {}