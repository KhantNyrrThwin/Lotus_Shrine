import { useState } from "react";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [value, setValue] = React.useState("");
  const [email, setemail] = useState("justicforyang@gmail.com");
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div className="flex bg-[url('./assets/forgot_password.png')] w-full h-screen items-center justify-center 2xl:h-[800px]">
          <div className="w-[489px] h-[446px] bg-[#E2E2E2B3] rounded-2xl flex flex-col justify-center">
            <h2 className="ml-5 mt-5 text-[20px] font-extrabold text-[#40320D]">
              စကားဝှက်မေ့သွားပါသည်
            </h2>
            <p className="ml-5 mt-5 text-[18px] font-bold text-[#40320D]">
              စကားဝှက် ပြန်လည်သတ်မှတ်ရန် သင်၏ Email <br></br>
              <span className="text-[20px] font-extrabold underline">
                {email}
              </span>{" "}
              အား message ပို့ထားပါသည်
            </p>
            <div className="flex flex-col mt-3 justify-center items-center space-y-2 ">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="w-full flex justify-end text-[14px] font-bold text-[#40320D]">
              <Link to="/forgotpassword" className="mr-[50px] hover:underline">
                message ပြန်ပို့ပေးပါ
              </Link>
            </div>
            <div className="flex flex-col mt-3 justify-center items-center space-y-2 h-[100px]">
              <a href="/changepassword">
                <button
                  type="submit"
                  className={`w-[150px] h-[40px] text-[14px] font-bold bg-[#4f3016] cursor-pointer text-[#ffffff] rounded-[9px] hover:bg-[#3a2411] hover:text-extrabold`}
                >
                  ရှေ့ဆက်မည်
                </button>
              </a>
              <Link
                to="/login"
                className="hover:underline text-[14px] font-bold text-[#40320D]"
              >
                စကားဝှက်သိပြီ
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
