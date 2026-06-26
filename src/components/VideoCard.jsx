"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PROFILE } from "@/lib/data";

/**
 * Custom-controlled hero intro video.
 * Replace the default by uploading a new video in the admin panel,
 * or swap /public/intro-video.mp4 directly.
 */
export default function VideoCard({ src = "/intro-video.mp4", poster }) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Hover parallax tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  const handleMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => { mx.set(0); my.set(0); };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, x: 60, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="animated-border relative aspect-video w-full overflow-hidden rounded-[32px] border border-white/10 bg-card shadow-glow-lg"
    >
      {/* Replace this with my real intro video (also editable from /admin) */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Intro video of Danussh Aditya K, UI/UX Designer"
        onClick={togglePlay}
      />

      {/* subtle dark gradient for label legibility (kept off the center/face) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />

      {/* Top-left badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-red/40 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red" />
        Video Intro
      </div>

      {/* Controls (top-right) */}
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:border-red hover:bg-red/30"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:border-red hover:bg-red/30"
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </button>
      </div>

      {/* Bottom-left name label */}
      <div className="absolute bottom-5 left-4 text-sm font-medium text-white drop-shadow">
        {PROFILE.name} <span className="text-red">•</span> {PROFILE.role}
      </div>

      {/* Progress bar */}
      <button
        type="button"
        onClick={seek}
        aria-label="Seek video"
        className="group absolute inset-x-0 bottom-0 h-3 cursor-pointer"
      >
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
          <div
            className="h-full bg-red transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </button>
    </motion.div>
  );
}

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);
const SoundIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
  </svg>
);
const MutedIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 10v4h4l5 5V5L7 10H3zm18.3-1.3l-1.4-1.4L17 10.2 14.1 7.3 12.7 8.7 15.6 11.6l-2.9 2.9 1.4 1.4L17 13l2.9 2.9 1.4-1.4L18.4 11.6z" />
  </svg>
);
