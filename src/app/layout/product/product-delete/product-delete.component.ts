import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/api/models';
import { ProductResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  editProductForm: FormGroup;
  showForm:boolean;
  appearance= 'outline';
  group: any = {};
  fieldNames = [];
  constructor(public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private productResourceService: ProductResourceService
    ) { }

  ngOnInit() {
    this.editProductForm =  new FormGroup({});
    this.product = this.data;
    Object.keys(this.product).forEach(key => {
      this.fieldNames.push(key);
      this.group[key] = ['', Validators.required];
    });
    this.editProductForm = this.fb.group(
      this.group
     );
   this.editProductForm.setValue(this.product);
   this.showForm = true;

  }


  deleteProduct(){
    this.productResourceService.deleteProductUsingDELETE(this.product.id).subscribe(res=>{
      this.dialogRef.close('success');
    });
  }

  cancel(){
  this.dialogRef.close();
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


  getAllFieldNames(){
    return [this.group];
  }


  startCase(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

}
