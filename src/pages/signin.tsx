import SigninForm from "../components/signinform";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../App.css";
export default function SigninPage() {
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
            <div className="w-full h-full bg-[url('./assets/signin.jpg')] bg-cover bg-center ">
              <img src={logo} alt="logo" className="absolute ml-[1170px] mt-[10px] size-[90px]" />
              <div className="w-[539px] h-[730px] ml-[65px] mt-[20px] bg-[#E2E2E2B3] bg-opacity-75 rounded-2xl flex flex-col">
                <div className="flex flex-rol mt-[30px] ml-[44px] items-center">
                  <h1 className="text-[27px] font-extrabold text-[#40320D]">LotusShrine </h1>
                  <h2 className="text-[21px] ">&nbsp; မှကြိုဆိုပါသည်</h2>
                  
                </div>
                <h1 className="text-[40px] ml-[44px] mt-[10px] font-extrabold">အကောင့်ဖွင့်ရန်</h1>
                <SigninForm />
               
              </div>
            </div>
          </div>
          </motion.div>
        </AnimatePresence>
      </>
    )
}