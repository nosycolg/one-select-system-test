import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Loader from "../components/ui/loader";
import Customers from "../pages/components/subpages/customers/customers";
import routes from "./index";
import React from "react";
const Home = lazy(() => import('../pages/index'));

export default function Router() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/">
                    <Route path="/" element={<Home />}>
                        <Route index element={<Customers />} />
                        {routes.map(({ path, component: Component }) => (
                            <Route
                                path={path}
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Component />
                                    </Suspense>
                                }
                            />
                        ))}
                    </Route>
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </Suspense>
    );
}