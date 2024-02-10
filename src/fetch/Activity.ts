import axios, { Axios } from 'axios';
import { Activity } from '../types/Activity';
const url = import.meta.env.VITE_REACT_APP_API_URL;

export default class ActivityClient {
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: url
        });
    }

    public async getAllActivities() {
        const response = await this.axiosClient.get('/activity');
        return response.data;
    }

    public async createActivity(activity: Activity) {
        const response = await this.axiosClient.post('/activity', activity);
        return response.data;
    }

    public async deleteActivity(id: number) {
        const response = await this.axiosClient.delete(`/activity/${id}`);
        return response.data;
    }

    public async updateActivity(id: number, activity: Activity) {
        const response = await this.axiosClient.patch(`/activity/${id}`, activity);
        return response.data;
    }
}

