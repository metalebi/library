import { Component, Input, OnInit } from '@angular/core';
import { IMagicGridConfigButtonHeader, IMagicGridConfigHeader } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';

@Component({
  selector: 'me-magic-grid-btn-header',
  template: `
  <div class="magic_grid_btn_header" [class.div_absolute]="header?.button?.isAbsolute"
  [ngStyle]="{'text-align':header?.button?.textAlign??'left'}">
  <button *ngFor="let item of header?.button?.buttons" [disabled]="disabledBtn(item)" (onclick)="clickItem(item)" [style]="styleBtn(item)">
    {{item?.title}}
  </button>
  </div>
  <div class="magic_grid_btn_header" [class.div_absolute]="header?.button?.isAbsolute"
  [ngStyle]="{'text-align':header?.button?.textAlign??'left'}">
  <magic-button *ngFor="let item of header?.button?.buttons" [icon]="item.icon?item.icon:''" [color]="item.color?item.color:'primary'"
  [fontSize]="'sm'" [onlyIcon]="item.onlyIcon??false" [type]="item.type??'icon'"
   [disabled]="disabledBtn(item)" (onclick)="clickItem(item)" [style]="styleBtn(item)">
    {{item?.title}}
  </magic-button>
  </div>
  `,
  styles: [`
    .magic_grid_btn_header{
      left:0;
      z-index:5;
      top:0;

    }
    .div_absolute{
      position:absolute;
      top:2px;
    }
  `]
})
export class MagicGridBtnHeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    
  }
  @Input() header?: IMagicGridConfigHeader;
  disabledBtn(btnHeader: IMagicGridConfigButtonHeader): boolean {
    if (!btnHeader?.disabled)
      return false;
    if (!(btnHeader?.disabled as any)?.name)
      return (btnHeader?.disabled as any);
    return (btnHeader?.disabled as any).call((btnHeader?.disabled as any));
  }
  styleBtn(model: IMagicGridConfigButtonHeader) {
    if (model?.type == 'fab') {
      return {
        'width': '25px', 'height': '25px', 'display': 'inline-flex', 'align-items': 'center',
        'padding-top': '3px', 'padding-left': '3px', 'margin-left': '10px', 'margin-top': '2px'
      }
    }
    return { 'line-height': '25px', 'padding-left': '5px', 'padding-right': '5px' }
  }
  clickItem(item: IMagicGridConfigButtonHeader) {
    if (item?.click)
      item?.click();
  }
}
