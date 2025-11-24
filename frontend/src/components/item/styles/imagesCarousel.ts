import type { CSSProperties } from "react";

export interface ImageCarouselStyles {
  container: CSSProperties;
  image: CSSProperties;
  buttonLeft: CSSProperties;
  buttonRight: CSSProperties;
  dots: CSSProperties,
  dotsBox: CSSProperties,
}

export default function getImageCarouselStyles(): ImageCarouselStyles {
  return {
    container: {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
    },
    image: {
      maxWidth: "250px",
      borderRadius: "8px",
      objectFit: "cover",
    },
    buttonLeft: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "40%",
      height: "100%",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
    buttonRight: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "40%",
      height: "100%",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
    dotsBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      zIndex: 3,
      position: 'relative',
      top: 12,
    },
    dots: {
      width: 8,
      height: 8,
      borderRadius: 10,
    }
  };
}
