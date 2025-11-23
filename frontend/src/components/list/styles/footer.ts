import { type CSSProperties } from "react";

interface footerStyling {
  container: CSSProperties;
  button: CSSProperties;
  linkBase: CSSProperties;
  activeLink: CSSProperties;
  allAdsCounter: CSSProperties;
}

export default function getFooterStyle(isDarkmode: boolean): footerStyling {
  return {
    container: {
      flexGrow: '1',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      padding: "12px 0",
      backgroundColor: "inherit",
      color: isDarkmode ? "#e0e0e0" : "#333",
      fontFamily: "system-ui, sans-serif",
      transition: 'all 0.35s ease-in-out'
    },
    button: {
      margin: "0 8px",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      fontSize: "18px",
      color: isDarkmode ? "#e0e0e0" : "#333",
      transition: "transform 0.35s ease-in-out",
    },
    linkBase: {
      margin: "0 6px",
      cursor: "pointer",
      color: isDarkmode ? "#ccc" : "#555",
      textDecoration: "none",
      fontSize: "15px",
      transition:
        "text-decoration 0.35s ease-in-out",
    },
    activeLink: {
      fontWeight: 700,
      color: isDarkmode ? "#4dabf7" : "#1976d2",
    },
    allAdsCounter: {
      textAlign: "center",
      fontSize: "14px",
      color: isDarkmode ? "#aaa" : "#666",
      transition: "color 0.35s ease-in-out",
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }
  };
}
