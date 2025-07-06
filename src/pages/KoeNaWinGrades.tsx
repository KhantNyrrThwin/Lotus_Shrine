import "../App.css";
import { useState } from "react";
import First from "../koe_na_win_grades/first";
import Second from "../koe_na_win_grades/second";
import Third from "../koe_na_win_grades/third";
import Fourth from "../koe_na_win_grades/forth";
import Fifth from "../koe_na_win_grades/fifth";
import Sixth from "../koe_na_win_grades/sixth";
import Seventh from "../koe_na_win_grades/seventh";
import Eighth from "../koe_na_win_grades/eighth";
import Ninth from "../koe_na_win_grades/ninth";

function KoeNaWinGrades() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>("first");

  const handleGradeClick = (grade: string) => {
    setSelectedGrade(grade);
  };

  const renderGradeContent = () => {
    switch (selectedGrade) {
      case "first":
        return <First />;
      case "second":
        return <Second />;
      case "third":
        return <Third />;
      case "fourth":
        return <Fourth />;
      case "fifth":
        return <Fifth />;
      case "sixth":
        return <Sixth />;
      case "seventh":
        return <Seventh />;
      case "eighth":
        return <Eighth />;
      case "ninth":
        return <Ninth />;
      default:
        return <First />;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#FDE9DA] 2xl:ml-[100px]">
      <h1 className="text-[24px] font-bold mt-5">ကိုးနဝင်းအဆင့်များ</h1>
      <div className="flex flex-rol w-full h-full mt-[17px] ">
        <div className="w-[251px] h-[508px] ml-[38px]  ">
          <button
            className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold mt-[6px] mb-[18px] transition-colors duration-200 ${
              selectedGrade === "first"
                ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
            }`}
            onClick={() => handleGradeClick("first")}
          >
            ပထမအဆင့်
          </button>
          <button
            className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold mb-[18px] transition-colors duration-200 ${
              selectedGrade === "second"
                ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
            }`}
            onClick={() => handleGradeClick("second")}
          >
            ဒုတိယအဆင့်
          </button>
          <button
            className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold mb-[18px] transition-colors duration-200 ${
              selectedGrade === "third"
                ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
            }`}
            onClick={() => handleGradeClick("third")}
          >
            တတိယအဆင့်
          </button>
          <button
            className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold mb-[18px] transition-colors duration-200 ${
              selectedGrade === "fourth"
                ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
            }`}
            onClick={() => handleGradeClick("fourth")}
          >
            စတုတ္ထအဆင့်
          </button>
          <button
            className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold mb-[18px] transition-colors duration-200 ${
              selectedGrade === "fifth"
                ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
            }`}
            onClick={() => handleGradeClick("fifth")}
          >
            ပဉ္စမအဆင့်
          </button>
          <button
            className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold mb-[18px] transition-colors duration-200 ${
              selectedGrade === "sixth"
                ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
            }`}
            onClick={() => handleGradeClick("sixth")}
          >
            ဆဌမအဆင့်
          </button>
        </div>
        <div className="w-[865px] ml-[84px] mr-[42px] flex flex-col  items-center">
          <div className="w-[865px] h-[508px]  flex items-center justify-center">
            {renderGradeContent()}
          </div>
          <div className="w-[820px] h-[68px] mt-[31px] flex flex-row justify-center gap-[30px]">
            <button
              className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold transition-colors duration-200 ${
                selectedGrade === "seventh"
                  ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                  : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
              }`}
              onClick={() => handleGradeClick("seventh")}
            >
              သတ္တမအဆင့်
            </button>
            <button
              className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold transition-colors duration-200 ${
                selectedGrade === "eighth"
                  ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                  : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
              }`}
              onClick={() => handleGradeClick("eighth")}
            >
              အဌမအဆင့်
            </button>
            <button
              className={`w-[247px] h-[68px] rounded-[19px] cursor-pointer text-white text-[18px] font-bold transition-colors duration-200 ${
                selectedGrade === "ninth"
                  ? "bg-[#5A2F2A] shadow-lg transform scale-105"
                  : "bg-[#76403b] hover:bg-[#8B4A44] active:bg-[#6A3A35]"
              }`}
              onClick={() => handleGradeClick("ninth")}
            >
              နဝမအဆင့်
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KoeNaWinGrades;
