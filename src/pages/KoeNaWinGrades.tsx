import "../App.css";
import { useState } from "react";
import First from "../koe_na_win_grades/first";

function KoeNaWinGrades() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const handleGradeClick = (grade: string) => {
    setSelectedGrade(grade);
  };

  const renderGradeContent = () => {
    switch (selectedGrade) {
      case "first":
        return <First />;
      default:
        return <First />;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#FDE9DA]">
        <h1 className="text-[24px] font-extrabold mt-5">ကိုးနဝင်းအဆင့်များ</h1>
        <div className="flex flex-rol w-full h-full mt-[17px] ">
            <div className="w-[251px] h-[508px] ml-[38px]  ">
                <button 
                  className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold mt-[6px] mb-[18px]"
                  onClick={() => handleGradeClick("first")}
                >
                  ပထမအဆင့်
                </button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold mb-[18px]">ဒုတိယအဆင့်</button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold mb-[18px]">တတိယအဆင့်</button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold mb-[18px]">စတုတ္ထအဆင့်</button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold mb-[18px]">ပဉ္စမအဆင့်</button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold mb-[18px]">ဆဌမအဆင့်</button>
            </div>
            <div className="w-[865px] ml-[84px] mr-[42px] flex flex-col  items-center">
                <div className="w-[865px] h-[508px]  flex items-center justify-center">
                  {renderGradeContent()}
                </div>
                <div className="w-[820px] h-[68px] mt-[31px] flex flex-row justify-center gap-[30px]">
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold ">သတ္တမအဆင့်</button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold ">အဌမအဆင့်</button>
                <button className="w-[247px] h-[68px] bg-[#76403b] rounded-[19px] text-white text-[18px] font-bold ">နဝမအဆင့်</button>
          
                </div>
            </div>
        </div>
    </div>
  )
}

export default KoeNaWinGrades