import { useState, useEffect, useRef } from "react"; 
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Play, Camera, Search } from "lucide-react";
import bell from "../assets/sounds/Meditaion.mp3";
import meditationAudio from "../assets/sounds/Meditaion.mp3";
import { useMusicPlayer } from "../components/MusicPlayerContext";
import tayartawVideos from "../data/tayartawVideos";
import { mantras } from "../data/mantras";
// Replace existing bell import
import completeMBell from "../assets/sounds/completeM.ogg";  // Meditation completion sound
import incorrectPostureAudio from "../assets/sounds/alarm.ogg";  // Incorrect posture sound

import * as tmPose from "@teachablemachine/pose";
import MeditationHistory from "../components/MeditationHistory";

// -----------------------------
// Types / Interfaces
// -----------------------------
interface DhammaSong {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
}

interface PostureOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  instructions: string;
}

// -----------------------------
// Static data
// -----------------------------
const postureOptions: PostureOption[] = [
  {
    id: "Burmese",
    name: "Burmese Posture",
    description: "Traditional cross-legged sitting with both feet on the ground",
    imageUrl: "/postures/standard.png",
    instructions: "laptopကို 20 degree စောင်းပါ၊ laptopနှင့် 1 meterအကွာတွင် နေရာယူပါ၊ သက်တောင့်သက်သာနေပါ",
  },
  {
    id: "Chair Posture",
    name: "Chair Posture",
    description: "Sitting on a chair with feet flat on the ground",
    imageUrl: "/postures/chair.png",
    instructions: "laptopကို 20 degree စောင်းပါ၊ laptopနှင့် 1 meterအကွာတွင် နေရာယူပါ၊ သက်တောင့်သက်သာနေပါ",
  },
  {
    id: "Seiza",
    name: "Seiza Posture",
    description: "Kneeling with buttocks on heels",
    imageUrl: "/postures/seiza.png",
    instructions: "laptopကို 20 degree စောင်းပါ၊ laptopနှင့် 1 meterအကွာတွင် နေရာယူပါ၊ သက်တောင့်သက်သာနေပါ",
  },
  {
    id: "Yoga Pose",
    name: "Yoga Pose",
    description: "Lotus or half-lotus position",
    imageUrl: "/postures/yoga.png",
    instructions: "laptopကို 20 degree စောင်းပါ၊ laptopနှင့် 1 meterအကွာတွင် နေရာယူပါ၊ သက်တောင့်သက်သာနေပါ",
  },
];

const dhammaSongs: DhammaSong[] = [
  {
    id: 1,
    title: "Metta Meditation",
    artist: "Buddhist Chants",
    duration: "15:30",
    audioUrl: meditationAudio,
  },
  {
    id: 2,
    title: "Mindfulness Breathing",
    artist: "Meditation Guide",
    duration: "20:15",
    audioUrl: meditationAudio,
  },
  {
    id: 3,
    title: "Loving Kindness",
    artist: "Dhamma Teacher",
    duration: "18:45",
    audioUrl: meditationAudio,
  },
  {
    id: 4,
    title: "Body Scan Meditation",
    artist: "Mindfulness Guide",
    duration: "25:00",
    audioUrl: meditationAudio,
  },
];

// Convert mantras data into the same shape as dhammaSongs / audio lists
const parittaSuttas = mantras.map((m, idx) => ({
  id: idx + 1,
  title: m.title,
  artist: m.artist,
  duration: m.duration,
  audioUrl: m.audio,
}));

