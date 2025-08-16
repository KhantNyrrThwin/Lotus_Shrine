import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Pagoda {
  id: number;
  name: string;
  nameMyanmar: string;
  location: string;
  description: string;
  descriptionMyanmar: string;
  image: string;
  category: string;
  features: string[];
}

interface CameraView {
  id: number;
  name: string;
  nameMyanmar: string;
  image: string;
  description: string;
  descriptionMyanmar: string;
}

export default function PagodaPray() {
  const location = useLocation();
  const navigate = useNavigate();
  const pagoda = location.state?.pagoda as Pagoda;
  const cameraView = location.state?.cameraView as CameraView;

  const goBack = () => {
    navigate(-1);
  };

  if (!pagoda || !cameraView) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-2xl">Pagoda or camera view not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Full-screen image */}
      <img
        src={cameraView.image}
        alt={cameraView.name}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{
          imageRendering: 'crisp-edges',
          filter: 'contrast(1.1) saturate(1.2)'
        }}
      />

      {/* Enhanced Overlay with Virtual Vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">ပြန်သွားရန်</span>
          </button>
          
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-2 text-shadow-lg">{pagoda.nameMyanmar}</h1>
            <p className="text-lg opacity-90 text-shadow-md">{cameraView.nameMyanmar}</p>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
        <div className="text-center text-white">
          <p className="text-lg opacity-90 mb-2 text-shadow-md">
            ဤဘုရားကို ရှိခိုးဆုတောင်းနေစဉ် ငြိမ်းချမ်းသော စိတ်ကို ထိန်းသိမ်းပါ
          </p>
          <p className="text-sm opacity-70 text-shadow-sm">
            ငြိမ်းချမ်းသော စိတ်ဖြင့် ဆုတောင်းပါ
          </p>
        </div>
      </div>

      {/* Enhanced Virtual Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles with virtual vibe */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000 shadow-md"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse delay-2000 shadow-lg"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-3000 shadow-md"></div>
        
        {/* Additional virtual elements */}
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-amber-300/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-blue-300/30 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-green-300/25 rounded-full animate-pulse delay-2500"></div>
      </div>
    </div>
  );
}