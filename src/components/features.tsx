import "../App.css";
import { motion } from "framer-motion";
function Grid_Features() {
  return (
    <>
      <div className="flex bg-[url('./assets/bar1.jpg')] bg-cover h-[700px] mt-0">
        <div className="w-screen  mt-0 h-[700px] bg-[#fde9da] text-[#4f3016] rounded-4xl  ">
          <h1 className="text-4xl font-bold text-center mt-10">
            ဝန်ဆောင်မှုများ
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-3 gap-4 p-4 max-w-[1000px] mx-auto mt-5">

              <a href="/pagodas">
              <div className="p-8 m-5 rounded-lg bg-[url('./assets/features/PagodasHover.jpg')] bg-cover w-[300px] h-[200px] cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:bg-[url('./assets/features/Pagodas.jpg')]">
                <h3 className="text-lg font-bold">ဘုရားများ</h3>
                <p>ဘုရားများကို ကြည့်ရှုရန်</p>
              </div>
              </a>

              <a href="/dhamma">
              <div className="p-8 m-5 rounded-lg bg-[url('./assets/features/DhammaHover.jpg')] bg-cover w-[300px] h-[200px] cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:bg-[url('./assets/features/Dhamma.jpg')]">
                <h3 className="text-lg font-bold">ဓမ္မတရားတော်များ</h3>
                <p>တရားတော်များကို နားထောင်ရန်</p>
              </div>
              </a>

              <a href="/tayartaw">
              <div className="p-8 m-5 rounded-lg bg-[url('./assets/features/MonkHover.jpg')] bg-cover w-[300px] h-[200px] cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:bg-[url('./assets/features/Monk.jpg')]">
                <h3 className="text-lg font-bold">ဆရာတော်များ</h3>
                <p>ဆရာတော်များ၏ တရားတော်များ</p>
              </div>
              </a>

              <a href="/meditation">
              <div className="p-8 m-5 rounded-lg bg-[url('./assets/features/MeditateHover.jpg')] bg-cover w-[300px] h-[200px] cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:bg-[url('./assets/features/Meditate.jpg')]">
                <h3 className="text-lg font-bold">တရားထိုင်ရန်</h3>
                <p>တရားထိုင်ရန်</p>
              </div>
              </a>

              <a href="/koenawin">
                <div className="p-8 m-5 rounded-lg bg-[url('./assets/features/KoeNaWin.jpg')] bg-cover w-[300px] h-[200px] cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:bg-[url('./assets/features/KoeNaWinHover.jpg')]">
                  <h3 className="text-lg font-bold">ကိုးနဝင်း</h3>
                  <p>ကိုးနဝင်းကို ဝင်ရောက်ရန်</p>
                </div>
              </a>

              <a href="/gonetaw">
              <div className="p-8 m-5 rounded-lg bg-[url('./assets/features/NineHover.jpg')] bg-cover w-[300px] h-[200px] cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:bg-[url('./assets/features/Nine.jpg')]">
                <h3 className="text-lg font-bold">ဂုဏ်တော် (၉) ပါး</h3>
                <p>ဂုဏ်တော် (၉) ပါး အကြောင်း</p>
              </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Grid_Features;
