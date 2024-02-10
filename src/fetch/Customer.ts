import axios, { Axios } from "axios";
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
}