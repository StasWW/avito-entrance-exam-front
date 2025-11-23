import type {CSSProperties} from "react";

interface headerStyles {
  container: CSSProperties;
  switch: CSSProperties;
  input: CSSProperties;
  slider: CSSProperties;
  sliderBefore: CSSProperties;
  round: CSSProperties;
  iconLeft: CSSProperties;
  iconRight: CSSProperties;
}

export default function getHeaderStyle(isDarkmode: boolean): headerStyles {
  return {
    container: {
      position: "absolute",
      right: 10,
      top: 10,
      display: "flex",
      justifyContent: "flex-end",
      backgroundColor: "inherit",
    },
    switch: {
      position: "relative",
      display: "inline-block",
      width: "60px",
      height: "34px",
    },
    input: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    slider: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkmode ? "#2196F3" : "#ccc",
      transition: ".4s",
    },
    sliderBefore: {
      position: "absolute",
      height: "26px",
      width: "26px",
      left: "4px",
      bottom: "4px",
      backgroundColor: "white",
      transition: ".4s",
      transform: isDarkmode ? "translateX(26px)" : "translateX(0)",
      borderRadius: "50%",
      zIndex: 2,
    },
    round: {
      borderRadius: "34px",
    },
    iconLeft: {
      position: "absolute",
      left: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      height: "18px",
      width: "18px",
      pointerEvents: "none",
      zIndex: 1,
    },
    iconRight: {
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      height: "18px",
      width: "18px",
      pointerEvents: "none",
      zIndex: 1,
    },
  };
}
