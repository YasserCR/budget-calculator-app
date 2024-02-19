import axios, { Axios } from "axios";
import { Customer } from "../types/Customer";

const url = import.meta.env.VITE_REACT_APP_API_URL;

export default class CustomerClient {
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: url,
        });
    }

    public async getAllClients() {
        const response = await this.axiosClient.get("/client");
        return response.data;
    }

    public async createClient(client: Customer) {
        const response = await this.axiosClient.post('/client', client);
        return response.data;
    }

    public async deleteClient(id: number) {
        const response = await this.axiosClient.delete(`/client/${id}`);
        return response.data;
    }

    public async updateClient(id: number, client: Customer) {
        const response = await this.axiosClient.put(`/client/${id}`, client);
        return response.data;
    }
}
