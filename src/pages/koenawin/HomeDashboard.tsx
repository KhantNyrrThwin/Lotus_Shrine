import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon,
  AlertTriangle,
  BookOpen,
  Leaf,
  CheckCircle,
  Clock,
  Heart,
  Loader2,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { toast } from "sonner";
import MMCalendar from "@/components/myanmarcalendar";
import { koNaWinApi, KoNaWinProgress } from "../../data/koenawinApi";
import { getMantraForStageAndDay, isMeatFreeDay as checkMeatFreeDay } from "../../data/koeNaWinStages";

interface HomeDashboardProps {
  username: string;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ username }) => {
  const [progress, setProgress] = useState<KoNaWinProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const progressData = await koNaWinApi.getKoeNaWinProgress();
        
        // Check if the API call was successful
        if (progressData.success === false) {
          setError(progressData.message || 'ကိုးနဝင်းတိုးတက်မှုကို ရယူ၍ မရပါ။');
          toast.error(progressData.message || 'ကိုးနဝင်းတိုးတက်မှုကို ရယူ၍ မရပါ။');
          return;
        }
        
        setProgress(progressData);
        setJustCompleted(false); // Reset just completed state on data load
        
        // Debug logging for progress data
        console.log('Progress data loaded:', {
          dailyLogs: progressData.dailyLogs,
          today: new Date().toISOString().split('T')[0],
          trackerId: progressData.tracker?.trackerId
        });
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

  const onToggleToday = () => {
    if (!progress || isButtonDisabled) return;
    setShowConfirmDialog(true);
  };

  const handleConfirmCompletion = async () => {
    if (!progress || updating) return;
    
    setUpdating(true);
    setShowConfirmDialog(false);
    
    try {
      // Log today's completion with correct day number (1-9)
      const response = await koNaWinApi.logDailyCompletion(
        progress.tracker.trackerId, 
        progress.progress.dayNumberInStage
      );
      
      if (response.success) {
        // Reload progress to get updated data
        const updatedProgress = await koNaWinApi.getKoeNaWinProgress();
        setProgress(updatedProgress);
        
        // Debug logging for updated progress
        console.log('Progress updated after completion:', {
          dailyLogs: updatedProgress.dailyLogs,
          today: new Date().toISOString().split('T')[0],
          action: response.action,
          response: response
        });
        
        // Check if today is completed in the updated progress
        const today = new Date().toISOString().split('T')[0];
        const isTodayCompletedAfterUpdate = updatedProgress.dailyLogs.some(log => 
          log.logDate === today && log.completionStatus
        );
        console.log('Is today completed after update:', isTodayCompletedAfterUpdate);
        
        // Set just completed state
        if (response.action === 'completed') {
          setJustCompleted(true);
        }
        
        // Show appropriate message based on action
        if (response.action === 'completed') {
          toast.success('ယနေ့အတွက် ပြီးဆုံးပါပြီ ဟု မှတ်သားပါပြီ။');
        } else if (response.action === 'already_completed') {
          toast.info('ယနေ့အတွက် ပြီးဆုံးပါပြီ ဟု မှတ်သားပြီးပါပြီ။');
        } else {
          toast.success(response.message);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('my-MM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get mantra for current stage and day using the new data structure
  const getCurrentMantra = () => {
    if (!progress) return { label: '', loops: 0 };
    
    const mantra = getMantraForStageAndDay(
      progress.tracker.currentStage, 
      progress.progress.dayNumberInStage
    );
    
    return mantra ? { label: mantra.mantra, loops: mantra.loops } : { label: '', loops: 0 };
  };

  const isMeatFreeDay = progress ? checkMeatFreeDay(progress.tracker.currentStage, progress.progress.dayNumberInStage) : false;
  
  // Check if today is completed by looking at daily logs
  const isTodayCompleted = progress ? progress.dailyLogs.some(log => {
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = log.logDate === today && log.completionStatus;
    
    // Debug logging
    console.log('Checking completion for today:', {
      today,
      logDate: log.logDate,
      completionStatus: log.completionStatus,
      isCompleted
    });
    
    return isCompleted;
  }) : false;

  // Also consider the justCompleted state
  const isButtonDisabled = updating || isTodayCompleted || justCompleted;

  // Additional debug logging for button state
  console.log('Button state debug:', {
    isTodayCompleted,
    updating,
    justCompleted,
    buttonDisabled: isButtonDisabled,
    progressExists: !!progress,
    dailyLogsCount: progress?.dailyLogs?.length || 0
  });

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

  if (error || !progress) {
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

  const mantra = getCurrentMantra();

  return (
    <div className="space-y-6 bg-[#FDE9DA] w-[calc(100vw-312.5px)]">
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

      {/* ---------------Connect with Database ------------- */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-[#735240] to-[#4f3016] text-white border-0">
          <CardHeader>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold">
              <CheckCircle className="w-6 h-6" />
                သာဓု ၊ သာဓု ၊ သာဓု  သင်၏ ကိုးနဝင်း အဓိဌာန် အောင်မြင်စွာ ပြီးမြောက်သွားပါပြီ ။
            </h1>
            <CardDescription className="text-[#e0e0e0]">
              <Button 
                className="bg-gradient-to-r mt-4   from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold px-6 py-3 rounded-lg"
                size="lg"
              >
                <BookOpen className="w-5 h-5 mr-2 " />
                ကိုးနဝင်း မှတ်တမ်း သိမ်းဆည်းမည်  
              </Button> 
            </CardDescription>
          </CardHeader>
          
        </Card>
      </motion.div>
      {/* ---------------Connect with Database ------------- */}


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
              {/* Meat-free Day Status - Only show on meat-free days */}
              {isMeatFreeDay && (
                <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        သားသတ်လွတ်နေ့
                      </p>
                      <p className="text-xs text-yellow-600">
                        သတိပေးချက်
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
              <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`w-full ${
                      isButtonDisabled 
                        ? 'border-green-500 text-green-600 bg-green-50 cursor-not-allowed opacity-75' 
                        : 'border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white'
                    }`}
                    disabled={isButtonDisabled}
                    onClick={onToggleToday}
                  >
                    {updating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {updating ? "မှတ်သားနေပါသည်..." : (isButtonDisabled ? "ပြီးဆုံးပါပြီ" : "ပြီးဆုံးပါပြီ ဟု မှတ်သားမည်")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#4f3016]">အတည်ပြုခြင်း</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#735240]">
                      ယနေ့အတွက် ကိုးနဝင်းတရား ပြီးဆုံးပါပြီ ဟု မှတ်သားမည်လား? 
                      ဤလုပ်ဆောင်ချက်ကို ပြန်လည်ပြုပြင်နိုင်မည်မဟုတ်ပါ။
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white">
                      ပယ်ဖျက်မည်
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleConfirmCompletion}
                      className="bg-[#4f3016] hover:bg-[#3d2410] text-white"
                    >
                      အတည်ပြုမည်
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Start Date */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <Clock className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">ကိုးနဝင်း စတင်သောနေ့</p>
                  <p className="text-xs text-[#735240]">{formatDate(progress.tracker.startDate)}</p>
                </div>
              </div>

              {/* Current Stage */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <BookOpen className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">လက်ရှိအဆင့်</p>
                  <p className="text-xs text-[#735240]">အဆင့် {progress.tracker.currentStage} / 9</p>
                </div>
              </div>

              {/* Days Completed */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">ပြီးဆုံးသောနေ့</p>
                  <p className="text-xs text-[#735240]">{progress.progress.completedDays} / 81 ရက်</p>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="flex items-center gap-3 p-3 bg-[#FDE9DA] rounded-lg">
                <Clock className="w-5 h-5 text-[#4f3016]" />
                <div>
                  <p className="text-sm font-medium text-[#4f3016]">လက်ကျန်နေ့</p>
                  <p className="text-xs text-[#735240]">{progress.progress.remainingDays} ရက်</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#4f3016]">အလုံးစုံတိုးတက်မှု</span>
                <span className="text-[#4f3016] font-semibold">{progress.progress.progressPercentage}%</span>
              </div>
              <Progress value={progress.progress.progressPercentage} className="h-3" />
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
              
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomeDashboard;

