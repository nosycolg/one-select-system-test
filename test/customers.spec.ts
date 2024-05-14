import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import app from '../app/index';
import { $Enums, PrismaClient } from '@prisma/client';

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

describe('customer api test', () => {
    beforeAll(async () => {
        await prisma.$connect();
        await prisma.customer.deleteMany();
        await prisma.router.deleteMany();
        junior_customer = await prisma.customer.create({
            data: {
                name: "junior customer",
                type: "PERSON",
                cpf: "942.998.104-66",
                dateOfBirth: new Date,
                street: "rua niederauer",
                streetNumber: "1010",
                cep: "54767-160",
                district: "bom fim",
                city: "santa maria"
            }
        });
    })

    afterAll(async () => {
        await prisma.customer.deleteMany();
        await prisma.router.deleteMany();
        await prisma.$disconnect();
    });

    test('get all customers', async () => {
        const res = await agent.get('/customers');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('get customer by id', async () => {
        const res = await agent.get(`/customer/${junior_customer.id}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            name: "junior customer",
            type: "PERSON",
            cpf: "942.998.104-66",
            dateOfBirth: junior_customer.dateOfBirth.toISOString(),
            street: "rua niederauer",
            streetNumber: "1010",
            cep: "54767-160",
            district: "bom fim",
            city: "santa maria"
        });
    });

    test('get customer by non-existent id', async () => {
        const res = await agent.get(`/customer/-1`);

        expect(res.status).toBe(404);
    });

    test('get customers to add', async () => {
        const res = await agent.get('/customers/to/add');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('create and update customer', async () => {
        const created_customer = await agent.post(`/customer`).send({
            name: "pleno customer",
            type: "PERSON",
            cpf: "942.998.204-66",
            dateOfBirth: new Date(),
            street: "rua niederauer",
            streetNumber: "1010",
            cep: "54767-160",
            district: "bom fim",
            city: "santa maria"
        });
        expect(created_customer.status).toBe(200);

        let logs = await agent.get('/logs?action=LOG_ACTION_CUSTOMER_CREATED');
        expect(logs.status).toBe(200);
        expect(Array.isArray(logs.body)).toBe(true);
        expect(logs.body.length).toBeGreaterThan(0);

        const get_created_customer = await agent.get(`/customer/${created_customer.body.id}`);

        expect(get_created_customer.status).toBe(200);
        expect(get_created_customer.body).toMatchObject({
            name: "pleno customer",
            type: "PERSON",
            cpf: "942.998.204-66",
            dateOfBirth: created_customer.body.dateOfBirth,
            street: "rua niederauer",
            streetNumber: "1010",
            cep: "54767-160",
            district: "bom fim",
            city: "santa maria"
        });

        const updated_customer = await agent.put(`/customer/${created_customer.body.id}`).send({
            name: "senior customer",
            type: "PERSON",
            cpf: "942.998.204-70",
            dateOfBirth: new Date(),
            street: "rua niederauer",
            streetNumber: "1010",
            cep: "54767-160",
            district: "bom fim",
            city: "santa maria"
        });
        expect(updated_customer.status).toBe(200);

        logs = await agent.get('/logs?action=LOG_ACTION_CUSTOMER_UPDATED');
        expect(logs.status).toBe(200);
        expect(Array.isArray(logs.body)).toBe(true);
        expect(logs.body.length).toBeGreaterThan(0);

        const get_updated_customer = await agent.get(`/customer/${created_customer.body.id}`);

        expect(get_updated_customer.status).toBe(200);
        expect(get_updated_customer.body).toMatchObject({
            name: "senior customer",
            type: "PERSON",
            cpf: "942.998.204-70",
            dateOfBirth: updated_customer.body.dateOfBirth,
            street: "rua niederauer",
            streetNumber: "1010",
            cep: "54767-160",
            district: "bom fim",
            city: "santa maria"
        });
    });

    test('create with invalid body', async () => {
        const res = await agent.post(`/customer`).send({});
        expect(res.status).toBe(400);
    });

    test('update non-existent customer', async () => {
        const res = await agent.put(`/customer/-1`).send({
            name: "senior customer",
            type: "PERSON",
            cpf: "942.998.204-70",
            dateOfBirth: new Date(),
            street: "rua niederauer",
            streetNumber: "1010",
            cep: "54767-160",
            district: "bom fim",
            city: "santa maria"
        });
        expect(res.status).toBe(404);
    });

    test('update with invalid body', async () => {
        const res = await agent.put(`/customer/${junior_customer.id}`).send({});
        expect(res.status).toBe(400);
    });

    test('change customer status', async () => {
        let res = await agent.post(`/customer/${junior_customer.id}/status`);
        expect(res.status).toBe(200);

        res = await agent.get(`/customer/${res.body.id}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            activated: false
        });
    });

    test('change non-existent customer status', async () => {
        let res = await agent.post(`/customer/-1/status`);
        expect(res.status).toBe(404);
    });

    test('delete customer', async () => {
        let res = await agent.delete(`/customer/${junior_customer.id}`);
        expect(res.status).toBe(200);

        const logs = await agent.get('/logs?action=LOG_ACTION_CUSTOMER_DELETED');
        expect(logs.status).toBe(200);
        expect(Array.isArray(logs.body)).toBe(true);
        expect(logs.body.length).toBeGreaterThan(0);

        res = await agent.get(`/customer/${junior_customer.id}`);
        expect(res.status).toBe(404);
    });

    test('delete invalid customer', async () => {
        const res = await agent.delete(`/customer/-1`);
        expect(res.status).toBe(404);
    });
});