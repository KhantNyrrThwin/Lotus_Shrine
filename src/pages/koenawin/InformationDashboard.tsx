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
    <div className="space-y-6 w-[calc(100vw-312.5px)]">
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
       
        {/* Today's Status */}
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
