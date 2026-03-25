"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoFacadeProps = {
  videoId: string;
  title?: string;
  className?: string;
};

export function VideoFacade({
  videoId,
  title,
  className,
}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className={className}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full rounded-xl"
          title={title || "Vidéo"}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`relative group cursor-pointer overflow-hidden rounded-xl ${className || ""}`}
      aria-label={title ? `Lire la vidéo : ${title}` : "Lire la vidéo"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={title || "Aperçu vidéo"}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-background ml-0.5" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}
