import * as Tone from 'tone';

/**
 * PlaybackController - Manages song playback, sequences, and transport
 * This class handles all the play/pause/restart logic and sequence management
 */
export class PlaybackController {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.currentSequence = null;
    this.currentDrumPattern = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSong = null;
    this.drumsEnabled = false; // Track drums state
  }

  /**
   * Create a sequence for the current song
   * @param {Object} song - The song object with melody and durations
   */
  createSequence(song) {
    // Clear existing sequence
    if (this.currentSequence) {
      this.currentSequence.dispose();
    }
    
    if (!song || !song.melody) {
      console.warn('No song or melody provided');
      return;
    }

    // Create new sequence - use quarter notes as base timing
    this.currentSequence = new Tone.Sequence((time, noteIndex) => {
      const note = song.melody[noteIndex];
      
      
      if (note) {
        // Use a fixed duration for all notes to keep timing consistent
        this.audioManager.playNote(note, "4n", time);
      }
    }, Array.from({length: song.melody.length}, (_, i) => i), "4n");
    
    // Set sequence to loop
    this.currentSequence.loop = true;
  }

  /**
   * Create drum pattern
   * @param {boolean} drumsEnabled - Whether drums should be enabled
   */
  createDrumPattern(drumsEnabled = false) {
    // Update drums state
    this.drumsEnabled = drumsEnabled;
    
    // Clear existing drum pattern
    if (this.currentDrumPattern) {
      Tone.Transport.clear(this.currentDrumPattern);
      this.currentDrumPattern = null;
    }
    
    if (drumsEnabled) {
      // Create snare on beats 2 and 4
      this.currentDrumPattern = Tone.Transport.scheduleRepeat(time => {
        this.audioManager.playSnare("8n", time);
      }, "2n", "2n");
    }
  }

  /**
   * Start or resume playback
   */
  async start() {
    if (this.isPaused) {
      // Resume Transport from where we paused
      Tone.Transport.start();
      
      // Recreate drum pattern if drums are enabled (in case they were toggled during pause)
      if (this.drumsEnabled && !this.currentDrumPattern) {
        this.createDrumPattern(this.drumsEnabled);
      }
    } else {
      // Start from beginning
      Tone.Transport.stop();
      Tone.Transport.start();
      if (this.currentSequence) {
        this.currentSequence.start();
      }
    }
    
    this.isPlaying = true;
    this.isPaused = false;
  }

  /**
   * Pause playback
   */
  pause() {
    Tone.Transport.pause();
    // Don't stop the sequence - just pause the transport
    // This way we can resume from the same position
    this.isPaused = true;
    this.isPlaying = false;
  }

  /**
   * Stop and reset playback
   */
  stop() {
    Tone.Transport.stop();
    
    if (this.currentSequence) {
      this.currentSequence.stop();
    }
    
    this.isPlaying = false;
    this.isPaused = false;
  }

  /**
   * Toggle between play and pause
   * @returns {string} The new state ('playing', 'paused', 'stopped')
   */
  async togglePlayPause() {
    if (this.isPlaying && !this.isPaused) {
      this.pause();
      return 'paused';
    } else {
      await this.start();
      return 'playing';
    }
  }

  /**
   * Load a new song and create its sequences
   * @param {Object} song - The song object to load
   * @param {boolean} drumsEnabled - Whether drums should be enabled
   */
  loadSong(song, drumsEnabled = false) {
    this.currentSong = song;
    this.createSequence(song);
    this.createDrumPattern(drumsEnabled);
    
    // Reset playback state
    this.isPaused = false;
    this.isPlaying = false;
  }

  /**
   * Update drum pattern (for when drums are toggled)
   * @param {boolean} drumsEnabled - Whether drums should be enabled
   */
  updateDrums(drumsEnabled) {
    // If we're currently playing, we need to be careful about timing
    if (this.isPlaying) {
      // Clear existing pattern first
      if (this.currentDrumPattern) {
        Tone.Transport.clear(this.currentDrumPattern);
        this.currentDrumPattern = null;
      }
      
      // Update state
      this.drumsEnabled = drumsEnabled;
      
      // If drums should be enabled, create new pattern with a slight delay
      if (drumsEnabled) {
        // Use a small delay to avoid timing conflicts
        Tone.Transport.scheduleOnce(() => {
          if (this.drumsEnabled) { // Double-check drums are still enabled
            this.currentDrumPattern = Tone.Transport.scheduleRepeat(time => {
              this.audioManager.playSnare("8n", time);
            }, "2n", "2n");
          }
        }, "+0.1"); // Start after 0.1 seconds
      }
    } else {
      // If not playing, we can safely create the pattern normally
      this.createDrumPattern(drumsEnabled);
    }
  }

  /**
   * Get current playback state
   * @returns {Object} Current state information
   */
  getState() {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentSong: this.currentSong
    };
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.stop();
    
    if (this.currentSequence) {
      try {
        this.currentSequence.dispose();
      } catch (error) {
        console.warn('Error disposing sequence:', error);
      }
      this.currentSequence = null;
    }
    
    if (this.currentDrumPattern) {
      try {
        Tone.Transport.clear(this.currentDrumPattern);
      } catch (error) {
        console.warn('Error clearing drum pattern:', error);
      }
      this.currentDrumPattern = null;
    }
  }
}

