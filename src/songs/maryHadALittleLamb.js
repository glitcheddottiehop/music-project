// Mary Had a Little Lamb - Classic Nursery Rhyme!

const melody = [
  "E4", "D4", "C4", "D4", "E4", "E4", "E4", null,
  "D4", "D4", "D4", null,
  "E4", "G4", "G4", null,
  "E4", "D4", "C4", "D4", "E4", "E4", "E4", "E4",
  "D4", "D4", "E4", "D4", "C4", null
];

const durations = [
  "4n", "4n", "4n", "4n", "4n", "4n", "2n", "4n",
  "4n", "4n", "2n", "4n",
  "4n", "4n", "2n", "4n",
  "4n", "4n", "4n", "4n", "4n", "4n", "4n", "4n",
  "4n", "4n", "4n", "4n", "2n", "4n"
];

// Song info
const info = {
  title: "Mary Had a Little Lamb",
  composer: "Traditional",
  tempo: 120,
  key: "C Major"
};

export const maryHadALittleLamb = { melody, durations, info };
