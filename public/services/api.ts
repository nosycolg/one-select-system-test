import { AxiosInstance } from 'axios';
import api from './axios';

interface CustomerData {
    id: number;
    name: string;
    type: string;
    activated: boolean;
    cpf: string | null;
    cnpj: string | null;
    dateOfBirth: string;
    street: string;
    streetNumber: string;
    cep: string;
    district: string;
    city: string;
}

interface RouterData {
    id: number;
    IPv4: string;
    IPv6: string;
    brand: string;
    model: string;
    activated: boolean;
    customers?: CustomerData[];
}

interface CustomerManagementData {
    customersToAdd: number[];
    customersToRemove: number[];
}

class ApiService {
    public api: AxiosInstance;

    constructor() {
        this.api = api;
    }

    async getAllCustomers(): Promise<CustomerData[]> {
        const res = await this.api.get('/customers', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async getCustomersToAdd(): Promise<CustomerData[]> {
        const res = await this.api.get('/customers/to/add', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async getAllRouters(): Promise<RouterData[]> {
        const res = await this.api.get('/routers', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async createRouter(data: RouterData): Promise<RouterData> {
        const res = await this.api.post('/router', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async updateRouter(id: number, data: RouterData): Promise<RouterData> {
        const res = await this.api.put(`/router/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async changeRouterStatus(id: number): Promise<RouterData> {
        const res = await this.api.post(`/router/${id}/status`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async customerAssociation(id: number, data: CustomerManagementData): Promise<RouterData> {
        const res = await this.api.put(`/router/${id}/customers`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async deleteRouter(id: number) {
        const res = await this.api.delete(`/router/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }
    }

    async createCustomer(data: CustomerData): Promise<CustomerData> {
        const res = await this.api.post('/customer', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async updateCustomer(id: number, data: CustomerData): Promise<CustomerData> {
        const res = await this.api.put(`/customer/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async changeCustomerStatus(id: number): Promise<CustomerData> {
        const res = await this.api.post(`/customer/${id}/status`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async deleteCustomer(id: number) {
        const res = await this.api.delete(`/customer/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }
    }

    async getCEP(cep: string) {
        const res = await this.api.get(`https://viacep.com.br/ws/${cep}/json/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }

    async getAllLogs(action?: string) {
        const res = await this.api.get(`/logs?action=${action}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status != 200) {
            throw new Error('An error was returned');
        }

        const response = res.data;
        return response;
    }
}

export const apiService = new ApiService();
export type { CustomerData, RouterData, CustomerManagementData };
