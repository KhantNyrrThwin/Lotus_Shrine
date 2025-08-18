import applogo from "../assets/logo1.png";
import profile from "../assets/profile.png";
import link_logo from "../assets/link_lotus.png";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isKoeNaWinOpen, setKoeNaWinOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAu = localStorage.getItem("isAuthenticated") === "true";
    const storedName = localStorage.getItem("userName") || "ဧည့်သည်";

    setIsLogin(isAu);
    setUser(isAu ? storedName : "ဧည့်သည်");
  }, []);

  const handleLogout = () => {
    // Show toast notification
    toast.success("အကောင့်မှ ထွက်ပြီးပါပြီ", {
      description: "ကျေးဇူးတင်ပါသည်။ ပြန်လည်ဝင်ရောက်နိုင်ပါသည်။",
      duration: 3000,
    });

    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    // Update state
    setIsLogin(false);
    setUser("ဧည့်သည်");
    setAccountOpen(false);

    // Redirect to home page
    navigate("/");
  };

  return (
    <>
      <nav
        className={`flex fixed top-0 left-0 right-0 z-50 bg-[#4f3016] text-white font-bold h-[58px] items-center transition-all duration-1000 shadow-lg
        ${isFeaturesOpen ? "h-[280px] " : "h-[58px]"}  ${isKoeNaWinOpen ? "h-[200px] " : "h-[58px]"} ${isAboutOpen ? "h-[190px] " : "h-[58px]"} ${!isLogin && isAccountOpen ? "h-[160px] " : "h-[58px]"} 
        ${isLogin && isAccountOpen ? "h-[190px] " : "h-[58px]"}
        `}
      >
        {/* Features Navbar */}
        <div className="absolute top-0 left-0 right-0 h-[58px] flex items-center">
          <Link to="/">
            <img src={applogo} alt="LOGO" className=" size-[47px] ml-[35px]" />
          </Link>
          <Link to="/">
            <a
              href="index.html"
              className="flex text-[21.2px] ml-[21px] lg:text-[23px] 2xl:w-[150px] 2xl:ml-[57px]"
            >
              <p className=" text-white font-bold">Lotus Shrine</p>
            </a>
          </Link>

          {/* Features Navbar */}

          <div className="flex text-[15px] 2xl:text-[17px]  2xl:w-[1100px]  font-bold space-x-[40px] ml-[191px]  2xl:ml-[161px]">
            <div
              className="ml-0"
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <p
                className={`text-white  cursor-pointer ${isFeaturesOpen ? "text-green-400" : "text-green-400"}`}
              >
                ဝန်ဆောင်မှုများ
              </p>
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
                      to="/dhamma"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဘုရားရှိခိုးနှင့် ဂါတာတော်များ
                    </Link>
                    <Link
                      to="/tayartaw"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; တရားတော်များ
                    </Link>
                    <Link
                      to="/books"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; တရားစာအုပ်များ
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

            <div
              className="ml-0"
              onMouseEnter={() => setKoeNaWinOpen(true)}
              onMouseLeave={() => setKoeNaWinOpen(false)}
            >
              <p
                className={`text-white 2xl:ml-[80px] cursor-pointer ${isKoeNaWinOpen ? "text-green-400" : "text-green-400"}`}
              >
                ကိုးနဝင်း
              </p>
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
                      to="/koenawin"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ကိုးနဝင်းအကြောင်း
                    </Link>
                    <Link
                      to="/gonetaw"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဘုရား ဂုဏ်တော် (၉)ပါး
                    </Link>
                    <div
                      onClick={() => {
                        setKoeNaWinOpen(false);
                        if (isLogin) {
                          setComingSoonOpen(true);
                        } else {
                          setLoginPromptOpen(true);
                        }
                      }}
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold cursor-pointer"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ကိုးနဝင်းဝင်မည်
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us Navbar */}
            <div
              className="ml-0"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <p className={"text-white 2xl:ml-[80px] cursor-pointer "}>
                ကျွန်ုပ်တို့အကြောင်း
              </p>
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
                      to="/mission"
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
                      to="/contactus"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဆက်သွယ်ရန်
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="ml-0"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <p
                className={`text-white 2xl:ml-[80px] cursor-pointer ${isAccountOpen ? "text-green-400" : "text-green-400"}`}
              >
                အကောင့်
              </p>
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
                      to="/profile"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; မိမိအကောင့်
                    </Link>
                    <Link
                      to="/edit-profile"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ပြင်ဆင်ရန်
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold cursor-pointer"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; အကောင့်မှ ထွက်မည်
                    </div>
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
                      to="/login"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; အကောင့်ဝင်မည်
                    </Link>
                    <Link
                      to="/signin"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; အကောင့်ဖွင့်မည်
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex bg-[#76403b00] w-[307px] ml-[40px] h-[54px] bg-opacity-58 rounded-[19px] items-center 2xl:mr-[40px]">
            <img src={profile} alt="Profile_Picture" className="size-[40px] " />
            <div className="flex bg-[#76403b8c] text-[16.2px] w-[250px] ml-[6px] h-[38px] bg-opacity-58 rounded-[13px] items-center justify-center">
              {isLogin ? user : "ဧည့်သည်"}
            </div>
          </div>
        </div>
      </nav>
      {/* Login Prompt Dialog for Guests */}
      <Dialog.Root open={loginPromptOpen} onOpenChange={setLoginPromptOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex items-start justify-between">
              <Dialog.Title className="text-lg font-semibold text-[#4f3016]">အကောင့်ဝင်ရန် လိုအပ်ပါသည်</Dialog.Title>
              <Dialog.Close className="inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <X size={18} />
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-2 text-sm text-gray-600">
              ကိုးနဝင်းဝင်မည် ကို သုံးမည်ဆိုပါက အကောင့်ဝင်ရန် (သို့) အကောင့်အသစ်ဖွင့်ရန် လိုအပ်ပါသည်။
            </Dialog.Description>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setLoginPromptOpen(false);
                  navigate("/login");
                }}
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#4f3016] px-4 text-white hover:bg-[#3a2411]"
              >
                အကောင့်ဝင်ရန်
              </button>
              <button
                onClick={() => {
                  setLoginPromptOpen(false);
                  navigate("/signin");
                }}
                className="inline-flex h-10 items-center justify-center rounded-md border border-[#4f3016] px-4 text-[#4f3016] hover:bg-[#4f3016]/10"
              >
                အကောင့်အသစ်ဖွင့်ရန်
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Coming Soon Dialog for Logged-in Users */}
      <Dialog.Root open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex items-start justify-between">
              <Dialog.Title className="text-lg font-semibold text-[#4f3016]">မကြာမီ လာမည်</Dialog.Title>
              <Dialog.Close className="inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <X size={18} />
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-2 text-sm text-gray-600">
              ကိုးနဝင်းဝင်မည် လုပ်ဆောင်ချက်ကို mid-term seminar ပြီးဆုံးပြီးနောက် ထည့်သွင်းပေးမည်ဖြစ်ပါသည်။ ကျေးဇူးတင်ပါသည်။
            </Dialog.Description>
            <div className="mt-5 flex justify-end">
              <Dialog.Close asChild>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#4f3016] px-4 text-white hover:bg-[#3a2411]">
                  နောက်ဆုတ်ရန်
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
