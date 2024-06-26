import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { MagicGridModule } from 'projects/magic-lib/lib/grid/src/magic-grid.module';
import { MagicButtonModule } from 'projects/magic-lib/lib/button-api';
import { MagicTooltipModule } from 'projects/magic-lib/lib/tooltip-api';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
