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
import { authService } from "../data/authService";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isKoeNaWinOpen, setKoeNaWinOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [hasKoeNaWinAccount, setHasKoeNaWinAccount] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [infoDialogMessage, setInfoDialogMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showExistingProcessDialog, setShowExistingProcessDialog] = useState(false);
  const [existingProcessInfo, setExistingProcessInfo] = useState({
    currentDayCount: 0,
    currentStage: 0,
    startDate: ""
  });
  const [isCheckingProcess, setIsCheckingProcess] = useState(false);
  const [showRealLifeProcessDialog, setShowRealLifeProcessDialog] = useState(false);
  const [showDaysInputDialog, setShowDaysInputDialog] = useState(false);
  const [realLifeDays, setRealLifeDays] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAu = authService.isAuthenticated();
    const storedName = localStorage.getItem("userName") || "ဧည့်သည်";

    setIsLogin(isAu);
    setUser(isAu ? storedName : "ဧည့်သည်");
    
    if (isAu) {
      checkKoeNaWinAccount();
    }
  }, []);

  const checkKoeNaWinAccount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setHasKoeNaWinAccount(false);
        return;
      }

      const response = await axios.post(
        "http://localhost/lotus_shrine/checkKoNaWinTracker.php",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setHasKoeNaWinAccount(response.data.hasKoNaWinVow);
        if (response.data.hasKoNaWinVow) {
          setExistingProcessInfo({
            currentDayCount: response.data.currentDayCount || 0,
            currentStage: response.data.currentStage || 0,
            startDate: response.data.startDate || ""
          });
        }
      } else {
        setHasKoeNaWinAccount(false);
      }
    } catch (error) {
      console.error("Error checking Koe Na Win account:", error);
      setHasKoeNaWinAccount(false);
    }
  };

  const startNewVow = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID missing to start new vow.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/lotus_shrine/newKNWTracker.php",
        {
          userId: userId,
          startDate: new Date().toISOString().split('T')[0]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("New Ko Na Win vow started successfully!");
        setHasKoeNaWinAccount(true);
        navigate("/koenawin/dashboard");
      } else {
        alert("Failed to start new Ko Na Win vow: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error starting new Ko Na Win vow:", error);
      alert("ကိုးနဝင်းတရား စတင်ရန် ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။");
    }
  };

  const handleKoeNaWinEntry = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID missing to check Koe Na Win process.");
      navigate("/login");
      return;
    }

    setIsCheckingProcess(true);
    try {
      // Check database for existing Koe Na Win process
      const response = await axios.post(
        "http://localhost/lotus_shrine/checkKoNaWinTracker.php",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success && response.data.hasKoNaWinVow) {
        // User has existing Koe Na Win process in database - go directly to dashboard
        navigate("/koenawin/dashboard");
        return;
      }

      // No existing process in database - ask about real-life process
      setShowRealLifeProcessDialog(true);
    } catch (error) {
      console.error("Error checking Koe Na Win process:", error);
      setInfoDialogMessage("ကိုးနဝင်းတရား စစ်ဆေးရန် ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။");
      setShowInfoDialog(true);
    } finally {
      setIsCheckingProcess(false);
    }
  };

  const handleRealLifeProcessYes = () => {
    setShowRealLifeProcessDialog(false);
    setShowDaysInputDialog(true);
  };

  const handleRealLifeProcessNo = () => {
    setShowRealLifeProcessDialog(false);
    // Check if it's Monday
    const today = new Date().getDay();
    if (today !== 1) { // 1 is Monday
      setInfoDialogMessage("တနင်္လာနေ့မှသာ ကိုးနဝင်းအဓိဌာန် စတင်ဆောက်တည်လို့ ရပါမည်။");
      setShowInfoDialog(true);
      return;
    }
    // It's Monday - show confirmation
    setShowConfirmDialog(true);
  };

  const handleDaysInputSubmit = () => {
    if (!realLifeDays || isNaN(Number(realLifeDays)) || Number(realLifeDays) < 0) {
      setInfoDialogMessage("ကျေးဇူးပြု၍ မှန်ကန်သော ရက်ပေါင်းကို ရိုက်ထည့်ပါ။");
      setShowInfoDialog(true);
      return;
    }
    setShowDaysInputDialog(false);
    // TODO: Save the real-life process data and navigate to dashboard
    // For now, just navigate to dashboard
    navigate("/koenawin/dashboard");
  };

  const handleLogout = () => {
    toast.success("အကောင့်မှ ထွက်ပြီးပါပြီ", {
      description: "ကျေးဇူးတင်ပါသည်။ ပြန်လည်ဝင်�ရောက်နိုင်ပါသည်။",
      duration: 3000,
    });

    authService.logout();
    setIsLogin(false);
    setUser("ဧည့်သည်");
    setAccountOpen(false);
    setHasKoeNaWinAccount(false);
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
                    {isLogin ? (
                      hasKoeNaWinAccount ? (
                        <Link
                          to="/koenawin/dashboard"
                          onClick={() => setKoeNaWinOpen(false)}
                          className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                        >
                          <img src={link_logo} alt="LOGO" className="size-[28px]" />
                          &nbsp; ဒက်ရှ်ဘုတ်ဝင်မည်
                        </Link>
                      ) : (
                        <div
                          onClick={() => {
                            if (!isCheckingProcess) {
                              setKoeNaWinOpen(false);
                              handleKoeNaWinEntry();
                            }
                          }}
                          className={`flex items-center mx-100 px-4 py-2 font-extrabold cursor-pointer ${
                            isCheckingProcess 
                              ? "text-gray-400 cursor-not-allowed" 
                              : "text-white hover:text-amber-300"
                          }`}
                        >
                          <img src={link_logo} alt="LOGO" className="size-[28px]" />
                          &nbsp; {isCheckingProcess ? "စစ်ဆေးနေသည်..." : "ကိုးနဝင်းဝင်မည်"}
                        </div>
                      )
                    ) : (
                      <div
                        onClick={() => {
                          setKoeNaWinOpen(false);
                          setLoginPromptOpen(true);
                        }}
                        className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold cursor-pointer"
                      >
                        <img src={link_logo} alt="LOGO" className="size-[28px]" />
                        &nbsp; ကိုးနဝင်းဝင်မည်
                      </div>
                    )}
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
                အကောင့်ဝင်�ရန်
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
              ကိုးနဝင်းဝင်�မည် လုပ်ဆောင်ချက်ကို mid-term seminar ပြီးဆုံးပြီးနောက် ထည့်သွင်းပေးမည်ဖြစ်ပါသည်။ ကျေးဇူးတင်ပါသည်။
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

      {/* Info Alert Dialog */}
      <AlertDialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>သတိပေးချက်</AlertDialogTitle>
            <AlertDialogDescription>{infoDialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowInfoDialog(false)}>
              နားလည်ပါသည်
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Existing Process Info Dialog */}
      <AlertDialog open={showExistingProcessDialog} onOpenChange={setShowExistingProcessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ကိုးနဝင်းအဓိဌာန် လက်ရှိအခြေအနေ</AlertDialogTitle>
            <AlertDialogDescription>
              သင်သည် ကိုးနဝင်းအဓိဌာန်ကို လက်ရှိတွင် ဆောက်တည်နေပါသည်။
              <br /><br />
              <strong>စတင်သည့်ရက်:</strong> {existingProcessInfo.startDate}
              <br />
              <strong>လက်ရှိရက်ပေါင်း:</strong> {existingProcessInfo.currentDayCount} ရက်
              <br />
              <strong>လက်ရှိအဆင့်:</strong> {existingProcessInfo.currentStage} / 9
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowExistingProcessDialog(false);
                navigate("/koenawin/dashboard");
              }}
            >
              ဒက်ရှ်ဘုတ်သို့ သွားမည်
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => setShowExistingProcessDialog(false)}>
              နောက်ဆုတ်ရန်
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Start Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>အတည်ပြုရန်</AlertDialogTitle>
            <AlertDialogDescription>
              ကိုးနဝင်းတရားကို စတင်ဆောက်တည်�လိုပါသလား? ဤအဓိဌာန်ဝင်ရောက်ခြင်းသည် ၈၁ ရက်ကြာ�မြင့်�မည်ဖြစ်ပါသည်။
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              မစတင်ပါ
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowConfirmDialog(false);
                startNewVow();
              }}
            >
              စတင်မည်
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Real Life Process Dialog */}
      <AlertDialog open={showRealLifeProcessDialog} onOpenChange={setShowRealLifeProcessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ကိုးနဝင်းအဓိဌာန် စစ်ဆေးရန်</AlertDialogTitle>
            <AlertDialogDescription>
              သင်သည် ကိုးနဝင်းအဓိဌာန်ကို လက်ရှိတွင် ဆောက်တည်နေပါသလား? (ဤအက်ပ်တွင်မဟုတ်ဘဲ လက်တွေ့ဘဝတွင်)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleRealLifeProcessYes}>
              ဟုတ်ကဲ့၊ ဆောက်တည်နေပါသည်
            </AlertDialogAction>
            <AlertDialogCancel onClick={handleRealLifeProcessNo}>
              မဟုတ်ပါ
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Days Input Dialog */}
      <AlertDialog open={showDaysInputDialog} onOpenChange={setShowDaysInputDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ကိုးနဝင်းအဓိဌာန် ရက်ပေါင်း</AlertDialogTitle>
            <AlertDialogDescription>
              ကျေးဇူးပြု၍ သင်သည် ကိုးနဝင်းအဓိဌာန်ကို မည်မျှရက်ကြာ ဆောက်တည်နေပါသလဲ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <input
              type="number"
              value={realLifeDays}
              onChange={(e) => setRealLifeDays(e.target.value)}
              placeholder="ရက်ပေါင်း ရိုက်ထည့်ပါ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f3016]"
              min="0"
              max="81"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDaysInputDialog(false)}>
              နောက်ဆုတ်ရန်
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDaysInputSubmit}>
              ဆက်လက်လုပ်ဆောင်မည်
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}