import axios, { Axios } from "axios";
import { Material } from "../types/Material";
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

    public async createMaterial(material: Material) {
        const response = await this.axiosClient.post('/material', material);
        return response.data;
    }

    public async deleteMaterial(id: number) {
        const response = await this.axiosClient.delete(`/material/${id}`);
        return response.data;
    }

    public async updateMaterial(id: number, material: Material) {
        const response = await this.axiosClient.put(`/material/${id}`, material);
        return response.data;
    }
}