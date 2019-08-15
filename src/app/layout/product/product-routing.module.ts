import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSearchComponent
  },
  {
    path: 'search',
    component: ProductSearchComponent
  },
  {
    path: 'view/:id',
    component: ProductViewComponent
  },
  {
    path: 'add',
    component: ProductAddComponent
  },
  {
    path: 'delete',
    component: ProductDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
