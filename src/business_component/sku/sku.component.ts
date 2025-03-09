import { Component, OnInit } from '@angular/core';

import { SAMPLE_DATA } from '../../assets/sampleData';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.css']
})
export class SkuComponent {
  // const newItem = { sku: "NEW001", label: "New SKU", class: "Tops", department: "New Dept", price: 0, cost: 0 };
  constructor(private cdr: ChangeDetectorRef) { }
  sku: any;
  label: any;
  class: any;
  department: any;
  price: any;
  cost: any;
  isModalVisible: boolean = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }


  rowData: any[] = SAMPLE_DATA.SKUs;
  columnDefs = [
    {
      headerName: '',
      cellRenderer: (params: any) => {
        return `<button class="delete-btn" data-id="${params.data.id}">🗑</button>`;
      },
      width: 70
    },
    { field: 'label', headerName: 'SKU', sortable: true, filter: true, editable: true },
    { field: 'price', headerName: 'Price', sortable: true, filter: true, editable: true },
    { field: 'cost', headerName: 'Cost', sortable: true, filter: true, editable: true },

  ];
  gridApi: any;


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('delete-btn')) {
        this.deleteRow(event.event.target.getAttribute('data-id'));
      }
    });
  }

  showForm: boolean = false;

  // This function toggles the visibility of the form
  toggleAddForm() {
    this.showForm = !this.showForm;
  }

  // This function adds a new SKU to the grid
  addSku() {

    const newSku = {
      sku: this.sku,
      label: this.label,
      class: this.class,
      department: this.department,
      price: this.price,
      cost: this.cost
    };


    console.log('Adding SKU:', newSku);
    this.rowData = [...this.rowData, newSku];
    this.cdr.detectChanges();
    this.showForm = false;
    this.resetForm();
  }

  resetForm() {
    this.sku = '';
    this.label = '';
    this.class = '';
    this.department = '';
    this.price = 0;
    this.cost = 0;
    this.showForm = false;
  }
  deleteRow(sku: string) {
    console.log("delete" + sku);
    this.rowData = this.rowData.filter(row => row.id !== sku);
  }
}
