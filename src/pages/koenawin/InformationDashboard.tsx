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
  Calendar,
  Loader2
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { koNaWinApi, KoNaWinProgress } from "../../data/koenawinApi";

const InformationDashboard: React.FC = () => {
  const [progressData, setProgressData] = useState<KoNaWinProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await koNaWinApi.getKoeNaWinProgress();
        setProgressData(data);
      } catch (err) {
        console.error('Error loading progress:', err);
        setError('ကိုးနဝင်းတိုးတက်မှုကို ရယူ၍ မရပါ။');
        toast.error('ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။');
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  const onToggleToday = async () => {
    if (!progressData || updating) return;
    
    setUpdating(true);
    
    try {
      const response = await koNaWinApi.logDailyCompletion(
        progressData.tracker.trackerId, 
        progressData.progress.dayNumberInStage
      );
      
      if (response.success) {
        const updatedProgress = await koNaWinApi.getKoeNaWinProgress();
        setProgressData(updatedProgress);
        
        if (response.action === 'completed') {
          toast.success('ယနေ့အတွက် ပြီးဆုံးပါပြီ ဟု မှတ်သားပါပြီ။');
        } else if (response.action === 'already_completed') {
          toast.info('ယနေ့အတွက် ပြီးဆုံးပါပြီ ဟု မှတ်သားပြီးပါပြီ။');
        }
      } else {
        toast.error(response.message || 'မှတ်သားရာတွင် အမှားတစ်ခုခု ဖြစ်ပွားပါသည်။');
      }
    } catch (err) {
      console.error('Error toggling today completion:', err);
      toast.error('ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။');
    } finally {
      setUpdating(false);
    }
  };

  const getMantraForStage = (stage: number): { label: string; loops: number } => {
    const mantras = [
      { label: '', loops: 0 }, // Stage 0
      { label: 'အရဟံ', loops: 108 }, // Stage 1
      { label: 'သမ္မာသမ္ဗုဒ္ဓေါ', loops: 108 }, // Stage 2
      { label: 'ဝိဇ္ဇာစရဏသမ္ပန္နော', loops: 108 }, // Stage 3
      { label: 'သုဂတော', loops: 108 }, // Stage 4
      { label: 'လောကဝိဒူ', loops: 108 }, // Stage 5
      { label: 'အနုတ္တရော ပုရိသဒမ္မသာရထိ', loops: 108 }, // Stage 6
      { label: 'သတ္ထာ ဒေဝမနုဿာနံ', loops: 108 }, // Stage 7
      { label: 'ဗုဒ္ဓေါ', loops: 108 }, // Stage 8
      { label: 'ဘဂဝါ', loops: 108 } // Stage 9
    ];
    
    return mantras[stage] || { label: '', loops: 0 };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#4f3016]" />
          <p className="text-[#4f3016]">ကိုးနဝင်းတိုးတက်မှုကို ရယူနေပါသည်...</p>
        </div>
      </div>
    );
  }

  if (error || !progressData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">အမှားတစ်ခုခု ဖြစ်ပွားပါသည်</h3>
            <p className="text-red-600 mb-4">{error || 'ကိုးနဝင်းတိုးတက်မှုကို ရယူ၍ မရပါ။'}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700"
            >
              ပြန်လည်ကြိုးစားမည်
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isMeatFreeDay = progressData.progress.dayNumberInStage === 5;
  const isTodayCompleted = progressData.dailyLogs.some(log => 
    log.logDate === new Date().toISOString().split('T')[0] && log.completionStatus
  );
  const mantra = getMantraForStage(progressData.tracker.currentStage);

  return (
    <div className="space-y-6 w-242">
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
              လက်ရှိအဆင့် {progressData.tracker.currentStage} / 9
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">ပြီးဆုံးမှုရာခိုင်နှုန်း</span>
                <span className="text-sm font-bold">{progressData.progress.progressPercentage}%</span>
              </div>
              <Progress value={progressData.progress.progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Mantra Instructions */}
       
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
                disabled={updating}
              >
                {updating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                {updating ? "မှတ်သားနေပါသည်..." : (isTodayCompleted ? "ပြီးဆုံးပါပြီ" : "ပြီးဆုံးပါပြီ ဟု မှတ်သားမည်")}
              </Button>
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
              {Array.from({ length: 9 }, (_, index) => {
                const stageNumber = index + 1;
                const isCompleted = stageNumber < progressData.tracker.currentStage;
                const isCurrent = stageNumber === progressData.tracker.currentStage;
                
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
