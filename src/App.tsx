import Providers from "./pages/providers";
import Routes from "./pages/routes";

export default function App(): React.JSX.Element {
  return (
    <Providers>
      <main className="flex h-screen overflow-hidden">
        <Routes />
      </main>
    </Providers>
  );
}
