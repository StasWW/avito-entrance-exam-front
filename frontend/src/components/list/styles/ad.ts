import { type CSSProperties } from "react";

interface AdStyles {
  card: CSSProperties;
  image: CSSProperties;
  content: CSSProperties;
  titleBox: CSSProperties;
  title: CSSProperties;
  urgent: CSSProperties;
  price: CSSProperties;
  meta: CSSProperties;
  button: CSSProperties;
  labelBox: CSSProperties;
  status: CSSProperties;
}

export default function getAdStyles(isDarkmode: boolean): AdStyles {
  const baseBg = isDarkmode ? "rgb(28, 28, 36)" : "#fff";
  const baseText = isDarkmode ? "#e0e0e0" : "#222";
  const mutedText = isDarkmode ? "#aaa" : "#666";
  const accent = isDarkmode ? "#4dabf7" : "#1976d2";

  return {
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      gap: "16px",
      padding: "16px",
      marginBottom: "16px",
      borderRadius: "8px",
      boxShadow: isDarkmode
        ? "0 2px 8px rgba(0,0,0,0.6)"
        : "0 2px 8px rgba(0,0,0,0.08)",
      backgroundColor: baseBg,
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      boxSizing: "border-box",
      fontFamily: "Inter, 'Segoe UI', sans-serif",
    },
    image: {
      width: "160px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "6px",
      flexShrink: 0,
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "120px",
      boxSizing: "border-box",
    },
    titleBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
      margin: 0,
      color: baseText,
      flex: 1,
    },
    urgent: {
      backgroundColor: "#d32f2f",
      color: "#fff",
      fontSize: "12px",
      fontWeight: 600,
      padding: "2px 6px",
      borderRadius: "4px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    price: {
      fontSize: "16px",
      fontWeight: 500,
      color: accent,
      margin: "0 0 4px 0",
    },
    meta: {
      fontSize: "14px",
      color: mutedText,
      margin: 0,
    },
    button: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: accent,
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
      alignSelf: "flex-start",
    },
    labelBox: {
      display: "flex",
      gap: "0.75rem",
      alignItems: "center",
    },
    status: {
      borderRadius: "100px",
      backgroundColor: isDarkmode ? "#2a2a33" : "#eee",
      fontWeight: 600,
      width: 20,
      height: 20
    },
  };
}
