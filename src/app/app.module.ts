import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Camera } from "@ionic-native/camera";
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from "./app.component";
import { VehicleMenuPage } from "../pages/vehicle-menu/vehicle-menu";


// import { LoginService } from "../services/login";

import { CoreModule } from "../pages/core/core.module"
import { CostsModule } from "../pages/costs/costs.module"
import { AuthModule } from "../pages/auth/auth.module"
import { RepairsModule } from "../pages/repairs/repairs.module"
import { ServicesModule } from "../pages/services/services.module"
import { UserModule } from "../pages/user/user.module"
import { CarModule } from "../pages/car/car.module"

@NgModule({
  declarations: [
    MyApp,
    VehicleMenuPage,
  ],
  imports: [BrowserModule, 
    IonicModule.forRoot(MyApp), 
    HttpClientModule, 
    CoreModule,
    CostsModule,
    AuthModule,
    RepairsModule,
    ServicesModule,
    UserModule,
    CarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VehicleMenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    // LoginService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
