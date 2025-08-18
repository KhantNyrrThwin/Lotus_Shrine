import LoginForm from "../components/loginform";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../App.css";
import GoogleAuth from "../components/GoogleAuth";
export default function LoginPage() {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="w-full h-full bg-[url('./assets/home.jpg')] bg-cover bg-center ">
              <img
                src={logo}
                alt="logo"
                className="ml-[10px] mt-[10px] size-[90px]"
              />
              <div className="w-[539px] h-[514px] ml-[695px] mt-[10px] bg-[#E2E2E2B3] bg-opacity-75 rounded-2xl flex flex-col">
                <div className="flex flex-rol mt-[44px] ml-[44px] items-center">
                  <h1 className="text-[27px] font-extrabold text-[#40320D]">
                    LotusShrine{" "}
                  </h1>
                  <h2 className="text-[21px] ">&nbsp; မှကြိုဆိုပါသည်</h2>
                </div>
                <h1 className="text-[40px] ml-[44px] mt-[10px] font-extrabold">
                  အကောင့်ဝင်ရန်
                </h1>
                <LoginForm />
                <div className="mt-4 flex items-center justify-center">
                  <GoogleAuth mode="signin" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
