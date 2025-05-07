
import things from "../assets/24_things.png";
import "../App.css";
import {useEffect , useState } from "react";
import {motion} from "framer-motion"
function HomePage() {
   
  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >


    <div className="bg-[#4f3016]">
      <div className="flex bg-[url('./assets/home.jpg')] bg-cover h-[741px] w-screen justify-end rounded-t-2xl ">
        <div className="flex flex-col mr-[100px] mt-[70px] items-center">
          <img src={things} alt="Profile_Picture" className="size-[230px]  " />
          <br />
          <p className="text-[27px] font-bold text-[#402916]">
            "Quiet the mind and the soul will speak"
          </p>
          <p className="text-[22px] font-bold text-[#402916]">
            (Dr. Nanda Mala Bhivamsa)
          </p>
          <button className="bg-[#4f3016] w-[200px] h-[50px] text-white rounded-md my-[25px]">
            Visit
          </button>
        </div>
      </div>
    </div>
    </motion.div>
  );
}

export default HomePage;
