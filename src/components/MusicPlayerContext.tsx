import  { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

export interface DhammaSong {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
}

interface MusicPlayerContextType {
  currentSong: DhammaSong | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  showPlayer: boolean;
  songList: DhammaSong[];
  currentSongIndex: number;
  playSong: (song: DhammaSong, songList?: DhammaSong[], index?: number) => void;
  togglePlayPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  openPlayer: () => void;
  closePlayer: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  return ctx;
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<DhammaSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [songList, setSongList] = useState<DhammaSong[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const playSong = (song: DhammaSong, list?: DhammaSong[], index?: number) => {
    if (list) {
      setSongList(list);
      setCurrentSongIndex(index ?? 0);
    }
    setCurrentSong(song);
    setIsPlaying(true);
    setShowPlayer(true);
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
    }
  };

  const togglePlayPause = () => {
    if (currentSong) setIsPlaying((p) => !p);
  };

  const nextSong = () => {
    if (songList.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songList.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(songList[nextIndex]);
    if (audioRef.current) {
      audioRef.current.src = songList[nextIndex].audioUrl;
      audioRef.current.load();
    }
    setIsPlaying(true);
  };

  const previousSong = () => {
    if (songList.length === 0) return;
    const prevIndex = currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(songList[prevIndex]);
    if (audioRef.current) {
      audioRef.current.src = songList[prevIndex].audioUrl;
      audioRef.current.load();
    }
    setIsPlaying(true);
  };

  const toggleMute = () => setIsMuted((m) => !m);
  const openPlayer = () => setShowPlayer(true);
  const closePlayer = () => {
    setShowPlayer(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        isMuted,
        volume,
        showPlayer,
        songList,
        currentSongIndex,
        playSong,
        togglePlayPause,
        nextSong,
        previousSong,
        toggleMute,
        setVolume,
        openPlayer,
        closePlayer,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </MusicPlayerContext.Provider>
  );
}; 