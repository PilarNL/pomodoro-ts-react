import { useEffect, useRef } from 'react';

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [src]);

  const play = () => {
    audioRef.current?.play().catch(() => {
      // opcional: lidar com interação necessária (autoplay bloqueado)
    });
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const setVolume = (value: number) => {
    if (audioRef.current)
      audioRef.current.volume = Math.max(0, Math.min(1, value));
  };

  return { play, pause, stop, setVolume };
}
