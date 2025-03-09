import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { StoreComponent } from './business_component/store/store.component';
import { SkuComponent } from './business_component/sku/sku.component';
import { PlanningComponent } from './business_component/planning/planning.component';
import { ChartsComponent } from './business_component/charts/charts.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' }, // Default route
  { path: 'store', component: StoreComponent },
  { path: 'sku', component: SkuComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '**', redirectTo: '/store' } // Wildcard route (for unknown paths)
];

@NgModule({
  declarations: [
    StoreComponent,
    SkuComponent,
    PlanningComponent,
    ChartsComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AgGridModule

  ],
  exports:[
    StoreComponent,
    SkuComponent,
    PlanningComponent,
    ChartsComponent,
    SidebarComponent,
    NavbarComponent
  ]
})
export class HomemoduleModule { }
