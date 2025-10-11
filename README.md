# 🎵 Music Project - My First Coded Song

Composing music through programming using React, Vite, and Tone.js!

## ✨ Features

- 🎹 Play pre-programmed songs with synth melodies
- 🥁 Toggle drum accompaniment on/off
- 🎚️ Adjustable volume control
- ▶️ Play, pause, and restart controls
- 🎼 Easy-to-add song library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (if using Node 18, Vite 4.x is used; Node 20+ allows Vite 5+)

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
music-project/
├── src/
│   ├── managers/           # Audio & playback logic
│   │   ├── AudioManager.js       - Tone.js synth & drum setup
│   │   ├── PlaybackController.js - Sequencing & transport control
│   │   └── SongManager.js        - Song library management
│   ├── components/
│   │   └── MusicPlayer.jsx - Main React UI component
│   ├── songs/              # Song data files
│   │   ├── twinkle.js      - Twinkle Twinkle Little Star
│   │   ├── jingleBells.js  - Jingle Bells
│   │   ├── maryHadALittleLamb.js - Mary Had a Little Lamb
│   │   └── songSettings.js - Auto-generated song library config
│   ├── App.jsx             - Root component
│   ├── App.scss            - Styles with glassmorphism design
│   └── main.jsx            - React entry point
├── scripts/
│   └── generate-songs.js   - Auto-generates song imports
├── index.html              - HTML entry point
├── vite.config.js          - Vite configuration
└── package.json            - Dependencies & scripts
```

## 🎼 Adding New Songs

### Step 1: Create Your Song File 📝

Create a new song file in `src/songs/` (e.g., `mysong.js`):

```javascript
// Your Song Title - Description!

const melody = [
  "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5",  // Notes or null for rest
  "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"
];

const durations = [
  "4n", "4n", "4n", "4n", "4n", "4n", "4n", "2n",   // Duration for each note
  "4n", "4n", "4n", "4n", "4n", "4n", "4n", "2n"
];

// Song metadata
const info = {
  title: "My Awesome Song",
  composer: "You!",
  tempo: 120,        // BPM (beats per minute)
  key: "C Major"     // Musical key
};

// Export name must match filename (without .js extension)
export const mysong = { melody, durations, info };
```

### Step 2: Run the Generation Script 🤖

```bash
npm run generate-songs
```

This script automatically:
- 🔍 **Scans** the `src/songs/` directory for all `.js` files
- 🚫 **Skips** `songSettings.js` (so it doesn't import itself)
- 📝 **Generates** proper import statements automatically
- 🎵 **Updates** the songs object with all discovered songs
- ⚡ **No manual editing** required!

### Step 3: Done! 🎉

Your song automatically appears in the dropdown! No more manual import editing needed.

### Removing Songs 🗑️

1. **Delete** the song file from `src/songs/`
2. **Run** `npm run generate-songs`
3. **Done!** The song is automatically removed from the app

## 🎹 Note Format

- Notes: `"C4"`, `"D#4"`, `"Eb5"`, etc. or `null` for rest
- Durations: `"4n"` (quarter), `"8n"` (eighth), `"2n"` (half), `"1n"` (whole)

## 🔧 Technologies

- **React** - UI library
- **Vite** - Build tool & dev server
- **Tone.js** - Web Audio framework
- **SCSS** - Enhanced CSS with nesting

## 📝 Notes

The original vanilla JS version is preserved in the root directory (`js/`, `songs/`, `script.js`, `styles.css`). The React version is in the `src/` folder and is what runs with `npm run dev`.

## 🎨 Design

Beautiful gradient background with glassmorphism effects, animated elements, and smooth interactions!

---

Made with 🎵 and code!
