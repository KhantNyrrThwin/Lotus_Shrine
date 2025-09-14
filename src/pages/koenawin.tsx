import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import KoeNaWinGrades from "./KoeNaWinGrades";
import Buddha from "../assets/KoeNaWinPagoda.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../data/authService";
import { koNaWinApi } from "../data/koenawinApi";
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

function KoeNaWin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [checkingAccount, setCheckingAccount] = useState(true);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [infoDialogMessage, setInfoDialogMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRealLifeProcessDialog, setShowRealLifeProcessDialog] = useState(false);
  const [showRealLifeInfoDialog, setShowRealLifeInfoDialog] = useState(false);
  const [realLifeDays, setRealLifeDays] = useState("");
  const [realLifeStage, setRealLifeStage] = useState("");

  useEffect(() => {
    const checkLoginAndKoeNaWinStatus = async () => {
      const loggedIn = authService.isAuthenticated();
      setIsLogin(loggedIn);

      if (loggedIn) {
        await checkKoeNaWinAccount();
      } else {
        setCheckingAccount(false);
      }
    };

    checkLoginAndKoeNaWinStatus();
  }, []);

  const checkKoeNaWinAccount = async () => {
    setCheckingAccount(true);
    try {
      const response = await koNaWinApi.checkKoNaWinTracker();

      if (response.success) {
        // Account status checked, but we handle the flow in handleEnterKoeNaWin
      } else {
        console.error("Backend error checking Koe Na Win account:", response.message);
      }
    } catch (error) {
      console.error("Error checking Koe Na Win account:", error);
    } finally {
      setCheckingAccount(false);
    }
  };

  const scrollToGrades = () => {
    const element = document.getElementById("koenawingrades");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const startNewVow = async () => {
    try {
      const response = await koNaWinApi.startNewVow();

      if (response.success) {
        console.log("New Ko Na Win vow started successfully!");
        navigate("/koenawin/dashboard");
      } else {
        alert("Failed to start new Ko Na Win vow: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error starting new Ko Na Win vow:", error);
      alert("ကိုးနဝင်းတရား စတင်ရန် ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။");
    }
  };

  const handleEnterKoeNaWin = async () => {
    if (!isLogin) {
      navigate("/login");
      return;
    }

    // Check database for existing Koe Na Win process
    try {
      const response = await koNaWinApi.checkKoNaWinTracker();

      if (response.success && response.hasKoNaWinVow) {
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
    }
  };

  const handleRealLifeProcessYes = () => {
    setShowRealLifeProcessDialog(false);
    setShowRealLifeInfoDialog(true);
  };

  const handleRealLifeProcessNo = () => {
    setShowRealLifeProcessDialog(false);
    // Check if it's Monday
    const today = new Date().getDay();
    if (today !== 0) { // 1 is Monday
      setInfoDialogMessage("တနင်္လာနေ့မှသာ ကိုးနဝင်းအဓိဌာန် စတင်ဆောက်တည်လို့ ရပါမည်။");
      setShowInfoDialog(true);
      return;
    }
    // It's Monday - show confirmation
    setShowConfirmDialog(true);
  };

  const handleRealLifeInfoSubmit = async () => {
    if (!realLifeDays || !realLifeStage) {
      setInfoDialogMessage("ကျေးဇူးပြု၍ အားလုံးကို ရွေးချယ်ပါ။");
      setShowInfoDialog(true);
      return;
    }

    const stage = parseInt(realLifeStage);
    const dayInStage = parseInt(realLifeDays);

    // Validate inputs
    if (stage < 1 || stage > 9 || dayInStage < 1 || dayInStage > 9) {
      setInfoDialogMessage("ကျေးဇူးပြု၍ မှန်ကန်သော အဆင့်နှင့် နေ့ရက်ကို ရွေးချယ်ပါ။");
      setShowInfoDialog(true);
      return;
    }

    setShowRealLifeInfoDialog(false);

    try {
      // Calculate expected current_day_count for debugging
      const expectedCurrentDayCount = (stage - 1) * 9 + dayInStage - 1;
      console.log(`Creating tracker for Stage ${stage}, Day ${dayInStage} in stage`);
      console.log(`Expected current_day_count: ${expectedCurrentDayCount}`);
      console.log(`This means the user has completed ${expectedCurrentDayCount} days and is on day ${expectedCurrentDayCount + 1}`);
      
      const response = await koNaWinApi.startNewVowWithRealLifeProgress(stage, dayInStage);

      if (response.success) {
        console.log("Real-life Koe Na Win vow started successfully!");
        console.log(`Current day count: ${response.currentDayCount}, Current stage: ${response.currentStage}`);
        navigate("/koenawin/dashboard");
      } else {
        setInfoDialogMessage("ကိုးနဝင်းတရား စတင်ရန် ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။ " + (response.message || "Unknown error"));
        setShowInfoDialog(true);
      }
    } catch (error) {
      console.error("Error starting real-life Koe Na Win vow:", error);
      setInfoDialogMessage("ကိုးနဝင်းတရား စတင်ရန် ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။");
      setShowInfoDialog(true);
    }
  };

  return (
    <>
      <div className=" bg-[#FDE9DA] w-full h-full">
        <Navbar />
        <div className="flex flex-col w-full  h-[742px] mt-10 font-bold ">
          <h1 className="text-center mt-14 text-[30px]  text-[#402916]">
            ကိုးနဝင်း
          </h1>
          <h2 className="text-center text-[20px] mt-[14px] mb-[38px] text-[#402916]">
            "ကိုးနဝင်း မိုးလင်းမှသိမယ်"
          </h2>
          <div className="flex flex-row items-center justify-center">
            <img src={Buddha} alt="Description" className="size-[508px]" />
            <div className="flex flex-col">
              <div className="  flex items-center justify-center w-[639px] h-[340px] rounded-2xl bg-[#735240] ">
                <ul className="list-disc list-inside  text-white w-[599px] h-[306px] mt-3">
                  <li>
                    ဂုဏ်တော်ကိုးပါးဖြင့်လောကီအကျိုးစီးပွား
                    အောင်မြင်ဖြစ်ထွန်းစေသော အဓိဌာန် ဖြစ်သည်။
                  </li>
                  <li className="mt-3">အဓိဋ္ဌာန်(၉)ဆင့်ရှိသည်။</li>
                  <li className="mt-3">
                    တစ်ဆင့်လျှင်(၉)ရက်နှုန်းဖြင့် ( ၈၁ ) ရက်မပျက်မကွက် ဝင်ရမည်။
                  </li>
                  <li className="mt-3">
                    ဖော်ပြထားသော ဂုဏ်တော် အမှတ်စဉ် အတိုင်းစိပ်ပါ။
                  </li>
                  <li className="mt-3">
                    {" "}
                    ပုတီးပတ်မှာလည်း ဂုဏ်တော်အမှတ်စဉ် -အတိုင်း ၁ ကျလျှင်တစ်ပတ်
                    စိတ်၍ ၂ ကျလျှင် &nbsp; နှစ်ပတ်စိတ်ရန်ဖြစ်သည်။
                  </li>
                  <li className="mt-3">
                    {" "}
                    မည်သည့်နေ့တွင်မွေးဖွားသော သားသမီးမဆို တနင်္လာနေ့မှစ၍
                    အဓိဌာန်ဝင် ရောက်ရမည်။
                  </li>
                </ul>
              </div>
              <div className="flex flex-row mt-[57px]">
                <button
                  onClick={scrollToGrades}
                  className=" flex items-center justify-center w-[260px] h-[73px] rounded-2xl bg-[#4F3016]  text-white mr-[51px] ml-[32px]"
                >
                  ကိုးနဝင်းအဆင့်များ
                </button>
                <button
                  onClick={handleEnterKoeNaWin}
                  disabled={checkingAccount}
                  className={`flex items-center justify-center w-[260px] h-[73px] rounded-2xl bg-[#4F3016] text-white ${
                    checkingAccount ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {checkingAccount ? "စစ်ဆေးနေသည်..." : "ကိုးနဝင်းဝင်မည်"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <section id="koenawingrades">
          <KoeNaWinGrades />
        </section>
        <Footer />
      </div>


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
            ဆောက်တည်နေလျက်ရှိပါသည်            </AlertDialogAction>
            <AlertDialogCancel onClick={handleRealLifeProcessNo}>
              ယခု စတင်မည်
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Real Life Process Info Dialog - All questions in one */}
      <AlertDialog open={showRealLifeInfoDialog} onOpenChange={setShowRealLifeInfoDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>ကိုးနဝင်းအဓိဌာန် လက်ရှိအခြေအနေ</AlertDialogTitle>
            <AlertDialogDescription>
              ကျေးဇူးပြု၍ သင့်လက်ရှိ ကိုးနဝင်းအဓိဌာန် အခြေအနေကို ရွေးချယ်ပါ။
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            {/* Stage Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                မည်သည့်အဆင့်တွင် ရှိနေပါသလဲ?
              </label>
              <select
                value={realLifeStage}
                onChange={(e) => setRealLifeStage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f3016]"
              >
                <option value="">အဆင့် ရွေးချယ်ပါ</option>
                <option value="1">ပထမအဆင့်</option>
                <option value="2">ဒုတိယအဆင့်</option>
                <option value="3">တတိယအဆင့်</option>
                <option value="4">စတုတ္ထအဆင့်</option>
                <option value="5">ပဉ္စမအဆင့်</option>
                <option value="6">ဆဋ္ဌမအဆင့်</option>
                <option value="7">သတ္တမအဆင့်</option>
                <option value="8">အဋ္ဌမအဆင့်</option>
                <option value="9">နဝမအဆင့်</option>
              </select>
            </div>
            {/* Days Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ထိုအဆင့်တွင် ‌ရောက်ရှိနေသည့် နေ့ရက်ကို ရွေးချယ်ပါ?
              </label>
              <select
                value={realLifeDays}
                onChange={(e) => setRealLifeDays(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f3016]"
              >
                <option value="">နေ့ရက်ရွေးချယ်ရန်</option>
                {Array.from({ length: 9 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} ရက်မြောက်
                  </option>
                ))}
              </select>
            </div>

            
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowRealLifeInfoDialog(false)}>
              နောက်ဆုတ်ရန်
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRealLifeInfoSubmit}>
              ဆက်လက်လုပ်ဆောင်မည်
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Start Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>အတည်ပြုရန်</AlertDialogTitle>
            <AlertDialogDescription>
              ကိုးနဝင်းတရားကို စတင်ဆောက်တည်လိုပါသလား? ဤအဓိဌာန်ဝင်ရောက်ခြင်းသည် ၈၁ ရက်ကြာမြင့်မည်ဖြစ်ပါသည်။
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
    </>
  );
}
export default KoeNaWin;