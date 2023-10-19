import { Route, Routes } from "react-router-dom";
import AnimePage from "./pages/AnimePage";
import Gallery from "./pages/Gallery";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
