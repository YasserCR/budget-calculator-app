import axios, { Axios } from "axios";
import { Budget } from "../types/Budget";

const url = import.meta.env.VITE_REACT_APP_API_URL;

export default class BudgetClient {
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: url,
        });
    }

    public async getAllBudgets() {
        const response = await this.axiosClient.get("/budgets");
        return response.data;
    }

    public async createBudget(budget: Budget) {
        const response = await this.axiosClient.post('/budgets', budget);
        return response.data;
    }

    public async deleteBudget(id: number) {
        const response = await this.axiosClient.delete(`/budgets/${id}`);
        return response.data;
    }

    public async updateBudget(id: number, budget: Budget) {
        const response = await this.axiosClient.patch(`/budgets/${id}`, budget);
        return response.data;
    }
}
