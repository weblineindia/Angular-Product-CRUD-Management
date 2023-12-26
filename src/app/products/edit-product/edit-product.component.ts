import { Component } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
//Variable declarations
productForm!: FormGroup;
isNewProduct = true;
productId!: number;
productData: Product[] = []

constructor(
  private fb: FormBuilder,
  private productService: ProductsService,
  private route: ActivatedRoute,
  private router: Router,
  private _snackBar: MatSnackBar
) {}

ngOnInit(): void {

  //Check if we get any id in params
  this.productId = Number(this.route.snapshot.paramMap.get('id')) || 0;

  //Form Declarations with validations
  this.productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    date: [null, Validators.required],
    category: ['', Validators.required]
  });

  //Preserve the values in the form
  this.productService.getProductById(this.productId).subscribe({
    next : (res:any) => {
        if(res.status === 200){
          this.productData = res.product
          this.productForm.patchValue(this.productData);
        }
      },
    error : (err : HttpErrorResponse) => {
      this._snackBar.open(err.error.message, 'Error', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  })
}

/**
 * Function - onSubmit()
 * Use - To submit the data and save in the local Storage.
 * Developed By : WeblineIndia
 */
onSubmit(): void {
  const product: Product = this.productForm.value;
  this.productService.updateProduct(product).subscribe({
    next : (res:any) => {
      if(res.status === 200){
        this._snackBar.open('Product Updated Successfully !!', 'Success', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000
        });
      }
    },
    error : (err : HttpErrorResponse) => {
      this._snackBar.open(err.error.message, 'Error', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 3000
      });
    },
    complete :() =>{
      // Write you logic to redirect
      this.router.navigate(['/products']);
    }
});
}

/**
 * Function - onCancel()
 * Use - To redirect to the listing page
 * Developed By : WeblineIndia
 */
onCancel(){
  this.router.navigate(['/products']);
}
}

