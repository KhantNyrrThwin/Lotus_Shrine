
import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import KoeNaWinGrades from "./KoeNaWinGrades";
import Buddha from "../assets/KoeNaWinPagoda.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../data/authService";
import axios from "axios";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";

function KoeNaWin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [hasKoeNaWinAccount, setHasKoeNaWinAccount] = useState(false);
  const [checkingAccount, setCheckingAccount] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = authService.isAuthenticated();
      setIsLogin(loggedIn);
      
      if (loggedIn) {
        await checkKoeNaWinAccount();
      }
    };
    
    checkLoginStatus();
  }, []);

  const checkKoeNaWinAccount = async () => {
    setCheckingAccount(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setHasKoeNaWinAccount(false);
        return;
      }

      // Modified request to match PHP endpoint expectations
      const response = await axios.post(
        "http://localhost/lotus_shrine/checkKoNaWinTracker.php",
        { userId: userId }, // Changed from user_id to userId
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Changed to match PHP response field name
        setHasKoeNaWinAccount(response.data.hasKoNaWinVow);
      }
    } catch (error) {
      console.error("Error checking Koe Na Win account:", error);
      setHasKoeNaWinAccount(false);
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

  const handleEnterKoeNaWin = () => {
    if (!isLogin) {
      navigate("/login");
      return;
    }

    if (hasKoeNaWinAccount) {
      navigate("/koenawin/dashboard");
    } else {
      setConfirmOpen(true);
    }
  };

  return (
    <>
      <div className=" bg-[#FDE9DA] w-full h-full">
        <Navbar />
        <div className="flex flex-col w-full h-[742px] mt-10 font-bold 2xl:ml-[100px]">
          <h1 className="text-center mt-14 text-[30px]  text-[#402916]">
            ကိုးနဝင်း
          </h1>
          <h2 className="text-center text-[20px] mt-[14px] mb-[38px] text-[#402916]">
            "ကိုးနဝင်း မိုးလင်းမှသိမယ်"
          </h2>
          <div className="flex flex-row">
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
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>ယနေ့သည် <b>တနင်္လာနေ့</b> မဟုတ်သောကြောင့် <br /> ကိုးနဝင်းဝင်၍မရပါ </AlertDialogTitle>
          <AlertDialogDescription>
            ကိုးနဝင်း အဓိဋ္ဌာန်သည် <b>တနင်္လာနေ့မှသာ</b> စတင်၍ ဝင်ရောက်နိုင်မည်ဖြစ်သည်
          </AlertDialogDescription>
          <div className="mt-5 flex justify-end gap-3">
            <AlertDialogCancel asChild>
              <button className="inline-flex h-10 items-center justify-center rounded-md border border-[#4f3016] cursor-pointer px-4 text-[#4f3016] hover:bg-[#4f3016]">နားလည်ပါသည်</button>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>

     
    </>
  );
}
export default KoeNaWin;