import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Suppliers } from '../suppliers.dto';
import { SuppliersService } from '../suppliers.service';
import { lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-delete',
  imports: [MaterialModule, AsyncPipe, RouterLink, LoadingBarComponent],
  templateUrl: './suppliers-delete.component.html',
  styles: ``
})
export class SuppliersDeleteComponent implements OnInit {


  // Declaration d'un observateur pour l'object fournisseur et un service pour acquerir l'id depuis suppliers/show
  // Declaration du service Suppliers qui contient les méthodes pour communiquer avec l'api
  route = inject(ActivatedRoute);
  router = inject(Router);
  suppliersObservable$: Observable<Suppliers>;
  supplierService = inject(SuppliersService);
  suppliers: Suppliers;

  // Une méthode asynchrone à cause de l'observateur reçu depuis l'api qui peut prendre du temps.
  async ngOnInit(){
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.suppliersObservable$ = this.supplierService.getById(id);
    this.suppliers = await lastValueFrom(this.suppliersObservable$);
    console.log(this.suppliers);
  }


  // Methode de supprimation
  async onConfirmation() {
    if (confirm("Supprimation de fournissuer" + this.suppliers.contactName + " :: id = " + this.suppliers.id)){
      await lastValueFrom(this.supplierService.delete(this.suppliers.id));
      this.router.navigate(['/suppliers']);
    }
  }

}
