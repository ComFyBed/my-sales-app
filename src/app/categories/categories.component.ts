import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom, Observable, of } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarComponent } from '../loading-bar.component';
import { FormEditComponent } from './form-edit/form-edit.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatCardModule, 
    MatButtonModule,
    MatIconModule, 
    CategoryFormComponent,
    LoadingBarComponent,
    FormEditComponent
  ]
})
export class CategoriesComponent implements AfterViewInit {
hideUpdateForm() {
  this.showEditSection = false;
  this.loadCategories();
}

showLoading: boolean = false;
showEditSection: boolean = false;

async onDeleteCategoryClick(category: Category) {
  if (confirm('Supprimer '+category.name+' avec id ' + category.id + '?')){
    await lastValueFrom(this.categoryService.delete(category.id));
    this.loadCategories();
  }
  console.log("This what we are going to delete ", category);
}

category!: Category;


onEditCategory(category: Category) {
    this.category = category;
    this.showEditSection = true;
    console.log(category);
}




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();


  // Show Form
  shoForm: boolean = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'action'];

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  constructor(private categoryService: CategoryService){}

  async loadCategories(): Promise<void> {
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }
  onNouvelleCategorie() {
    this.shoForm = true;
  }
  hideCategoryForm() {
    this.shoForm = false;
    this.loadCategories();
  }
  async onSave(category: Category) {
    const saved = await lastValueFrom(this.categoryService.save(category));
    console.log("Enregistré", saved);
    this.hideCategoryForm();
    this.hideUpdateForm();
  }

  onNewCategoryClick(){
    this.category = {
      id: 0,
      name: "",
      description: ""
    };
    this.shoForm = true;
  }
}
