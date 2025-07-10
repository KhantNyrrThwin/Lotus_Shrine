import { useParams, useNavigate } from "react-router-dom";
import { mantras } from "../data/mantras";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";

function MantraDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mantra = mantras.find((m) => m.id === id);
  const [fontSize, setFontSize] = useState(20);

  if (!mantra) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <p className="text-xl">Mantra not found.</p>
        <button className="mt-4 px-4 py-2 bg-blue-200 rounded" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-20 min-h-screen bg-[#FDE9DA]">
        <div className="w-full max-w-2xl bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">{mantra.title}</h1>
          <div className="flex justify-center gap-4 mb-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded text-lg"
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
            >
              A-
            </button>
            <button
              className="px-3 py-1 bg-gray-200 rounded text-lg"
              onClick={() => setFontSize((s) => Math.min(48, s + 2))}
            >
              A+
            </button>
          </div>
          <div
            className="mb-6 whitespace-pre-line text-gray-800 text-center"
            style={{ fontSize }}
          >
            {mantra.text}
          </div>
          <audio controls className="w-full mb-4">
            <source src={mantra.audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button
            className="mt-2 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 rounded shadow text-gray-800 font-medium"
            onClick={() => navigate(-1)}
          >
            ← နောက်သို့
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MantraDetail; 