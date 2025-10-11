/**
 * SongManager - Handles song loading, selection, and metadata
 * This class manages the song library and provides methods to switch between songs
 */
export class SongManager {
  constructor(songs) {
    this.songs = songs;
    this.currentSongKey = 'twinkle'; // Default song
    this.currentSong = null;
    
    this.loadCurrentSong();
  }

  /**
   * Load the current song data
   */
  loadCurrentSong() {
    if (this.songs[this.currentSongKey]) {
      this.currentSong = this.songs[this.currentSongKey];
    } else {
      console.error(`Song "${this.currentSongKey}" not found`);
      // Fallback to first available song
      const availableSongs = Object.keys(this.songs);
      if (availableSongs.length > 0) {
        this.currentSongKey = availableSongs[0];
        this.currentSong = this.songs[this.currentSongKey];
      }
    }
  }

  /**
   * Switch to a different song
   * @param {string} songKey - The key of the song to switch to
   * @returns {boolean} True if successful, false otherwise
   */
  switchSong(songKey) {
    if (this.songs[songKey]) {
      this.currentSongKey = songKey;
      this.currentSong = this.songs[songKey];
      return true;
    } else {
      console.error(`Song "${songKey}" not found`);
      return false;
    }
  }

  /**
   * Get the current song data
   * @returns {Object} Current song object
   */
  getCurrentSong() {
    return this.currentSong;
  }

  /**
   * Get the current song key
   * @returns {string} Current song key
   */
  getCurrentSongKey() {
    return this.currentSongKey;
  }

  /**
   * Get all available songs
   * @returns {Object} All songs object
   */
  getAllSongs() {
    return this.songs;
  }

  /**
   * Get song keys for dropdown population
   * @returns {Array} Array of song keys
   */
  getSongKeys() {
    return Object.keys(this.songs);
  }

  /**
   * Get song info for a specific song
   * @param {string} songKey - The song key (optional, defaults to current song)
   * @returns {Object} Song info object
   */
  getSongInfo(songKey = null) {
    const key = songKey || this.currentSongKey;
    return this.songs[key]?.info || null;
  }

  /**
   * Get song title for a specific song
   * @param {string} songKey - The song key (optional, defaults to current song)
   * @returns {string} Song title
   */
  getSongTitle(songKey = null) {
    const info = this.getSongInfo(songKey);
    return info?.title || 'Unknown Song';
  }

  /**
   * Check if a song exists
   * @param {string} songKey - The song key to check
   * @returns {boolean} True if song exists
   */
  songExists(songKey) {
    return !!this.songs[songKey];
  }

  /**
   * Get the number of available songs
   * @returns {number} Number of songs
   */
  getSongCount() {
    return Object.keys(this.songs).length;
  }
}

