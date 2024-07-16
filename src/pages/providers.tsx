import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default Providers;
