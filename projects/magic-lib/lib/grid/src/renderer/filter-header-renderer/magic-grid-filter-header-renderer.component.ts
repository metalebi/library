import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterChangedEvent, IFloatingFilter, IFloatingFilterParams } from 'ag-grid-community';

@Component({
  selector: 'me-magic-grid-filter-header-renderer',
  templateUrl: './magic-grid-filter-header-renderer.component.html',
  styleUrls: ['./magic-grid-filter-header-renderer.component.css']
})
export class MagicGridFilterHeaderRendererComponent implements IFloatingFilter {
  constructor() { }
  ngOnInit(): void {
    this.valueFormControl.valueChanges.subscribe(res => {
      this.params.parentFilterInstance((instance: any) => {
        instance?.onFloatingFilterChanged('greaterThen', res);
      })
    })
  }
  onParentModelChanged(parentModel: any, filterChangeEvent?: FilterChangedEvent | null | undefined): void {

  }
  params!: IFloatingFilterParams;
  agInit(params: IFloatingFilterParams) {
    this.params = params
  }
  valueFormControl = new FormControl();
}
