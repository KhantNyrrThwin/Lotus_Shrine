import things from "../assets/24_things.png";
import Features from "../components/features";
import "../App.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function HomePage() {
  const [quoto, setQuoto] = useState("Loading");
  const [auth, setAuth] = useState("");

  useEffect(() => {
    fetch("http://localhost/lotus_shrine/fetchQuotes.php")
      .then((res) => res.json())
      .then((data) => {
        setQuoto(data.quote_name);
        setAuth(data.quote_author);
      })
      .catch((err) => {
        setQuoto("ဖတ်ရန်မအောင်မြင်ပါ");
        setAuth("ဖတ်ရန်မအောင်မြင်ပါ");
        console.error(err);
      });
  }, []);
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <Navbar />
        <div className="bg-[#4f3016] mt-[58px] ">
          <div className="flex bg-[url('./assets/home.jpg')] bg-cover  h-[741px]   justify-end rounded-t-2xl 2xl:h-[1000px]">
            <div className="flex flex-col w-[640px] 2xl:w-[800px] mr-[50px] 2xl:mr-[30px] mt-[70px] gap-2 items-center">
              <img
                src={things}
                alt="Profile_Picture"
                className="size-[230px] 2xl:size-[350px] "
              />
              <br />
              <p className="text-[27px] 2xl:text-[34px] font-bold text-[#402916]">“{quoto}”</p>
              <p className="text-[22px] 2xl:text-[29px] font-bold text-[#402916]">({auth})</p>
              <a href="/pagodas">
                <button className="bg-[#4f3016] text-[16.2px] 2xl:text-[20px] w-[200px] h-[50px] 2xl:w-[300px] 2xl:h-[70px] text-white rounded-md my-[25px] active:bg-amber-950 cursor-pointer hover:bg-amber-900">
                  ဝင်ရောက်မည်
                </button>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      <Features />
      <Footer />
    </>
  );
}

export default HomePage;
