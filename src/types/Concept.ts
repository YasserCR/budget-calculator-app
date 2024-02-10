import { Activity } from "./Activity";
import { Budget } from "./Budget";
import { Material } from "./Material";

export type Concept = {
    budgetId: Budget;
    activityId: Activity;
    materialId: Material;
    description: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    startDate: string;
    endDate: string;
}