import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { NewRepairFormPage } from "./pages/new-repair-form/new-repair-form";
import { EditRepairFormPage } from "./pages/edit-repair-form/edit-repair-form";
import { RepairReceiptsPage } from "./pages/repair-receipts/repair-receipts";
import { RepairsListPage } from "./pages/repairs-list/repairs-list";
import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule, IonicImageViewerModule],
  declarations: [
    NewRepairFormPage,
    EditRepairFormPage,
    RepairReceiptsPage,
    RepairsListPage
  ],
  entryComponents: [
    NewRepairFormPage,
    EditRepairFormPage,
    RepairReceiptsPage,
    RepairsListPage
  ]
})
export class RepairsModule {}
