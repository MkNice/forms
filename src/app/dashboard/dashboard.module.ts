import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { SharedModule } from '../shared/shared.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DashboardComponent,
    FormsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
  exports: [
    FormsComponent,
  ]

})
export class DashboardModule { }
