import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ArrowLeft, Camera, Eye } from "lucide-react";

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

export default function PagodaView() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pagoda = location.state?.pagoda as Pagoda;
  const [selectedDayPagoda, setSelectedDayPagoda] = useState<CameraView | null>(null);
  const [isDayPagodaModalOpen, setIsDayPagodaModalOpen] = useState(false);

  // Generate camera views based on the actual KuToTaw folder structure
  const cameraViews: CameraView[] = [
    {
      id: 1,
      name: "Main Pagoda",
      nameMyanmar: "အဓိကဘုရား",
      image: "/src/assets/KuToTaw/Main Pagoda/MainPagoda1.jpg",
      description: "Main pagoda entrance view",
      descriptionMyanmar: "အဓိကဘုရား ဝင်ပေါက်မြင်ကွင်း"
    },
    {
      id: 2,
      name: "Side Pagoda",
      nameMyanmar: "ဘေးဘုရား",
      image: "/src/assets/KuToTaw/Side Pagoda/SidePagoda1.jpg",
      description: "Side pagoda view",
      descriptionMyanmar: "ဘေးဘုရား မြင်ကွင်း"
    },
    {
      id: 3,
      name: "Bell & View",
      nameMyanmar: "ခေါင်းလောင်းနှင့် မြင်ကွင်း",
      image: "/src/assets/KuToTaw/Bell & View/Bell.jpg",
      description: "Bell tower and surrounding view",
      descriptionMyanmar: "ခေါင်းလောင်းတိုက်နှင့် ပတ်ဝန်းကျင်မြင်ကွင်း"
    },
    {
      id: 4,
      name: "Day Pagodas",
      nameMyanmar: "နေ့စဉ်ဘုရားများ",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Sun.jpg",
      description: "Choose from 8 different day-specific pagodas",
      descriptionMyanmar: "နေ့စဉ်ဘုရား ၈ ဆူမှ ရွေးချယ်ရှိခိုးနိုင်သည်"
    }
  ];

  const handleCameraClick = (cameraView: CameraView) => {
    if (cameraView.id === 4) {
      // For Day Pagodas, show selection modal
      setSelectedDayPagoda(cameraView);
      setIsDayPagodaModalOpen(true);
    } else {
      // For other views, navigate directly
      navigate(`/pagoda-pray/${pagoda?.id}/${cameraView.id}`, {
        state: { pagoda, cameraView }
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  // Day Pagodas data
  const dayPagodas = [
    {
      id: 1,
      name: "Monday",
      nameMyanmar: "တနင်္လာ",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Mon.jpg",
      description: "Monday pagoda for prayer"
    },
    {
      id: 2,
      name: "Tuesday",
      nameMyanmar: "အင်္ဂါ",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Tues.jpg",
      description: "Tuesday pagoda for prayer"
    },
    {
      id: 3,
      name: "Wednesday",
      nameMyanmar: "ဗုဒ္ဓဟူး",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Wed.jpg",
      description: "Wednesday pagoda for prayer"
    },
    {
      id: 4,
      name: "Thursday",
      nameMyanmar: "ကြာသပတေး",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Thurs.jpg",
      description: "Thursday pagoda for prayer"
    },
    {
      id: 5,
      name: "Friday",
      nameMyanmar: "သောကြာ",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Fri.jpg",
      description: "Friday pagoda for prayer"
    },
    {
      id: 6,
      name: "Saturday",
      nameMyanmar: "စနေ",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Sat.jpg",
      description: "Saturday pagoda for prayer"
    },
    {
      id: 7,
      name: "Sunday",
      nameMyanmar: "တနင်္ဂနွေ",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Sun.jpg",
      description: "Sunday pagoda for prayer"
    },
    {
      id: 8,
      name: "Rahu",
      nameMyanmar: "ရာဟု",
      image: "/src/assets/KuToTaw/Day Pagoda/7-Yahu.jpg",
      description: "Rahu pagoda for prayer"
    }
  ];

  const handleDayPagodaSelect = (dayPagoda: any) => {
    // Create a custom camera view for the selected day pagoda
    const customCameraView: CameraView = {
      id: dayPagoda.id,
      name: dayPagoda.name,
      nameMyanmar: dayPagoda.nameMyanmar,
      image: dayPagoda.image,
      description: dayPagoda.description,
      descriptionMyanmar: `${dayPagoda.nameMyanmar} ဘုရားတွင် ရှိခိုးဆုတောင်းခြင်း`
    };

    navigate(`/pagoda-pray/${pagoda?.id}/${customCameraView.id}`, {
      state: { pagoda, cameraView: customCameraView }
    });
  };

  if (!pagoda) {
    return (
      <div className="bg-[#FDE9DA] w-full min-h-screen">
        <Navbar />
        <div className="pt-20 text-center">
          <h1 className="text-2xl text-[#4f3016]">Pagoda not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  // Only allow access to Kuthodaw Pagoda (id: 3)
  if (pagoda.id !== 3) {
    return (
      <div className="bg-[#FDE9DA] w-full min-h-screen">
        <Navbar />
        <div className="pt-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-[#402916] mb-6">Coming Soon</h1>
            <p className="text-xl text-[#4f3016] mb-8">
              ဤဘုရားအတွက် ရှိခိုးဆုတောင်းခြင်း ဝန်ဆောင်မှုကို မကြာမီ စတင်ပေးပါမည်။
            </p>
            <button
              onClick={goBack}
              className="bg-[#4f3016] text-white px-6 py-3 rounded-lg hover:bg-[#402916] transition-colors"
            >
              ပြန်သွားရန်
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FDE9DA] w-full min-h-screen">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-[#4f3016] hover:text-[#402916] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>ပြန်သွားရန်</span>
            </button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#402916] mb-4">
              {pagoda.nameMyanmar}
            </h1>
            <p className="text-lg text-[#4f3016] max-w-3xl mx-auto leading-relaxed">
              ဘုရားဖူးများ ရှိခိုးဆုတောင်းနိုင်ရန် CCTV ကင်မရာများဖြင့် ကြည့်ရှုပါ
            </p>
          </div>
        </div>
      </div>

      {/* CCTV Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cameraViews.map((cameraView) => (
            <div
              key={cameraView.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
              onClick={() => handleCameraClick(cameraView)}
            >
              {/* Camera Header */}
              <div className="bg-[#4f3016] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  <span className="font-semibold">Camera {cameraView.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">LIVE</span>
                </div>
              </div>

              {/* Camera View */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={cameraView.image}
                  alt={cameraView.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Click to Pray Button */}
                <div className="absolute bottom-4 left-4 right-4">
                  <button className="w-full bg-white/90 backdrop-blur-sm text-[#4f3016] py-2 px-4 rounded-lg font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    ရှိခိုးဆုတောင်းရန် နှိပ်ပါ
                  </button>
                </div>
              </div>

              {/* Camera Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#402916] mb-2">
                  {cameraView.nameMyanmar}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{cameraView.name}</p>
                <p className="text-sm text-gray-700">
                  {cameraView.descriptionMyanmar}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-[#402916] mb-4 text-center">
            ညွှန်ကြားချက်များ
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#4f3016] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  ၁
                </div>
                <p className="text-gray-700">
                  ကြည့်ရှုလိုသော ကင်မရာမြင်ကွင်းကို ရွေးချယ်ပါ
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#4f3016] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  ၂
                </div>
                <p className="text-gray-700">
                  ရှိခိုးဆုတောင်းရန် ခလုတ်ကို နှိပ်ပါ
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#4f3016] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  ၃
                </div>
                <p className="text-gray-700">
                  ပြည့်စုံသော မြင်ကွင်းဖြင့် ရှိခိုးဆုတောင်းပါ
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#4f3016] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  ၄
                </div>
                <p className="text-gray-700">
                  ငြိမ်းချမ်းသော စိတ်ဖြင့် တရားထိုင်ပါ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day Pagoda Selection Modal */}
      {isDayPagodaModalOpen && selectedDayPagoda && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#402916]">
                  {selectedDayPagoda.nameMyanmar} - နေ့စဉ်ဘုရားများ
                </h2>
                <button
                  onClick={() => setIsDayPagodaModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                သင့်နေ့ဖွားနှင့် သက်ဆိုင်သော ဘုရားကို ရွေးချယ်ပါ
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dayPagodas.map((dayPagoda) => (
                  <div
                    key={dayPagoda.id}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors text-center"
                    onClick={() => handleDayPagodaSelect(dayPagoda)}
                  >
                    <img
                      src={dayPagoda.image}
                      alt={dayPagoda.name}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-[#402916] mb-1">
                      {dayPagoda.nameMyanmar}
                    </h3>
                    <p className="text-sm text-gray-600">{dayPagoda.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
