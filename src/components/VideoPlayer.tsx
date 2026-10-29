'use client';
import { useRef, useEffect } from 'react';

export default function VideoPlayer({ vdoSrc, isPlaying }: { vdoSrc: string, isPlaying: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <video className="w-full rounded-lg" src={vdoSrc} ref={videoRef} controls loop muted />
  );
}
