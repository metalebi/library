import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicGridComponent } from './magic-grid.component';
import { AgGridModule} from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MagicGridCustomLoadingOverlayComponent } from './renderer/custom-loading-overlay/magic-grid-custom-loading-overlay.component';
import { MagicGridTooltipComponent } from './renderer/tooltip/magic-grid-tooltip.component';
import { MagicGridFilterHeaderRendererComponent } from './renderer/filter-header-renderer/magic-grid-filter-header-renderer.component';
import { MagicGridCellRendererFrameworkComponent } from './renderer/cell-renderer-framework/magic-grid-cell-renderer-framework.component';
import { MagicGridBtnRendererComponent } from './renderer/grid-btn-renderer/magic-grid-btn-renderer.component';
import { MagicGridMasterDetailRendererComponent } from './renderer/grid-master-detail-renderer/magic-grid-master-detail-renderer.component';



@NgModule({
  declarations: [
    MagicGridComponent,
    MagicGridCustomLoadingOverlayComponent,
    MagicGridTooltipComponent,
    MagicGridFilterHeaderRendererComponent,
    MagicGridCellRendererFrameworkComponent,
    MagicGridBtnRendererComponent,
    MagicGridMasterDetailRendererComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    MagicGridComponent
  ]
})
export class MagicGridModule { }
