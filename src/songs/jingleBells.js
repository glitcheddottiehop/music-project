// Jingle Bells - Classic Christmas Song!
const melody = [
  "E4", "E4", "E4", null,
  "E4", "E4", "E4", null,
  "E4", "G4", "C4", "D4", "E4", null,
  "F4", "F4", "F4", "F4", "F4", "E4", "E4", "E4", "E4", "D4", "D4", "E4", "D4", "G4", null
];

const durations = [
  "4n", "4n", "2n", "4n",
  "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n"
];

// Song info
const info = {
  title: "Jingle Bells",
  composer: "James Lord Pierpont",
  tempo: 120,
  key: "E Major"
};

export const jingleBells = { melody, durations, info };
