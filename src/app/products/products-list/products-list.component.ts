import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ProductsDto } from '../products.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarComponent } from "../../loading-bar.component";

@Component({
  selector: 'app-products-list',
  imports: [MaterialModule, ReactiveFormsModule, AsyncPipe, CurrencyPipe, MatIconModule, LoadingBarComponent],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  productService = inject(ProductsService);
  products: ProductsDto[];
  productsObservable$ : Observable<ProductsDto[]>;
  searchFrom: FormGroup;

  ngOnInit(){
    this.searchFrom = this.formBuilder.group({
      search : ['']
    })

    this.getProducts();
  }

  async getProducts(search?: string){
    this.productsObservable$ = this.productService.getAll(search);
    this.products = await lastValueFrom(this.productsObservable$);
  }

  onSearch(){
      this.getProducts(this.searchFrom.value.search);
  }
  
}
