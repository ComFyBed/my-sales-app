import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../category.dto';

@Component({
  selector: 'app-form-edit',
  imports: [MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './form-edit.component.html',
  styles: ``
})
export class FormEditComponent {
  
  @Input() showMessage: boolean = false


  @Input()
  set category(category: Category){
    this.editForm.setValue(category);
  }

  @Output() back = new EventEmitter();
  @Output() update = new EventEmitter<Category>();

  onBack(){
    this.back.emit();
  }

  onUpdate(){
    this.update.emit(this.editForm.value as Category)
  }
  private formBuilder = inject(FormBuilder);

  editForm = this.formBuilder.group({
    id:[null],
    name:["", [Validators.required, Validators.minLength(3)]],
    description: ["", Validators.required]
  })
}
