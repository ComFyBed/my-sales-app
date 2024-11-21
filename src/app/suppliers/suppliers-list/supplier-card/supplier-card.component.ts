import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Suppliers } from '../../suppliers.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'supplier-card',
  imports: [MatCardModule, RouterLink],
  template: `
  <mat-card class="item">
  <mat-card-content [routerLink]="['show',supplier.id]">
    <mat-card-subtitle>{{supplier.companyName}}</mat-card-subtitle>
    <span>{{supplier.contactName}}</span><br />
    <span>{{supplier.address.phone}}</span>
  </mat-card-content>
  </mat-card>
  `,
  styles: `
      mat-card:hover {
        background: gray;
        color: white;
        mat-card-subtitle {
          color: white;
        }
      }
  
  `
})
export class SupplierCardComponent {

  @Input({required: true}) supplier: Suppliers;
}
