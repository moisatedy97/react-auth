import React from "react";
import { observer } from "mobx-react-lite";

import { authStore } from "@/store/auth-store";

function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  React.useEffect(() => {
    authStore.checkAuthenticated();
  }, []);

  return <>{children}</>;
}

export default observer(AuthProvider);
