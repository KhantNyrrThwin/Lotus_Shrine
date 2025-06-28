import { Link } from "react-router-dom";
import "../App.css";
import applogo from "../assets/logo.png";
import link_logo from "../assets/link_lotus.png";
function Footer() {
  return (
    <>
      <div className="bg-[#4f3016] text-white font-bold   h-[325px]  ">
        <div className="flex flex-row">
        <div className="flex flex-col w-[430px] h-[280px] ml-[58px] mt-[5px] item-left ">
        <Link
                      to="/"
                    
                    >
        <div className="flex w-[300px] h-[100px]    items-center 2xl:ml-[80px]">
          <img src={applogo} alt="LOGO" className=" size-[75px]  " />
          <h1 className="text-white text-[24px] font-bold ml-[10px] mt-[10px] ">Lotus Shrine</h1>
          <p className="text-white text-[16px] font-bold ml-[10px] mt-[10px]">
            
          </p>
        </div>
        </Link>
        <p className="text-white text-[14px] w-[330px] text-justify 2xl:ml-[80px]">
          ဤပရောဂျက်သည် တရားထိုင်ခြင်းနှင့် ဆုတောင်းခြင်း ကဲ့သို့သောဗုဒ္ဓဘာသာရဲ့ဝိညာဉ်ပိုင်းဆိုင်ရာအလေ့အထ များကိုနည်း ပညာနှင့်ပေါင်းစပ်၍၊ ခရီးသွား၍ မရသောသူ များအတွက်ပါ အွန်လိုင်းမှတစ် ဆင့် ခံစားနိုင်မည့် မြတ်နိုး အေးချမ်းသော ပလက်ဖောင်းတစ်ခု အဖြစ် ဖန်တီးထား ပါသည်။
          </p>
        </div>
     

        <div className="flex flex-col  w-[200px] h-[280px] ml-[93px] mt-[5px] text-[14px]  items-center  ">
        <div className="flex flex-col w-[200px] h-[100px] mt-[30px] ">
        
          <h1 className="text-white text-[18px] font-bold mt-[10px] 2xl:ml-[40px] ">ဝန်ဆောင်မှုများ</h1>
        
        </div>
        <div className="flex flex-col w-[200px] h-[280px] 2xl:ml-[80px]">
        <Link
                      to="/aboutus"
                      className="flex items-center text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ရည်ရွယ်ချက်
                    </Link>
                    <Link
                      to="/aboutus"
                      className="flex items-center text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ကျွန်ုပ်တို့အကြောင်း
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center  text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဆက်သွယ်ရန် 
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center  text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; ဆက်သွယ်ရန် 
                    </Link>
                    </div>
        </div>

        <div className="flex flex-col  w-[400px] h-[280px] ml-[93px] mt-[5px] text-[14px]  ">
        <div className="flex flex-col w-[300px] h-[100px] mt-[30px]  ">
        
          <h1 className="text-white text-[18px] font-bold mt-[10px] 2xl:ml-[60px]">ကျွန်တော်တို့နှင့် ဆက်သွယ်ရန်</h1>
        
        </div>
        <div className="flex flex-col w-[400px] h-[280px] 2xl:ml-[60px]">
        <Link
                      to="/aboutus"
                      className="flex items-center text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; Developers များ
                    </Link>
                    <Link
                      to="/aboutus"
                      className="flex items-center text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; 09406323053
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center  text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; lotusshrine@gmail.com 
                    </Link>
                    <Link
                      to="/meditation"
                      className="flex items-center  text-white hover:text-amber-300 mb-[10px] font-extrabold"
                    >
                      <img src={link_logo} alt="LOGO" className="size-[28px]" />
                      &nbsp; https://github.com/KhantNyrrThwin/Lotus_Shrine 
                    </Link>
                    </div>
        </div>
    

        
      </div>
      <h3 className="text-center font-bold">© 2025 MIIT. All rights reserved.</h3>
      </div>
    </>
  );
}

export default Footer;
