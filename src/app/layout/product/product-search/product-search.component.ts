import { ProductAddComponent } from './../product-add/product-add.component';
import { ProductDeleteComponent } from './../product-delete/product-delete.component';
import { MatTableDataSource,  MatDialog, MatDialogRef, MatSnackBar, MatSelect, MatOption, MatSelectChange, MatCheckboxChange } from '@angular/material';
import { Component, OnInit,  AfterViewInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/api/models';
import { map, filter } from 'rxjs/operators';
import { ProductResourceService } from 'src/app/api/services';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'; 

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit, AfterViewInit {
  temp: Product = {};
  products: Product[];
  dataSource = new MatTableDataSource<Product>(this.products);
  filteredProducts: Observable<Product[]>;
  searchProductText = '';
  columnsToDisplay = ['select'];
  deleteDialogRef: MatDialogRef<ProductDeleteComponent>;
  pageSize = 5;
  links: {};
  initialSelection = [];
  allowMultiSelect = true;
  fieldNames: string[];
  selection = new SelectionModel<Product>(this.allowMultiSelect, this.initialSelection);
  @ViewChild('mySel') mySel: MatSelect;
  allSelected: boolean;
  columnSelected: string[];
  constructor(private productResourceService: ProductResourceService, 
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
      this.productResourceService.getAllProductsUsingGET({ page: 0, size: this.pageSize }).subscribe(products => {
      this.dataSource.data = products;
      this.fieldNames = Object.keys(products[0]);
      this.columnsToDisplay = ['select', ...this.fieldNames.filter(key => key /* !== 'id' */)];
    });
  }

  ngAfterViewInit() {
   // this.toggleAllSelection();
  }

  /* updateFilterProducts() {
    this.filteredProducts = this.productResourceService.searchProductsUsingGET({ query: this.searchProductText }).pipe(
      map((products: Product[]) =>
        products.filter(product => {
          // return (product.descricaoDetalhada.toLocaleLowerCase().indexOf( this.searchProductText.toLocaleLowerCase()) > -1) ;
          return product;
        })
      )
    );
  } */

  autoCompleteProducts(page: number, size: number) {
    this.filteredProducts = this.productResourceService
      .searchProductsUsingGET({
        query: this.searchProductText,
        size: size,
        page: page
      })
      .pipe(
        map((products: Product[]) =>
          products.filter(product => {
            // return (product.descricaoDetalhada.toLocaleLowerCase().indexOf( this.searchProductText.toLocaleLowerCase()) > -1) ;
            return product;
          })
        )
      );
    //this.filteredProducts.subscribe(products=>this.dataSource.data=products);
  }

  filterProducts(page: number, size: number) {
    this.productResourceService
      .searchProductsUsingGET({
        query: this.searchProductText,
        size: size,
        page: page,
        sort: ['id']
      })
      .subscribe(products => {
        this.dataSource.data = products;
      });
  }

  startCase(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  filterProduct(product: Product) {
    console.log('clicked on ' + JSON.stringify(product));
    this.productResourceService.getProductUsingGET(product.id).subscribe(res => {
      this.dataSource.data = [res];
    });
  }

  resetSearch() {
    this.selection.clear();
    this.searchProductText = '';
    this.productResourceService.getAllProductsUsingGET({ page: 0, size: this.pageSize, sort: [] }).subscribe(products => {
      this.dataSource.data = products;
    });

    this.filteredProducts = this.productResourceService.searchProductsUsingGET({ query: '' });
  }

  loadProducts(page: number, size: number, sort: string[]) {
    this.selection.clear();
    if (this.searchProductText) {
      this.productResourceService
        .searchProductsUsingGET({ page: page, size: size, sort: [], query: this.searchProductText })
        .subscribe(products => {
          this.dataSource.data = products;
        });
    } else {
      this.productResourceService.getAllProductsUsingGET({ page: page, size: size, sort: [] }).subscribe(products => {
        this.dataSource.data = products;
      });
    }
  }

  editProduct() {
    this.router.navigateByUrl('/product/view/'+this.selection.selected[0].id);
    
  }

  addProduct(){
    this.router.navigateByUrl('/product/add');
  }

  deleteProduct(){
    this.deleteDialogRef = this.dialog.open(ProductDeleteComponent, {
   data: this.selection.selected[0]
  });
  this.deleteDialogRef.afterClosed().subscribe(result => {
    if(result=='success'){
      this.resetSearch();
      this.snackBar.open('Product deleted successfully!!', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass:'success',
        horizontalPosition:'center'
      });
    }

  });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  public exportJsonAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  } 

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
  }

  getAllFields(){
    return Object.keys(this.dataSource.data[0]);
  }


  toggleAllSelection() {
    if(!this.allSelected){
        this.mySel.options.forEach( (item : MatOption) => item.select());
      } else {
        this.mySel.options.forEach( (item : MatOption) => item.deselect());
      }
      this.allSelected = !this.allSelected;
      this.mySel.close();
      this.columnsToDisplay.filter(data=>{
        return this.columnSelected.indexOf(data) > -1;
      });
      console.log(this.columnsToDisplay);
  }

  toggleColumnFilter(event: MatCheckboxChange){
    console.log(event);
    if(event.checked && this.columnSelected){
      this.columnsToDisplay = ['select', ...this.columnSelected];
    }else {
      this.columnsToDisplay = ['select', ...this.fieldNames];
    }
  }

  filterColumns(event: MatSelectChange){
    console.log(event.value);
    this.columnsToDisplay = ['select', ...event.value.filter(key=>{
      return (key)?true:false;
    })];
  }
}
