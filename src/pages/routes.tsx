import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { authStore } from "@/store/auth-store";

import Home from "./home";
import Login from "./login";
import NotFound from "./not-found";

function Routes(): React.JSX.Element | undefined {
  let returnElement: React.ReactNode = undefined;

  if (authStore.isAuthenticated === undefined) {
    return undefined;
  }

  if (authStore.isAuthenticated) {
    returnElement = (
      <RouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    );
  } else {
    returnElement = <Login />;
  }

  return returnElement;
}

export default observer(Routes);
