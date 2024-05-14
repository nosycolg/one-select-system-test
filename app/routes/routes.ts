import { Express } from 'express';
import CustomerController from '../controllers/customerController';
import RouterController from '../controllers/routerController';
import LogsController from '../controllers/logsController';

export default function init(app: Express) {
    app.get('/customers', CustomerController.getAllCustomers);
    app.get('/customer/:id', CustomerController.getCustomerById);
    app.get('/customers/to/add', CustomerController.getCustomersToAdd);
    app.post('/customer', CustomerController.createCustomer);
    app.put('/customer/:id', CustomerController.updateCustomer);
    app.post('/customer/:id/status', CustomerController.changeCustomerStatus);
    app.delete('/customer/:id', CustomerController.deleteCustomer);

    app.get('/routers', RouterController.getAllRouters);
    app.get('/router/:id', RouterController.getRouterById);
    app.post('/router', RouterController.createRouter);
    app.put('/router/:id', RouterController.updateRouter);
    app.put('/router/:id/customers', RouterController.updateRouterCustomers);
    app.post('/router/:id/status', RouterController.changeRouterStatus);
    app.delete('/router/:id', RouterController.deleteRouter);

    app.get('/logs', LogsController.getLogs);
}
