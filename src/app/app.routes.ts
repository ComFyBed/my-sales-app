import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { SuppliersShowComponent } from './suppliers/suppliers-show/suppliers-show.component';
import { SuppliersEditComponent } from './suppliers/suppliers-edit/suppliers-edit.component';
import { SuppliersDeleteComponent } from './suppliers/suppliers-delete/suppliers-delete.component';
import { SuppliersNewComponent } from './suppliers/suppliers-new/suppliers-new.component';

export const routes: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path:'',
        component: DashboardComponent
    },
    {
        path:'suppliers',
        component: SuppliersComponent,
        children: [
            {
                path:'',
                component: SuppliersListComponent
            },
            {
                path: 'show/:id',
                component: SuppliersShowComponent
            },
            {
                path: 'edit/:id',
                component: SuppliersEditComponent
            },
            {
                path:'delete/:id',
                component: SuppliersDeleteComponent
            },
            {
                path: 'new',
                component: SuppliersNewComponent
            }
        ]
    }
];
