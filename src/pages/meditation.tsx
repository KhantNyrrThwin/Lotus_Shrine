import { useState, useEffect, useRef } from "react";
import * as tmPose from "@teachablemachine/pose";

function Meditation() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const modelRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const labelContainerRef = useRef(null);
  const animationRef = useRef(null);
  const maxPredictionsRef = useRef(0);

  // Load model on mount
  useEffect(() => {
    const initPoseModel = async () => {
      try {
        const modelURL = "/pose_model/model.json";
        const metadataURL = "/pose_model/metadata.json";
        modelRef.current = await tmPose.load(modelURL, metadataURL);
        maxPredictionsRef.current = modelRef.current.getTotalClasses();
        setModelLoaded(true);
      } catch (error) {
        console.error("Error loading pose model:", error);
        alert("Failed to load pose model. Please check your model files.");
      }
    };
    initPoseModel();
  }, []);

  // Initialize webcam and start loop
  const init = async () => {
    if (!modelRef.current) return;

    try {
      const size = 200; // Match HTML for efficiency
      const flip = true;
      webcamRef.current = new tmPose.Webcam(size, size, flip);
      await webcamRef.current.setup();
      await webcamRef.current.play();

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = size;
        canvas.height = size;
        ctxRef.current = canvas.getContext("2d");
      }

      const labelContainer = labelContainerRef.current;
      if (labelContainer) {
        labelContainer.innerHTML = "";
        for (let i = 0; i < maxPredictionsRef.current; i++) {
          const div = document.createElement("div");
          div.style.fontSize = "14px";
          div.style.margin = "5px 0";
          div.style.fontFamily = "monospace";
          labelContainer.appendChild(div);
        }
      }

      setIsInitialized(true);
      window.requestAnimationFrame(loop); // Start loop like HTML
    } catch (error) {
      console.error("Error initializing webcam:", error);
      alert("Failed to initialize webcam. Check permissions.");
    }
  };

  // Main loop (matches HTML structure)
  const loop = async () => {
    if (webcamRef.current && modelRef.current) {
      webcamRef.current.update(); // Update frame
      await predict(); // Predict and draw
    }
    animationRef.current = window.requestAnimationFrame(loop);
  };

  // Prediction (calls drawPose like HTML)
  const predict = async () => {
    if (!webcamRef.current || !modelRef.current) return;

    try {
      // Estimate pose with flipHorizontal=true to match mirrored webcam
      const { pose, posenetOutput } = await modelRef.current.estimatePose(
        webcamRef.current.canvas,
        true
      );

      // Classify
      const prediction = await modelRef.current.predict(posenetOutput);

      // Update labels
      const labelContainer = labelContainerRef.current;
      if (labelContainer) {
        for (let i = 0; i < maxPredictionsRef.current; i++) {
          const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
          labelContainer.childNodes[i].innerHTML = classPrediction;
        }
      }

      // Draw (post-estimate, like HTML)
      drawPose(pose);
    } catch (error) {
      console.error("Error in prediction:", error);
    }
  };

  // Draw function (exact match to HTML)
  const drawPose = (pose) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !webcamRef.current?.canvas) return;

    // Draw fresh frame first
    ctx.drawImage(webcamRef.current.canvas, 0, 0);

    // Overlay keypoints and skeleton if pose detected
    if (pose) {
      const minPartConfidence = 0.5; // Match HTML
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (webcamRef.current) {
        webcamRef.current.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>Teachable Machine Pose Model</h1>
      <button
        type="button"
        onClick={init}
        disabled={isInitialized || !modelLoaded}
      >
        {isInitialized ? "Running..." : modelLoaded ? "Start" : "Loading..."}
      </button>
      <div>
        <canvas
          ref={canvasRef}
          style={{
            width: "200px",
            height: "200px",
            display: "block",
            margin: "10px 0",
          }}
        />
      </div>
      <div ref={labelContainerRef} />
    </div>
  );
}

export default Meditation;