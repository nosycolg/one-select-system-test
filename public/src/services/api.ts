import { AxiosInstance } from "axios";
import api from "./axios";

interface CustomerData {
    id: number,
    name: string,
    type: string,
    cpf: string,
    cnpj: string,
    dateOfBirth: Date,
    street: string,
    streetNumber: string,
    cep: string,
    district: string,
    city: string
}

interface RouterData {
    id: number,
    IPv4: string,
    IPv6: string,
    brand: string,
    model: string,
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
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }

    async getAllRouters(): Promise<RouterData[]> {
        const res = await this.api.get('/routers', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }

    async createRouter(data: RouterData) {
        const res = await this.api.post('/router', data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }

    async updateRouter(id: number, data: RouterData) {
        const res = await this.api.put(`/router/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }

    async deleteRouter(id: number) {
        const res = await this.api.delete(`/router/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }
    }

    async createCustomer(data: CustomerData) {
        const res = await this.api.post('/customer', data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }

    async updateCustomer(id: number, data: CustomerData) {
        const res = await this.api.put(`/customer/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }

    async deleteCustomer(id: number) {
        const res = await this.api.delete(`/customer/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }
    }

    async getCEP(cep: string) {
        const res = await this.api.get(`https://viacep.com.br/ws/${cep}/json/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status != 200) {
            throw new Error("An error was returned");
        }

        const response = res.data;
        return response;
    }
}

export const apiService = new ApiService();
export type { CustomerData, RouterData };