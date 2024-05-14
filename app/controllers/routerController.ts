import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestService } from '../services/request.service';
import { actions, logActivity } from '../services/logs.service';
const prisma = new PrismaClient();

class RouterController {
    async getAllRouters(req: Request, res: Response) {
        try {
            const router = await prisma.router.findMany({ include: { customers: { select: { id: true, name: true } } } });
            return res.success(router);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }

    async getRouterById(req: Request, res: Response) {
        try {
            const router = await prisma.router.findUnique({ where: { id: Number(req.params.id) }, include: { customers: { select: { id: true, name: true } } } });
            if (!router) {
                return res.notFound();
            }
            return res.success(router);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }

    async createRouter(req: Request, res: Response) {
        try {
            const { error } = RequestService.validateRouterData(req.body);

            if (error) {
                return res.badRequest(error.message);
            }

            const data = await prisma.router.create({
                data: req.body,
            });

            await logActivity(actions.ROUTER_CREATED, {
                RouterId: data.id,
                RouterData: {
                    Brand: data.brand,
                    Model: data.model,
                },
            });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }

    async updateRouter(req: Request, res: Response) {
        try {
            const router = await prisma.router.findUnique({ where: { id: Number(req.params.id) } });

            if (!router) {
                return res.notFound();
            }

            const { error } = RequestService.validateRouterData(req.body);

            if (error) {
                return res.badRequest(error.message);
            }

            const data = await prisma.router.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });

            await logActivity(actions.ROUTER_UPDATED, {
                RouterId: data.id,
                OldData: router,
                NewData: data,
            });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }

    async deleteRouter(req: Request, res: Response) {
        try {
            const router = await prisma.router.findUnique({ where: { id: Number(req.params.id) } });

            if (!router) {
                return res.notFound();
            }

            const data = await prisma.router.delete({ where: { id: Number(req.params.id) } });

            await logActivity(actions.ROUTER_DELETED, {
                RouterId: data.id,
                RouterData: {
                    Brand: data.brand,
                    Model: data.model,
                },
            });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }

    async updateRouterCustomers(req: Request, res: Response) {
        const { customersToAdd, customersToRemove } = req.body;

        try {
            const router = await prisma.router.findUnique({
                where: { id: Number(req.params.id) },
                include: { customers: true },
            });

            if (!router) {
                return res.notFound();
            }

            const filteredCustomersToAdd = customersToAdd.filter((customerId: number) => !router.customers.some((customer) => customer.id === customerId));

            const filteredCustomersToRemove = customersToRemove.filter((customerId: number) => router.customers.some((customer) => customer.id === customerId));

            await prisma.router.update({
                where: { id: Number(req.params.id) },
                data: {
                    customers: {
                        connect: filteredCustomersToAdd.map((customerId: number) => ({ id: customerId })),
                    },
                },
            });

            await prisma.router.update({
                where: { id: Number(req.params.id) },
                data: {
                    customers: {
                        disconnect: filteredCustomersToRemove.map((customerId: number) => ({ id: customerId })),
                    },
                },
            });

            await logActivity(actions.ROUTER_CUSTOMERS_CHANGED, {
                RouterId: router.id,
                RouterCustomersAdded: filteredCustomersToAdd,
                RouterCustomersRemoved: filteredCustomersToRemove
            });

            return res.success({
                customersToAdd,
                customersToRemove
            });
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }

    async changeRouterStatus(req: Request, res: Response) {
        try {
            const router = await prisma.router.findUnique({ where: { id: Number(req.params.id) } });

            if (!router) {
                return res.notFound();
            }

            const data = await prisma.router.update({
                where: { id: Number(req.params.id) },
                data: { activated: !router.activated },
            });

            await logActivity(actions.ROUTER_STATUS_CHANGED, {
                RouterId: data.id,
                isActivated: String(!router.activated)
            });

            return res.success(data);
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }
}

export default new RouterController();
