import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import app from '../app/index';
import { $Enums, PrismaClient } from '@prisma/client';

interface RouterData {
    id: number;
    IPv4: string;
    IPv6: string;
    brand: string;
    model: string;
    customers?: CustomerData[];
}

interface CustomerData {
    id: number;
    name: string;
    type: $Enums.CustomerType;
    cpf: string | null;
    cnpj: string | null;
    dateOfBirth: Date;
    street: string;
    streetNumber: string;
    cep: string;
    district: string;
    city: string;
    activated: boolean | null;
    routerId: number | null;
}

const prisma = new PrismaClient();
const agent = supertest.agent(app);
let junior_customer: CustomerData;
let pleno_customer: CustomerData;
let junior_router: RouterData;

describe('routers api test', () => {
    beforeAll(async () => {
        await prisma.$connect();
        await prisma.customer.deleteMany();
        await prisma.router.deleteMany();
        junior_customer = await prisma.customer.create({
            data: {
                name: 'junior customer',
                type: 'PERSON',
                cpf: '942.998.104-66',
                dateOfBirth: new Date(),
                street: 'rua niederauer',
                streetNumber: '1010',
                cep: '54767-160',
                district: 'bom fim',
                city: 'santa maria',
            },
        });
        pleno_customer = await prisma.customer.create({
            data: {
                name: 'pleno customer',
                type: 'PERSON',
                cpf: '222.998.104-66',
                dateOfBirth: new Date(),
                street: 'rua niederauer',
                streetNumber: '1010',
                cep: '54767-160',
                district: 'bom fim',
                city: 'santa maria',
            },
        });
        junior_router = await prisma.router.create({
            data: {
                IPv4: '192.108.0.8',
                IPv6: '2001:0000:130F:0000:0000:09C0:876A:130B',
                brand: 'LG',
                model: 'XM365',
            },
        });
    });

    afterAll(async () => {
        await prisma.customer.deleteMany();
        await prisma.router.deleteMany();
        await prisma.$disconnect();
    });

    test('get all routers', async () => {
        const res = await agent.get('/routers');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('get router by id', async () => {
        const res = await agent.get(`/router/${junior_router.id}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            IPv4: '192.108.0.8',
            IPv6: '2001:0000:130F:0000:0000:09C0:876A:130B',
            brand: 'LG',
            model: 'XM365',
        });
    });

    test('get router by non-existent id', async () => {
        const res = await agent.get(`/router/-1`);

        expect(res.status).toBe(404);
    });

    test('create and update router', async () => {
        const created_router = await agent.post(`/router`).send({
            IPv4: '192.108.0.8',
            IPv6: '2001:0000:130F:0000:0000:09C0:876A:130B',
            brand: 'LG',
            model: 'XM365',
        });
        expect(created_router.status).toBe(200);

        let logs = await agent.get('/logs?action=LOG_ACTION_ROUTER_CREATED');
        expect(logs.status).toBe(200);
        expect(Array.isArray(logs.body)).toBe(true);
        expect(logs.body.length).toBeGreaterThan(0);

        const get_created_router = await agent.get(`/router/${created_router.body.id}`);

        expect(get_created_router.status).toBe(200);
        expect(get_created_router.body).toMatchObject({
            IPv4: '192.108.0.8',
            IPv6: '2001:0000:130F:0000:0000:09C0:876A:130B',
            brand: 'LG',
            model: 'XM365',
        });

        const updated_router = await agent.put(`/router/${created_router.body.id}`).send({
            IPv4: '192.108.0.3',
            IPv6: '2001:0002:130F:0000:0000:09C0:876A:130B',
            brand: 'LG2',
            model: 'XM3654',
        });
        expect(updated_router.status).toBe(200);

        logs = await agent.get('/logs?action=LOG_ACTION_ROUTER_UPDATED');
        expect(logs.status).toBe(200);
        expect(Array.isArray(logs.body)).toBe(true);
        expect(logs.body.length).toBeGreaterThan(0);

        const get_updated_router = await agent.get(`/router/${created_router.body.id}`);

        expect(get_updated_router.status).toBe(200);
        expect(get_updated_router.body).toMatchObject({
            IPv4: '192.108.0.3',
            IPv6: '2001:0002:130F:0000:0000:09C0:876A:130B',
            brand: 'LG2',
            model: 'XM3654',
        });
    });

    test('create router with invalid body', async () => {
        const res = await agent.post(`/router`).send({});
        expect(res.status).toBe(400);
    });

    test('update non-existent router', async () => {
        const res = await agent.put(`/router/-1`).send({
            IPv4: '192.108.0.3',
            IPv6: '2001:0002:130F:0000:0000:09C0:876A:130B',
            brand: 'LG2',
            model: 'XM3654',
        });
        expect(res.status).toBe(404);
    });

    test('update with invalid body', async () => {
        const res = await agent.put(`/router/${junior_router.id}`).send({});
        expect(res.status).toBe(400);
    });

    test('change router status', async () => {
        let res = await agent.post(`/router/${junior_router.id}/status`);
        expect(res.status).toBe(200);

        res = await agent.get(`/router/${res.body.id}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            activated: false,
        });
    });

    test('change non-existent router status', async () => {
        const res = await agent.post(`/router/-1/status`);
        expect(res.status).toBe(404);
    });

    test('update router customers', async () => {
        let res = await agent.put(`/router/${junior_router.id}/customers`).send({
            customersToAdd: [junior_customer.id, pleno_customer.id],
            customersToRemove: [],
        });
        expect(res.status).toBe(200);

        res = await agent.get(`/router/${junior_router.id}`);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            customers: [
                { id: junior_customer.id, name: 'junior customer' },
                { id: pleno_customer.id, name: 'pleno customer' },
            ],
        });

        res = await agent.put(`/router/${junior_router.id}/customers`).send({
            customersToAdd: [junior_customer.id],
            customersToRemove: [pleno_customer.id],
        });
        expect(res.status).toBe(200);

        res = await agent.get(`/router/${junior_router.id}`);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            customers: [{ id: junior_customer.id, name: 'junior customer' }],
        });
    });

    test('update router customers', async () => {
        const res = await agent.put(`/router/-1/customers`).send({
            customersToAdd: [junior_customer.id, pleno_customer.id],
            customersToRemove: [],
        });
        expect(res.status).toBe(404);
    });

    test('delete router', async () => {
        let res = await agent.delete(`/router/${junior_router.id}`);
        expect(res.status).toBe(200);

        const logs = await agent.get('/logs?action=LOG_ACTION_ROUTER_DELETED');
        expect(logs.status).toBe(200);
        expect(Array.isArray(logs.body)).toBe(true);
        expect(logs.body.length).toBeGreaterThan(0);

        res = await agent.get(`/router/${junior_router.id}`);
        expect(res.status).toBe(404);
    });

    test('delete invalid router', async () => {
        const res = await agent.delete(`/router/-1`);
        expect(res.status).toBe(404);
    });
});
