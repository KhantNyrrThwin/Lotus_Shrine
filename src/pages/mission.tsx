import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { FaHeart, FaLightbulb, FaLeaf, FaPeace } from "react-icons/fa";
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
                <h2 className="text-3xl font-extrabold text-[#4f3016] mb-4">ကျွန်ုပ်တို့၏ရည်ရွယ်ချက်</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                ဗုဒ္ဓဘာသာဝင်များအတွက် ဘုရား ရှိခိုးခြင်း၊ တရားထိုင်ခြင်း၊ ဆုတောင်းခြင်းနှင့် အဓိဌာန်ဝင်ခြင်းများကို နည်းပညာ၏ အကူအညီဖြင့် အထောက်အကူဖြစ်စေရန် ရည်ရွယ်ပါသည်
                </p>
                <h2 className="text-3xl font-bold text-[#4f3016] mt-8 mb-4">ဘာကြောင့် Project ကိုလုပ်သလဲ?</h2>
                <p className="text-gray-700 leading-relaxed text-justify ">
                နည်းပညာ ခေတ်မီတိုးတက်လာသော်လည်း ဘာသာရေးဆိုင်ရာလိုအပ်ချက်များကို ပြည့်စုံအောင် ဖြေရှင်းပေးနိုင်သော အွန်လိုင်းစနစ်များမှာ နည်းပါးနေဆဲဖြစ်သည်။
                 ခရီးသွား၍ မရသူများ၊ ကိုယ်အင်အားမပြည့်သူများ၊ သို့မဟုတ် နေရာအကန့်အသတ်များကြောင့် ဘုရားဖူးခြင်း၊ 
                 တရားထိုင်ခြင်းများမှ ဝေးကွာနေရသူများအတွက် သာယာအေးချမ်းသော virtual environment ၊အတွေ့အကြုံတစ်ရပ်ကို ဖန်တီးပေးရန်အတွက်
                  Lotus Shrine ကို စတင်ဖန်တီးခြင်း ဖြစ်ပါသည်။ ဤပရောဂျက်သည် ဗုဒ္ဓဘာသာရဲ့ ရိုးရာအလေ့အထများကို နည်းပညာနှင့်ပေါင်းစပ်၍၊ 
                ဘုရားဖူးမျှော်ခြင်း၊ တရားထိုင်ခြင်း၊ အဓိဌာန်ဝင်ခြင်းများကို သက်သာသက်သာသာ ပြုလုပ်နိုင်မည့် ပလက်ဖောင်းတစ်ခုအဖြစ် ရရှိစေနိုင်ရန် ရည်ရွယ်ထားပါသည်။
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <img src={MissionPagoda} alt="Pagoda" className="rounded-lg mt-0  mx-auto"/>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-[#f8f4f0] py-5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#4f3016]">Project ၏ ဦးတည်ချက်များ</h2>
              <div className="w-78 h-1 bg-[#4f3016] mx-auto mt-4"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<FaLeaf className="text-white" size={30} />} title="သတိပြူမှု (Mindfulness)" description="မိမိစိတ်ကို တည်ကြည်အေးချမ်းစွာ ထိန်းသိမ်းနိုင်ရန်" />
              <ValueCard icon={<FaHeart className="text-white" size={30} />} title="ငြိမ်းချမ်းရေး (Peace)" description="မိမိစိတ်အတွင်းနှင့် ပတ်ဝန်းကျင်ထဲတွင်လည်း တည်ငြိမ်မှုအပြည့်ဖြင့် အသက်တာဖြတ်သန်းနိုင်ရန်။" />
              <ValueCard icon={<FaLightbulb className="text-white" size={30} />} title="မေတ္တာ (Compassion)" description="Seeking knowledge " />
              <ValueCard icon={<FaPeace className="text-white" size={30} />} title="Peace (ငြိမ်းချမ်းရေး)" description="Cultivating inner and outer peace through our practices." />
              <ValueCard icon={<FaLeaf className="text-white" size={30} />} title="Mindfulness (သတိ)" description="Living in the present moment with awareness and intention." />
              <ValueCard icon={<FaPeace className="text-white" size={30} />} title="Peace (ငြိမ်းချမ်းရေး)" description="Cultivating inner and outer peace through our practices." />
            
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
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