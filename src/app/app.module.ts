import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VehiclesListPage } from '../pages/vehicles-list/vehicles-list';
import { VehicleDetailsPage } from '../pages/vehicle-details/vehicles-details';
import { VehicleMenuPage } from '../pages/vehicle-menu/vehicle-menu';
import { VehicleCostsPage } from '../pages/vehicle-costs/vehicle-costs';
import { FuelCostsPage } from '../pages/fuel-costs/fuel-costs';
import { FineCostsPage } from '../pages/fine-costs/fine-costs';
import { OthersCostsPage } from '../pages/others-costs/others-costs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VehiclesListPage,
    VehicleDetailsPage,
    VehicleMenuPage,
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VehiclesListPage,
    VehicleDetailsPage,
    VehicleMenuPage,
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
