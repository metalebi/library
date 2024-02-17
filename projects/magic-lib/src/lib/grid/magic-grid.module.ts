import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicGridComponent } from './magic-grid/magic-grid.component';
import { AgGridModule} from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MagicGridComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MagicGridComponent
  ]
})
export class MagicGridModule { }
