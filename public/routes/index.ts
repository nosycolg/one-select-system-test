import { lazy } from 'react';
import Logs from '../pages/components/subpages/logs/logs';

const Customers = lazy(() => import('../pages/components/subpages/customers/customers'));
const Routers = lazy(() => import('../pages/components/subpages/routers/routers'));

const coreRoutes = [
    {
        path: '/customers',
        title: 'Customers',
        component: Customers,
    },
    {
        path: '/routers',
        title: 'Routers',
        component: Routers,
    },
    {
        path: '/logs',
        title: 'Logs',
        component: Logs,
    },
];

const routes = [...coreRoutes];
export default routes;