import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicGridComponent } from './magic-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MagicGridCustomLoadingOverlayComponent } from './renderer/custom-loading-overlay/magic-grid-custom-loading-overlay.component';
import { MagicGridTooltipComponent } from './renderer/tooltip/magic-grid-tooltip.component';
import { MagicGridFilterHeaderRendererComponent } from './renderer/filter-header-renderer/magic-grid-filter-header-renderer.component';
import { MagicGridCellRendererFrameworkComponent } from './renderer/cell-renderer-framework/magic-grid-cell-renderer-framework.component';
import { MagicGridMasterDetailRendererComponent } from './renderer/grid-master-detail-renderer/magic-grid-master-detail-renderer.component';
import { MagicGridBtnHeaderComponent } from './grid-btn-header/magic-grid-btn-header.component';
import { MagicGridBtnRendererComponent } from './renderer/magic-grid-btn-renderer/magic-grid-btn-renderer.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MagicGridFilterRendererComponent } from './renderer/grid-filter-renderer/magic-grid-filter-renderer.component';
import { MagicGridFilterRendererInputPipePipe } from './renderer/grid-filter-renderer/magic-grid-filter-renderer-input-pipe.pipe';
import { MagicTooltipModule } from '../../tooltip/src/magic-tooltip.module';
import { MagicButtonModule } from '../../button/magic-button/magic-button.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MagicGridComponent,
    MagicGridCustomLoadingOverlayComponent,
    MagicGridTooltipComponent,
    MagicGridFilterHeaderRendererComponent,
    MagicGridCellRendererFrameworkComponent,
    MagicGridBtnHeaderComponent,
    MagicGridMasterDetailRendererComponent,
    MagicGridBtnRendererComponent,
    MagicGridFilterRendererComponent,
    MagicGridFilterRendererInputPipePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MagicTooltipModule,
    MagicButtonModule,
    MatBadgeModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    MagicGridComponent
  ]
})
export class MagicGridModule { }
