import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suppliers } from './suppliers.dto';
import { environment } from '../../environments/environment.development';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private readonly http: HttpClient) { }

  public getAll(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(environment.api + 'suppliers');
  }

  public getById(id: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(environment.api + 'suppliers/' + id)
  }

  public save(supplier: Suppliers): Observable<Suppliers> {
    if (supplier.id) return this.http.put<Suppliers>(environment.api + 'suppliers/' + supplier.id, supplier);
    return this.http.post<Suppliers>(environment.api + 'suppliers', supplier);
  }

  public delete(id?:number): Observable<Suppliers> {
    return this.http.delete<Suppliers>(environment.api + 'suppliers/' + id);
  }
  public create(): Suppliers {
    return {
      id: 0,
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: {
      city: '',
      phone: '',
      country: '',
      postalCode: 0,
      region: '',
      street: '',
      },
    };
  }
}
