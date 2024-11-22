import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDto } from './products.dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAll(recherche: string = ''): Observable<ProductsDto[]>{
    const search: string = recherche != '' ? '&q=' + recherche: '';
    return this.http.get<ProductsDto[]>(environment.api + 'products?_expand=category&_expand=supplier' + search);
  }
}
