import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState<string>("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    const storedName = localStorage.getItem("userName") || "";
    const storedDob = localStorage.getItem("userDob") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";
    
    setName(storedName);
    setDob(storedDob);
    setEmail(storedEmail);
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/lotus_shrine/updateUserInfo.php",
        JSON.stringify({
          email: email,
          name: name.trim(),
          dob: dob
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Update local storage
        localStorage.setItem("userName", name.trim());
        localStorage.setItem("userDob", dob);
        
        navigate("/profile");
      } else {
        setError(response.data.message || "အချက်အလက် များမှားယွင်းနေပါသည်");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "ဆာဗာနှင့် ချိတ်ဆက်မရပါ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FDE9DA] mt-[58px] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#4f3016]/10 p-8">
            <h1 className="text-3xl font-extrabold text-[#4f3016] mb-6">မိမိအကောင့် ပြင်ဆင်ရန်</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[#8B4513] font-semibold mb-2">အီးမေးလ်</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-[50px] bg-gray-100 border border-[#4f3016] rounded-[9px] p-3 cursor-not-allowed"
                />
                <p className="text-sm text-gray-500 mt-1">အီးမေးလ်ကို ပြောင်းလဲ၍မရပါ</p>
              </div>

              <div>
                <label className="block text-[#8B4513] font-semibold mb-2">အသုံးပြုသူအမည်</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[50px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-3"
                  placeholder="အသုံးပြုသူအမည်"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-[#8B4513] font-semibold mb-2">မွေးနေ့သက္ကရာဇ်</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full h-[50px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-3"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`bg-[#4f3016] text-white px-5 py-3 rounded-lg hover:bg-[#3a2411] cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? "လုပ်ဆောင်နေသည်..." : "သိမ်းဆည်းမည်"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="bg-white text-[#4f3016] border border-[#4f3016] px-5 py-3 rounded-lg hover:bg-[#fff4ea]"
                >
                  ပြန်သွားမည်
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}