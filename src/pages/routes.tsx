import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { authStore } from "@/store/auth-store";

import Home from "./home";
import Login from "./login";
import NotFound from "./not-found";
import Register from "./register";
import { ROUTES } from "@/lib/constants";

function Routes(): React.JSX.Element | undefined {
  if (authStore.isAuthenticated === undefined) {
    return undefined;
  }

  return (
    <RouterRoutes>
      {authStore.isAuthenticated ? (
        <>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </>
      )}
    </RouterRoutes>
  );
}

export default observer(Routes);
