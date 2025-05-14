import { useState } from "react";
import applogo1 from "../assets/logo1.png";
import profile from "../assets/profile.png";
import link_logo from "../assets/link_lotus.png";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

import { Link } from "react-router-dom";
export default function Navbar() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  return (
    <>
      <nav
        className={`flex bg-[#4f3016]  text-white font-bold h-[58px] items-center  transition-all duration-1000 ${isFeaturesOpen || isAboutOpen ? "h-[140px] " : "h-[ 58px]"}`}>
          {/* Features Navbar */}
        <div className="absolute top-0 left-0 right-0 h-[58px] flex items-center">
          <Link to="/">
            <img src={applogo1} alt="LOGO" className=" size-[47px] ml-[35px]" />
          </Link>
          <Link to="/">
          <a href="index.html" className="flex text-[21.2px] ml-[21px]">
            <p className=" text-white font-bold">Lotus Shrine</p>
          </a>
          </Link>

            {/* Features Navbar */}
          <div className="flex text-[16.2px] font-bold space-x-[50px] ml-[191px]">
            <div className="ml-0" onMouseEnter={() => setIsFeaturesOpen(true)}   onMouseLeave={() => setIsFeaturesOpen(false)}>
              <p className={"text-white cursor-pointer "}>Features</p>
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
                      &nbsp; Pagodas
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; Meditation
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/aboutus">
              <p className="text-[16.2px] font-bold text-white">Koe Na Win</p>
            </Link>

              {/* About Us Navbar */}
            <div className="ml-0" onMouseEnter={() => setAboutOpen(true)}   onMouseLeave={() => setAboutOpen(false)}>
              <p className={"text-white cursor-pointer "}>About Us</p>
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
                      &nbsp; About Us
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center mx-100 px-4 py-2 text-white hover:text-amber-300 font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; About project
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
    </>
  );
}
