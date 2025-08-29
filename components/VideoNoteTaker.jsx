// components/VideoNoteTaker.jsx
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";

const VideoNoteTaker = ({ videoUrl, setTimestamp, playerRef }) => {
  const internalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (internalRef.current) {
        const time = internalRef.current.getCurrentTime();
        const formatted = formatTimestamp(time);
        setTimestamp(formatted);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimestamp]);

  const formatTimestamp = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    return [hrs, mins, secs].map((t) => t.toString().padStart(2, "0")).join(":");
  };

  return (
    <div style={{ marginBottom: "1rem" }} id="video-player">
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        ref={(player) => {
          internalRef.current = player;
          playerRef.current = player; // Pass to parent
        }}
        width="100%"
        height="360px"
      />
    </div>
  );
};

export default VideoNoteTaker;
