import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  dob: string;
  password: string;
  confirm_password: string;
};

type PasswordStrength = "very-weak" | "weak" | "medium" | "strong" | "";

const signinForm = () => {
  const form = useForm<FormData>({ mode: "onBlur" });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("");
  const [strengthMessage, setStrengthMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch password changes
  const password = watch("password");

  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
      setStrengthMessage("");
      return;
    }

    // Check password strength
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const length = password.length;

    let strength: PasswordStrength = "very-weak";
    let message = "";

    if (length < 8) {
      message = "အားနည်းလွန်းနေပါသည် (အနည်းဆုံး ၈ လုံးလိုအပ်ပါသည်)";
      strength = "very-weak";
    } else if (!(hasLower && hasUpper && hasDigit && hasSpecial)) {
      message =
        "အားနည်းနေပါသေးသည် - အင်္ဂလိပ်အက္ခရာကြီး၊ အက္ခရာသေး၊ ဂဏန်းနှင့် သင်္ကေတများ ပေါင်းစပ်ထည့်သွင်းပါ";
      strength = "weak";
    } else {
      message = "စကားဝှက်အားကောင်းပါသည်";
      strength = "strong";
    }

    setPasswordStrength(strength);
    setStrengthMessage(message);
  }, [password]);

  const onSubmit = async (data: FormData) => {
    setPasswordError("");

    if (data.password !== data.confirm_password) {
      setPasswordError("စကားဝှက်များ မတူညီပါ");
      return;
    }

    setLoading(true);

    try {
      const { confirm_password, ...userData } = data;
      const response = await axios.post(
        "http://localhost/lotus_shrine/register.php",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        // Redirect to login page on success
        navigate("/login", { state: { fromSignup: true } });
      } else {
        setPasswordError(
          response.data.message || "မှတ်ပုံတင်ရာတွင် အမှားအယွင်းရှိပါသည်",
        );
      }
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || "ဆာဗာနှင့် ချိတ်ဆက်မရပါ");
    } finally {
      setLoading(false);
    }
  };
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "very-weak":
        return "text-red-500";
      case "weak":
        return "text-orange-500";
      case "strong":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="mt-[15px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center justify-center"
        noValidate
      >
        {/* Email Field */}
        <div className="flex flex-col items-start w-full px-11">
          <label
            htmlFor="email"
            className="text-[#4f3016] text-left text-[16px] font-bold"
          >
            အီးမေးလ်ရိုက်ထည့်ပါ
          </label>
        </div>
        <input
          type="email"
          placeholder="အီးမေးလ်"
          {...register("email", {
            required: "အီးမေးလ်လိုအပ်ပါသည်",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "မှားယွင်းသော အီးမေးလ်ပုံစံ",
            },
          })}
          className="w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm -mt-2 self-start ml-11">
            {errors.email.message}
          </p>
        )}

        {/* Name and Age Fields */}
        <div className="flex flex-row items-start w-full px-11 gap-4">
          <div className="flex flex-col items-start w-full gap-2">
            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="name"
                className="text-[#4f3016] text-left text-[16px] font-bold"
              >
                အသုံးပြုသူအမည်
              </label>
            </div>
            <input
              type="text"
              placeholder="အသုံးပြုသူအမည်"
              {...register("name", {
                required: "အမည်လိုအပ်ပါသည်",
                minLength: {
                  value: 3,
                  message: "အနည်းဆုံး ၃ လုံးရှိရပါမည်",
                },
              })}
              className="w-full h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm -mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start w-full gap-2">
            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="dob"
                className="text-[#4f3016] text-left text-[16px] font-bold"
              >
                မွေးနေ့သက္ကရာဇ်
              </label>
            </div>
            <input
              type="date"
              placeholder="မွေးသက္ကရာဇ်"
              {...register("dob", {
                required: "မွေးသက္ကရာဇ် လိုအပ်ပါသည်",
                validate: {
                  minAge: (value) => {
                    const dob = new Date(value);
                    const today = new Date();
                    let age = today.getFullYear() - dob.getFullYear();
                    const monthDiff = today.getMonth() - dob.getMonth();
                    
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                      age--;
                    }
                    
                    return age >= 10 || "အနည်းဆုံး ၁၀ နှစ်ရှိရပါမည်";
                  },
                  notFuture: (value) => {
                    const dob = new Date(value);
                    const today = new Date();
                    return dob <= today || "အနာဂတ်ရက် မဖြစ်ရပါ";
                  },
                },
              })}
              className="w-full h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2"
            />

            {errors.dob && (
              <p className="text-red-500 text-sm -mt-2">{errors.dob.message}</p>
            )}
          </div>
        </div>

        {/* Password Fields */}
        <div className="flex flex-col items-start w-full px-11 mt-2">
          <label
            htmlFor="password"
            className="text-[#4f3016] text-[16px] font-bold"
          >
            စကားဝှက်ရိုက်ထည့်ပါ
          </label>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="စကားဝှက်"
            {...register("password", {
              required: "စကားဝှက်လိုအပ်ပါသည်",
              minLength: {
                value: 8,
                message: "အနည်းဆုံး ၈ လုံးရှိရပါမည်",
              },
            })}
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
        {errors.password && (
          <p className="text-red-500 text-sm -mt-2 self-start ml-11">
            {errors.password.message}
          </p>
        )}

        {/* Password Strength Indicator */}
        {password && !errors.password && (
          <p className={`text-sm -mt-2 self-start ml-11 ${getStrengthColor()}`}>
            {strengthMessage}
          </p>
        )}

        <div className="flex flex-col items-start w-full px-11 mt-2">
          <label
            htmlFor="password"
            className="text-[#4f3016] text-[16px] font-bold"
          >
            စကားဝှက်အတည်ပြုပါ
          </label>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="စကားဝှက်အတည်ပြုရန်"
            {...register("confirm_password", {
              required: "စကားဝှက်အတည်ပြုရန်လိုအပ်ပါသည်",
            })}
            className="w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2 pr-10"
          />
          <button
            type="button"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f3016]/70 hover:text-[#4f3016]"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm -mt-2 self-start ml-11">
            {passwordError}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-[251px] cursor-pointer h-[57px] bg-[#4f3016] text-white rounded-[9px] hover:bg-[#3a2411] mt-4 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "လုပ်ဆောင်နေသည်..." : "အကောင့်ဖွင့်မည်"}
        </button>

        <a href="/login" className="mt-2 hover:underline cursor-pointer">
          အကောင့်ဝင်ရန်
        </a>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default signinForm;
