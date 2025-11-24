import type { CSSProperties } from "react";

interface HistoryStyles {
  section: CSSProperties;
  image: CSSProperties;
}

interface SellerStyles {
  info: CSSProperties;
}

interface ActionsStyles {
  section: CSSProperties;
  button: CSSProperties;
  approve: CSSProperties;
  reject: CSSProperties;
}

interface NavStyles {
  section: CSSProperties;
  link: CSSProperties;
}

export interface ItemPageStyles {
  background: CSSProperties;
  container: CSSProperties;
  title: CSSProperties;
  headerBox: CSSProperties;
  labelBox: CSSProperties;
  status: CSSProperties;
  urgency: CSSProperties;
  history: HistoryStyles;
  description: CSSProperties;
  seller: SellerStyles;
  actions: ActionsStyles;
  nav: NavStyles;
}

export default function getItemStyle(isDarkmode: boolean): ItemPageStyles {
  const containerBg = isDarkmode ? "#1e1e24" : "#fff";
  const baseBg = isDarkmode ? "#121212" : "#ffffff";
  const baseText = isDarkmode ? "#f5f5f5" : "#222";
  const borderColor = isDarkmode ? "#444" : "#ccc";
  const accent = "#0078d4";
  const danger = "#d83b01";

  return {
    background: {
      width: "100vw",
      height: "100vh",
      backgroundColor: baseBg,
      padding: 20,
      overflow: "hidden",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    },
    headerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    labelBox: {
      display: "flex",
      gap: "0.75rem",
      alignItems: "center",
    },
    status: {
      padding: "0.25rem 0.75rem",
      borderRadius: "6px",
      backgroundColor: isDarkmode ? "#2a2a33" : "#eee",
      color: "#f0f0f0",
      fontWeight: 600,
      fontSize: "0.9rem",
    },
    urgency: {
      padding: "0.25rem 0.75rem",
      borderRadius: "6px",
      backgroundColor: danger,
      color: "#fff",
      fontWeight: 600,
      fontSize: "0.9rem",
    },
    container: {
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
      padding: "2rem",
      background: containerBg,
      color: baseText,
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      fontFamily: "'Inter','Segoe UI',sans-serif",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: 700,
      marginBottom: "1rem",
      display: "inline",
    },
    history: {
      section: {
        display: "flex",
        height: 170,
        gap: "1.5rem",
        marginBottom: "2rem",
      },
      image: {
        maxWidth: "250px",
        borderRadius: "8px",
        objectFit: "cover",
        border: `1px solid ${borderColor}`,
      },
    },
    description: {
      marginBottom: "2rem",
    },
    seller: {
      info: {
        marginTop: "1rem",
        fontSize: "0.95rem",
        lineHeight: "1.4",
      },
    },
    actions: {
      section: {
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
      },
      button: {
        flex: "0 0 auto",
        padding: "0.6rem 1.2rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        transition: "background 0.2s ease",
      },
      approve: {
        background: accent,
        color: "#fff",
      },
      reject: {
        background: danger,
        color: "#fff",
      },
    },
    nav: {
      section: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "2rem",
        fontSize: "0.95rem",
      },
      link: {
        color: accent,
        cursor: "pointer",
        textDecoration: "none",
      },
    },
  };
}
