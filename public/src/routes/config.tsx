import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Loader from "../components/ui/loader";
import Initial from "../pages/home/components/subpages/initial";
import routes from "./index";
import React from "react";
const Home = lazy(() => import('../pages/home/index'));


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
                        <Route index element={<Initial />} />
                        {routes.map(({ path, component: Component, id }) => (
                            <Route
                                path={path}
                                key={id}
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Component />
                                    </Suspense>
                                }
                            />
                        ))}
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}