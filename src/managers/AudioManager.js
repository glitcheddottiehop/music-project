import * as Tone from 'tone';

/**
 * AudioManager - Handles all Tone.js audio setup and management
 * This class is responsible for creating and managing synths, drums, and audio routing
 */
export class AudioManager {
  constructor() {
    this.synth = null;
    this.kick = null;
    this.snare = null;
    this.volume = 0.5;
    
    this.initializeAudio();
  }

  /**
   * Initialize all audio components
   */
  initializeAudio() {
    // Create polyphonic synth with nice settings
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.6,
        release: 1.5
      }
    }).toDestination();

    // Create drum sounds
    this.kick = new Tone.MembraneSynth().toDestination();
    this.snare = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
    }).toDestination();

    // Set initial volume
    this.setVolume(this.volume);
  }

  /**
   * Set the master volume
   * @param {number} volume - Volume level (0-1)
   */
  setVolume(volume) {
    this.volume = volume;
    this.synth.volume.value = volume * 20 - 20; // Convert 0-1 to -20 to 0 dB range
  }

  /**
   * Get the current volume
   * @returns {number} Current volume level
   */
  getVolume() {
    return this.volume;
  }

  /**
   * Play a note on the synth
   * @param {string} note - The note to play (e.g., "C4")
   * @param {string} duration - The duration (e.g., "4n")
   * @param {number} time - When to play the note
   */
  playNote(note, duration, time) {
    if (note && this.synth) {
      this.synth.triggerAttackRelease(note, duration, time);
    }
  }

  /**
   * Play a snare hit
   * @param {string} duration - The duration of the snare
   * @param {number} time - When to play the snare
   */
  playSnare(duration, time) {
    if (this.snare) {
      this.snare.triggerAttackRelease(duration, time);
    }
  }

  /**
   * Clean up audio resources
   */
  dispose() {
    if (this.synth) {
      try {
        this.synth.dispose();
      } catch (error) {
        console.warn('Error disposing synth:', error);
      }
      this.synth = null;
    }
    if (this.kick) {
      try {
        this.kick.dispose();
      } catch (error) {
        console.warn('Error disposing kick:', error);
      }
      this.kick = null;
    }
    if (this.snare) {
      try {
        this.snare.dispose();
      } catch (error) {
        console.warn('Error disposing snare:', error);
      }
      this.snare = null;
    }
  }
}

