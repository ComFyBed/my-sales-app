import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { SuppliersService } from '../suppliers.service';
import { Suppliers } from '../suppliers.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatButtonModule, RouterLink, LoadingBarComponent],
  templateUrl: './suppliers-show.component.html',
  styles: ``
})
export class SuppliersShowComponent implements OnInit {
  route = inject(ActivatedRoute);
  service = inject(SuppliersService);

  supplier: Suppliers;

  supplierObservable$: Observable<Suppliers>;

  async ngOnInit() {
      const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
      this.supplierObservable$ = this.service.getById(id);
      this.supplier = await lastValueFrom(this.supplierObservable$);
  }
  
}
