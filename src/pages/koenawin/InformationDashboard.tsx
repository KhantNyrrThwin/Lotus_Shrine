import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  Leaf,
  TrendingUp,
  Calendar
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import {
  getProgramStartDate,
  getDayIndex,
  getProgressPercentage,
  getDayInStage,
  isMeatFreeDayByDayInStage,
  isTodayCompleted as getIsTodayCompleted,
  setTodayCompleted,
  getMantraForDayIndex,
  TOTAL_STAGES
} from "../../lib/koenawin";

const InformationDashboard: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isMeatFreeDay, setIsMeatFreeDay] = useState(false);
  const [isTodayCompleted, setIsTodayCompletedState] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [totalStages] = useState(TOTAL_STAGES);

  // Removed mock mantra data in favor of computed mantra from utilities

  useEffect(() => {
    const today = new Date();
    const start = getProgramStartDate();
    const dayIdx = getDayIndex(today, start);
    const dayInStage = getDayInStage(dayIdx);
    setIsMeatFreeDay(isMeatFreeDayByDayInStage(dayInStage));
    setProgress(getProgressPercentage(dayIdx));
    setCurrentStage(Math.ceil((dayIdx + 1) / 9));
    setIsTodayCompletedState(getIsTodayCompleted(today));
  }, []);

  const today = new Date();
  const start = getProgramStartDate();
  const dayIdx = getDayIndex(today, start);
  const mantra = getMantraForDayIndex(dayIdx);

  const onToggleToday = () => {
    const next = !isTodayCompleted;
    setTodayCompleted(today, next);
    setIsTodayCompletedState(next);
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-[#735240] to-[#4f3016] text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              ကိုးနဝင်း လုပ်ငန်းစဉ် တိုးတက်မှု
            </CardTitle>
            <CardDescription className="text-[#e0e0e0]">
              လက်ရှိအဆင့် {currentStage} / {totalStages}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">ပြီးဆုံးမှုရာခိုင်နှုန်း</span>
                <span className="text-sm font-bold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Mantra Instructions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#4f3016]">
                <BookOpen className="w-5 h-5" />
                လက်ရှိ မန္တရား ညွှန်ကြားချက်များ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#FDE9DA] p-4 rounded-lg">
                <h4 className="font-semibold text-[#4f3016] mb-2">{mantra.label}</h4>
                <p className="text-sm text-[#735240] mb-3">ယနေ့ ဖတ်ရန် မန္တရား</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-[#4f3016]">ရွတ်ဖတ်ရန် အကြိမ်ရေ</span>
                  <span className="text-sm font-bold text-[#4f3016]">{mantra.loops} ပတ်</span>
                </div>
                
                <Progress value={0} className="h-2 mb-3" />
              </div>

              <div>
                <h5 className="font-medium text-[#4f3016] mb-2">ညွှန်ကြားချက်များ</h5>
                <ul className="space-y-2">
                  {[
                    "အာရုံစိုက်၍ စိတ်ငြိမ်သက်စွာ ထိုင်ပါ",
                    "ဘုရားရှိခိုးပြီး ယနေ့ မန္တရားကို ရွတ်ဖတ်ပါ",
                    "ပုတီးပတ်ဖြင့် အကြိမ်ရေ စိပ်ပါ",
                  ].map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#735240]">
                      <span className="w-2 h-2 bg-[#4f3016] rounded-full mt-2 flex-shrink-0"></span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#4f3016]">
                <Calendar className="w-5 h-5" />
                ယနေ့၏ အခြေအနေ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meat-free Day Status */}
              <div className={`p-3 rounded-lg border ${
                isMeatFreeDay 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center gap-3">
                  {isMeatFreeDay ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <Leaf className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${
                      isMeatFreeDay ? 'text-yellow-800' : 'text-green-800'
                    }`}>
                      သက်သက်စားနေ့
                    </p>
                    <p className={`text-xs ${
                      isMeatFreeDay ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {isMeatFreeDay 
                        ? 'ယနေ့သည် တနင်္လာနေ့ဖြစ်သောကြောင့် အသားမစားရန် သတိပေးချက်' 
                        : 'ယနေ့သည် အသားစားနိုင်သောနေ့ဖြစ်ပါသည်'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Today's Process Status */}
              <div className={`p-3 rounded-lg border ${
                isTodayCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-3">
                  {isTodayCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${
                      isTodayCompleted ? 'text-green-800' : 'text-blue-800'
                    }`}>
                      ယနေ့၏ လုပ်ငန်းစဉ်
                    </p>
                    <p className={`text-xs ${
                      isTodayCompleted ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {isTodayCompleted 
                        ? 'ယနေ့အတွက် ကိုးနဝင်းတရား ပြီးဆုံးပါပြီ' 
                        : 'ယနေ့အတွက် ကိုးနဝင်းတရား ဖတ်ရန်လိုအပ်ပါသည်'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full bg-[#4f3016] hover:bg-[#3a2411] text-white"
                  onClick={() => { /* optional: route to mantra reading page */ }}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  တရားဖတ်ရန် စတင်မည်
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white"
                  onClick={onToggleToday}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isTodayCompleted ? "ပြီးဆုံးမှတ်သားမှု ဖျက်မည်" : "ပြီးဆုံးပါပြီ ဟု မှတ်သားမည်"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stage Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white border-[#4f3016]">
          <CardHeader>
            <CardTitle className="text-[#4f3016]">အဆင့်ဆင့် အချက်အလက်</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: totalStages }, (_, index) => {
                const stageNumber = index + 1;
                const isCompleted = stageNumber < currentStage;
                const isCurrent = stageNumber === currentStage;
                
                return (
                  <div
                    key={stageNumber}
                    className={`p-4 rounded-lg border-2 ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : isCurrent 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${
                        isCompleted 
                          ? 'text-green-800' 
                          : isCurrent 
                          ? 'text-blue-800' 
                          : 'text-gray-600'
                      }`}>
                        အဆင့် {stageNumber}
                      </span>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {isCurrent && <Target className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className={`text-xs ${
                      isCompleted 
                        ? 'text-green-600' 
                        : isCurrent 
                        ? 'text-blue-600' 
                        : 'text-gray-500'
                    }`}>
                      {isCompleted 
                        ? 'ပြီးဆုံးပါပြီ' 
                        : isCurrent 
                        ? 'လက်ရှိလုပ်ဆောင်နေဆဲ' 
                        : 'မစတင်ရသေးပါ'
                      }
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InformationDashboard;
