import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.loading = true;
      this.productService.getProducts(params["categoryId"]).subscribe(data => {
        this.products = data;
        this.loading = false;
      })
    })
  }
}


