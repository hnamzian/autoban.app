import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Camera } from "@ionic-native/camera";
import { IonicStorageModule } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from "./app.component";
import { VehicleMenuPage } from "../pages/vehicle-menu/vehicle-menu";

import { CoreModule } from "../pages/core/core.module";
import { CostsModule } from "../pages/costs/costs.module";
import { AuthModule } from "../pages/auth/auth.module";
import { RepairsModule } from "../pages/repairs/repairs.module";
import { ServicesModule } from "../pages/services/services.module";
import { UserModule } from "../pages/user/user.module";
import { CarModule } from "../pages/car/car.module";

import { AuthProvider } from "../providers/auth/auth";
import { UserProvider } from "../providers/user/user";
import { CarProvider } from "../providers/car/car";
import { CostsProvider } from "../providers/costs/costs";
import { RepairsProvider } from "../providers/repairs/repairs";
import { TokenStorage } from "../providers/token/token";

@NgModule({
  declarations: [MyApp, VehicleMenuPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
  entryComponents: [MyApp, VehicleMenuPage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserProvider,
    CarProvider,
    CostsProvider,
    RepairsProvider,
    TokenStorage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
