import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Play } from "lucide-react";
import bell from "../assets/sounds/Meditaion.mp3";
import meditationAudio from "../assets/sounds/Meditaion.mp3";
import { useMusicPlayer } from "../components/MusicPlayerContext";
import tayartawVideos from "../data/tayartawVideos";
import { mantras } from "../data/mantras";

interface DhammaSong {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
}

const dhammaSongs: DhammaSong[] = [
  {
    id: 1,
    title: "Metta Meditation",
    artist: "Buddhist Chants",
    duration: "15:30",
    audioUrl: meditationAudio
  },
  {
    id: 2,
    title: "Mindfulness Breathing",
    artist: "Meditation Guide",
    duration: "20:15",
    audioUrl: meditationAudio
  },
  {
    id: 3,
    title: "Loving Kindness",
    artist: "Dhamma Teacher",
    duration: "18:45",
    audioUrl: meditationAudio
  },
  {
    id: 4,
    title: "Body Scan Meditation",
    artist: "Mindfulness Guide",
    duration: "25:00",
    audioUrl: meditationAudio
  }
];

// Add Tayartaw videos and Paritta Suttas data
const parittaSuttas = mantras.map((m, idx) => ({
  id: idx + 1,
  title: m.title,
  artist: m.artist,
  duration: m.duration,
  audioUrl: m.audio
}));

function Meditation() {
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10 * 60); // 10 minutes default
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Add category state
  const [category, setCategory] = useState< 'tayartaw' | 'paritta' | 'dhamma' >('tayartaw');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Use global music player context
  const { playSong, openPlayer } = useMusicPlayer();

  // Timer functions
  useEffect(() => {
    if (isTimerRunning && timer < timerDuration) {
      timerRef.current = setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    } else if (timer >= timerDuration) {
      setIsTimerRunning(false);
      // Play bell sound when timer ends
      if (audioRef.current) {
        audioRef.current.play();
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerRunning, timer, timerDuration]);

  // Music player audio control
  useEffect(() => {
    // This useEffect is no longer needed as music player state is managed by context
  }, []);

  // Remove all local music player state and handlers

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimerDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  // Remove all local music player functions

  return (
    <div className="min-h-screen bg-[#FDE9DA]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          တရားထိုင်ခြင်း
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              တရားထိုင်မည်
            </h2>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-mono text-[#493016] mb-4">
                {formatTime(timer)}
              </div>
              <div className="text-gray-600 mb-4">
                တရားထိုင်ချိန်: {formatTimerDuration(timerDuration)}
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(timer / timerDuration) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={startTimer}
                disabled={isTimerRunning}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                စတင်မည်
              </button>
              <button
                onClick={pauseTimer}
                disabled={!isTimerRunning}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ခဏရပ်မည်
              </button>
              <button
                onClick={resetTimer}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ပြန်စတင်မည်
              </button>
            </div>

            {/* Timer Duration Selection */}
            <div className="text-center">
              <label className="block text-gray-700 font-medium mb-2">
                တရားထိုင်ချိန် သတ်မှတ်ပါ :
              </label>
              <div className="flex justify-center space-x-2">
                {[5, 10, 15, 20, 30].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => {
                      setTimerDuration(minutes * 60);
                      resetTimer();
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timerDuration === minutes * 60
                        ? 'bg-[#4f3016] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {minutes} မိနစ်
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Music Player Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-[32rem] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              
              {category === 'tayartaw' && 'တရားတော်များ'}
              {category === 'paritta' && 'ဂါတာတော်များ'}
              {category === 'dhamma' && 'ဓမ္မသီချင်းများ'}
            </h2>
            {/* Category Buttons */}
            <div className="flex justify-center mb-6 space-x-2">
              
              <button
                onClick={() => setCategory('tayartaw')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'tayartaw' ? 'bg-[#4f3016] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                တရားတော်များ
              </button>
              <button
                onClick={() => setCategory('paritta')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'paritta' ? 'bg-[#4f3016] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                ဂါတာတော်များ
              </button>
              <button
                onClick={() => setCategory('dhamma')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'dhamma' ? 'bg-[#4f3016] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                ဓမ္မသီချင်းများ
              </button>
            </div>
            {/* Category Content */}
            {category === 'dhamma' && (
              <>
                {/* Open Music Player Button */}
                <div className="flex justify-center mb-4">
                 
                </div>
                {/* Song List */}
                <div className="space-y-3">
                  {dhammaSongs.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => playSong(song, dhammaSongs, index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#4f3016] rounded-lg flex items-center justify-center">
                          <Play size={16} className="text-white ml-1" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{song.title}</p>
                          <p className="text-sm text-gray-600">{song.artist}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{song.duration}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {category === 'tayartaw' && (
              <div className="space-y-3">
                {tayartawVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setPlayingVideoId(playingVideoId === video.id ? null : video.id)}
                  >
                    <div className="w-16 h-10 mr-4 flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{video.title}</p>
                      <p className="text-sm text-gray-600">{video.description}</p>
                    </div>
                    {/* Play inline video if selected */}
                    {playingVideoId === video.id && (
                      <div className="ml-4 w-64 h-36">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded border-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {category === 'paritta' && (
              <div className="space-y-3">
                {parittaSuttas.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => playSong(song, parittaSuttas, index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#4f3016] rounded-lg flex items-center justify-center">
                        <Play size={16} className="text-white ml-1" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{song.title}</p>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{song.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Meditation Tips */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Meditation Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Find Comfort</h3>
              <p className="text-gray-600 text-sm">
                Sit in a comfortable position with your back straight and shoulders relaxed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🫁</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Focus on Breath</h3>
              <p className="text-gray-600 text-sm">
                Pay attention to your natural breathing pattern without trying to change it.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💭</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Let Thoughts Pass</h3>
              <p className="text-gray-600 text-sm">
                When thoughts arise, acknowledge them and gently return to your breath.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element for bell sound only */}
      <audio ref={audioRef} src={bell} />
      <Footer />
    </div>
  );
}

export default Meditation;
