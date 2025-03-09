import { Component } from "@angular/core";
import { ColDef, GridOptions, GridApi, RowDragEndEvent } from "ag-grid-community";

import { ChangeDetectorRef } from '@angular/core';
import { SAMPLE_DATA } from "../../assets/sampleData";
@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"]
})
export class StoreComponent {
  constructor(private cdr: ChangeDetectorRef) { }
  private gridApi!: GridApi;
  // { seqId: 1, id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },

  seqId: any;
  id: any;
  label: any;
  city: any;
  state: any;
  showForm: boolean = false;
  columnDefs = [
    {
      headerName: '',
      cellRenderer: (params: any) => {
        return `<button class="delete-btn" data-id="${params.data.ID}">🗑</button>`;
      },
      width: 50
    },
    
    {
      headerName: "S.No",
      field: "seqId",
      width: 80,

    },
    { headerName: "Store Name", field: "label", width: 250, editable: true },
    { headerName: "City", field: "city", width: 100, editable: true },
    { headerName: "State", field: "state", width: 100, editable: true },
    
  ];


  deleteStore(node: any) {
    if (!node) return;

    this.gridApi.applyTransaction({ remove: [node.data] });
  }
  rowData = [] = SAMPLE_DATA.stores;

  gridOptions: GridOptions = {
    rowSelection: "multiple",
    suppressRowClickSelection: false,
    defaultColDef: { sortable: true, filter: true },
    rowDragManaged: true,
    animateRows: true
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

    // Listen for delete button clicks
    this.gridApi.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('delete-btn')) {
        this.deleteStore(event.node);
      }
    });
  }
  toggleAddForm() {
    this.showForm = !this.showForm;
  }

  addStore() {

    const newstore = {
      seqId: this.seqId,
      id: this.id,
      label: this.label,
      city: this.city,
      state: this.state
    };

    this.rowData = [...this.rowData, newstore];
    this.cdr.detectChanges();
    this.showForm = false;
    this.resetForm();
  }

  resetForm() {
    this.seqId = '';
    this.id = '';
    this.label = '';
    this.city = '';
    this.state = '';

  }
 

  removeSelected() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.rowData = this.rowData.filter(row => !selectedRows.includes(row));
    this.gridApi.setGridOption('rowData', this.rowData);
  }

  // ✅ Handle Row Dragging (Reordering)
  onRowDragEnd(event: RowDragEndEvent) {
    const movedData = event.node.data;
    console.log("Row moved:", movedData);
  }
}
