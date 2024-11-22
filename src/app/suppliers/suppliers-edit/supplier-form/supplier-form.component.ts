import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Suppliers } from '../../suppliers.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'supplier-form',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
  styles: ``
})
export class SupplierFormComponent {

  @Input()
  set supplier(supplier: Suppliers){
    this.supplierForm.setValue(supplier);
  }

  @Output() save = new EventEmitter<Suppliers>();
  OnEdit(){
    this.save.emit(this.supplierForm.value as Suppliers);
  }
  formBuilder = inject(FormBuilder);

  supplierForm = this.formBuilder.group({
    id: [null],
    companyName: ["", [Validators.required, Validators.minLength(3)]],
    contactName: ["", [Validators.required, Validators.minLength(3)]],
    contactTitle: [""],
    address: this.formBuilder.group({
      city: [""],
      country: [""],
      phone: [""],
      postalCode: [null],
      region: [""],
      street: [""]
    }) 
  })



}
