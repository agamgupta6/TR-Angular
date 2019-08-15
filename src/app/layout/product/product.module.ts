import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPrintModule} from 'ngx-print';

import { ProductRoutingModule } from './product-routing.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ReactiveFormsModule, FormsModule as FormModule } from '@angular/forms';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatError,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
@NgModule({
  declarations: [ProductSearchComponent, ProductViewComponent, ProductAddComponent, ProductDeleteComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatToolbarModule,
    FormModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxPrintModule
  ]
})
export class ProductModule {}
