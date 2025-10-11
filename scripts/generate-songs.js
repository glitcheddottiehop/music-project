#!/usr/bin/env node

/**
 * Auto-generate song imports script
 * This script scans the songs directory and generates the songSettings.js file
 * Run this whenever you add/remove songs: npm run generate-songs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsDir = path.join(__dirname, '..', 'src', 'songs');
const songSettingsPath = path.join(songsDir, 'songSettings.js');

// Get all .js files in the songs directory
const files = fs.readdirSync(songsDir)
  .filter(file => file.endsWith('.js') && file !== 'songSettings.js')
  .map(file => file.replace('.js', ''));

console.log('🎵 Found song files:', files);

// Generate the songSettings.js content
const imports = files.map(songName => 
  `import { ${songName} } from './${songName}.js';`
).join('\n');

const songsObject = files.map(songName => 
  `  ${songName},`
).join('\n');

const content = `// Auto-generated song imports - DO NOT EDIT MANUALLY! 🎵
// Run 'npm run generate-songs' to regenerate this file

${imports}

// Create songs object
export const songs = {
${songsObject}
};

console.log('🎵 Songs loaded:', Object.keys(songs));
`;

// Write the file
fs.writeFileSync(songSettingsPath, content);
console.log('✅ Generated songSettings.js with songs:', files);
