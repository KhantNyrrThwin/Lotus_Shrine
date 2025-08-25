import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState<string>("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const storedName = localStorage.getItem("userName") || "";
    setName(storedName);
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: persist locally. Integrate backend when endpoint is available.
    if (name.trim().length > 0) {
      localStorage.setItem("userName", name.trim());
    }
    // Age is not currently stored after signin; keep local only for now
    if (age) {
      localStorage.setItem("userAge", age);
    }
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FDE9DA] mt-[58px] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#4f3016]/10 p-8">
            <h1 className="text-3xl font-extrabold text-[#4f3016] mb-6">မိမိအကောင့် ပြင်ဆင်ရန်</h1>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[#8B4513] font-semibold mb-2">အသုံးပြုသူအမည်</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[50px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-3"
                  placeholder="အသုံးပြုသူအမည်"
                />
              </div>

              <div>
                <label className="block text-[#8B4513] font-semibold mb-2">မွေးနေ့သက္ကရာဇ်</label>
                <input
                  type="date"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-[50px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-3"
                  placeholder="အသက်"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-[#4f3016] text-white px-5 py-3 rounded-lg hover:bg-[#3a2411] cursor-pointer">
                  သိမ်းဆည်းမည်
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