import { useState } from "react";
import applogo from "../assets/logo1.png";
import profile from "../assets/profile.png";
import link_logo from "../assets/link_lotus.png";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";  
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState("ပိုင်မင်းသွေး");
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isKoeNaWinOpen, setKoeNaWinOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  return (
    <>

      <nav 
        className={`flex fixed top-0 left-0 right-0 z-50 bg-[#4f3016] text-white font-bold h-[58px] items-center transition-all duration-1000 
        ${isFeaturesOpen || isKoeNaWinOpen ? "h-[240px] " : "h-[58px]"} ${isAboutOpen || isAccountOpen ? "h-[190px] " : "h-[58px]"} `}>
          {/* Features Navbar */}
        <div className="absolute top-0 left-0 right-0 h-[58px] flex items-center">
          <Link to="/">
            <img src={applogo} alt="LOGO" className=" size-[47px] ml-[35px]" />
          </Link>
          <Link to="/">
          <a href="index.html" className="flex text-[21.2px] ml-[21px] lg:text-[23px] 2xl:w-[150px] 2xl:ml-[57px]">
            <p className=" text-white font-bold">Lotus Shrine</p>
          </a>
          </Link>

            {/* Features Navbar */}
          <div className="flex text-[15px]  2xl:w-[1100px]  font-bold space-x-[40px] ml-[191px  ]  2xl:ml-[161px]">
            <div className="ml-0" onMouseEnter={() => setIsFeaturesOpen(true)}   onMouseLeave={() => setIsFeaturesOpen(false)}>
              <p className={`text-white  cursor-pointer ${isFeaturesOpen ? "text-green-400" : "text-green-400"}`}>ဝန်ဆောင်မှုများ</p>
              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute left-0 mt-0 py-2 w-screen"
                    onMouseLeave={() => setIsFeaturesOpen(false)}
                  >
                    <Link
                      to="/pagodas"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဘုရားများ
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဓမ္မတရားများ
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; တရားတော်များ
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; တရားထိုင်ရန်
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

           <div className="ml-0" onMouseEnter={() => setKoeNaWinOpen(true)}   onMouseLeave={() => setKoeNaWinOpen(false)}>
            <p className={`text-white 2xl:ml-[100px] cursor-pointer ${isKoeNaWinOpen ? "text-green-400" : "text-green-400"}`}>ကိုးနဝင်း</p>
            <AnimatePresence>
              {isKoeNaWinOpen && (
                <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute left-0 mt-0 py-2 w-screen"
                onMouseLeave={() => setKoeNaWinOpen(false)}
                >
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; ကိုးနဝင်းအကြောင်း
                  </Link>
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; ကိုးနဝင်းအဆင့်များ
                  </Link>
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; ဘုရား ဂုဏ်တော် (၉)ပါး
                  </Link>
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; ကိုးနဝင်းဝင်မည်
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
           </div>

              {/* About Us Navbar */}
            <div className="ml-0" onMouseEnter={() => setAboutOpen(true)}   onMouseLeave={() => setAboutOpen(false)}>
              <p className={"text-white 2xl:ml-[100px] cursor-pointer "}>ကျွန်ုပ်တို့အကြောင်း</p>
              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute left-0 mt-0 py-2 w-screen"
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <Link
                      to="/aboutus"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ရည်ရွယ်ချက်
                    </Link>
                    <Link
                      to="/aboutus"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ကျွန်ုပ်တို့အကြောင်း
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဆက်သွယ်ရန် 
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

           <div className="ml-0" onMouseEnter={() => setAccountOpen(true)}   onMouseLeave={() => setAccountOpen(false)}>
            <p className={`text-white 2xl:ml-[100px] cursor-pointer ${isAccountOpen ? "text-green-400" : "text-green-400"}`}>အကောင့်</p>
            <AnimatePresence>
              {isAccountOpen && isLogin && (
                <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute left-0 mt-0 py-2 w-screen"
                onMouseLeave={() => setAccountOpen(false)}
                >
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; မိမိအကောင့်
                  </Link>
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; ပြင်ဆင်ရန်
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; အကောင့်မှ ထွက်မည်
                  </Link>
                </motion.div>
              )}
              {isAccountOpen && !isLogin && (
                <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute left-0 mt-0 py-2 w-screen"
                onMouseLeave={() => setAccountOpen(false)}
                >
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; အကောင့်ဝင်မည်
                  </Link>
                  <Link
                    to="/aboutus"
                    className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                  >
                    <img src={link_logo} alt="LOGO" className="size-[28px]" />
                    &nbsp; အကောင့်ဖွင်မည်
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
           </div>
          </div>

          <div className="flex bg-[#76403b00] w-[307px] ml-[60px] h-[54px] bg-opacity-58 rounded-[19px] items-center 2xl: mr-[40px]">
            <img src={profile} alt="Profile_Picture" className="size-[40px] " />
            <div className="flex bg-[#76403b8c] text-[16.2px] w-[250px] ml-[6px] h-[38px] bg-opacity-58 rounded-[13px] items-center justify-center">
              {isLogin ? user : "ဧည့်သည်"}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
