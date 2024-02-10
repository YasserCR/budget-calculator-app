import axios, { Axios } from "axios";
const url = import.meta.env.VITE_REACT_APP_API_URL;

export default class ConceptClient {
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: url,
        });
    }

    public async getAllConcepts() {
        const response = await this.axiosClient.get("/concepts");
        return response.data;
    }
}