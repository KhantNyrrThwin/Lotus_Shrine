import { Calendar1Icon } from 'lucide-react';
import  { useState, useEffect, FC } from 'react';

// Main App component
const MMCalendar: FC = () => {
  // State to hold the current date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Use an effect to update the date every second for a live display
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  // Arrays for Myanmar days and traditional month names
  const myanmarDays: string[] = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
  const myanmarMonths: string[] = ['တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်', 'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို', 'တပို့တွဲ', 'တပေါင်း'];

  // Reference date: August 8, 2025, is a full moon day (လပြည့်နေ့) in Wagaung
  const referenceDate: Date = new Date('2025-08-08');
  const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
  const DAYS_PER_CYCLE: number = 29;

  // Helper function to get the ordinal suffix for a number
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Function to calculate and format the Myanmar date
  const getMyanmarDate = (date: Date): string => {
    const gregorianDay: number = date.getDate();
    const gregorianYear: number = date.getFullYear();

    // Calculate the difference in days from the reference date
    const diffInTime: number = date.getTime() - referenceDate.getTime();
    const diffInDays: number = Math.floor(diffInTime / MS_PER_DAY);
    
    // Calculate the day within the 29-day lunar cycle.
    // The cycle includes days 0-28.
    const cycleDay: number = (diffInDays % DAYS_PER_CYCLE + DAYS_PER_CYCLE) % DAYS_PER_CYCLE;
    
    // Calculate the month index. The month changes on 'လဆန်း (၁)ရက်',
    // which corresponds to cycleDay 14.
    const monthCycleOffset: number = Math.floor((diffInDays + 14) / DAYS_PER_CYCLE);
    const myanmarMonthIndex: number = (4 + monthCycleOffset) % 12;
    const myanmarMonth: string = myanmarMonths[(myanmarMonthIndex + 12) % 12];

    let myanmarPhase: string = '';
    let myanmarDayNumber: string = '';
    
    // Determine the lunar phase and day number based on the new cycle logic
    if (cycleDay === 0) {
      myanmarPhase = 'လပြည့်နေ့';
      myanmarDayNumber = '';
    } else if (cycleDay >= 1 && cycleDay <= 13) {
      myanmarPhase = 'လဆုတ်';
      myanmarDayNumber = `(${cycleDay}) ရက်`;
    } else if (cycleDay === 14) {
      myanmarPhase = 'လကွယ်နေ့';
      myanmarDayNumber = '';
    } else if (cycleDay >= 15 && cycleDay <= 28) {
      myanmarPhase = 'လဆန်း';
      myanmarDayNumber = `(${cycleDay - 14}) ရက်`;
    } else {
        // This case should not be reached with the current logic,
        // but it's good practice for robustness.
        myanmarPhase = 'N/A';
        myanmarDayNumber = '';
    }

    // Get the Myanmar day of the week
    const dayOfWeek: string = myanmarDays[date.getDay()];
    
    // Get the full English month name
    const englishMonth: string = date.toLocaleString('en-us', { month: 'long' });
    
    // Return the formatted string in the requested format
    return `${myanmarMonth} ${myanmarPhase} ${myanmarDayNumber} ၊ ${dayOfWeek}နေ့
      ${englishMonth} ${gregorianDay}${getOrdinalSuffix(gregorianDay)} ${gregorianYear} , ${date.toLocaleString('en-us', { weekday: 'long' })}`;
  };

  // Render the component UI
  return (
      <div className="bg-white p-4 rounded-xl shadow-lg text-center border border-amber-900">
        <h1 className="text-xl font-bold text-gray-800 mb-2 font-['Inter'] flex">
          ပြက္ခဒိန် <Calendar1Icon className='size-5 mt-1 ml-4' />
        </h1>
       
        <div className="flex flex-col mt-3 space-y-2 text-xl font-['Inter']">
          {/* Display the formatted Myanmar date */}
          <span className="text-2xl font-semibold text-gray-800">
            {getMyanmarDate(currentDate).split('\n')[0]}
          </span>
          {/* Display the Gregorian date */}
          <span className="text-lg text-gray-500">
            {getMyanmarDate(currentDate).split('\n')[1].trim()}
          </span>
        </div>
      </div>
  );
};

export default MMCalendar;
