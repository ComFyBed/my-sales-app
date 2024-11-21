import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  imports: [
    MatCardModule,
    RouterOutlet
  ],
  templateUrl: './suppliers.component.html',
  styles: ``
})
export class SuppliersComponent {

}
