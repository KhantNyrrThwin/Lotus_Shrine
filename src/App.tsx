import HomePage from "./pages/home";
import AboutUs from "./pages/aboutus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css"
import Grid_Features from "./components/features";
import LoginPage from "./pages/login";
import SigninPage from "./pages/signin";
import First from "./koe_na_win_grades/first";
import KoeNaWinGrades from "./pages/KoeNaWinGrades";
import Mission from "./pages/mission";
import KoeNaWin from "./pages/koenawin";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
      
        <Router>
      
          <Routes>
            <Route path="/koe_na_win_grades" element={<KoeNaWinGrades />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/koenawin" element={<KoeNaWin />} />
            <Route path="/first" element={<First  />} />
            <Route path="/login" element={<LoginPage  />} />
            <Route path="/signin" element={<SigninPage  />} />
            <Route path="/" element={<HomePage  />}>
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
