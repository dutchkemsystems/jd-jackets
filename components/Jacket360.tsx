"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Jacket360Props {
  frames: string[];
  alt: string;
  sensitivity?: number;
}

export default function Jacket360({
  frames,
  alt,
  sensitivity = 1,
}: Jacket360Props) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const loadedCount = useRef(0);
  const totalFrames = frames.length;

  // Preload all frames
  useEffect(() => {
    if (frames.length < 2) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    loadedCount.current = 0;

    frames.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (!cancelled) {
          loadedCount.current += 1;
          if (loadedCount.current >= totalFrames) {
            setIsLoading(false);
          }
        }
      };
      img.onerror = () => {
        if (!cancelled) {
          loadedCount.current += 1;
          if (loadedCount.current >= totalFrames) {
            setIsLoading(false);
          }
        }
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [frames, totalFrames]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isLoading || frames.length < 2) return;
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartFrame.current = currentFrame;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [isLoading, frames.length, currentFrame]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || frames.length < 2) return;
      const deltaX = e.clientX - dragStartX.current;
      const frameDelta = Math.round(
        (deltaX / (containerRef.current?.clientWidth ?? 300)) *
          frames.length *
          sensitivity
      );
      const newFrame =
        (dragStartFrame.current + frameDelta + frames.length) % frames.length;
      setCurrentFrame(newFrame);
    },
    [isDragging, frames.length, sensitivity]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (frames.length < 2) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentFrame((prev) => (prev - 1 + frames.length) % frames.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentFrame((prev) => (prev + 1) % frames.length);
      }
    },
    [frames.length]
  );

  // Fallback: static image if < 2 frames or no Pointer Events
  const hasPointerEvents =
    typeof window !== "undefined" && "PointerEvent" in window;

  if (frames.length < 2 || !hasPointerEvents) {
    return (
      <div className="relative aspect-square w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frames[0]}
          alt={alt}
          className="h-full w-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-jd-dark border-t-jd-orange" />
            <span className="text-sm text-jd-mid">
              Loading 360° view… ({loadedCount.current}/{totalFrames})
            </span>
          </div>
        </div>
      )}

      {/* Frames */}
      {!isLoading &&
        frames.map((frame, index) => (
          <div
            key={frame}
            className={cn(
              "absolute inset-0 transition-opacity duration-75",
              index === currentFrame ? "opacity-100" : "opacity-0"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frame}
              alt={index === currentFrame ? alt : ""}
              className="h-full w-full object-contain"
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

      {/* Drag hint */}
      {!isLoading && !isDragging && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-jd-black/70 px-3 py-1 text-xs text-jd-mid">
          Drag to rotate
        </div>
      )}

      {/* Screen reader accessible rotation control */}
      <div
        className="absolute inset-0"
        role="img"
        aria-label={`${alt} — 360 degree rotatable view. Use left and right arrow keys to rotate.`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
