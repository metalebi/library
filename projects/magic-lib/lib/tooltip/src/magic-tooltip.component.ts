import { Component } from '@angular/core';
import { MagicTooltipPosition } from '../../other/helper/type/defult.type';

@Component({
  selector: 'me-magic-tooltip',
  template: `
  <div *ngIf="tooltip?.length" class="magic-tooltip" [ngClass]="['position-'+position]"
  [class.visible]="visible"
  [style.left]="left+'px'"
  [style.top]="top+'px'">
{{tooltip}}
  </div>
  `
})
export class MagicTooltipComponent {
  position: MagicTooltipPosition = 'below';
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;
}
