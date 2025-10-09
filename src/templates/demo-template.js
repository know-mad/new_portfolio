import React, { useState, useRef } from "react";
import { graphql } from "gatsby";
import "../styles/ai.css";
import { useTheme } from "../context/ThemeContext";
import pauseDarkIcon from "../images/pause-dark.svg";
import playDarkIcon from "../images/play-dark.svg";
import pauseLightIcon from "../images/pause-light.svg";
import playLightIcon from "../images/play-light.svg";
import rewindDark from "../images/rewind.svg";
import rewindLight from "../images/rewind-light.svg"

export default function AiTemplate({ data }) {
  const { title, demoVideo, description } = data.contentfulDemo;
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const forward10Seconds = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
    }
  };

  const rewind10Seconds = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
  };

  return (
    <div className="static-page-container">
      <div
        style={{ paddingBottom: 150, alignItems: "center" }}
        className="page-content-container"
      >
        <p className="primary-heading-bold" data-theme={theme}>
          {title}
        </p>
        <p className="copy-font bottom-spacing" data-theme={theme}>
          {description}
        </p>
        <div className="demo-container">
          <video
            ref={videoRef}
            controls={false}
            autoPlay={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="demo-video"
          >
            <source src={demoVideo.url} type="video/webm" />
          </video>
          <div className="timer-container">
            <p className="copy-font" data-theme={theme}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
        <div className="controls-container">
          <button
            style={{
              border:
                theme === "dark" ? "1px solid #00a3ff" : "1px solid #9F00EA",
            }}
            className="video-control-btn"
            onClick={rewind10Seconds}
            title="Rewind 10 seconds"
          >
            <img
              className="control-icon"
              src={theme === "dark" ? rewindDark : rewindLight}
              alt="rewind-icon"
              
            />
          </button>
          
          <button
            style={{
              border:
                theme === "dark" ? "1px solid #00a3ff" : "1px solid #9F00EA",
            }}
            className="video-toggle"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <img
                className="pause-icon"
                src={theme === "dark" ? pauseDarkIcon : pauseLightIcon}
                alt="pause-icon"
              />
            ) : (
              <img
                className="play-icon"
                src={theme === "dark" ? playDarkIcon : playLightIcon}
                alt="play-icon"
              />
            )}
          </button>
          
          <button
            style={{
              border:
                theme === "dark" ? "1px solid #00a3ff" : "1px solid #9F00EA",
            }}
            className="video-control-btn"
            onClick={forward10Seconds}
            title="Forward 10 seconds"
          >
            <img
              className="control-icon"
              src={theme === "dark" ? rewindDark : rewindLight}
              alt="forward-icon"
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export const Head = ({ data }) => (
  <>
    <title>{`${data?.contentfulDemo?.title} | David Velez Ai Solutions` || "David Velez | Ai Solutions"}</title>
    <meta
      name="description"
      content={
        data?.contentfulDemo?.metaDescription ||
        "David Velez is a mobile and web developer that builds ai agents as well as apps for the web, android, and iOS devices."
      }
    />
  </>
);

export const query = graphql`
  query DemoBySlug($slug: String!) {
    contentfulDemo(slug: { eq: $slug }) {
      title
      description
      demoVideo {
        url
      }
    }
  }
`;
