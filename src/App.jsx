import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/ui/Header.jsx";

const Home = lazy(() => import("./pages/home.jsx"));
const Details = lazy(() => import("./pages/detail.jsx"));

function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink font-body antialiased">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:id" element={<Details />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
