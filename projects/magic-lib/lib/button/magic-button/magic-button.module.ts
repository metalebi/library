import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MagicButtonComponent } from './magic-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MagicTooltipModule } from '../../tooltip/src/magic-tooltip.module';



@NgModule({
  declarations: [
    MagicButtonComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    MagicTooltipModule
  ],
  exports:[
    MagicButtonComponent
  ]
})
export class MagicButtonModule { }
