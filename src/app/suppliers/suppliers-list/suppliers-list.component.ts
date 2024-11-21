import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Suppliers } from '../suppliers.dto';
import { SuppliersService } from '../suppliers.service';
import { LoadingBarComponent } from '../../loading-bar.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';

@Component({
  selector: 'app-suppliers-list',
  imports: [MatCardModule, CommonModule, RouterLink, MatButtonModule, LoadingBarComponent, SupplierCardComponent],
  templateUrl: './suppliers-list.component.html',
  styles: ``
})
export class SuppliersListComponent implements OnInit{

  suppliers$: Observable<Suppliers[]>;
  error: string;
  private service = inject(SuppliersService);

  async ngOnInit(){
      this.suppliers$ = this.service.getAll().pipe(
        catchError( error => {
          this.error = error.message;
          return EMPTY;
        })
      )
  }


}
