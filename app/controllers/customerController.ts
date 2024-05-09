import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestService } from '../services/requestService';
const prisma = new PrismaClient();

class CustomerController {
    async getAllCustomers(req: Request, res: Response) {
        try {
            const customers = await prisma.customer.findMany()
            return res.success(customers)
        } catch (err) {
            return res.badRequest(err)
        }
    }

    async getCustomerById(req: Request, res: Response) {
        try {
            const customer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });
            if (!customer) {
                return res.notFound()
            }
            return res.success(customer);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err)
        }
    }

    async createCustomer(req: Request, res: Response) {
        try {
            req.body.dateOfBirth = new Date(req.body.dateOfBirth);

            const { error } = RequestService.validateCustomerData(req.body);

            if (error) {
                return res.badRequest(error.message);
            }

            const data = await prisma.customer.create({
                data: req.body,
            });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err)
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            req.body.dateOfBirth = new Date(req.body.dateOfBirth);

            const customer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });

            if (!customer) {
                return res.notFound()
            }

            const { error } = RequestService.validateCustomerData(req.body);

            if (error) {
                return res.badRequest(error.message);
            }

            const data = await prisma.customer.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err)
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        try {
            const customer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });

            if (!customer) {
                return res.notFound()
            }

            const data = await prisma.customer.delete({ where: { id: Number(req.params.id) } });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err)
        }
    }
}

export default new CustomerController();