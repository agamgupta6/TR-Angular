import { Product } from 'src/app/api/models';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResourceService } from 'src/app/api/services';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductAddComponent implements OnInit {
  product: Product;
  editProductForm: FormGroup;
  showForm: boolean;
  appearance = 'outline';
  group: any = {};
  fieldNames = [];
  blankProdct: Product;
  constructor(
    private productResourceService: ProductResourceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.editProductForm = new FormGroup({});
    this.blankProdct = {};
    
    this.productResourceService.getProductUsingGET(1).subscribe(product => {
      this.product = product;
      Object.keys(product).forEach(key => {
        this.fieldNames.push(key);
        this.group[key] = ['', Validators.required];
      });
      this.group['id'] = [{ value: '', disabled: true }];
      this.group['pesoBruto'] = [{ value: ''}, [Validators.min(0),Validators.max(100)]];
      this.editProductForm = this.fb.group(this.group);
      this.initializeForm();

      this.editProductForm.setValue(this.product);
      this.showForm = true;
    });
  }

  cancle() {
    this.router.navigateByUrl('/product');
  }

  reset() {
    this.editProductForm.setValue(this.product);
  }

  getAllFieldNames() {
    return [this.group];
  }

  startCase(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  submitForm() {
    this.productResourceService.createProductUsingPOST(this.editProductForm.value).subscribe(
      res => {
        this.product = res;
        this.editProductForm.setValue(this.product);
        this.snackBar.open('Product added successfully!!', '', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'success',
          horizontalPosition: 'center'
        });
        this.router.navigateByUrl('/product');
      },
      error => {
        this.snackBar.open('Product Updation failed !! Error message is: ' + error.error.title, '', {
          duration: 50000,
          verticalPosition: 'top',
          panelClass: 'error',
          horizontalPosition: 'center'
        });
      }
    );
  }
  get partNumber() {
    return this.editProductForm.get('partNumber');
  }

  get idOrganizacao() {
    return this.editProductForm.get('idOrganizacao');
  }

  get idModelo() {
    return this.editProductForm.get('idModelo');
  }

  get pesoBruto() {
    return this.editProductForm.get('pesoBruto');
  }

  get unidadePeso() {
    return this.editProductForm.get('unidadePeso');
  }

  get volume() {
    return this.editProductForm.get('volume');
  }

  get tipoProduto() {
    return this.editProductForm.get('tipoProduto');
  }

  initializeForm() {
    this.product.idProduto = null;
    this.product.id = null;
    this.product.partNumber = null;
    this.product.idOrganizacao = null;
    this.product.idModelo = null;
    this.product.pesoBruto = null;
    this.product.unidadePeso = null;
    this.product.volume = null;
    this.product.tipoProduto = null;
  }
}
