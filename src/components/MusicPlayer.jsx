import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { AudioManager } from '../managers/AudioManager';
import { PlaybackController } from '../managers/PlaybackController';
import { SongManager } from '../managers/SongManager';
import { songs } from '../songs/songSettings';
import './MusicPlayer.scss';

/**
 * MusicPlayer - Main React component for the music player
 * Replaces UIController and orchestrates all the managers
 */
export function MusicPlayer() {
  // State for UI
  const [playbackState, setPlaybackState] = useState('stopped'); // 'playing', 'paused', 'stopped'
  const [selectedSong, setSelectedSong] = useState('twinkle');
  const [volume, setVolume] = useState(0.5);
  const [drumsEnabled, setDrumsEnabled] = useState(false);
  
  // Refs to hold manager instances (don't recreate on every render)
  const audioManagerRef = useRef(null);
  const playbackControllerRef = useRef(null);
  const songManagerRef = useRef(null);

  // Initialize managers on component mount
  useEffect(() => {
    // Create manager instances
    audioManagerRef.current = new AudioManager();
    playbackControllerRef.current = new PlaybackController(audioManagerRef.current);
    songManagerRef.current = new SongManager(songs);

    // Load the default song
    const initialSong = songManagerRef.current.getCurrentSong();
    playbackControllerRef.current.loadSong(initialSong, drumsEnabled);

    // Set initial volume
    audioManagerRef.current.setVolume(volume);

    // Cleanup on unmount
    return () => {
      if (playbackControllerRef.current) {
        playbackControllerRef.current.dispose();
      }
      if (audioManagerRef.current) {
        audioManagerRef.current.dispose();
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Handle song change
  const handleSongChange = (songKey) => {
    if (songManagerRef.current && playbackControllerRef.current) {
      if (songManagerRef.current.switchSong(songKey)) {
        const newSong = songManagerRef.current.getCurrentSong();
        playbackControllerRef.current.loadSong(newSong, drumsEnabled);
        setSelectedSong(songKey);
        setPlaybackState('stopped');
      }
    }
  };

  // Handle play/pause toggle
  const handlePlayPause = async () => {
    if (playbackControllerRef.current) {
      try {
        // Ensure AudioContext is started on first user interaction
        await Tone.start();
        const newState = await playbackControllerRef.current.togglePlayPause();
        setPlaybackState(newState);
      } catch (error) {
        console.error('Error toggling playback:', error);
      }
    }
  };

  // Handle restart
  const handleRestart = () => {
    if (playbackControllerRef.current) {
      playbackControllerRef.current.stop();
      setPlaybackState('stopped');
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioManagerRef.current) {
      audioManagerRef.current.setVolume(newVolume);
    }
  };

  // Handle drums toggle
  const handleDrumsToggle = (e) => {
    const enabled = e.target.checked;
    setDrumsEnabled(enabled);
    if (playbackControllerRef.current) {
      playbackControllerRef.current.updateDrums(enabled);
    }
  };

  // Get button text based on playback state
  const getPlayButtonText = () => {
    switch (playbackState) {
      case 'playing':
        return '⏸ Pause';
      case 'paused':
        return '▶ Resume';
      case 'stopped':
      default:
        return '▶ Play Song';
    }
  };

  return (
    <div className="container">
      <div className="music-note">🎵</div>
      <h1>My First Coded Song</h1>
      
      <div className="controls">
        <div className="song-selector">
          <div className="song-label">Choose a Song:</div>
          <select 
            id="songSelect" 
            value={selectedSong} 
            onChange={(e) => handleSongChange(e.target.value)}
          >
            {Object.keys(songs).map(songKey => (
              <option key={songKey} value={songKey}>
                {songs[songKey].info?.title || songKey}
              </option>
            ))}
          </select>
        </div>
        
        <div className="buttons">
          <button id="play" onClick={handlePlayPause}>
            {getPlayButtonText()}
          </button>
          <button 
            id="restart" 
            className="icon-button" 
            title="Restart Song"
            onClick={handleRestart}
          >
            🔄
          </button>
        </div>
        
        <div className="volume-container">
          <div className="volume-label">Volume</div>
          <input 
            type="range" 
            id="volume" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        
        <div className="drums-container">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              id="drums" 
              checked={drumsEnabled}
              onChange={handleDrumsToggle}
            />
            <span className="checkmark">🥁</span>
            <span className="checkbox-text">Drums</span>
          </label>
        </div>
      </div>
    </div>
  );
}

