import { Product } from 'src/app/api/models';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResourceService } from 'src/app/api/services';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductViewComponent implements OnInit {
  product: Product;
  editProductForm: FormGroup;
  showForm:boolean;
  appearance= 'outline';
  group: any = {};
  fieldNames = [];

  constructor(private productResourceService: ProductResourceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.editProductForm =  new FormGroup({});
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.productResourceService.getProductUsingGET(+params.get('id')).subscribe(product => {
        this.product = product;
        Object.keys(product).forEach(key => {
          this.fieldNames.push(key);
          this.group[key] = ['', Validators.required];
        });
        //this.group['id'] = [{value:'', disabled:true}, Validators.required]
        this.editProductForm = this.fb.group(
          this.group
         );
       this.editProductForm.setValue(product);
       this.showForm = true;

      });

    });

  }

  cancle(){
    this.router.navigateByUrl('/product');
  }

  reset(){
    this.editProductForm.setValue(this.product);
  }

  getAllFieldNames(){
    return [this.group];
  }


  startCase(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  submitForm(){
     this.productResourceService.updateProductUsingPUT(this.editProductForm.value)
    .subscribe(res=>{
      this.editProductForm.setValue(res);
      this.product = res;
      this.snackBar.open('Product updated successfully!!', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass:'success',
        horizontalPosition:'center'
      });
      this.router.navigateByUrl('/product');
    }, error=>{
      this.snackBar.open('Product updation failed. Error message is: ' + error.error.title, '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass:'error',
        horizontalPosition:'center'
      });
    }); 
   

  }
  get partNumber(){
    return this.editProductForm.get('partNumber');
  }

  get idOrganizacao(){
    return this.editProductForm.get('idOrganizacao');
  }

  get idModelo(){
    return this.editProductForm.get('idModelo');
  }

  get pesoBruto(){
    return this.editProductForm.get('pesoBruto');
  }

  get unidadePeso(){
    return this.editProductForm.get('unidadePeso');
  }

  get volume(){
    return this.editProductForm.get('volume');
  }

  get tipoProduto(){
    return this.editProductForm.get('tipoProduto');
  }
}


