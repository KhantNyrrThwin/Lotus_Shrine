import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<FormData>();
  const { register, control, handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

  if (location.state?.fromSignup) {
    setSuccessMessage('အကောင့်အသစ်တည်ဆောက်ပြီးပါပြီ၊ အကောင့်ပြန်ဝင်ပါ။');
  } else if (location.state?.fromReset) {
    setSuccessMessage('စကားဝှက် အောင်မြင်စွာ ပြောင်းပြီးပါပြီ။');
  }

  // Clear the navigation state so message won't persist on refresh
  if (location.state?.fromSignup || location.state?.fromReset) {
    window.history.replaceState({}, document.title);
  }
}, [location]);


  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost/lotus_shrine/checkLogin.php",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      localStorage.setItem("userName", response.data.name);
      if (response.data?.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.email);
        navigate("/");
        toast.success("အကောင့်ဝင်မှူ အောင်မြင်ပါသည်", {
          description: "Lotus Shrine မှ ကြိုဆိုပါသည်",
          duration: 3000,
        });
      } else {
        setError(response.data?.message || "Invalid email or password");
        toast.error("အကောင့်ဝင်မှူ ကျဆုံးပါသည်", {
          description: "ပြန်လည်ကြိုးစားပါ",
          duration: 3000,
        });
      }
    } catch (err: any) {
      console.error("Full error:", err);
      console.error("Error response:", err.response);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Server connection failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[25px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center justify-center"
      >
        {successMessage && (
          <div className="w-[451px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-[9px] text-center">
            {successMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="အီးမေးလ်"
          {...register("email", { required: true })}
          className="w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="စကားဝှက်"
            {...register("password", { required: true })}
            className="w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2 pr-10"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f3016]/70 hover:text-[#4f3016]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="w-full flex justify-end">
          <Link to="/requestemail" className="mr-[50px] hover:underline">
            စကားဝှက်မေ့နေပါသလား
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-[251px] h-[57px] bg-[#4f3016] cursor-pointer text-[#ffffff] rounded-[9px] hover:bg-[#3a2411] hover:text-extrabold ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "လုပ်ဆောင်နေသည်..." : "အကောင့်ဝင်မည်"}
        </button>

        <Link to="/signin" className="hover:underline">
          အကောင့်အသစ်ဖွင့်မည်
        </Link>
      </form>

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      <DevTool control={control} />
    </div>
  );
};

export default LoginForm;
