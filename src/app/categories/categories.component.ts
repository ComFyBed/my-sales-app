import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';

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
    CategoryFormComponent,
    MatIconModule
  ]
})
export class CategoriesComponent implements AfterViewInit {
async onDeleteCategoryClick(category: Category) {
  if (confirm('Supprimer '+category.name+' avec id ' + category.id + '?')){
    await lastValueFrom(this.categoryService.delete(category.id));
    this.loadCategories();
  }
  console.log("This what we are going to delete ", category);
}

category!: Category;


onEditCategory(category: Category) {
    console.log("Edit button has been clicked : ", category);
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
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
