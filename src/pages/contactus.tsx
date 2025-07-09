import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { toast } from "sonner";
import "../App.css";

type ContactFormData = {
  email: string;
  message: string;
};

function ContactUs() {
  const form = useForm<ContactFormData>();
  const { register, control, handleSubmit, reset, formState } = form;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost/lotus_shrine/contactUs.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Handle non-2xx responses
      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({
          message: "Server responded with an error",
        }));
        throw new Error(errorResult.message || "Request failed");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("မက်ဆေ့ချ်ပို့ခြင်း အောင်မြင်ပါသည်", {
          description: "ကျေးဇူးတင်ပါသည်။ မကြာမီ ပြန်လည်ဆက်သွယ်ပေးပါမည်။",
          duration: 5000,
        });
        reset();
      } else {
        throw new Error(result.message || "Message submission failed");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("မက်ဆေ့ချ်ပို့ခြင်း ကျဆုံးပါသည်", {
        description: error instanceof Error ? error.message : "ပြန်လည်ကြိုးစားပါ",
        duration: 5000,
      });
    } finally {
      setLoading(false);
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
        <Navbar />
        <div className="bg-[#FDE9DA] mt-[58px] min-h-screen">
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#4f3016] mb-4">
                  ဆက်သွယ်ရန်
                </h1>
                <p className="text-gray-600 text-lg">
                  သင့်မေးခွန်းများ၊ အကြံပြုချက်များ သို့မဟုတ်
                  ပူးပေါင်းဆောင်ရွက်လိုမှုများအတွက် ဆက်သွယ်ပါ။
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#4f3016] mb-2"
                  >
                    အီးမေးလ် လိပ်စာ
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="သင့်အီးမေးလ်လိပ်စာကို ထည့်သွင်းပါ"
                    {...register("email", {
                      required: "အီးမေးလ်လိပ်စာ လိုအပ်ပါသည်",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "မှန်ကန်သော အီးမေးလ်လိပ်စာ ဖြစ်ရပါမည်",
                      },
                    })}
                    className="w-full h-[57px] bg-white border-2 border-[#4f3016] rounded-[9px] px-4 focus:outline-none focus:border-amber-600 transition-colors"
                  />
                  {formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#4f3016] mb-2"
                  >
                    မက်ဆေ့ချ်
                  </label>
                  <textarea
                    id="message"
                    placeholder="သင့်မက်ဆေ့ချ်ကို ရေးသားပါ"
                    rows={6}
                    {...register("message", {
                      required: "မက်ဆေ့ချ် လိုအပ်ပါသည်",
                      minLength: {
                        value: 10,
                        message:
                          "မက်ဆေ့ချ်သည် အနည်းဆုံး စာလုံး ၁၀ လုံး ဖြစ်ရပါမည်",
                      },
                    })}
                    className="w-full bg-white border-2 border-[#4f3016] rounded-[9px] px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors resize-none"
                  />
                  {formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.message.message}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-[251px] h-[57px] bg-[#4f3016] text-white rounded-[9px] font-medium hover:bg-amber-900 transition-colors ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {loading ? "ပို့နေသည်..." : "မက်ဆေ့ချ် ပို့မည်"}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-[#4f3016] mb-2">
                    ဆက်သွယ်ရန် အချက်အလက်များ
                  </h3>
                  <p className="text-gray-600">
                    အီးမေးလ်:{" "}
                    <span className="font-medium">lotusshrinemm@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
      <DevTool control={control} />
    </>
  );
}

export default ContactUs;