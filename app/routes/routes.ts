import { Express } from 'express';
import CustomerController from '../controllers/customerController';
import RouterController from '../controllers/routerController';

export function init(app: Express) {
    app.get('/customers', CustomerController.getAllCustomers);
    app.get('/customer/:id', CustomerController.getCustomerById);
    app.post('/customer', CustomerController.createCustomer);
    app.put('/customer/:id', CustomerController.updateCustomer);
    app.delete('/customer/:id', CustomerController.deleteCustomer);

    app.get('/routers', RouterController.getAllRouters);
    app.get('/router/:id', RouterController.getRouterById);
    app.post('/router', RouterController.createRouter);
    app.put('/router/:id', RouterController.updateRouter);
    app.delete('/router/:id', RouterController.deleteRouter);

    app.put('/router/:id/customers', RouterController.updateRouterCustomers);
}
