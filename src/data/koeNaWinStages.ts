// Koe Na Win Stages Data
// Extracted from the 9 stage grade components

export interface DayMantra {
  dayName: string; // Myanmar day name
  mantra: string;   // The actual mantra text
  loops: number;    // Number of repetitions
  isMeatFreeDay: boolean; // Day 5 of each stage is meat-free
}

export interface StageData {
  stageNumber: number;
  days: DayMantra[];
}

// Extract the mantra data from each stage
// Based on the pattern: Day 5 (သောကြာ) is always meat-free day
export const koeNaWinStages: StageData[] = [
  {
    stageNumber: 1,
    days: [
      { dayName: "တနင်္လာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: true },
      { dayName: "စနေ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 2,
    days: [
      { dayName: "ဗုဒ္ဓဟူး", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: true },
      { dayName: "စနေ", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 3,
    days: [
      { dayName: "သောကြာ", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: true },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false }
    ]
  },
  // Add stages 4-9 here following the same pattern
  // I'll add them based on the other grade files if needed
  

  {
    stageNumber: 4,
    days: [
      { dayName: "တနင်္ဂနွေ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: true },
      { dayName: "သောကြာ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 5,
    days: [
      { dayName: "အင်္ဂါ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: true },
      { dayName: "တနင်္ဂနွေ", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 6,
    days: [
      { dayName: "တနင်္လာ", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: true },
      { dayName: "စနေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 7,
    days: [
      { dayName: "ဗုဒ္ဓဟူး", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: true },
      { dayName: "တနင်္လာ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 8,
    days: [
      { dayName: "သောကြာ", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "တနင်္လာ", mantra: "သုဂတော", loops: 4, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: true },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false }
    ]
  },
  {
    stageNumber: 9,
    days: [
      { dayName: "ဗုဒ္ဓဟူး", mantra: "အရဟံ", loops: 1, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "ဗုဒ္ဓေါ", loops: 8, isMeatFreeDay: false },
      { dayName: "သောကြာ", mantra: "ဝိဇ္ဇာစရဏသမ္ပန္နော", loops: 3, isMeatFreeDay: false },
      { dayName: "စနေ", mantra: "အနုတ္တရောပုရိသ ဓမ္မသာရိထိ", loops: 6, isMeatFreeDay: false },
      { dayName: "တနင်္ဂနွေ", mantra: "သုဂတော", loops: 4, isMeatFreeDay: true },
      { dayName: "တနင်္လာ", mantra: "သမ္မာသမ္ဗုဒ္ဓေါ", loops: 2, isMeatFreeDay: false },
      { dayName: "အင်္ဂါ", mantra: "လောကဝိဒူ", loops: 5, isMeatFreeDay: false },
      { dayName: "ဗုဒ္ဓဟူး", mantra: "ဘဂဝါ", loops: 9, isMeatFreeDay: false },
      { dayName: "ကြာသပတေး", mantra: "သတ္တာဒေဝမနုဿာနံ", loops: 7, isMeatFreeDay: false }
    ]
  }
  

];



// Helper function to get mantra for current stage and day
export function getMantraForStageAndDay(stageNumber: number, dayInStage: number): DayMantra | null {
  const stage = koeNaWinStages.find(s => s.stageNumber === stageNumber);
  if (!stage || dayInStage < 1 || dayInStage > 9) {
    return null;
  }
  return stage.days[dayInStage - 1];
}

// Helper function to get all mantras for a stage
export function getStageMantras(stageNumber: number): DayMantra[] {
  const stage = koeNaWinStages.find(s => s.stageNumber === stageNumber);
  return stage ? stage.days : [];
}

// Helper function to check if current day is meat-free
export function isMeatFreeDay(stageNumber: number, dayInStage: number): boolean {
  const mantra = getMantraForStageAndDay(stageNumber, dayInStage);
  return mantra ? mantra.isMeatFreeDay : false;
}
