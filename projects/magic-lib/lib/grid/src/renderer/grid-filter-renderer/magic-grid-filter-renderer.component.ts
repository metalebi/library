import { Component } from '@angular/core';
import { AgPromise, IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { MagicGridComponent } from '../../magic-grid.component';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IMagicGridColumnFilter, MagicGridColumnFilter, MagicGridFilterChecked } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';

@Component({
  selector: 'me-magic-grid-filter-renderer',
  templateUrl: './magic-grid-filter-renderer.component.html',
  styleUrls: ['./magic-grid-filter-renderer.component.scss']
})
export class MagicGridFilterRendererComponent implements IFilterAngularComp {
  filtersSelected: string[] = [];
  filterCheckedList: MagicGridFilterChecked[] = [];
  params!: IFilterParams;
  indexColumn: number = -1;
  gridComponent!: MagicGridComponent;
  textSearch: string = '';
  constructor() { }
  agInit(params: IFilterParams) {
    this.params = params;
    this.gridComponent = params?.context?.componentParent;
    this.indexColumn = this.gridComponent.gridConfig.columns?.findIndex(c => c?.field == params?.colDef?.field);
    if (this.indexColumn >= 0) {
      const filterCall = <MagicGridColumnFilter>(this.gridComponent?.gridConfig?.columns[this.indexColumn]?.filter);
      const filterListBase = filterCall?.filterListItems?.call(filterCall?.filterListItems);
      this.filterCheckedList.push({
        title: '(انتخاب همه)',
        checked: true,
        isMain: 'full'
      });
      filterListBase.forEach(element => {
        this.filterCheckedList.push({
          title: element,
          checked: true,
        });
      });
      this.setSelectedList();
    }
  }
  setSelectedList() {
    this.filtersSelected = [];
    this.filterCheckedList.filter(c => !c?.isMain && c.checked).forEach(element => {
      this.filtersSelected.push(element.title);
    });
  }
  changeChecked(item: MagicGridFilterChecked) {
    item.checked = !item.checked;
    if (item.isMain?.length) {
      item.isMain = item.checked ? 'full' : 'empty';
      this.filterCheckedList.map(c => c.checked = item.checked);
    }
    this.setSelectedList();
    if (!this.filtersSelected?.length) {
      this.filterCheckedList[0].isMain = 'empty';
    } else {
      this.filterCheckedList[0].isMain = ((this.filterCheckedList.length - 1) == (this.filtersSelected.length)) ? 'full' : 'someChecked';
    }
    this.params.filterChangedCallback();
  }
  doesFilterPass(params: IDoesFilterPassParams<any>): boolean {
    return (<IMagicGridColumnFilter>this.gridComponent?.gridConfig?.columns[this.indexColumn]?.filter)?.isFilter?.call(
      (<IMagicGridColumnFilter>this.gridComponent?.gridConfig?.columns[this.indexColumn]?.filter),
      { value: params.data, selectedItem: this.filtersSelected });
  }

  isFilterActive():boolean{return true;}
  getModel(){}
  setModel(model:any):void|AgPromise<void>{}
  onNewRowsLoaded?():void{}
  onAnyFilterChanged?():void{}
  getFrameWorkComponentInstance?(){}
  getModelAsString?(model:any):string{return '';}
  afterGuiAttached?(params?:IAfterGuiAttachedParams|undefined):void{}
}
