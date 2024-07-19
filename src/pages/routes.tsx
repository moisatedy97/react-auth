import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { authStore } from "@/store/auth-store";

import Home from "./home";
import Login from "./login";
import NotFound from "./not-found";
import Register from "./register";

function Routes(): React.JSX.Element | undefined {
  if (authStore.isAuthenticated === undefined) {
    return undefined;
  }

  return (
    <RouterRoutes>
      {authStore.isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </RouterRoutes>
  );
}

export default observer(Routes);
