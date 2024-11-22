import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuppliersService } from '../suppliers.service';
import { lastValueFrom } from 'rxjs';
import { Suppliers } from '../suppliers.dto';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-suppliers-new',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent {


  supplierService = inject(SuppliersService);
  router = inject(Router);

  async onSubmit(){
    const data = await lastValueFrom(this.supplierService.save(this.newSupplierForm.value as Suppliers));
    console.log("Enregistrer : ", data);
    this.router.navigate(['/suppliers']);
  }


  formBuilder = inject(FormBuilder);

  newSupplierForm = this.formBuilder.group({
    id: [null],
    companyName: ["", [Validators.required, Validators.minLength(3)]],
    contactName: ["", [Validators.required, Validators.minLength(3)]],
    contactTitle: [""],
    address: this.formBuilder.group({
      city: ["", Validators.required],
      country: ["", Validators.required],
      phone: ["", Validators.required],
      postalCode: [null, Validators.required],
      region: ["",Validators.required],
      street: ["",Validators.required]
    }) 
  })

}
