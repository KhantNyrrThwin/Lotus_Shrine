// Helper script to extract mantra data from grade components
// Run this with: node src/scripts/extractStagesData.js

const fs = require('fs');
const path = require('path');

// This script helps extract the mantra data from your grade components
// You can manually run this to get the data for stages 4-9

console.log('=== Koe Na Win Stages Data Extractor ===');
console.log('');
console.log('To complete the stages data, you need to:');
console.log('1. Read each grade component file (fourth.tsx, fifth.tsx, etc.)');
console.log('2. Extract the mantra and loop data from each table row');
console.log('3. Add the data to src/data/koeNaWinStages.ts');
console.log('');
console.log('Pattern for each stage:');
console.log('- Each stage has 9 days');
console.log('- Day 5 (သောကြာ) is always meat-free day');
console.log('- Extract: dayName, mantra, loops from each <tr>');
console.log('');
console.log('Example format for stage 4:');
console.log(`{
  stageNumber: 4,
  days: [
    { dayName: "တနင်္လာ", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "အင်္ဂါ", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "ဗုဒ္ဓဟူး", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "ကြာသပတေး", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "သောကြာ", mantra: "mantra_text", loops: number, isMeatFreeDay: true },
    { dayName: "စနေ", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "တနင်္ဂနွေ", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "တနင်္လာ", mantra: "mantra_text", loops: number, isMeatFreeDay: false },
    { dayName: "အင်္ဂါ", mantra: "mantra_text", loops: number, isMeatFreeDay: false }
  ]
},`);
