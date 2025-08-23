import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  Quote,
  Heart
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Calendar } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";

interface HomeDashboardProps {
  username: string;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ username }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isMeatFreeDay, setIsMeatFreeDay] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2024-03-21'));
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isTodayCompleted, setIsTodayCompleted] = useState(false);

  // Mock motivational quotes
  const motivationalQuotes = [
    {
      text: "ကိုးနဝင်း မိုးလင်းမှသိမယ်",
      author: "ဗုဒ္ဓဘာသာ ဆိုရိုးစကား"
    },
    {
      text: "တရားဖတ်ခြင်းသည် စိတ်ကို ငြိမ်းအေးစေသည်",
      author: "ဓမ္မပဒ"
    },
    {
      text: "သီလ သမာဓိ ပညာ သုံးပါးနှင့် ပြည့်စုံသော လူသားဖြစ်ပါစေ",
      author: "ဗုဒ္ဓဘာသာ ဆိုရိုးစကား"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    // Calculate days remaining
    const today = new Date();
    const remaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(0, remaining));

    // Check if today is meat-free day (Monday)
    const dayOfWeek = today.getDay();
    setIsMeatFreeDay(dayOfWeek === 1); // Monday = 1

    // Random quote rotation
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [endDate, motivationalQuotes.length]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('my-MM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-[#735240] to-[#4f3016] text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="w-6 h-6" />
              မင်္ဂလာပါ {username}
            </CardTitle>
            <CardDescription className="text-[#e0e0e0]">
              ကိုးနဝင်းစိတ်ဓာတ်ဖြင့် နေ့စဉ်ဘဝကို ဖြတ်သန်းနိုင်ပါစေ
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#4f3016]">
                <CalendarIcon className="w-5 h-5" />
               က္ခဒိန်
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Quotes Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-[#FDE9DA] to-[#f5e6d3] border-[#4f3016]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#4f3016]">
                <Quote className="w-5 h-5" />
                စိတ်ဓာတ်မြှင့်တင်ရန် စကားလုံးများ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <p className="text-lg font-medium text-[#4f3016] italic">
                  "{motivationalQuotes[currentQuoteIndex].text}"
                </p>
                <p className="text-sm text-[#735240]">
                  - {motivationalQuotes[currentQuoteIndex].author}
                </p>
              </motion.div>
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
                    <p className="text-xs text-yellow-600">တနင်္လာနေ့ဖြစ်သောကြောင့် အသားမစားရန် သတိပေးချက်</p>
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
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomeDashboard;
