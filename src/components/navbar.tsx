import React, { useState } from "react";
import applogo1 from "../assets/logo1.png"
import profile from "../assets/profile.png";
import link_logo from "../assets/link_lotus.png"
import "../App.css";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
export default function Navbar() {

  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  return (
    <>
    <motion.div
      initial={{ opacity: 0.5}}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 2}}
    >
      <nav className={`flex bg-[#4f3016]  text-white font-bold h-[58px] items-center  transition-all duration-1000 ${isFeaturesOpen ? 'h-[140px] ' : 'h-[ 58px]'}`}>
      <div className="absolute top-0 left-0 right-0 h-[58px] flex items-center">
       <Link to="/">
          <img src={applogo1} alt="LOGO" className=" size-[47px] ml-[35px]" />
        </Link>
        <a href="index.html" className="flex text-[21.2px] ml-[21px]">
          <p className=" text-white font-bold">Lotus Shrine</p>
        </a>

        <div className="flex text-[16.2px] font-bold space-x-[50px] ml-[191px]">

        <div
                        className="ml-0"
                        onMouseEnter={() => setIsFeaturesOpen(true)}
                       
                    >
                        <p className={'text-white cursor-pointer '}>Features</p>
                        {isFeaturesOpen && (
                            <div className="absolute left-0 mt-0 py-2 w-screen transition-all duration-2000"  onMouseEnter={() => setIsFeaturesOpen(true)}  onMouseLeave={() => setIsFeaturesOpen(false)}>
                              
                                <Link to="/pagodas" className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold t">
                                <img src={link_logo} alt="LOGO" className=" size-[28px]" />&nbsp; Pagodas
                                </Link>
                                <Link to="/meditation" className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold">
                                <img src={link_logo} alt="LOGO" className=" size-[28px]" />&nbsp; Meditation
                                </Link>
                            </div>
                        )}
                    </div>

          <a href="">
            <p className="text-[16.2px] font-bold text-white">Koe Na Win</p>
          </a>
          <Link to="/aboutus">
            <p className="text-[16.2px] font-bold text-white">About Us</p>
         </Link>
          <a href="">
            <p className="text-[16.2px] font-bold text-white">Account</p>
          </a>
        </div>

        <div className="flex bg-[#76403b00] w-[307px] ml-[70px] h-[54px] bg-opacity-58 rounded-[19px] items-center">
          <img src={profile} alt="Profile_Picture" className="size-[40px] " />
          <div className="flex bg-[#76403b8c] w-[250px] ml-[6px] h-[38px] bg-opacity-58 rounded-[13px] items-center justify-center">
            Khant Nyar Thwin
          </div>
        </div>
        </div>
      </nav>
      </motion.div>
    </>
  );
}
