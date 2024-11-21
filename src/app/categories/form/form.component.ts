import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.dto';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'category-form',
  imports: [
    MaterialModule
  ],
  templateUrl: './form.component.html',
  styles: ``
})

export class CategoryFormComponent {

  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter<Category>();

  onSubmit(){
    console.log("Button save cliqué dans CategoryFormComponent");
    this.save.emit(this.categoryForm.value as Category);

  }

  onBack(){
    this.back.emit();
  }
  private fb = inject(FormBuilder)
  categoryForm = this.fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", Validators.required]
  })

  @Input()
  set category(category: Category){
    this.categoryForm.setValue(category);
  }
}
