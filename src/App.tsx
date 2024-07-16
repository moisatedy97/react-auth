import { Toaster } from "./components/ui/sonner";
import Providers from "./pages/providers";
import Routes from "./pages/routes";

export default function App(): React.JSX.Element {
  return (
    <Providers>
      <main className="flex h-screen overflow-hidden">
        <Toaster />
        <Routes />
      </main>
    </Providers>
  );
}
