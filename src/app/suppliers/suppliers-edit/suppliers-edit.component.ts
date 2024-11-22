import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { LoadingBarComponent } from '../../loading-bar.component';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SuppliersService } from '../suppliers.service';
import { Suppliers } from '../suppliers.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

@Component({
  selector: 'app-suppliers-edit',
  imports: [MaterialModule, LoadingBarComponent, AsyncPipe, SupplierFormComponent, RouterLink],
  templateUrl: './suppliers-edit.component.html',
  styles: ``
})
export class SuppliersEditComponent implements OnInit{

  route = inject(ActivatedRoute);
  router = inject(Router);
  supplierService = inject(SuppliersService);

  supplier!: Suppliers;
  supplierObservable$ : Observable<Suppliers>;


  async ngOnInit(){
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable$ = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable$);
    console.log(this.supplier);
  }

  async edit(supplier: Suppliers){
    const data = await lastValueFrom(this.supplierService.save(supplier));
    console.log("Modifié : ", data);
    this.router.navigate(['/suppliers/show/', supplier.id])    
  }
}
