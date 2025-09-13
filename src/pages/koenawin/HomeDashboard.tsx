import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon,
  AlertTriangle,
  BookOpen,
  Leaf,
  CheckCircle,
  Clock,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  getProgramStartDate,
  getProgramEndDate,
  getDaysRemaining,
  getDayIndex,
  getDayInStage,
  isMeatFreeDayByDayInStage,
  isTodayCompleted as getIsTodayCompleted,
  setTodayCompleted,
  getMantraForDayIndex,
  formatDateKey,
} from "../../lib/koenawin";
import MMCalendar from "@/components/myanmarcalendar";
import { fetchKoeNaWinProgress, saveKoeNaWinProgress } from "@/data/koenawinApi";

interface HomeDashboardProps {
  username: string;
}

const COMPLETED_DATES_KEY = "knwCompletedDates";
const START_DATE_KEY = "knwStartDate";

const HomeDashboard: React.FC<HomeDashboardProps> = ({ username }) => {
  const [isMeatFreeDay, setIsMeatFreeDay] = useState(false);
  const [startDate, setStartDate] = useState<Date>(getProgramStartDate());
  const [endDate, setEndDate] = useState<Date>(getProgramEndDate(getProgramStartDate()));
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isTodayCompleted, setIsTodayCompletedState] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const email = localStorage.getItem("userEmail");
      // Always compute UI from local storage initially
      const today = new Date();
      const currentStart = getProgramStartDate();
      const computedEnd = getProgramEndDate(currentStart);
      setStartDate(currentStart);
      setEndDate(computedEnd);
      setDaysRemaining(getDaysRemaining(today, computedEnd));
      const todayIndex = getDayIndex(today, currentStart);
      setIsMeatFreeDay(isMeatFreeDayByDayInStage(getDayInStage(todayIndex)));
      setIsTodayCompletedState(getIsTodayCompleted(today));

      if (!email) return;

      try {
        const server = await fetchKoeNaWinProgress(email);
        if (server.start_date) {
          // Sync server state to localStorage used by utils
          localStorage.setItem(START_DATE_KEY, server.start_date);
        }
        localStorage.setItem(COMPLETED_DATES_KEY, JSON.stringify(server.completed_dates || []));

        // Recompute after sync
        const syncedStart = getProgramStartDate();
        const syncedEnd = getProgramEndDate(syncedStart);
        setStartDate(syncedStart);
        setEndDate(syncedEnd);
        setDaysRemaining(getDaysRemaining(today, syncedEnd));
        const idx = getDayIndex(today, syncedStart);
        setIsMeatFreeDay(isMeatFreeDayByDayInStage(getDayInStage(idx)));
        setIsTodayCompletedState(getIsTodayCompleted(today));
      } catch {
        // Ignore server errors; stay with local-only
      }
    };

    bootstrap();
  }, []);

  const persistToServer = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return; // cannot persist without a user

    const start = getProgramStartDate();
    let completed: string[] = [];
    try {
      const raw = localStorage.getItem(COMPLETED_DATES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) completed = parsed;
      }
    } catch {}

    try {
      await saveKoeNaWinProgress(email, {
        start_date: formatDateKey(start),
        completed_dates: completed,
      });
    } catch {
      // Swallow errors to keep UI responsive
    }
  };

  const today = new Date();
  const start = getProgramStartDate();
  const dayIdx = getDayIndex(today, start);
  const mantra = getMantraForDayIndex(dayIdx);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('my-MM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const onToggleToday = () => {
    const next = !isTodayCompleted;
    setTodayCompleted(today, next);
    setIsTodayCompletedState(next);
    // Fire-and-forget server sync
    void persistToServer();
  };

  return (
    <div className="space-y-6 w-242">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-[#735240] to-[#4f3016] text-white border-0">
          <CardHeader>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
              <Heart className="w-6 h-6" />
              မင်္ဂလာပါ {username}
            </h1>
            <CardDescription className="text-[#e0e0e0]">
              ကိုးနဝင်းစိတ်ဓာတ်ဖြင့် နေ့စဉ်ဘဝကို ဖြတ်သန်းနိုင်ပါစေ
            </CardDescription>
          </CardHeader>
        </Card>
        
      </motion.div>

      <div className="flex flex-row gap-6">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
        <MMCalendar />
        <Card className="bg-white border-[#4f3016] mt-5">
            <CardHeader>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-[#4f3016]">
                <CalendarIcon className="w-5 h-5" />
                ယနေ့၏ အခြေအနေ
              </h1>
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
                      သားသတ်လွတ်နေ့
                    </p>
                    <p className={`text-xs ${
                      isMeatFreeDay ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {isMeatFreeDay 
                        ? 'ယနေ့သည် သားသတ်လွတ်နေ့ဖြစ်သောကြောင့် အသားမစားရန် သတိပေးချက်' 
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
              <Button 
                  variant="outline" 
                  className="w-full border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white"
                  onClick={onToggleToday}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isTodayCompleted ? "ပြီးဆုံးမှတ်သားမှု ဖျက်မည်" : "ပြီးဆုံးပါပြီ ဟု မှတ်သားမည်"}
                </Button>
              
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Quotes Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-[#4f3016]">
                <BookOpen className="w-5 h-5" />
                လက်ရှိ မန္တရား ညွှန်ကြားချက်များ
              </h1>
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
      </div>

      {/* Koe Na Win Process Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white border-[#4f3016]">
          <CardHeader>
            <CardTitle className="text-[#4f3016]">ကိုးနဝင်း လုပ်ငန်းစဉ် အချက်အလက်</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Start Date */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <Clock className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">ကိုးနဝင်း စတင်သောနေ့</p>
                  <p className="text-xs text-[#735240]">{formatDate(startDate)}</p>
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">ပြီးဆုံးသောနေ့</p>
                  <p className="text-xs text-[#735240]">{formatDate(endDate)}</p>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <Clock className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">လက်ကျန်နေ့</p>
                  <p className="text-xs text-[#735240]">{daysRemaining} ရက်</p>
                </div>
              </div>
            </div>

            {/* Today's Status */}
            <div className="space-y-3">
              {/* Meat-free Day Warning */}
              {isMeatFreeDay && (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">ယနေ့ သက်သက်စားနေ့လား</p>
                    <p className="text-xs text-yellow-600">ယနေ့သည် အဆင့်၌ (၅)ရက်မြောက်ဖြစ်၍ အသားမစားရန် သတိပေးချက်</p>
                  </div>
                </div>
              )}

              {/* Today's Process Status */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                {isTodayCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-[#4f3016]" />
                )}
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">တရားဖတ်ဖို့ သတိပေးချက်</p>
                  <p className="text-xs text-[#735240]">
                    {isTodayCompleted 
                      ? "ယနေ့အတွက် ပြီးဆုံးပါပြီ" 
                      : "ယနေ့အတွက် ကိုးနဝင်းတရား ဖတ်ရန်လိုအပ်ပါသည်"
                    }
                  </p>
                </div>
              </div>
              <div>
                <Button 
                  className="mt-2 bg-[#4f3016] hover:bg-[#3a2411] text-white"
                  onClick={() => {
                    const next = !isTodayCompleted;
                    setTodayCompleted(today, next);
                    setIsTodayCompletedState(next);
                    void persistToServer();
                  }}
                >
                  {isTodayCompleted ? "ပြီးဆုံးမှတ်သားမှု ဖျက်မည်" : "ယနေ့ ပြီးဆုံးဟု မှတ်သားမည်"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomeDashboard;
