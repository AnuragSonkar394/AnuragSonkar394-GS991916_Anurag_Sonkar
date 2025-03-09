import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomemoduleModule } from '../homemodule.module';

import { Routes } from '@angular/router';
import { StoreComponent } from '../business_component/store/store.component';
import { SkuComponent } from '../business_component/sku/sku.component';
import { PlanningComponent } from '../business_component/planning/planning.component';
import { ChartsComponent } from '../business_component/charts/charts.component';



@NgModule({
  declarations: [
    AppComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    HomemoduleModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
