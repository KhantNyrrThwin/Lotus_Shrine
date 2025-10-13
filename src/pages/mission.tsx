import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaLeaf,
  FaPeace,
  FaBrain,
  FaHandHoldingHeart,
  FaPray,
  FaBalanceScale,
  FaHandshake,
} from "react-icons/fa";
import MissionPagoda from "../assets/mission.png";

function Mission() {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mission and Vision Section */}
        <div className="py-13 bg-[#f8f4f0]">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-extrabold text-[#4f3016] mb-4">
                  ကျွန်ုပ်တို့၏ရည်ရွယ်ချက်
                </h2>
                <p className="text-gray-700 text-xl leading-relaxed text-justify mb-6">
                  ဗုဒ္ဓဘာသာ၏အနှစ်သာရဖြစ်သော ဘုရားရှိခိုးခြင်း၊ တရားထိုင်ခြင်း၊ ဆုတောင်းခြင်းနှင့် အဓိဋ္ဌာန်ဝင်ခြင်းများကို အကူအညီပြုနိုင်သော <b>ဒီဂျစ်တယ်ဘုရားခန်း</b> တစ်ခုအဖြစ် ရပ်တည်ဖို့ ရည်ရွယ်ထားပါသည်။
                </p>
                <h2 className="text-3xl font-bold text-[#4f3016] mt-8 mb-4">
                  ဘာကြောင့် Project ကိုလုပ်သလဲ?
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify ">
                  <div className="text-gray-700 leading-relaxed">
                     <ul className="text-black-600 text-xl leading-relaxed text-left space-y-3"></ul>
                    <ul className="list-disc space-y-2 text-xl marker:text-gray-500 leading-relaxed text-justify ml-5">
                      <li>ဗုဒ္ဓဘာသာဝင်များအတွက် အကျိုးပြုနိုင်မည့် <b>အွန်လိုင်းပလက်‌ဖောင်းတစ်ခု</b> ဖန်တီးနိုင်ရန်။</li>
                      <li>အမှန်တကယ် ဘုရားဖူးနေရသကဲ့ ခံစားရစေသာ <b>immersive pagoda view experience</b> ရရှိစေရန်။</li>
                      <li><b>AI-powered pose-detection system</b> ဖြင့် တရားထိုင်မှု ပုံစံမှန်/မမှန် စစ်ဆေးသတိပေး ပြုပြင်နိုင်‌စေရန်။</li>
                      <li><b>ကိုးနဝင်းအဓိဋ္ဌာန်</b>ကို စနစ်တကျနှင့် လွယ်ကူစွာ ဝင်ရောက်နိုင်ရန်။</li>
                      <li>ဗုဒ္ဓဘာသာနှင့်ဆိုင်သော <b>တရားတော်များ၊ စာပေကျမ်းဂန်များကို</b> တစ်စုတစ်စည်းတည်း ရှာဖွေကြည့်ရှုနိုင်စေရန်။</li>
                      <li><b>အေးချမ်းသော နေ့စဉ်ဘဝ</b>တစ်ခုကို တည်‌ဆောက်နိုင်စေရန်။</li>
                    </ul>
                  </div>

                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <img
                  src={MissionPagoda}
                  alt="Pagoda"
                  className="rounded-lg mt-0  mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-[#f8f4f0] py-5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#4f3016]">
                Project ၏ ဦးတည်ချက်များ
              </h2>
              <div className="w-78 h-1 bg-[#4f3016] mx-auto mt-4"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard
                icon={<FaBrain className="text-white" size={30} />}
                title="သတိပြူမှု (Mindfulness)"
                description="လောဘ၊ ဒေါသ၊ မောဟတို့မှ လွတ်မြောက်ပြီး၊ လက်ရှိအချိန်နှင့် နေရာတွင် သတိပြုအာရုံစိုက်နိုင်ရန်။"
              />
              <ValueCard
                icon={<FaPeace className="text-white" size={30} />}
                title="ငြိမ်းချမ်းရေး (Peace)"
                description="စိတ်နှင့် ကိုယ် နှစ်ခုလုံးကို တည်ငြိမ်အေးချမ်းစေပြီး၊ အပြင်ပန်းအခြေအနေများမှ မထိခိုက်စေရန်။"
              />
              <ValueCard
                icon={<FaHandHoldingHeart className="text-white" size={30} />}
                title="မေတ္တာ (Compassion)"
                description="မိမိကိုယ်တိုင်နှင့် အခြားသူများအပေါ် မေတ္တာနှင့် သနားကြင်နာမှုရှိပြီး၊ အကူအညီလိုအပ်သူများကို ကူညီနိုင်ရန်။"
              />
              <ValueCard
                icon={<FaLightbulb className="text-white" size={30} />}
                title="ပညာ (Wisdom)"
                description="ဆင်ခြင်တုံတရားနှင့် ဉာဏ်ပညာတိုးတက်အောင် ပြုလုပ်နိုင်ရန်။"
              />
              <ValueCard
                icon={<FaPray className="text-white" size={30} />}
                title="ယုံကြည်မှု (Faith)"
                description="ဗုဒ္ဓဘာသာ၏ အခြေခံသဘောတရားများကို မိမိ၏နေ့စဉ်ဘဝတွင် ယုံကြည်အားကိုးနိုင်ရန်။"
              />
              <ValueCard
                icon={<FaLeaf className="text-white" size={30} />}
                title="တည်ငြိမ်မှု (Tranquility)"
                description="စိတ်၊ ကိုယ်နှင့် အသက်တာ တစ်ခုလုံးကို တည်တည်ငြိမ်ငြိမ်ဖြင့် ကိုင်တွယ်နိုင်ရန်။"
              />
              <ValueCard
                icon={<FaBalanceScale className="text-white" size={30} />}
                title="ရိုးသားမှု (Integrity)"
                description="မိမိ၏စကားနှင့် အပြုအမူများကို တစ်သက်လုံး တည်တည်ငြိမ်ငြိမ်နှင့် ထိန်းသိမ်းနိုင်ရန်။"
              />
              <ValueCard
                icon={<FaHandshake className="text-white" size={30} />}
                title="ဂရုစိုက်လေးစားမှု (Respectfulness)"
                description="မိမိကိုယ်တိုင်နှင့် အခြားသူများအားလုံးကို ဂရုစိုက်လေးစားမှုဖြင့် ဆက်ဆံနိုင်ရန်။"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

const ValueCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 rounded-lg shadow-md text-center"
  >
    <div className="w-20 h-20 bg-[#4f3016] rounded-full mx-auto mb-6 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-[#4f3016] mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default Mission;
