import { useState, useRef, useEffect } from "react";

export default function VirtualPagoda() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !imgRef.current) return;
      const cWidth = containerRef.current.clientWidth;
      const iWidth = imgRef.current.naturalWidth;
      setContainerWidth(cWidth);
      setImageWidth(iWidth);

      // For 180-degree, center at half range
      const initial = (cWidth - iWidth) / 2;
      setTranslateX(initial);
      currentTranslate.current = initial;
    };

    window.addEventListener("resize", update);
    if (imgRef.current) {
      imgRef.current.onload = update;
    }

    return () => window.removeEventListener("resize", update);
  }, []);

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;
    const dx = clientX - startX.current;
    let next = currentTranslate.current + dx;

    // Allow dragging only within half the image (180-degree)
    const min = containerWidth - imageWidth;
    const max = 0;
    next = clamp(next, min, max);

    setTranslateX(next);
  };

  const handleEnd = () => {
    isDragging.current = false;
    currentTranslate.current = translateX;
  };

  return (
    <div className="p-6 mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Virtual Pagoda</h1>

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg border-2 border-gray-300"
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "400px",
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <img
          ref={imgRef}
          src="/test2.jpg"
          alt="Pagoda"
          draggable={false}
          className="absolute top-0 left-0 h-full select-none pointer-events-none"
          style={{
            width: "auto",
            height: "100%",
            transform: `translateX(${translateX}px)`,
          }}
        />
      </div>
    </div>
  );
}
