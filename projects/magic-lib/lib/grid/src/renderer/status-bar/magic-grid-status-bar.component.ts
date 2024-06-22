import { Component } from '@angular/core';
import { IStatusPanelParams } from 'ag-grid-community';
import { MagicGridComponent } from '../../magic-grid.component';

@Component({
  selector: 'me-magic-grid-status-bar',
  templateUrl: './magic-grid-status-bar.component.html',
  styleUrls: ['./magic-grid-status-bar.component.scss']
})
export class MagicGridStatusBarComponent {
  constructor(){}

  params!:IStatusPanelParams;
  agInit(params:IStatusPanelParams):void{
    this.params=params;
  }
  changeInputSearch(value:string){
    if(!(<MagicGridComponent>(this.params.context?.componentParent))?.gridConfig?.statusBar?.externalFilter){
      this.params.api.setQuickFilter(value);
      return;
    }
    (<MagicGridComponent>(this.params.context.componentParent)).textInputSearchStatusBar=value
  }

}
