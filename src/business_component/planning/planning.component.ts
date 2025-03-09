import { Component } from '@angular/core';

import { SAMPLE_DATA } from '../../assets/sampleData';
//{ week: "W01", weekLabel: "Week 01", month: "M01", monthLabel: "Feb" },
interface WeekData {
  week: string;          // Short week identifier (e.g., 'W01', 'W02')
  weekLabel: string;     // Full week label (e.g., 'Week 01', 'Week 02')
  month: string;         // Short month identifier (e.g., 'M01', 'M02')
  monthLabel: string;    // Full month label (e.g., 'Feb', 'Mar')
}

interface SKU {
  id: any;
  price: any;
  cost: any;
  label: any;
  department: any;
}
//{ seqId: 1, id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
interface Store{
  seqId: number; id: string; label: string; city: string; state: string;
}
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})


export class PlanningComponent {
  rowData: any[] = SAMPLE_DATA.planning;

  gridApi: any;
  calender: WeekData[] = SAMPLE_DATA.calendar;
  sku: SKU[] = SAMPLE_DATA.SKUs;
  store: Store[]= SAMPLE_DATA.stores;
  getPriceById(Id: string): number {
    const skuItem = this.sku.find((item) => item.id === Id);
  
    return skuItem ? skuItem.price : 0;  
  }
  getCostById(Id: string): number {
    const skuItem = this.sku.find((item) => item.id === Id);
    return skuItem ? skuItem.cost : 0; 
  }
  getSKUById(Id: string): string  {
    const skuItem = this.sku.find((item) => item.id === Id);
    return skuItem ? skuItem.label : ''; 
  }
  getStoreById(Id: string): string {
    const skuItem = this.store.find((item) => item.id === Id);
    return skuItem ? skuItem.label : ''; 
  }
  ngOnInit() {

    this.createColumnDefs();
    this.rowData = Object.values(
      this.rowData.reduce((acc, row) => {
        let key = `${row.store}_${row.sku}`;
        if (!acc[key]) {
          acc[key] = { Store: this.getStoreById(row.id), SKU: this.getSKUById(row.sku) };
        }
        acc[key][`Sales Units_${row.week}`] = row["salesUnits"] ? row["salesUnits"] : 0;
        var salesDollars = row["salesUnits"] * this.getPriceById(row["sku"]);
        acc[key][`Sales Dollars_${row.week}`] = "$ " + salesDollars;
        var GMDollars = salesDollars - row["salesUnits"] * this.getCostById(row["sku"]);
        acc[key][`GM Dollars_${row.week}`] = "$ " + GMDollars;
        acc[key][`GM %_${row.week}`] = (GMDollars / salesDollars) * 100;
        return acc;
      }, {})
    );


    this.rowData = Object.values(this.rowData);

    console.log(this.rowData);

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('delete-btn')) {
        this.deleteRow(event.event.target.getAttribute('data-id'));
      }
    });
  }
  columnDefs: any[] = [];
  createColumnDefs() {
    this.columnDefs = [
      { headerName: 'Store', field: 'Store', sortable: true, filter: true },
      { headerName: 'SKU', field: 'SKU', sortable: true, filter: true }
    ];

    const weekColumns = this.calender.map(week => ({
      headerName: week.weekLabel,
      children: [
        {
          headerName: 'Sales Units',
          field: `Sales Units_${week.week}`,
          sortable: true,
          filter: true,
          editable: true,
          valueGetter: (params: { data?: any }) => params.data?.[`Sales Units_${week.week}`] || 0
        },
        {
          headerName: 'Sales Dollars',
          field: `Sales Dollars_${week.week}`,
          sortable: true,
          filter: true,
          valueGetter: (params: { data?: any }) => params.data?.[`Sales Dollars_${week.week}`] || 0
        },
        {
          headerName: 'GM Dollars',
          field: `GM Dollars_${week.week}`,
          sortable: true,
          filter: true,
          valueGetter: (params: { data?: any }) => params.data?.[`GM Dollars_${week.week}`] || 0
        },
        {
          headerName: 'GM Percent',
          field: `GM %_${week.week}`,
          sortable: true,
          filter: true,
          valueGetter: (params: { data?: any }) => params.data?.[`GM %_${week.week}`] || 0,
          cellStyle: (params: { value: number }) => {
            if (params.value >= 40) {
              return { backgroundColor: 'green', color: 'white' };
            } else if (params.value >= 10) {
              return { backgroundColor: 'yellow', color: 'black' };
            } else if (params.value > 5) {
              return { backgroundColor: 'orange', color: 'black' };
            } else {
              return { backgroundColor: 'red', color: 'white' };
            }
          }
        }

      ]
    }));

    this.columnDefs = [...this.columnDefs, ...weekColumns];
  }


  addRow() {
    const newItem = { sku: "NEW001", label: "New SKU", class: "Tops", department: "New Dept", price: 0, cost: 0 };
    this.rowData = [...this.rowData, newItem];
  }

  deleteRow(sku: string) {
    console.log("delete" + sku);

    this.rowData = this.rowData.filter(row => row.ID !== sku);
  }

}
