import { Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Popular from "./components/Popular";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
