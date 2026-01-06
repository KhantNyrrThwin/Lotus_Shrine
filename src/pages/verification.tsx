import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function VerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email =
    location.state?.email ||
    localStorage.getItem("pendingVerificationEmail") ||
    "";

  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(parseInt(element.value))) return;

    setError("");
    setMessage("");
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input field
    if (element.value !== "" && index < 5) {
      const nextElement = element.nextElementSibling as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const prevElement = e.currentTarget
        .previousElementSibling as HTMLInputElement;
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("OTP ကုဒ်ကို ပြည့်စုံစွာ ဖြည့်ပါ");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/lotus_shrine/verify_otp.php",
        {
          email,
          otp: otpCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        localStorage.removeItem("pendingVerificationEmail");
        setTimeout(() => {
          navigate("/login", {
            state: { verified: true, message: "အကောင့်ကို အတည်ပြုပြီးပါပြီ။ ဝင်ရောက်ပါ" },
          });
        }, 2000);
      } else {
        setError(response.data.message || "OTP ကုဒ်မှားယွင်းနေပါသည်");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "ဆာဗာနှင့် ချိတ်ဆက်မရပါ");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setResending(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost/lotus_shrine/resend_otp.php",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCountdown(30);
        setMessage("OTP ကုဒ်အသစ်ကို ပေးပို့ပြီးပါပြီ");
      } else {
        setError(response.data.message || "OTP ကုဒ်ပြန်ပေးပို့ရာတွင် အမှားအယွင်းရှိပါသည်");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "ဆာဗာနှင့် ချိတ်ဆက်မရပါ");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-screen bg-black flex items-center justify-center">
          <div className="w-full h-full bg-[url('./assets/signin.jpg')] bg-cover bg-center">
            <div className="flex items-center ml-[10px] mt-[30px]">
              <Link
                to="/signin"
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
              >
                <ArrowLeft className="size-[40px] text-white" />
              </Link>
              <img
                src={logo}
                alt="logo"
                className="absolute right-0 mt-[10px] size-[90px] 2xl:size-[120px]"
              />
            </div>
            <div className="w-[539px] ml-[65px] mt-[20px] 2xl:mt-[100px] bg-[#E2E2E2B3] bg-opacity-75 rounded-2xl flex flex-col">
              <div className="flex flex-col mt-[30px] ml-[44px] items-center">
                <h1 className="text-[27px] font-extrabold text-[#40320D]">
                  LotusShrine
                </h1>
                <h2 className="text-[21px]">&nbsp; မှကြိုဆိုပါသည်</h2>
              </div>
              <h1 className="text-[30px] 2xl:text-[40px] ml-[44px] mt-[10px] font-extrabold text-center">
                အကောင့်အတည်ပြုခြင်း
              </h1>

              {!success ? (
                <div className="mt-[30px] px-[44px] pb-[40px]">
                  <p className="text-[#40320D] text-[18px] mb-6 text-center">
                    သင့်အီးမေးလ် ({email}) သို့ OTP ကုဒ်ကို ပေးပို့ပြီးပါပြီ။ ကျေးဇူးပြု၍ ကုဒ် ၆ လုံးကို ဖြည့်ပါ။
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center space-x-3 mb-6">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={data}
                          onChange={(e) => handleChange(e.target, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onFocus={(e) => e.target.select()}
                          className="w-12 h-12 text-center text-2xl border-2 border-[#4f3016] rounded-lg focus:outline-none focus:border-[#4f3016] focus:ring-2 focus:ring-[#4f3016]"
                        />
                      ))}
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                      </p>
                    )}
                  {message && (
                    <p className="text-green-600 text-sm mb-4 text-center">
                      {message}
                    </p>
                  )}

                    <button
                      type="submit"
                    disabled={loading}
                      className={`w-full cursor-pointer h-[57px] bg-[#4f3016] text-white rounded-[9px] hover:bg-[#3a2411] ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "အတည်ပြုနေသည်..." : "အတည်ပြုမည်"}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-[#40320D] text-[16px]">
                      ကုဒ်မရရှိသေးပါက?
                    </p>
                    <button
                      onClick={handleResendOtp}
                      disabled={resending || countdown > 0}
                      className={`mt-2 text-[#4f3016] font-bold ${
                        resending || countdown > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:underline"
                      }`}
                    >
                      {resending
                        ? "ပြန်ပေးပို့နေသည်..."
                        : countdown > 0
                        ? `ပြန်ပေးပို့ရန် (${countdown} စက္ကန့်)`
                        : "ပြန်ပေးပို့မည်"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-[50px] px-[44px] pb-[60px] text-center">
                  <div className="text-green-600 text-[24px] font-bold mb-4">
                    ✓
                  </div>
                  <p className="text-[#40320D] text-[20px] font-bold">
                    အကောင့်ကို အတည်ပြုပြီးပါပြီ!
                  </p>
                  <p className="text-[#40320D] text-[18px] mt-2">
                    သင်၏ အကောင့်ကို ဝင်ရောက်နိုင်ပါပြီ။
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}