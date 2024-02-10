import axios, { Axios } from "axios";
const url = import.meta.env.VITE_REACT_APP_API_URL;

export default class MaterialClient {
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: url,
        });
    }

    public async getAllMaterials() {
        const response = await this.axiosClient.get("/material");
        return response.data;
    }
}