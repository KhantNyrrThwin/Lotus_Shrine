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
  Loader2,
  CheckSquare,
  CrossIcon,
  Crosshair,
  XCircle
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { koNaWinApi, KoNaWinProgress } from "../../data/koenawinApi";
import { getMantraForStageAndDay, isMeatFreeDay as checkMeatFreeDay } from "../../data/koeNaWinStages";

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
        progressData.tracker.dayNumberInStage || 1
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
        {/* Current Stage and Day Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <h1 className="flex items-center text-2xl font-extrabold gap-2 text-[#4f3016]">
                <Target className="w-5 h-5" />
                လက်ရှိအဆင့်နှင့် ရက်ပေါင်း
              </h1>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">လက်ရှိအဆင့်</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {progressData.tracker.currentStage} / 9
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">အဆင့်အတွင်း ပြီးမြောက်သည့် ရက်ပေါင်း</p>
                  <p className="text-2xl font-bold text-green-600">
                  {((progressData.tracker.dayNumberInStage || 1) - 1 || 9)} ရက်
                  </p>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm font-medium text-amber-800">ယနေ့၏ နေ့အမည်</p>
                <p className="text-lg font-semibold text-amber-700">
                  {(() => {
                    const todaysMantra = getMantraForStageAndDay(
                      progressData.tracker.currentStage, 
                      progressData.tracker.dayNumberInStage || 1
                    );
                    return todaysMantra ? todaysMantra.dayName : 'မသိရပါ';
                  })()}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Reading Instructions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <h1 className="flex text-2xl font-extrabold items-center gap-2 text-[#4f3016]">
                <BookOpen className="w-5 h-5" />
                ယနေ့ဖတ်ရမည့် မန္တရား
              </h1>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const todaysMantra = getMantraForStageAndDay(
                  progressData.tracker.currentStage, 
                  progressData.tracker.dayNumberInStage || 1
                );
                
                if (!todaysMantra) {
                  return (
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600">ဖတ်ရမည့် မန္တရားကို ရယူ၍ မရပါ။</p>
                    </div>
                  );
                }
                
                return (
                  <>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                      <p className="text-sm font-medium text-purple-800">မန္တရား</p>
                      <p className="text-xl font-bold text-purple-700 mb-2">
                        {todaysMantra.mantra}
                      </p>
                      <p className="text-sm text-purple-600">
                        {todaysMantra.loops} ပတ်ကြာ ဖတ်ရမည်
                      </p>
                    </div>
                    
                    {todaysMantra.isMeatFreeDay && (
                      <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <p className="text-sm font-medium text-yellow-800">
                            ယနေ့သည် သားသတ်လွတ်နေ့ဖြစ်ပါသည်
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </CardContent>
          </Card>
           <Button 
             className="bg-gradient-to-r mt-4 from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold px-6 py-3 rounded-lg cursor-pointer"
             size="lg"
           >
             <XCircle className="w-5 h-5 mr-2" />
             ကိုးနဝင်း အဓိဌာန် ဖျက်မည်  
           </Button>
        </motion.div>
        
      </div>

        {/* Current Mantra Instructions */}
       
        {/* Today's Status */}
       

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
                const dayNumber = progressData.tracker.dayNumberInStage || 1;
                const isCompleted = stageNumber < progressData.tracker.currentStage || stageNumber === progressData.tracker.currentStage && ( ((dayNumber - 1) || 9) === 9);
                console.log(stageNumber);
                const isCurrent = stageNumber === progressData.tracker.currentStage && ((dayNumber - 1) || 9)  < 9;
                
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
