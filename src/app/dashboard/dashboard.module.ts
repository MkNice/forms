import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { SharedModule } from '../shared/shared.module';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { PaginationComponent } from './forms/pagination/pagination.component';
import { FilterComponent } from './forms/filter/filter.component';
import { SearchComponent } from './forms/search/search.component';
import { ActionFormDialogComponent } from './forms/dialogs/action-form-dialog/action-form-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardComponent,
    FormsComponent,
    PaginationComponent,
    FilterComponent,
    SearchComponent,
    ActionFormDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  exports: [
    FormsComponent,
  ]

})
export class DashboardModule { }
