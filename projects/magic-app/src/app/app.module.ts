import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { MagicGridModule } from 'projects/magic-lib/lib/grid/src/magic-grid.module';
import { MagicButtonModule } from 'projects/magic-lib/lib/button-api';
import { MagicTooltipModule } from 'projects/magic-lib/lib/tooltip-api';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    MagicGridModule,
    MagicButtonModule,
    MagicTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
