import { Component, OnInit } from '@angular/core';
import { IMagicGridButton, IMagicGridConfig } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http
    .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .subscribe((data) => {
      this.data = data as any[];
    });
  }

  data:any[]=[];

  gridConfig:IMagicGridConfig={
    columns:[
      {
        field: 'athlete',
        width: 200,
        headerName: 'ورزشکار',
        filter: false,
        checkboxSelection: true,
      },
      {
        field: 'age',
        width: 100,
        headerName: 'سن',
        filter: 'agNumberColumnFilter',

      },
      {
        field: 'country',
        width: 150,
        headerName: 'کشور',
        filter: 'agTextColumnFilter',
      },
      {
        field: 'year',
        width: 120,
        headerName: 'سال',
        filter: 'agDateColumnFilter',
      },
      {
        field: 'sport',
        width: 200,
        headerName: 'ورزش',
        filter: 'agMultiColumnFilter',
      },
      {
        field: 'gold',
        width: 100,
        headerName: 'طلا',
      },
      {
        field: 'silver',
        width: 100,
        headerName: 'نقره',
      },
      {
        field: 'bronze',
        width: 100,
        headerName: 'برنز',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'btn',
        pinned:'left',
        isButtonCell:true,
        headerName: ' ',
        filter: false,
      },
    ],
    statusBar:{
      show:true
    }
  }
  gridButtons:IMagicGridButton<any>={
    buttons:[
      {
        icon:'edit',
        color:'primary',
        tooltip:'آیکون',
        click:()=>{

        }
      }
    ]
  }
}
