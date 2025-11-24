import { type CSSProperties } from "react";

interface AdsPlaceholderStyles {
  errorTitle: CSSProperties;
  errorSubTitle: CSSProperties;
  errorImg: CSSProperties,
  button: CSSProperties,
}

export default function geErrorComponentStyles(isDarkmode: boolean): AdsPlaceholderStyles {
  const colors = {
    title: isDarkmode ? "#ff6b6b" : "#d32f2f",
    subTitle: isDarkmode ? "#aaa" : "#555",
    accent: isDarkmode ? "#2b5c86" : "#1976d2",
  };

  return {
    errorTitle: {
      color: colors.title,
      margin: "0 0 12px 0",
      fontSize: "4rem",
      fontWeight: 700,
      fontFamily: "'Inter','Segoe UI',sans-serif",
      textAlign: "center",
      letterSpacing: "0.5px",

    },
    errorSubTitle: {
      color: colors.subTitle,
      fontSize: "1.2rem",
      fontWeight: 400,
      fontFamily: "'Inter','Segoe UI',sans-serif",
      textAlign: "center",
      lineHeight: 1.5,
    },
    errorImg: {
      display: 'block',
      margin: '20px auto',
      width: 200,
      height: 'auto',
    },
    button: {
      margin: '20px auto',
      height: '3rem',
      width: '10rem',
      fontSize: 24,
      fontWeight: 700,
      padding: "6px 12px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: colors.accent,
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      alignSelf: "flex-start",
    },
  };
}
