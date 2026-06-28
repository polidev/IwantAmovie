import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
