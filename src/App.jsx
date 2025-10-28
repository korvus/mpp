import "./style/App.css";
import { useContext } from "react";
import Col from "./components/menu";
import Map from "./components/map";
import SeoManager from "./components/SeoManager.jsx";
import { PinContextProvider, PinContext } from "./store.jsx";

const Layout = () => {
  const { dictionary } = useContext(PinContext);
  const sidebarLabel = dictionary?.sidebarLabel || "Pastry filters";
  const mapLabel = dictionary?.mapLabel || "Interactive pastry map";

  return (
    <>
      <SeoManager />
      <div className="layout">
        <aside className="sidebar" aria-label={sidebarLabel}>
          <Col />
        </aside>
        <main className="map-area" aria-label={mapLabel}>
          <Map />
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <PinContextProvider>
      <Layout />
    </PinContextProvider>
  );
}

export default App;
