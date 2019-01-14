import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { RegisterProfilePage } from "./pages/register-profile/register-profile"
import { UserProfilePage } from "./pages/user-profile/user-profile"

@NgModule({
  imports: [
    CommonModule, 
    IonicModule
  ],
  declarations: [
    RegisterProfilePage,
    UserProfilePage
  ],
  entryComponents: [
    RegisterProfilePage,
    UserProfilePage
  ]
})
export class UserModule {}