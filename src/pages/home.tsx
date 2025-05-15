import things from "../assets/24_things.png";
import Features from "../components/features";
import "../App.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
function HomePage() {
  const [quoto, setQuoto] = useState("Loading");
  const [auth, setAuth] = useState("");

  useEffect(() => {
    fetch("http://localhost/lotus_shrine/fetchQuotes.php") // adjust the path
      .then((res) => res.json())
      .then((data) => {
        setQuoto(data.quote);
        setAuth(data.author);
      })
      .catch((err) => {
        setQuoto("ဖတ်ရန်မအောင်မြင်ပါ");
        setAuth("အမည်မသိ");
        console.error(err);
      });
  }, []);
  return (
    <>    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-[#4f3016] mt-[58px] ">
        <div className="flex bg-[url('./assets/home.jpg')] bg-cover  h-[741px]  justify-end rounded-t-2xl ">
          <div className="flex flex-col mr-[100px] mt-[70px] gap-2 items-center">
            <img
              src={things}
              alt="Profile_Picture"
              className="size-[230px]  "
            />
            <br />
            <p className="text-[27px] font-bold text-[#402916]">
            “{quoto}”
            </p>
            <p className="text-[22px] font-bold text-[#402916]">
            ({auth})
            </p>
            <a href="/aboutus">
            <button className="bg-[#4f3016] text-[16.2px] w-[200px] h-[50px] text-white rounded-md my-[25px] active:bg-amber-950 cursor-pointer hover:bg-amber-900">
              ဝင်ရောက်မည်
            </button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>

    <Features  />
    </>

  );
}

export default HomePage;
