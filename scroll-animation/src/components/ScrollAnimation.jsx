import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 2140;

// Maximum simultaneous image downloads to prevent network congestion
const MAX_CONCURRENT_LOADS = 5;

// Buffer radius around the current scroll target
const PRELOAD_AHEAD = 35;
const PRELOAD_BEHIND = 10;
const SCAFFOLD_STEP = 30; // Preload keyframes across the timeline in the background

// Smooth interpolation rate (0.12 gives smooth, cinema-like inertia without frame skipping)
const LERP_FACTOR = 0.12;

// The video was cropped before frame extraction, leaving 116px black bars on left and right (116 / 1920 ≈ 6.04%)
const CROP_LEFT_RATIO = 116 / 1920;
const CROP_RIGHT_RATIO = 116 / 1920;
const CROP_TOP_RATIO = 0;
const CROP_BOTTOM_RATIO = 0;

// Using optimized WebP frames (95% smaller file size, instant streaming)
const FRAME_EXTENSION = "webp";

function getFramePath(index) {
  return `/frames/${String(index + 1).padStart(8, "0")}.${FRAME_EXTENSION}`;
}

export default function ScrollAnimation() {
  const canvasRef = useRef(null);

  const imagesRef = useRef(new Map());
  const loadingRef = useRef(new Set());
  const queueRef = useRef([]);
  const queuedSetRef = useRef(new Set());
  const activeLoadsRef = useRef(0);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollDirectionRef = useRef(1); // 1 = down, -1 = up
  const lastScrollYRef = useRef(0);

  const lastDrawnFrameRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imagesMap = imagesRef.current;
    const loadingSet = loadingRef.current;
    const queuedSet = queuedSetRef.current;

    const ctx = canvas.getContext("2d", {
      alpha: false,
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = null;

    // ==========================================
    // RESIZE CANVAS
    // ==========================================
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      lastDrawnFrameRef.current = -1;
      const target = Math.round(currentFrameRef.current);
      const frameToDraw = findNearestLoadedFrame(target);
      if (frameToDraw !== -1) {
        drawFrame(frameToDraw);
      }
    }

    // ==========================================
    // DRAW FRAME — FILL & COVER SCREEN
    // ==========================================
    function drawFrame(frameIndex) {
      const image = imagesRef.current.get(frameIndex);

      if (!image || !image.complete || image.naturalWidth === 0) {
        return;
      }

      if (lastDrawnFrameRef.current === frameIndex) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const naturalW = image.naturalWidth;
      const naturalH = image.naturalHeight;

      // 1. Exclude the black side bars
      const cropLeft = naturalW * CROP_LEFT_RATIO;
      const cropRight = naturalW * CROP_RIGHT_RATIO;
      const cropTop = naturalH * CROP_TOP_RATIO;
      const cropBottom = naturalH * CROP_BOTTOM_RATIO;

      const activeSrcWidth = naturalW - cropLeft - cropRight;
      const activeSrcHeight = naturalH - cropTop - cropBottom;

      // 2. Compute object-fit: cover coordinates so screen is 100% filled
      const canvasAspect = width / height;
      const contentAspect = activeSrcWidth / activeSrcHeight;

      let sx, sy, sw, sh;

      if (canvasAspect > contentAspect) {
        // Viewport is wider than content: fit width, crop top/bottom
        sw = activeSrcWidth;
        sh = activeSrcWidth / canvasAspect;
        sx = cropLeft;
        sy = cropTop + (activeSrcHeight - sh) / 2;
      } else {
        // Viewport is taller than content: fit height, crop left/right
        sh = activeSrcHeight;
        sw = activeSrcHeight * canvasAspect;
        sx = cropLeft + (activeSrcWidth - sw) / 2;
        sy = cropTop;
      }

      ctx.drawImage(
        image,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        width,
        height
      );

      lastDrawnFrameRef.current = frameIndex;
    }

    // ==========================================
    // FIND NEAREST LOADED FRAME
    // ==========================================
    function findNearestLoadedFrame(target) {
      if (imagesRef.current.has(target)) return target;

      // Search locally within ±60 frames
      for (let offset = 1; offset <= 60; offset++) {
        // Check backwards first to preserve directional continuity
        const prev = target - offset;
        if (prev >= 0 && imagesRef.current.has(prev)) return prev;

        const next = target + offset;
        if (next < TOTAL_FRAMES && imagesRef.current.has(next)) return next;
      }

      // If no close frame, fallback to last drawn frame if valid
      if (lastDrawnFrameRef.current !== -1 && imagesRef.current.has(lastDrawnFrameRef.current)) {
        return lastDrawnFrameRef.current;
      }

      // Fallback to initial frame
      if (imagesRef.current.has(0)) return 0;

      return -1;
    }

    // ==========================================
    // CONCURRENCY-LIMITED PRIORITY LOADER
    // ==========================================
    function drainQueue() {
      if (queueRef.current.length === 0) return;

      const target = targetFrameRef.current;
      const dir = scrollDirectionRef.current;

      // Filter out frames that are too far from target (> 80 frames away, unless keyframe)
      const filtered = [];
      for (let i = 0; i < queueRef.current.length; i++) {
        const idx = queueRef.current[i];
        if (Math.abs(idx - target) <= 80 || idx % SCAFFOLD_STEP === 0) {
          filtered.push(idx);
        } else {
          queuedSetRef.current.delete(idx);
        }
      }
      queueRef.current = filtered;

      // Sort remaining queue: closest to target first, with forward bias in scroll direction
      queueRef.current.sort((a, b) => {
        const distA = Math.abs(a - target) - (dir > 0 && a >= target ? 12 : 0);
        const distB = Math.abs(b - target) - (dir > 0 && b >= target ? 12 : 0);
        return distA - distB;
      });

      while (activeLoadsRef.current < MAX_CONCURRENT_LOADS && queueRef.current.length > 0) {
        const nextIdx = queueRef.current.shift();
        queuedSetRef.current.delete(nextIdx);
        executeLoad(nextIdx);
      }
    }

    function enqueueFrame(index) {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (imagesRef.current.has(index)) return;
      if (loadingRef.current.has(index)) return;
      if (queuedSetRef.current.has(index)) return;

      queuedSetRef.current.add(index);
      queueRef.current.push(index);
      drainQueue();
    }

    function executeLoad(index) {
      if (imagesRef.current.has(index) || loadingRef.current.has(index)) {
        drainQueue();
        return;
      }

      loadingRef.current.add(index);
      activeLoadsRef.current++;

      const image = new Image();
      image.decoding = "async";

      image.onload = () => {
        loadingRef.current.delete(index);
        activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);
        imagesRef.current.set(index, image);

        // If stationary or nearly caught up, redraw to sharpen
        const currentRounded = Math.round(currentFrameRef.current);
        if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.5) {
          if (
            index === currentRounded ||
            Math.abs(index - currentRounded) < Math.abs(lastDrawnFrameRef.current - currentRounded)
          ) {
            drawFrame(index);
          }
        }

        drainQueue();
      };

      image.onerror = () => {
        loadingRef.current.delete(index);
        activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);
        drainQueue();
      };

      image.src = getFramePath(index);
    }

    // ==========================================
    // PRELOAD BUFFER
    // ==========================================
    function preloadAround(targetIndex) {
      enqueueFrame(targetIndex);

      const isDown = scrollDirectionRef.current >= 0;
      const aheadCount = isDown ? PRELOAD_AHEAD : PRELOAD_BEHIND;
      const behindCount = isDown ? PRELOAD_BEHIND : PRELOAD_AHEAD;

      for (let i = 1; i <= aheadCount; i++) {
        enqueueFrame(isDown ? targetIndex + i : targetIndex - i);
      }

      for (let i = 1; i <= behindCount; i++) {
        enqueueFrame(isDown ? targetIndex - i : targetIndex + i);
      }
    }

    // ==========================================
    // SCROLL → FRAME
    // ==========================================
    function handleScroll() {
      const scrollTop = window.scrollY;
      scrollDirectionRef.current = scrollTop >= lastScrollYRef.current ? 1 : -1;
      lastScrollYRef.current = scrollTop;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        targetFrameRef.current = 0;
        return;
      }

      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      const frame = Math.round(progress * (TOTAL_FRAMES - 1));

      targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, frame));

      preloadAround(targetFrameRef.current);
    }

    // ==========================================
    // SMOOTH FRAME ANIMATION
    // ==========================================
    function animate() {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const difference = target - current;

      if (Math.abs(difference) > 0.05) {
        currentFrameRef.current = current + difference * LERP_FACTOR;
      } else {
        currentFrameRef.current = target;
      }

      const frameTarget = Math.round(currentFrameRef.current);
      const frameToDraw = findNearestLoadedFrame(frameTarget);

      if (frameToDraw !== -1) {
        drawFrame(frameToDraw);
      }

      rafId = requestAnimationFrame(animate);
    }

    // ==========================================
    // EVENTS
    // ==========================================
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    // ==========================================
    // INITIALIZE
    // ==========================================
    resizeCanvas();

    // Priority 1: Load frame 0 immediately so screen shows content
    enqueueFrame(0);

    // Initial 20 frames buffer
    for (let i = 1; i <= 20; i++) {
      enqueueFrame(i);
    }

    // Priority 2: Preload keyframe scaffold across timeline in idle time
    function preloadScaffold() {
      for (let i = 0; i < TOTAL_FRAMES; i += SCAFFOLD_STEP) {
        enqueueFrame(i);
      }
    }

    let idleHandle = null;
    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(preloadScaffold, { timeout: 2000 });
    } else {
      idleHandle = setTimeout(preloadScaffold, 800);
    }

    handleScroll();
    rafId = requestAnimationFrame(animate);

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);

      if (rafId) cancelAnimationFrame(rafId);
      if (idleHandle) {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleHandle);
        } else {
          clearTimeout(idleHandle);
        }
      }

      imagesMap.clear();
      loadingSet.clear();
      queueRef.current = [];
      queuedSet.clear();
      activeLoadsRef.current = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="scroll-background"
    />
  );
}