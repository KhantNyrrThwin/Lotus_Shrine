import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function AboutUs() {
  return (
    <>
    <Navbar />
      <div className="bg-lime-600 mt-[58px] text-yellow-400">
        <h1>This is the about us Page</h1>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
