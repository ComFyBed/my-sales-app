import { Category } from "../categories/category.dto";
import { Suppliers } from "../suppliers/suppliers.dto";

export interface ProductsDto {
    id: number | null;
    supplier: Suppliers | null;
    category: Category | null;
    quantityPerUnit: string
    unitPrice: number
    unitsInStock: number
    discontinued: boolean
    name: string
}
