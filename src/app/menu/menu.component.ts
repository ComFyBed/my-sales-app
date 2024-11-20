import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';



interface MenuItem {
  // * This is the path of the page
  path: string,
  // * This the label which displayed in the item menu
  label: string
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule],
  template: `
    @for (item of menuItems; track item.path) {
        <a mat-list-item [href]="item.path">{{item.label}}</a>
    }
  `,
  styles: ``
})
export class MenuComponent {

  menuItems: Array<MenuItem> = [
    {
      path: '/',
      label: 'Accueil'
    },
    {
      path: '/categories',
      label: 'Catégories'
    },
    {
      path: '/suppliers',
      label: 'Fournisseurs'
    }
  ]
}
