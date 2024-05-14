import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import app from '../app/index';
const agent = supertest.agent(app);

describe('logs api test', () => {
    test('get all logs', async () => {
        const res = await agent.get('/logs');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
