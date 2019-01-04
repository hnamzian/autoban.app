import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Camera } from "@ionic-native/camera";

import { MyApp } from "./app.component";
import { ProfilePage } from '../pages/profile/profile';
import { VehiclesListPage } from "../pages/vehicles-list/vehicles-list";
import { VehicleDetailsPage } from "../pages/vehicle-details/vehicles-details";
import { VehicleMenuPage } from "../pages/vehicle-menu/vehicle-menu";
import { VehicleCostsPage } from "../pages/vehicle-costs/vehicle-costs";
import { FuelCostsPage } from "../pages/fuel-costs/fuel-costs";
import { FineCostsPage } from "../pages/fine-costs/fine-costs";
import { OthersCostsPage } from "../pages/others-costs/others-costs";
import { NewFuelCostPage } from "../pages/new-fuel-cost/new-fuel-cost";
import { NewFineCostPage } from "../pages/new-fine-cost/new-fine-cost";
import { NewOthersCostPage } from "../pages/new-others-cost/new-others-cost";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { ForgetPasswordPage } from "../pages/forget-password/forget-password";
import { RegisterProfilePage } from "../pages/register-profile/register-profile";
import { RegisterCarProfilePage } from "../pages/register-car-profile/register-car-profile";
import { RepairsListPage } from '../pages/repairs-list/repairs-list';
import { RepairCardPage } from '../pages/repair-card/repair-card';
import { RepairDataPage } from '../pages/repair-data/repair-data';
import { RepairReceiptsPage } from '../pages/repair-receipts/repair-receipts';
import { RepairNewReceiptsPage } from '../pages/repair-new-receipt/repair-new-receipt';

import { RepairReceiptDetailPage } from '../pages/repair-receipt-detail/repair-receipt-detail';
import { NewRepairPage } from '../pages/new-repair/new-repair';
import { ServicesListPage } from '../pages/services-list/services-list';
import { ServiceDataPage } from '../pages/service-data/service-data';
import { NewServicePage } from '../pages/new-service/new-service';
import { NewReceiptItems } from "../pages/new-receipt-items/new-receipt-items";

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    VehiclesListPage,
    VehicleDetailsPage,
    VehicleMenuPage,
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage,
    NewFuelCostPage,
    NewFineCostPage,
    NewOthersCostPage,
    RegisterPage,
    LoginPage,
    ForgetPasswordPage,
    RegisterProfilePage,
    RegisterCarProfilePage,
    RepairsListPage,
    RepairCardPage,
    RepairDataPage,
    RepairReceiptsPage,
    RepairNewReceiptsPage,
    NewReceiptItems,
    RepairReceiptDetailPage,
    NewRepairPage,
    ServicesListPage,
    ServiceDataPage,
    NewServicePage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    VehiclesListPage,
    VehicleDetailsPage,
    VehicleMenuPage,
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage,
    NewFuelCostPage,
    NewFineCostPage,
    NewOthersCostPage,
    RegisterPage,
    LoginPage,
    ForgetPasswordPage,
    RegisterProfilePage,
    RegisterCarProfilePage,
    RepairsListPage,
    RepairCardPage,
    RepairDataPage,
    RepairReceiptsPage,
    RepairNewReceiptsPage,
    NewReceiptItems,
    RepairReceiptDetailPage,
    NewRepairPage,
    ServicesListPage,
    ServiceDataPage,
    NewServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
