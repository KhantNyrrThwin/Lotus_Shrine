// KoeNaWin Reading Schedule Data
// Based on the 9 stages from KoeNaWin Grades

export interface DailyReading {
  dayOfWeek: string;
  mantra: string;
  weeks: number;
  isMeatFreeDay: boolean; // Every 5th day is meat-free
}

export interface StageReadingSchedule {
  stage: number;
  dailyReadings: DailyReading[];
}

// Mapping of stages 1-9 to their daily reading schedules
export const koeNaWinReadingSchedules: StageReadingSchedule[] = [
  // Stage 1
  {
    stage: 1,
    dailyReadings: [
      { dayOfWeek: "တနင်္လာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: true },
      { dayOfWeek: "စနေ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false }
    ]
  },
  // Stage 2
  {
    stage: 2,
    dailyReadings: [
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: true },
      { dayOfWeek: "စနေ", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 5, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false }
    ]
  },
  // Stage 3
  {
    stage: 3,
    dailyReadings: [
      { dayOfWeek: "သောကြာ", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: true },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false }
    ]
  },
  // Stage 4
  {
    stage: 4,
    dailyReadings: [
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: true },
      { dayOfWeek: "သောကြာ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false }
    ]
  },
  // Stage 5
  {
    stage: 5,
    dailyReadings: [
      { dayOfWeek: "အင်္ဂါ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: true },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false }
    ]
  },
  // Stage 6
  {
    stage: 6,
    dailyReadings: [
      { dayOfWeek: "တနင်္လာ", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: true },
      { dayOfWeek: "စနေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false }
    ]
  },
  // Stage 7
  {
    stage: 7,
    dailyReadings: [
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: true },
      { dayOfWeek: "တနင်္လာ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false }
    ]
  },
  // Stage 8
  {
    stage: 8,
    dailyReadings: [
      { dayOfWeek: "သောကြာ", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္လာ", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: true },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false }
    ]
  },
  // Stage 9
  {
    stage: 9,
    dailyReadings: [
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "အရဟံ", weeks: 1, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", weeks: 8, isMeatFreeDay: false },
      { dayOfWeek: "သောကြာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", weeks: 3, isMeatFreeDay: false },
      { dayOfWeek: "စနေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", weeks: 6, isMeatFreeDay: false },
      { dayOfWeek: "တနင်္ဂနွေ", mantra: "သုဂတော", weeks: 4, isMeatFreeDay: true },
      { dayOfWeek: "တနင်္လာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", weeks: 2, isMeatFreeDay: false },
      { dayOfWeek: "အင်္ဂါ", mantra: "လောကဝိဒူ", weeks: 5, isMeatFreeDay: false },
      { dayOfWeek: "ဗုဒ္ဓဟူး", mantra: "ဘဂဝါ", weeks: 9, isMeatFreeDay: false },
      { dayOfWeek: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", weeks: 7, isMeatFreeDay: false }
    ]
  }
];

// Helper function to get today's reading based on stage and day number
export function getTodaysReading(stage: number, dayNumberInStage: number): DailyReading | null {
  const stageSchedule = koeNaWinReadingSchedules.find(s => s.stage === stage);
  if (!stageSchedule) return null;
  
  // Day number is 1-based, array is 0-based
  const dayIndex = (dayNumberInStage - 1) % stageSchedule.dailyReadings.length;
  return stageSchedule.dailyReadings[dayIndex];
}

// Helper function to get current day of week in Myanmar
export function getCurrentDayOfWeek(): string {
  const days = [
    "တနင်္ဂနွေ", // Sunday
    "တနင်္လာ",   // Monday
    "အင်္ဂါ",     // Tuesday
    "ဗုဒ္ဓဟူး",   // Wednesday
    "ကြာသပတေး", // Thursday
    "သောကြာ",    // Friday
    "စနေ"        // Saturday
  ];
  
  const today = new Date().getDay();
  return days[today];
}
