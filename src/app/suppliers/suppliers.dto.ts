import { Address } from "../address/address.dto"

export interface Suppliers {
    id: number | null;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: Address;
}
