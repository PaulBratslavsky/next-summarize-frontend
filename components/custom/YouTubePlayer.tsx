"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import { parseStartTime, parseEndTime } from "@/lib/utils";


const playing = false;
const muted = false;
const controls = true;
const playsinline = false;
const rel = false;


declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

let apiLoaded = false;
const playerInitializers = new Map();

const YouTubePlayer = ({
  id,
  playerKey,
  className,
  height,
}: {
  id: string;
  playerKey: string;
  className?: string;
  height?: string;
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const url = `https://www.youtube.com/watch?v=${id}`

  const initializeYouTubePlayer = useCallback(() => {
    if (!id || !playerRef.current) return;
    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      width: "100%",
      height:  height || "450px", // Replace with your height
      videoId: id,
      playerVars: {
        autoplay: playing ? 1 : 0,
        mute: muted ? 1 : 0,
        controls: controls ? 1 : 0,
        start: parseStartTime(url),
        end: parseEndTime(url),
        playsinline: playsinline ? 1 : 0,
        iv_load_policy: 1,
        rel: rel ? 1 : 0,
      },
    });
  }, [id, url]);

  useEffect(() => {
    playerInitializers.set(playerKey, initializeYouTubePlayer);

    if (!apiLoaded) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      
      if (firstScriptTag.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        apiLoaded = true;
        playerInitializers.forEach((initialize) => initialize());
      };
    } else if (apiLoaded) {
      initializeYouTubePlayer();
    }

    return () => {
      playerInitializers.delete(playerKey);
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, [initializeYouTubePlayer, playerKey]);

  const handlePlay = () => {
    if (playerInstanceRef.current) {
      if (isPlaying) {
        playerInstanceRef.current.pauseVideo();
      } else {
        playerInstanceRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.stopVideo();
      setIsPlaying(false);
    }
  };

  // Toggle playback state
  const togglePlayback = () => {
    if (isPlaying) {
      handleStop();
    } else {
      handlePlay();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className={className}>
      <div
        // style={{
        //   position: "relative",
        //   paddingBottom: "56.25%" /* 16:9 */,
        //   paddingTop: 25,
        //   height: 0,
        //   overflow: "hidden",
        // }}
      >
        <div ref={playerRef}></div>
        {/* <button
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            cursor: "not-allowed",
          }}
          onClick={togglePlayback}
        ></button> */}
      </div>
    </div>
  );
};

export default YouTubePlayer;