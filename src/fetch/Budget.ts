import axios, { Axios } from "axios";
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
}