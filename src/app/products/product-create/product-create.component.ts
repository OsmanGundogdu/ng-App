import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService]
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] = [];
  error: string = "";
  // two-way binding
  model: any = {
    name: "samsung s90",
    price: 20000,
    categoryId: "0"
  };

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  saveProduct (form: NgForm) {
    const extensions = ["jpeg","jpg","png"];
    const extension = this.model.imageUrl.split(".").pop();

    if (extensions.indexOf(extension) == -1){
      this.error = "Resim uzantısı jpeg, jpg veya png şeklinde olmalı!";
      return;
    }  


    if (this.model.categoryId == "0"){
      this.error = "Kategori seçiniz!";
      return;
    }



    const product  = { 
      id: 1, 
      name: this.model.name, 
      price: this.model.price, 
      imageUrl: this.model.imageUrl, 
      isActive: this.model.isActive, 
      description: this.model.description, 
      categoryId: this.model.categoryId 
    }

    if(form.valid) {
      this.productService.createProducts(product).subscribe(data => {
        this.router.navigate(['/products'])
      });
    } else {
      this.error = "Lütfen formu Kontrol ediniz!";
    }

    
  
    console.log(this.model);

}

}
