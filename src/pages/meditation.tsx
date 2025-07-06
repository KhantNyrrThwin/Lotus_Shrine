import Navbar from "../components/navbar";
import Footer from "../components/footer";

function meditation() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Meditation</h1>
      </div>
      <Footer />
    </div>
  );
}

export default meditation;
