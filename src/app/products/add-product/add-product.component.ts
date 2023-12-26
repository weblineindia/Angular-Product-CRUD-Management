import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
//Variable declarations
productForm!: FormGroup;
isNewProduct = true;
productId!: number;

constructor(
  private fb: FormBuilder,
  private productService: ProductsService,
  private router: Router,
  private _snackBar: MatSnackBar
) {}

ngOnInit(): void {

  //Form Declarations with validations
  this.productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    date: [null, Validators.required],
    category: ['', Validators.required]
  });
}

/**
 * Function - onSubmit()
 * Use - To submit the data and save in the local Storage.
 * Developed By : WeblineIndia
 */
onSubmit(): void {
    const product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe({
      next : (res:any) => {
        if(res.status === 200){
          this._snackBar.open('Product Added Successfully !!', 'Success', {
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
