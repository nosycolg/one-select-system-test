import { lazy } from 'react';
import * as uuid from 'uuid';

const Customers = lazy(() => import('../pages/components/subpages/customers/customers'));
const Routers = lazy(() => import('../pages/components/subpages/routers/routers'));

const coreRoutes = [
    {
        path: '/customers',
        title: 'Customers',
        component: Customers,
        id: uuid.v4(),
    },
    {
        path: '/routers',
        title: 'Routers',
        component: Routers,
        id: uuid.v4(),
    }
];

const routes = [...coreRoutes];
export default routes;