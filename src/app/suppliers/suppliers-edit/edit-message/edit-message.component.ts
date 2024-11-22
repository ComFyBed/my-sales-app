import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-message',
  imports: [],
  template: `
    <h1 mat-dialog-title>Dialog Title</h1>
    <div mat-dialog-content>
      This is the content of the dialog.
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: ``
})
export class EditMessageComponent {

}
