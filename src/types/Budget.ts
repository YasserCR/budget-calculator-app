import { Customer } from "./Customer";

export type Budget = {
    id?: number;
    nameBudget: string;
    customerId: Customer;
    total: number;
    startDate: string;
    endDate: string;
    status: string;
    active: boolean;
    generated: boolean;
    accepted: boolean;
}