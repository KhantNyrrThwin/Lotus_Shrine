import Navbar from "../components/navbar";
import Footer from "../components/footer";
import profileImg from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("ဧည့်သည်");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const name = localStorage.getItem("userName") || "ဧည့်သည်";
    const email = localStorage.getItem("userEmail") || "";
    setUserName(name);
    setUserEmail(email);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="bg-[#FDE9DA] mt-[58px] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#4f3016]/10 p-8">
            <div className="flex items-center gap-4 mb-6">
              <img src={profileImg} alt="Profile" className="size-[70px] rounded-full" />
              <div>
                <h1 className="text-3xl font-extrabold text-[#4f3016]">မိမိအကောင့်</h1>
                <p className="text-[#8B4513]">Lotus Shrine</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#fff8f0] p-4 rounded-xl border border-[#4f3016]/10">
                <span className="text-[#8B4513] font-semibold">အမည်</span>
                <span className="text-[#4f3016] font-bold">{userName}</span>
              </div>
              <div className="flex items-center justify-between bg-[#fff8f0] p-4 rounded-xl border border-[#4f3016]/10">
                <span className="text-[#8B4513] font-semibold">အီးမေးလ်</span>
                <span className="text-[#4f3016] font-bold">{userEmail || "-"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/edit-profile"
                className="bg-[#4f3016] text-white px-5 py-3 rounded-lg hover:bg-[#3a2411]"
              >
                ပြင်ဆင်ရန်
              </Link>
              <Link
                to="/changepassword"
                className="bg-white text-[#4f3016] border border-[#4f3016] px-5 py-3 rounded-lg hover:bg-[#fff4ea]"
              >
                စကားဝှက်ပြောင်းရန်
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}