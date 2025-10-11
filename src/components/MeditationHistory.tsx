import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/alert-dialog';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval } from 'date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define types
interface MeditationSession {
  date: Date;
  duration: number; // in seconds
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const MeditationHistory: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Meditation Time (minutes)',
      data: [],
      backgroundColor: 'rgba(124, 58, 237, 0.6)',
    }]
  });
  
  const [monthlyData, setMonthlyData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Meditation Time (minutes)',
      data: [],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
    }]
  });
  
  const [sessions, setSessions] = useState<MeditationSession[]>([
    // Dummy data for demonstration
    { date: new Date(Date.now() - 86400000 * 2), duration: 1200 }, // 20 minutes, 2 days ago
    { date: new Date(Date.now() - 86400000 * 1), duration: 1800 }, // 30 minutes, 1 day ago
    { date: new Date(), duration: 900 }, // 15 minutes, today
  ]);
  const [showHistory, setShowHistory] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    updateChartData();
  }, []);

  // Update chart data when sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      updateChartData();
    }
  }, [sessions]);

  // Function to update chart data
  const updateChartData = () => {
    // Weekly data (current week since last reset)
    const today = new Date();
    const lastReset = localStorage.getItem('meditationWeeklyReset');
    let weekStart, weekEnd;
    
    if (lastReset) {
      weekStart = new Date(lastReset);
      weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
    } else {
      weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
      weekEnd = endOfWeek(today, { weekStartsOn: 0 }); // Saturday
    }
    
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    const weeklyLabels = weekDays.map(day => {
      const dayName = format(day, 'EEE');
      const dayNameMap: Record<string, string> = {
        'Sun': 'တနင်္ဂနွေ',
        'Mon': 'တနင်္လာ',
        'Tue': 'အင်္ဂါ',
        'Wed': 'ဗုဒ္ဓဟူး',
        'Thu': 'ကြာသပတေး',
        'Fri': 'သောကြာ',
        'Sat': 'စနေ'
      };
      return dayNameMap[dayName] || dayName;
    });
    const weeklyValues = weekDays.map(day => {
      const daySessions = sessions.filter(session => 
        isSameDay(session.date, day) && session.date >= weekStart
      );
      const totalDuration = daySessions.reduce((sum, session) => sum + session.duration, 0);
      return Math.round(totalDuration / 60); // Convert to minutes
    });
    
    setWeeklyData({
      labels: weeklyLabels,
      datasets: [{
        label: 'တရားထိုင်ခြင်း အချိန် (မိနစ်)',
        data: weeklyValues,
        backgroundColor: 'rgba(79, 48, 22, 0.7)',
      }]
    });
    
    // Monthly data (current month)
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Group by week for better visualization
    const weeksInMonth = [];
    let currentWeekStart = monthStart;
    
    while (currentWeekStart <= monthEnd) {
      const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });
      weeksInMonth.push({
        start: currentWeekStart,
        end: weekEnd > monthEnd ? monthEnd : weekEnd
      });
      currentWeekStart = new Date(weekEnd);
      currentWeekStart.setDate(currentWeekStart.getDate() + 1);
    }
    
    const monthlyLabels = weeksInMonth.map((week, index) => `အပတ် ${index + 1}`);
    const monthlyValues = weeksInMonth.map(week => {
      const weekSessions = sessions.filter(session => 
        isWithinInterval(session.date, { start: week.start, end: week.end })
      );
      const totalDuration = weekSessions.reduce((sum, session) => sum + session.duration, 0);
      return Math.round(totalDuration / 60); // Convert to minutes
    });
    
    setMonthlyData({
      labels: monthlyLabels,
      datasets: [{
        label: 'တရားထိုင်ခြင်း အချိန် (မိနစ်)',
        data: monthlyValues,
        backgroundColor: 'rgba(121, 76, 40, 0.7)',
      }]
    });
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + ' မိနစ်';
          }
        }
      }
    }
  };

  // Function to reset weekly data on Sunday at 00:00
  const resetWeeklyData = () => {
    const now = new Date();
    const lastReset = localStorage.getItem('meditationWeeklyReset');
    
    // If no reset time is stored, set it to the most recent Sunday at 00:00
    if (!lastReset) {
      const lastSunday = new Date(now);
      lastSunday.setDate(now.getDate() - now.getDay()); // Get last Sunday
      lastSunday.setHours(0, 0, 0, 0); // Set to 00:00:00
      localStorage.setItem('meditationWeeklyReset', lastSunday.toISOString());
      return;
    }
    
    const resetTime = new Date(lastReset);
    const nextReset = new Date(resetTime);
    nextReset.setDate(resetTime.getDate() + 7); // Next Sunday
    
    // If we've passed the next reset time, reset the weekly chart data
    if (now >= nextReset) {
      // Update the reset time to this Sunday at 00:00
      const thisSunday = new Date(now);
      thisSunday.setDate(now.getDate() - now.getDay());
      thisSunday.setHours(0, 0, 0, 0);
      localStorage.setItem('meditationWeeklyReset', thisSunday.toISOString());
      
      // Note: We don't actually delete session data, we just change how we display it
      // The weekly chart will now show data from this week onwards
      updateChartData();
    }
  };

  // Initialize weekly reset time and check for reset
  useEffect(() => {
    // Initialize reset time if not set
    const lastReset = localStorage.getItem('meditationWeeklyReset');
    if (!lastReset) {
      const now = new Date();
      const lastSunday = new Date(now);
      lastSunday.setDate(now.getDate() - now.getDay()); // Get last Sunday
      lastSunday.setHours(0, 0, 0, 0); // Set to 00:00:00
      localStorage.setItem('meditationWeeklyReset', lastSunday.toISOString());
    }
    
    const interval = setInterval(() => {
      resetWeeklyData();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [sessions]);

  return (
    <div>
      <AlertDialog open={showHistory} onOpenChange={setShowHistory}>
        <AlertDialogTrigger asChild>
          <Button 
            onClick={() => setShowHistory(true)}
            className="bg-amber-900 hover:bg-amber-700 text-white cursor-pointer"
          >
            တရားထိုင်ခြင်း မှတ်တမ်း ကြည့်ရန်
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>တရားထိုင်ခြင်း မှတ်တမ်း</AlertDialogTitle>
            <AlertDialogDescription>
              သင်၏ တရားထိုင်ခြင်း မှတ်တမ်း
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-6">

              {/* Session History Table */}
            <Card className="bg-white border-[#4f3016]">
              <CardHeader>
                <h1 className="text-[#4f3016] text-2xl font-bold">တရားထိုင်ခြင်း မှတ်တမ်း</h1>
              </CardHeader>
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                                        <tbody className="bg-white divide-y divide-gray-200">
                      {sessions.map((session, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(session.date, 'MMM dd, yyyy HH:mm')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.round(session.duration / 60)} မိနစ်
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
            {/* Weekly Chart */}
            <Card className="bg-white border-[#4f3016]">
              <CardHeader>
                <h1 className="text-[#4f3016] text-2xl font-bold">အပတ်စဉ် တရားထိုင်ခြင်း အချိန်</h1>
              </CardHeader>
              <CardContent>
                <Bar data={weeklyData} options={chartOptions} />
              </CardContent>
            </Card>
            
            {/* Monthly Chart */}
            <Card className="bg-white border-[#4f3016]">
              <CardHeader>
                <h1 className="text-[#4f3016] text-2xl font-bold">လစဉ် တရားထိုင်ခြင်း အချိန်</h1>
              </CardHeader>
              <CardContent>
                <Bar data={monthlyData} options={chartOptions} />
              </CardContent>
            </Card>
            
          
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>ပိတ်မည်</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MeditationHistory;