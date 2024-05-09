import { AxiosInstance } from "axios";
import api from "./axios";

interface CustomerData {
    name: string,
    type: string,
    cpf: number,
    cnpj: number,
    dateOfBirth: string,
    street: string,
    streetNumber: number,
    cep: number,
    district: string,
    city: string
}

class ApiService {
    public api: AxiosInstance;

    constructor() {
        this.api = api;
    }

    async getAllCustomers(): Promise<CustomerData[]> {
        const res = await this.api.get('/customers', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status != 200) {
            throw new Error("An errror was returned");
        }

        const response = res.data;
        return response;
    }

    async getAllRouters(): Promise<[]> {
        const res = await this.api.get('/routers', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status != 200) {
            throw new Error("An errror was returned");
        }

        const response = res.data;
        return response;
    }
}

export const apiService = new ApiService();
export type { CustomerData };