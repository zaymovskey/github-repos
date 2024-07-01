import { type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from '../lib/routeConfig.tsx';

const AppRouter: FC = () => {
    return (
        <Routes>
            {Object.values(RouteConfig).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRouter;
