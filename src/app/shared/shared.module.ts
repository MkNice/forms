import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
  ]
})
export class SharedModule { }
