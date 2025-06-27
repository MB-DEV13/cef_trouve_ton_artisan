import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListArtisans from "./pages/ListArtisans";
import DetailArtisan from "./pages/DetailArtisan";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";

/**
 * Le wrapper .app-wrapper transforme l'application en colonne Flex,
 * et .app-content fait en sorte que <main> prenne tout l'espace
 * restant entre le header et le footer.
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {/* Header présent sur toutes les pages */}
        <Header />

        {/* 
          app-content : flex-grow pour remplir l'espace, 
          container mt-4 : vos classes bootstrap existantes 
        */}
        <main className="app-content container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artisans" element={<ListArtisans />} />
            <Route path="/artisans/:id" element={<DetailArtisan />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer collé en bas */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
