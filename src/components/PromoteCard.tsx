'use client';
import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { useWindowListener } from '../hooks/useWindowListener';

export default function PromoteCard() {
  const [isPlaying, setIsPlaying] = useState(true);

  useWindowListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return (
    <div className="w-[80%] shadow-lg mx-auto p-2 rounded-lg bg-white flex flex-row mt-5">
      <VideoPlayer vdoSrc="/vdo/venue.mp4" isPlaying={isPlaying} />
      <div className="m-5 flex justify-between items-center w-full">
        <h2 className="text-xl font-bold">Book your venue today.</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
