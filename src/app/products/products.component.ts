import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { LoadingBarComponent } from '../loading-bar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {

}
