import { Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Gallery from "./pages/Gallery";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
