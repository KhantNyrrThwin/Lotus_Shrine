import HomePage from "./pages/home";
import BooksPage from "./pages/books";
import AboutUs from "./pages/aboutus";
import ContactUs from "./pages/contactus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Grid_Features from "./components/features";
import LoginPage from "./pages/login";
import SigninPage from "./pages/signin";
import Mission from "./pages/mission";
import KoeNaWin from "./pages/koenawin";
import { Toaster } from "./components/ui/sonner";
import ForgotPassword from "./pages/forgotpassword";
import ChangePassword from "./pages/changepassword";
import RequestEmail from "./pages/requestemail";
import Meditation from "./pages/meditation";
import TayartawPage from "./pages/tayartaw";
import { MusicPlayerProvider } from "./components/MusicPlayerContext";
import MusicPlayerBar from "./components/MusicPlayerBar";
import Gonetawkoeprr from "./pages/gonetawkoeprr";
import Dhamma from "./pages/dhamma";
import MantraDetail from "./pages/mantra";
import Pagodas from "./pages/pagodas";
import PagodaView from "./pages/pagoda-view";
import PagodaPray from "./pages/pagoda-pray";
import Test from "./pages/test";

function App() {
  return (
    <MusicPlayerProvider>
      <AnimatePresence mode="wait">
        <Router>
          <Routes>
          <Route path="/test" element={<Test />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/pagodas" element={<Pagodas />} />
            <Route path="/pagoda-view/:id" element={<PagodaView />} />
            <Route path="/pagoda-pray/:pagodaId/:cameraId" element={<PagodaPray />} />
            <Route path="/requestemail" element={<RequestEmail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/gonetaw" element={<Gonetawkoeprr />} />
            <Route path="/koenawin" element={<KoeNaWin />} />
            <Route path="/tayartaw" element={<TayartawPage />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dhamma" element={<Dhamma />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/mantra/:id" element={<MantraDetail />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/" element={<HomePage />}>
              <Route path="/features" element={<Grid_Features />} />
            </Route>
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </Router>
      </AnimatePresence>
      <MusicPlayerBar />
      <Toaster />
    </MusicPlayerProvider>
  );
}

export default App;
