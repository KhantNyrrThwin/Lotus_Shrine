import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useMusicPlayer } from './MusicPlayerContext';

const MusicPlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    isMuted,
    volume,
    showPlayer,
    togglePlayPause,
    nextSong,
    previousSong,
    toggleMute,
    setVolume,
    closePlayer,
  } = useMusicPlayer();

  if (!showPlayer || !currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r bg-amber-800 text-white shadow-2xl z-50 flex items-center justify-between px-6 py-3 transition-all">
      <div className="flex items-center space-x-4">
        <div className="bg-white bg-opacity-10 rounded-lg p-2">
          <Play size={24} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-lg">{currentSong.title}</p>
          <p className="text-sm text-gray-300">{currentSong.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={previousSong}
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-white text-[#4f3016] shadow hover:bg-gray-200 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={nextSong}
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>
      <div className="flex items-center space-x-2 w-48">
        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <button
        onClick={closePlayer}
        className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default MusicPlayerBar; 