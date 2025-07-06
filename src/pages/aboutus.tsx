import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import applogo from "../assets/logo1.png";

function AboutUs() {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-[#FDE9DA] mt-[58px] min-h-screen">
          {/* Team Members Section */}
          <div className="container mx-auto px-6 py-16 ">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#402916] mb-4">
                Developers များ{" "}
              </h2>
              <div className="w-54 h-1 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto mb-6"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mb-16">
              {/* Team Member 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-[#4f3016]/10 h-[500px]">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white text-5xl font-bold">1</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4f3016] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🛠️</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4f3016] mb-3">
                    Pai Min Thway
                  </h3>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">
                    2022-MIIT-CSE-002
                  </p>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">
                    Back-End Developer
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Focused on PHP backend development and database management.
                    Implemented authentication systems and API endpoints.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      PHP
                    </span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      MySQL
                    </span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      API
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-[#4f3016]/10 h-[500px]">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white text-5xl font-bold">2</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4f3016] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🎨</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4f3016] mb-3">
                    Khant Nyar Thwin
                  </h3>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">
                    2022-MIIT-CSE-018
                  </p>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">
                    Front-End Developer & UI/UX Designer
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Focused on UI/UX and frontend with React and Tailwind CSS.
                    Designed in Figma and built responsive layouts.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      Figma
                    </span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      React
                    </span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      Tailwind CSS
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-[#4f3016]/10 h-[500px]">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white text-5xl font-bold">3</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4f3016] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🖥️</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4f3016] mb-3">
                    Myat Mon Mon Zaw
                  </h3>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">
                    2022-MIIT-CSE-027
                  </p>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">
                    Front-End Developer
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Focused on frontend using React and Tailwind CSS. Helped
                    implement layouts and improve UI consistency.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      React
                    </span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      Tailwind CSS
                    </span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      TypeScript
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Git Repository Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#402916] mb-4">
                Git Repository
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto mb-6"></div>
              <p className="text-xl text-[#402916] opacity-80 mx-auto">
                Explore our open-source project and contribute to the Lotus
                Shrine development
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative mb-16"
            >
              <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 border border-[#4f3016]/10">
                {/* Repository Icon */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg mb-4">
                    <img src={applogo} alt="LOGO" className=" size-15" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#4f3016] mb-2">
                    Lotus Shrine Repository
                  </h3>
                  <p className="text-[#8B4513] font-semibold">
                    Open Source Project
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Repository Information */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-xl font-bold text-[#4f3016] mb-6 flex items-center">
                      <span className="mr-3">📋</span>
                      Repository Information
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">
                          Repository:
                        </span>
                        <span className="text-[#4f3016] font-bold">
                          Lotus Shrine
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">
                          Platform:
                        </span>
                        <span className="text-[#4f3016] font-bold flex items-center">
                          <span className="mr-2">🐙</span>
                          GitHub
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">
                          Language:
                        </span>
                        <span className="text-[#4f3016] font-bold">
                          TypeScript, PHP, SQL
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">
                          Framework:
                        </span>
                        <span className="text-[#4f3016] font-bold">
                          React + Vite + Tailwind CSS
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">
                          License:
                        </span>
                        <span className="text-[#4f3016] font-bold">MIIT</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Features */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-xl font-bold text-[#4f3016] mb-6 flex items-center">
                      <span className="mr-3">✨</span>
                      Project Features
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">
                          Virtual Pagoda Prayer
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">
                          Meditation Timer + Guided Sessions
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">
                          Koe Na Win Dashboard (For Logged-In Users)
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">
                          Custom Paritta Sutta Audio Player
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">
                          Daily Dhamma Quote
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">
                          AI-powered meditation posture detection
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GitHub Button */}
                <div className="text-center mt-10">
                  <a
                    href="https://github.com/KhantNyrrThwin/Lotus_Shrine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-8 py-4 rounded-xl hover:from-[#8B4513] hover:to-[#4f3016] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    <span className="mr-3 text-2xl">🐙</span>
                    View Repository on GitHub
                    <span className="ml-3">→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* About Lotus Shrine Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#402916] mb-4">
                About Lotus Shrine
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto mb-6"></div>
              <p className="text-xl text-[#402916] opacity-80 max-w-2xl mx-auto">
                Discover the story behind our spiritual digital platform and its
                mission
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group relative mb-16"
            >
              <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 border border-[#4f3016]/10">
                {/* Main Icon */}
                <div className="text-center mb-10">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg mb-6">
                    <img src={applogo} alt="LOGO" className=" size-15" />
                  </div>
                  <h3 className="text-4xl font-bold text-[#4f3016] mb-3">
                    Lotus Shrine
                  </h3>
                  <p className="text-[#8B4513] font-semibold text-xl">
                    Digital Platform for Buddhist Meditation and Prayer <br />
                    Utilizing Web Development and AI Integration.
                  </p>
                </div>

                {/* Main Description */}
                <div className="bg-white/50 rounded-xl p-8 border border-[#4f3016]/10 mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-6">
                    <b>Lotus Shrine</b> သည် တရားထိုင်ခြင်း၊ ဆုတောင်းခြင်းနှင့်
                    ဘာသာရေးဆိုင်ရာအတွေးအခေါ်များကို ခေတ်မီနည်းပညာဖြင့်
                    ပေါင်းစည်းဖန်တီးထားသော အွန်လိုင်းပလက်ဖောင်း (web-based
                    platform) တစ်ခုဖြစ်သည်။
                  </p>
                  <div className="w-32 h-0.5 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto"></div>
                </div>

                {/* Mission and Vision Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Mission */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-2xl font-bold text-[#4f3016] mb-4 flex items-center">
                      <span className="mr-3 text-3xl">🎯</span>
                      Our Mission
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      ခရီးသွားရန်အခက်အခဲရှိသူများ၊
                      အချိန်သီးသန့်မပေးနိုင်သူများအတွက် ဘုရားဖူးခြင်းနှင့်
                      တရားထိုင်ခြင်းလိုမျိုးသော ဘာသာရေးဆိုင်ရာအလေ့အထများကို
                      မိမိတည်ရှိရာနေရာမှတဆင့် လွယ်ကူစွာပြုလုပ်နိုင်စေရန်
                      ရည်ရွယ်ထားသည်။
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-2xl font-bold text-[#4f3016] mb-4 flex items-center">
                      <span className="mr-3 text-3xl">🌟</span>
                      Our Vision
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      ဤ project သည် ဘုရားဖူးခြင်း၊ တရားထိုင်ခြင်း၊ နေ့စဉ်
                      ဓမ္မဆောင်ပုဒ်များ ဖတ်ရှုခြင်း၊ ပါရိယတ္တသံများ
                      နားထောင်ခြင်း စသော အတွေ့အကြုံများကို အွန်လိုင်းပေါ်မှ
                      တဆင့် လွယ်ကူလျင်မြန်စွာ လုပ်ဆောင်နိုင်စေရန် ရည်ရွယ်ပါသည်။
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-10">
                  <a
                    href="/"
                    className="inline-flex items-center bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-8 py-4 rounded-xl hover:from-[#8B4513] hover:to-[#4f3016] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    <span className="mr-3 text-2xl">🪷</span>
                    Begin Your Journey
                    <span className="ml-3">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default AboutUs;
