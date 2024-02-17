import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community'



@Component({
  selector: 'magic-grid',
  templateUrl: './magic-grid.component.html',
  styleUrls: ['./magic-grid.component.scss']
})
export class MagicGridComponent {
  constructor() { }
  themeClass = 'ag-theme-quartz';

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];

}
