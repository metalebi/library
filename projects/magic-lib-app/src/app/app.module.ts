import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MagicLibModule } from 'projects/magic-lib/src/public-api';
import { GridComponent } from './grid/grid.component';
import { MagicGridModule } from 'projects/magic-lib/src/grid-api';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    MagicLibModule,
    MagicGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
