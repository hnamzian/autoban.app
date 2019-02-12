import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";

import { NewReceiptItems} from "./pages/new-receipt-items/new-receipt-items"
import { NewRepairFormPage } from "./pages/new-repair-form/new-repair-form"
import { RepairCardPage } from "./pages/repair-card/repair-card"
import { RepairDataPage } from "./pages/repair-data/repair-data"
import { RepairNewReceiptsPage } from "./pages/repair-new-receipt/repair-new-receipt"
import { RepairReceiptDetailPage } from "./pages/repair-receipt-detail/repair-receipt-detail"
import { RepairReceiptsPage } from "./pages/repair-receipts/repair-receipts"
import { RepairsListPage } from "./pages/repairs-list/repairs-list"
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    CoreModule
  ],
  declarations: [
    NewReceiptItems,
    NewRepairFormPage,
    RepairCardPage,
    RepairDataPage,
    RepairNewReceiptsPage,
    RepairReceiptDetailPage,
    RepairReceiptsPage,
    RepairsListPage,
  ],
  entryComponents: [
    NewReceiptItems,
    NewRepairFormPage,
    RepairCardPage,
    RepairDataPage,
    RepairNewReceiptsPage,
    RepairReceiptDetailPage,
    RepairReceiptsPage,
    RepairsListPage,
  ]
})
export class RepairsModule { }