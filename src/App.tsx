import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import AboutUs from "./pages/aboutus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Grid_Features from "./components/features";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/features" element={<Grid_Features />} />
            </Route>
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </Router>
      </AnimatePresence>
    </>
  );
}

export default App;
