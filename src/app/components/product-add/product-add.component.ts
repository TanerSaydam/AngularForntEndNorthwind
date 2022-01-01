import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    let expiration = localStorage.getItem("expiration")
    console.log(expiration)

     this.createProductAddForm();

  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({}, this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        this.createProductAddForm()
        //this.router.navigate(["products/add"])
        this.toastrService.success(response.message)
      },
      e=>{
        if(e.error.Errors.length>0)
        for (let i = 0; i < e.error.Errors.length; i++) {
          this.toastrService.error(e.error.Errors[i].ErrorMessage)
        }
      })
    }
    else{
      this.toastrService.error("Required field missing","Error")
    }
  }

}
