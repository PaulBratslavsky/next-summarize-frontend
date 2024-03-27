"use client"
import ReactPlayer from "react-player/youtube";

function generateYouTubeUrl(videoId: string) {
  const baseUrl = new URL("https://www.youtube.com/watch");
  baseUrl.searchParams.append("v", videoId);
  console.log(baseUrl.href);
  return baseUrl.href;
}

interface YouTubePlayerProps {
  videoId: string | null;
}

export default function YouTubePlayer({ videoId } : Readonly<YouTubePlayerProps>) {
  if (!videoId) return null;
  const videoUrl = generateYouTubeUrl(videoId)

  console.log(videoUrl);cd .

  return (
    <div className="player-wrapper">
    <ReactPlayer
      url={videoUrl}
      width="100%"
      height="100%"
      controls
      className="react-player"         
    />
  </div>
  );
};

