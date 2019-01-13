import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Camera } from "@ionic-native/camera";
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from "./app.component";
import { UserProfilePage } from "../pages/user-profile/user-profile";
import { VehicleProfilePage } from "../pages/vehicle-profile/vehicle-profile";
import { VehicleDetailsPage } from "../pages/vehicle-details/vehicles-details";
import { VehicleMenuPage } from "../pages/vehicle-menu/vehicle-menu";
import { VehicleCostsPage } from "../pages/vehicle-costs/vehicle-costs";
import { FuelCostsPage } from "../pages/fuel-costs/fuel-costs";
import { FineCostsPage } from "../pages/fine-costs/fine-costs";
import { OthersCostsPage } from "../pages/others-costs/others-costs";
import { PeriodicCostsPage } from "../pages/periodic-costs/periodic-costs";
import { NewFuelCostPage } from "../pages/new-fuel-cost/new-fuel-cost";
import { NewFineCostPage } from "../pages/new-fine-cost/new-fine-cost";
import { NewOthersCostPage } from "../pages/new-others-cost/new-others-cost";
import { NewPeriodicCostPage } from "../pages/new-periodic-cost/new-periodic-cost";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { ForgetPasswordPage } from "../pages/forget-password/forget-password";
import { RegisterProfilePage } from "../pages/register-profile/register-profile";
import { RegisterCarProfilePage } from "../pages/register-car-profile/register-car-profile";
import { RepairsListPage } from "../pages/repairs-list/repairs-list";
import { RepairCardPage } from "../pages/repair-card/repair-card";
import { RepairDataPage } from "../pages/repair-data/repair-data";
import { RepairReceiptsPage } from "../pages/repair-receipts/repair-receipts";
import { RepairNewReceiptsPage } from "../pages/repair-new-receipt/repair-new-receipt";
import { RepairReceiptDetailPage } from "../pages/repair-receipt-detail/repair-receipt-detail";
import { NewRepairPage } from "../pages/new-repair/new-repair";
import { ServicesListPage } from "../pages/services-list/services-list";
import { ServiceDataPage } from "../pages/service-data/service-data";
import { NewServicePage } from "../pages/new-service/new-service";
import { NewReceiptItems } from "../pages/new-receipt-items/new-receipt-items";
import { CheckVerificationCodePage } from "../pages/check-verification-code/check-verification-code";

// import { LoginService } from "../services/login";

import { SharedModule } from "../pages/shared/shared.module"

@NgModule({
  declarations: [
    MyApp,
    UserProfilePage,
    VehicleProfilePage,
    VehicleDetailsPage,
    VehicleMenuPage,
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage,
    PeriodicCostsPage,
    NewFuelCostPage,
    NewFineCostPage,
    NewOthersCostPage,
    NewPeriodicCostPage,
    RegisterPage,
    LoginPage,
    CheckVerificationCodePage,
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
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule, SharedModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserProfilePage,
    VehicleProfilePage,
    VehicleDetailsPage,
    VehicleMenuPage,
    VehicleCostsPage,
    FuelCostsPage,
    FineCostsPage,
    OthersCostsPage,
    PeriodicCostsPage,
    NewFuelCostPage,
    NewFineCostPage,
    NewOthersCostPage,
    NewPeriodicCostPage,
    RegisterPage,
    LoginPage,
    CheckVerificationCodePage,
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
    // LoginService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