// -----------------------------
// Component: Meditation
// -----------------------------
function Meditation() {
  // Timer state
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10 * 60); // 10 minutes default (seconds)

  // Posture / pose detection UI state
  const [showPostureSelection, setShowPostureSelection] = useState(false);
  const [selectedPosture, setSelectedPosture] = useState<string | null>(null);

  // Pose detection runtime state
  const [isPoseDetectionActive, setIsPoseDetectionActive] = useState(false);
  const [poseStatus, setPoseStatus] = useState<'correct' | 'incorrect' | 'detecting' | null>(null);
  const [poseConfidence, setPoseConfidence] = useState<number>(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  // removed unused hold progress state
  const [isPostureHeld, setIsPostureHeld] = useState(false); // Track if posture has been held for 5 seconds
  const [cameraOffAfterHold, setCameraOffAfterHold] = useState(false); // New state to track if camera should be off after hold

  // Raw predictions and per-class probabilities (only keep aggregated posePredictions)
  const [posePredictions, setPosePredictions] = useState<number[]>([0, 0, 0, 0, 0]);

  // Refs for timers, audio, and pose-model objects
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bellRef = useRef<HTMLAudioElement | null>(null);
  const incorrectPostureRef = useRef<HTMLAudioElement | null>(null);
  const alarmPlayingRef = useRef(false); // Track if alarm is currently playing
  const shouldTriggerAlarmRef = useRef(false); // Track if alarm should be triggered

  const webcamRef = useRef<tmPose.Webcam | null>(null);
  const modelRef = useRef<any>(null);
  const maxPredictionsRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const poseLoopRef = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null); // Timer for 5-second hold
  const consecutiveCorrectFrames = useRef(0); // Track consecutive correct frames

  // UI music / category state
  const [category, setCategory] = useState<"tayartaw" | "paritta" | "dhamma">("tayartaw");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredDhammaSongs = dhammaSongs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParittaSuttas = parittaSuttas.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTayartawVideos = tayartawVideos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // This ref mirrors selectedPosture so the animation loop reads a stable value
  const selectedPostureRef = useRef<string | null>(null);

  const { playSong } = useMusicPlayer();

  // Initialize audio elements and event listeners
  useEffect(() => {
    const bellAudio = new Audio(completeMBell);
    bellRef.current = bellAudio;

    const incorrectAudio = new Audio(incorrectPostureAudio);
    incorrectPostureRef.current = incorrectAudio;

    // Handle audio completion event
    const handleAudioEnded = () => {
      alarmPlayingRef.current = false;
      
      // Re-trigger alarm if posture is still incorrect and not held
      if (shouldTriggerAlarmRef.current && !isPostureHeld) {
        incorrectAudio.play();
        alarmPlayingRef.current = true;
      }
    };

    incorrectAudio.addEventListener('ended', handleAudioEnded);

    return () => {
      incorrectAudio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  // -----------------------------
  // Load teachable machine pose model once on mount
  // -----------------------------
  useEffect(() => {
    const initPoseModel = async () => {
      try {
        console.log("Loading pose model...");
        const modelURL = "/pose_model/model.json";
        const metadataURL = "/pose_model/metadata.json";

        console.log("Loading pose model from:", modelURL);
        modelRef.current = await tmPose.load(modelURL, metadataURL);
        maxPredictionsRef.current = modelRef.current.getTotalClasses();
        console.log("Pose model loaded successfully");
        console.log("Model labels:", modelRef.current.getClassLabels());
        console.log("Total classes:", modelRef.current.getTotalClasses());

        setModelLoaded(true);
      } catch (error) {
        console.error("Error loading pose model:", error);
        alert("Failed to load pose model. Please check your model URL and try again.");
      }
    };

    initPoseModel();
  }, []);

  // -----------------------------
  // Timer effect: increments `timer` every second while running
  // Stops when timer reaches timerDuration and triggers end-of-session behavior
  // -----------------------------
  useEffect(() => {
    if (isTimerRunning && timer < timerDuration) {
      timerRef.current = setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    } else if (timer >= timerDuration) {
      // Timer finished: stop everything, play bell, and stop pose detection
      setIsTimerRunning(false);
      setIsPoseDetectionActive(false);
      stopPoseDetection();
      
      // Save meditation session to history
      const sessions = JSON.parse(localStorage.getItem('meditationSessions') || '[]');
      const newSession = {
        date: new Date().toISOString(),
        duration: timerDuration
      };
      sessions.push(newSession);
      localStorage.setItem('meditationSessions', JSON.stringify(sessions));
      
      if (bellRef.current) {
        bellRef.current.play(); 
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerRunning, timer, timerDuration]);

  // Stop alarm when posture is held for 5 seconds
  useEffect(() => {
    if (isPostureHeld && incorrectPostureRef.current) {
      incorrectPostureRef.current.pause();
      incorrectPostureRef.current.currentTime = 0;
      alarmPlayingRef.current = false;
      shouldTriggerAlarmRef.current = false;
    }
  }, [isPostureHeld]);

  // -----------------------------
  // Main pose detection loop
  // - Reads webcam frame, runs estimate + predict, updates UI probabilities
  // - Uses selectedPostureRef (stable ref) to compare prediction to selected posture
  // -----------------------------
  const poseDetectionLoop = async () => {
    if (!webcamRef.current || !canvasRef.current || !ctxRef.current || !modelRef.current) {
      console.log("Missing required refs for pose detection:", {
        webcam: !!webcamRef.current,
        canvas: !!canvasRef.current,
        ctx: !!ctxRef.current,
        model: !!modelRef.current
      });
      return;
    }

    try {
      // Update webcam frame
      webcamRef.current.update();
      
      // Estimate pose and predict first (like simple example)
      const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas, false);
      const prediction = await modelRef.current.predict(posenetOutput, pose);

      // Debug logging for pose detection
      console.log("Pose detection result:", { 
        pose: pose ? "detected" : "null", 
        keypoints: pose?.keypoints ? pose.keypoints.length : "none",
        prediction: prediction?.length || 0
      });

      // Map predictions into a predictable fixed-size array for the UI
      const newPosePredictions = [0, 0, 0, 0, 0];
      prediction.forEach((p: any) => {
        const index = ["Burmese", "Chair Posture", "Seiza", "Yoga Pose", "Error"].indexOf(p.className);
        if (index !== -1) {
          newPosePredictions[index] = p.probability;
        }
      });
      setPosePredictions(newPosePredictions);

      // Find the top prediction
      let maxConfidence = 0;
      let predictedClass = "";
      prediction.forEach((p: any) => {
        if (p.probability > maxConfidence) {
          maxConfidence = p.probability;
          predictedClass = p.className;
        }
      });

      setPoseConfidence(maxConfidence);

      // Use the ref value to avoid stale closure issues in the animation loop
      const currentSelectedPosture = selectedPostureRef.current;

      // Decide poseStatus based on thresholds
      if (
        predictedClass.trim().toLowerCase() === currentSelectedPosture?.trim().toLowerCase() &&
        maxConfidence > 0.7
      ) {
        setPoseStatus("correct");
        
        // Track consecutive correct frames for 5-second hold
        consecutiveCorrectFrames.current++;
        
        // Start hold timer if we have enough consecutive correct frames (5 seconds @ 30fps = 150 frames)
        if (consecutiveCorrectFrames.current >= 60 && !isPostureHeld) {
          setIsPostureHeld(true);
          setIsTimerRunning(true);
          // NEW: Turn off camera after hold is complete
          stopPoseDetection();
          setCameraOffAfterHold(true);
        }
      } else {
        // Reset consecutive count if posture is incorrect
        consecutiveCorrectFrames.current = 0;
        
        if (
          (predictedClass.trim().toLowerCase() !== currentSelectedPosture?.trim().toLowerCase() ||
            predictedClass === "Error") &&
          maxConfidence > 0.5
        ) {
          setPoseStatus("incorrect");
          
          // ALARM LOGIC: Only trigger if not held and not already playing
          if (!isPostureHeld && !alarmPlayingRef.current) {
            shouldTriggerAlarmRef.current = true;
            if (incorrectPostureRef.current) {
              incorrectPostureRef.current.play();
              alarmPlayingRef.current = true;
            }
          }
        } else {
          setPoseStatus("detecting");
          shouldTriggerAlarmRef.current = false;
        }
      }

      // Now draw the frame and overlays (matching simple example structure)
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(webcamRef.current.canvas, 0, 0);

      // Draw keypoints and skeleton on canvas if a pose is detected
      if (pose && pose.keypoints && Array.isArray(pose.keypoints) && pose.keypoints.length > 0) {
        try {
          const minPartConfidence = 0.5;
          
          // Set styles before drawing (to customize colors)
          ctx.strokeStyle = '#00ff00';
          ctx.fillStyle = '#ff0000';
          ctx.lineWidth = 2;
          
          // Draw keypoints and skeleton
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
          
          console.log("Successfully drew keypoints and skeleton");
        } catch (drawError) {
          console.error("Error drawing keypoints/skeleton:", drawError);
        }
      } else {
        console.log("No pose or keypoints to draw:", { 
          pose: !!pose, 
          keypoints: pose?.keypoints ? pose.keypoints.length : "none" 
        });
      }
    } catch (error) {
      console.error("Error in pose detection loop:", error);
    }

    // Schedule next frame
    poseLoopRef.current = requestAnimationFrame(poseDetectionLoop);
  };

  // -----------------------------
  // startPoseDetection(): sets up webcam, canvas, and begins the animation loop
  // -----------------------------
  const startPoseDetection = async () => {
    try {
      if (!modelLoaded) {
        alert("Model is still loading. Please wait a moment and try again.");
        return;
      }

      // sync just in case
      if (!selectedPostureRef.current && selectedPosture) {
        selectedPostureRef.current = selectedPosture;
      }

      // Initialize webcam if missing
      if (!webcamRef.current) {
        try {
          const size = 400;
          const flip = true;
          webcamRef.current = new tmPose.Webcam(size, size, flip);
          await webcamRef.current.setup();
          await webcamRef.current.play();
          console.log("Webcam initialized successfully");
        } catch (webcamError) {
          console.error("Error initializing webcam:", webcamError);
          alert("Failed to access camera. Please check camera permissions and try again.");
          return;
        }
      }

      // Ensure canvas context is setup properly
      if (canvasRef.current && webcamRef.current) {
        canvasRef.current.width = webcamRef.current.width;
        canvasRef.current.height = webcamRef.current.height;
        ctxRef.current = canvasRef.current.getContext("2d", { willReadFrequently: true });
        
        // Configure canvas context for better drawing
        if (ctxRef.current) {
          console.log("Canvas context configured for drawing");
        }
      }

      setIsPoseDetectionActive(true);
      consecutiveCorrectFrames.current = 0; // Reset consecutive frames counter
      setCameraOffAfterHold(false); // Reset camera off state
      poseDetectionLoop();
    } catch (error) {
      console.error("Error starting pose detection:", error);
      alert("Failed to start camera. Please check camera permissions and try again.");
    }
  };

  // -----------------------------
  // stopPoseDetection(): stop animation and webcam
  // -----------------------------
  const stopPoseDetection = () => {
    if (poseLoopRef.current) {
      cancelAnimationFrame(poseLoopRef.current);
      poseLoopRef.current = null;
    }
    if (webcamRef.current) {
      webcamRef.current.stop();
      webcamRef.current = null;
    }

    setIsPoseDetectionActive(false);
    setPoseStatus(null);
    setPosePredictions([0, 0, 0, 0, 0]);
  };

  // -----------------------------
  // Timer control helpers
  // -----------------------------
  const startTimer = () => {
    if (!modelLoaded) {
      alert("Pose model is still loading. Please wait a moment and try again.");
      return;
    }
    setShowPostureSelection(true);
  };

  const selectPosture = (postureId: string) => {
    setSelectedPosture(postureId);
    // Keep ref in sync immediately to avoid races with the pose loop
    selectedPostureRef.current = postureId;
    setShowPostureSelection(false);
    setIsPostureHeld(false); // Reset hold state
    startPoseDetection(); // Start detection immediately
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    setIsPoseDetectionActive(false);

    // Stop the detection loop but keep webcam available
    if (poseLoopRef.current) {
      cancelAnimationFrame(poseLoopRef.current);
      poseLoopRef.current = null;
    }
    
    // Stop any active alarms
    if (incorrectPostureRef.current) {
      incorrectPostureRef.current.pause();
      incorrectPostureRef.current.currentTime = 0;
      alarmPlayingRef.current = false;
      shouldTriggerAlarmRef.current = false;
    }
  };

  // Resume from a paused state
  const resumeTimer = () => {
    if (!modelLoaded || !selectedPosture) {
      alert("Please select a posture first");
      return;
    }

    setIsTimerRunning(true);

    // Restart pose detection only if camera is not off after hold
    if (!isPoseDetectionActive && !cameraOffAfterHold) {
      startPoseDetection();
    }
  };

  // Reset everything back to initial state
  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsPoseDetectionActive(false);
    setIsPostureHeld(false); // Reset hold state
    setCameraOffAfterHold(false); // Reset camera state
    setShowPostureSelection(false); // Reset posture selection state
    stopPoseDetection();
    setTimer(0);
    setSelectedPosture(null);
    selectedPostureRef.current = null;
    setPoseStatus(null);
    setPosePredictions([0, 0, 0, 0, 0]);
    consecutiveCorrectFrames.current = 0;
    
    // Clear hold timer if exists
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    
    // Stop any active alarms
    if (incorrectPostureRef.current) {
      incorrectPostureRef.current.pause();
      incorrectPostureRef.current.currentTime = 0;
      alarmPlayingRef.current = false;
      shouldTriggerAlarmRef.current = false;
    }
  };

  // -----------------------------
  // Formatting helpers
  // -----------------------------
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTimerDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  // Keep the ref and state for selected posture in sync so the loop reads the latest
  useEffect(() => {
    selectedPostureRef.current = selectedPosture;
  }, [selectedPosture]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPoseDetection();
      // Clear hold timer if exists
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
      }
      
      // Stop any active alarms
      if (incorrectPostureRef.current) {
        incorrectPostureRef.current.pause();
        incorrectPostureRef.current.currentTime = 0;
      }
    };
  }, []);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="min-h-screen bg-[#FDE9DA]">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">တရားထိုင်ခြင်း နှင့် ပုံစံစစ်ဆေးခြင်း</h1>
        <div className="flex justify-end mb-8">
          <MeditationHistory />
        </div>

        {/* Model Loading Status */}
        {!modelLoaded && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
              <span>ပုံစံစစ်ဆေးမှု မော်ဒယ် ဖွင့်နေသည်...</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">တရားထိုင်မည်</h2>

            {!showPostureSelection && !isTimerRunning && (
              <>
                <div className="text-center mb-8">
                  <div className="text-6xl font-mono text-[#493016] mb-4">{formatTime(timer)}</div>
                  <div className="text-gray-600 mb-4">တရားထိုင်ချိန်: {formatTimerDuration(timerDuration)}</div>

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
                    disabled={!modelLoaded}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                      modelLoaded ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Camera size={20} />
                    <span>{modelLoaded ? "တရားထိုင်စတင်မည်" : "ဖွင့်နေသည်..."}</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    ပြန်စတင်မည်
                  </button>
                </div>
              </>
            )}

            {/* Posture Selection */}
            {showPostureSelection && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">တရားထိုင်မည့်ပုံစံ ရွေးချယ်ပါ</h3>
                <p className="text-gray-600 mb-6">သင့်အနေအထားနှင့် ကိုက်ညီသော ပုံစံကို ရွေးချယ်ပါ။ ရွေးချယ်ပြီးနောက် ကင်မရာက သင့်ပုံစံကို စစ်ဆေးပေးမည်။</p>
                <div className="grid grid-cols-2 gap-4">
                  {postureOptions.map((posture) => (
                    <div
                      key={posture.id}
                      onClick={() => selectPosture(posture.id)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-105"
                    >
                      <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={posture.imageUrl}
                          alt={posture.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <span className="text-2xl hidden">🧘</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-1">{posture.name}</h4>
                      <p className="text-sm text-gray-600">{posture.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Active Meditation with Pose Detection */}
            {selectedPosture && !isPostureHeld && (
              <div className="text-center">
                {/* Instructions - Always visible during pose detection */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                  <div className="text-3xl font-medium text-blue-700 mb-4 text-center">
                    <h3>{postureOptions.find((p) => p.id === selectedPosture)?.name} အတွက် ညွှန်ကြားချက်များ</h3>
                  </div>
                  <ul className="text-black-600 text-xl leading-relaxed text-left space-y-3">
                    <li>• laptopကို 20 degree စောင်းပါ</li>
                    <li>• laptopနှင့် 1 meterအကွာတွင် နေရာယူပါ</li>
                    <li>• သက်တောင့်သက်သာနေပါ</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Active Meditation after hold is complete */}
            {isTimerRunning && selectedPosture && isPostureHeld && (
              <div className="text-center">
                {/* Status Header */}
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-800 mb-2">🧘 တရားထိုင်ခြင်း လုပ်ဆောင်နေသည်</h3>
                  <p className="text-purple-700">ရွေးချယ်ထားသောပုံစံ: <span className="font-semibold">{postureOptions.find((p) => p.id === selectedPosture)?.name}</span></p>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-semibold text-gray-800 mb-2">{postureOptions.find((p) => p.id === selectedPosture)?.name}</div>
                  <div className="text-6xl font-mono text-[#493016] mb-4">{formatTime(timer)}</div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(timer / timerDuration) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Camera Off Confirmation Message */}
                <div className="mb-6 p-4 bg-green-100 border border-green-500 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-600 text-2xl">✅</span>
                    <span className="font-bold text-lg text-green-700">
                      ပုံစံမှန်ကြောင်း အတည်ပြုပြီးပါပြီ။ လုံခြုံရေးအတွက် ကင်မရာကို ပိတ်ထားပါသည်။
                    </span>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    onClick={pauseTimer}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
              </div>
            )}

            {/* Add resume button when paused */}
            {!isTimerRunning && timer > 0 && selectedPosture && isPostureHeld && (
              <div className="text-center mt-6">
                <button
                  onClick={resumeTimer}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  ဆက်လက်ထိုင်မည်
                </button>
              </div>
            )}

            {/* Timer Duration Selection */}
            {!showPostureSelection && !isTimerRunning && !selectedPosture && (
              <div className="text-center">
                <label className="block text-gray-700 font-medium mb-2">တရားထိုင်ချိန် သတ်မှတ်ပါ :</label>
                <div className="flex justify-center space-x-2">
                  {[5, 10, 15, 20, 30].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => {
                        setTimerDuration(minutes * 60);
                        resetTimer();
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        timerDuration === minutes * 60 ? 'bg-[#4f3016] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {minutes} မိနစ်
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Music Player Section / Camera View */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 ${selectedPosture && !isPostureHeld ? 'h-[42rem] overflow-hidden' : 'h-[32rem] overflow-y-auto'}`}>
            {/* Show camera view during pose detection */}
            {selectedPosture && !isPostureHeld && (
              <div className="text-center">
                {/* Status Header */}
                <div className="mb-4">

                  {/* Hold Progress */}
                  <div className="w-full bg-gray-300 rounded-full h-3 mb-1">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(consecutiveCorrectFrames.current / 60) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600 mb-3">
                    5 စက္ကန့် ထိန်းထားရန်
                  </p>
                </div>
                {/* Live Pose Detection Canvas */}
                <div className="relative inline-block mb-6">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className={`rounded-lg border-4 bg-gray-100 ${
                      poseStatus === "correct"
                        ? "border-green-500 shadow-lg shadow-green-200"
                        : poseStatus === "incorrect"
                        ? "border-red-500 shadow-lg shadow-red-200"
                        : "border-blue-500 shadow-lg shadow-blue-200"
                    }`}
                    style={{
                      minWidth: "400px",
                      minHeight: "400px",
                      borderWidth: "6px",
                      transition: "all 0.3s ease",
                      boxShadow:
                        poseStatus === "correct"
                          ? "0 0 20px rgba(34, 197, 94, 0.3)"
                          : poseStatus === "incorrect"
                          ? "0 0 20px rgba(239, 68, 68, 0.3)"
                          : "0 0 20px rgba(59, 130, 246, 0.3)",
                    }}
                  />
                  {isPoseDetectionActive && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">Camera Active</div>
                  )}
                  {/* Pose detection status overlay */}
                  {isPoseDetectionActive && (
                    <div
                      className={`absolute bottom-2 left-2 px-3 py-1 rounded text-sm font-small ${
                        poseStatus === "correct" ? "bg-green-600 text-white" : poseStatus === "incorrect" ? "bg-red-300 text-white" : "bg-blue-300 text-white"
                      }`}
                    >
                      {poseStatus === "correct" && "✅ ပုံစံမှန်"}
                      {poseStatus === "incorrect" && "❌ ပုံစံမှား"} 
                      {poseStatus === "detecting" && "🔍 စစ်ဆေးနေသည်..."}
                      {!poseStatus && "📷 ကင်မရာ အဆင်သင့်"}
                    </div>
                  )}
                </div>

                {/* Real-time Prediction Labels */}
                {isPoseDetectionActive && (
                  <div className="mb-1 p-1 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">ပုံစံစစ်ဆေးမှုရလဒ်များ</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {['Burmese', 'Chair Posture', 'Seiza', 'Yoga Pose', 'Error'].map((className, index) => (
                        <div
                          key={className}
                          className={`text-center p-2 rounded border-2 ${
                            className === selectedPosture ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-600">{className}</div>
                          <div className={`text-lg font-bold ${className === selectedPosture ? 'text-green-700' : 'text-[#493016]'}`}>
                            {posePredictions[index] ? `${(posePredictions[index] * 100).toFixed(1)}%` : '0.0%'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Show Dhamma content when not in pose detection */}
            {!(selectedPosture && !isPostureHeld) && (
              <>
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

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="ဓမ္မသီချင်းများ၊ တရားတော်များ၊ ဂါတာတော်များ ရှာဖွေရန်..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#4f3016] focus:border-[#4f3016] sm:text-sm"
                />
              </div>
            </div>

            {/* Category Content */}
            {category === 'dhamma' && (
              <>
                <div className="space-y-3">
                  {filteredDhammaSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        const originalIndex = dhammaSongs.findIndex(s => s.id === song.id);
                        playSong(song, dhammaSongs, originalIndex);
                      }}
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
                {filteredDhammaSongs.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-gray-500">
                    <p>ရှာဖွေမှုနှင့် ကိုက်ညီသော ဓမ္မသီချင်းများ မတွေ့ရှိပါ။</p>
                  </div>
                )}
              </>
            )}

            {category === 'tayartaw' && (
              <div className="space-y-3">
                {filteredTayartawVideos.map((video) => (
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
                {filteredTayartawVideos.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-gray-500">
                    <p>ရှာဖွေမှုနှင့် ကိုက်ညီသော တရားတော်များ မတွေ့ရှိပါ။</p>
                  </div>
                )}
              </div>
            )}

            {category === 'paritta' && (
              <div className="space-y-3">
                {filteredParittaSuttas.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => {
                      const originalIndex = parittaSuttas.findIndex(s => s.id === song.id);
                      playSong(song, parittaSuttas, originalIndex);
                    }}
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
                {filteredParittaSuttas.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-gray-500">
                    <p>ရှာဖွေမှုနှင့် ကိုက်ညီသော ဂါတာတော်များ မတွေ့ရှိပါ။</p>
                  </div>
                )}
              </div>
            )}
              </>
            )}
          </div>
        </div>

        {/* Meditation Tips */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">တရားထိုင်ခြင်း အကြံပြုချက်များ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">သက်တောင့်သက်သာရှိပါ</h3>
              <p className="text-gray-600 text-sm">ကျောရိုးဖြောင့်ပြီး ပုခုံးများလျော့ပြီး သက်တောင့်သက်သာရှိသော အနေအထားဖြင့် ထိုင်ပါ။</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🫁</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">အသက်ရှူခြင်းကို အာရုံစိုက်ပါ</h3>
              <p className="text-gray-600 text-sm">သဘာဝအသက်ရှူခြင်းကို ပြောင်းလဲရန် မကြိုးစားဘဲ အာရုံစိုက်ပါ။</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💭</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">အတွေးများကို လွှတ်ထားပါ</h3>
              <p className="text-gray-600 text-sm">အတွေးများပေါ်လာသောအခါ ၎င်းတို့ကို အသိအမှတ်ပြုပြီး သင့်အသက်ရှူခြင်းဆီသို့ ပြန်သွားပါ။</p>
            </div>
          </div>
        </div>
      </div>



      {/* Hidden audio element for bell sound and posture alerts */}
      <audio ref={audioRef} src={bell} />
      <Footer />
    </div>
  );
}

export default Meditation;