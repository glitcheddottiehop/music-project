// Twinkle Twinkle Little Star - Full Song!

const melody = [
  "C4", "C4", "G4", "G4", "A4", "A4", "G4", null, 
  "F4", "F4", "E4", "E4", "D4", "D4", "C4", null,
  "C4", "C4", "G4", "G4", "A4", "A4", "G4", null, 
  "F4", "F4", "E4", "E4", "D4", "D4", "C4", null,
  "G4", "G4", "A4", "A4", "B4", "B4", "A4", null, 
  "G4", "G4", "F4", "F4", "E4", "E4", "D4", null,
  "C4", "C4", "G4", "G4", "A4", "A4", "G4", null, 
  "F4", "F4", "E4", "E4", "D4", "D4", "C4", null,
  "G4", "G4", "A4", "A4", "B4", "B4", "A4", null, 
  "G4", "G4", "F4", "F4", "E4", "E4", "D4", null,
  "C4", "C4", "G4", "G4", "A4", "A4", "G4", null, 
  "F4", "F4", "E4", "E4", "D4", "D4", "C4", null
];

const durations = [
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n"
];

// Song info
const info = {
  title: "Twinkle Twinkle Little Star",
  composer: "Traditional",
  tempo: 120,
  key: "C Major"
};

export const twinkle = { melody, durations, info };

