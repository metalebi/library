import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicTooltipDirective } from './magic-tooltip.directive';
import { MagicTooltipComponent } from './magic-tooltip.component';



@NgModule({
  declarations: [
    MagicTooltipComponent,
    MagicTooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MagicTooltipDirective,
  ]
})
export class MagicTooltipModule { }
